from strawberry import ID
from strawberry.types import Info

from app.graphql.resolvers.common import require_authentication
from libs.models import Rate


@require_authentication
def resolve(info: Info, question_id: ID):
    rates = Rate.objects.filter(answer__question_id=question_id).order_by("id").reverse()
    return rates
