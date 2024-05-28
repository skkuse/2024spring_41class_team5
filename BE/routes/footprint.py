from fastapi import APIRouter

footprint_router = APIRouter(
    tags=["Footprint"],
)

@footprint_router.post("/compute")
def compute(request: Request):
    return {"compute"};

@footprint_router.get("/visulaize")
def visualize():
    return {"visualize"};
