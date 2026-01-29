import { useState } from 'react';
import { X, Send } from 'lucide-react';
import PartialsOverlay from '../imports/PartialsOverlay';

interface AIAdvisorProps {
  onClose: () => void;
}

interface Message {
  id: string;
  text: string;
  sender: 'user' | 'ai';
  timestamp: Date;
}

export default function AIAdvisor({ onClose }: AIAdvisorProps) {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: "Hi! I'm your AI Course Advisor powered by Gemini. I can help you with course selection, scheduling conflicts, and answering questions about courses. How can I assist you today?",
      sender: 'ai',
      timestamp: new Date(),
    },
  ]);
  const [inputText, setInputText] = useState('');

  const handleSend = () => {
    if (!inputText.trim()) return;

    const newUserMessage: Message = {
      id: Date.now().toString(),
      text: inputText,
      sender: 'user',
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, newUserMessage]);
    setInputText('');

    // Simulate AI response
    setTimeout(() => {
      const aiResponse: Message = {
        id: (Date.now() + 1).toString(),
        text: getAIResponse(inputText),
        sender: 'ai',
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, aiResponse]);
    }, 1000);
  };

  const getAIResponse = (userInput: string): string => {
    const input = userInput.toLowerCase();
    
    if (input.includes('schedule') || input.includes('conflict')) {
      return "I can help you with scheduling! Based on your enrolled courses, I noticed STAT 4300-001 overlaps with MATH 3610-001. Would you like me to suggest alternative sections or times?";
    }
    
    if (input.includes('stat 1010') || input.includes('business stats')) {
      return "STAT 1010 is an introductory business statistics course. The current offering shows a difficulty rating of 3.2 and quality rating of 2.7. Section 001 taught by Susanna Lange, PhD meets TR 10:15-11:44 AM. Would you like more details about the professor or course content?";
    }
    
    if (input.includes('difficulty') || input.includes('hard')) {
      return "Based on historical data, STAT 4330 has the highest difficulty rating at 4.5, followed by STAT 4300 at 4.1. If you're looking for more manageable courses, STAT 4770 has a difficulty of 2.2 and STAT 1010 has a difficulty of 3.2.";
    }
    
    if (input.includes('recommend') || input.includes('suggest')) {
      return "Based on your interests, I'd recommend considering STAT 4710: Modern Data Mining (difficulty 3.7) or STAT 4770: Intro to Python (difficulty 2.2) if you're interested in practical data skills. Both have good quality ratings and strong career relevance.";
    }
    
    return "That's a great question! I can help you explore course options, check for scheduling conflicts, compare difficulty ratings, and provide insights about professors. What specific aspect would you like to know more about?";
  };

  return (
    <>
      <div className="fixed inset-0 z-40">
        <PartialsOverlay />
      </div>
      
      <div className="fixed inset-0 z-50 flex items-end justify-center max-w-[414px] mx-auto">
        <div className="bg-white rounded-t-[30px] w-full h-[85vh] flex flex-col shadow-2xl animate-slideUp">
          {/* Header */}
          <div className="bg-[#8E97FD] rounded-t-[30px] px-6 py-4 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="bg-white rounded-full p-2">
                <svg className="size-6" fill="none" viewBox="0 0 24 24">
                  <path 
                    fill="#8E97FD" 
                    d="M12 2L2 7v10c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V7l-10-5zm0 18c-3.31 0-6-2.69-6-6s2.69-6 6-6 6 2.69 6 6-2.69 6-6 6z"
                  />
                </svg>
              </div>
              <div>
                <h2 className="font-['League_Spartan:SemiBold',sans-serif] font-semibold text-white text-lg">
                  AI Course Advisor
                </h2>
                <p className="font-['League_Spartan:Regular',sans-serif] text-[#CAD6FF] text-xs">
                  Powered by Gemini
                </p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="text-white hover:bg-white/20 rounded-full p-2 transition-colors"
            >
              <X className="size-6" />
            </button>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-6 space-y-4">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-[75%] rounded-2xl px-4 py-3 ${
                    message.sender === 'user'
                      ? 'bg-[#2260FF] text-white'
                      : 'bg-[#CAD6FF] text-black'
                  }`}
                >
                  <p className="font-['League_Spartan:Regular',sans-serif] text-sm leading-relaxed">
                    {message.text}
                  </p>
                  <p
                    className={`text-xs mt-1 ${
                      message.sender === 'user' ? 'text-white/70' : 'text-black/50'
                    }`}
                  >
                    {message.timestamp.toLocaleTimeString([], {
                      hour: '2-digit',
                      minute: '2-digit',
                    })}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Suggested Questions */}
          <div className="px-6 pb-3">
            <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
              <button
                onClick={() => setInputText("What are the easiest STAT courses?")}
                className="whitespace-nowrap bg-[#CAD6FF] text-[#2260FF] px-4 py-2 rounded-full text-sm font-['League_Spartan:Regular',sans-serif] hover:bg-[#2260FF] hover:text-white transition-colors"
              >
                Easiest courses?
              </button>
              <button
                onClick={() => setInputText("Check my schedule for conflicts")}
                className="whitespace-nowrap bg-[#CAD6FF] text-[#2260FF] px-4 py-2 rounded-full text-sm font-['League_Spartan:Regular',sans-serif] hover:bg-[#2260FF] hover:text-white transition-colors"
              >
                Schedule conflicts?
              </button>
              <button
                onClick={() => setInputText("Tell me about STAT 1010")}
                className="whitespace-nowrap bg-[#CAD6FF] text-[#2260FF] px-4 py-2 rounded-full text-sm font-['League_Spartan:Regular',sans-serif] hover:bg-[#2260FF] hover:text-white transition-colors"
              >
                About STAT 1010?
              </button>
            </div>
          </div>

          {/* Input */}
          <div className="p-6 pt-0">
            <div className="bg-[#F5F5F5] rounded-full flex items-center gap-2 px-4 py-3 border-2 border-[#CAD6FF] focus-within:border-[#8E97FD] transition-colors">
              <input
                type="text"
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSend()}
                placeholder="Ask me anything about courses..."
                className="flex-1 bg-transparent outline-none font-['League_Spartan:Regular',sans-serif] text-sm placeholder:text-[#A0A3B1]"
              />
              <button
                onClick={handleSend}
                disabled={!inputText.trim()}
                className="bg-[#8E97FD] text-white rounded-full p-2 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-[#2260FF] transition-colors"
              >
                <Send className="size-5" />
              </button>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes slideUp {
          from {
            transform: translateY(100%);
          }
          to {
            transform: translateY(0);
          }
        }
        .animate-slideUp {
          animation: slideUp 0.3s ease-out;
        }
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
    </>
  );
}
