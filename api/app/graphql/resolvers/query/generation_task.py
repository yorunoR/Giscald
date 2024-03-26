from strawberry import ID
from strawberry.types import Info

from app.graphql.resolvers.common import require_authentication
from libs.models import GenerationTask


@require_authentication
async def resolve(info: Info, id: ID):
    user = info.context.user
    generation_task = await GenerationTask.objects.aget(id=id, user=user)
    return generation_task
