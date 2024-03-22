import strawberry
from strawberry import auto

from app.graphql.types.resources.generation_task_type import GenerationTaskType
from libs.models import User


@strawberry.django.type(User)
class UserType:
    id: auto
    name: auto
    email: auto
    activated: auto
    profile_image: auto
    role: auto
    generation_tasks: list[GenerationTaskType]
