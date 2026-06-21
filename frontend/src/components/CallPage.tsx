import { useState, useEffect, useRef, useCallback } from "react"
import { Phone, PhoneOff, Volume2, Mic, MicOff } from "lucide-react"
import { useTeacher } from "../context/TeacherContext"
import { CALL_SCENARIOS, type CallStep } from "../data/mockData"

type CallState = "idle" | "connecting" | "in-call" | "ended"

interface TranscriptEntry {
  type: CallStep["type"]
  text: string
  source?: string
  timestamp: number
}

function formatDuration(seconds: number): string {
  const m = Math.floor(seconds / 60)
  const s = seconds % 60
  return `${m.toString().padStart(2, "0")}:${s.toString().padStart(2, "0")}`
}

export default function CallPage() {
  const { activeTeacher } = useTeacher()
  const [callState, setCallState] = useState<CallState>("idle")
  const [transcript, setTranscript] = useState<TranscriptEntry[]>([])
  const [currentStepIdx, setCurrentStepIdx] = useState(-1)
  const [callDuration, setCallDuration] = useState(0)
  const [muted, setMuted] = useState(false)

  const timeoutsRef = useRef<ReturnType<typeof setTimeout>[]>([])
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null)
  const durationStartedAt = useRef<number>(0)

  const clearAllTimeouts = useCallback(() => {
    timeoutsRef.current.forEach(clearTimeout)
    timeoutsRef.current = []
    if (timerRef.current) {
      clearInterval(timerRef.current)
      timerRef.current = null
    }
  }, [])

  // Reset on teacher change
  useEffect(() => {
    clearAllTimeouts()
    setCallState("idle")
    setTranscript([])
    setCurrentStepIdx(-1)
    setCallDuration(0)
    setMuted(false)
  }, [activeTeacher.id, clearAllTimeouts])

  // Cleanup on unmount
  useEffect(() => {
    return () => clearAllTimeouts()
  }, [clearAllTimeouts])

  const startCall = useCallback(() => {
    setCallState("connecting")
    setTranscript([])
    setCurrentStepIdx(-1)
    setCallDuration(0)
    setMuted(false)

    const scenario = CALL_SCENARIOS[activeTeacher.id]
    if (!scenario) return

    const steps = scenario.steps

    const addToTranscript = (entry: TranscriptEntry) => {
      setTranscript(prev => [...prev, entry])
    }

    const scheduleNext = (stepIndex: number, accumulatedDelay: number) => {
      if (stepIndex >= steps.length) return

      const step = steps[stepIndex]
      const newDelay = accumulatedDelay + step.delay

      const t = setTimeout(() => {
        addToTranscript({
          type: step.type,
          text: step.text,
          source: step.source,
          timestamp: Date.now()
        })
        setCurrentStepIdx(stepIndex)
        scheduleNext(stepIndex + 1, newDelay)
      }, newDelay)

      timeoutsRef.current.push(t)
    }

    // Set connecting for 1 sec, then in-call
    const connectT = setTimeout(() => {
      setCallState("in-call")
      durationStartedAt.current = Date.now()

      timerRef.current = setInterval(() => {
        setCallDuration(Math.floor((Date.now() - durationStartedAt.current) / 1000))
      }, 1000)

      // Start step playback
      scheduleNext(0, 0)
    }, 1000)

    timeoutsRef.current.push(connectT)
  }, [activeTeacher.id])

  const endCall = useCallback(() => {
    clearAllTimeouts()
    setCallState("ended")
    if (timerRef.current) {
      clearInterval(timerRef.current)
      timerRef.current = null
    }
  }, [clearAllTimeouts])

  const resetCall = useCallback(() => {
    setCallState("idle")
    setTranscript([])
    setCurrentStepIdx(-1)
    setCallDuration(0)
    setMuted(false)
  }, [])

  const scenario = CALL_SCENARIOS[activeTeacher.id]
  const hasMoreSteps = scenario && currentStepIdx < scenario.steps.length - 1
  const finalDuration = callDuration

  return (
    <div className="max-w-4xl mx-auto p-2 md:p-4" style={{ fontFamily: "Inter, sans-serif" }}>
      {/* Call Card */}
      <div className="bg-white rounded-2xl shadow-xl border border-gray-200 overflow-hidden">
        {/* Gradient top section */}
        <div
          className="px-6 py-8 md:py-10 text-center relative"
          style={{
            background: "linear-gradient(135deg, #1a1a2e 0%, #16213e 100%)"
          }}
        >
          {/* Pulsing ring - only visible during in-call */}
          {callState === "in-call" && (
            <span className="absolute inset-0 flex items-center justify-center pointer-events-none">
              <span className="w-32 h-32 rounded-full border-2 border-green-400/40 animate-ping absolute" />
              <span className="w-36 h-36 rounded-full border-2 border-green-400/20 animate-ping absolute" style={{ animationDelay: "0.5s" }} />
            </span>
          )}

          <div className="relative inline-block">
            <div
              className={`w-20 h-20 md:w-24 md:h-24 rounded-full flex items-center justify-center text-white font-bold text-2xl md:text-3xl mx-auto shadow-lg transition-all ${
                callState === "in-call" ? "ring-4 ring-green-400 ring-offset-4 ring-offset-[#1a1a2e]" : ""
              }`}
              style={{ backgroundColor: activeTeacher.avatarColor }}
            >
              {activeTeacher.avatar}
            </div>
          </div>

          <h2 className="text-white text-xl font-bold mt-4">{activeTeacher.name}</h2>
          <p className="text-gray-400 text-sm">{activeTeacher.school}</p>

          {callState === "idle" && (
            <>
              <p className="text-green-300 text-sm mt-1 font-medium">Shikshak-saathi Voice Agent</p>
              <span className="inline-block mt-2 text-xs bg-white/10 text-white/80 px-3 py-1 rounded-full">
                {scenario?.language || "Hindi"}
              </span>
            </>
          )}

          {callState === "connecting" && (
            <p className="text-yellow-300 text-sm mt-2 animate-pulse">Connecting...</p>
          )}

          {callState === "in-call" && (
            <>
              <p className="text-green-300 text-sm mt-1 font-medium flex items-center justify-center gap-2">
                <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
                Connected · {formatDuration(callDuration)}
              </p>
              <span className="inline-block mt-2 text-xs bg-white/10 text-white/80 px-3 py-1 rounded-full">
                {scenario?.language || "Hindi"}
              </span>
            </>
          )}

          {callState === "ended" && (
            <>
              <p className="text-gray-300 text-sm mt-1">Call ended · Duration: {formatDuration(finalDuration)}</p>
              <div className="mt-3 flex items-center justify-center gap-2 text-green-400">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <span className="text-sm">Follow-up sent via WhatsApp</span>
              </div>
            </>
          )}

          {/* Call actions */}
          <div className="mt-5 flex items-center justify-center gap-4">
            {callState === "idle" && (
              <button
                onClick={startCall}
                className="bg-green-500 hover:bg-green-600 text-white w-14 h-14 rounded-full flex items-center justify-center shadow-lg transition-all hover:scale-105 active:scale-95"
              >
                <Phone size={24} />
              </button>
            )}

            {callState === "connecting" && (
              <button
                onClick={endCall}
                className="bg-red-500 hover:bg-red-600 text-white w-14 h-14 rounded-full flex items-center justify-center shadow-lg transition-all"
              >
                <PhoneOff size={24} />
              </button>
            )}

            {callState === "in-call" && (
              <>
                <button
                  onClick={() => setMuted(!muted)}
                  className={`w-12 h-12 rounded-full flex items-center justify-center transition-all ${
                    muted
                      ? "bg-yellow-500 text-white"
                      : "bg-white/10 text-white/70 hover:bg-white/20"
                  }`}
                  title={muted ? "Unmute" : "Mute"}
                >
                  {muted ? <MicOff size={18} /> : <Mic size={18} />}
                </button>
                <button
                  onClick={endCall}
                  className="bg-red-500 hover:bg-red-600 text-white w-14 h-14 rounded-full flex items-center justify-center shadow-lg transition-all hover:scale-105 active:scale-95"
                >
                  <PhoneOff size={24} />
                </button>
                <button
                  className="w-12 h-12 rounded-full bg-white/10 text-white/70 hover:bg-white/20 flex items-center justify-center transition-all"
                  title="Speaker"
                >
                  <Volume2 size={18} />
                </button>
              </>
            )}

            {callState === "ended" && (
              <button
                onClick={resetCall}
                className="bg-brand-primary hover:bg-blue-800 text-white px-6 py-3 rounded-full text-sm font-medium shadow-lg transition-all"
              >
                Start new call
              </button>
            )}
          </div>
        </div>

        {/* Transcript */}
        {transcript.length > 0 && (
          <div className="px-4 md:px-6 py-4 max-h-96 overflow-y-auto space-y-3 bg-gray-50 border-t border-gray-200">
            <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3">Transcript</p>
            {transcript.map((entry, idx) => (
              <div key={idx}>
                {entry.type === "system" ? (
                  <div className="text-center">
                    <span className="text-xs text-gray-400 italic">{entry.text}</span>
                  </div>
                ) : entry.type === "processing" ? (
                  <div className="flex justify-start">
                    <div className="bg-gray-100 rounded-xl px-4 py-2">
                      <p className="text-sm text-gray-600 flex items-center gap-2">
                        <span className="inline-block w-4 h-4 border-2 border-gray-400 border-t-transparent rounded-full animate-spin" />
                        {entry.text}
                      </p>
                    </div>
                  </div>
                ) : entry.type === "bot" ? (
                  <div className="flex justify-start">
                    <div className="max-w-[80%]">
                      <div className="flex items-center gap-1 mb-0.5">
                        <span className="text-xs">🤖</span>
                        <span className="text-xs font-medium text-gray-500">Shikshak-sathi</span>
                      </div>
                      <div className="bg-white rounded-xl rounded-tl-none px-4 py-2.5 shadow-sm border border-gray-100">
                        <p className="text-sm whitespace-pre-line text-gray-800">{entry.text}</p>
                        {entry.source && (
                          <span className="inline-block text-xs font-medium mt-1.5 px-2 py-0.5 rounded-full bg-blue-50 text-blue-700">
                            📚 {entry.source}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="flex justify-end">
                    <div className="max-w-[80%]">
                      <div className="flex items-center gap-1 mb-0.5 justify-end">
                        <span className="text-xs font-medium text-gray-500">{activeTeacher.name}</span>
                      </div>
                      <div
                        className="rounded-xl rounded-tr-none px-4 py-2.5 shadow-sm border border-gray-100 text-sm text-white"
                        style={{ backgroundColor: activeTeacher.avatarColor }}
                      >
                        <p className="whitespace-pre-line">{entry.text}</p>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            ))}

            {callState === "in-call" && hasMoreSteps && (
              <div className="text-center py-1">
                <span className="text-xs text-gray-400 animate-pulse">Call in progress...</span>
              </div>
            )}

            {callState === "ended" && (
              <div className="text-center py-2 border-t border-gray-200 mt-3">
                <span className="text-xs text-gray-400">📱 WhatsApp follow-up has been sent with resources and summary</span>
              </div>
            )}
          </div>
        )}

        {/* Empty transcript prompt */}
        {transcript.length === 0 && callState !== "idle" && (
          <div className="px-6 py-8 text-center text-gray-400 text-sm">
            Waiting for call to connect...
          </div>
        )}
      </div>

      {/* Info strip */}
      {callState === "idle" && (
        <div className="text-center mt-4">
          <p className="text-xs text-gray-400">Works on 2G · Any phone · No internet needed</p>
        </div>
      )}
    </div>
  )
}
