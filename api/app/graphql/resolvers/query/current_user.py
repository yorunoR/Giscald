from strawberry.types import Info

from app.graphql.resolvers.common import require_authentication


@require_authentication
def resolve(info: Info):
    return info.context.user
