import { useEffect, useState } from 'react';
import api from '../../api/client';

const TimelineView = () => {
  const [timeline, setTimeline] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTimeline = async () => {
      try {
        const res = await api.get('/timeline');
        setTimeline(res.data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchTimeline();
  }, []);

  if (loading) return <div className="p-8 text-center">Loading timeline...</div>;

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="card text-center p-4">
          <p className="text-gray-500 text-sm">Days Completed</p>
          <p className="text-2xl font-bold text-[var(--color-primary)]">20/30</p>
        </div>
        <div className="card text-center p-4">
          <p className="text-gray-500 text-sm">Current Streak</p>
          <p className="text-2xl font-bold text-[var(--color-accent)]">5 days</p>
        </div>
        <div className="card text-center p-4">
          <p className="text-gray-500 text-sm">Overall Progress</p>
          <p className="text-2xl font-bold text-green-600">67%</p>
        </div>
        <div className="card text-center p-4">
          <p className="text-gray-500 text-sm">Peer Solutions Used</p>
          <p className="text-2xl font-bold text-[var(--color-primary)]">8</p>
        </div>
      </div>

      <div className="card overflow-x-auto">
        <h3 className="font-bold text-lg mb-6">Your 30-Day Journey</h3>
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
                <div className={`h-1 w-16 mx-2 ${item.status === 'completed' ? 'bg-[var(--color-accent)]' : 'bg-gray-200'}`}></div>
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
    </div>
  );
};

export default TimelineView;
