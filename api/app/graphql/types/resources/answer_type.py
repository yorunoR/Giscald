import strawberry
from strawberry import auto

from libs.models import Answer


@strawberry.django.type(Answer)
class AnswerType:
    id: auto
    messages: auto
    category: auto
    text: auto
    finish_reason: auto
    usage: auto
    processing_time: auto
