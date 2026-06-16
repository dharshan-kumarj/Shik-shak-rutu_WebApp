import React, { useEffect, useState } from 'react';
import api from '../../api/client';

const JournalView = () => {
  const [entries, setEntries] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

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

  if (loading) return <div className="p-8 text-center">Loading journal...</div>;

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-[var(--color-primary)]">My Teaching Journal</h2>
        <button className="btn-primary"> + New Entry</button>
      </div>

      <div className="flex gap-2 overflow-x-auto pb-2">
        <span className="px-3 py-1 bg-white border border-gray-300 rounded-full text-sm cursor-pointer hover:bg-gray-50">All Dates</span>
        <span className="px-3 py-1 bg-white border border-gray-300 rounded-full text-sm cursor-pointer hover:bg-gray-50">😄 Happy</span>
        <span className="px-3 py-1 bg-white border border-gray-300 rounded-full text-sm cursor-pointer hover:bg-gray-50">#Maths</span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {entries.map((entry) => (
          <div key={entry.id} className="card flex flex-col h-full hover:shadow-md transition-shadow cursor-pointer">
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
              <button className="text-[var(--color-primary)] text-sm font-medium hover:underline">View Full Entry</button>
              <button className="text-[var(--color-accent)] text-sm font-medium hover:underline flex items-center gap-1">
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
