import strawberry
from strawberry import auto

from libs.models import Tag


@strawberry.django.type(Tag)
class TagType:
    id: auto
    name: auto
