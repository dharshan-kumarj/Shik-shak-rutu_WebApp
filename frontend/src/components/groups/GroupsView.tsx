import React, { useEffect, useState } from 'react';
import api from '../../api/client';
import toast from 'react-hot-toast';

const GroupsView = () => {
  const [groups, setGroups] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeGroup, setActiveGroup] = useState<any | null>(null);
  
  // Post state
  const [newPostText, setNewPostText] = useState('');
  const [expandedComments, setExpandedComments] = useState<string[]>([]);
  const [commentInputs, setCommentInputs] = useState<{[key: string]: string}>({});

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
      const groupData = res.data;
      
      // Seed some mock comments into the posts for the social media feel
      if (groupData.posts) {
        groupData.posts = groupData.posts.map((post: any) => ({
          ...post,
          likedByMe: false,
          commentList: [
            { id: 'c1', author: 'Arun K.', text: 'This is brilliant! I will try this tomorrow.', time: '2 hours ago' },
            { id: 'c2', author: 'Meera S.', text: 'Did the students stay focused throughout?', time: '1 hour ago' }
          ]
        }));
      }
      
      setActiveGroup(groupData);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleCreatePost = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newPostText.trim()) return;
    
    const newPost = {
      id: Date.now().toString(),
      author: 'You',
      state: 'Your State',
      subject: 'Your Subject',
      text: newPostText,
      tags: ['New Insight'],
      dayBadge: 'Just Now',
      helpful: 0,
      comments: 0,
      commentList: [],
      likedByMe: false
    };
    
    setActiveGroup({
      ...activeGroup,
      posts: [newPost, ...activeGroup.posts]
    });
    setNewPostText('');
    toast.success('Insight shared with the group!');
    
    // Simulate someone reacting after 3 seconds
    setTimeout(() => {
      setActiveGroup((prev: any) => {
        if (!prev) return prev;
        const updatedPosts = [...prev.posts];
        if (updatedPosts[0].id === newPost.id) {
          updatedPosts[0] = {
            ...updatedPosts[0],
            helpful: 1,
            comments: 1,
            commentList: [{ id: 'c3', author: 'Priya D.', text: 'Great idea! Thanks for sharing.', time: 'Just now' }]
          };
          toast('Priya D. reacted to your post!', { icon: '👍' });
        }
        return { ...prev, posts: updatedPosts };
      });
    }, 4000);
  };

  const toggleLike = (postId: string) => {
    setActiveGroup((prev: any) => {
      const updatedPosts = prev.posts.map((post: any) => {
        if (post.id === postId) {
          return {
            ...post,
            likedByMe: !post.likedByMe,
            helpful: post.likedByMe ? post.helpful - 1 : post.helpful + 1
          };
        }
        return post;
      });
      return { ...prev, posts: updatedPosts };
    });
  };

  const toggleComments = (postId: string) => {
    if (expandedComments.includes(postId)) {
      setExpandedComments(expandedComments.filter(id => id !== postId));
    } else {
      setExpandedComments([...expandedComments, postId]);
    }
  };

  const handleAddComment = (e: React.FormEvent, postId: string) => {
    e.preventDefault();
    const commentText = commentInputs[postId];
    if (!commentText || !commentText.trim()) return;

    setActiveGroup((prev: any) => {
      const updatedPosts = prev.posts.map((post: any) => {
        if (post.id === postId) {
          return {
            ...post,
            comments: post.comments + 1,
            commentList: [
              ...post.commentList,
              { id: Date.now().toString(), author: 'You', text: commentText, time: 'Just now' }
            ]
          };
        }
        return post;
      });
      return { ...prev, posts: updatedPosts };
    });

    setCommentInputs({ ...commentInputs, [postId]: '' });
  };

  if (loading) return <div className="p-8 text-center">Loading groups...</div>;

  if (activeGroup) {
    return (
      <div className="space-y-6 max-w-3xl mx-auto">
        <button onClick={() => setActiveGroup(null)} className="text-[var(--color-primary)] font-medium mb-2 flex items-center gap-2 hover:underline">
          &larr; Back to Groups
        </button>
        
        {/* Group Header */}
        <div className="card border-t-4 border-[var(--color-accent)] bg-white rounded-lg shadow-sm">
          <h2 className="text-2xl font-bold mb-2">{activeGroup.name}</h2>
          <div className="flex items-center gap-4 text-sm text-gray-500 mb-2">
            <span>👥 {activeGroup.members} Members</span>
            <span>🟢 {activeGroup.active} Active</span>
          </div>
        </div>
        
        {/* Create Post Box */}
        <div className="card shadow-sm p-4">
          <form onSubmit={handleCreatePost}>
            <textarea 
              className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)] resize-none"
              rows={3}
              placeholder="Share an insight, activity, or ask a question..."
              value={newPostText}
              onChange={(e) => setNewPostText(e.target.value)}
            ></textarea>
            <div className="flex justify-between items-center mt-3">
              <div className="text-xs text-gray-500">Visible to verified group members only</div>
              <button type="submit" disabled={!newPostText.trim()} className="btn-primary py-1.5 px-6 disabled:opacity-50">Post</button>
            </div>
          </form>
        </div>
          
        {/* Feed */}
        <div className="space-y-4">
          {activeGroup.posts && activeGroup.posts.map((post: any) => (
            <div key={post.id} className="bg-white rounded-lg border border-gray-200 shadow-sm overflow-hidden">
              <div className="p-4">
                <div className="flex justify-between items-start mb-3">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-orange-100 flex items-center justify-center text-[var(--color-accent)] font-bold">
                      {post.author.charAt(0)}
                    </div>
                    <div>
                      <span className="font-bold text-gray-800 block leading-tight">{post.author}</span>
                      <span className="text-xs text-gray-500">{post.state} • {post.subject}</span>
                    </div>
                  </div>
                  <span className="text-xs font-medium bg-gray-100 text-gray-600 px-2 py-1 rounded">{post.dayBadge}</span>
                </div>
                <p className="text-gray-800 text-sm md:text-base leading-relaxed mb-4">{post.text}</p>
                
                {/* Actions */}
                <div className="flex gap-4 border-t border-gray-100 pt-3">
                  <button 
                    onClick={() => toggleLike(post.id)} 
                    className={`text-sm font-medium flex items-center gap-1.5 ${post.likedByMe ? 'text-[var(--color-primary)]' : 'text-gray-600 hover:text-[var(--color-primary)]'}`}
                  >
                    {post.likedByMe ? '👍' : '🤍'} {post.helpful} Helpful
                  </button>
                  <button 
                    onClick={() => toggleComments(post.id)} 
                    className="text-sm text-gray-600 hover:text-[var(--color-primary)] font-medium flex items-center gap-1.5"
                  >
                    💬 {post.comments} Comments
                  </button>
                </div>
              </div>

              {/* Comments Section */}
              {expandedComments.includes(post.id) && (
                <div className="bg-gray-50 p-4 border-t border-gray-200">
                  <div className="space-y-3 mb-4">
                    {post.commentList && post.commentList.map((comment: any) => (
                      <div key={comment.id} className="flex gap-3">
                        <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center text-blue-700 font-bold text-xs shrink-0">
                          {comment.author.charAt(0)}
                        </div>
                        <div className="bg-white p-3 rounded-lg border border-gray-200 w-full shadow-sm">
                          <div className="flex justify-between items-baseline mb-1">
                            <span className="font-bold text-sm text-gray-800">{comment.author}</span>
                            <span className="text-xs text-gray-500">{comment.time}</span>
                          </div>
                          <p className="text-sm text-gray-700">{comment.text}</p>
                        </div>
                      </div>
                    ))}
                    {(!post.commentList || post.commentList.length === 0) && (
                      <p className="text-sm text-gray-500 italic">No comments yet. Be the first to reply!</p>
                    )}
                  </div>
                  
                  {/* Add Comment */}
                  <form onSubmit={(e) => handleAddComment(e, post.id)} className="flex gap-2">
                    <input 
                      type="text" 
                      placeholder="Write a comment..." 
                      className="flex-1 border border-gray-300 rounded-full px-4 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-[var(--color-primary)]"
                      value={commentInputs[post.id] || ''}
                      onChange={(e) => setCommentInputs({...commentInputs, [post.id]: e.target.value})}
                    />
                    <button type="submit" disabled={!commentInputs[post.id]?.trim()} className="bg-[var(--color-primary)] text-white px-4 rounded-full text-sm font-medium disabled:opacity-50">Reply</button>
                  </form>
                </div>
              )}
            </div>
          ))}
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
