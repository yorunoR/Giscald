from asgiref.sync import sync_to_async
from strawberry import ID
from strawberry.types import Info

from libs.models import Question


async def resolve(
    info: Info,
    id: ID,
    question_number: int,
    category: str,
    turn: str,
    correct_answer: str | None = None,
    eval_aspect: str | None = None,
):
    question = await Question.objects.select_related("bench").aget(id=id)

    if question.bench.locked:
        raise Exception("locked")

    if correct_answer:
        correct_answers = [correct_answer]
    else:
        correct_answers = []

    if eval_aspect:
        eval_aspects = [eval_aspect]
    else:
        eval_aspects = []

    data = {
        "question_number": question_number,
        "category": category,
        "turns": [turn],
        "correct_answers": correct_answers,
        "eval_aspects": eval_aspects,
    }
    for key, value in data.items():
        setattr(question, key, value)
    await sync_to_async(lambda: question.save())()

    return question
