from asgiref.sync import sync_to_async
from django.db.models import Avg
from strawberry import ID
from strawberry.types import Info

from libs.models import EvaluationTask, Rate
from libs.models.evaluation_task import Status as EvaluationTaskStatus


def convert_list_to_dict(input_list):
    result_dict = {item["answer__category"]: item["point"] for item in input_list}
    return result_dict


def avg_points(evaluation_task):
    category_points_avg = Rate.objects.filter(evaluation_task=evaluation_task).values("answer__category").annotate(point=Avg("point"))
    return convert_list_to_dict(category_points_avg)


async def resolve(info: Info, id: ID):
    user = info.context.user
    evaluation_task = await EvaluationTask.objects.aget(id=id, user=user, status=EvaluationTaskStatus.COMPLETED)

    points = await sync_to_async(avg_points)(evaluation_task)

    evaluation_task.points = points
    await sync_to_async(lambda: evaluation_task.save())()

    return evaluation_task
