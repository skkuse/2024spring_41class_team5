from fastapi import APIRouter, Request

auth_router = APIRouter(
    tags=["Auth"],
)

@auth_router.post("/register")
def register(request: Request):
    username = request.json.get("username")
    password = request.json.get("password")
    student_id = request.json.get("student_id")

@auth_router.post("/login")
def login(request: Request):
    username = request.json.get("username")
    password = request.json.get("password")

