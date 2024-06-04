from fastapi import APIRouter, Request
from database import create_session
from utils import jwt_decoder
import os

history_router = APIRouter(
    tags=["History"],
)

@history_router.get("/")
def history(request: Request):
    token = request.headers.get('Bearer')
    message, user = jwt_decoder(token, os.environ.get('JWT_SECRET_KEY_ACCESS'))
    user_id = user.get('user_id')
    
    conn, cur = create_session()
    query = (
        "SELECT codes.code_id, codes.original_code, codes.merged_code, codes.date, footprints.original_fp, footprints.merged_fp "
        "FROM users "
        "JOIN codes ON users.user_id = codes.user_id "
        "JOIN footprints ON codes.code_id = footprints.code_id "
        f"WHERE users.user_id = '{user_id}'"
    )

    cur.execute(query)
    row = cur.fetchall()
    res = {"user_id": user_id, "codes": row}
    return res

@history_router.get("/statistics")
def statistics(request: Request):
    conn, cur = create_session()
    return {"statistics"}
