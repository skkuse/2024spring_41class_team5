from fastapi import Request
from starlette.middleware.base import BaseHTTPMiddleware, RequestResponseEndpoint
from starlette.responses import JSONResponse
import os
from database import create_session
from utils import jwt_decoder

auth_api = [ '/footprint/compute', '/footprint/visualize', '/history', '/history/statistics', '/green' ]

class authentication_check(BaseHTTPMiddleware):
    async def dispatch(self, request: Request, call_next: RequestResponseEndpoint):
        if request.url.path in auth_api:
            auth_header = request.headers.get('Authorization')
            access_token = auth_header.split(' ')[1]
            if access_token:
                message, user = jwt_decoder(access_token, os.environ.get('JWT_SECRET_KEY_ACCESS'))
                conn, cur = create_session()
                cur.execute(f"SELECT * FROM users WHERE user_id = '{user['user_id']}'")
                row = cur.fetchone()
                if row == None:
                    return JSONResponse(content={"message": "Unauthorized"}, status_code=401)
                if message['message'] == "Success":
                    response = await call_next(request)
                    return response
                else:
                    return JSONResponse(content = message, status_code=401)
            else:
                return JSONResponse(content={"message": "Unauthorized"}, status_code=401)
        else:
            response = await call_next(request)
            return response
            