import firebase_admin
from firebase_admin import credentials, auth as firebase_auth
from firebase_admin import credentials, initialize_app

cred = credentials.Certificate("app/utils/firebase-service-account.json")
initialize_app(cred)

def verify_token(authorization: str):
    if not authorization.startswith("Bearer "):
        raise ValueError("Invalid Authorization header")
    token = authorization.split("Bearer ")[1]
    decoded = firebase_auth.verify_id_token(token)
    return decoded