from django.db import models

from .base import BaseModel


class Bench(BaseModel):
    name = models.CharField(max_length=512, unique=True)
    description = models.TextField(max_length=1024, null=True, blank=True)
    template = models.TextField(max_length=4096, null=True, blank=True)
    # TODO: 既存データのため null=True としたが、 null=False, unique=True とする
    code = models.CharField(max_length=128, null=True)
    system_template = models.TextField(max_length=4096, null=True, blank=True)

    class Meta:
        db_table = "benches"
        verbose_name = "評価ベンチ"
        verbose_name_plural = "評価ベンチ"
