import React, { useState, useEffect, useRef } from 'react';
import { Edit, Star, MapPin, Calendar, Award, MessageCircle, Settings } from 'lucide-react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../store';
import { useNavigate, useParams, useLocation, Link } from 'react-router-dom';
import { setUser } from '../slices/userSlice';

const ProfilePage: React.FC = () => {
  const [isEditing, setIsEditing] = useState(false);
  const { username } = useParams();
  const users = useSelector((state: RootState) => state.user.users);
  const currentUser = useSelector((state: RootState) => state.user.currentUser);
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();
  const [hoveredReviewerId, setHoveredReviewerId] = useState<string | null>(null);
  const [isHoveringName, setIsHoveringName] = useState(false);
  const [isHoveringModal, setIsHoveringModal] = useState(false);
  const hoverTimeout = useRef<NodeJS.Timeout | null>(null);

  // If the username in the URL matches the logged-in user, use currentUser
  const user = (currentUser && currentUser.username?.toLowerCase() === username?.toLowerCase())
    ? currentUser
    : users.find(u => u.username?.toLowerCase() === username?.toLowerCase());

  // Modal state for editing profile
  const [editForm, setEditForm] = useState({
    username: user ? user.username || '' : '',
    location: user ? user.location || '' : '',
    bio: user ? user.bio || '' : '',
    instagram: user ? user.instagram || '' : '',
    facebook: user ? user.facebook || '' : '',
    snapchat: user ? user.snapchat || '' : '',
    phone: user ? user.phone || '' : '',
    tiktok: user ? user.tiktok || '' : '',
    whatsapp: user ? user.whatsapp || '' : '',
    name: user ? user.name || '' : '',
  });

  useEffect(() => {
    if (user) {
      setEditForm({
        username: user.username || '',
        location: user.location || '',
        bio: user.bio || '',
        instagram: user.instagram || '',
        facebook: user.facebook || '',
        snapchat: user.snapchat || '',
        phone: user.phone || '',
        tiktok: user.tiktok || '',
        whatsapp: user.whatsapp || '',
        name: user.name || '',
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
      bio: user ? user.bio || '' : '',
      instagram: user ? user.instagram || '' : '',
      facebook: user ? user.facebook || '' : '',
      snapchat: user ? user.snapchat || '' : '',
      phone: user ? user.phone || '' : '',
      tiktok: user ? user.tiktok || '' : '',
      whatsapp: user ? user.whatsapp || '' : '',
      name: user ? user.name || '' : '',
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
              <div className="flex items-center space-x-2 mb-0.5">
                <h1 className="text-2xl font-bold text-gray-900 leading-tight">{user.name}</h1>
                {user.verified && (
                  <div className="flex items-center px-2 py-0.5 bg-blue-100 text-blue-800 rounded-full text-sm align-middle" style={{height: 'fit-content'}}>
                    <span>✓</span>
                    <span className="ml-1">Verified</span>
                  </div>
                )}
              </div>
              <div className="text-md text-gray-400 font-normal mb-1 -mt-1">@{user.username}</div>
              {(user.instagram || user.facebook || user.snapchat || user.phone || user.tiktok || user.whatsapp) && (
                <div className="flex items-center space-x-3 mb-1">
                  {user.instagram && (
                    <a href={`https://instagram.com/${user.instagram}`} target="_blank" rel="noopener noreferrer" title="Instagram">
                      <svg className="w-5 h-5 text-pink-500 hover:text-pink-600" fill="currentColor" viewBox="0 0 24 24"><path d="M7.75 2h8.5A5.75 5.75 0 0 1 22 7.75v8.5A5.75 5.75 0 0 1 16.25 22h-8.5A5.75 5.75 0 0 1 2 16.25v-8.5A5.75 5.75 0 0 1 7.75 2zm0 1.5A4.25 4.25 0 0 0 3.5 7.75v8.5A4.25 4.25 0 0 0 7.75 20.5h8.5A4.25 4.25 0 0 0 20.5 16.25v-8.5A4.25 4.25 0 0 0 16.25 3.5h-8.5zm4.25 3.25a5.25 5.25 0 1 1 0 10.5 5.25 5.25 0 0 1 0-10.5zm0 1.5a3.75 3.75 0 1 0 0 7.5 3.75 3.75 0 0 0 0-7.5zm5.25.75a1 1 0 1 1 0 2 1 1 0 0 1 0-2z"></path></svg>
                    </a>
                  )}
                  {user.facebook && (
                    <a href={`https://facebook.com/${user.facebook}`} target="_blank" rel="noopener noreferrer" title="Facebook">
                      <svg className="w-5 h-5 text-blue-600 hover:text-blue-700" fill="currentColor" viewBox="0 0 24 24"><path d="M17.525 8.998h-3.02V7.498c0-.583.39-.719.665-.719h2.31V3.998h-3.18c-2.25 0-2.77 1.68-2.77 2.77v2.23H7.998v3.5h2.532V20h3.5v-7.502h2.36l.375-3.5z"></path></svg>
                    </a>
                  )}
                  {user.snapchat && (
                    <a href={`https://snapchat.com/add/${user.snapchat}`} target="_blank" rel="noopener noreferrer" title="Snapchat">
                      <svg className="w-5 h-5 text-yellow-400 hover:text-yellow-500" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2C6.477 2 2 6.477 2 12c0 5.523 4.477 10 10 10s10-4.477 10-10c0-5.523-4.477-10-10-10zm0 1.5a8.5 8.5 0 1 1 0 17 8.5 8.5 0 0 1 0-17zm0 2.25c-1.38 0-2.5 1.12-2.5 2.5 0 .828.672 1.5 1.5 1.5h2c.828 0 1.5-.672 1.5-1.5 0-1.38-1.12-2.5-2.5-2.5zm0 10.25c-2.485 0-4.5-2.015-4.5-4.5h1.5a3 3 0 0 0 6 0h1.5c0 2.485-2.015 4.5-4.5 4.5zm0 2.25a1.25 1.25 0 1 1 0-2.5 1.25 1.25 0 0 1 0 2.5z"></path></svg>
                    </a>
                  )}
                  {user.tiktok && (
                    <a href={`https://tiktok.com/@${user.tiktok}`} target="_blank" rel="noopener noreferrer" title="TikTok">
                      <svg className="w-5 h-5 text-black hover:text-gray-700" fill="currentColor" viewBox="0 0 24 24"><path d="M12.004 2c2.21 0 4.004 1.794 4.004 4.004v7.992c0 2.21-1.794 4.004-4.004 4.004s-4.004-1.794-4.004-4.004c0-2.21 1.794-4.004 4.004-4.004.552 0 1 .448 1 1s-.448 1-1 1a2.003 2.003 0 1 0 2.003 2.003V6.004A2.003 2.003 0 0 0 12.004 4a2.003 2.003 0 0 0-2.003 2.003c0 .552-.448 1-1 1s-1-.448-1-1A4.004 4.004 0 0 1 12.004 2z"></path></svg>
                    </a>
                  )}
                  {user.whatsapp && (
                    <a href={`https://wa.me/${user.whatsapp.replace(/[^\d]/g, '')}`} target="_blank" rel="noopener noreferrer" title="WhatsApp">
                      <svg className="w-5 h-5 text-green-600 hover:text-green-700" fill="currentColor" viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.031-.967-.273-.099-.472-.148-.67.15-.197.297-.767.966-.94 1.164-.173.198-.347.223-.644.075-.297-.149-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.447-.52.149-.174.198-.298.298-.497.099-.198.05-.372-.025-.521-.075-.149-.669-1.611-.916-2.206-.242-.579-.487-.5-.669-.51-.173-.007-.372-.009-.571-.009-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.099 3.2 5.077 4.366.71.306 1.263.489 1.694.625.712.227 1.36.195 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.288.173-1.413-.074-.124-.272-.198-.57-.347zM12.004 2C6.477 2 2 6.477 2 12c0 1.989.521 3.889 1.514 5.563L2 22l4.594-1.497A9.953 9.953 0 0 0 12.004 22c5.523 0 10-4.477 10-10s-4.477-10-10-10z"></path></svg>
                    </a>
                  )}
                  {user.phone && (
                    <a href={`tel:${user.phone}`} title="Phone">
                      <svg className="w-5 h-5 text-green-500 hover:text-green-600" fill="currentColor" viewBox="0 0 24 24"><path d="M6.62 10.79a15.053 15.053 0 0 0 6.59 6.59l2.2-2.2a1.003 1.003 0 0 1 1.01-.24c1.12.37 2.33.57 3.58.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1C10.07 21 3 13.93 3 5c0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.46.57 3.58.13.34.04.73-.24 1.01l-2.2 2.2z"></path></svg>
                    </a>
                  )}
                </div>
              )}
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
                  <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
                  <input
                    type="text"
                    name="name"
                    value={editForm.name || ''}
                    onChange={handleEditChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Full Name"
                  />
                </div>
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
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Instagram Username</label>
                  <input
                    type="text"
                    name="instagram"
                    value={editForm.instagram}
                    onChange={handleEditChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="@instagram"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Facebook Username</label>
                  <input
                    type="text"
                    name="facebook"
                    value={editForm.facebook}
                    onChange={handleEditChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="@facebook"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Snapchat Username</label>
                  <input
                    type="text"
                    name="snapchat"
                    value={editForm.snapchat}
                    onChange={handleEditChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="@snapchat"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">TikTok Username</label>
                  <input
                    type="text"
                    name="tiktok"
                    value={editForm.tiktok}
                    onChange={handleEditChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="@tiktok"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">WhatsApp Number</label>
                  <input
                    type="text"
                    name="whatsapp"
                    value={editForm.whatsapp}
                    onChange={handleEditChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="WhatsApp number or @username"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
                  <input
                    type="tel"
                    name="phone"
                    value={editForm.phone}
                    onChange={handleEditChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Phone Number"
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
                    <div className="font-semibold text-gray-800 flex items-center mb-1 relative group">
                      {reviewer ? (
                        <>
                          <Link
                            to={`/${reviewer.username?.toLowerCase()}`}
                            className="hover:underline text-blue-700"
                            onMouseEnter={() => {
                              setIsHoveringName(true);
                              if (hoverTimeout.current) clearTimeout(hoverTimeout.current);
                              hoverTimeout.current = setTimeout(() => setHoveredReviewerId(review.reviewerId), 300);
                            }}
                            onMouseLeave={() => {
                              setIsHoveringName(false);
                              if (hoverTimeout.current) clearTimeout(hoverTimeout.current);
                              hoverTimeout.current = setTimeout(() => {
                                if (!isHoveringModal) setHoveredReviewerId(null);
                              }, 100);
                            }}
                          >
                            {reviewer.username}
                          </Link>
                          {hoveredReviewerId === review.reviewerId && (
                            <div
                              className="absolute bottom-full left-0 mb-2 z-50 w-64 bg-white rounded-lg shadow-lg border border-gray-200 p-4 animate-fade-in flex flex-col items-center"
                              onMouseEnter={() => {
                                setIsHoveringModal(true);
                                if (hoverTimeout.current) clearTimeout(hoverTimeout.current);
                              }}
                              onMouseLeave={() => {
                                setIsHoveringModal(false);
                                if (hoverTimeout.current) clearTimeout(hoverTimeout.current);
                                hoverTimeout.current = setTimeout(() => {
                                  if (!isHoveringName) setHoveredReviewerId(null);
                                }, 100);
                              }}
                            >
                              <img
                                src={process.env.PUBLIC_URL + '/' + reviewer.avatar}
                                alt={reviewer.username}
                                className="w-16 h-16 rounded-full object-cover mb-2"
                                onError={e => { e.currentTarget.src = `https://ui-avatars.com/api/?name=${reviewer.username}`; }}
                              />
                              <Link
                                to={`/${reviewer.username?.toLowerCase()}`}
                                className="font-bold text-gray-900 text-lg mb-0 hover:underline"
                              >
                                {reviewer.name}
                              </Link>
                              <div className="text-xs text-gray-400 mb-1">@{reviewer.username}</div>
                              {reviewer.bio && (
                                <div className="text-sm text-gray-600 mb-2 text-center">{reviewer.bio}</div>
                              )}
                              <button
                                className="px-3 py-1 bg-blue-600 text-white rounded hover:bg-blue-700 text-xs"
                                onClick={() => {
                                  if (!currentUser) {
                                    navigate('/signin', { state: { from: location.pathname } });
                                  } else {
                                    // Future: open chat modal
                                  }
                                }}
                              >
                                Message
                              </button>
                            </div>
                          )}
                        </>
                      ) : (
                        <span className="italic text-gray-400">Unknown user</span>
                      )}
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