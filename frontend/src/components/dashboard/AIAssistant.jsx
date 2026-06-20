import React, { useState, useRef, useEffect } from 'react';
import { AnimatedCard } from '../ui/AnimatedCard';
import { sendChatMessage } from '../../api/assistantApi';
import { Send, Bot, User, Sparkles, Mic, Loader2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export const AIAssistant = () => {
  const [messages, setMessages] = useState([
    { role: 'model', text: 'Namaskaram! I am Bharat Sahayak. How can I help you navigate government services today?' }
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const endRef = useRef(null);

  const scrollToBottom = () => endRef.current?.scrollIntoView({ behavior: "smooth" });
  useEffect(() => { scrollToBottom() }, [messages, loading]);

  const handleSend = async (text = input) => {
    if (!text.trim()) return;
    setMessages(prev => [...prev, { role: 'user', text }]);
    setInput('');
    setLoading(true);
    
    try {
      const result = await sendChatMessage(text, messages);
      setMessages(prev => [...prev, { role: 'model', text: result.response }]);
    } catch (err) {
      setMessages(prev => [...prev, { role: 'model', text: "Sorry, I encountered an error communicating with the orchestration layer." }]);
    } finally {
      setLoading(false);
    }
  };

  const prompts = ["Find education schemes", "Check my eligibility", "Explain income certificate"];

  return (
    <AnimatedCard className="flex flex-col h-[600px] bg-white border-gray-100">
      {/* Chat Header */}
      <div className="p-4 border-b border-gray-100 bg-gradient-to-r from-blue-600 to-indigo-600 flex items-center justify-between text-white">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center backdrop-blur-md border border-white/30">
            <Bot size={22} className="text-white" />
          </div>
          <div>
            <h3 className="font-bold tracking-tight text-lg leading-none">Bharat Sahayak</h3>
            <span className="text-xs text-blue-200 font-medium flex items-center gap-1 mt-1">
              <span className="w-1.5 h-1.5 rounded-full bg-green-400 shadow-[0_0_8px_rgba(74,222,128,0.8)]"></span> Online
            </span>
          </div>
        </div>
        <Sparkles size={20} className="text-blue-200 opacity-50" />
      </div>
      
      {/* Chat Area */}
      <div className="flex-1 overflow-y-auto p-4 space-y-6 bg-gray-50/50">
        <AnimatePresence initial={false}>
          {messages.map((msg, i) => (
            <motion.div 
              key={i} 
              initial={{ opacity: 0, y: 10, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 0.3 }}
              className={`flex gap-3 max-w-[85%] ${msg.role === 'user' ? 'ml-auto flex-row-reverse' : ''}`}
            >
              <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 shadow-sm ${msg.role === 'user' ? 'bg-indigo-600 text-white' : 'bg-white border border-gray-200 text-blue-600'}`}>
                {msg.role === 'user' ? <User size={16} /> : <Bot size={16} />}
              </div>
              <div className={`p-4 rounded-2xl text-[15px] leading-relaxed shadow-sm ${
                msg.role === 'user' 
                  ? 'bg-indigo-600 text-white rounded-tr-sm' 
                  : 'bg-white border border-gray-100 text-gray-800 rounded-tl-sm'
              }`}>
                {msg.text}
              </div>
            </motion.div>
          ))}
          {loading && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex gap-3 max-w-[85%]">
              <div className="w-8 h-8 rounded-full bg-white border border-gray-200 text-blue-600 flex items-center justify-center shrink-0 shadow-sm">
                <Bot size={16} />
              </div>
              <div className="p-4 bg-white border border-gray-100 rounded-2xl rounded-tl-sm flex items-center gap-2 text-gray-500 shadow-sm">
                <Loader2 size={16} className="animate-spin text-blue-600" /> Orchestrating response...
              </div>
            </motion.div>
          )}
        </AnimatePresence>
        <div ref={endRef} />
      </div>

      {/* Input Area */}
      <div className="p-4 bg-white border-t border-gray-100">
        {/* Suggested Prompts */}
        {messages.length === 1 && (
          <div className="flex gap-2 overflow-x-auto pb-3 mb-1 no-scrollbar">
            {prompts.map((p, i) => (
              <button 
                key={i} 
                onClick={() => handleSend(p)}
                className="whitespace-nowrap text-xs font-medium px-3 py-1.5 bg-blue-50 text-blue-700 hover:bg-blue-100 rounded-full border border-blue-100 transition-colors"
              >
                {p}
              </button>
            ))}
          </div>
        )}
        
        <div className="flex items-center gap-2">
          <button className="p-3 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-xl transition-colors">
            <Mic size={20} />
          </button>
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleSend()}
            placeholder="Ask about schemes, eligibility, or forms..."
            className="flex-1 px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white transition-all text-sm"
          />
          <button 
            onClick={() => handleSend()}
            disabled={loading || !input.trim()}
            className="p-3 bg-blue-600 text-white rounded-xl flex items-center justify-center hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-sm shadow-blue-600/20"
          >
            <Send size={20} className={input.trim() ? "translate-x-0.5" : ""} />
          </button>
        </div>
      </div>
    </AnimatedCard>
  );
};
