from fastapi import APIRouter, Request
import uuid
import sys, os
sys.path.append(os.path.dirname(os.path.abspath(os.path.dirname(__file__))))
from database import create_session
from models import User

auth_router = APIRouter(
    tags=["Auth"],
)

@auth_router.post("/register")
def register(user: User):
    conn, cur = create_session()
    cur.execute("SELECT * FROM users WHERE student_id = %s", user.student_id)
    row = cur.fetchone()
    if row:
        conn.close()
        return {"message": "User already exists"}
    else:
        cur.execute("INSERT INTO users (user_id, user_name, student_id, password) VALUES (%s, %s, %s, %s)", (uuid.uuid4(), user.user_name, user.student_id, user.password))
        conn.commit()
        conn.close()
        return {"message": "User registered successfully"}


@auth_router.post("/login")
def login(user: User):
    conn, cur = create_session()
    cur.execute("SELECT * FROM users WHERE student_id = %s AND password = %s", (user.student_id, user.password))
    row = cur.fetchone()
    conn.close()
    if row:
        return {"message": "Login successful"}
    else:
        return {"message": "Login failed"}

