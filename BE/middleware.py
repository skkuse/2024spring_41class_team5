from fastapi import Request
from starlette.middleware.base import BaseHTTPMiddleware, RequestResponseEndpoint
from starlette.responses import Response, JSONResponse
import jwt
import os

auth_api = [ '/footprint/compute', '/footprint/visualize', '/history', '/history/statistics', '/green' ]

class authentication_check(BaseHTTPMiddleware):
    async def dispatch(self, request: Request, call_next: RequestResponseEndpoint):
        if request.url.path in auth_api:
            access_token = request.headers.get('Bearer')
            if access_token:
                try:
                    payload = jwt.decode(access_token, os.environ.get('JWT_SECRET_KEY_ACCESS'), algorithms=['HS256'])
                    user = {
                        'user_id': payload['data']['user_id'],
                        'user_name': payload['data']['user_name'],
                        'student_id': payload['data']['student_id']
                    }
                    request.state.user = user
                    response = await call_next(request)
                    return response
                except jwt.ExpiredSignatureError:
                    return JSONResponse(content = {"message": "Token expired"}, status_code=401)
                except jwt.InvalidTokenError:
                    return JSONResponse(content = {"message": "Invalid Token"}, status_code=401)
            else:
                return JSONResponse(content={"message": "Unauthorized"}, status_code=401)
        else:
            response = await call_next(request)
            return response
            