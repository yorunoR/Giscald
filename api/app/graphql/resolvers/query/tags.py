from strawberry.types import Info

from app.graphql.resolvers.common import require_authentication
from libs.models import Tag


@require_authentication
def resolve(info: Info):
    tags = Tag.objects.order_by("id").all()
    return tags
