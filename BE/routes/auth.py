from fastapi import APIRouter, Request
import uuid
import jwt
from datetime import timedelta, datetime
import sys, os
sys.path.append(os.path.dirname(os.path.abspath(os.path.dirname(__file__))))
from database import create_session
from models import UserRegister, UserLogin

auth_router = APIRouter(
    tags=["Auth"],
)

@auth_router.post("/register")
def register(user: UserRegister):
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
        return {"message": "User registered"}


@auth_router.post("/login")
def login(user: UserLogin):
    conn, cur = create_session()
    cur.execute("SELECT * FROM users WHERE student_id = %s AND password = %s", (user.student_id, user.password))
    row = cur.fetchone()
    conn.close()
    if row:
        return {
            "access_token" : access_token_gen(row['user_id'], row['user_name'], row['student_id']), 
            "refresh_token" : refresh_token_gen(row['user_id'], row['user_name'], row['student_id'])
        }
    else:
        return {"message": "Login failed"}

@auth_router.get("/refresh")
def refresh(request: Request):
    refresh_token = request.headers.get('Bearer')
    try:
        payload = jwt.decode(refresh_token, os.environ.get('JWT_SECRET_KEY_REFRESH'), algorithms=['HS256'])
        return { "access_token" : access_token_gen(
            payload['data']['user_id'],
            payload['data']['user_name'],
            payload['data']['student_id']
        ) }
    except jwt.ExpiredSignatureError:
        return {"message": "Token expired"}
    except jwt.InvalidTokenError:
        return {"message": "Invalid token"}

def access_token_gen(user_id, user_name, student_id):
    payload = {
         'exp': datetime.utcnow() + timedelta(minutes=40),
        'iat': datetime.utcnow(),
        'scope': 'access_token',
        'data': {
            'user_id': user_id,
            'user_name': user_name,
            'student_id': student_id
        }
    }
    access_token = jwt.encode(
        payload,
        os.environ.get('JWT_SECRET_KEY_ACCESS'),
        algorithm='HS256'
    )
    return access_token
        

def refresh_token_gen(user_id, user_name, student_id):
    payload = {
        'exp': datetime.utcnow() + timedelta(days=1),
        'iat': datetime.utcnow(),
        'scope': 'refresh_token',
        'data': {
            'user_id': user_id,
            'user_name': user_name,
            'student_id': student_id
        }
    }
    refresh_token = jwt.encode(
        payload,
        os.environ.get('JWT_SECRET_KEY_REFRESH'),
        algorithm='HS256'
    )
    return refresh_token
