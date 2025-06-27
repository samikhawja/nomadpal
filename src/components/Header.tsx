import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { MapPin, User, Bell, Search, Menu, X } from 'lucide-react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../store';
import { signOut } from '../slices/userSlice';

const Header: React.FC = () => {
  const currentUser = useSelector((state: RootState) => state.user.currentUser);
  const currentLocation = useSelector((state: RootState) => state.location.currentLocation) || 'Unknown';
  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLocationOpen, setIsLocationOpen] = useState(false);
  const [isUserDropdownOpen, setIsUserDropdownOpen] = useState(false);

  const navigation = [
    { name: 'Home', href: '/' },
    { name: 'Feed', href: '/feed' },
    { name: 'Trust', href: '/trust' },
    { name: 'Concierge', href: '/concierge' },
  ];

  const popularLocations = [
    'El Nido, Philippines',
    'Bali, Indonesia',
    'Chiang Mai, Thailand',
    'Hanoi, Vietnam',
    'Siem Reap, Cambodia',
    'Pokhara, Nepal',
  ];

  const handleLocationChange = (newLocation: string) => {
    dispatch({ type: 'SET_LOCATION', payload: newLocation });
    setIsLocationOpen(false);
  };

  return (
    <header className="bg-white shadow-sm border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex items-center">
            <Link to="/" className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">NP</span>
              </div>
              <span className="text-xl font-bold text-gray-900">NomadPal</span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-8">
            {navigation.map((item) => (
              <Link
                key={item.name}
                to={item.href}
                className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                  location.pathname === item.href
                    ? 'text-blue-600 bg-blue-50'
                    : 'text-gray-700 hover:text-blue-600 hover:bg-gray-50'
                }`}
              >
                {item.name}
              </Link>
            ))}
          </nav>

          {/* Location Selector */}
          <div className="hidden md:block relative">
            <button
              onClick={() => setIsLocationOpen(!isLocationOpen)}
              className="flex items-center space-x-2 px-3 py-2 text-sm text-gray-700 hover:text-blue-600 transition-colors"
            >
              <MapPin className="w-4 h-4" />
              <span>{currentLocation}</span>
            </button>

            {isLocationOpen && (
              <div className="absolute right-0 mt-2 w-64 bg-white rounded-md shadow-lg border border-gray-200 z-50">
                <div className="py-2">
                  {popularLocations.map((loc) => (
                    <button
                      key={loc}
                      onClick={() => handleLocationChange(loc)}
                      className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
                    >
                      {loc}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Search */}
          <div className="hidden md:flex items-center space-x-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <input
                type="text"
                placeholder="Search posts, services..."
                className="pl-10 pr-4 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
          </div>

          {/* User Menu */}
          <div className="flex items-center space-x-4">
            <button className="hidden md:block p-2 text-gray-400 hover:text-gray-600">
              <Bell className="w-5 h-5" />
            </button>
            
            {currentUser ? (
              <div className="flex items-center space-x-2 relative">
                <button
                  className="flex items-center space-x-2 focus:outline-none"
                  onClick={() => setIsUserDropdownOpen((open) => !open)}
                >
                  <img
                    src={process.env.PUBLIC_URL + '/' + currentUser.avatar}
                    alt={currentUser.username}
                    className="w-8 h-8 rounded-full"
                    onError={e => { e.currentTarget.src = `https://ui-avatars.com/api/?name=${currentUser.username}`; }}
                  />
                  <span className="hidden md:block text-sm font-medium text-gray-700">
                    {currentUser.username}
                  </span>
                </button>
                {isUserDropdownOpen && (
                  <div className="absolute right-0 top-full mt-1 w-44 bg-white rounded-md shadow-lg border border-gray-200 z-50">
                    <div className="py-1">
                      <button
                        className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                        onClick={() => {
                          setIsUserDropdownOpen(false);
                          navigate(`/${currentUser.username}`);
                        }}
                      >
                        Profile
                      </button>
                      <button
                        className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                        onClick={() => {
                          setIsUserDropdownOpen(false);
                          // Placeholder for settings
                          alert('Settings page coming soon!');
                        }}
                      >
                        Settings
                      </button>
                      <button
                        className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-100"
                        onClick={() => {
                          setIsUserDropdownOpen(false);
                          dispatch(signOut());
                          navigate(location.pathname);
                        }}
                      >
                        Sign Out
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <Link to="/signin" state={{ from: location.pathname }} className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors">
                <User className="w-4 h-4" />
                <span className="text-sm font-medium">Sign In</span>
              </Link>
            )}

            {/* Mobile menu button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden p-2 text-gray-400 hover:text-gray-600"
            >
              {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        {isMenuOpen && (
          <div className="md:hidden border-t border-gray-200">
            <div className="px-2 pt-2 pb-3 space-y-1">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  to={item.href}
                  className={`block px-3 py-2 rounded-md text-base font-medium ${
                    location.pathname === item.href
                      ? 'text-blue-600 bg-blue-50'
                      : 'text-gray-700 hover:text-blue-600 hover:bg-gray-50'
                  }`}
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item.name}
                </Link>
              ))}
              
              {/* Mobile location selector */}
              <div className="px-3 py-2">
                <div className="text-sm font-medium text-gray-500 mb-2">Location</div>
                <select
                  value={currentLocation}
                  onChange={(e) => handleLocationChange(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm"
                >
                  {popularLocations.map((loc) => (
                    <option key={loc} value={loc}>
                      {loc}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header; 