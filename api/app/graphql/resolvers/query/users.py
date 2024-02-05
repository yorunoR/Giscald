from strawberry.types import Info

from libs.models import User


def resolve(info: Info):
    return User.objects.all()
