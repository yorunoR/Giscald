from django.db import models

from libs.models import GenerationTask, Tag

from .base import BaseModel


class GenerationTaskTag(BaseModel):
    generation_task = models.ForeignKey(GenerationTask, on_delete=models.CASCADE, related_name="generation_task_tags")
    tag = models.ForeignKey(Tag, on_delete=models.CASCADE, related_name="generation_task_tags")

    class Meta:
        db_table = "generation_task_tags"
        verbose_name = "生成タスクタグ"
        verbose_name_plural = "生成タスクタグ"
