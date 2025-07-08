from fastapi import APIRouter, Header, HTTPException
from app.utils.firebase import verify_token
from sqlalchemy.ext.asyncio import AsyncSession
#from app.db.dynamodb import table
from datetime import datetime
from app.db.database import get_db
from app.db.schema import UserCreate, UserRead
from app.crud import crud

router = APIRouter()

@router.post("/register")
async def register_user(authorization: str = Header(...)):
    try:
        user = verify_token(authorization)
    except Exception:
        raise HTTPException(status_code=401, detail="Invalid token")

    user_id = user["uid"]
    email = user["email"]
    # return {"message": "User registered", "user_id": user_id}
    existing_user = await crud.get_user_by_email(db, email)
    if existing_user:
        return existing_user

    user_create = UserCreate(email=email)
    return await crud.create_user(db, user_create)
