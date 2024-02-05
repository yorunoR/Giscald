import strawberry
from strawberry_django.optimizer import DjangoOptimizerExtension

from app.graphql.resolvers.query.ping import resolve as ping
from app.graphql.resolvers.query.users import resolve as users
from app.graphql.types.resources.user_type import UserType


@strawberry.type
class Query:
    ping: str = strawberry.field(resolver=ping)
    users: list[UserType] = strawberry.field(resolver=users)


schema = strawberry.Schema(
    query=Query,
    extensions=[
        DjangoOptimizerExtension,  # not required, but highly recommended
    ],
)
