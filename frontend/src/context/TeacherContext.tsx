import { createContext, useContext, useState, type ReactNode } from "react"
import { TEACHERS, type Teacher } from "../data/mockData"

interface TeacherContextType {
  activeTeacher: Teacher
  setActiveTeacher: (t: Teacher) => void
  TEACHERS: Teacher[]
}

const TeacherContext = createContext<TeacherContextType | null>(null)

export function TeacherProvider({ children }: { children: ReactNode }) {
  const [activeTeacher, setActiveTeacher] = useState<Teacher>(TEACHERS[0])
  return (
    <TeacherContext.Provider value={{ activeTeacher, setActiveTeacher, TEACHERS }}>
      {children}
    </TeacherContext.Provider>
  )
}

export const useTeacher = () => {
  const ctx = useContext(TeacherContext)
  if (!ctx) throw new Error("useTeacher must be used within TeacherProvider")
  return ctx
}
