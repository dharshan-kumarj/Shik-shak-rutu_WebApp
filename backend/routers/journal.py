from fastapi import APIRouter
from typing import Optional
from models import JournalEntry
from mock_data import MOCK_JOURNAL_ENTRIES

router = APIRouter()

@router.get("")
def list_journal(mood: Optional[str] = None):
    if mood:
        return [entry for entry in MOCK_JOURNAL_ENTRIES if entry["mood"] == mood]
    return MOCK_JOURNAL_ENTRIES

@router.post("")
def create_journal(entry: JournalEntry):
    new_entry = entry.dict()
    new_entry["id"] = f"{len(MOCK_JOURNAL_ENTRIES) + 1}"
    new_entry["date"] = "2025-05-20" # mock today
    new_entry["dayBadge"] = "Day 20"
    new_entry["wentWellPreview"] = new_entry["wentWell"][:30] + "..."
    MOCK_JOURNAL_ENTRIES.insert(0, new_entry)
    return {"message": "Journal entry saved", "id": new_entry["id"]}

@router.get("/{id}")
def get_journal(id: str):
    for entry in MOCK_JOURNAL_ENTRIES:
        if entry["id"] == id:
            return entry
    return {"error": "Not found"}
