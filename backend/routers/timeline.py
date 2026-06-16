from fastapi import APIRouter
from mock_data import MOCK_TIMELINE

router = APIRouter()

@router.get("")
def get_timeline():
    return MOCK_TIMELINE

@router.get("/{day}")
def get_timeline_day(day: int):
    for item in MOCK_TIMELINE:
        if item["day"] == day:
            return item
    return {"error": "Day not found"}
