from dataclasses import dataclass
from typing import (
    Any,
)

from django.http import HttpRequest
from django.http.response import HttpResponse
from strawberry.django.views import GraphQLView

from app.auth import decode_jwt
from libs.models import User


@dataclass
class Context:
    request: HttpRequest
    response: HttpResponse
    user: User | None
    uid: str | None
    email: str | None

    def __getitem__(self, key: str):
        # __getitem__ override needed to avoid issues for who's
        # using info.context["request"]
        return super().__getattribute__(key)

    def get(self, key: str) -> Any:
        """Enable .get notation for accessing the request"""
        return super().__getattribute__(key)


class CustomContextGraphQLView(GraphQLView):
    def get_context(self, request: HttpRequest, response: HttpResponse) -> Any:
        user = None
        uid = None
        email = None

        token = request.headers.get("Authorization", "").split("Bearer ")[-1]
        if token:
            payload = decode_jwt(token)
            if payload is not None:
                user = User.objects.filter(uid=payload["uid"]).first()
                if user is None:
                    uid = payload["uid"]
                    email = payload["email"]

        return Context(request=request, response=response, user=user, uid=uid, email=email)
