import strawberry
from strawberry import auto

from libs.models import User


@strawberry.django.type(User)
class UserType:
    id: auto
    name: auto
    email: auto
    activated: auto
    profile_image: auto
    role: auto
