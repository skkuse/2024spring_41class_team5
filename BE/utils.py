import jwt

def jwt_decoder(token: str, key: str):
    try:
        payload = jwt.decode(token, key, algorithms=['HS256'])
        user = {
            'user_id': payload['data']['user_id'],
            'user_name': payload['data']['user_name'],
            'student_id': payload['data']['student_id']
        }
        return {"message": "Success"}, user
    except jwt.ExpiredSignatureError:
        return {"message": "Token expired"}
    except jwt.InvalidTokenError:
        return {"message": "Invalid Token"}