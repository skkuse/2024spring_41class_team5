from fastapi import APIRouter

history_router = APIRouter(
    tags=["History"],
)

@history_router.get("/")

@history_router.post("/statistics")