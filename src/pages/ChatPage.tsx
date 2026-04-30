import { motion, AnimatePresence } from 'framer-motion';
import { Send, Mic, Sparkles, BookOpen, MessageSquare, GraduationCap, Clock, LayoutGrid, Settings } from 'lucide-react';
import PageContainer from '../components/layout/PageContainer';
import { mockChatMessages } from '../data/mockData';
import { useState, useRef, useEffect } from 'react';
import type { ChatMessage } from '../types';

const quickActions = [
  { id: 'practice', icon: MessageSquare, label: 'Practice Conversation', color: '#2ECC71' },
  { id: 'grammar', icon: BookOpen, label: 'Grammar Help', color: '#3498DB' },
  { id: 'vocab', icon: GraduationCap, label: 'Vocabulary Quiz', color: '#F39C12' },
  { id: 'daily', icon: Sparkles, label: 'Daily Challenge', color: '#E74C3C' },
];

const mockHistory = [
  { id: 1, title: 'Business Meeting Phras...', time: 'Today' },
  { id: 2, title: 'Ordering Coffee Practice', time: 'Yesterday' },
  { id: 3, title: 'Past Tense Corrections', time: '2 days ago' },
  { id: 4, title: 'Travel Vocabulary Quiz', time: 'Last week' },
];

const aiResponses = [
  "That's a great attempt! Let me help you improve that sentence. Try using 'Furthermore' instead of 'Also' for more formal business writing.",
  "Excellent! Your pronunciation is getting better. Let's try another phrase: 'Could you elaborate on that point?'",
  "Here's a useful business phrase: 'I'd like to draw your attention to...' — Try using it in a sentence!",
  "Good question! The difference between 'affect' and 'effect' is: 'affect' is usually a verb, 'effect' is usually a noun.",
  "Let's practice! Complete this sentence: 'The quarterly revenue has ___ by 15% compared to last year.'",
];

function TypingIndicator() {
  return (
    <div className="flex items-center gap-2 px-4 py-3 max-w-[85%] md:max-w-[70%]">
      <div className="w-8 h-8 rounded-full overflow-hidden bg-primary/10 flex items-center justify-center border border-primary/20 flex-shrink-0 shadow-sm">
        <span className="text-sm">🐻</span>
      </div>
      <div className="bg-white rounded-2xl rounded-tl-sm px-4 py-3 shadow-sm border border-gray-100 flex items-center gap-1.5 h-[44px]">
        {[0, 1, 2].map((i) => (
          <motion.div
            key={i}
            className="w-2 h-2 rounded-full bg-primary/50"
            animate={{ y: [0, -5, 0], scale: [1, 1.1, 1] }}
            transition={{ duration: 0.8, repeat: Infinity, delay: i * 0.15, ease: "easeInOut" }}
          />
        ))}
      </div>
    </div>
  );
}

function TopicSidebar({ onSelectAction }: { onSelectAction: (label: string) => void }) {
  return (
    <div className="hidden lg:flex flex-col w-[280px] bg-white rounded-2xl border border-gray-100 h-full mr-6 overflow-hidden shadow-sm" style={{ boxShadow: 'var(--shadow-card)' }}>
      <div className="p-5 border-b border-gray-50 flex items-center gap-2 bg-gradient-to-r from-primary/5 to-transparent">
        <LayoutGrid size={18} className="text-primary" />
        <h3 className="font-extrabold text-sm text-text-primary">Learning Topics</h3>
      </div>
      <div className="p-3">
        {quickActions.map((action) => {
          const Icon = action.icon;
          return (
            <button
              key={action.id}
              onClick={() => onSelectAction(action.label)}
              className="w-full flex items-center gap-3 p-3 rounded-xl hover:bg-gray-50 transition-colors cursor-pointer text-left group"
            >
              <div
                className="w-8 h-8 rounded-lg flex items-center justify-center transition-transform group-hover:scale-110"
                style={{ backgroundColor: `${action.color}15` }}
              >
                <Icon size={16} style={{ color: action.color }} />
              </div>
              <span className="text-[13px] font-bold text-text-secondary group-hover:text-text-primary transition-colors">
                {action.label}
              </span>
            </button>
          );
        })}
      </div>

      <div className="mt-2 flex-1 border-t border-gray-50 bg-gray-50/50">
        <div className="p-5 pb-2 flex items-center gap-2 text-text-muted">
          <Clock size={14} />
          <h4 className="font-bold text-[11px] uppercase tracking-wider">Recent Sessions</h4>
        </div>
        <div className="px-3 pb-4">
          {mockHistory.map(hist => (
            <button key={hist.id} className="w-full text-left p-2.5 rounded-lg hover:bg-white transition-colors cursor-pointer group">
              <p className="text-[13px] font-semibold text-text-primary truncate">{hist.title}</p>
              <p className="text-[10px] font-medium text-text-muted group-hover:text-primary transition-colors mt-0.5">{hist.time}</p>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

export default function ChatPage() {
  const [messages, setMessages] = useState<ChatMessage[]>(mockChatMessages);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  const handleSend = () => {
    if (!input.trim()) return;

    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      text: input,
      isAi: false,
      timestamp: new Date(),
    };
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsTyping(true);

    setTimeout(() => {
      const aiMessage: ChatMessage = {
        id: (Date.now() + 1).toString(),
        text: aiResponses[Math.floor(Math.random() * aiResponses.length)],
        isAi: true,
        timestamp: new Date(),
      };
      setMessages(prev => [...prev, aiMessage]);
      setIsTyping(false);
    }, 1500 + Math.random() * 1000);
  };

  const handleQuickAction = (label: string) => {
    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      text: `I want to: ${label}`,
      isAi: false,
      timestamp: new Date(),
    };
    setMessages(prev => [...prev, userMessage]);
    setIsTyping(true);

    setTimeout(() => {
      const responses: Record<string, string> = {
        'Practice Conversation': "Let's start a conversation practice! Imagine you're at a coffee shop. The barista asks: 'What can I get for you today?' How would you respond?",
        'Grammar Help': "I'd love to help with grammar! What topic would you like to focus on? We can cover:\n\n1. Tenses\n2. Articles (a/an/the)\n3. Prepositions\n4. Conditionals\n\nJust pick a number! 📝",
        'Vocabulary Quiz': "Let's do a vocabulary quiz! 🎯\n\nWhat does the word 'ubiquitous' mean?\n\nA) Very rare\nB) Found everywhere\nC) Extremely loud\nD) Moving quickly",
        'Daily Challenge': "Here's your daily challenge! 🌟\n\nWrite a short paragraph (3-4 sentences) about your morning routine using at least 3 time expressions (e.g., 'first', 'then', 'afterwards').",
      };
      const aiMessage: ChatMessage = {
        id: (Date.now() + 1).toString(),
        text: responses[label] || "Let me help you with that!",
        isAi: true,
        timestamp: new Date(),
      };
      setMessages(prev => [...prev, aiMessage]);
      setIsTyping(false);
    }, 1200);
  };

  return (
    <PageContainer>
      <div className="flex h-[calc(100vh-2rem)] md:h-[calc(100vh-4rem)] md:px-5 lg:px-8 pb-4">
        
        {/* Desktop Sidebar (Topics & History) */}
        <TopicSidebar onSelectAction={handleQuickAction} />

        {/* Main Chat Area Context (constrained width) */}
        <div className="flex-1 flex flex-col bg-white/50 backdrop-blur-xl md:rounded-3xl border-x md:border border-white/80 overflow-hidden relative shadow-sm" style={{ boxShadow: 'var(--shadow-card)' }}>
          
          {/* Header */}
          <div className="bg-white/80 backdrop-blur-md border-b border-gray-100 px-5 pt-12 md:pt-4 pb-4 z-10 sticky top-0">
            <div className="max-w-3xl mx-auto flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-11 h-11 rounded-full bg-primary/10 flex items-center justify-center border border-primary/20 shadow-sm relative">
                  <span className="text-2xl">🐻</span>
                  <div className="absolute bottom-0 right-0 w-3 h-3 bg-primary border-2 border-white rounded-full" />
                </div>
                <div>
                  <h1 className="font-extrabold text-base text-text-primary">Fluently Assistant</h1>
                  <div className="flex items-center gap-1.5 mt-0.5">
                    <span className="text-[11px] text-text-muted font-semibold">Trained on latest Cambridge English</span>
                  </div>
                </div>
              </div>
              <button className="hidden md:flex w-9 h-9 rounded-full bg-gray-50 items-center justify-center hover:bg-gray-100 transition-colors cursor-pointer border border-gray-100">
                <Settings size={16} className="text-text-secondary" />
              </button>
            </div>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto w-full custom-scroll">
            <div className="max-w-3xl mx-auto px-4 py-6 space-y-4">
              
              {/* Quick Actions (Mobile Only) */}
              <div className="lg:hidden mb-6">
                {messages.length <= 3 && (
                  <div className="grid grid-cols-2 gap-2">
                    {quickActions.map((action, i) => {
                      const Icon = action.icon;
                      return (
                        <motion.button
                          key={action.label}
                          className="flex items-center gap-2 bg-white rounded-xl p-3 text-left cursor-pointer border border-gray-50"
                          style={{ boxShadow: 'var(--shadow-card)' }}
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: 0.1 * i }}
                          whileTap={{ scale: 0.97 }}
                          onClick={() => handleQuickAction(action.label)}
                        >
                          <div
                            className="w-8 h-8 rounded-lg flex items-center justify-center"
                            style={{ backgroundColor: `${action.color}15` }}
                          >
                            <Icon size={16} style={{ color: action.color }} />
                          </div>
                          <span className="text-[11px] font-bold text-text-primary">{action.label}</span>
                        </motion.button>
                      );
                    })}
                  </div>
                )}
              </div>

              <div className="text-center py-4">
                <span className="text-[10px] font-bold text-text-muted bg-gray-100 px-3 py-1 rounded-full uppercase tracking-widest">Today</span>
              </div>

              <AnimatePresence>
                {messages.map((msg) => (
                  <motion.div
                    key={msg.id}
                    className={`flex ${msg.isAi ? 'justify-start' : 'justify-end'} gap-3 w-full`}
                    initial={{ opacity: 0, y: 10, scale: 0.98 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    transition={{ duration: 0.25 }}
                  >
                    {msg.isAi && (
                      <div className="w-8 h-8 rounded-full overflow-hidden bg-primary/10 flex items-center justify-center border border-primary/20 flex-shrink-0 shadow-sm mt-1">
                        <span className="text-sm">🐻</span>
                      </div>
                    )}
                    <div
                      className={`max-w-[85%] md:max-w-[70%] px-5 py-3.5 text-[14px] md:text-[15px] leading-relaxed whitespace-pre-line shadow-sm border ${
                        msg.isAi
                          ? 'bg-white text-text-primary rounded-2xl rounded-tl-sm border-gray-100/60'
                          : 'bg-primary text-white rounded-2xl rounded-tr-sm border-primary-dark/20'
                      }`}
                    >
                      {msg.text}
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>

              {isTyping && <TypingIndicator />}
              <div ref={messagesEndRef} className="h-4" />
            </div>
          </div>

          {/* Input Area */}
          <div className="bg-white/90 backdrop-blur-md border-t border-gray-100 p-4 shrink-0 px-4 pb-[max(1rem,calc(env(safe-area-inset-bottom)+5rem))] md:pb-6 relative z-10">
            <div className="max-w-3xl mx-auto flex items-end gap-2 relative">
              <div className="flex-1 flex items-center bg-gray-50/80 rounded-[28px] pl-5 pr-2 py-2 border border-gray-200/60 shadow-inner focus-within:ring-2 focus-within:ring-primary/20 focus-within:border-primary/40 transition-all">
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                  placeholder="Ask anything or practice here..."
                  className="flex-1 bg-transparent text-[15px] text-text-primary placeholder:text-text-muted outline-none min-h-[40px]"
                  id="chat-input"
                />
                <button className="text-text-secondary hover:text-primary transition-colors p-2 cursor-pointer rounded-full hover:bg-white shrink-0" id="chat-mic">
                  <Mic size={20} />
                </button>
              </div>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleSend}
                disabled={!input.trim() && !isTyping}
                className={`w-14 h-14 rounded-full flex items-center justify-center shrink-0 transition-colors shadow-lg ${
                  input.trim() 
                    ? 'bg-primary cursor-pointer shadow-primary/30' 
                    : 'bg-gray-200 text-gray-400 cursor-not-allowed shadow-transparent'
                }`}
                id="chat-send"
              >
                <Send size={20} className={input.trim() ? "text-white ml-1" : "text-gray-400 ml-1"} />
              </motion.button>
            </div>
            <div className="max-w-3xl mx-auto text-center mt-3">
              <p className="text-[10px] text-text-muted font-medium">Fluently AI can make mistakes. Consider verifying translation.</p>
            </div>
          </div>
        </div>

      </div>
    </PageContainer>
  );
}
