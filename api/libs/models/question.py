from django.contrib.postgres.fields import ArrayField
from django.db import models

from libs.models import Bench

from .base import BaseModel


class Question(BaseModel):
    bench = models.ForeignKey(Bench, on_delete=models.CASCADE, related_name="questions")
    question_number = models.IntegerField()
    category = models.CharField(max_length=256)
    turns = ArrayField(models.CharField(max_length=4096))
    correct_answers = ArrayField(models.CharField(max_length=4096))
    eval_aspects = ArrayField(models.CharField(max_length=4096))
    function = models.JSONField(null=True, blank=True)

    def __str__(self):
        return str(self.question_number)

    class Meta:
        db_table = "questions"
        verbose_name = "質問"
        verbose_name_plural = "質問"
