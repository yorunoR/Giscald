from typing import TYPE_CHECKING, Annotated

import strawberry
from strawberry import auto

from libs.models import Question

if TYPE_CHECKING:
    from .bench_type import BenchType


@strawberry.django.type(Question)
class QuestionType:
    id: auto
    question_number: auto
    category: auto
    turns: list[str]
    bench: Annotated["BenchType", strawberry.lazy(".bench_type")]
