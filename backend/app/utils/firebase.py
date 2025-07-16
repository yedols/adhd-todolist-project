# firebase.py
import firebase_admin
from firebase_admin import credentials, auth as firebase_auth
from .load_firebase_secret import load_firebase_credentials

# ✅ 중복 초기화 방지 처리 추가
if not firebase_admin._apps:
    cred_data = load_firebase_credentials()
    cred = credentials.Certificate(cred_data)
    firebase_admin.initialize_app(cred)

# ✅ 토큰 검증 함수
def verify_token(authorization: str):
    if not authorization.startswith("Bearer "):
        raise ValueError("Invalid Authorization header")
    token = authorization.split("Bearer ")[1]
    decoded = firebase_auth.verify_id_token(token)
    return decoded

