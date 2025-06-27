import React, { useState, useEffect } from 'react';
import { Edit, Star, MapPin, Calendar, Award, MessageCircle, Settings } from 'lucide-react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../store';
import { useNavigate, useParams, useLocation } from 'react-router-dom';
import { setUser } from '../slices/userSlice';

const ProfilePage: React.FC = () => {
  const [isEditing, setIsEditing] = useState(false);
  const { username } = useParams();
  const users = useSelector((state: RootState) => state.user.users);
  const currentUser = useSelector((state: RootState) => state.user.currentUser);
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();

  // If the username in the URL matches the logged-in user, use currentUser
  const user = (currentUser && currentUser.username?.toLowerCase() === username?.toLowerCase())
    ? currentUser
    : users.find(u => u.username?.toLowerCase() === username?.toLowerCase());

  // Modal state for editing profile
  const [editForm, setEditForm] = useState({
    username: user ? user.username || '' : '',
    location: user ? user.location || '' : '',
    bio: user ? user.bio || '' : ''
  });

  useEffect(() => {
    if (user) {
      setEditForm({
        username: user.username || '',
        location: user.location || '',
        bio: user.bio || ''
      });
    }
  }, [user]);

  const handleEditChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setEditForm({ ...editForm, [e.target.name]: e.target.value });
  };

  const handleEditSave = () => {
    if (!user) return;
    dispatch(setUser({
      ...user,
      ...editForm,
      id: user.id,
      avatar: user.avatar || '',
    }));
    setIsEditing(false);
  };

  const handleEditCancel = () => {
    setEditForm({
      username: user ? user.username || '' : '',
      location: user ? user.location || '' : '',
      bio: user ? user.bio || '' : ''
    });
    setIsEditing(false);
  };

  // Show loading if users are not loaded yet and not the current user
  if (!user && users.length === 0) {
    return (
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 text-center">
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-8">
          <h2 className="text-2xl font-bold mb-4">Loading...</h2>
        </div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-8 text-center">
          <h2 className="text-2xl font-bold mb-4">User Not Found</h2>
          <p className="text-gray-600">The user "{username}" does not exist.</p>
        </div>
      </div>
    );
  }

  const reviews = Array.isArray(user.reviews) ? user.reviews : [];

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
              src={process.env.PUBLIC_URL + '/' + user.avatar}
              alt={user.username}
              className="w-24 h-24 rounded-full object-cover"
              onError={e => { e.currentTarget.src = `https://ui-avatars.com/api/?name=${user.username}`; }}
            />
            <div>
              <div className="flex items-center space-x-3 mb-2">
                <h1 className="text-2xl font-bold text-gray-900">{user.username}</h1>
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
                <span className="text-gray-500">({user.reviews.length} reviews)</span>
              </div>
            </div>
          </div>
          <div className="flex space-x-2">
            {currentUser && user.username?.toLowerCase() === currentUser.username?.toLowerCase() && (
              <button
                onClick={() => setIsEditing(!isEditing)}
                className="flex items-center space-x-2 px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
              >
                <Edit className="w-4 h-4" />
                <span>Edit Profile</span>
              </button>
            )}
            {!(currentUser && user.username?.toLowerCase() === currentUser.username?.toLowerCase()) && (
              <button
                className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                onClick={() => {
                  if (!currentUser) {
                    navigate('/signin', { state: { from: location.pathname } });
                  } else {
                    // Future: open message modal or chat
                  }
                }}
              >
                <MessageCircle className="w-4 h-4" />
                <span>Message</span>
              </button>
            )}
          </div>
        </div>

        {/* Badges */}
        {Array.isArray(user.badges) && (
          <div className="flex flex-wrap gap-2 mb-4">
            {user.badges.map((badge: string, index: number) => (
              <span
                key={index}
                className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm font-medium"
              >
                {badge}
              </span>
            ))}
          </div>
        )}

        {/* Bio */}
        {user.bio && <p className="text-gray-700 mb-6">{user.bio}</p>}

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {stats.map((stat, index) => (
            <div key={index} className="text-center">
              <div className="text-2xl font-bold text-gray-900">{stat.value}</div>
              <div className="text-sm text-gray-600">{stat.label}</div>
            </div>
          ))}
        </div>

        {/* Edit Profile Modal */}
        {user && isEditing && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40">
            <div className="bg-white rounded-lg shadow-lg p-8 w-full max-w-md relative">
              <h2 className="text-xl font-bold mb-4">Edit Profile</h2>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Display Name</label>
                  <input
                    type="text"
                    name="username"
                    value={editForm.username}
                    onChange={handleEditChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Location</label>
                  <input
                    type="text"
                    name="location"
                    value={editForm.location}
                    onChange={handleEditChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Bio</label>
                  <textarea
                    name="bio"
                    value={editForm.bio}
                    onChange={handleEditChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    rows={3}
                  />
                </div>
              </div>
              <div className="flex justify-end space-x-2 mt-6">
                <button
                  onClick={handleEditCancel}
                  className="px-4 py-2 rounded bg-gray-100 text-gray-700 hover:bg-gray-200"
                >
                  Cancel
                </button>
                <button
                  onClick={handleEditSave}
                  className="px-4 py-2 rounded bg-blue-600 text-white hover:bg-blue-700"
                >
                  Save
                </button>
              </div>
            </div>
          </div>
        )}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-8">
          {/* Reviews */}
          {reviews.length > 0 && (
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-8">
              <h2 className="text-xl font-bold mb-4">Recent Reviews</h2>
              {reviews.map((review, idx) => {
                const reviewer = users.find(u => u.id === review.reviewerId);
                return (
                  <div key={review.id} className={idx !== 0 ? 'pt-4 border-t border-gray-100 mt-4' : ''}>
                    <div className="font-semibold text-gray-800 flex items-center mb-1">
                      {reviewer ? reviewer.username : <span className="italic text-gray-400">Unknown user</span>}
                      <span className="ml-2">
                        {Array.from({ length: 5 }).map((_, i) => (
                          <span key={i} className={i < review.rating ? 'text-yellow-400' : 'text-gray-300'}>★</span>
                        ))}
                      </span>
                    </div>
                    <div className="text-gray-700 mb-2">{review.comment}</div>
                  </div>
                );
              })}
            </div>
          )}
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
                    className={`w-6 h-6 ${i < Math.floor(user.trustRating) ? 'text-yellow-400 fill-current' : 'text-gray-300'}`}
                  />
                ))}
              </div>
              <p className="text-sm text-gray-600">
                Based on {user.reviews.length} community reviews
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