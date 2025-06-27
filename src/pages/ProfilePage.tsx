import React, { useState } from 'react';
import { Edit, Star, MapPin, Calendar, Award, MessageCircle, Settings } from 'lucide-react';

const ProfilePage: React.FC = () => {
  const [isEditing, setIsEditing] = useState(false);

  // Mock user data
  const user = {
    id: 'currentUser',
    name: 'Alex Johnson',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face',
    location: 'El Nido, Philippines',
    trustRating: 4.6,
    verified: true,
    memberSince: '2023-06-15',
    reviews: 23,
    badges: ['Verified Traveler', 'Helpful Member', 'Local Explorer'],
    bio: 'Solo traveler from Canada exploring Southeast Asia. Love hiking, photography, and trying local food. Always happy to share travel tips and meet fellow adventurers!',
    specialties: ['Budget Travel', 'Photography', 'Hiking', 'Local Food'],
    languages: ['English', 'French', 'Basic Spanish'],
    recentTrips: [
      {
        id: '1',
        destination: 'Bali, Indonesia',
        date: '2024-01-10',
        duration: '2 weeks',
        highlights: ['Mount Batur sunrise hike', 'Ubud cultural tour', 'Nusa Penida island hopping']
      },
      {
        id: '2',
        destination: 'Chiang Mai, Thailand',
        date: '2023-12-15',
        duration: '1 week',
        highlights: ['Temple hopping', 'Cooking class', 'Doi Inthanon national park']
      }
    ],
    upcomingTrips: [
      {
        id: '3',
        destination: 'Port Barton, Philippines',
        date: '2024-01-20',
        duration: '5 days',
        status: 'Confirmed'
      }
    ]
  };

  const reviews = [
    {
      id: '1',
      reviewer: 'Sarah M.',
      rating: 5,
      comment: 'Alex was incredibly helpful with transportation tips in Bali. Great travel companion!',
      date: '2024-01-12'
    },
    {
      id: '2',
      reviewer: 'Made W.',
      rating: 4,
      comment: 'Shared some great photography spots in El Nido. Very knowledgeable about the area.',
      date: '2024-01-08'
    }
  ];

  const stats = [
    { label: 'Countries Visited', value: '8' },
    { label: 'Cities Explored', value: '24' },
    { label: 'Reviews Given', value: '23' },
    { label: 'Trust Rating', value: '4.6★' }
  ];

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Profile Header */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-8">
        <div className="flex items-start justify-between mb-6">
          <div className="flex items-center space-x-6">
            <img
              src={user.avatar}
              alt={user.name}
              className="w-24 h-24 rounded-full object-cover"
            />
            <div>
              <div className="flex items-center space-x-3 mb-2">
                <h1 className="text-2xl font-bold text-gray-900">{user.name}</h1>
                {user.verified && (
                  <div className="flex items-center space-x-1 px-2 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">
                    <span>✓</span>
                    <span>Verified</span>
                  </div>
                )}
              </div>
              <div className="flex items-center space-x-4 text-gray-600 mb-2">
                <div className="flex items-center space-x-1">
                  <MapPin className="w-4 h-4" />
                  <span>{user.location}</span>
                </div>
                <div className="flex items-center space-x-1">
                  <Calendar className="w-4 h-4" />
                  <span>Member since {new Date(user.memberSince).toLocaleDateString()}</span>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <div className="flex items-center space-x-1">
                  <Star className="w-4 h-4 text-yellow-400 fill-current" />
                  <span className="font-semibold">{user.trustRating}</span>
                </div>
                <span className="text-gray-500">({user.reviews} reviews)</span>
              </div>
            </div>
          </div>
          <div className="flex space-x-2">
            <button
              onClick={() => setIsEditing(!isEditing)}
              className="flex items-center space-x-2 px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
            >
              <Edit className="w-4 h-4" />
              <span>Edit Profile</span>
            </button>
            <button className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
              <MessageCircle className="w-4 h-4" />
              <span>Message</span>
            </button>
          </div>
        </div>

        {/* Badges */}
        <div className="flex flex-wrap gap-2 mb-4">
          {user.badges.map((badge, index) => (
            <span
              key={index}
              className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm font-medium"
            >
              {badge}
            </span>
          ))}
        </div>

        {/* Bio */}
        <p className="text-gray-700 mb-6">{user.bio}</p>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {stats.map((stat, index) => (
            <div key={index} className="text-center">
              <div className="text-2xl font-bold text-gray-900">{stat.value}</div>
              <div className="text-sm text-gray-600">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-8">
          {/* Specialties & Languages */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Expertise & Languages</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h3 className="font-medium text-gray-900 mb-3">Specialties</h3>
                <div className="flex flex-wrap gap-2">
                  {user.specialties.map((specialty, index) => (
                    <span
                      key={index}
                      className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm"
                    >
                      {specialty}
                    </span>
                  ))}
                </div>
              </div>
              <div>
                <h3 className="font-medium text-gray-900 mb-3">Languages</h3>
                <div className="flex flex-wrap gap-2">
                  {user.languages.map((language, index) => (
                    <span
                      key={index}
                      className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm"
                    >
                      {language}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Recent Trips */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Recent Trips</h2>
            <div className="space-y-4">
              {user.recentTrips.map((trip) => (
                <div key={trip.id} className="border border-gray-200 rounded-lg p-4">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="font-semibold text-gray-900">{trip.destination}</h3>
                    <span className="text-sm text-gray-500">{trip.duration}</span>
                  </div>
                  <div className="text-sm text-gray-600 mb-2">
                    {new Date(trip.date).toLocaleDateString()}
                  </div>
                  <div className="text-sm text-gray-700">
                    <strong>Highlights:</strong> {trip.highlights.join(', ')}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Upcoming Trips */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Upcoming Trips</h2>
            <div className="space-y-4">
              {user.upcomingTrips.map((trip) => (
                <div key={trip.id} className="border border-blue-200 bg-blue-50 rounded-lg p-4">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="font-semibold text-gray-900">{trip.destination}</h3>
                    <span className="px-2 py-1 bg-green-100 text-green-800 rounded-full text-xs">
                      {trip.status}
                    </span>
                  </div>
                  <div className="text-sm text-gray-600 mb-2">
                    {new Date(trip.date).toLocaleDateString()} • {trip.duration}
                  </div>
                  <button className="text-blue-600 hover:text-blue-700 text-sm font-medium">
                    View Details
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Reviews */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Recent Reviews</h2>
            <div className="space-y-4">
              {reviews.map((review) => (
                <div key={review.id} className="border-b border-gray-100 pb-4 last:border-b-0">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center space-x-2">
                      <span className="font-medium text-gray-900">{review.reviewer}</span>
                      <div className="flex items-center space-x-1">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            className={`w-4 h-4 ${
                              i < review.rating ? 'text-yellow-400 fill-current' : 'text-gray-300'
                            }`}
                          />
                        ))}
                      </div>
                    </div>
                    <span className="text-sm text-gray-500">
                      {new Date(review.date).toLocaleDateString()}
                    </span>
                  </div>
                  <p className="text-gray-700">{review.comment}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Quick Actions */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h3>
            <div className="space-y-3">
              <button className="w-full flex items-center space-x-3 p-3 text-left hover:bg-gray-50 rounded-lg transition-colors">
                <Award className="w-5 h-5 text-blue-600" />
                <span className="text-gray-700">View Badges</span>
              </button>
              <button className="w-full flex items-center space-x-3 p-3 text-left hover:bg-gray-50 rounded-lg transition-colors">
                <Calendar className="w-5 h-5 text-green-600" />
                <span className="text-gray-700">Plan New Trip</span>
              </button>
              <button className="w-full flex items-center space-x-3 p-3 text-left hover:bg-gray-50 rounded-lg transition-colors">
                <MessageCircle className="w-5 h-5 text-purple-600" />
                <span className="text-gray-700">Message History</span>
              </button>
              <button className="w-full flex items-center space-x-3 p-3 text-left hover:bg-gray-50 rounded-lg transition-colors">
                <Settings className="w-5 h-5 text-gray-600" />
                <span className="text-gray-700">Settings</span>
              </button>
            </div>
          </div>

          {/* Trust Score */}
          <div className="bg-blue-50 rounded-lg p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Trust Score</h3>
            <div className="text-center">
              <div className="text-4xl font-bold text-blue-600 mb-2">{user.trustRating}</div>
              <div className="flex justify-center mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`w-6 h-6 ${
                      i < Math.floor(user.trustRating) ? 'text-yellow-400 fill-current' : 'text-gray-300'
                    }`}
                  />
                ))}
              </div>
              <p className="text-sm text-gray-600">
                Based on {user.reviews} community reviews
              </p>
            </div>
          </div>

          {/* Safety Tips */}
          <div className="bg-yellow-50 rounded-lg p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Safety Tips</h3>
            <div className="space-y-3 text-sm text-gray-700">
              <div className="flex items-start space-x-2">
                <div className="w-2 h-2 bg-yellow-500 rounded-full mt-2 flex-shrink-0"></div>
                <p>Always meet in public places for first meetings</p>
              </div>
              <div className="flex items-start space-x-2">
                <div className="w-2 h-2 bg-yellow-500 rounded-full mt-2 flex-shrink-0"></div>
                <p>Verify guide credentials before booking</p>
              </div>
              <div className="flex items-start space-x-2">
                <div className="w-2 h-2 bg-yellow-500 rounded-full mt-2 flex-shrink-0"></div>
                <p>Report any suspicious behavior</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage; 