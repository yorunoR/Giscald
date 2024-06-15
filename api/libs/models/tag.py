from django.db import models

from .base import BaseModel


class Tag(BaseModel):
    name = models.CharField(max_length=128, unique=True)

    def __str__(self):
        return self.name

    class Meta:
        db_table = "tags"
        verbose_name = "タグ"
        verbose_name_plural = "タグ"
