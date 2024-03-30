import strawberry
from strawberry import auto

from libs.models import GenerationSetting


@strawberry.django.type(GenerationSetting)
class GenerationSettingType:
    id: auto
    host: auto
    worker_count: auto
    parameters: auto
