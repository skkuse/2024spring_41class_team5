from fastapi import APIRouter, Request
from green_function import *
import pymysql
from database import create_session
import os
import time
from utils import jwt_decoder
import uuid
from datetime import date


green_router = APIRouter(
    tags=["Green"],
)

# conn = pymysql.connect(host = 'localhost', user='wonyeong', password = 'your_password', db = 'backend', charset = 'utf8')
# cur = conn.cursor()


@green_router.post("/")
async def get_green(request: RequestModel):
    response = get_LLM_response(request.code)
    return {"code" : response}

    
@green_router.post("/codes")
async def process_code(request: CodeCreateRequest, request1: Request):
    conn, cur = create_session()
    #token = request1.headers.get('Bearer')
    #message, user = jwt_decoder(token, os.environ.get('JWT_SECRET_KEY_ACCESS'))
    #user_id = user.get('user_id')
    #user_id = uuid.uuid4()
    #print(user_id)
    auth_header = request1.headers.get('Authorization')
    access_token = auth_header.split(' ')[1]
    message, user = jwt_decoder(access_token, os.environ.get('JWT_SECRET_KEY_ACCESS'))
    user_id = user.get('user_id')
    #user_id = '2309f0e1-c49d-49df-81e5-dee742fcda85'
    original_code = request.original_code
    merged_code = request.merged_code
    code_id = uuid.uuid4()
    current_date = date.today().strftime("%Y-%m-%d")
    footprint_id = uuid.uuid4()
    
    sql = "INSERT INTO codes (user_id, original_code, merged_code, code_id, date) VALUES (%s, %s, %s, %s, %s)"
    cur.execute(sql, (user_id, original_code, merged_code, code_id, current_date))
    conn.commit()
    
    stdout, original_execution_time = execute_java_code(original_code)
    if stdout == 'Compilation Failed':
        return {"message": "Compilation Failed at original code", 'detail': original_execution_time}
    elif stdout == 'Execution Failed':
        return {"message": "Execution Failed at original code", 'detail': original_execution_time}
    
    stdout1, merged_execution_time = execute_java_code(merged_code)
    if stdout == 'Compilation Failed':
        return {"message": "Compilation Failed at merged code", 'detail': original_execution_time}
    elif stdout == 'Execution Failed':
        return {"message": "Execution Failed at merged code", 'detail': original_execution_time}
    
    original_fp = calculate_carbon_footprint(original_execution_time)
    merged_fp = calculate_carbon_footprint(merged_execution_time)
    
    
    sql = "INSERT INTO footprints (footprint_id, code_id, original_fp, merged_fp) VALUES (%s, %s, %s, %s)"
    cur.execute(sql, (footprint_id, code_id, original_fp, merged_fp))
    conn.commit()
    
    return {"id": code_id, "original_code": original_code, "merged_code": merged_code, "original_fp": original_fp, "merged_fp": merged_fp, "date": current_date}
    
    
    