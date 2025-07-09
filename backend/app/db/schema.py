from pydantic import BaseModel
from typing import Optional, List

class TodoCreate(BaseModel):
    text: str
    start_time: str
    interval_minutes: int
    user_id: int | None = None  # 생성 시 optional이어야 함

class TodoRead(TodoCreate):
    id: int

    class Config:
        from_attributes = True

class UserCreate(BaseModel):
    email: str

class UserRead(UserCreate):
    id: int

    class Config:
        from_attributes = True

