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
    print("✅ create_todo 호출됨:", todo.dict())
    db_todo = model.Todo(**todo.dict())
    db.add(db_todo)
    await db.commit()
    await db.refresh(db_todo)
    return db_todo

async def get_todos(db: AsyncSession):
    result = await db.execute(select(model.Todo))
    return result.scalars().all()

async def get_todos_by_user(db: AsyncSession, user_id: int):
    result = await db.execute(
        select(model.Todo).where(model.Todo.user_id == user_id)
    )
    return result.scalars().all()

# 내용 수정관련 함수
async def update_todo(db: AsyncSession, todo_id: int, todo_data: schema.TodoUpdate):
    result = await db.execute(select(model.Todo).where(model.Todo.id == todo_id))
    todo = result.scalars().first()
    if not todo:
        return None

    for field, value in todo_data.dict(exclude_unset=True).items():
        setattr(todo, field, value)

    await db.commit()
    await db.refresh(todo)
    return todo

# ✅ 추가: 체크 상태를 업데이트하는 함수
async def update_todo_status(db: AsyncSession, todo_id: int, is_checked: bool):
    result = await db.execute(select(model.Todo).where(model.Todo.id == todo_id))
    todo_obj = result.scalars().first()
    if not todo_obj:
        return None
    todo_obj.is_checked = is_checked
    await db.commit()
    await db.refresh(todo_obj)
    return todo_obj

