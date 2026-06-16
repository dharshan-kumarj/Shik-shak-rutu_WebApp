from pydantic import BaseModel
from typing import List, Optional

class UserRegistration(BaseModel):
    fullName: str
    emailOrPhone: str
    password: str
    state: str
    subject: str
    grade: str
    schoolType: str

class UserLogin(BaseModel):
    emailOrPhone: str
    password: str

class JournalEntry(BaseModel):
    title: str
    wentWell: str
    improve: str
    studentResponse: str
    mood: str
    tags: List[str]

class ChatMessage(BaseModel):
    text: str
    language: str

class GroupCreate(BaseModel):
    name: str
    subject: str
    grade: str
    state: str
    language: str

class InsightPost(BaseModel):
    tried: str
    outcome: str
    tags: List[str]
