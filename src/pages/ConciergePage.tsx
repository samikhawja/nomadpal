import React, { useState } from 'react';
import { Send, MapPin, Calendar, DollarSign, Users, Clock, Star } from 'lucide-react';
import { useNomad } from '../context/NomadContext';

interface ChatMessage {
  id: string;
  type: 'ai' | 'user';
  content: string;
  timestamp: string;
}

const ConciergePage: React.FC = () => {
  const { state } = useNomad();
  const [message, setMessage] = useState('');
  const [chatHistory, setChatHistory] = useState<ChatMessage[]>([
    {
      id: '1',
      type: 'ai',
      content: `Hi! I'm your NomadPal AI concierge. I can help you plan your trip in ${state.currentLocation}, find local guides, book transportation, and answer any travel questions. What would you like to know?`,
      timestamp: new Date().toISOString()
    }
  ]);
  const [isTyping, setIsTyping] = useState(false);

  // Mock AI responses
  const aiResponses = {
    'transport': [
      'I can help you find transportation options! There are several van services from El Nido to Port Barton. The most reliable is El Nido Transport Co. - they leave daily at 8:30 AM and cost 500 PHP. Would you like me to connect you with a verified driver?',
      'For getting around El Nido, I recommend renting a motorbike (400 PHP/day) or using tricycles (50-100 PHP per trip). The main attractions are within 15-20 minutes of town.'
    ],
    'accommodation': [
      'Based on your preferences, I recommend Outpost Beach Hostel for budget travelers (800 PHP/night) or Spin Designer Hostel for a social atmosphere (1200 PHP/night). Both have great reviews from our community.',
      'For a more local experience, I can connect you with verified homestay hosts in the area. They typically cost 600-800 PHP/night and include breakfast.'
    ],
    'activities': [
      'The must-do activities in El Nido are: Island Hopping Tour A (1200 PHP), Nacpan Beach day trip, and Taraw Cliff hike for sunset. I can book any of these with trusted local operators.',
      'For adventure seekers, I recommend the secret lagoon tour or a private boat charter to explore hidden beaches. Would you like me to check availability?'
    ],
    'food': [
      'The best local restaurants in El Nido are: Trattoria Altrove for pizza, Happiness Beach Bar for sunset drinks, and Artcafe for breakfast. All are highly rated by our community.',
      'For authentic Filipino food, try the local market or I can recommend some family-run restaurants that aren\'t in the guidebooks.'
    ]
  };

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

    // Simulate AI response
    setTimeout(() => {
      const aiResponse = generateAIResponse(message);
      const aiMessage: ChatMessage = {
        id: (Date.now() + 1).toString(),
        type: 'ai',
        content: aiResponse,
        timestamp: new Date().toISOString()
      };
      setChatHistory(prev => [...prev, aiMessage]);
      setIsTyping(false);
    }, 1500);
  };

  const generateAIResponse = (userMessage: string): string => {
    const lowerMessage = userMessage.toLowerCase();
    
    if (lowerMessage.includes('transport') || lowerMessage.includes('bus') || lowerMessage.includes('van')) {
      return aiResponses.transport[Math.floor(Math.random() * aiResponses.transport.length)];
    } else if (lowerMessage.includes('hotel') || lowerMessage.includes('hostel') || lowerMessage.includes('stay')) {
      return aiResponses.accommodation[Math.floor(Math.random() * aiResponses.accommodation.length)];
    } else if (lowerMessage.includes('tour') || lowerMessage.includes('activity') || lowerMessage.includes('do')) {
      return aiResponses.activities[Math.floor(Math.random() * aiResponses.activities.length)];
    } else if (lowerMessage.includes('food') || lowerMessage.includes('restaurant') || lowerMessage.includes('eat')) {
      return aiResponses.food[Math.floor(Math.random() * aiResponses.food.length)];
    } else {
      return "I'd be happy to help! I can assist with transportation, accommodation, activities, food recommendations, and connecting you with local guides. What specific aspect of your trip would you like help with?";
    }
  };

  const quickActions = [
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
  ];

  const recommendedServices = [
    {
      id: '1',
      name: 'El Nido Island Hopping Tour A',
      provider: 'Island Adventures Co.',
      rating: 4.8,
      price: 1200,
      currency: 'PHP',
      duration: '8 hours',
      description: 'Visit Big Lagoon, Small Lagoon, Secret Lagoon, and 7 Commando Beach. Includes lunch and snorkeling gear.',
      verified: true
    },
    {
      id: '2',
      name: 'Private Van Transfer to Port Barton',
      provider: 'El Nido Transport Co.',
      rating: 4.9,
      price: 500,
      currency: 'PHP',
      duration: '2 hours',
      description: 'Reliable van service with air conditioning. Daily departures at 8:30 AM.',
      verified: true
    },
    {
      id: '3',
      name: 'Local Food Tour',
      provider: 'Made Wijaya',
      rating: 4.7,
      price: 800,
      currency: 'PHP',
      duration: '3 hours',
      description: 'Explore local markets and hidden food spots with a knowledgeable local guide.',
      verified: true
    }
  ];

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          AI Travel Concierge
        </h1>
        <p className="text-xl text-gray-600">
          Get personalized recommendations, book services, and plan your perfect trip in {state.currentLocation}
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
              {recommendedServices.map((service) => (
                <div key={service.id} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                  <div className="flex items-start justify-between mb-2">
                    <h4 className="font-medium text-gray-900 text-sm">{service.name}</h4>
                    {service.verified && (
                      <div className="w-4 h-4 bg-blue-600 rounded-full flex items-center justify-center">
                        <span className="text-white text-xs">✓</span>
                      </div>
                    )}
                  </div>
                  <p className="text-xs text-gray-600 mb-2">{service.provider}</p>
                  <p className="text-xs text-gray-700 mb-3">{service.description}</p>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <Star className="w-3 h-3 text-yellow-400 fill-current" />
                      <span className="text-xs text-gray-600">{service.rating}</span>
                      <Clock className="w-3 h-3 text-gray-400" />
                      <span className="text-xs text-gray-600">{service.duration}</span>
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
              ))}
            </div>
          </div>

          {/* Travel Tips */}
          <div className="bg-blue-50 rounded-lg p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              Travel Tips for {state.currentLocation}
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