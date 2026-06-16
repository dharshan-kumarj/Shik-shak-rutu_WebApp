from fastapi import APIRouter
from models import GroupCreate, InsightPost
from mock_data import MOCK_GROUPS

router = APIRouter()

@router.get("")
def list_groups():
    return MOCK_GROUPS

@router.post("")
def create_group(group: GroupCreate):
    new_group = group.dict()
    new_group["id"] = f"g{len(MOCK_GROUPS) + 1}"
    new_group["tags"] = [group.subject, group.grade, group.state, group.language]
    new_group["members"] = 1
    new_group["active"] = 1
    new_group["lastActivity"] = "Group created just now."
    MOCK_GROUPS.insert(0, new_group)
    return new_group

@router.get("/{id}")
def get_group(id: str):
    for group in MOCK_GROUPS:
        if group["id"] == id:
            group_data = group.copy()
            group_data["posts"] = [
                {
                    "id": "p1", "author": "Priya D.", "state": "Maharashtra", "subject": "Maths",
                    "text": "Tried the pizza cutting activity for fractions today.",
                    "tags": ["Activity", "Fractions"], "dayBadge": "Day 18",
                    "helpful": 12, "comments": 3, "verified": True
                }
            ]
            return group_data
    return {"error": "Not found"}

@router.post("/{id}/post")
def create_post(id: str, post: InsightPost):
    return {"message": "Insight shared"}

@router.post("/{id}/helpful")
def mark_helpful(id: str, data: dict):
    return {"message": "Marked as helpful"}
