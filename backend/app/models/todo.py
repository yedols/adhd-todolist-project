from pydantic import BaseModel
from typing import Optional

class Todo(BaseModel):
    id: str
    task: str
    is_done: bool = False
    user_id: Optional[str] = None