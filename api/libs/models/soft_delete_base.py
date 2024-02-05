from django.db import models


class SoftDeleteManager(models.Manager):
    def get_queryset(self):
        query = super().get_queryset()

        query = query.filter(deleted_at=None)

        return query


class SoftDeleteBaseModel(models.Model):
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    deleted_at = models.DateTimeField(blank=True, null=True)

    objects = SoftDeleteManager()
    with_deleted = models.Manager()

    class Meta:
        abstract = True
