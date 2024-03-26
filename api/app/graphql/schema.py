import strawberry
from strawberry_django.optimizer import DjangoOptimizerExtension

from app.graphql.resolvers.mutation.create_evaluation_task import resolve as create_evaluation_task
from app.graphql.resolvers.mutation.create_generation_task import resolve as create_generation_task
from app.graphql.resolvers.mutation.signin import resolve as signin
from app.graphql.resolvers.mutation.update_evaluation_task import resolve as update_evaluation_task
from app.graphql.resolvers.query.current_user import resolve as current_user
from app.graphql.resolvers.query.ping import resolve as ping
from app.graphql.types.resources.evaluation_task_type import EvaluationTaskType
from app.graphql.types.resources.generation_task_type import GenerationTaskType
from app.graphql.types.resources.user_type import UserType


@strawberry.type
class Query:
    ping: str = strawberry.field(resolver=ping)
    current_user: UserType = strawberry.field(resolver=current_user)


@strawberry.type
class Mutation:
    signin: UserType = strawberry.field(resolver=signin)
    createGenerationTask: GenerationTaskType = strawberry.field(resolver=create_generation_task)
    createEvaluationTask: EvaluationTaskType = strawberry.field(resolver=create_evaluation_task)
    updateEvaluationTask: EvaluationTaskType = strawberry.field(resolver=update_evaluation_task)


schema = strawberry.Schema(
    query=Query,
    mutation=Mutation,
    extensions=[
        DjangoOptimizerExtension,  # not required, but highly recommended
    ],
)
