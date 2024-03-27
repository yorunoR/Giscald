from strawberry import ID
from strawberry.types import Info

from libs.models import GenerationTask


async def resolve(info: Info, id: ID):
    user = info.context.user
    generation_task = await GenerationTask.objects.aget(id=id, user=user)
    result = await GenerationTask.objects.filter(id=id, user=user).adelete()

    return generation_task
