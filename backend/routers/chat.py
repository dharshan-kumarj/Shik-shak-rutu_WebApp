from fastapi import APIRouter
from models import ChatMessage
from mock_data import MOCK_CHAT_SESSIONS, COACHING_RESPONSES
import time

router = APIRouter()

@router.get("/sessions")
def list_sessions():
    return MOCK_CHAT_SESSIONS

@router.get("/sessions/{id}")
def get_session(id: str):
    return {
        "id": id,
        "messages": [
            {"role": "user", "text": "How do I handle disruptive students?", "time": "10:00 AM"},
            {"role": "coach", "text": COACHING_RESPONSES["classroom management"], "time": "10:01 AM"}
        ]
    }

@router.post("/message")
def send_message(message: ChatMessage):
    # simple keyword matching
    reply = COACHING_RESPONSES["default"]
    lower_text = message.text.lower()
    for key in COACHING_RESPONSES:
        if key in lower_text:
            reply = COACHING_RESPONSES[key]
            break
    
    return {
        "role": "coach",
        "text": reply,
        "time": "Just now"
    }

@router.post("/new")
def new_session():
    return {"id": f"c{int(time.time())}"}
