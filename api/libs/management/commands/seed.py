import json
import logging
import os

from django.conf import settings
from django.core.management.base import BaseCommand

from libs.models import Bench, Question

logger = logging.getLogger(__name__)


class Command(BaseCommand):
    help = "seed database."

    def add_arguments(self, parser):
        parser.add_argument("--mode", type=str, help="Mode")

    def handle(self, *args, **options):
        self.main()

    def main(self):
        run()


def run():
    templates = {}
    path = os.path.join(settings.BASE_DIR, "data", "japanese_mt_bench", "judge_ja_prompts.jsonl")
    with open(path, "r", encoding="utf-8") as file:
        for line in file:
            data = json.loads(line)
            templates[data["name"]] = data["prompt_template"]
    template = templates["single-v1"]

    bench = Bench.objects.create(name="Japanese MT Bench origin")
    bench.template = template
    bench.save()
    path = os.path.join(settings.BASE_DIR, "data", "japanese_mt_bench", "question_full.jsonl")
    try:
        with open(path, "r", encoding="utf-8") as file:
            for line in file:
                data = json.loads(line)
                Question.objects.create(
                    bench=bench, question_number=data["question_id"], category=data["category"], turns=data["turns"], correct_answers=[]
                )
    except Exception as e:
        print(e)
        bench.delete()
