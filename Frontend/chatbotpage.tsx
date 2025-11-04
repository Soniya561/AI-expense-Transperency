import { useState, useRef, useEffect } from 'react';
import { Bot, Send, Sparkles, TrendingUp, AlertTriangle, FileText } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { ScrollArea } from './ui/scroll-area';
import { Badge } from './ui/badge';

interface Message {
  id: string;
  text: string;
  sender: 'user' | 'ai';
  timestamp: Date;
}

export function ChatbotPage() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: "Hello! I'm Smart Auditor AI, your intelligent expense assistant. I can help you with:\n\n• Analyzing expense patterns and trends\n• Explaining flagged transactions\n• Providing insights on spending optimization\n• Answering questions about your financial data\n• Recommending cost-saving opportunities\n\nHow can I assist you today?",
      sender: 'ai',
      timestamp: new Date(),
    }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const suggestedQuestions = [
    "Why was the Global Airlines transaction flagged?",
    "What are my top spending categories?",
    "How can I improve my expense integrity score?",
    "Explain the recent anomalies detected",
    "What cost-saving opportunities are available?",
  ];

  const handleSend = (text?: string) => {
    const messageText = text || inputValue;
    if (!messageText.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      text: messageText,
      sender: 'user',
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    setIsTyping(true);

    setTimeout(() => {
      const aiResponse: Message = {
        id: (Date.now() + 1).toString(),
        text: getAIResponse(messageText),
        sender: 'ai',
        timestamp: new Date(),
      };
      setMessages(prev => [...prev, aiResponse]);
      setIsTyping(false);
    }, 1500);
  };

  const getAIResponse = (question: string): string => {
    const lowerQuestion = question.toLowerCase();
    
    if (lowerQuestion.includes('global airlines') || lowerQuestion.includes('duplicate')) {
      return "The Global Airlines transaction for $8,900 was flagged as a potential duplicate. Here's what our AI detected:\n\n🔍 Analysis:\n• Two identical receipts submitted on November 3rd\n• Same amount ($8,900)\n• Same receipt number\n• Same vendor\n• 97% confidence level\n\n⚠️ This pattern suggests either:\n1. Accidental double submission\n2. Potential double-billing by vendor\n\nRecommendation: Contact Mike Chen to verify and request original documentation. If legitimate, one entry should be removed.";
    }
    
    if (lowerQuestion.includes('top spending') || lowerQuestion.includes('categories')) {
      return "Based on current data, your top 3 spending categories this month are:\n\n1. 🧳 Travel: $15,200 (38% of total)\n   • 23% increase from last month\n   • Aligns with Q4 conference season\n\n2. 💻 IT: $8,900 (22% of total)\n   • Consistent with budget\n   • New project tools purchased\n\n3. 📦 Miscellaneous: $6,700 (17% of total)\n   • Includes conference fees\n\nYou're spending 38% on travel. Consider using company-preferred vendors for better rates!";
    }
    
    if (lowerQuestion.includes('integrity score') || lowerQuestion.includes('improve')) {
      return "Your current Expense Integrity Score is 87/100. Here's the breakdown:\n\n📊 Score Components:\n• Documentation Completeness: 90%\n• Anomaly Rate: 82%\n• Vendor Verification: 88%\n• Policy Compliance: 89%\n\n💡 Improvement Recommendations:\n1. Upload receipts within 48 hours (currently 72h avg)\n2. Ensure all receipts have clear vendor information\n3. Use approved vendor list to reduce verification time\n4. Review and resolve the 4 flagged transactions\n\nImplementing these could boost your score to 92-94!";
    }
    
    if (lowerQuestion.includes('anomal') || lowerQuestion.includes('flagged') || lowerQuestion.includes('suspicious')) {
      return "Currently, there are 6 flagged anomalies detected by our AI:\n\n⚠️ High Severity (2):\n• Global Airlines - Duplicate receipt ($8,900)\n• Cash Payment - Missing receipt documentation ($1,200)\n\n⚡ Medium Severity (2):\n• ABC Taxi - Excessive amount, 340% above average ($2,500)\n• Restaurant XYZ - Date mismatch on receipt ($950)\n\n✓ Low Severity (2):\n• Unknown Store XYZ - New vendor, no history ($780)\n• Hotel Chain - Unusual pattern detected ($450)\n\nAll have been assigned to admins for review. Average resolution time: 2.3 days.";
    }
    
    if (lowerQuestion.includes('cost-saving') || lowerQuestion.includes('save money') || lowerQuestion.includes('opportunities')) {
      return "I've identified several cost-saving opportunities:\n\n💰 Potential Monthly Savings: $1,770\n\n1. Office Supplies ($420/mo)\n   → Switch to bulk ordering from approved vendors\n\n2. Travel Bookings ($850/mo)\n   → Book flights 2+ weeks in advance for 25% savings\n\n3. IT Subscriptions ($320/mo)\n   → Annual plans vs monthly (save 18%)\n\n4. Catering Services ($180/mo)\n   → Join preferred vendor program\n\nImplementing all recommendations: $21,240 annual savings! 🎉";
    }
    
    if (lowerQuestion.includes('help') || lowerQuestion.includes('what can you')) {
      return "I can assist you with:\n\n📊 Expense Analysis:\n• View spending patterns by category\n• Identify unusual transactions\n• Compare with historical data\n\n🔍 Fraud Detection:\n• Explain why transactions were flagged\n• Provide AI confidence scores\n• Suggest resolution actions\n\n💡 Optimization:\n• Recommend cost-saving opportunities\n• Identify compliance issues\n• Suggest workflow improvements\n\n📈 Reporting:\n• Generate custom insights\n• Explain metrics and scores\n• Track trends over time\n\nJust ask me anything about your expenses!";
    }
    
    if (lowerQuestion.includes('thank') || lowerQuestion.includes('thanks')) {
      return "You're welcome! I'm always here to help you manage your expenses more efficiently. Feel free to ask me anything anytime! 😊\n\nIs there anything else you'd like to know?";
    }
    
    return "I understand you're asking about: \"" + question + "\"\n\nI can provide detailed information about:\n• Specific transactions and why they were flagged\n• Spending patterns and trends\n• Cost-saving recommendations\n• Compliance and policy questions\n• Anomaly detection explanations\n\nCould you be more specific about what you'd like to know? Or try one of the suggested questions below!";
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl text-black flex items-center gap-2">
          <Bot className="w-7 h-7 text-blue-400" />
          Smart Auditor AI Assistant
        </h2>
        <p className="text-sm text-black/60 mt-1">Ask questions about your expenses and get AI-powered insights</p>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        {/* Chat Interface */}
        <Card className="lg:col-span-2 bg-white border-blue-500/30">
          <CardHeader className="bg-gradient-to-r from-blue-500/20 to-cyan-400/20 border-b border-blue-500/30">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-cyan-400 flex items-center justify-center">
                <Bot className="w-6 h-6 text-black" />
              </div>
              <div>
                <CardTitle className="text-black">Smart Auditor AI</CardTitle>
                <p className="text-xs text-blue-500 mt-1">Always online and ready to help</p>
              </div>
              <Badge className="ml-auto bg-green-500/20 text-green-500 border-green-500/30">
                <div className="w-2 h-2 rounded-full bg-green-500 mr-2 animate-pulse"></div>
                Online
              </Badge>
            </div>
          </CardHeader>

          <CardContent className="p-0">
            <ScrollArea className="h-[500px] p-6" ref={scrollRef}>
              <div className="space-y-4">
                {messages.map((message) => (
                  <div
                    key={message.id}
                    className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                  >
                    <div
                      className={`max-w-[80%] rounded-lg p-4 ${
                        message.sender === 'user'
                          ? 'bg-gradient-to-br from-blue-500 to-cyan-400 text-black'
                          : 'bg-gray-100 text-black border border-blue-500/30'
                      }`}
                    >
                      <p className="text-sm whitespace-pre-wrap">{message.text}</p>
                      <p className="text-xs opacity-60 mt-2">
                        {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                      </p>
                    </div>
                  </div>
                ))}
                
                {isTyping && (
                  <div className="flex justify-start">
                    <div className="bg-gray-100 text-black border border-blue-500/30 rounded-lg p-4">
                      <div className="flex gap-1">
                        <div className="w-2 h-2 bg-blue-400 rounded-full animate-bounce"></div>
                        <div className="w-2 h-2 bg-blue-400 rounded-full animate-bounce delay-100"></div>
                        <div className="w-2 h-2 bg-blue-400 rounded-full animate-bounce delay-200"></div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </ScrollArea>

            <div className="p-4 border-t border-blue-500/30">
              <div className="flex gap-2">
                <Input
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                  placeholder="Ask me anything about your expenses..."
                  className="bg-white border-blue-500/30 text-black placeholder:text-black/40"
                />
                <Button 
                  onClick={() => handleSend()}
                  className="bg-gradient-to-br from-blue-500 to-cyan-400 hover:from-blue-600 hover:to-cyan-500 text-black"
                >
                  <Send className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Suggested Questions & Info */}
        <div className="space-y-6">
          <Card className="bg-white border-blue-500/30">
            <CardHeader>
              <CardTitle className="text-black text-sm flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-cyan-500" />
                Suggested Questions
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                {suggestedQuestions.map((question, index) => (
                  <button
                    key={index}
                    onClick={() => handleSend(question)}
                    className="w-full text-left p-3 rounded-lg bg-gray-50 border border-blue-500/20 hover:border-blue-400 hover:bg-gray-100 transition-all text-sm text-black hover:text-black"
                  >
                    {question}
                  </button>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white border-blue-500/30">
            <CardHeader>
              <CardTitle className="text-black text-sm">AI Capabilities</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex items-start gap-2">
                  <TrendingUp className="w-4 h-4 text-blue-500 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="text-sm text-black">Trend Analysis</p>
                    <p className="text-xs text-black/60">Identify spending patterns</p>
                  </div>
                </div>
                <div className="flex items-start gap-2">
                  <AlertTriangle className="w-4 h-4 text-yellow-500 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="text-sm text-black">Anomaly Detection</p>
                    <p className="text-xs text-black/60">Explain flagged transactions</p>
                  </div>
                </div>
                <div className="flex items-start gap-2">
                  <FileText className="w-4 h-4 text-green-500 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="text-sm text-black">Report Generation</p>
                    <p className="text-xs text-black/60">Custom insights on demand</p>
                  </div>
                </div>
                <div className="flex items-start gap-2">
                  <Sparkles className="w-4 h-4 text-cyan-500 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="text-sm text-black">Smart Recommendations</p>
                    <p className="text-xs text-black/60">Cost-saving opportunities</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white border-blue-500/30">
            <CardHeader>
              <CardTitle className="text-black text-sm">Quick Stats</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-black/60">Response Time</span>
                  <span className="text-sm text-black">&lt; 2 sec</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-black/60">Accuracy Rate</span>
                  <span className="text-sm text-green-500">94.8%</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-black/60">Questions Answered</span>
                  <span className="text-sm text-black">1,247</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
