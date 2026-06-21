import { useNavigate } from "react-router-dom"
import { useTeacher } from "../context/TeacherContext"

const TEACHERS = [
  {
    id: 1,
    name: "Meena Sharma",
    avatar: "MS",
    color: "#1a3a5c",
    grade: 3,
    subject: "Math",
    language: "Hindi",
    school: "ZP Primary School, Nagpur",
    day: 3,
    topic: "Subtraction with Borrowing",
    status: "Check-in pending"
  },
  {
    id: 2,
    name: "Priya Patil",
    avatar: "PP",
    color: "#2a7d4f",
    grade: 4,
    subject: "Language",
    language: "Marathi",
    school: "ZP Primary School, Pune",
    day: 7,
    topic: "Reading Comprehension",
    status: "Peer match ready"
  },
  {
    id: 3,
    name: "Kavitha R",
    avatar: "KR",
    color: "#7c3aed",
    grade: 5,
    subject: "Math",
    language: "Tamil",
    school: "Panchayat Union School, Coimbatore",
    day: 15,
    topic: "Fractions",
    status: "Module unlocked"
  }
]

function statusStyle(status: string): string {
  if (status.includes("Check-in")) return "bg-yellow-100 text-yellow-800 border-yellow-200"
  if (status.includes("Peer")) return "bg-green-100 text-green-800 border-green-200"
  return "bg-blue-100 text-blue-800 border-blue-200"
}

export default function DemoPage() {
  const navigate = useNavigate()
  const { setActiveTeacher } = useTeacher()

  const handleWhatsApp = (teacherId: number) => {
    const teacher = TEACHERS.find(t => t.id === teacherId)
    if (teacher) {
      const mockTeacher = {
        id: teacher.id,
        name: teacher.name,
        phone: "",
        language: "",
        languageLabel: teacher.language,
        grade: teacher.grade,
        subject: teacher.subject,
        school: teacher.school,
        state: "",
        avatar: teacher.avatar,
        avatarColor: teacher.color,
        dayInJourney: teacher.day,
        currentTopic: teacher.topic,
        flag: ""
      }
      setActiveTeacher(mockTeacher)
    }
    navigate("/whatsapp", { state: { teacherId } })
  }

  const handleCall = (teacherId: number) => {
    const teacher = TEACHERS.find(t => t.id === teacherId)
    if (teacher) {
      const mockTeacher = {
        id: teacher.id,
        name: teacher.name,
        phone: "",
        language: "",
        languageLabel: teacher.language,
        grade: teacher.grade,
        subject: teacher.subject,
        school: teacher.school,
        state: "",
        avatar: teacher.avatar,
        avatarColor: teacher.color,
        dayInJourney: teacher.day,
        currentTopic: teacher.topic,
        flag: ""
      }
      setActiveTeacher(mockTeacher)
    }
    navigate("/call", { state: { teacherId } })
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-6xl mx-auto px-4 py-8">
        <a
          href="/signin"
          className="text-sm text-gray-500 hover:text-brand-primary transition-colors inline-flex items-center gap-1 mb-6"
        >
          ← Back to Login
        </a>

        <div className="text-center mb-10">
          <h1 className="text-3xl font-bold text-brand-primary">
            🎯 Demo Mode — Shikshak-Setu 2.0
          </h1>
          <p className="text-gray-500 mt-1 text-sm">
            3 simulated teacher journeys. No login required.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {TEACHERS.map((teacher) => (
            <div
              key={teacher.id}
              className="bg-white rounded-xl shadow-md border border-gray-200 overflow-hidden hover:shadow-lg transition-shadow"
            >
              <div className="p-6">
                <div className="flex items-center gap-3 mb-4">
                  <div
                    className="w-12 h-12 rounded-full flex items-center justify-center text-white font-bold text-lg shrink-0"
                    style={{ backgroundColor: teacher.color }}
                  >
                    {teacher.avatar}
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-800">{teacher.name}</h3>
                    <div className="flex gap-1.5 mt-1 flex-wrap">
                      <span className="text-xs bg-gray-100 text-gray-600 px-2 py-0.5 rounded-full">
                        Class {teacher.grade}
                      </span>
                      <span className="text-xs bg-gray-100 text-gray-600 px-2 py-0.5 rounded-full">
                        {teacher.subject}
                      </span>
                      <span className="text-xs bg-gray-100 text-gray-600 px-2 py-0.5 rounded-full">
                        {teacher.language}
                      </span>
                    </div>
                  </div>
                </div>

                <p className="text-sm text-gray-500 mb-3">{teacher.school}</p>

                <div className="mb-3">
                  <div className="flex justify-between text-xs text-gray-500 mb-1">
                    <span>Day {teacher.day} of 30</span>
                    <span>{Math.round((teacher.day / 30) * 100)}%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className="h-2 rounded-full transition-all"
                      style={{ width: `${(teacher.day / 30) * 100}%`, backgroundColor: teacher.color }}
                    />
                  </div>
                </div>

                <p className="text-sm font-medium text-gray-700 mb-3">
                  {teacher.topic}
                </p>

                <span
                  className={`inline-block text-xs font-medium px-2.5 py-1 rounded-full border ${statusStyle(teacher.status)}`}
                >
                  {teacher.status}
                </span>
              </div>

              <div className="border-t border-gray-100 p-4 flex gap-3">
                <button
                  onClick={() => handleWhatsApp(teacher.id)}
                  className="flex-1 text-sm font-medium py-2 rounded-lg border-2 border-[#075E54] text-[#075E54] hover:bg-[#075E54] hover:text-white transition-all"
                >
                  💬 WhatsApp
                </button>
                <button
                  onClick={() => handleCall(teacher.id)}
                  className="flex-1 text-sm font-medium py-2 rounded-lg border-2 border-brand-primary text-brand-primary hover:bg-brand-primary hover:text-white transition-all"
                >
                  📞 Call Agent
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
