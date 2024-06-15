import pymysql
import os
from dotenv import load_dotenv

def create_session():
    conn = pymysql.connect(
        host=os.environ.get('DB_HOST'),
        user=os.environ.get('DB_USER'),
        password=os.environ.get('DB_PASS'),
        db=os.environ.get('DB_NAME'),
        charset='utf8',
        cursorclass=pymysql.cursors.DictCursor
    )
    cur = conn.cursor()
    return conn, cur
