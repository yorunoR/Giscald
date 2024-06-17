from django.db import models

from libs.models import Bench, User

from .base import BaseModel


class Status(models.IntegerChoices):
    CREATED = 0, "Created"
    STARTED = 10, "Started"
    COMPLETED = 20, "Completed"
    FAILED = 30, "Failed"


class GenerationTask(BaseModel):
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name="generation_tasks")
    bench = models.ForeignKey(Bench, on_delete=models.CASCADE, related_name="generation_tasks", null=True)
    name = models.CharField(max_length=512, unique=True)
    model_name = models.CharField(max_length=256)
    description = models.TextField(max_length=1024, null=True, blank=True)
    status = models.IntegerField(choices=Status.choices, default=Status.CREATED)
    tags = models.ManyToManyField("Tag", through="GenerationTaskTag")

    class Meta:
        db_table = "generation_tasks"
        verbose_name = "生成タスク"
        verbose_name_plural = "生成タスク"
