import React, { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Bot, User } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../i18n/LanguageContext';

interface ChatMessage {
  id: string;
  type: 'user' | 'ai';
  content: string;
  timestamp: number;
}

export interface ChatScenario {
  userMessage: string;
  aiResponse: string;
}

// Constants
const SCENARIO_INTERVAL = 12000; // 12 seconds
const SCROLL_RESET_TIMEOUT = 3000; // 3 seconds
const TYPING_SPEED_BASE = 20;
const TYPING_SPEED_VARIANCE = 30;

interface ChatSimulationProps {
  scenarios?: readonly ChatScenario[];
  footerLink?: string;
  footerText?: string;
}

export const ChatSimulation: React.FC<ChatSimulationProps> = ({
  scenarios,
  footerLink = '/download',
  footerText,
}) => {
  const { t } = useLanguage();

  const defaultScenarios: readonly ChatScenario[] = [
    {
      userMessage: t('chat.default.0.user'),
      aiResponse: t('chat.default.0.ai'),
    },
    {
      userMessage: t('chat.default.1.user'),
      aiResponse: t('chat.default.1.ai'),
    },
    {
      userMessage: t('chat.default.2.user'),
      aiResponse: t('chat.default.2.ai'),
    },
    {
      userMessage: t('chat.default.3.user'),
      aiResponse: t('chat.default.3.ai'),
    },
  ];

  const resolvedFooterText = footerText ?? t('chat.footer.default');
  const activeScenarios = scenarios ?? defaultScenarios;

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
      const scenario = activeScenarios[currentScenario];

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
      setCurrentScenario(prev => (prev + 1) % activeScenarios.length);
    }, SCENARIO_INTERVAL);

    return () => {
      clearInterval(interval);
      if (scrollTimeoutRef.current) {
        clearTimeout(scrollTimeoutRef.current);
      }
    };
  }, []);

  return (
    <div className="w-full max-w-2xl mx-auto h-[340px] lg:h-[420px] flex flex-col bg-gradient-to-b from-[#0a1f1a]/50 via-[#082018]/50 to-[#051510]/50 backdrop-blur-2xl rounded-3xl border border-emerald-500/60 overflow-clip shadow-[0_0_100px_rgba(16,185,129,0.5),0_0_50px_rgba(16,185,129,0.3),0_0_25px_rgba(16,185,129,0.2),inset_0_1px_1px_rgba(16,185,129,0.1)]">
      {/* Chat Header */}
      <div className="px-6 py-4 bg-gradient-to-r from-emerald-950/50 via-emerald-900/30 to-emerald-950/50 border-b border-emerald-500/40 flex items-center justify-between backdrop-blur-sm">
        <div className="flex items-center space-x-3">
          <div className="w-2.5 h-2.5 bg-emerald-400 rounded-full animate-pulse shadow-[0_0_20px_rgba(52,211,153,1),0_0_10px_rgba(52,211,153,0.8)]"></div>
          <span className="text-white font-bold text-base tracking-wide">{t('chat.header')}</span>
        </div>
        <span className="text-xs text-emerald-200/80 bg-emerald-800/30 px-3 py-1.5 rounded-full border border-emerald-500/40 shadow-sm">{t('chat.simulated')}</span>
      </div>

      {/* Chat Messages */}
      <div
        ref={chatContainerRef}
        onScroll={handleScroll}
        className="flex-1 min-h-0 p-6 overflow-y-auto scrollbar-hide space-y-4 bg-[#051510]/40"
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
              <div className={`flex items-start space-x-3 max-w-[85%] ${message.type === 'user' ? 'flex-row-reverse space-x-reverse' : ''}`}>
                <div className={`w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 ${
                  message.type === 'user'
                    ? 'bg-gradient-to-br from-emerald-400 to-emerald-600 shadow-[0_0_20px_rgba(16,185,129,0.5)]'
                    : 'bg-gradient-to-br from-emerald-900/80 to-emerald-950/80 border border-emerald-600/40'
                }`}>
                  {message.type === 'user' ? (
                    <User className="w-5 h-5 text-white" />
                  ) : (
                    <Bot className="w-5 h-5 text-emerald-300" />
                  )}
                </div>
                <div className={`rounded-2xl px-5 py-3 ${
                  message.type === 'user'
                    ? 'bg-gradient-to-br from-emerald-500 to-emerald-600 text-white shadow-[0_4px_20px_rgba(16,185,129,0.3)]'
                    : 'bg-[#0a1612]/90 text-gray-100 border border-emerald-700/30 backdrop-blur-sm'
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
              <div className="flex items-start space-x-3 max-w-[85%]">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-emerald-900/80 to-emerald-950/80 border border-emerald-600/40 flex items-center justify-center flex-shrink-0">
                  <Bot className="w-5 h-5 text-emerald-300" />
                </div>
                <div className="bg-[#0a1612]/90 text-gray-100 border border-emerald-700/30 backdrop-blur-sm rounded-2xl px-5 py-3">
                  <p className="text-sm leading-relaxed">
                    {streamingText}
                    <span className="inline-block w-1.5 h-4 bg-emerald-400 ml-1 animate-pulse rounded-sm shadow-[0_0_8px_rgba(52,211,153,0.8)]"></span>
                  </p>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <div className="px-6 py-4 bg-gradient-to-r from-emerald-950/50 via-emerald-900/30 to-emerald-950/50 border-t border-emerald-500/40 backdrop-blur-sm">
        <div className="flex items-center space-x-3">
          <div className="relative flex-1">
            <div className="bg-[#0a0a0a]/80 border border-emerald-700/30 rounded-2xl px-5 py-3 text-gray-600 text-sm backdrop-blur-sm shadow-inner cursor-not-allowed select-none opacity-60 italic">
              {resolvedFooterText}
            </div>
            <span className="absolute right-3 top-1/2 -translate-y-1/2 text-[10px] text-gray-600 font-medium tracking-wide uppercase">demo</span>
          </div>
          <Link
            to={footerLink}
            className="w-11 h-11 bg-gradient-to-br from-emerald-400 to-emerald-600 hover:from-emerald-300 hover:to-emerald-500 rounded-full flex items-center justify-center transition-all duration-300 shadow-[0_0_30px_rgba(16,185,129,0.6),0_0_15px_rgba(16,185,129,0.4)] hover:shadow-[0_0_40px_rgba(16,185,129,0.8),0_0_20px_rgba(16,185,129,0.6)] flex-shrink-0 hover:scale-105"
          >
            <svg
              className="w-5 h-5 text-white"
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
  );
};
