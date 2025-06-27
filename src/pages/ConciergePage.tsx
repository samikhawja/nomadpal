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
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          AI Travel Concierge
        </h1>
        <p className="text-xl text-gray-600">
          Get personalized recommendations, book services, and plan your perfect trip in {currentLocation}
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Chat Interface */}
        <div className="lg:col-span-2">
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 h-[600px] flex flex-col">
            {/* Chat Header */}
            <div className="p-4 border-b border-gray-200 bg-blue-50 rounded-t-lg">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center">
                  <span className="text-white font-bold">AI</span>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900">NomadPal Assistant</h3>
                  <p className="text-sm text-gray-600">Online • Ready to help</p>
                </div>
              </div>
            </div>

            {/* Chat Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {chatHistory.map((msg) => (
                <div
                  key={msg.id}
                  className={`flex ${msg.type === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg ${
                      msg.type === 'user'
                        ? 'bg-blue-600 text-white'
                        : 'bg-gray-100 text-gray-900'
                    }`}
                  >
                    <p className="text-sm">{msg.content}</p>
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
                  <div className="bg-gray-100 text-gray-900 px-4 py-2 rounded-lg">
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
            <div className="p-4 border-t border-gray-200">
              <div className="grid grid-cols-2 gap-2 mb-4">
                {quickActions.map((action, index) => (
                  <button
                    key={index}
                    onClick={() => setMessage(action.action)}
                    className="text-left p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
                  >
                    <div className="flex items-center space-x-2 mb-1">
                      <div className="text-blue-600">{action.icon}</div>
                      <span className="font-medium text-sm text-gray-900">{action.title}</span>
                    </div>
                    <p className="text-xs text-gray-600">{action.description}</p>
                  </button>
                ))}
              </div>

              {/* Message Input */}
              <div className="flex space-x-2">
                <input
                  type="text"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                  placeholder="Ask me anything about your trip..."
                  className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <button
                  onClick={handleSendMessage}
                  disabled={!message.trim()}
                  className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                  <Send className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Recommendations Sidebar */}
        <div className="space-y-6">
          {/* Recommended Services */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              Recommended Services
            </h3>
            <div className="space-y-4">
              {recommendedServices.slice(0, 3).map((service: any) => {
                const provider = users.find((u: any) => u.id === service.providerId);
                return (
                  <div key={service.id} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                    <div className="flex items-start justify-between mb-2">
                      <h4 className="font-medium text-gray-900 text-sm">{service.title}</h4>
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
                    <button className="w-full mt-3 px-3 py-1 bg-blue-600 text-white text-xs rounded hover:bg-blue-700 transition-colors">
                      Book Now
                    </button>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Travel Tips */}
          <div className="bg-blue-50 rounded-lg p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              Travel Tips for {currentLocation}
            </h3>
            <div className="space-y-3 text-sm text-gray-700">
              <div className="flex items-start space-x-2">
                <div className="w-2 h-2 bg-blue-600 rounded-full mt-2 flex-shrink-0"></div>
                <p>Best time to visit: November to May (dry season)</p>
              </div>
              <div className="flex items-start space-x-2">
                <div className="w-2 h-2 bg-blue-600 rounded-full mt-2 flex-shrink-0"></div>
                <p>Average daily budget: 1500-2500 PHP</p>
              </div>
              <div className="flex items-start space-x-2">
                <div className="w-2 h-2 bg-blue-600 rounded-full mt-2 flex-shrink-0"></div>
                <p>Book island tours in advance during peak season</p>
              </div>
              <div className="flex items-start space-x-2">
                <div className="w-2 h-2 bg-blue-600 rounded-full mt-2 flex-shrink-0"></div>
                <p>Bring cash - many places don't accept cards</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ConciergePage; 