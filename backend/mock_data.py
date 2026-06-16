MOCK_TIMELINE = [
    {"day": 1, "status": "completed", "type": "Micro-Tip", "title": "Welcome & First Tip", "date": "2025-05-01", "detail": "Started journey with NCERT guideline on fractions."},
    {"day": 3, "status": "completed", "type": "Check-In", "title": "Class Diagnostic", "date": "2025-05-03", "detail": "Answered 3 diagnostic questions about class engagement."},
    {"day": 7, "status": "completed", "type": "Peer Match", "title": "Verified Peer Connected", "date": "2025-05-07", "detail": "Matched with Priya from Maharashtra (Class 5 Maths)."},
    {"day": 15, "status": "completed", "type": "Module", "title": "Interactive Scenario", "date": "2025-05-15", "detail": "Completed 10-min module on slow learners."},
    {"day": 20, "status": "today", "type": "Journal Entry", "title": "Mid-Journey Reflection", "date": "2025-05-20", "detail": "Auto-generated journal entry ready to review."},
    {"day": 30, "status": "upcoming", "type": "Exit Sync", "title": "DIKSHA Sync", "date": "2025-05-30", "detail": "Complete journey for CPD credit."}
]

MOCK_JOURNAL_ENTRIES = [
    {
        "id": "1", "date": "2025-05-18", "dayBadge": "Day 18",
        "title": "Teaching Fractions with Props",
        "mood": "😊",
        "wentWellPreview": "Using cut out paper circles worked great...",
        "tags": ["#Class5", "#Maths", "#Fractions"],
        "wentWell": "Using cut out paper circles worked great. The visual representation really clicked for the students who were struggling yesterday.",
        "improve": "I spent too much time on the setup, leaving less time for individual practice.",
        "studentResponse": "Highly engaged. Even the quiet students participated in cutting the 'pizzas'."
    },
    {
        "id": "2", "date": "2025-05-10", "dayBadge": "Day 10",
        "title": "Managing noise levels",
        "mood": "😐",
        "wentWellPreview": "Group activity was effective but...",
        "tags": ["#ClassManagement", "#Activity"],
        "wentWell": "The group discussion topic was well received.",
        "improve": "Noise level got too high. Need a better signal to bring attention back to the front.",
        "studentResponse": "Lively but chaotic."
    }
]

MOCK_RESOURCES = [
    {"id": "r1", "title": "Fractions: Visual Approaches", "subject": "Maths", "grade": "Class 5", "type": "Video", "duration": "5 mins", "difficulty": "Beginner"},
    {"id": "r2", "title": "NCERT Maths Worksheets", "subject": "Maths", "grade": "Class 5", "type": "PDF", "duration": "10 pages", "difficulty": "Intermediate"},
    {"id": "r3", "title": "Science Activity Guide", "subject": "Science", "grade": "Class 6", "type": "Interactive", "duration": "15 mins", "difficulty": "Advanced"},
]

MOCK_GROUPS = [
    {"id": "g1", "name": "Class 5 Maths — Maharashtra", "tags": ["Maths", "Class 5", "Maharashtra", "Marathi"], "members": 142, "active": 12, "lastActivity": "Priya shared a tip on fractions."},
    {"id": "g2", "name": "Class 3 Science — UP", "tags": ["Science", "Class 3", "UP", "Hindi"], "members": 89, "active": 5, "lastActivity": "Rajesh asked about light experiments."},
]

MOCK_CHAT_SESSIONS = [
    {"id": "c1", "date": "2025-05-19", "preview": "How to handle disruptive students?"},
    {"id": "c2", "date": "2025-05-12", "preview": "NCERT guidelines for Class 5 Math"}
]

COACHING_RESPONSES = {
    "fractions": "NCERT Class 5 recommends using pizza/roti analogies. Visual aids are highly effective. Have you tried asking students to divide real objects?",
    "classroom management": "Research-backed: assign roles to disruptive students to give them a sense of responsibility. Also, try establishing a clear visual signal for quiet time.",
    "slow learners": "NCERT guidance suggests peer-buddy pairing. Pair them with a student who understands the concept well. It helps both students.",
    "default": "Great question! Based on NCERT guidelines for your grade, I recommend breaking down the concept into smaller, relatable real-world examples."
}
