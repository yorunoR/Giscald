from strawberry import ID
from strawberry.types import Info

from libs.models import EvaluationTask


async def resolve(info: Info, id: ID):
    user = info.context.user
    evaluation_task = await EvaluationTask.objects.aget(id=id, user=user)
    await EvaluationTask.objects.filter(id=id, user=user).adelete()

    return evaluation_task
