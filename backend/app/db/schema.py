from pydantic import BaseModel
from typing import Optional, List

class TodoCreate(BaseModel):
    text: str
    start_time: str
    interval_minutes: int
    user_id: int

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

