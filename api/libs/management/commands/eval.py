import asyncio
import json
import logging
import os
import re

from asgiref.sync import sync_to_async
from django.conf import settings
from django.core.management.base import BaseCommand

from libs.models import EvaluationTask, GenerationTask, Rate
from libs.models.evaluation_task import Status
from libs.services.gen_answer import chat_with_job_info

logger = logging.getLogger(__name__)

model = "gpt-4-turbo-preview"
host = None
api_key = os.getenv("API_KEY", "EMPTY")


class Command(BaseCommand):
    help = "Evaluate answers."

    def add_arguments(self, parser):
        parser.add_argument("--name", type=str, help="Name")
        parser.add_argument("--eval", type=str, help="Evaluation name")

    def handle(self, *args, **options):
        name = options["name"]
        eval_name = options["eval"]
        if not name:
            raise Exception("Name required!")
        if not eval_name:
            raise Exception("Evaluation name required!")
        asyncio.run(self.main(name, eval_name))

    async def main(self, name, eval_name):
        await run(name, eval_name)


async def run(name, eval_name):
    print(f"GenerationTask name: {name}")
    generation_task = await GenerationTask.objects.aget(name=name)
    user = await sync_to_async(lambda: generation_task.user)()
    evaluation_task = await EvaluationTask.objects.acreate(
        user=user, generation_task=generation_task, name=eval_name, points={}, status=Status.STARTED
    )

    templates = {}
    path = os.path.join(settings.BASE_DIR, "data", "japanese_mt_bench", "judge_ja_prompts.jsonl")
    with open(path, "r", encoding="utf-8") as file:
        for line in file:
            data = json.loads(line)
            templates[data["name"]] = data["prompt_template"]
    template = templates["single-v1"]

    worker_count = 10
    jobs = []
    async for answer in generation_task.answers.order_by("id").all():
        question = answer.messages[0]["content"]
        content = template.format(question=question, answer=answer.text)
        messages = [
            {"role": "system", "content": "評価の点数は必ず[[評価]]の形式で示す。説明は簡潔にする。"},
            {"role": "user", "content": content},
        ]
        jobs.append(chat_with_job_info(answer, messages, model, host, api_key=api_key, temperature=0, max_tokens=1024))
        if len(jobs) == worker_count:
            results = await asyncio.gather(*jobs)
            jobs = []
            for result in results:
                match = re.search(r"\[\[(\d{1,2})\]\]", result["response"]["answer"])
                point = int(match.group(1))
                await Rate.objects.acreate(
                    user=user,
                    evaluation_task=evaluation_task,
                    answer=result["info"],
                    text=result["response"]["answer"],
                    usage=result["response"]["usage"],
                    finish_reason=result["response"]["finish_reason"],
                    processing_time=result["processing_time"],
                    point=point,
                    model=model,
                )
    evaluation_task.status = Status.COMPLETED
    await sync_to_async(lambda: evaluation_task.save())()
