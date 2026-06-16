import React, { useState } from 'react';
import api from '../../api/client';

const ChatView = () => {
  const [messages, setMessages] = useState([
    { role: 'coach', text: 'Hello! I am your Saathi AI Coach. How can I help you with your classes today?', time: 'Just now' }
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSend = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    const userMsg = { role: 'user', text: input, time: 'Just now' };
    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setLoading(true);

    try {
      const res = await api.post('/chat/message', { text: userMsg.text, language: 'en' });
      // simulate network delay for AI feel
      setTimeout(() => {
        setMessages(prev => [...prev, res.data]);
        setLoading(false);
      }, 1000);
    } catch (err) {
      setLoading(false);
    }
  };

  const handleNewChat = () => {
    setMessages([{ role: 'coach', text: 'Hello! I am your Saathi AI Coach. How can I help you with your classes today?', time: 'Just now' }]);
  };

  return (
    <div className="flex h-[calc(100vh-200px)] border border-gray-200 rounded-lg overflow-hidden bg-white">
      {/* Sidebar (hidden on mobile) */}
      <div className="w-64 bg-gray-50 border-r border-gray-200 hidden md:flex flex-col">
        <div className="p-4 border-b border-gray-200">
          <button onClick={handleNewChat} className="w-full btn-outline py-2 hover:bg-[var(--color-primary)] hover:text-white transition-colors">
            New Chat
          </button>
        </div>
        <div className="overflow-y-auto p-2">
          <div className="p-3 bg-white rounded-md border border-gray-200 cursor-pointer mb-2">
            <p className="text-sm text-gray-800 font-medium truncate">How to handle disruptive...</p>
            <p className="text-xs text-gray-500 mt-1">Yesterday</p>
          </div>
          <div className="p-3 hover:bg-gray-100 rounded-md cursor-pointer mb-2">
            <p className="text-sm text-gray-800 truncate">NCERT guidelines for Math</p>
            <p className="text-xs text-gray-500 mt-1">May 12</p>
          </div>
        </div>
      </div>

      {/* Main Chat */}
      <div className="flex-1 flex flex-col">
        <div className="h-14 border-b border-gray-200 px-4 flex items-center justify-between bg-white">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-[var(--color-primary)] flex items-center justify-center text-white font-bold text-sm">🤖</div>
            <span className="font-medium text-gray-800">Saathi AI Coach</span>
          </div>
          <select className="text-sm border border-gray-300 rounded px-2 py-1 bg-gray-50">
            <option>English</option>
            <option>Hindi</option>
          </select>
        </div>

        <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-slate-50">
          {messages.map((msg, i) => (
            <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
              <div className={`max-w-[80%] rounded-lg p-3 ${
                msg.role === 'user' 
                  ? 'bg-orange-100 text-gray-800' 
                  : 'bg-white border-l-4 border-[var(--color-primary)] shadow-sm'
              }`}>
                <p className="text-sm leading-relaxed">{msg.text}</p>
                <p className={`text-[10px] mt-1 text-right ${msg.role === 'user' ? 'text-orange-600' : 'text-gray-400'}`}>{msg.time}</p>
              </div>
            </div>
          ))}
          {loading && (
            <div className="flex justify-start">
              <div className="bg-white border-l-4 border-[var(--color-primary)] shadow-sm rounded-lg p-3">
                <p className="text-sm text-gray-500 italic animate-pulse">Thinking...</p>
              </div>
            </div>
          )}
        </div>

        {messages.length === 1 && (
          <div className="p-4 flex flex-wrap gap-2 bg-white">
            <button onClick={() => setInput("Explain fractions using a real-life example")} className="text-xs bg-gray-100 hover:bg-gray-200 border border-gray-200 rounded-full px-3 py-1.5 text-gray-700 transition-colors">
              Explain fractions using a real-life example
            </button>
            <button onClick={() => setInput("How do I manage a class of 45 students?")} className="text-xs bg-gray-100 hover:bg-gray-200 border border-gray-200 rounded-full px-3 py-1.5 text-gray-700 transition-colors">
              How do I manage a class of 45 students?
            </button>
          </div>
        )}

        <form onSubmit={handleSend} className="p-4 bg-white border-t border-gray-200">
          <div className="flex items-center gap-2">
            <button type="button" className="text-gray-400 hover:text-[var(--color-primary)] p-2">🎤</button>
            <input 
              type="text" 
              className="flex-1 border border-gray-300 rounded-full px-4 py-2 focus:outline-none focus:ring-1 focus:ring-[var(--color-primary)] text-sm"
              placeholder="Ask your coaching question..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
            />
            <button type="submit" disabled={!input.trim()} className="w-10 h-10 rounded-full bg-[var(--color-accent)] text-white flex items-center justify-center disabled:opacity-50 hover:bg-orange-600 transition-colors">
              ↗
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ChatView;
