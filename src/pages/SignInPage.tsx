import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../store';
import { setUser, signOut } from '../slices/userSlice';

export default function SignInPage() {
  const dispatch = useDispatch();
  const users = useSelector((state: RootState) => state.user.users);
  const currentUser = useSelector((state: RootState) => state.user.currentUser);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    if (currentUser) {
      navigate(`/${currentUser.username}`);
    }
  }, [currentUser, navigate]);

  const handleSignIn = (e: React.FormEvent) => {
    e.preventDefault();
    // Match username or email to a user in context (case-insensitive)
    const user = users.find(
      u =>
        (u.username && u.username.toLowerCase() === email.toLowerCase()) ||
        (u.email && u.email.toLowerCase() === email.toLowerCase())
    );
    if (user && password === user.password) {
      dispatch(setUser(user));
      setError('');
      navigate('/');
    } else {
      setError('Invalid credentials. Try demo user or any user name.');
      dispatch(signOut());
    }
  };

  const handleDemo = () => {
    const user = users[0];
    dispatch(setUser(user));
    setError('');
    navigate('/');
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] py-12 px-4">
      <div className="w-full max-w-md bg-white rounded-lg shadow-md p-8 border border-gray-200">
        <h2 className="text-2xl font-bold text-center mb-6">Sign In to NomadPal</h2>
        <form onSubmit={handleSignIn} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Username or Email</label>
            <input
              type="text"
              value={email}
              onChange={e => setEmail(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="sami or Sami@nomadpal.com"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
            <input
              type="password"
              value={password}
              onChange={e => setPassword(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Sami123"
              required
            />
          </div>
          {error && <div className="text-red-600 text-sm">{error}</div>}
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded-md font-semibold hover:bg-blue-700 transition-colors"
          >
            Sign In
          </button>
        </form>
        <div className="mt-6 text-center">
          <button
            onClick={handleDemo}
            className="text-blue-600 hover:underline text-sm font-medium"
          >
            Sign in as Demo User
          </button>
        </div>
      </div>
    </div>
  );
} 