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

class UserRead(UserCreate):
    id: int

    class Config:
        from_attributes = True
