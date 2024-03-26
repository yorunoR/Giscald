import strawberry
from strawberry import auto

from libs.models import Rate


@strawberry.django.type(Rate)
class RateType:
    id: auto
    model: auto
    point: auto
    text: auto
    finish_reason: auto
    usage: auto
    processing_time: auto
