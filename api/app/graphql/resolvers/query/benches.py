from strawberry.types import Info

from app.graphql.resolvers.common import require_authentication
from libs.models import Bench


@require_authentication
def resolve(info: Info):
    benches = Bench.objects.order_by("id").reverse().all()
    return benches
