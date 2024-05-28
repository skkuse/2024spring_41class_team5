from fastapi import APIRouter
from green_function import *





green_router = APIRouter(
    tags=["Green"],
)



@green_router.post("/")
async def get_green(request: RequestModel):
    response = get_LLM_response(request.data)
    return {response}

