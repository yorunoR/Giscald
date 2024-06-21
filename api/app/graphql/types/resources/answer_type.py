import strawberry
from strawberry import auto

from libs.models import Answer

from .question_type import QuestionType


@strawberry.django.type(Answer)
class AnswerType:
    id: auto
    messages: auto
    text: auto
    finish_reason: auto
    usage: auto
    processing_time: auto
    turn_number: auto
    question: QuestionType
