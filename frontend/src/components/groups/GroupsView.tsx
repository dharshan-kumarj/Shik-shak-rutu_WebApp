import React, { useEffect, useState } from 'react';
import api from '../../api/client';

const GroupsView = () => {
  const [groups, setGroups] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchGroups = async () => {
      try {
        const res = await api.get('/groups');
        setGroups(res.data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchGroups();
  }, []);

  if (loading) return <div className="p-8 text-center">Loading groups...</div>;

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center mb-6">
        <div className="flex gap-4 border-b border-gray-200 pb-1">
          <button className="font-bold text-[var(--color-primary)] border-b-2 border-[var(--color-primary)] pb-1">My Groups</button>
          <button className="text-gray-500 hover:text-gray-700 pb-1 font-medium">Explore Groups</button>
        </div>
        <button className="btn-primary py-1.5 text-sm">Create Group</button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {groups.map(group => (
          <div key={group.id} className="card hover:border-[var(--color-accent)] border border-transparent transition-all cursor-pointer">
            <h3 className="font-bold text-lg mb-2">{group.name}</h3>
            <div className="flex flex-wrap gap-2 mb-4">
              {group.tags.map((tag: string) => (
                <span key={tag} className="text-xs font-medium bg-gray-100 text-gray-700 px-2 py-1 rounded-full">{tag}</span>
              ))}
            </div>
            <div className="flex items-center gap-4 text-sm text-gray-500 mb-4 border-b border-gray-100 pb-4">
              <span className="flex items-center gap-1">👥 {group.members} Members</span>
              <span className="flex items-center gap-1">🟢 {group.active} Active this week</span>
            </div>
            <p className="text-sm text-gray-600 truncate mb-4 bg-gray-50 p-2 rounded italic">
              " {group.lastActivity} "
            </p>
            <button className="btn-outline w-full text-sm py-2">Open Group</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default GroupsView;
