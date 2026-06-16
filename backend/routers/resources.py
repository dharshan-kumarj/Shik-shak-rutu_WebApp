from fastapi import APIRouter
from mock_data import MOCK_RESOURCES

router = APIRouter()

@router.get("")
def list_resources():
    return MOCK_RESOURCES

@router.post("/bookmark")
def toggle_bookmark(data: dict):
    return {"message": "Bookmark toggled", "resourceId": data.get("id")}

@router.get("/bookmarked")
def list_bookmarked():
    return [MOCK_RESOURCES[0]] # Just return one for demo
