import asyncio
import json
import os

from asgiref.sync import sync_to_async
from django.conf import settings
from strawberry.types import Info

from libs.models import Answer, GenerationSetting, GenerationTask
from libs.models.generation_task import Status
from libs.services.gen_answer import chat_with_job_info

api_key = os.getenv("API_KEY", "EMPTY")


def parse_params_str(param_str):
    try:
        return json.loads(param_str)
    except Exception:
        return {}


async def resolve(info: Info, name: str, model_name: str, host: str, worker_count: int, param_str: str | None = None, description: str | None = None):
    parameters = parse_params_str(param_str)

    user = info.context.user
    generation_task = await GenerationTask.objects.acreate(user=user, name=name, model_name=model_name, status=Status.STARTED)
    _generation_setting = await GenerationSetting.objects.acreate(
        user=user, generation_task=generation_task, host=host, worker_count=worker_count, parameters=parameters
    )

    if not model_name.startswith("openai/"):
        host = None

    try:
        path = os.path.join(settings.BASE_DIR, "data", "japanese_mt_bench", "question_full.jsonl")
        with open(path, "r", encoding="utf-8") as file:
            jobs = []
            for line in file:
                data = json.loads(line)
                messages = [{"role": "user", "content": data["turns"][0]}]

                param = parameters.get(data["category"]) or parameters.get("default") or {}

                jobs.append(
                    chat_with_job_info(
                        data["category"],
                        messages,
                        model_name,
                        host,
                        api_key=api_key,
                        temperature=param.get("temperature"),
                        max_tokens=param.get("max_tokens"),
                        frequency_penalty=param.get("frequency_penalty"),
                    )
                )
                if len(jobs) == worker_count:
                    results = await asyncio.gather(*(asyncio.wait_for(job, timeout=120) for job in jobs), return_exceptions=True)
                    jobs = []
                    for result in results:
                        if isinstance(result, asyncio.exceptions.CancelledError):
                            raise Exception("Timeout")
                        await Answer.objects.acreate(
                            user=user,
                            generation_task=generation_task,
                            messages=result["response"]["question"],
                            text=result["response"]["answer"],
                            usage=result["response"]["usage"],
                            finish_reason=result["response"]["finish_reason"],
                            processing_time=result["processing_time"],
                            category=result["info"],
                        )
        generation_task.status = Status.COMPLETED
        await sync_to_async(lambda: generation_task.save())()
        return generation_task
    except Exception as e:
        print(e)
        generation_task.status = Status.FAILED
        await sync_to_async(lambda: generation_task.save())()
        return generation_task
