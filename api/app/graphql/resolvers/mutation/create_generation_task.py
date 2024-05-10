import asyncio
import json
import os

from asgiref.sync import sync_to_async
from strawberry.types import Info

from libs.models import Answer, Bench, GenerationSetting, GenerationTask
from libs.models.generation_task import Status as GenerationTaskStatus
from libs.services.gen_answer import chat_with_job_info

api_key = os.getenv("OPENAI_API_KEY", "EMPTY")


def parse_params_str(param_str):
    try:
        return json.loads(param_str)
    except Exception:
        return {}


async def resolve(
    info: Info,
    bench_name: str,
    name: str,
    model_name: str,
    host: str,
    worker_count: int,
    param_str: str | None = None,
    description: str | None = None,
):
    parameters = parse_params_str(param_str)

    user = info.context.user
    bench = await Bench.objects.aget(name=bench_name)
    generation_task = await GenerationTask.objects.acreate(
        user=user, bench=bench, name=name, model_name=model_name, status=GenerationTaskStatus.STARTED, description=description
    )
    _generation_setting = await GenerationSetting.objects.acreate(
        user=user, generation_task=generation_task, host=host, worker_count=worker_count, parameters=parameters
    )

    if not model_name.startswith("openai/"):
        host = None

    try:
        jobs = []
        async for question in bench.questions.order_by("question_number").all():
            messages = [{"role": "user", "content": question.turns[0]}]

            params = parameters.get(question.category) or parameters.get("default") or {}

            jobs.append(chat_with_job_info(question, messages, model_name, host, api_key=api_key, params=params))
            if len(jobs) == worker_count:
                results = await asyncio.gather(*(asyncio.wait_for(job, timeout=450) for job in jobs), return_exceptions=True)
                jobs = []
                for result in results:
                    try:
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
                            question=result["info"],
                        )
                    except Exception as e:
                        print(result)
                        raise e

        generation_task.status = GenerationTaskStatus.COMPLETED
        await sync_to_async(lambda: generation_task.save())()
        return generation_task
    except Exception as e:
        print(e)
        print(question)
        generation_task.status = GenerationTaskStatus.FAILED
        await sync_to_async(lambda: generation_task.save())()
        raise e
