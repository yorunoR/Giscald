import asyncio
import json
import logging
import os

from django.conf import settings
from django.core.management.base import BaseCommand

from libs.services.gen_answer import chat

logger = logging.getLogger(__name__)

model = "gpt-3.5-turbo"
host = None
# model = "openai/cyberagent/calm2-7b-chat"
# host = "http://host.docker.internal:4000/v1"
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
    print(name)
    worker_count = 10
    path = os.path.join(settings.BASE_DIR, "data", "japanese_mt_bench", "question_full.jsonl")

    with open(path, "r", encoding="utf-8") as file:
        jobs = []
        for line in file:
            data = json.loads(line)
            messages = [{"role": "user", "content": data["turns"][0]}]
            jobs.append(chat(messages, model, host, api_key=api_key, temperature=0.4, max_tokens=400))
            if len(jobs) == worker_count:
                results = await asyncio.gather(*jobs)
                jobs = []
                for result in results:
                    print(result)
