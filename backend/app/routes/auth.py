from fastapi import APIRouter, Header, HTTPException
from app.utils.firebase import verify_token
#from app.db.dynamodb import table
from app.db.memory import users_db
from datetime import datetime

router = APIRouter()

@router.post("/register")
def register_user(authorization: str = Header(...)):
    try:
        user = verify_token(authorization)
    except Exception:
        raise HTTPException(status_code=401, detail="Invalid token")

    user_id = user["uid"]
    email = user["email"]

    # # DynamoDB에 사용자 저장
    # table.put_item(Item={
    #     "PK": f"USER#{user_id}",
    #     "SK": "PROFILE",
    #     "email": email,
    #     "created_at": datetime.utcnow().isoformat()
    # })

    # 메모리 DB에 저장
    users_db[user_id] = {
        "email": email,
        "created_at": datetime.utcnow().isoformat()
    }

    return {"message": "User registered", "user_id": user_id}
