import { useTeacher } from "../context/TeacherContext"

export default function PersonaSwitcher() {
  const { activeTeacher, setActiveTeacher, TEACHERS } = useTeacher()

  return (
    <div className="bg-white border-b border-gray-200 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 py-3">
        <p className="text-xs font-medium text-gray-500 uppercase tracking-wider mb-2">Switch Teacher Persona</p>
        <div className="flex gap-3 overflow-x-auto pb-1">
          {TEACHERS.map((t) => {
            const isActive = t.id === activeTeacher.id
            return (
              <button
                key={t.id}
                onClick={() => setActiveTeacher(t)}
                className={`flex items-center gap-3 p-3 rounded-lg border-2 transition-all shrink-0 min-w-0 ${
                  isActive
                    ? "border-brand-primary bg-blue-50 shadow-sm"
                    : "border-gray-200 hover:border-gray-300 bg-white"
                }`}
              >
                <div
                  className="w-10 h-10 rounded-full flex items-center justify-center text-white font-bold text-sm shrink-0"
                  style={{ backgroundColor: t.avatarColor }}
                >
                  {t.avatar}
                </div>
                <div className="text-left min-w-0">
                  <p className={`text-sm font-semibold truncate ${isActive ? "text-brand-primary" : "text-gray-800"}`}>
                    {t.name}
                  </p>
                  <p className="text-xs text-gray-500 truncate">
                    Class {t.grade} {t.subject} · {t.languageLabel}
                  </p>
                  <p className="text-xs text-gray-400">
                    Day {t.dayInJourney} of 30
                  </p>
                </div>
                {isActive && (
                  <div className="w-1.5 h-8 rounded-full bg-brand-primary shrink-0" />
                )}
              </button>
            )
          })}
        </div>
      </div>
    </div>
  )
}
