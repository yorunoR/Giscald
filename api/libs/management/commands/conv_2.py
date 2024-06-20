import logging

from django.core.management.base import BaseCommand

from libs.models import Rate, RateAnswer

logger = logging.getLogger(__name__)


class Command(BaseCommand):
    help = "one shot. make relationship between rate and answer many-to-many."

    def add_arguments(self, parser):
        parser.add_argument("--mode", type=str, help="Mode")

    def handle(self, *args, **options):
        self.main()

    def main(self):
        run()


def run():
    for rate in Rate.objects.all():
        RateAnswer.objects.create(rate=rate, answer=rate.answer)
