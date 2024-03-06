from functools import wraps


def require_authentication(resolver):
    @wraps(resolver)
    def wrapper(info, **kwargs):
        user = info.context.user
        if user is None:
            raise Exception("Authentication required")
        return resolver(info, **kwargs)

    return wrapper
