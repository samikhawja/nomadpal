import React, { useState } from 'react';
import { Shield, Star, CheckCircle, Users, Award, MapPin, Clock, MessageCircle } from 'lucide-react';

const TrustPage: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  // Mock data for demonstration
  const trustedUsers = [
    {
      id: '1',
      name: 'Sarah Mitchell',
      avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face',
      location: 'El Nido, Philippines',
      trustRating: 4.9,
      verified: true,
      memberSince: '2023-03-15',
      reviews: 47,
      badges: ['Top Guide', 'Safety Verified', 'Quick Responder'],
      recentActivity: '2 hours ago',
      specialties: ['Hiking', 'Transportation', 'Local Food']
    },
    {
      id: '2',
      name: 'Made Wijaya',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face',
      location: 'Bali, Indonesia',
      trustRating: 4.8,
      verified: true,
      memberSince: '2022-11-20',
      reviews: 89,
      badges: ['Local Expert', 'Verified Guide', 'Community Leader'],
      recentActivity: '4 hours ago',
      specialties: ['Cultural Tours', 'Temple Visits', 'Adventure Sports']
    },
    {
      id: '3',
      name: 'Alex Kim',
      avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face',
      location: 'Chiang Mai, Thailand',
      trustRating: 4.7,
      verified: true,
      memberSince: '2023-01-10',
      reviews: 34,
      badges: ['Budget Expert', 'Solo Traveler', 'Foodie'],
      recentActivity: '1 day ago',
      specialties: ['Budget Travel', 'Street Food', 'Temple Tours']
    }
  ];

  const categories = [
    { id: 'all', label: 'All Members', count: trustedUsers.length },
    { id: 'guides', label: 'Local Guides', count: 2 },
    { id: 'travelers', label: 'Fellow Travelers', count: 1 },
    { id: 'verified', label: 'Verified Only', count: 3 }
  ];

  const filteredUsers = selectedCategory === 'all' 
    ? trustedUsers 
    : selectedCategory === 'verified'
    ? trustedUsers.filter(user => user.verified)
    : trustedUsers;

  const trustFeatures = [
    {
      icon: <Shield className="w-8 h-8" />,
      title: 'Identity Verification',
      description: 'All members go through a multi-step verification process including ID checks and video calls.'
    },
    {
      icon: <Star className="w-8 h-8" />,
      title: 'Community Reviews',
      description: 'Real reviews from fellow travelers and locals build trust ratings over time.'
    },
    {
      icon: <CheckCircle className="w-8 h-8" />,
      title: 'Safety Monitoring',
      description: 'AI-powered monitoring and community reporting keep everyone safe.'
    },
    {
      icon: <Award className="w-8 h-8" />,
      title: 'Badge System',
      description: 'Earn badges for positive interactions, helpfulness, and local expertise.'
    }
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          Trust Network
        </h1>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
          Connect with verified travelers and trusted locals. Our multi-layered trust system ensures 
          safe and authentic travel experiences.
        </p>
      </div>

      {/* Trust Features */}
      <section className="mb-16">
        <h2 className="text-2xl font-bold text-gray-900 mb-8 text-center">
          How Our Trust System Works
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {trustFeatures.map((feature, index) => (
            <div key={index} className="text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4 text-blue-600">
                {feature.icon}
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                {feature.title}
              </h3>
              <p className="text-gray-600 text-sm">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Stats */}
      <section className="bg-blue-600 text-white rounded-lg p-8 mb-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 text-center">
          <div>
            <div className="text-3xl font-bold mb-2">10,000+</div>
            <div className="text-blue-100">Verified Members</div>
          </div>
          <div>
            <div className="text-3xl font-bold mb-2">4.8★</div>
            <div className="text-blue-100">Average Rating</div>
          </div>
          <div>
            <div className="text-3xl font-bold mb-2">99.2%</div>
            <div className="text-blue-100">Safety Rate</div>
          </div>
          <div>
            <div className="text-3xl font-bold mb-2">500+</div>
            <div className="text-blue-100">Local Guides</div>
          </div>
        </div>
      </section>

      {/* Trusted Members */}
      <section>
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-2xl font-bold text-gray-900">
            Trusted Members in Your Area
          </h2>
          <div className="flex items-center space-x-2">
            <Users className="w-5 h-5 text-gray-500" />
            <span className="text-sm text-gray-600">
              {filteredUsers.length} members found
            </span>
          </div>
        </div>

        {/* Filters */}
        <div className="flex space-x-2 mb-6">
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => setSelectedCategory(category.id)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                selectedCategory === category.id
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              {category.label} ({category.count})
            </button>
          ))}
        </div>

        {/* Members Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredUsers.map((user) => (
            <div key={user.id} className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow">
              {/* User Header */}
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center space-x-3">
                  <img
                    src={user.avatar}
                    alt={user.name}
                    className="w-12 h-12 rounded-full object-cover"
                  />
                  <div>
                    <div className="flex items-center space-x-2">
                      <h3 className="font-semibold text-gray-900">{user.name}</h3>
                      {user.verified && (
                        <CheckCircle className="w-4 h-4 text-blue-600" />
                      )}
                    </div>
                    <div className="flex items-center space-x-2 text-sm text-gray-500">
                      <MapPin className="w-3 h-3" />
                      <span>{user.location}</span>
                    </div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="flex items-center space-x-1">
                    <Star className="w-4 h-4 text-yellow-400 fill-current" />
                    <span className="font-semibold text-gray-900">{user.trustRating}</span>
                  </div>
                  <div className="text-xs text-gray-500">{user.reviews} reviews</div>
                </div>
              </div>

              {/* Badges */}
              <div className="flex flex-wrap gap-2 mb-4">
                {user.badges.map((badge, index) => (
                  <span
                    key={index}
                    className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full font-medium"
                  >
                    {badge}
                  </span>
                ))}
              </div>

              {/* Specialties */}
              <div className="mb-4">
                <h4 className="text-sm font-medium text-gray-700 mb-2">Specialties</h4>
                <div className="flex flex-wrap gap-1">
                  {user.specialties.map((specialty, index) => (
                    <span
                      key={index}
                      className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-full"
                    >
                      {specialty}
                    </span>
                  ))}
                </div>
              </div>

              {/* Activity */}
              <div className="flex items-center justify-between text-sm text-gray-500">
                <div className="flex items-center space-x-1">
                  <Clock className="w-3 h-3" />
                  <span>Active {user.recentActivity}</span>
                </div>
                <button className="flex items-center space-x-1 text-blue-600 hover:text-blue-700">
                  <MessageCircle className="w-3 h-3" />
                  <span>Message</span>
                </button>
              </div>
            </div>
          ))}
        </div>

        {filteredUsers.length === 0 && (
          <div className="text-center py-12">
            <div className="text-gray-500 text-lg">No members found for this category.</div>
          </div>
        )}
      </section>

      {/* Trust Guidelines */}
      <section className="mt-16 bg-gray-50 rounded-lg p-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">
          Trust Guidelines
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-3">For Travelers</h3>
            <ul className="space-y-2 text-gray-600">
              <li>• Always meet in public places for first meetings</li>
              <li>• Verify guide credentials before booking</li>
              <li>• Read reviews and check trust ratings</li>
              <li>• Report any suspicious behavior immediately</li>
              <li>• Use the platform's messaging system</li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-3">For Guides & Locals</h3>
            <ul className="space-y-2 text-gray-600">
              <li>• Complete identity verification process</li>
              <li>• Maintain high trust ratings through quality service</li>
              <li>• Respond promptly to messages and requests</li>
              <li>• Be transparent about pricing and services</li>
              <li>• Follow local regulations and safety guidelines</li>
            </ul>
          </div>
        </div>
      </section>
    </div>
  );
};

export default TrustPage; 