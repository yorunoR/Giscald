from django.db import models

from libs.models import Answer, Rate

from .base import BaseModel


class RateAnswer(BaseModel):
    rate = models.ForeignKey(Rate, on_delete=models.CASCADE, related_name="rate_answers")
    answer = models.ForeignKey(Answer, on_delete=models.CASCADE, related_name="rate_answers")

    class Meta:
        db_table = "rate_answers"
        verbose_name = "点数に対する回答"
        verbose_name_plural = "点数に対する回答"
