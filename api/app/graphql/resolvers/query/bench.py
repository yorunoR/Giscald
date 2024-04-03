from strawberry import ID
from strawberry.types import Info

from app.graphql.resolvers.common import require_authentication
from libs.models import Bench


@require_authentication
async def resolve(info: Info, id: ID):
    bench = await Bench.objects.aget(id=id)
    return bench
