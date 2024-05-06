import csv
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
        mode = options["mode"]
        self.main(mode)

    def main(self, mode):
        if mode == "mt":
            setup_mt_bench()
        elif mode == "elyza":
            setup_elyza_tasks()
        elif mode == "all":
            setup_mt_bench()
            setup_elyza_tasks()


def setup_mt_bench():
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
                    bench=bench,
                    question_number=data["question_id"],
                    category=data["category"],
                    turns=data["turns"],
                    correct_answers=[],
                    eval_aspects=[],
                )
    except Exception as e:
        print(e)
        bench.delete()


def setup_elyza_tasks():
    path = os.path.join(settings.BASE_DIR, "data", "elyza_tasks_100", "prompt_eval.txt")
    with open(path, "r", encoding="utf-8") as file:
        template = file.read()

    bench = Bench.objects.create(name="Elyza Tasks 100 origin")
    bench.template = template
    bench.save()
    path = os.path.join(settings.BASE_DIR, "data", "elyza_tasks_100", "test.csv")
    try:
        with open(path, newline="", encoding="utf-8") as csvfile:
            csv_reader = csv.DictReader(csvfile)

            index = 1
            for row in csv_reader:
                turn = row["input"]
                answer = row["output"]
                aspect = row["eval_aspect"]

                Question.objects.create(
                    bench=bench, question_number=index, category="task", turns=[turn], correct_answers=[answer], eval_aspects=[aspect]
                )
                index = index + 1
    except Exception as e:
        print(e)
        bench.delete()
