from django.db import models

from libs.models import GenerationTask, Question, User

from .reply_base import ReplyBaseModel


class Answer(ReplyBaseModel):
    messages = models.JSONField()
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name="answers")
    generation_task = models.ForeignKey(GenerationTask, on_delete=models.CASCADE, related_name="answers")
    question = models.ForeignKey(Question, on_delete=models.CASCADE, related_name="answers", null=True)
    turn_number = models.IntegerField()

    class Meta:
        db_table = "answers"
        verbose_name = "回答"
        verbose_name_plural = "回答"
