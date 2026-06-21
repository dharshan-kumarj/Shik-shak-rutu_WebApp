import { useEffect, useState, type MouseEvent } from 'react';
import api from '../../api/client';
import toast from 'react-hot-toast';

const JournalView = () => {
  const [entries, setEntries] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeEntry, setActiveEntry] = useState<any | null>(null);

  useEffect(() => {
    const fetchJournal = async () => {
      try {
        const res = await api.get('/journal');
        setEntries(res.data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchJournal();
  }, []);

  const handlePlayback = (e: MouseEvent) => {
    e.stopPropagation();
    toast("Playing audio reflection...", { icon: '▶️', duration: 3000 });
  };

  if (loading) return <div className="p-8 text-center">Loading journal...</div>;

  if (activeEntry) {
    return (
      <div className="space-y-6 max-w-2xl mx-auto">
        <button onClick={() => setActiveEntry(null)} className="text-[var(--color-primary)] font-medium mb-4 flex items-center gap-2 hover:underline">
          &larr; Back to Journal
        </button>
        <div className="card shadow-md">
          <div className="flex justify-between items-start mb-4">
            <span className="text-sm font-medium bg-orange-100 text-[var(--color-accent)] px-3 py-1 rounded">{activeEntry.dayBadge}</span>
            <span className="text-gray-500 text-sm">{activeEntry.date}</span>
          </div>
          <h2 className="text-2xl font-bold text-[var(--color-primary)] flex items-center gap-2 mb-6">
            {activeEntry.mood} {activeEntry.title}
          </h2>
          
          <div className="space-y-6">
            <div>
              <h3 className="text-sm font-bold text-gray-500 uppercase mb-2">What went well</h3>
              <p className="text-gray-800 bg-green-50 p-3 rounded-md border border-green-100">{activeEntry.wentWell}</p>
            </div>
            <div>
              <h3 className="text-sm font-bold text-gray-500 uppercase mb-2">What to improve</h3>
              <p className="text-gray-800 bg-red-50 p-3 rounded-md border border-red-100">{activeEntry.improve}</p>
            </div>
            <div>
              <h3 className="text-sm font-bold text-gray-500 uppercase mb-2">Students' response</h3>
              <p className="text-gray-800 bg-blue-50 p-3 rounded-md border border-blue-100">{activeEntry.studentResponse}</p>
            </div>
          </div>
          
          <div className="mt-8 pt-4 border-t border-gray-100 flex justify-end">
            <button onClick={(e) => handlePlayback(e)} className="btn-primary flex items-center gap-2">
              ▶ Play Audio Reflection
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-[var(--color-primary)]">My Teaching Journal</h2>
        <button className="btn-primary"> + New Entry</button>
      </div>

      <div className="flex gap-2 overflow-x-auto pb-2">
        <span className="px-3 py-1 bg-[var(--color-primary)] text-white rounded-full text-sm cursor-pointer">All Dates</span>
        <span className="px-3 py-1 bg-white border border-gray-300 rounded-full text-sm cursor-pointer hover:bg-gray-50">😄 Happy</span>
        <span className="px-3 py-1 bg-white border border-gray-300 rounded-full text-sm cursor-pointer hover:bg-gray-50">#Maths</span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {entries.map((entry) => (
          <div key={entry.id} onClick={() => setActiveEntry(entry)} className="card flex flex-col h-full hover:border-[var(--color-primary)] border border-transparent transition-all cursor-pointer">
            <div className="flex justify-between items-start mb-3">
              <span className="text-xs font-medium bg-orange-100 text-[var(--color-accent)] px-2 py-1 rounded">{entry.dayBadge}</span>
              <span className="text-gray-500 text-sm">{entry.date}</span>
            </div>
            <h3 className="font-bold text-lg mb-1 flex items-center gap-2">
              {entry.mood} {entry.title}
            </h3>
            <p className="text-gray-600 text-sm mb-4 flex-grow line-clamp-3">
              {entry.wentWellPreview}
            </p>
            <div className="flex flex-wrap gap-1 mb-4">
              {entry.tags.map((tag: string) => (
                <span key={tag} className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded">{tag}</span>
              ))}
            </div>
            <div className="flex justify-between items-center border-t border-gray-100 pt-3 mt-auto">
              <span className="text-[var(--color-primary)] text-sm font-medium">View Full Entry</span>
              <button onClick={(e) => handlePlayback(e)} className="text-[var(--color-accent)] text-sm font-medium hover:underline flex items-center gap-1">
                ▶ Playback
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default JournalView;
