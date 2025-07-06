from fastapi import APIRouter

router = APIRouter()

@router.get("/")
async def get_todos():
    return [{"id": 1, "task": "샘플 할 일"}]
