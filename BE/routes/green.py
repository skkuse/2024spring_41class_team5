from fastapi import APIRouter
from green_function import *
import pymysql
import subprocess
import os
import time

green_router = APIRouter(
    tags=["Green"],
)


conn = pymysql.connect(host = 'localhost', user='wonyeong', password = 'your_password', db = 'backend', charset = 'utf8')
cur = conn.cursor()


@green_router.post("/")
async def get_green(request: RequestModel):
    response = get_LLM_response(request.data)
    return {response}

# @green_router.post("/save")
# async def get_data(request: FixedCode):
    
#     code = request.fixed_code
#     user_id = request.id
#     sql = "INSERT INTO codes (user_id, code) VALUES (%s, %s)"
#     cur.execute(sql, (user_id, code))
#     conn.commit()
#     return {"message": "Data saved successfully"}
    
    


    
