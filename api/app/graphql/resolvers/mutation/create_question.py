from strawberry import ID
from strawberry.types import Info

from libs.models import Bench, Question


async def resolve(
    info: Info,
    bench_id: ID,
    question_number: int,
    category: str,
    turn: str,
    correct_answer: str | None = None,
    eval_aspect: str | None = None,
):
    bench = await Bench.objects.aget(id=bench_id, locked=False)

    if correct_answer:
        correct_answers = [correct_answer]
    else:
        correct_answers = []

    if eval_aspect:
        eval_aspects = [eval_aspect]
    else:
        eval_aspects = []

    question = await Question.objects.acreate(
        bench=bench,
        question_number=question_number,
        category=category,
        turns=[turn],
        correct_answers=correct_answers,
        eval_aspects=eval_aspects,
    )

    return question
