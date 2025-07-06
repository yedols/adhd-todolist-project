from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.routes import auth, todo

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],  # 프론트 도메인
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
@app.get("/")
async def root():
    return {"message": "Hello, FastAPI is running!"}

app.include_router(auth.router, prefix="/api/auth")
app.include_router(todo.router, prefix="/api/todo")
