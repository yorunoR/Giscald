from django.db import models

from libs.models import Answer, EvaluationTask, User

from .reply_base import ReplyBaseModel


class Rate(ReplyBaseModel):
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name="rates")
    evaluation_task = models.ForeignKey(EvaluationTask, on_delete=models.CASCADE, related_name="rates")
    # TODO: 削除する
    answer = models.ForeignKey(Answer, on_delete=models.CASCADE, related_name="rates", null=True, blank=True)
    model = models.CharField(max_length=1024)
    point = models.IntegerField()
    answers = models.ManyToManyField("Answer", through="RateAnswer")

    class Meta:
        db_table = "rates"
        verbose_name = "点数"
        verbose_name_plural = "点数"
        constraints = [
            models.UniqueConstraint(fields=["evaluation_task", "answer"], name="rate_unique"),
        ]
