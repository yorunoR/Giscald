from django.core.validators import MaxValueValidator, MinValueValidator
from django.db import models

from .base import BaseModel


class ReplyBaseModel(BaseModel):
    text = models.TextField()
    finish_reason = models.CharField(max_length=256)
    usage = models.JSONField()
    processing_time = models.DecimalField(max_digits=5, decimal_places=2, validators=[MinValueValidator(0.01), MaxValueValidator(999.99)])

    class Meta:
        abstract = True
