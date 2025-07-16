from fastapi import APIRouter, Header, HTTPException, Depends, Body
from app.utils.firebase import verify_token
from sqlalchemy.ext.asyncio import AsyncSession
from app.db.database import get_db
from app.db.schema import UserCreate, UserRead
from app.crud import crud
from pydantic import BaseModel

router = APIRouter()

@router.post("/register", response_model=UserRead)
async def register_user(
    authorization: str = Header(...),
    fcm_token: str = Body(..., embed=True),
    db: AsyncSession = Depends(get_db)
):
    try:
        user = verify_token(authorization)
    except Exception:
        raise HTTPException(status_code=401, detail="Invalid token")

    email = user["email"]

    existing_user = await crud.get_user_by_email(db, email)
    if existing_user:
        # ✅ 이미 등록된 유저라도 토큰 최신화
        await crud.update_fcm_token(db, existing_user.id, fcm_token)
        return existing_user

    user_create = UserCreate(email=email, fcm_token=fcm_token)
    return await crud.create_user(db, user_create)

class FCMTokenRequest(BaseModel):
    fcm_token: str

@router.post("/login")
async def login_user(
    data: FCMTokenRequest,
    authorization: str = Header(...),
    db: AsyncSession = Depends(get_db)
):
    try:
        user = verify_token(authorization)
    except Exception:
        raise HTTPException(status_code=401, detail="Invalid Firebase token")

    user_obj = await crud.get_user_by_email(db, user["email"])
    if not user_obj:
        raise HTTPException(status_code=404, detail="User not found")

    # ✅ FCM 토큰 최신화
    await crud.update_fcm_token(db, user_obj.id, data.fcm_token)
    return {"message": "FCM token updated"}
