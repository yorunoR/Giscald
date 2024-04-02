from django.db import models

from libs.models import GenerationTask, User

from .base import BaseModel


class Status(models.IntegerChoices):
    CREATED = 0, "Created"
    STARTED = 10, "Started"
    COMPLETED = 20, "Completed"
    FAILED = 30, "Failed"


class EvaluationTask(BaseModel):
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name="evaluation_tasks")
    generation_task = models.ForeignKey(GenerationTask, on_delete=models.CASCADE, related_name="evaluation_tasks")
    name = models.CharField(max_length=512)
    points = models.JSONField()
    processing_times = models.JSONField()
    status = models.IntegerField(choices=Status.choices, default=Status.CREATED)

    class Meta:
        db_table = "evaluation_tasks"
        verbose_name = "評価タスク"
        verbose_name_plural = "評価タスク"
        constraints = [
            models.UniqueConstraint(fields=["generation_task", "name"], name="evaluation_task_unique"),
        ]
