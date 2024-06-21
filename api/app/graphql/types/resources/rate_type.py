from typing import TYPE_CHECKING, Annotated

import strawberry
from strawberry import auto

from libs.models import Rate

from .answer_type import AnswerType

if TYPE_CHECKING:
    from .evaluation_task_type import EvaluationTaskType


@strawberry.django.type(Rate)
class RateType:
    id: auto
    model: auto
    point: auto
    text: auto
    finish_reason: auto
    usage: auto
    processing_time: auto
    answers: list[AnswerType]
    evaluation_task: Annotated["EvaluationTaskType", strawberry.lazy(".evaluation_task_type")]
