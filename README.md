# Shiksha Saathi

**Shiksha Saathi** is an AI-powered, multilingual professional development platform designed specifically for Indian government school teachers. Built as a part of the National Hackathon 2025 (EdTech Track), this platform aims to provide personalized coaching, peer learning, and reflective journaling in a clean, official government-styled portal.

---

## 🌟 Key Features

- **Multilingual Support**: Supports 13 regional Indian languages. UI changes instantly without requiring a page reload.
- **AI Coach**: A simulated AI chatbot that provides specific, actionable insights and NCERT-sourced micro-tips.
- **Peer Learning Groups**: Social media-style feed where verified teachers can share insights, ask questions, and comment/react to each other's posts.
- **Reflection Journal**: Keep a daily teaching journal. Features "Playback" capabilities to listen to audio reflections.
- **Interactive Timeline**: Track your learning journey, diagnostic check-ins, and completed modules.
- **Cross-Platform**: Fully responsive design with a bottom navigation bar for mobile users and a top navigation bar for desktop/tablet users.
- **Government Aesthetics**: Designed closely matching the DIKSHA/NIC official portal aesthetics (Navy Blue & Saffron).

---

## 🛠️ Tech Stack

### Frontend
- **Framework**: React 19 + TypeScript
- **Bundler**: Vite (v8)
- **Styling**: Tailwind CSS v4
- **Routing**: React Router DOM (v7)
- **Icons & UI**: Lucide React, react-hot-toast

### Backend
- **Framework**: Python FastAPI
- **Server**: Uvicorn
- **Data Validation**: Pydantic
- **Data Layer**: In-memory mock data seed for rapid prototyping (`mock_data.py`)

---

## 🚀 Getting Started

Follow these steps to run the application locally on your machine.

### 1. Start the Backend (FastAPI)
The backend runs on Python and requires FastAPI and Uvicorn.

```bash
cd backend
# (Optional but recommended) Create and activate a virtual environment
# python3 -m venv venv
# source venv/bin/activate

pip install -r requirements.txt
uvicorn main:app --host 0.0.0.0 --port 8000 --reload
```
The backend API will be available at `http://localhost:8000/api`.

### 2. Start the Frontend (React + Vite)
The frontend uses Node.js and npm.

```bash
cd frontend
npm install
npm run dev
```
The frontend application will be available at `http://localhost:5173` (or port `5174` if 5173 is in use).

### Quick Run Script
You can also run both simultaneously from the root directory using this one-liner:
```bash
(cd backend && uvicorn main:app --host 0.0.0.0 --port 8000 --reload) & (cd frontend && npm run dev)
```

---

## 📂 Project Structure

```text
Shik-shak-rutu_WebApp/
│
├── backend/                  # Python FastAPI Server
│   ├── main.py               # Application entry point & CORS config
│   ├── models.py             # Pydantic data schemas
│   ├── mock_data.py          # Seeded mock data for the dashboard
│   ├── requirements.txt      # Python dependencies
│   └── routers/              # API Endpoints (auth, chat, groups, journal, resources, timeline)
│
└── frontend/                 # React Vite Application
    ├── index.html            # Entry HTML (loads Noto Sans font)
    ├── package.json          # Node dependencies & scripts
    ├── tailwind.config.js    # Tailwind configuration
    ├── vite.config.ts        # Vite plugins (React + Tailwind v4)
    └── src/
        ├── api/              # Axios API client setup
        ├── components/       # Reusable UI components & Views (Chat, Groups, Journal, Timeline)
        ├── context/          # React Contexts (AuthContext, LanguageContext)
        ├── hooks/            # Custom React Hooks
        ├── i18n/             # Translation dictionaries
        ├── layouts/          # TopNav, BottomNav, MainLayout, AppLayout
        ├── pages/            # Full page views (Landing, SignIn, Register, Dashboard)
        └── index.css         # Global CSS variables & Tailwind directives
```

---

## 🔒 Privacy & Data
Shiksha Saathi is built on trust. Individual classroom interactions and journal entries are entirely private and never visible to Headmasters or State bodies. Only anonymized, aggregate data is used to improve the system.

---
*Built for the PS 2.5 National Hackathon 2025.*
