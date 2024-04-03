from django.db import models

from .base import BaseModel


class Bench(BaseModel):
    name = models.CharField(max_length=512, unique=True)
    description = models.TextField(max_length=1024, null=True, blank=True)

    class Meta:
        db_table = "benches"
        verbose_name = "評価ベンチ"
        verbose_name_plural = "評価ベンチ"
