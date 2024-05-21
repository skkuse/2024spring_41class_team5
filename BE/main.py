from fastapi import FastAPI
from routes.auth import auth_router
from routes.footprint import footprint_router
from routes.green import green_router
from routes.history import history_router

app = FastAPI()

app.include_router(auth_router, prefix="/auth")
app.include_router(footprint_router, prefix="/footprint")
app.include_router(green_router, prefix="/green")
app.include_router(history_router, prefix="/history")

@app.get("/")
def root():
    return {"root"}