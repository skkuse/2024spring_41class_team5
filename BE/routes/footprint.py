from fastapi import APIRouter, Request

footprint_router = APIRouter(
    tags=["Footprint"],
)


@footprint_router.post("/compute")
def compute(request: Request):
    return {"compute"}


@footprint_router.get("/visualize")
def visualize():
    return {"visualize"}
