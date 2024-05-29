from fastapi import APIRouter, Request

history_router = APIRouter(
    tags=["History"],
)

@history_router.get("/")
def history():
    return {"history"}

@history_router.get("/statistics")
def statistics(request: Request):
    return {"statistics"}
