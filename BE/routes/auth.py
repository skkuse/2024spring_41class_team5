from fastapi import APIRouter


auth_router = APIRouter(
    tags=["Auth"],
)

@auth_router.post("/register")

@auth_router.post("/login")
