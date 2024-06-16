import strawberry
from strawberry_django.optimizer import DjangoOptimizerExtension

from app.graphql.resolvers.mutation.create_evaluation_task import resolve as create_evaluation_task
from app.graphql.resolvers.mutation.create_generation_task import resolve as create_generation_task
from app.graphql.resolvers.mutation.delete_evaluation_task import resolve as delete_evaluation_task
from app.graphql.resolvers.mutation.delete_generation_task import resolve as delete_generation_task
from app.graphql.resolvers.mutation.signin import resolve as signin
from app.graphql.resolvers.mutation.update_evaluation_task import resolve as update_evaluation_task
from app.graphql.resolvers.query.bench import resolve as bench
from app.graphql.resolvers.query.benches import resolve as benches
from app.graphql.resolvers.query.current_user import resolve as current_user
from app.graphql.resolvers.query.evaluation_task import resolve as evaluation_task
from app.graphql.resolvers.query.generation_task import resolve as generation_task
from app.graphql.resolvers.query.ping import resolve as ping
from app.graphql.resolvers.query.question import resolve as question
from app.graphql.resolvers.query.rates import resolve as rates
from app.graphql.resolvers.query.tags import resolve as tags
from app.graphql.types.resources.bench_type import BenchType
from app.graphql.types.resources.evaluation_task_type import EvaluationTaskType
from app.graphql.types.resources.generation_task_type import GenerationTaskType
from app.graphql.types.resources.question_type import QuestionType
from app.graphql.types.resources.rate_type import RateType
from app.graphql.types.resources.tag_type import TagType
from app.graphql.types.resources.user_type import UserType


@strawberry.type
class Query:
    ping: str = strawberry.field(resolver=ping)
    current_user: UserType = strawberry.field(resolver=current_user)
    generation_task: GenerationTaskType = strawberry.field(resolver=generation_task)
    evaluation_task: EvaluationTaskType = strawberry.field(resolver=evaluation_task)
    benches: list[BenchType] = strawberry.field(resolver=benches)
    bench: BenchType = strawberry.field(resolver=bench)
    rates: list[RateType] = strawberry.field(resolver=rates)
    question: QuestionType = strawberry.field(resolver=question)
    tags: list[TagType] = strawberry.field(resolver=tags)


@strawberry.type
class Mutation:
    signin: UserType = strawberry.field(resolver=signin)
    createGenerationTask: GenerationTaskType = strawberry.field(resolver=create_generation_task)
    createEvaluationTask: EvaluationTaskType = strawberry.field(resolver=create_evaluation_task)
    updateEvaluationTask: EvaluationTaskType = strawberry.field(resolver=update_evaluation_task)
    deleteGenerationTask: GenerationTaskType = strawberry.field(resolver=delete_generation_task)
    deleteEvaluationTask: EvaluationTaskType = strawberry.field(resolver=delete_evaluation_task)


schema = strawberry.Schema(
    query=Query,
    mutation=Mutation,
    extensions=[
        DjangoOptimizerExtension,  # not required, but highly recommended
    ],
)
