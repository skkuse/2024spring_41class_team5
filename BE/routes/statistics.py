from fastapi import APIRouter, Request
from database import create_session
from utils import jwt_decoder
import os

statistics_router = APIRouter(
    tags=["Statistics"],
)

@statistics_router.get("/")
def total_statistics():
    conn, cur = create_session()
    query = (
        "SELECT footprints.original_fp, footprints.merged_fp "
        "FROM users "
        "JOIN codes ON users.user_id = codes.user_id "
        "JOIN footprints ON codes.code_id = footprints.code_id"
    )
    cur.execute(query)
    row = cur.fetchall()
    original_fp = 0
    merged_fp = 0
    for record in row:
        original_fp += record['original_fp']
        merged_fp += record['merged_fp']

    cur.execute("SELECT * FROM users")
    row = cur.fetchall()
    total_user = len(row)
    conn.close()

    return {"total_original_fp" : original_fp, "total_merged_fp": merged_fp, "total_users" : total_user}

@statistics_router.get("/personal")
def personal_statistics(request: Request):
    auth_header = request.headers.get('Authorization')
    token = auth_header.split(' ')[1]
    result, user = jwt_decoder(token, os.environ.get('JWT_SECRET_KEY_ACCESS'))
    if result['message'] != "Success":
        return result  
    user_id = user['user_id']
    conn, cur = create_session()
    query = (
        "SELECT footprints.original_fp, footprints.merged_fp "
        "FROM users "
        "JOIN codes ON users.user_id = codes.user_id "
        "JOIN footprints ON codes.code_id = footprints.code_id "
        f"WHERE users.user_id = '{user_id}'"
    )
    cur.execute(query)
    row = cur.fetchall()
    conn.close()
    original_fp = 0
    merged_fp = 0
    for record in row:
        original_fp += record['original_fp']
        merged_fp += record['merged_fp']

    return {"total_original_fp" : original_fp, "total_merged_fp": merged_fp}