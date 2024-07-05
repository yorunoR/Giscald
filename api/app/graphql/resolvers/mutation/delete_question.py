from strawberry import ID
from strawberry.types import Info

from libs.models import Question


async def resolve(info: Info, id: ID):
    question = await Question.objects.select_related("bench").aget(id=id)

    if question.bench.locked:
        raise Exception("locked")

    await Question.objects.filter(id=id).adelete()

    return question
