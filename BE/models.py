from pydantic import BaseModel

class User(BaseModel):
    user_name: str
    student_id: str
    password: str
