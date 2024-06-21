import logging

from django.core.management.base import BaseCommand

from libs.models import Answer, Question

logger = logging.getLogger(__name__)


class Command(BaseCommand):
    help = "one shot. connect question and answer relations."

    def add_arguments(self, parser):
        parser.add_argument("--mode", type=str, help="Mode")

    def handle(self, *args, **options):
        self.main()

    def main(self):
        run()


def run():
    for answer in Answer.objects.all():
        content = answer.messages[0]["content"]
        for question in Question.objects.all():
            if content == question.turns[0]:
                print(content)
                answer.question = question
                answer.save()
