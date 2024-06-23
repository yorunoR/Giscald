from strawberry import ID
from strawberry.types import Info

from app.graphql.resolvers.common import require_authentication
from libs.models import Rate


@require_authentication
def resolve(info: Info, question_id: ID):
    user = info.context.user
    rates = Rate.objects.filter(answers__question_id=question_id, user=user).order_by("id").reverse().distinct()
    return rates
