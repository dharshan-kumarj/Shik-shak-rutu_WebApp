import React, { useEffect, useState } from 'react';
import api from '../../api/client';

const GroupsView = () => {
  const [groups, setGroups] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeGroup, setActiveGroup] = useState<any | null>(null);

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

  const openGroup = async (groupId: string) => {
    setLoading(true);
    try {
      const res = await api.get(`/groups/${groupId}`);
      setActiveGroup(res.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <div className="p-8 text-center">Loading groups...</div>;

  if (activeGroup) {
    return (
      <div className="space-y-6">
        <button onClick={() => setActiveGroup(null)} className="text-[var(--color-primary)] font-medium mb-4 flex items-center gap-2 hover:underline">
          &larr; Back to Groups
        </button>
        <div className="card border-l-4 border-[var(--color-accent)]">
          <h2 className="text-2xl font-bold mb-2">{activeGroup.name}</h2>
          <div className="flex items-center gap-4 text-sm text-gray-500 mb-4 border-b border-gray-100 pb-4">
            <span>👥 {activeGroup.members} Members</span>
            <span>🟢 {activeGroup.active} Active</span>
          </div>
          
          <div className="space-y-4">
            <h3 className="font-bold text-lg">Recent Insights</h3>
            {activeGroup.posts && activeGroup.posts.map((post: any) => (
              <div key={post.id} className="p-4 bg-gray-50 rounded-lg border border-gray-200">
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <span className="font-bold text-gray-800">{post.author}</span>
                    <span className="text-xs text-gray-500 ml-2">{post.state} • {post.subject}</span>
                  </div>
                  <span className="text-xs font-medium bg-orange-100 text-[var(--color-accent)] px-2 py-1 rounded">{post.dayBadge}</span>
                </div>
                <p className="text-gray-700 mb-3">{post.text}</p>
                <div className="flex gap-2">
                  <button className="text-sm text-gray-600 hover:text-[var(--color-primary)]">👍 {post.helpful} Helpful</button>
                  <button className="text-sm text-gray-600 hover:text-[var(--color-primary)]">💬 {post.comments} Comments</button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center mb-6">
        <div className="flex gap-4 border-b border-gray-200 pb-1">
          <button className="font-bold text-[var(--color-primary)] border-b-2 border-[var(--color-primary)] pb-1">My Groups</button>
          <button className="text-gray-500 hover:text-gray-700 pb-1 font-medium">Explore Groups</button>
        </div>
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
            <button onClick={() => openGroup(group.id)} className="btn-outline w-full text-sm py-2">Open Group</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default GroupsView;
