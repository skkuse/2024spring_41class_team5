from fastapi import APIRouter

history_router = APIRouter(
    tags=["History"],
)

@history_router.get("/")
def history():
    return {"history"}

@history_router.post("/statistics")
def statistics(request: Request):
    return {"statistics"}
