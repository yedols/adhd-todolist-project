from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi.routing import APIRoute    #확인용
from app.routes import auth, todo
from app.db.database import engine
from app.db.model import Base

app = FastAPI()

print("📦 app.routes.todo 등록 확인됨")  # 모듈 import 시 확인

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # 프론트 도메인 -> 테스트용 이기 때문에 나중에 서비스 배포할 때는 *로 사용 X
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
@app.on_event("startup")
async def on_startup():
    async with engine.begin() as conn:
        await conn.run_sync(Base.metadata.create_all)

    # 라우터 등록 경로 확인
    print("✅ 등록된 경로:")
    for route in app.routes:
        if isinstance(route, APIRoute):
            print(route.path)


@app.get("/")
async def root():
    return {"message": "Hello, FastAPI is running!"}


#라우터 등록
app.include_router(auth.router, prefix="/api/auth")
app.include_router(todo.router, prefix="/api/todo")
