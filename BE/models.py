from pydantic import BaseModel

class UserRegister(BaseModel):
    user_name: str
    student_id: str
    password: str

class UserLogin(BaseModel):
    student_id: str
    password: str