from typing import TYPE_CHECKING, Annotated, Union

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
    correct_answers: list[Union[str, None]]
    eval_aspects: list[Union[str, None]]
    bench: Annotated["BenchType", strawberry.lazy(".bench_type")]
