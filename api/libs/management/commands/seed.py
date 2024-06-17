import csv
import json
import logging
import os

import pandas as pd
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
        elif mode == "rakuda":
            setup_rakuda_tasks()
        elif mode == "tengu":
            setup_tengu_tasks()
        elif mode == "aiw":
            setup_aiw_tasks()
        elif mode == "bfcl":
            setup_bfcl_tasks()
        elif mode == "all":
            setup_mt_bench()
            setup_elyza_tasks()
            setup_rakuda_tasks()
            setup_tengu_tasks()
            setup_aiw_tasks()
            setup_bfcl_tasks()


def setup_mt_bench():
    templates = {}
    path = os.path.join(settings.BASE_DIR, "data", "japanese_mt_bench", "judge_ja_prompts.jsonl")
    with open(path, "r", encoding="utf-8") as file:
        for line in file:
            data = json.loads(line)
            templates[data["name"]] = data["prompt_template"]
    template = templates["single-v1"]

    bench = Bench.objects.create(name="Japanese MT Bench origin", code="multi")
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

    bench = Bench.objects.create(name="Elyza Tasks 100 origin", code="elyza")
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


def setup_rakuda_tasks():
    path = os.path.join(settings.BASE_DIR, "data", "rakuda-questions", "prompt_eval.txt")
    with open(path, "r", encoding="utf-8") as file:
        template = file.read()

    bench = Bench.objects.create(name="Rakuda Questions origin", code="rakuda")
    bench.template = template
    bench.save()
    path = os.path.join(settings.BASE_DIR, "data", "rakuda-questions", "rakuda.jsonl")
    try:
        with open(path, newline="", encoding="utf-8") as file:
            index = 1
            for line in file:
                data = json.loads(line)
                turn = data["text"]

                Question.objects.create(
                    bench=bench, question_number=index, category=data["category"], turns=[turn], correct_answers=[], eval_aspects=[]
                )
                index = index + 1
    except Exception as e:
        print(e)
        bench.delete()


def setup_tengu_tasks():
    path = os.path.join(settings.BASE_DIR, "data", "tengu_bench", "prompt_eval.txt")
    with open(path, "r", encoding="utf-8") as file:
        template = file.read()

    bench = Bench.objects.create(name="Tengu Bench origin", code="tengu")
    bench.template = template
    bench.save()
    path = os.path.join(settings.BASE_DIR, "data", "tengu_bench", "test-00000-of-00001.parquet")
    try:
        df = pd.read_parquet(path)
        for index, row in df.iterrows():
            category = row["Category"].replace("（千トークン以上）", "")
            turn = row["Question"]
            correct_answer = row["Answer"]
            eval_aspect = row["Criteria"]

            Question.objects.create(
                bench=bench,
                question_number=index + 1,
                category=category,
                turns=[turn],
                correct_answers=[correct_answer],
                eval_aspects=[eval_aspect],
            )
    except Exception as e:
        print(e)
        bench.delete()


def setup_aiw_tasks():
    bench = Bench.objects.create(name="AIW origin", code="aiw")
    bench.template = ""
    bench.save()
    path = os.path.join(settings.BASE_DIR, "data", "aiw", "prompts_remove_format.json")
    try:
        with open(path, newline="", encoding="utf-8") as file:
            index = 1
            for line in file:
                data = json.loads(line)
                turn = data["prompt"]
                correct_answer = data["right_answer"]

                Question.objects.create(
                    bench=bench, question_number=index, category="alice", turns=[turn], correct_answers=[correct_answer], eval_aspects=[]
                )
                index = index + 1
    except Exception as e:
        print(e)
        bench.delete()


def setup_bfcl_tasks():
    path = os.path.join(settings.BASE_DIR, "data", "bfcl", "judge.txt")
    with open(path, "r", encoding="utf-8") as file:
        template = file.read()

    system_path = os.path.join(settings.BASE_DIR, "data", "bfcl", "system_initial.jinja")
    with open(system_path, "r", encoding="utf-8") as system_file:
        system_template = system_file.read()

    bench = Bench.objects.create(name="Berkeley Function-Calling origin", code="bfcl")
    bench.template = template
    bench.system_template = system_template
    bench.save()
    path = os.path.join(settings.BASE_DIR, "data", "bfcl", "gorilla_openfunctions_v1_test_simple_with_return_200.json")
    try:
        with open(path, newline="", encoding="utf-8") as file:
            index = 1
            for line in file:
                data = json.loads(line)
                turn = data["question"]
                correct_answer = data["expected_return_value"]
                function = data["function"]

                Question.objects.create(
                    bench=bench,
                    question_number=index,
                    category="simple",
                    turns=[turn],
                    correct_answers=[correct_answer],
                    eval_aspects=[],
                    function=function,
                )
                index = index + 1
    except Exception as e:
        print(e)
        bench.delete()
