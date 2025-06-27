import React from 'react';
import { Link } from 'react-router-dom';
import { MapPin, Users, Shield, Zap, MessageCircle, ArrowRight, Globe } from 'lucide-react';
import { useSelector } from 'react-redux';
import { RootState } from '../store';

const HomePage: React.FC = () => {
  const currentUser = useSelector((state: RootState) => state.user.currentUser);
  const currentLocation = useSelector((state: RootState) => state.location.currentLocation);

  const features = [
    {
      icon: <Users className="w-6 h-6" />,
      title: 'Community-Driven',
      description: 'Get real recommendations from verified travelers and locals in your area.'
    },
    {
      icon: <Shield className="w-6 h-6" />,
      title: 'Trust Layer',
      description: 'Built-in reputation system with verified reviews and safety checks.'
    },
    {
      icon: <Zap className="w-6 h-6" />,
      title: 'AI Concierge',
      description: 'Smart planning assistance for routes, bookings, and spontaneous adventures.'
    },
    {
      icon: <MessageCircle className="w-6 h-6" />,
      title: 'Real-Time Help',
      description: 'Ask questions and get instant responses from the community.'
    }
  ];

  const recentPosts = [
    {
      id: '1',
      type: 'question' as const,
      title: 'Looking for van ride to Port Barton tomorrow',
      location: 'El Nido, Philippines',
      author: 'Sarah M.',
      time: '2 hours ago',
      replies: 3
    },
    {
      id: '2',
      type: 'offer' as const,
      title: 'Sunrise hike guide available in Bali',
      location: 'Bali, Indonesia',
      author: 'Made W.',
      time: '4 hours ago',
      replies: 1
    },
    {
      id: '3',
      type: 'request' as const,
      title: 'Need help with Cambodia-Vietnam border crossing',
      location: 'Siem Reap, Cambodia',
      author: 'Alex K.',
      time: '6 hours ago',
      replies: 5
    }
  ];

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'question': return 'bg-blue-100 text-blue-800';
      case 'offer': return 'bg-green-100 text-green-800';
      case 'request': return 'bg-orange-100 text-orange-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'question': return '❓';
      case 'offer': return '💡';
      case 'request': return '🤝';
      default: return '📝';
    }
  };

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-blue-600 via-indigo-700 to-purple-800 text-white py-20">
        <div className="absolute inset-0 bg-black opacity-20"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Your Trusted Travel
              <span className="block text-blue-200">Companion</span>
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-blue-100 max-w-3xl mx-auto">
              Connect with verified locals and fellow travelers. Get real-time recommendations, 
              find trusted guides, and plan spontaneous adventures with confidence.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/feed"
                className="bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-blue-50 transition-colors flex items-center justify-center space-x-2"
              >
                <Globe className="w-5 h-5" />
                <span>Explore Feed</span>
              </Link>
              <Link
                to="/concierge"
                className="border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-blue-600 transition-colors flex items-center justify-center space-x-2"
              >
                <Zap className="w-5 h-5" />
                <span>AI Concierge</span>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Current Location */}
      <section className="bg-white py-8 border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-center space-x-2 text-gray-600">
            <MapPin className="w-5 h-5" />
            <span className="font-medium">Currently exploring:</span>
            <span className="font-bold text-blue-600">{currentLocation}</span>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Why Choose NomadPal?
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              We're building the world's most trusted travel community, powered by real people and AI assistance.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <div key={index} className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 text-center">
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mx-auto mb-4 text-blue-600">
                  {feature.icon}
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  {feature.title}
                </h3>
                <p className="text-gray-600">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Recent Activity */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-3xl font-bold text-gray-900">
              Recent Community Activity
            </h2>
            <Link
              to="/feed"
              className="text-blue-600 hover:text-blue-700 font-medium flex items-center space-x-1"
            >
              <span>View all</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {recentPosts.map((post) => (
              <div key={post.id} className="bg-gray-50 p-6 rounded-lg border border-gray-200 hover:shadow-md transition-shadow">
                <div className="flex items-start justify-between mb-3">
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${getTypeColor(post.type)}`}>
                    {getTypeIcon(post.type)} {post.type}
                  </span>
                  <span className="text-xs text-gray-500">{post.time}</span>
                </div>
                <h3 className="font-semibold text-gray-900 mb-2 line-clamp-2">
                  {post.title}
                </h3>
                <div className="flex items-center justify-between text-sm text-gray-600">
                  <div className="flex items-center space-x-2">
                    <span>👤 {post.author}</span>
                    <span>📍 {post.location}</span>
                  </div>
                  <span>💬 {post.replies}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Trust Stats */}
      <section className="py-16 bg-blue-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">
              Trusted by Travelers Worldwide
            </h2>
            <p className="text-xl text-blue-100">
              Join thousands of verified travelers and locals building the future of travel.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div>
              <div className="text-4xl font-bold mb-2">10K+</div>
              <div className="text-blue-100">Verified Travelers</div>
            </div>
            <div>
              <div className="text-4xl font-bold mb-2">500+</div>
              <div className="text-blue-100">Trusted Local Guides</div>
            </div>
            <div>
              <div className="text-4xl font-bold mb-2">4.8★</div>
              <div className="text-blue-100">Average Trust Rating</div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-gray-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-4">
            Ready to Start Your Adventure?
          </h2>
          <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
            Join the NomadPal community and discover authentic travel experiences with trusted companions.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/feed"
              className="bg-blue-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
            >
              Get Started Free
            </Link>
            <Link
              to="/trust"
              className="border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-gray-900 transition-colors"
            >
              Learn About Trust
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage; 