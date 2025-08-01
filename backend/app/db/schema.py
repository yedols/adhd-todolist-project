from pydantic import BaseModel
from typing import Optional
from datetime import datetime

class TodoCreate(BaseModel):
    text: str
    start_time: datetime
    interval_minutes: int
    is_checked: Optional[bool] = False
    last_notified_time: Optional[datetime] = None
    user_id: Optional[int] = None

class TodoRead(TodoCreate):
    id: int

    class Config:
        from_attributes = True

class UserCreate(BaseModel):
    email: str
    fcm_token: Optional[str] = None

class UserRead(UserCreate):
    id: int

    class Config:
        from_attributes = True

class TodoUpdate(BaseModel):
    text: Optional[str]
    start_time: Optional[datetime]
    interval_minutes: Optional[int]
    is_checked: Optional[bool]
    last_notified_time: Optional[datetime]
