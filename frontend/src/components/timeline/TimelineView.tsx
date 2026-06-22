import { useEffect, useState } from 'react';

const MOCK_TIMELINE = [
  { day: 1, status: "completed", type: "Micro-Tip", title: "Welcome & First Tip", date: "2026-04-01", detail: "Started journey with NCERT guideline on fractions." },
  { day: 3, status: "completed", type: "Check-In", title: "Class Diagnostic", date: "2026-04-03", detail: "Answered 3 diagnostic questions about class engagement." },
  { day: 7, status: "completed", type: "Peer Match", title: "Peer Connected", date: "2026-04-07", detail: "Matched with Priya from Maharashtra (Class 5 Maths)." },
  { day: 10, status: "completed", type: "Module", title: "Interactive Scenario", date: "2026-04-10", detail: "Completed 10-min module on slow learners." },
  { day: 14, status: "completed", type: "Journal Entry", title: "Weekly Reflection", date: "2026-04-14", detail: "Reflected on first two weeks of teaching strategies." },
  { day: 18, status: "completed", type: "Resource", title: "DIKSHA Resource Used", date: "2026-04-18", detail: "Accessed DIKSHA interactive module for chemical equations." },
  { day: 22, status: "completed", type: "Check-In", title: "Progress Check", date: "2026-04-22", detail: "Reported student improvement in fraction understanding." },
  { day: 25, status: "today", type: "Journal Entry", title: "Mid-Journey Reflection", date: "2026-04-25", detail: "Auto-generated journal entry ready to review." },
  { day: 30, status: "upcoming", type: "Exit Sync", title: "DIKSHA Sync", date: "2026-05-01", detail: "Complete journey for CPD credit." }
];

const TimelineView = () => {
  const [timeline, setTimeline] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setTimeline(MOCK_TIMELINE);
      setLoading(false);
    }, 500);
    return () => clearTimeout(timer);
  }, []);

  if (loading) return <div className="p-8 text-center text-gray-500">Loading timeline...</div>;

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="card text-center p-4">
          <p className="text-gray-500 text-sm">Days Completed</p>
          <p className="text-2xl font-bold text-[var(--color-primary)]">25/30</p>
        </div>
        <div className="card text-center p-4">
          <p className="text-gray-500 text-sm">Current Streak</p>
          <p className="text-2xl font-bold text-[var(--color-accent)]">7 days</p>
        </div>
        <div className="card text-center p-4">
          <p className="text-gray-500 text-sm">Overall Progress</p>
          <p className="text-2xl font-bold text-green-600">83%</p>
        </div>
        <div className="card text-center p-4">
          <p className="text-gray-500 text-sm">Peer Solutions Used</p>
          <p className="text-2xl font-bold text-[var(--color-primary)]">12</p>
        </div>
      </div>

      <div className="card overflow-x-auto">
        <div className="flex items-center justify-between mb-6">
          <h3 className="font-bold text-lg">Your 30-Day Journey</h3>
          <span className="text-xs text-gray-400">Updated today</span>
        </div>
        <div className="flex items-center min-w-max pb-4 px-2">
          {timeline.map((item, idx) => (
            <div key={idx} className="flex items-center relative">
              <div className="flex flex-col items-center cursor-pointer group">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm z-10 
                  ${item.status === 'completed' ? 'bg-[var(--color-accent)] text-white' : 
                    item.status === 'today' ? 'bg-white border-4 border-[var(--color-primary)] text-[var(--color-primary)]' : 
                    'bg-gray-200 text-gray-500'}`}
                >
                  {item.status === 'completed' ? '✓' : item.day}
                </div>
                <div className="absolute top-10 opacity-0 group-hover:opacity-100 transition-opacity bg-gray-800 text-white text-xs rounded py-1 px-2 whitespace-nowrap z-20">
                  {item.title}
                </div>
              </div>
              {idx < timeline.length - 1 && (
                <div className={`h-1 w-12 md:w-16 mx-1.5 md:mx-2 ${item.status === 'completed' ? 'bg-[var(--color-accent)]' : 'bg-gray-200'}`}></div>
              )}
            </div>
          ))}
        </div>
        <div className="flex justify-between text-xs text-gray-500 mt-4 px-2 font-medium">
          <span>Foundation</span>
          <span>Practice</span>
          <span>Reflection</span>
          <span>Mastery</span>
        </div>
      </div>

      <div className="card">
        <h3 className="font-bold text-lg mb-4">Recent Activity</h3>
        <div className="divide-y divide-gray-100">
          {timeline.filter(t => t.status === 'completed' || t.status === 'today').slice(-4).reverse().map((item, idx) => (
            <div key={idx} className="py-3 flex items-start justify-between">
              <div className="flex items-start gap-3">
                <span className={`text-xs font-medium px-2 py-0.5 rounded mt-0.5 ${
                  item.type === 'Micro-Tip' ? 'bg-blue-100 text-blue-700' :
                  item.type === 'Check-In' ? 'bg-purple-100 text-purple-700' :
                  item.type === 'Peer Match' ? 'bg-green-100 text-green-700' :
                  item.type === 'Journal Entry' ? 'bg-orange-100 text-orange-700' :
                  'bg-gray-100 text-gray-700'
                }`}>{item.type}</span>
                <div>
                  <p className="text-sm font-medium text-gray-800">{item.title}</p>
                  <p className="text-xs text-gray-500 mt-0.5">{item.detail}</p>
                </div>
              </div>
              <span className="text-xs text-gray-400 shrink-0 ml-4">{item.date}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TimelineView;
