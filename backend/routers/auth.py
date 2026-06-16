from fastapi import APIRouter
from models import UserRegistration, UserLogin

router = APIRouter()

@router.post("/register")
def register(user: UserRegistration):
    return {"token": "mock-jwt-token-register", "message": "Registration successful"}

@router.post("/login")
def login(user: UserLogin):
    return {"token": "mock-jwt-token-login", "message": "Login successful"}
