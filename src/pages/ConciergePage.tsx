import React, { useState, useEffect } from 'react';
import { Send, MapPin, Calendar, DollarSign, Users, Clock, Star } from 'lucide-react';
import { useSelector } from 'react-redux';
import { RootState } from '../store';

interface ChatMessage {
  id: string;
  type: 'ai' | 'user';
  content: string;
  timestamp: string;
}

// IMPORTANT: For production, proxy this request through your own backend to keep your OpenAI API key secure!

async function getAIResponse(message: string): Promise<string> {
  try {
    const response = await fetch('http://localhost:3001/api/ai', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ message }),
    });
    const data = await response.json();
    if (data.choices && data.choices[0]?.message?.content) {
      return data.choices[0].message.content;
    }
    if (data.error) {
      return `OpenAI Error: ${data.error}`;
    }
    return 'Sorry, I could not generate a response.';
  } catch (err) {
    return 'Sorry, there was an error contacting the AI service.';
  }
}

const ConciergePage: React.FC = () => {
  const currentLocation = useSelector((state: RootState) => state.location.currentLocation);
  const [message, setMessage] = useState('');
  const [chatHistory, setChatHistory] = useState<ChatMessage[]>([
    {
      id: '1',
      type: 'ai',
      content: `Hi! I'm your NomadPal AI concierge. I can help you plan your trip in ${currentLocation}, find local guides, book transportation, and answer any travel questions. What would you like to know?`,
      timestamp: new Date().toISOString()
    }
  ]);
  const [isTyping, setIsTyping] = useState(false);
  const [data, setData] = useState<any>(null);
  const [dataLoading, setDataLoading] = useState(true);
  const [dataError, setDataError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      setDataLoading(true);
      setDataError(null);
      try {
        const response = await fetch(process.env.PUBLIC_URL + '/data/data.json');
        const json = await response.json();
        setData(json);
      } catch (err) {
        setDataError('Failed to load data.');
      } finally {
        setDataLoading(false);
      }
    };
    fetchData();
  }, []);

  const handleSendMessage = async () => {
    if (!message.trim()) return;

    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      type: 'user',
      content: message,
      timestamp: new Date().toISOString()
    };

    setChatHistory(prev => [...prev, userMessage]);
    setMessage('');
    setIsTyping(true);

    // Real AI response
    const aiResponse = await getAIResponse(message);
    const aiMessage: ChatMessage = {
      id: (Date.now() + 1).toString(),
      type: 'ai',
      content: aiResponse,
      timestamp: new Date().toISOString()
    };
    setChatHistory(prev => [...prev, aiMessage]);
    setIsTyping(false);
  };

  // Quick actions can be generated from post types or tags
  const quickActions = data ? [
    {
      icon: <MapPin className="w-5 h-5" />,
      title: 'Find Transportation',
      description: 'Book buses, vans, or private transfers',
      action: 'I need help finding transportation options'
    },
    {
      icon: <Calendar className="w-5 h-5" />,
      title: 'Plan Activities',
      description: 'Discover tours and local experiences',
      action: 'What activities do you recommend?'
    },
    {
      icon: <DollarSign className="w-5 h-5" />,
      title: 'Budget Planning',
      description: 'Get cost estimates and money tips',
      action: 'Help me plan my budget for this trip'
    },
    {
      icon: <Users className="w-5 h-5" />,
      title: 'Find Travel Buddies',
      description: 'Connect with other travelers',
      action: 'I\'m looking for travel companions'
    }
  ] : [];

  // Recommended services from data.json
  const recommendedServices = data ? data.services : [];
  const users = data ? data.users : [];

  if (dataLoading) {
    return <div className="text-center py-20 text-lg text-gray-500">Loading concierge data...</div>;
  }
  if (dataError) {
    return <div className="text-center py-20 text-lg text-red-500">{dataError}</div>;
  }

  return (
    <div>
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 max-w-screen-xl mx-auto w-full px-4 py-4">
        {/* Chat Area (Center, wider) */}
        <div className="lg:col-span-8">
          <div className="flex flex-col bg-white rounded-2xl shadow-md border border-gray-200 p-4 min-h-[90vh]">
            {/* Chat Header */}
            <div className="pb-4 border-b border-gray-100 mb-2 flex items-center space-x-4">
              <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center">
                <span className="text-white font-bold text-lg">AI</span>
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 text-lg">NomadPal Assistant</h3>
                <p className="text-sm text-gray-500">Online • Ready to help</p>
              </div>
            </div>

            {/* Chat Messages */}
            <div className="flex-1 overflow-y-auto space-y-4 mb-2 pr-2">
              {chatHistory.map((msg) => (
                <div
                  key={msg.id}
                  className={`flex ${msg.type === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-lg px-5 py-3 rounded-xl shadow-sm ${
                      msg.type === 'user'
                        ? 'bg-blue-600 text-white'
                        : 'bg-gray-100 text-gray-900'
                    }`}
                  >
                    <p className="text-base">{msg.content}</p>
                    <p className={`text-xs mt-1 ${
                      msg.type === 'user' ? 'text-blue-100' : 'text-gray-500'
                    }`}>
                      {new Date(msg.timestamp).toLocaleTimeString()}
                    </p>
                  </div>
                </div>
              ))}
              {isTyping && (
                <div className="flex justify-start">
                  <div className="bg-gray-100 text-gray-900 px-5 py-3 rounded-xl shadow-sm">
                    <div className="flex space-x-1">
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Quick Actions */}
            <div className="grid grid-cols-2 gap-2 mb-2">
              {quickActions.map((action, index) => (
                <button
                  key={index}
                  onClick={() => setMessage(action.action)}
                  className="text-left p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors shadow-sm"
                >
                  <div className="flex items-center space-x-2 mb-1">
                    <div className="text-blue-600">{action.icon}</div>
                    <span className="font-medium text-base text-gray-900">{action.title}</span>
                  </div>
                  <p className="text-xs text-gray-600">{action.description}</p>
                </button>
              ))}
            </div>

            {/* Message Input */}
            <div className="flex space-x-2 mt-2">
              <input
                type="text"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                placeholder="Ask me anything about your trip..."
                className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-base"
              />
              <button
                onClick={handleSendMessage}
                disabled={!message.trim()}
                className="px-5 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors text-base"
              >
                <Send className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>

        {/* Right Sidebar: Travel Tips + Recommended Services */}
        <div className="lg:col-span-4 flex flex-col space-y-6 ml-auto">
          {/* Travel Tips (moved here, compact) */}
          <div className="bg-blue-50 rounded-2xl p-4 shadow-sm border border-blue-100 ml-2">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              Travel Tips for {currentLocation}
            </h3>
            <ul className="space-y-2 text-sm text-gray-700">
              <li className="flex items-start space-x-2">
                <span className="w-2 h-2 bg-blue-600 rounded-full mt-2 flex-shrink-0"></span>
                <span>Best time to visit: November to May (dry season)</span>
              </li>
              <li className="flex items-start space-x-2">
                <span className="w-2 h-2 bg-blue-600 rounded-full mt-2 flex-shrink-0"></span>
                <span>Average daily budget: 1500-2500 PHP</span>
              </li>
              <li className="flex items-start space-x-2">
                <span className="w-2 h-2 bg-blue-600 rounded-full mt-2 flex-shrink-0"></span>
                <span>Book island tours in advance during peak season</span>
              </li>
              <li className="flex items-start space-x-2">
                <span className="w-2 h-2 bg-blue-600 rounded-full mt-2 flex-shrink-0"></span>
                <span>Bring cash - many places don't accept cards</span>
              </li>
            </ul>
          </div>
          {/* Recommended Services */}
          <div className="bg-white rounded-2xl shadow-md border border-gray-200 p-4">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              Recommended Services
            </h3>
            <div className="space-y-4">
              {recommendedServices.slice(0, 3).map((service: any) => {
                const provider = users.find((u: any) => u.id === service.providerId);
                return (
                  <div key={service.id} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow bg-gray-50">
                    <div className="flex items-start justify-between mb-2">
                      <h4 className="font-medium text-gray-900 text-base">{service.title}</h4>
                      {service.verified && (
                        <div className="w-4 h-4 bg-blue-600 rounded-full flex items-center justify-center">
                          <span className="text-white text-xs">✓</span>
                        </div>
                      )}
                    </div>
                    <p className="text-xs text-gray-600 mb-2">
                      {provider ? provider.username : service.providerId}
                    </p>
                    <p className="text-xs text-gray-700 mb-3">{service.description}</p>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <span className="text-xs text-gray-600">{service.rating}★</span>
                        <span className="text-xs text-gray-600">{service.location}</span>
                      </div>
                      <div className="text-right">
                        <div className="font-semibold text-gray-900 text-sm">
                          {service.price} {service.currency}
                        </div>
                      </div>
                    </div>
                    <button className="w-full mt-3 px-3 py-2 bg-blue-600 text-white text-sm rounded hover:bg-blue-700 transition-colors">
                      Book Now
                    </button>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ConciergePage; 