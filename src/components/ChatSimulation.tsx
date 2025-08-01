import React, { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Bot, User } from 'lucide-react';
import { Link } from 'react-router-dom';

interface ChatMessage {
  id: string;
  type: 'user' | 'ai';
  content: string;
  timestamp: number;
}

interface ChatScenario {
  userMessage: string;
  aiResponse: string;
}

const CHAT_SCENARIOS: readonly ChatScenario[] = [
  {
    userMessage: "Help me train a model on my customer support emails",
    aiResponse: "I'll help you create a custom support AI! First, let me analyze your email data and clean it automatically. Then we'll fine-tune a model that understands your company's support style and common issues."
  },
  {
    userMessage: "Can you analyze my sales call transcripts?",
    aiResponse: "Absolutely! I'll process your transcripts, extract key insights, and train a model that can identify successful sales patterns, common objections, and closing techniques specific to your business."
  },
  {
    userMessage: "I want to create a coding assistant for my team",
    aiResponse: "Perfect! Upload your codebase and documentation. I'll train a specialized AI that understands your coding patterns, architecture, and can help your team write code that follows your specific conventions and best practices."
  },
  {
    userMessage: "Train an AI on my company's knowledge base",
    aiResponse: "Great idea! I'll ingest your knowledge base, create embeddings, and fine-tune a model that can answer questions about your company's processes, policies, and procedures with accuracy and context."
  }
] as const;

// Constants
const SCENARIO_INTERVAL = 12000; // 12 seconds
const SCROLL_RESET_TIMEOUT = 3000; // 3 seconds
const TYPING_SPEED_BASE = 20;
const TYPING_SPEED_VARIANCE = 30;

export const ChatSimulation: React.FC = () => {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [currentScenario, setCurrentScenario] = useState(0);
  const [isTyping, setIsTyping] = useState(false);
  const [streamingText, setStreamingText] = useState('');
  const [hasStarted, setHasStarted] = useState(false);
  const [userHasScrolled, setUserHasScrolled] = useState(false);
  
  const chatContainerRef = useRef<HTMLDivElement>(null);
  const scrollTimeoutRef = useRef<number | null>(null);
  const isRunningScenarioRef = useRef(false);

  const addMessage = useCallback((type: 'user' | 'ai', content: string) => {
    const newMessage: ChatMessage = {
      id: `${Date.now()}-${Math.random()}`,
      type,
      content,
      timestamp: Date.now()
    };
    setMessages(prev => [...prev, newMessage]);
  }, []);

  const scrollToBottom = useCallback(() => {
    if (chatContainerRef.current && !userHasScrolled) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  }, [userHasScrolled]);

  const handleScroll = useCallback(() => {
    if (!chatContainerRef.current) return;
    
    const { scrollTop, scrollHeight, clientHeight } = chatContainerRef.current;
    const isAtBottom = Math.abs(scrollHeight - clientHeight - scrollTop) < 10;
    
    if (!isAtBottom) {
      setUserHasScrolled(true);
      
      if (scrollTimeoutRef.current) {
        clearTimeout(scrollTimeoutRef.current);
      }
      
      scrollTimeoutRef.current = window.setTimeout(() => {
        setUserHasScrolled(false);
      }, SCROLL_RESET_TIMEOUT);
    } else {
      setUserHasScrolled(false);
      if (scrollTimeoutRef.current) {
        clearTimeout(scrollTimeoutRef.current);
        scrollTimeoutRef.current = null;
      }
    }
  }, []);

  const simulateTyping = useCallback(async (text: string) => {
    setIsTyping(true);
    setStreamingText('');
    
    for (let i = 0; i <= text.length; i++) {
      await new Promise(resolve => 
        setTimeout(resolve, TYPING_SPEED_BASE + Math.random() * TYPING_SPEED_VARIANCE)
      );
      setStreamingText(text.slice(0, i));
    }
    
    setIsTyping(false);
    addMessage('ai', text);
    setStreamingText('');
  }, [addMessage]);

  // Auto-scroll effect
  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping, streamingText, scrollToBottom]);

  // Scenario execution effect
  useEffect(() => {
    const runScenario = async () => {
      if (isRunningScenarioRef.current) return;
      
      isRunningScenarioRef.current = true;
      const scenario = CHAT_SCENARIOS[currentScenario];
      
      if (currentScenario === 0 && !hasStarted) {
        setMessages([]);
        setHasStarted(true);
      }
      
      await new Promise(resolve => setTimeout(resolve, 500));
      addMessage('user', scenario.userMessage);
      
      await new Promise(resolve => setTimeout(resolve, 1500));
      await simulateTyping(scenario.aiResponse);
      
      await new Promise(resolve => setTimeout(resolve, 2000));
      isRunningScenarioRef.current = false;
    };

    runScenario();
  }, [currentScenario, addMessage, simulateTyping, hasStarted]);

  // Scenario cycling effect
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentScenario(prev => (prev + 1) % CHAT_SCENARIOS.length);
    }, SCENARIO_INTERVAL);

    return () => {
      clearInterval(interval);
      if (scrollTimeoutRef.current) {
        clearTimeout(scrollTimeoutRef.current);
      }
    };
  }, []);

  return (
    <div className="w-full max-w-md mx-auto h-[400px] bg-[#1a1a1a]/90 backdrop-blur-xl rounded-2xl border border-gray-800 overflow-hidden flex flex-col">
      {/* Chat Header */}
      <div className="px-4 py-3 bg-[#272727]/50 border-b border-gray-800 flex items-center space-x-3">
        <div className="w-3 h-3 bg-emerald-400 rounded-full animate-pulse"></div>
        <span className="text-white font-medium">Erudi AI Assistant</span>
      </div>

      {/* Chat Messages */}
      <div 
        ref={chatContainerRef} 
        onScroll={handleScroll}
        className="flex-1 p-4 overflow-y-auto space-y-4"
      >
        <AnimatePresence mode="popLayout">
          {messages.map((message) => (
            <motion.div
              key={message.id}
              initial={{ opacity: 0, y: 20, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -20, scale: 0.95 }}
              transition={{ duration: 0.3 }}
              className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div className={`flex items-start space-x-2 max-w-[80%] ${message.type === 'user' ? 'flex-row-reverse space-x-reverse' : ''}`}>
                <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
                  message.type === 'user' 
                    ? 'bg-emerald-600' 
                    : 'bg-gray-700'
                }`}>
                  {message.type === 'user' ? (
                    <User className="w-4 h-4 text-white" />
                  ) : (
                    <Bot className="w-4 h-4 text-emerald-400" />
                  )}
                </div>
                <div className={`rounded-2xl px-4 py-2 ${
                  message.type === 'user'
                    ? 'bg-emerald-600 text-white'
                    : 'bg-[#272727]/80 text-gray-100'
                }`}>
                  <p className="text-sm leading-relaxed">{message.content}</p>
                </div>
              </div>
            </motion.div>
          ))}

          {/* Typing Indicator */}
          {isTyping && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex justify-start"
            >
              <div className="flex items-start space-x-2 max-w-[80%]">
                <div className="w-8 h-8 rounded-full bg-gray-700 flex items-center justify-center flex-shrink-0">
                  <Bot className="w-4 h-4 text-emerald-400" />
                </div>
                <div className="bg-[#272727]/80 text-gray-100 rounded-2xl px-4 py-2">
                  <p className="text-sm leading-relaxed">
                    {streamingText}
                    <span className="inline-block w-2 h-4 bg-emerald-400 ml-1 animate-pulse"></span>
                  </p>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <div className="px-4 py-3 bg-[#272727]/30 border-t border-gray-800">
        <div className="flex items-center space-x-2">
          <div className="flex-1 bg-[#1a1a1a]/50 rounded-full px-4 py-2 text-gray-500 text-sm">
            Try Erudi to experience this AI interaction...
          </div>
          <div className="w-8 h-8 bg-emerald-600 rounded-full flex items-center justify-center">
            <Link 
                  to="/Erudi/waitlist"
                >
                <svg 
                    className="w-4 h-4 text-white" 
                    fill="currentColor" 
                    viewBox="0 0 20 20" 
                    style={{ transform: 'rotate(90deg)' }}
                >
                    <path d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z" />
                </svg>
                </Link>
          </div>
        </div>
      </div>
    </div>
  );
};
