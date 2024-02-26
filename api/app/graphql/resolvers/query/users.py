from strawberry.types import Info

from app.graphql.resolvers.common import require_authentication
from libs.models import User


@require_authentication
def resolve(info: Info):
    return User.objects.all()
