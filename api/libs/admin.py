from django.contrib import admin

from .models import AdminUser, Answer, GenerationTask, User


@admin.register(AdminUser)
class AdminUserAdmin(admin.ModelAdmin):
    list_display = [
        "email",
        "username",
        "last_name",
        "first_name",
        "is_superuser",
        "is_staff",
        "is_active",
        "date_joined",
        "last_login",
    ]

    fields = [
        "email",
        "username",
        "last_name",
        "first_name",
        "is_superuser",
        "is_staff",
        "is_active",
        "date_joined",
        "last_login",
    ]

    readonly_fields = [
        "date_joined",
        "last_login",
    ]

    def has_add_permission(self, request, obj=None):
        return False


@admin.register(User)
class UserAdmin(admin.ModelAdmin):
    list_display = [
        "email",
        "name",
        "role",
        "activated",
        "anonymous",
    ]

    fields = [
        "email",
        "name",
        "uid",
        "role",
        "profile_image",
        "activated",
        "anonymous",
        "created_at",
        "updated_at",
    ]

    readonly_fields = [
        "uid",
        "anonymous",
        "created_at",
        "updated_at",
    ]


@admin.register(GenerationTask)
class GenerationTaskAdmin(admin.ModelAdmin):
    pass


@admin.register(Answer)
class AnswerAdmin(admin.ModelAdmin):
    pass
