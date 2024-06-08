from pydantic import BaseModel

class UserTokenInfo(BaseModel):
    user_id: str
    user_name: str
    student_id: str

class UserName(BaseModel):
    username: str

class RefreshToken(BaseModel):
    refresh_token: str