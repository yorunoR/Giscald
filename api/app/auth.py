import os

import jwt

# NOTE: Cognito
# user_pool_id = os.environ["USER_POOL_ID"]
# client_id = os.environ["CLIENT_ID"]
# region = os.environ["AWS_DEFAULT_REGION"]

# NOTE: Firebase
project_id = os.environ["FIREBASE_PROJECT_ID"]


def decode_jwt(token):
    try:
        # NOTE: Cognito
        # issuer = f"https://cognito-idp.{region}.amazonaws.com/{user_pool_id}"
        # jwks_url = f"{issuer}/.well-known/jwks.json"

        # NOTE: Firebase
        issuer = f"https://securetoken.google.com/{project_id}"
        jwks_url = "https://www.googleapis.com/service_accounts/v1/jwk/securetoken@system.gserviceaccount.com"

        jwks_client = jwt.PyJWKClient(jwks_url)
        signing_key = jwks_client.get_signing_key_from_jwt(token)

        # NOTE: Cognito
        # payload = jwt.decode(token, signing_key.key, algorithms=["RS256"], audience=client_id, issuer=issuer)

        # NOTE: Firebase
        payload = jwt.decode(token, signing_key.key, algorithms=["RS256"], audience=project_id, issuer=issuer)

        if payload.get("email_verified") is False:
            return None

        return {"uid": payload.get("user_id"), "email": payload.get("email"), "name": payload.get("name")}
    except jwt.ExpiredSignatureError:
        return None
    except jwt.DecodeError:
        return None
    except Exception:
        return None
