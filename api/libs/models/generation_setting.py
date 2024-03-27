from django.db import models

from libs.models import GenerationTask, User

from .base import BaseModel


class GenerationSetting(BaseModel):
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name="generation_settings")
    generation_task = models.ForeignKey(GenerationTask, on_delete=models.CASCADE, related_name="generation_settings")
    host = models.CharField(max_length=256)
    worker_count = models.IntegerField()
    parameters = models.JSONField()

    class Meta:
        db_table = "generation_settings"
        verbose_name = "生成設定"
        verbose_name_plural = "生成設定"
