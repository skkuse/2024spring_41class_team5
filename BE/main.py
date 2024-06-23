from urllib.request import Request
from fastapi import FastAPI, Request
from utils import jwt_decoder

from routes.auth import auth_router
from routes.green import green_router
from routes.history import history_router
from routes.statistics import statistics_router
from middleware import authentication_check
from fastapi.middleware.cors import CORSMiddleware

from dotenv import load_dotenv
import os

origins = [
    "http://localhost:3000",
    "https://swe-nz2sl01c3-fine-pines-projects.vercel.app",
    "http://swe-nz2sl01c3-fine-pines-projects.vercel.app"
]

BASE_DIR = os.path.dirname(os.path.abspath(__file__))
load_dotenv(os.path.join(BASE_DIR, ".env"))

app = FastAPI()

app.add_middleware(authentication_check)
app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(auth_router, prefix="/auth")
app.include_router(green_router, prefix="/green")
app.include_router(history_router, prefix="/history")
app.include_router(statistics_router, prefix="/statistics")


@app.get("/my_info")
def my_info(request: Request):
    auth_header = request.headers.get('Authorization')
    access_token = auth_header.split(' ')[1]
    message, user = jwt_decoder(access_token, os.environ.get('JWT_SECRET_KEY_ACCESS'))
    return user
