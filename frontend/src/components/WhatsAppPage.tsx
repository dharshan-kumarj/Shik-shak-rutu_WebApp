import { useState, useEffect, useRef, useCallback } from "react"
import { Send, Paperclip, Mic } from "lucide-react"
import { useTeacher } from "../context/TeacherContext"
import { WHATSAPP_HISTORY, type WhatsAppMessage } from "../data/mockData"

const MOCK_RESPONSES: Record<string, string> = {
  haan: "बहुत अच्छा! 💪 आपका यह प्रयास सराहनीय है। कल क्लास के बाद ज़रूर बताइएगा कैसा रहा। याद रखिए — छोटे-छोटे बदलाव बड़ा असर लाते हैं। आप शानदार कर रही हैं! 🌟",
  yes: "That's great! 💪 Keep up the wonderful work. Remember to share your experience after class — your feedback helps other teachers too. You're doing an amazing job! 🌟",
  nahi: "कोई बात नहीं! कोशिश करना ही सबसे बड़ा कदम है। एक और तरीका try करें: अगली बार बच्चों को ग्रुप में बाँटें और एक-दूसरे को सिखाने दें। 'Peer teaching' से आधे से ज़्यादा बच्चों को concepts clear हो जाते हैं। मैंने कल एक और activity भेजी है — वो भी देखिए!",
  no: "No problem at all! Trying is what matters most. Here's another approach: next time, divide students into groups and let them teach each other. Peer teaching helps more than half the class understand concepts better. Check the activity I sent yesterday too!"
}

function getMockResponse(text: string, teacherName: string): string {
  const lower = text.toLowerCase().trim()
  if (lower.includes("हाँ") || lower === "haan" || lower === "yes" || lower === "ha" || lower === "hmm" || lower === "han") {
    return MOCK_RESPONSES.haan
  }
  if (lower.includes("yes")) {
    return MOCK_RESPONSES.yes
  }
  if (lower.includes("नहीं") || lower === "nahi" || lower === "no" || lower === "na") {
    return MOCK_RESPONSES.nahi
  }
  if (lower.includes("no")) {
    return MOCK_RESPONSES.no
  }
  return `आपका message मिला, ${teacherName} जी! मैं देख रहा हूँ... 📚\n\nइस टॉपिक पर DIKSHA पर एक बेहतरीन resource है: "Practical Classroom Strategies" मॉड्यूल। कृपया इसे देखें और बताएं कैसा लगा।\n\nकोई और सवाल हो तो पूछिए!`
}

function nextId(messages: WhatsAppMessage[]): number {
  return messages.length > 0 ? Math.max(...messages.map(m => m.id)) + 1 : 1
}

function formatTime(): string {
  const now = new Date()
  const h = now.getHours().toString().padStart(2, "0")
  const m = now.getMinutes().toString().padStart(2, "0")
  return `${h}:${m}`
}

export default function WhatsAppPage() {
  const { activeTeacher } = useTeacher()
  const [messages, setMessages] = useState<WhatsAppMessage[]>([])
  const [input, setInput] = useState("")
  const [typing, setTyping] = useState(false)
  const chatEndRef = useRef<HTMLDivElement>(null)
  const typingTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  useEffect(() => {
    setMessages(WHATSAPP_HISTORY[activeTeacher.id] || [])
    setInput("")
    setTyping(false)
    if (typingTimeoutRef.current) {
      clearTimeout(typingTimeoutRef.current)
      typingTimeoutRef.current = null
    }
  }, [activeTeacher.id])

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [messages, typing])

  const sendMessage = useCallback(() => {
    const text = input.trim()
    if (!text) return

    const userMsg: WhatsAppMessage = {
      id: nextId(messages),
      role: "user",
      text,
      time: formatTime()
    }
    setMessages(prev => [...prev, userMsg])
    setInput("")
    setTyping(true)

    typingTimeoutRef.current = setTimeout(() => {
      setTyping(false)
      const botText = getMockResponse(text, activeTeacher.name)
      const botMsg: WhatsAppMessage = {
        id: nextId([...messages, userMsg]),
        role: "bot",
        text: botText,
        time: formatTime(),
        source: "AI Coach"
      }
      setMessages(prev => [...prev, botMsg])
    }, 1500)
  }, [input, messages, activeTeacher.name])

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      sendMessage()
    }
  }

  const days = ["Day 0", "Day 1", "Day 3", "Day 7", "Day 15"]
  const stageLabels: Record<string, string> = {
    "Day 3": "Check-in stage",
    "Day 7": "Peer connect stage",
    "Day 15": "Advanced practice stage"
  }

  const dayInJourney = activeTeacher.dayInJourney
  let currentStage = ""
  for (let i = days.length - 1; i >= 0; i--) {
    const d = parseInt(days[i].replace("Day ", ""))
    if (dayInJourney >= d) {
      currentStage = stageLabels[days[i]] || ""
      break
    }
  }

  return (
    <div className="max-w-7xl mx-auto p-2 md:p-4 flex gap-4" style={{ minHeight: "calc(100vh - 140px)" }}>
      {/* WhatsApp Chat */}
      <div className="flex-1 flex flex-col rounded-xl overflow-hidden shadow-lg border border-gray-200" style={{ fontFamily: "system-ui, -apple-system, sans-serif" }}>
        {/* Header */}
        <div className="bg-[#075E54] px-4 py-3 flex items-center gap-3 text-white">
          <div
            className="w-10 h-10 rounded-full flex items-center justify-center text-white font-bold text-sm shrink-0"
            style={{ backgroundColor: activeTeacher.avatarColor }}
          >
            {activeTeacher.avatar}
          </div>
          <div className="flex-1 min-w-0">
            <p className="font-semibold text-sm truncate">{activeTeacher.name}</p>
            <p className="text-xs text-green-100 flex items-center gap-1">
              <span className="w-2 h-2 bg-green-300 rounded-full inline-block" />
              Shikshak-saathi · Day {dayInJourney} of 30
            </p>
          </div>
        </div>

        {/* Chat Area */}
        <div
          className="flex-1 p-4 overflow-y-auto space-y-2 wa-chat-bg"
        >
          {messages.map((msg, idx) => {
            const showDay = msg.day && (idx === 0 || messages[idx - 1]?.day !== msg.day)
            return (
              <div key={msg.id}>
                {/* Day label */}
                {showDay && (
                  <div className="flex justify-center my-3">
                    <span className="text-xs bg-white/80 text-gray-600 px-3 py-1 rounded-full shadow-sm font-medium">
                      {msg.day}
                    </span>
                  </div>
                )}

                {msg.role === "bot" ? (
                  <div className="flex justify-start">
                    <div className="max-w-[85%] md:max-w-[75%]">
                      <div className="bg-white rounded-lg rounded-tl-none px-3 py-2 shadow-sm">
                        <p className="text-sm whitespace-pre-line text-[#111b21]">{msg.text}</p>
                        {msg.source && (
                          <span
                            className={`inline-block text-xs font-medium mt-1.5 px-2 py-0.5 rounded-full ${
                              msg.source === "NCERT"
                                ? "bg-blue-50 text-blue-700"
                                : msg.source === "peer"
                                ? "bg-green-50 text-green-700"
                                : "bg-gray-50 text-gray-600"
                            }`}
                          >
                            {msg.source === "NCERT" && "📚 "}
                            {msg.source === "peer" && "👩‍🏫 "}
                            {msg.source === "AI Coach" && "🤖 "}
                            {msg.source === "peer + NCERT" && "📚👩‍🏫 "}
                            {msg.source}
                            {msg.peerName && `: ${msg.peerName}`}
                          </span>
                        )}
                      </div>
                      <p className="text-[10px] text-gray-500 mt-0.5 ml-1">{msg.time}</p>
                    </div>
                  </div>
                ) : (
                  <div className="flex justify-end">
                    <div className="max-w-[85%] md:max-w-[75%]">
                      <div className="bg-[#DCF8C6] rounded-lg rounded-tr-none px-3 py-2 shadow-sm">
                        <p className="text-sm whitespace-pre-line text-[#111b21]">{msg.text}</p>
                      </div>
                      <p className="text-[10px] text-gray-500 mt-0.5 mr-1 text-right">{msg.time}</p>
                    </div>
                  </div>
                )}
              </div>
            )
          })}

          {/* Typing indicator */}
          {typing && (
            <div className="flex justify-start">
              <div className="bg-white rounded-lg rounded-tl-none px-4 py-3 shadow-sm">
                <div className="flex gap-1">
                  <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: "0ms" }} />
                  <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: "150ms" }} />
                  <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: "300ms" }} />
                </div>
              </div>
            </div>
          )}
          <div ref={chatEndRef} />
        </div>

        {/* Input Bar */}
        <div className="bg-gray-50 px-3 py-2 flex items-center gap-2 border-t border-gray-200">
          <button className="p-2 text-gray-500 hover:text-gray-700 transition-colors" type="button" tabIndex={-1}>
            <Paperclip size={20} />
          </button>
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Type a message..."
            className="flex-1 bg-white rounded-lg px-4 py-2 text-sm border border-gray-300 focus:outline-none focus:border-[#075E54] focus:ring-1 focus:ring-[#075E54]"
          />
          {input.trim() ? (
            <button
              onClick={sendMessage}
              className="p-2 bg-[#075E54] text-white rounded-full hover:bg-[#0b7a6e] transition-colors"
              type="button"
            >
              <Send size={18} />
            </button>
          ) : (
            <button className="p-2 text-gray-500 hover:text-gray-700 transition-colors" type="button" tabIndex={-1}>
              <Mic size={20} />
            </button>
          )}
        </div>
      </div>

      {/* Info Panel - Desktop */}
      <div className="hidden lg:block w-72 shrink-0">
        <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-5 sticky top-36">
          <div className="flex items-center gap-3 mb-4">
            <div
              className="w-14 h-14 rounded-full flex items-center justify-center text-white font-bold text-lg"
              style={{ backgroundColor: activeTeacher.avatarColor }}
            >
              {activeTeacher.avatar}
            </div>
            <div>
              <h3 className="font-semibold text-gray-800">{activeTeacher.name}</h3>
              <p className="text-sm text-gray-500">{activeTeacher.school}</p>
            </div>
          </div>

          <div className="space-y-3 text-sm">
            <div className="flex justify-between">
              <span className="text-gray-500">Grade</span>
              <span className="font-medium text-gray-800">{activeTeacher.grade}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-500">Subject</span>
              <span className="font-medium text-gray-800">{activeTeacher.subject}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-500">Language</span>
              <span className="font-medium text-gray-800">{activeTeacher.languageLabel}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-500">Current Topic</span>
              <span className="font-medium text-gray-800 text-right">{activeTeacher.currentTopic}</span>
            </div>
          </div>

          {/* Progress Bar */}
          <div className="mt-4 pt-4 border-t border-gray-100">
            <div className="flex justify-between text-xs text-gray-500 mb-1.5">
              <span>Day {dayInJourney} of 30</span>
              <span>{Math.round((dayInJourney / 30) * 100)}%</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div
                className="h-2 rounded-full transition-all duration-500"
                style={{ width: `${(dayInJourney / 30) * 100}%`, backgroundColor: activeTeacher.avatarColor }}
              />
            </div>
          </div>

          {currentStage && (
            <div className="mt-3">
              <span
                className="inline-block text-xs font-medium px-2.5 py-1 rounded-full"
                style={{
                  backgroundColor: `${activeTeacher.avatarColor}15`,
                  color: activeTeacher.avatarColor
                }}
              >
                {currentStage}
              </span>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
