from enum import Enum

import strawberry
from strawberry import auto

from libs.models import EvaluationTask

from .rate_type import RateType


@strawberry.enum
class EvaluationTaskStatusType(Enum):
    Created = 0
    Started = 10
    Completed = 20
    Failed = 30


@strawberry.django.type(EvaluationTask)
class EvaluationTaskType:
    id: auto
    name: auto
    points: auto
    processing_times: auto
    status: EvaluationTaskStatusType
    created_at: auto
    rates: list[RateType]
