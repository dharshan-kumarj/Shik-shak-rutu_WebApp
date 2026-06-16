from fastapi import FastAPI, APIRouter
from fastapi.middleware.cors import CORSMiddleware
from routers import auth, timeline, journal, resources, chat, groups

app = FastAPI(title="Shiksha Saathi API")

# Enable CORS for frontend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"], # For demo purposes
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(auth.router, prefix="/api/auth", tags=["auth"])
app.include_router(timeline.router, prefix="/api/timeline", tags=["timeline"])
app.include_router(journal.router, prefix="/api/journal", tags=["journal"])
app.include_router(resources.router, prefix="/api/resources", tags=["resources"])
app.include_router(chat.router, prefix="/api/chat", tags=["chat"])
app.include_router(groups.router, prefix="/api/groups", tags=["groups"])

# Dummy profile endpoints
@app.get("/api/user/profile")
def get_profile():
    return {
        "fullName": "Demo Teacher",
        "email": "teacher@demo.com",
        "phone": "+919876543210",
        "state": "Maharashtra",
        "subject": "Maths",
        "grade": "5",
        "schoolType": "Government",
        "language": "en"
    }

@app.put("/api/user/profile")
def update_profile(data: dict):
    return {"status": "success", "message": "Profile updated"}

@app.put("/api/user/language")
def update_language(data: dict):
    return {"status": "success", "language": data.get("language")}

@app.get("/")
def read_root():
    return {"message": "Welcome to Shiksha Saathi API"}
