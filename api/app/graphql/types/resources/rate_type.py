import strawberry
from strawberry import auto

from libs.models import Rate

from .answer_type import AnswerType


@strawberry.django.type(Rate)
class RateType:
    id: auto
    model: auto
    point: auto
    text: auto
    finish_reason: auto
    usage: auto
    processing_time: auto
    answer: AnswerType
