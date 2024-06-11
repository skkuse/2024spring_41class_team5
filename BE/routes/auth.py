from utils import access_token_gen, jwt_decoder, refresh_token_gen
from fastapi import APIRouter, Request
import uuid
import base64
import jwt
import sys, os
sys.path.append(os.path.dirname(os.path.abspath(os.path.dirname(__file__))))
from database import create_session
from models import RefreshToken, UserTokenInfo, UserName

auth_router = APIRouter(
    tags=["Auth"],
)

@auth_router.post("/signup")
def register(request: Request, user: UserName):
    auth_header = request.headers.get('Authorization')
    signup_info = auth_header.split(' ')[1]
    signup_info = base64.b64decode(signup_info).decode('utf-8')
    student_id, password = signup_info.split(':')
    user_name = user.username
    conn, cur = create_session()
    cur.execute("SELECT * FROM users WHERE student_id = %s", student_id)
    row = cur.fetchone()
    if row:
        conn.close()
        return {"message": "User already exists"}
    else:
        user_id = str(uuid.uuid4())
        cur.execute("INSERT INTO users (user_id, user_name, student_id, password) VALUES (%s, %s, %s, %s)", (user_id, user_name, student_id, password))
        conn.commit()
        conn.close()
        user_token_info = UserTokenInfo(user_id = user_id, user_name = user_name, student_id = student_id)
        return {
            "access_token" : access_token_gen(user_token_info), 
            "refresh_token" : refresh_token_gen(user_token_info),
            "expires_in": 2400
        }


@auth_router.post("/login")
def login(request: Request):
    auth_header = request.headers.get('Authorization')
    login_info = auth_header.split(' ')[1]
    login_info = base64.b64decode(login_info).decode('utf-8')
    student_id, password = login_info.split(':')
    conn, cur = create_session()
    cur.execute("SELECT * FROM users WHERE student_id = %s AND password = %s", (student_id, password))
    row = cur.fetchone()
    conn.close()
    user_token_info = UserTokenInfo(user_id=row['user_id'], user_name=row['user_name'], student_id=row['student_id'])
    if row:
        return {
            "access_token" : access_token_gen(user_token_info), 
            "refresh_token" : refresh_token_gen(user_token_info),
            "expires_in": 2400
        }
    else:
        return {"message": "Login failed"}

@auth_router.post("/refresh")
def refresh(request: Request, refresh_token: RefreshToken):
    auth_header = request.headers.get('Authorization')
    client_secret = auth_header.split(' ')[1]
    if client_secret != os.environ.get('CLIENT_SECRET'):
        return {"message": "Invalid client secret"}
    
    refresh_token = refresh_token.refresh_token
    result, user = jwt_decoder(refresh_token, os.environ.get('JWT_SECRET_KEY_REFRESH'))
    if(result['message'] != "Success"):
        return result
    conn, cur = create_session()
    cur.execute("SELECT * FROM users WHERE user_id = %s", user['user_id'])
    row = cur.fetchone()
    conn.close()
    if row is None:
        return {"message": "User not found"}
    
    user_token_info = UserTokenInfo(user_id=row['user_id'], user_name=row['user_name'], student_id=row['student_id'])
    new_refresh_token = refresh_token_gen(user_token_info)
    new_access_token = access_token_gen(user_token_info)

    return {
        "access_token": new_access_token,
        "refresh_token": new_refresh_token,
        "expires_in": 2400
    }
