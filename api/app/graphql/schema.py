import strawberry
from strawberry_django.optimizer import DjangoOptimizerExtension

from app.graphql.resolvers.mutation.signin import resolve as signin
from app.graphql.resolvers.query.current_user import resolve as current_user
from app.graphql.resolvers.query.ping import resolve as ping
from app.graphql.types.resources.user_type import UserType


@strawberry.type
class Query:
    ping: str = strawberry.field(resolver=ping)
    current_user: UserType = strawberry.field(resolver=current_user)


@strawberry.type
class Mutation:
    signin: UserType = strawberry.field(resolver=signin)


schema = strawberry.Schema(
    query=Query,
    mutation=Mutation,
    extensions=[
        DjangoOptimizerExtension,  # not required, but highly recommended
    ],
)
