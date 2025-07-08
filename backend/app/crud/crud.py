from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.future import select
from app.db import model, schema

async def create_user(db: AsyncSession, user: schema.UserCreate):
    db_user = model.User(email=user.email)
    db.add(db_user)
    await db.commit()
    await db.refresh(db_user)
    return db_user

async def get_user_by_email(db: AsyncSession, email: str):
    result = await db.execute(select(model.User).where(model.User.email == email))
    return result.scalars().first()

async def create_todo(db: AsyncSession, todo: schema.TodoCreate):
    db_todo = model.Todo(**todo.dict())
    db.add(db_todo)
    await db.commit()
    await db.refresh(db_todo)
    return db_todo

async def get_todos(db: AsyncSession):
    result = await db.execute(select(model.Todo))
    return result.scalars().all()
