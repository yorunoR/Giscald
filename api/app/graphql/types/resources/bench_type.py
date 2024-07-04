import strawberry
from strawberry import auto

from libs.models import Bench

from .question_type import QuestionType


@strawberry.django.type(Bench)
class BenchType:
    id: auto
    name: auto
    code: auto
    description: auto
    template: auto
    system_template: auto
    created_at: auto
    updated_at: auto
    questions: list[QuestionType]
