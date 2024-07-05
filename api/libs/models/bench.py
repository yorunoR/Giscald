from django.db import models

from .base import BaseModel


class Bench(BaseModel):
    name = models.CharField(max_length=512, unique=True)
    description = models.TextField(max_length=1024, null=True, blank=True)
    template = models.TextField(max_length=4096, null=True, blank=True)
    code = models.CharField(max_length=128, null=False, unique=True)
    system_template = models.TextField(max_length=4096, null=True, blank=True)
    locked = models.BooleanField(default=True)

    def __str__(self):
        return self.name

    class Meta:
        db_table = "benches"
        verbose_name = "評価ベンチ"
        verbose_name_plural = "評価ベンチ"
