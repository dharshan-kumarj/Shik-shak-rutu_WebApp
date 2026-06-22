import { useNavigate } from 'react-router-dom';
import { useTeacher } from '../../context/TeacherContext';
import { Smartphone } from 'lucide-react';

const DEMO_TEACHERS = [
  {
    id: 1, name: "Meena Sharma", avatar: "MS", color: "#1a3a5c",
    grade: 3, subject: "Math", language: "Hindi",
    school: "ZP Primary School, Nagpur", day: 3,
    topic: "Subtraction with Borrowing", status: "Check-in pending"
  },
  {
    id: 2, name: "Priya Patil", avatar: "PP", color: "#2a7d4f",
    grade: 4, subject: "Language", language: "Marathi",
    school: "ZP Primary School, Pune", day: 7,
    topic: "Reading Comprehension", status: "Peer match ready"
  },
  {
    id: 3, name: "Kavitha R", avatar: "KR", color: "#7c3aed",
    grade: 5, subject: "Math", language: "Tamil",
    school: "Panchayat Union School, Coimbatore", day: 15,
    topic: "Fractions", status: "Module unlocked"
  }
];

const SimulationView = () => {
  const navigate = useNavigate();
  const { setActiveTeacher } = useTeacher();

  const handleWhatsApp = (teacherId: number) => {
    const teacher = DEMO_TEACHERS.find(t => t.id === teacherId);
    if (teacher) {
      setActiveTeacher({
        id: teacher.id, name: teacher.name, phone: "", language: "", languageLabel: teacher.language,
        grade: teacher.grade, subject: teacher.subject, school: teacher.school, state: "",
        avatar: teacher.avatar, avatarColor: teacher.color, dayInJourney: teacher.day,
        currentTopic: teacher.topic, flag: ""
      });
    }
    navigate("/whatsapp", { state: { teacherId } });
  };

  const handleCall = (teacherId: number) => {
    const teacher = DEMO_TEACHERS.find(t => t.id === teacherId);
    if (teacher) {
      setActiveTeacher({
        id: teacher.id, name: teacher.name, phone: "", language: "", languageLabel: teacher.language,
        grade: teacher.grade, subject: teacher.subject, school: teacher.school, state: "",
        avatar: teacher.avatar, avatarColor: teacher.color, dayInJourney: teacher.day,
        currentTopic: teacher.topic, flag: ""
      });
    }
    navigate("/call", { state: { teacherId } });
  };

  return (
    <div className="space-y-6">
      <div className="flex items-start gap-4 bg-gradient-to-r from-purple-50 to-orange-50 border border-purple-100 rounded-xl p-5">
        <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center shrink-0">
          <Smartphone size={24} className="text-purple-600" />
        </div>
        <div>
          <h2 className="text-xl font-bold text-gray-800">Simulation Mode</h2>
          <p className="text-sm text-gray-600 mt-1">
            Try Shikshak-Setu WhatsApp and Call Agent simulations. Pick a teacher persona below to preview the experience — no real data required.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {DEMO_TEACHERS.map((teacher) => (
          <div key={teacher.id} className="bg-white border border-gray-200 rounded-xl overflow-hidden hover:shadow-lg transition-all">
            <div className="p-5">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 rounded-full flex items-center justify-center text-white font-bold text-lg shrink-0" style={{ backgroundColor: teacher.color }}>
                  {teacher.avatar}
                </div>
                <div>
                  <h3 className="font-bold text-gray-800">{teacher.name}</h3>
                  <div className="flex gap-1.5 mt-1">
                    <span className="text-xs bg-gray-100 text-gray-600 px-2 py-0.5 rounded-full">Class {teacher.grade}</span>
                    <span className="text-xs bg-gray-100 text-gray-600 px-2 py-0.5 rounded-full">{teacher.subject}</span>
                    <span className="text-xs bg-gray-100 text-gray-600 px-2 py-0.5 rounded-full">{teacher.language}</span>
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
                  <div className="h-2 rounded-full" style={{ width: `${(teacher.day / 30) * 100}%`, backgroundColor: teacher.color }} />
                </div>
              </div>

              <p className="text-sm font-medium text-gray-700 mb-3">{teacher.topic}</p>

              <span className={`inline-block text-xs font-medium px-2.5 py-1 rounded-full border ${
                teacher.status.includes("Check-in") ? "bg-yellow-100 text-yellow-800 border-yellow-200" :
                teacher.status.includes("Peer") ? "bg-green-100 text-green-800 border-green-200" :
                "bg-blue-100 text-blue-800 border-blue-200"
              }`}>
                {teacher.status}
              </span>
            </div>

            <div className="border-t border-gray-100 p-4 flex gap-3">
              <button onClick={() => handleWhatsApp(teacher.id)} className="flex-1 text-sm font-medium py-2 rounded-lg border-2 border-[#075E54] text-[#075E54] hover:bg-[#075E54] hover:text-white transition-all">
                💬 WhatsApp
              </button>
              <button onClick={() => handleCall(teacher.id)} className="flex-1 text-sm font-medium py-2 rounded-lg border-2 border-[var(--color-primary)] text-[var(--color-primary)] hover:bg-[var(--color-primary)] hover:text-white transition-all">
                📞 Call Agent
              </button>
            </div>
          </div>
        ))}
      </div>

      <div className="bg-gray-50 border border-gray-200 rounded-lg p-4 text-center text-sm text-gray-500">
        These are simulated teacher journeys for demonstration. WhatsApp and Call Agent interactions are pre-scripted scenarios based on real teaching challenges.
      </div>
    </div>
  );
};

export default SimulationView;
