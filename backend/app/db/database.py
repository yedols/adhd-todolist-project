from sqlalchemy.ext.asyncio import create_async_engine, AsyncSession
from sqlalchemy.orm import sessionmaker, declarative_base
from dotenv import load_dotenv
import os
import boto3
from app.utils.load_aws_secret import get_secret

# ✅ 시크릿에서 RDS 정보 불러오기
secret = get_secret("prod/db/rds")

DB_USER = secret["username"]
DB_PASSWORD = secret["password"]
DB_HOST = secret["host"]
DB_PORT = secret["port"]
DB_NAME = secret["database"]

DATABASE_URL = (
    f"mysql+aiomysql://{DB_USER}:{DB_PASSWORD}@{DB_HOST}:{DB_PORT}/{DB_NAME}"
)

engine = create_async_engine(DATABASE_URL, echo=True, future=True)

AsyncSessionLocal = sessionmaker(
    bind=engine,
    class_=AsyncSession,
    expire_on_commit=False,
)

Base = declarative_base()

async def get_db():
    async with AsyncSessionLocal() as session:
        yield session
