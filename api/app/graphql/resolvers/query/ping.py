from strawberry.types import Info


def resolve(info: Info) -> str:
    return "pong"
