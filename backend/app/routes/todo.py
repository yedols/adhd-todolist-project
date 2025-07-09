from fastapi import APIRouter, Depends, Header, HTTPException
from sqlalchemy.ext.asyncio import AsyncSession
from typing import List
from app.utils.firebase import verify_token
from app.db.database import get_db
from app.db.schema import TodoCreate, TodoRead
from app.crud import crud

router = APIRouter()

@router.get("/me", response_model=List[TodoRead])
async def read_my_todos(
    authorization: str = Header(...),
    db: AsyncSession = Depends(get_db)
):  
    print("📦 Authorization 헤더:", authorization)  # ✅ 추가
    # Firebase 토큰 검증
    try:
        user = verify_token(authorization)
    except Exception as e:
        print("❌ verify_token 실패:", str(e))
        raise HTTPException(status_code=401, detail="Invalid token")

    # 이메일로 사용자 검색
    user_obj = await crud.get_user_by_email(db, user["email"])
    if not user_obj:
        raise HTTPException(status_code=404, detail="User not found")

    # 사용자 ID로 해당 ToDo만 조회
    return await crud.get_todos_by_user(db, user_obj.id)


@router.post("/", response_model=TodoRead)
async def create_todo(
    todo: TodoCreate,
    authorization: str = Header(...),
    db: AsyncSession = Depends(get_db)
):
    try:
        user = verify_token(authorization)
    except Exception:
        raise HTTPException(status_code=401, detail="Invalid token")

    user_obj = await crud.get_user_by_email(db, user["email"])
    if not user_obj:
        raise HTTPException(status_code=404, detail="User not found")

    # 요청 받은 todo 데이터에 사용자 ID를 명확히 할당
    todo_with_user = TodoCreate(
        text=todo.text,
        start_time=todo.start_time,
        interval_minutes=todo.interval_minutes,
        user_id=user_obj.id
    )
    return await crud.create_todo(db, todo_with_user)

@router.get("/", response_model=List[TodoRead])
async def read_todos(db: AsyncSession = Depends(get_db)):
    return await crud.get_todos(db)
