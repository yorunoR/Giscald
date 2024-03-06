from strawberry.types import Info

from libs.models import User


def resolve(info: Info):
    try:
        if info.context.user:
            user = info.context.user
        if info.context.uid:
            user = User.objects.create(uid=info.context.uid, email=info.context.email, activated=True)
    except Exception as e:
        raise Exception("Invalid user.") from e

    return user
