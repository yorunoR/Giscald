import asyncio
import json
import logging
import os

from django.conf import settings
from django.core.management.base import BaseCommand

from libs.models import Answer, GenerationTask, User
from libs.models.generation_task import Status
from libs.services.gen_answer import chat

logger = logging.getLogger(__name__)

# model = "gpt-3.5-turbo"
# host = None
model = "openai/cyberagent/calm2-7b-chat"
# model = "openai/elyza/ELYZA-japanese-Llama-2-13b-instruct"
host = "http://host.docker.internal:4000/v1"
api_key = os.getenv("API_KEY", "EMPTY")


class Command(BaseCommand):
    help = "Ask questions."

    def add_arguments(self, parser):
        parser.add_argument("--name", type=str, help="Name")

    def handle(self, *args, **options):
        name = options["name"]
        if not name:
            raise Exception("Name required!")
        asyncio.run(self.main(name))

    async def main(self, name):
        await run(name)


async def run(name):
    print(f"GenerationTask name: {name}")
    user = await User.objects.aget(id=1)
    generation_task = await GenerationTask.objects.acreate(user=user, name=name, model_name=model, status=Status.CREATED)

    try:
        worker_count = 10
        path = os.path.join(settings.BASE_DIR, "data", "japanese_mt_bench", "question_full.jsonl")
        with open(path, "r", encoding="utf-8") as file:
            jobs = []
            for line in file:
                data = json.loads(line)
                messages = [{"role": "user", "content": data["turns"][0]}]
                jobs.append(chat(messages, model, host, api_key=api_key, temperature=0.4, max_tokens=400))
                if len(jobs) == worker_count:
                    results = await asyncio.gather(*(asyncio.wait_for(job, timeout=100) for job in jobs), return_exceptions=True)
                    jobs = []
                    for result in results:
                        if isinstance(result, asyncio.exceptions.CancelledError):
                            raise Exception("Timeout")
                        await Answer.objects.acreate(
                            user=user,
                            generation_task=generation_task,
                            messages=result["question"],
                            text=result["answer"],
                            usage={},
                            finish_reason="",
                            processing_time=1.11,
                            category="test",
                        )
    except Exception as e:
        await generation_task.adelete()
        raise e
