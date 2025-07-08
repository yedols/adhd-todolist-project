from fastapi import APIRouter, Depends
from sqlalchemy.ext.asyncio import AsyncSession
from typing import List
from app.db.database import get_db
from app.db.schema import TodoCreate, TodoRead
from app.crud import crud

router = APIRouter()

#@router.get("/")
#async def get_todos():
#   return [{"id": 1, "task": "샘플 할 일"}]

@router.post("/", response_model=TodoRead)
async def create_todo(todo: TodoCreate, db: AsyncSession = Depends(get_db)):
    return await crud.create_todo(db, todo)

@router.get("/", response_model=List[TodoRead])
async def read_todos(db: AsyncSession = Depends(get_db)):
    return await crud.get_todos(db)
