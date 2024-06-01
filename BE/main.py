from fastapi import FastAPI

from routes.auth import auth_router
from routes.footprint import footprint_router
# from routes.green import green_router
from routes.history import history_router
from middleware import authentication_check
from database import create_session

from dotenv import load_dotenv
import os

BASE_DIR = os.path.dirname(os.path.abspath(__file__))
load_dotenv(os.path.join(BASE_DIR, ".env"))

app = FastAPI()

app.add_middleware(authentication_check)

app.include_router(auth_router, prefix="/auth")
app.include_router(footprint_router, prefix="/footprint")
# app.include_router(green_router, prefix="/green")
app.include_router(history_router, prefix="/history")

@app.get("/")
def root():
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
    total_fp = original_fp - merged_fp

    cur.execute("SELECT * FROM users")
    row = cur.fetchall()
    total_user = len(row)

    return {"totalFootPrint" : total_fp, "totalUser" : total_user}