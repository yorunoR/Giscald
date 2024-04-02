import strawberry
from strawberry import auto

from libs.models import Bench

from .question_type import QuestionType


@strawberry.django.type(Bench)
class BenchType:
    id: auto
    name: auto
    description: auto
    quesions: list[QuestionType]
