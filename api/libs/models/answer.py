from django.db import models

from libs.models import GenerationTask, User

from .reply_base import ReplyBaseModel


class Answer(ReplyBaseModel):
    messages = models.JSONField()
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name="answers")
    generation_task = models.ForeignKey(GenerationTask, on_delete=models.CASCADE, related_name="answers")
    category = models.CharField(max_length=512)

    class Meta:
        db_table = "answers"
        verbose_name = "回答"
        verbose_name_plural = "回答"
