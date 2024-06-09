from fastapi import APIRouter, Request
from database import create_session
from utils import jwt_decoder
import os

history_router = APIRouter(
    tags=["History"],
)


@history_router.get("/")
def history(request: Request):
    res = {
        "user_id": "12345",
        "codes": [
            {
                "code_id": "1",
                "original_code": "",
                "merged_code": "",
                "date": "2024-06-03",
                "original_fp": 10.5,
                "merged_fp": 8.3,
            },
            {
                "code_id": "2",
                "original_code": "",
                "merged_code": "",
                "date": "2024-06-03",
                "original_fp": 15.2,
                "merged_fp": 12.7,
            },
            {
                "code_id": "3",
                "original_code": "",
                "merged_code": "",
                "date": "2024-06-04",
                "original_fp": 9.1,
                "merged_fp": 7.8,
            },
            {
                "code_id": "4",
                "original_code": "",
                "merged_code": "",
                "date": "2024-06-06",
                "original_fp": 14.0,
                "merged_fp": 11.6,
            },
            {
                "code_id": "5",
                "original_code": "",
                "merged_code": "",
                "date": "2024-06-06",
                "original_fp": 11.3,
                "merged_fp": 9.9,
            },
            {
                "code_id": "6",
                "original_code": "",
                "merged_code": "",
                "date": "2024-06-06",
                "original_fp": 13.5,
                "merged_fp": 10.2,
            },
            {
                "code_id": "7",
                "original_code": "",
                "merged_code": "",
                "date": "2024-06-08",
                "original_fp": 16.7,
                "merged_fp": 13.4,
            },
        ],
    }
    return res
