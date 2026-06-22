import React, { useState, useEffect } from 'react';
import toast from 'react-hot-toast';

interface Post {
  id: string;
  author: string;
  state: string;
  subject: string;
  text: string;
  tags: string[];
  dayBadge: string;
  helpful: number;
  comments: number;
  commentList: { id: string; author: string; text: string; time: string }[];
  likedByMe: boolean;
}

interface Group {
  id: string;
  name: string;
  tags: string[];
  members: number;
  active: number;
  lastActivity: string;
  posts: Post[];
}

const MOCK_GROUPS: Group[] = [
  {
    id: "g1", name: "Class 10 Science — CBSE Teachers Hub", tags: ["Science", "Class 10", "CBSE", "National"], members: 284, active: 36, lastActivity: "Priya shared a balancing equations worksheet",
    posts: [
      { id: "g1p1", author: "Priya D.", state: "Maharashtra", subject: "Science", dayBadge: "Today", helpful: 24, comments: 8,
        text: "I created a color-coded worksheet for balancing chemical equations using the bead activity method. Students use blue dots for H atoms, red for O, etc. The visual approach worked for 32/40 students in my first period! Happy to share the template if anyone wants it.",
        tags: ["Chemical Reactions", "Worksheet", "#Class10"],
        likedByMe: false,
        commentList: [
          { id: "g1c1", author: "Arun K.", text: "This is brilliant! Could you share the PDF? I'll try it with my class tomorrow.", time: "2 hours ago" },
          { id: "g1c2", author: "Meera S.", text: "Did you include polyatomic ions like SO₄²⁻ too?", time: "1 hour ago" },
          { id: "g1c3", author: "Priya D.", text: "Yes Meera! There's a separate section for polyatomic ions with different colored beads for each ion.", time: "45 mins ago" }
        ]
      },
      { id: "g1p2", author: "Rajesh K.", state: "UP", subject: "Science", dayBadge: "Yesterday", helpful: 18, comments: 5,
        text: "Class 10 students often confuse aerobic vs anaerobic respiration. I made a simple comparison table with columns: where it happens, oxygen needed, products, energy released. Then I added a 'sports analogy' — sprinting (anaerobic) vs marathon (aerobic). The analogy clicked immediately!",
        tags: ["Life Processes", "Respiration", "Teaching Tip"],
        likedByMe: false,
        commentList: [
          { id: "g1c4", author: "Sunita R.", text: "The sports analogy is perfect! I'll borrow this.", time: "5 hours ago" },
          { id: "g1c5", author: "Vikram S.", text: "Do you have a printable version of the comparison table?", time: "3 hours ago" }
        ]
      }
    ]
  },
  {
    id: "g2", name: "Class 5 Maths — Activity Based Learning", tags: ["Mathematics", "Class 5", "CBSE", "Activity Based"], members: 167, active: 22, lastActivity: "Deepa shared a fraction pizza activity",
    posts: [
      { id: "g2p1", author: "Deepa N.", state: "Tamil Nadu", subject: "Mathematics", dayBadge: "Today", helpful: 31, comments: 12,
        text: "Hands-down the best fraction lesson I've ever taught! I brought 4 large pizzas (paper cutouts) to class and divided students into groups. Each group had to 'order' fractions of a pizza — 'We want 3/4 with mushrooms and 1/2 with extra cheese.' The numerator/denominator confusion vanished by the end of class!",
        tags: ["Fractions", "Pizza Activity", "Hands-on"],
        likedByMe: false,
        commentList: [
          { id: "g2c1", author: "Lakshmi P.", text: "This is genius! How long did the activity take?", time: "3 hours ago" },
          { id: "g2c2", author: "Deepa N.", text: "About 35 mins including setup. Students were so engaged they didn't realize they were learning!", time: "2 hours ago" },
          { id: "g2c3", author: "Mohan R.", text: "Did you laminate the paper pizzas for reuse? I'm thinking of making a set.", time: "1 hour ago" }
        ]
      },
      { id: "g2p2", author: "Farhan A.", state: "Karnataka", subject: "Mathematics", dayBadge: "2 days ago", helpful: 15, comments: 4,
        text: "Struggling with LCM word problems. Students know the method but can't identify when to use LCM vs HCF in real-life scenarios. I created a 'keyword bank' — LCM keywords (repeat, together again, next) vs HCF keywords (divide equally, maximum, groups). Working well so far!",
        tags: ["LCM", "HCF", "Word Problems"],
        likedByMe: false,
        commentList: [
          { id: "g2c4", author: "Ritu S.", text: "Keyword bank is a great scaffold! I'd add 'least' for LCM and 'greatest' for HCF.", time: "1 day ago" }
        ]
      },
      { id: "g2p3", author: "Geeta P.", state: "Rajasthan", subject: "Mathematics", dayBadge: "3 days ago", helpful: 22, comments: 7,
        text: "Symmetry lesson update: Instead of drawing on paper, I had students fold A4 sheets and cut shapes — they opened them to discover symmetrical patterns. The 'wow' moment when they saw the folded pattern was priceless! We then classified shapes by number of symmetry lines.",
        tags: ["Symmetry", "Hands-on", "Class 5"],
        likedByMe: false,
        commentList: [
          { id: "g2c5", author: "Anjali M.", text: "Try having them write their names in capital letters and find symmetry lines — H, A, T are good examples!", time: "2 days ago" }
        ]
      }
    ]
  },
  {
    id: "g3", name: "Classroom Management — Innovative Strategies", tags: ["All Grades", "Management", "Engagement"], members: 412, active: 53, lastActivity: "Suresh asked about handling noise during group work",
    posts: [
      { id: "g3p1", author: "Suresh M.", state: "Andhra Pradesh", subject: "Science", dayBadge: "Today", helpful: 45, comments: 16,
        text: "How do you all manage noise levels during group activities? My Class 6 students get VERY excited during experiments and the noise disturbs neighboring classes. I've tried hand-raising signals but it only works temporarily. Any tried-and-tested strategies?",
        tags: ["Classroom Management", "Noise Control", "Discussion"],
        likedByMe: false,
        commentList: [
          { id: "g3c1", author: "Nandini K.", text: "I use a 'traffic light' system — green = go, yellow = whisper, red = silent. When I hold up the red card, students freeze. Takes practice but works!", time: "4 hours ago" },
          { id: "g3c2", author: "Imran S.", text: "Try using a timer on the smartboard — visual countdown helps students self-regulate. I say 'You have 5 more minutes of discussion time' and they manage themselves.", time: "3 hours ago" },
          { id: "g3c3", author: "Suresh M.", text: "Thanks! I'll try the traffic light system tomorrow. Do you laminate the cards?", time: "2 hours ago" },
          { id: "g3c4", author: "Nandini K.", text: "Yes! Laminated A4 sheets in red, yellow, green — clipped to the board. Works across all periods.", time: "1 hour ago" }
        ]
      },
      { id: "g3p2", author: "Lata R.", state: "Gujarat", subject: "All Subjects", dayBadge: "Yesterday", helpful: 33, comments: 9,
        text: "I started doing '2-minute check-ins' at the start of each period. Students share one word about how they're feeling. It takes almost no time but has transformed classroom atmosphere — students feel seen and are more willing to participate.",
        tags: ["SEL", "Engagement", "Routine"],
        likedByMe: false,
        commentList: [
          { id: "g3c5", author: "Kavita P.", text: "Do you have shy students who don't want to share?", time: "1 day ago" },
          { id: "g3c6", author: "Lata R.", text: "Yes! I let them write it on a sticky note instead. Eventually most feel comfortable speaking.", time: "1 day ago" }
        ]
      }
    ]
  },
  {
    id: "g4", name: "DIKSHA Resources — Share & Review", tags: ["DIKSHA", "Resources", "All Subjects"], members: 198, active: 18, lastActivity: "Anita reviewed a new DIKSHA interactive module",
    posts: [
      { id: "g4p1", author: "Anita V.", state: "Telangana", subject: "Science", dayBadge: "Today", helpful: 27, comments: 6,
        text: "Just explored the new DIKSHA interactive module on 'Refraction of Light' for Class 10. It has a virtual lab where students can change the angle of incidence and see the refraction angle change in real-time! Much better than just showing diagrams. Link: https://diksha.gov.in/explore?subject=Science&grade=10&q=refraction",
        tags: ["DIKSHA", "Resource Review", "Light"],
        likedByMe: false,
        commentList: [
          { id: "g4c1", author: "Rahul G.", text: "I used this last week! Students spent 20 mins exploring different angles on their own.", time: "5 hours ago" },
          { id: "g4c2", author: "Anita V.", text: "Right? The self-discovery aspect is what makes it powerful. No lecture needed!", time: "4 hours ago" }
        ]
      },
      { id: "g4p2", author: "Vijay S.", state: "Punjab", subject: "Mathematics", dayBadge: "3 days ago", helpful: 19, comments: 4,
        text: "Found an excellent DIKSHA resource for teaching 'Area of Irregular Shapes' to Class 5. It has grid overlays on real objects (leaves, handprints, map of India) that students can count squares on. Made the concept so concrete! Search for 'area irregular shapes grid' on DIKSHA.",
        tags: ["DIKSHA", "Mathematics", "Area"],
        likedByMe: false,
        commentList: [
          { id: "g4c3", author: "Simran K.", text: "Thanks for the tip! I was just about to teach this topic.", time: "2 days ago" }
        ]
      }
    ]
  }
];

const GroupsView = () => {
  const [groups, setGroups] = useState<Group[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeGroup, setActiveGroup] = useState<Group | null>(null);

  const [newPostText, setNewPostText] = useState('');
  const [expandedComments, setExpandedComments] = useState<string[]>([]);
  const [commentInputs, setCommentInputs] = useState<{[key: string]: string}>({});

  useEffect(() => {
    const timer = setTimeout(() => {
      setGroups(MOCK_GROUPS);
      setLoading(false);
    }, 600);
    return () => clearTimeout(timer);
  }, []);

  const openGroup = (groupId: string) => {
    setLoading(true);
    setTimeout(() => {
      const group = MOCK_GROUPS.find(g => g.id === groupId);
      if (group) {
        const seeded = {
          ...group,
          posts: group.posts.map(p => ({ ...p, likedByMe: false }))
        };
        setActiveGroup(seeded);
      }
      setLoading(false);
    }, 400);
  };

  const handleCreatePost = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newPostText.trim()) return;

    const newPost: Post = {
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

    setActiveGroup(prev => prev ? { ...prev, posts: [newPost, ...prev.posts] } : prev);
    setNewPostText('');
    toast.success('Insight shared with the group!');

    setTimeout(() => {
      setActiveGroup(prev => {
        if (!prev) return prev;
        const updatedPosts = [...prev.posts];
        if (updatedPosts[0].id === newPost.id) {
          updatedPosts[0] = {
            ...updatedPosts[0],
            helpful: 2,
            comments: 1,
            commentList: [
              { id: `c-auto-${Date.now()}`, author: 'Priya M.', text: 'Great idea! Thanks for sharing this with the group.', time: 'Just now' }
            ]
          };
          toast.success('Priya M. found your post helpful!', { icon: '👍' });
        }
        return { ...prev, posts: updatedPosts };
      });
    }, 4000);
  };

  const toggleLike = (postId: string) => {
    setActiveGroup(prev => {
      if (!prev) return prev;
      const updatedPosts = prev.posts.map(post => {
        if (post.id === postId) {
          return { ...post, likedByMe: !post.likedByMe, helpful: post.likedByMe ? post.helpful - 1 : post.helpful + 1 };
        }
        return post;
      });
      return { ...prev, posts: updatedPosts };
    });
  };

  const toggleComments = (postId: string) => {
    setExpandedComments(prev =>
      prev.includes(postId) ? prev.filter(id => id !== postId) : [...prev, postId]
    );
  };

  const handleAddComment = (e: React.FormEvent, postId: string) => {
    e.preventDefault();
    const commentText = commentInputs[postId];
    if (!commentText?.trim()) return;

    setActiveGroup(prev => {
      if (!prev) return prev;
      const updatedPosts = prev.posts.map(post => {
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

    setCommentInputs(prev => ({ ...prev, [postId]: '' }));
  };

  if (loading) return <div className="p-8 text-center text-gray-500">Loading groups...</div>;

  if (activeGroup) {
    return (
      <div className="space-y-6 max-w-3xl mx-auto">
        <button onClick={() => { setActiveGroup(null); setExpandedComments([]); }} className="text-[var(--color-primary)] font-medium mb-2 flex items-center gap-2 hover:underline">
          &larr; Back to Groups
        </button>

        <div className="bg-white border-l-4 border-[var(--color-accent)] rounded-lg shadow-sm p-4">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-xl font-bold text-gray-800">{activeGroup.name}</h2>
              <div className="flex items-center gap-4 text-sm text-gray-500 mt-1">
                <span>👥 {activeGroup.members} Members</span>
                <span>🟢 {activeGroup.active} Active</span>
              </div>
            </div>
            <div className="flex flex-wrap gap-1">
              {activeGroup.tags.slice(0, 2).map(tag => (
                <span key={tag} className="text-xs bg-gray-100 text-gray-600 px-2 py-0.5 rounded-full">{tag}</span>
              ))}
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
          <form onSubmit={handleCreatePost}>
            <textarea
              className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)] resize-none"
              rows={3}
              placeholder="Share an insight, activity, or ask a question..."
              value={newPostText}
              onChange={e => setNewPostText(e.target.value)}
            ></textarea>
            <div className="flex justify-between items-center mt-3">
              <div className="text-xs text-gray-500">Visible to verified group members only</div>
              <button type="submit" disabled={!newPostText.trim()} className="btn-primary py-1.5 px-6 disabled:opacity-50">Post</button>
            </div>
          </form>
        </div>

        <div className="space-y-4">
          {activeGroup.posts.map(post => (
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

                <div className="flex flex-wrap gap-1.5 mb-3">
                  {post.tags.map(tag => (
                    <span key={tag} className="text-xs bg-blue-50 text-blue-700 px-2 py-0.5 rounded-full">{tag}</span>
                  ))}
                </div>

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

              {expandedComments.includes(post.id) && (
                <div className="bg-gray-50 p-4 border-t border-gray-200">
                  <div className="space-y-3 mb-4">
                    {post.commentList.map(comment => (
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
                    {post.commentList.length === 0 && (
                      <p className="text-sm text-gray-500 italic">No comments yet. Be the first to reply!</p>
                    )}
                  </div>

                  <form onSubmit={(e) => handleAddComment(e, post.id)} className="flex gap-2">
                    <input
                      type="text"
                      placeholder="Write a comment..."
                      className="flex-1 border border-gray-300 rounded-full px-4 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-[var(--color-primary)]"
                      value={commentInputs[post.id] || ''}
                      onChange={e => setCommentInputs(prev => ({ ...prev, [post.id]: e.target.value }))}
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
        <div>
          <h2 className="text-2xl font-bold text-[var(--color-primary)]">Peer Groups</h2>
          <p className="text-sm text-gray-500 mt-1">Connect with fellow teachers, share insights, and grow together</p>
        </div>
        <div className="flex items-center gap-2 text-sm text-gray-500">
          <span className="w-2 h-2 rounded-full bg-green-500"></span>
          {groups.reduce((sum, g) => sum + g.active, 0)} Active Now
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {groups.map(group => (
          <div key={group.id} className="bg-white rounded-lg border border-gray-200 p-5 hover:shadow-md hover:border-[var(--color-accent)] transition-all cursor-pointer">
            <div className="flex items-start justify-between mb-3">
              <h3 className="font-bold text-gray-800">{group.name}</h3>
              <span className="text-xs bg-green-100 text-green-700 px-2 py-0.5 rounded-full font-medium">{group.active} active</span>
            </div>
            <div className="flex flex-wrap gap-2 mb-4">
              {group.tags.map(tag => (
                <span key={tag} className="text-xs font-medium bg-gray-100 text-gray-700 px-2 py-0.5 rounded-full">{tag}</span>
              ))}
            </div>
            <div className="flex items-center gap-4 text-sm text-gray-500 mb-4 border-b border-gray-100 pb-4">
              <span>👥 {group.members} Members</span>
            </div>
            <div className="flex items-center gap-2 mb-4">
              <span className="text-xs text-gray-400">Latest:</span>
              <p className="text-sm text-gray-600 italic line-clamp-1">"{group.lastActivity}"</p>
            </div>
            <button onClick={() => openGroup(group.id)} className="btn-outline w-full text-sm py-2 flex items-center justify-center gap-2">
              Open Group 💬
            </button>
          </div>
        ))}
      </div>

      <div className="bg-gradient-to-r from-orange-50 to-yellow-50 border border-orange-100 rounded-lg p-4 text-center">
        <p className="text-sm text-gray-600">
          💡 <span className="font-medium">Pro Tip:</span> Join groups relevant to your classes. Active members earn 'Peer Mentor' badges and get featured in the community.
        </p>
      </div>
    </div>
  );
};

export default GroupsView;
