from strawberry import ID
from strawberry.types import Info

from app.graphql.resolvers.common import require_authentication
from libs.models import Question


@require_authentication
async def resolve(info: Info, id: ID):
    question = await Question.objects.aget(id=id)
    return question
