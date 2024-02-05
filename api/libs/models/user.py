from django.db import models

from .soft_delete_base import SoftDeleteBaseModel


class User(SoftDeleteBaseModel):
    activated = models.BooleanField(default=False)
    email = models.EmailField()
    name = models.CharField(max_length=150)
    profile_image = models.CharField(blank=True, null=True)
    role = models.IntegerField(default=0)
    uid = models.CharField(max_length=150)
    anonymous = models.BooleanField(default=False)

    def __str__(self):
        return self.email

    class Meta:
        db_table = "users"
        verbose_name = "ユーザー"
        verbose_name_plural = "ユーザー"
        indexes = [
            models.Index(fields=["email"], condition=models.Q(email__isnull=False), name="index_users_on_email"),
            models.Index(fields=["uid"], condition=models.Q(uid__isnull=False), name="index_users_on_uid"),
        ]
