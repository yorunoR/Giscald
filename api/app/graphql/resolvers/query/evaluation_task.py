from strawberry import ID
from strawberry.types import Info

from app.graphql.resolvers.common import require_authentication
from libs.models import EvaluationTask


@require_authentication
async def resolve(info: Info, id: ID):
    user = info.context.user
    evaluation_task = await EvaluationTask.objects.aget(id=id, user=user)
    return evaluation_task
