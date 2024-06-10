from datetime import datetime, timedelta
import os
from models import UserTokenInfo
import jwt

def jwt_decoder(token: str, key: str):
    try:
        payload = jwt.decode(token, key, algorithms=['HS256'])
        print(payload)
        user = {
            'user_id': payload['data']['user_id'],
            'user_name': payload['data']['user_name'],
            'student_id': payload['data']['student_id']
        }
        return {"message": "Success"}, user
    except jwt.ExpiredSignatureError:
        return {"message": "Token expired"}, None
    except jwt.InvalidTokenError:
        return {"message": "Invalid Token"}, None
    
def access_token_gen(user:UserTokenInfo):
    payload = {
        'exp': datetime.now() + timedelta(minutes=40),
        'iat': datetime.now(),
        'scope': 'access_token',
        'data': {
            'user_id': user.user_id,
            'user_name': user.user_name,
            'student_id': user.student_id
        }
    }
    print (os.environ.get('JWT_SECRET_KEY_ACCESS'))
    access_token = jwt.encode(
        payload,
        os.environ.get('JWT_SECRET_KEY_ACCESS'),
        algorithm='HS256'
    )
    return access_token
        

def refresh_token_gen(user:UserTokenInfo):
    payload = {
        'exp': datetime.now() + timedelta(days=7),
        'iat': datetime.now(),
        'scope': 'access_token',
        'data': {
            'user_id': user.user_id,
            'user_name': user.user_name,
            'student_id': user.student_id
        }
    }
    refresh_token = jwt.encode(
        payload,
        os.environ.get('JWT_SECRET_KEY_REFRESH'),
        algorithm='HS256'
    )
    return refresh_token