from fastapi import APIRouter
from green_function import *
import pymysql


green_router = APIRouter(
    tags=["Green"],
)


conn = pymysql.connect(host = 'localhost', user='wonyeong', password = 'your_password', db = 'sample', charset = 'utf8')
cur = conn.cursor()


@green_router.post("/")
async def get_green(request: RequestModel):
    response = get_LLM_response(request.data)
    return {response}

@green_router.post("/save")
async def get_data(request: FixedCode):
    
    code = request.fixed_code
    user_id = request.id
    sql = "INSERT INTO codes (user_id, code) VALUES (%s, %s)"
    cur.execute(sql, (user_id, code))
    conn.commit()
    return {"message": "Data saved successfully"}
    


'''
TABLE `codes` (
    `code_id` INT NOT NULL AUTO_INCREMENT,
    `user_id` CHAR(10) NOT NULL,
    `code` VARCHAR(1000) NOT NULL,
    `date` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (`code_id`, `user_id`)
);
'''