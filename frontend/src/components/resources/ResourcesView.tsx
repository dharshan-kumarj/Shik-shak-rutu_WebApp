import { useEffect, useState } from 'react';
import api from '../../api/client';

const ResourcesView = () => {
  const [resources, setResources] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchResources = async () => {
      try {
        const res = await api.get('/resources');
        setResources(res.data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchResources();
  }, []);

  if (loading) return <div className="p-8 text-center">Loading resources...</div>;

  return (
    <div className="space-y-6">
      <div className="bg-orange-50 border border-orange-100 rounded-lg p-4 mb-6">
        <p className="text-sm font-medium text-[var(--color-accent)] mb-1">Recommended for You</p>
        <p className="text-gray-800 text-sm">Based on your Day 15 module on Fractions (Class 5).</p>
      </div>

      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-[var(--color-primary)]">Curated for You — DIKSHA Picks</h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {resources.map((res) => (
          <div key={res.id} className="card p-0 overflow-hidden flex flex-col h-full border border-gray-200">
            <div className="h-32 bg-[var(--color-primary)] opacity-90 relative flex items-center justify-center text-white">
               <span className="absolute top-2 right-2 bg-orange-500 text-white text-[10px] font-bold px-2 py-1 rounded">DIKSHA</span>
               <span className="text-4xl opacity-50">📚</span>
            </div>
            <div className="p-4 flex flex-col flex-grow">
              <h3 className="font-bold text-lg leading-tight mb-2">{res.title}</h3>
              <div className="text-xs text-gray-500 mb-3 space-x-2">
                <span className="bg-gray-100 px-2 py-1 rounded">{res.subject}</span>
                <span className="bg-gray-100 px-2 py-1 rounded">{res.grade}</span>
              </div>
              <div className="flex justify-between items-center text-sm text-gray-600 mb-4 mt-auto">
                <span className="flex items-center gap-1">🎥 {res.type} • {res.duration}</span>
                <span className={`text-xs font-medium px-2 py-1 rounded ${
                  res.difficulty === 'Beginner' ? 'bg-green-100 text-green-700' :
                  res.difficulty === 'Intermediate' ? 'bg-yellow-100 text-yellow-700' :
                  'bg-red-100 text-red-700'
                }`}>{res.difficulty}</span>
              </div>
              <a href="https://diksha.gov.in" target="_blank" rel="noreferrer" className="btn-outline text-center w-full block">Open in DIKSHA ↗</a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ResourcesView;
