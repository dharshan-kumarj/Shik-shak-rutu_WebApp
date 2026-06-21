import { NavLink, Outlet, useLocation } from "react-router-dom"
import { useEffect } from "react"
import { useTeacher } from "../context/TeacherContext"
import { TEACHERS } from "../data/mockData"
import PersonaSwitcher from "./PersonaSwitcher"

export default function Layout() {
  const location = useLocation()
  const { setActiveTeacher } = useTeacher()

  useEffect(() => {
    const teacherId = (location.state as { teacherId?: number } | null)?.teacherId
    if (teacherId) {
      const teacher = TEACHERS.find(t => t.id === teacherId)
      if (teacher) setActiveTeacher(teacher)
    }
  }, [location.state])

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 h-14 flex items-center justify-between">
          <div className="flex items-center gap-6">
            <h1 className="text-lg font-bold text-brand-primary">Shikshak-Setu</h1>
            <nav className="flex gap-1">
              <NavLink
                to="/whatsapp"
                className={({ isActive }) =>
                  `px-3 py-1.5 rounded-md text-sm font-medium transition-colors ${
                    isActive
                      ? "bg-blue-50 text-brand-primary"
                      : "text-gray-600 hover:text-brand-primary hover:bg-gray-50"
                  }`
                }
              >
                💬 WhatsApp Simulation
              </NavLink>
              <NavLink
                to="/call"
                className={({ isActive }) =>
                  `px-3 py-1.5 rounded-md text-sm font-medium transition-colors ${
                    isActive
                      ? "bg-blue-50 text-brand-primary"
                      : "text-gray-600 hover:text-brand-primary hover:bg-gray-50"
                  }`
                }
              >
                📞 Call Agent
              </NavLink>
            </nav>
          </div>
          <span className="text-xs bg-gray-100 text-gray-600 px-3 py-1 rounded-full font-medium">
            Demo Mode · 3 Personas
          </span>
        </div>
      </header>
      <PersonaSwitcher />
      <main>
        <Outlet />
      </main>
    </div>
  )
}
