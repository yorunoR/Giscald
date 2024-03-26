from enum import Enum

import strawberry
from strawberry import auto

from libs.models import GenerationTask

from .answer_type import AnswerType


@strawberry.enum
class GenerationTaskStatusType(Enum):
    Created = 0
    Started = 10
    Completed = 20
    Failed = 30


@strawberry.django.type(GenerationTask)
class GenerationTaskType:
    id: auto
    name: auto
    model_name: auto
    description: auto
    status: GenerationTaskStatusType
    created_at: auto
    answers: list[AnswerType]
