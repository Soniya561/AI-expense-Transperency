import { useState } from 'react';
import { Bot, X, Send } from 'lucide-react';
import { Button } from './ui/button';
import { Card } from './ui/card';
import { Input } from './ui/input';
import { ScrollArea } from './ui/scroll-area';

export function AIAssistant() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      id: '1',
      text: "Hello! I'm Smart Auditor AI. I can help explain suspicious expenses, analyze spending patterns, and provide insights on your financial data. How can I assist you today?",
      sender: 'ai',
      timestamp: new Date(),
    }
  ]);
  const [inputValue, setInputValue] = useState('');

  const handleSend = () => {
    if (!inputValue.trim()) return;

    const userMessage = {
      id: Date.now().toString(),
      text: inputValue,
      sender: 'user',
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, userMessage]);
    setInputValue('');

    // Simulate AI response
    setTimeout(() => {
      const aiResponse = {
        id: (Date.now() + 1).toString(),
        text: getAIResponse(inputValue),
        sender: 'ai',
        timestamp: new Date(),
      };
      setMessages(prev => [...prev, aiResponse]);
    }, 1000);
  };

  const getAIResponse = (question) => {
    const lowerQuestion = question.toLowerCase();
    
    if (lowerQuestion.includes('duplicate') || lowerQuestion.includes('global airlines')) {
      return "The Global Airlines transaction was flagged because our AI detected two identical bookings on the same day for $8,900 each. This pattern suggests a potential duplicate entry or double-billing. I recommend verifying with the employee and vendor.";
    }
    
    if (lowerQuestion.includes('taxi') || lowerQuestion.includes('excessive')) {
      return "The ABC Taxi Service expense of $2,500 exceeded the typical range for taxi services by 340%. Our AI model flagged this as it's 3.4 standard deviations above the mean for this category. This could be a legitimate long-distance trip or a data entry error.";
    }
    
    if (lowerQuestion.includes('fraud') || lowerQuestion.includes('anomaly')) {
      return "Currently, we have 4 flagged anomalies: 2 high-severity (duplicate transaction and missing receipt), 1 medium-severity (excessive amount), and 1 low-severity (unusual vendor). Our AI uses pattern recognition and historical data to detect these irregularities.";
    }
    
    if (lowerQuestion.includes('score') || lowerQuestion.includes('integrity')) {
      return "Your current Expense Integrity Score is 87/100. This is calculated based on documentation completeness (90%), anomaly rate (82%), vendor verification (88%), and policy compliance (89%). To improve, focus on reducing flagged transactions and ensuring all receipts are uploaded.";
    }
    
    return "I can help you understand flagged expenses, analyze spending patterns, explain the integrity score, or provide insights on any specific transaction. What would you like to know more about?";
  };

  if (!isOpen) {
    return (
      <Button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 w-14 h-14 rounded-full bg-gradient-to-br from-blue-500 to-cyan-400 hover:from-blue-600 hover:to-cyan-500 shadow-lg shadow-blue-500/50 text-black z-50"
      >
        <Bot className="h-6 w-6" />
      </Button>
    );
  }

  return (
    <Card className="fixed bottom-6 right-6 w-96 h-[500px] bg-card border-blue-500/30 shadow-2xl shadow-blue-500/20 z-50 flex flex-col">
      <div className="flex items-center justify-between p-4 border-b border-blue-500/30 bg-gradient-to-r from-blue-500/20 to-cyan-400/20">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-500 to-cyan-400 flex items-center justify-center">
            <Bot className="h-5 w-5 text-black" />
          </div>
          <div>
            <h3 className="text-foreground">Smart Auditor AI</h3>
            <p className="text-xs text-blue-400">Always here to help</p>
          </div>
        </div>
        <Button 
          variant="ghost" 
          size="icon"
          onClick={() => setIsOpen(false)}
          className="text-muted-foreground hover:text-foreground hover:bg-blue-500/10"
        >
          <X className="h-4 w-4" />
        </Button>
      </div>

      <ScrollArea className="flex-1 p-4">
        <div className="space-y-4">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div
                className={`max-w-[80%] rounded-lg p-3 ${
                  message.sender === 'user'
                    ? 'bg-gradient-to-br from-blue-500 to-cyan-400 text-black'
                    : 'bg-muted text-foreground border border-blue-500/30'
                }`}
              >
                <p className="text-sm">{message.text}</p>
              </div>
            </div>
          ))}
        </div>
      </ScrollArea>

      <div className="p-4 border-t border-blue-500/30">
        <div className="flex gap-2">
          <Input
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSend()}
            placeholder="Ask about expenses..."
            className="bg-input-background border-blue-500/30 text-foreground placeholder:text-muted-foreground"
          />
          <Button 
            onClick={handleSend}
            size="icon"
            className="bg-gradient-to-br from-blue-500 to-cyan-400 hover:from-blue-600 hover:to-cyan-500 text-black"
          >
            <Send className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </Card>
  );
}

