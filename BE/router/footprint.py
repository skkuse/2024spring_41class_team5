from fastapi import APIRouter

footprint_router = APIRouter(
    tags=["Footprint"],
)

@footprint_router.post("/compute")

@footprint_router.get("/visulaize")