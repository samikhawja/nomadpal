import React from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../store';
import { setUsers, setUser } from '../slices/userSlice';

const schema = z.object({
  name: z.string().min(2, 'Name is required'),
  username: z.string().min(2, 'Username is required'),
  email: z.string().email('Invalid email'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
});

type FormData = z.infer<typeof schema>;

export default function SignUpPage() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const users = useSelector((state: RootState) => state.user.users);

  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  const onSubmit = (data: FormData) => {
    // Check for duplicate username or email
    if (users.some(u => u.username?.toLowerCase() === data.username.toLowerCase())) {
      setError('username', { type: 'manual', message: 'Username already exists' });
      return;
    }
    if (users.some(u => u.email?.toLowerCase() === data.email.toLowerCase())) {
      setError('email', { type: 'manual', message: 'Email already exists' });
      return;
    }
    // Create new user object
    const newUser = {
      id: 'user' + (users.length + 1),
      name: data.name,
      username: data.username,
      email: data.email,
      password: data.password,
      avatar: 'https://ui-avatars.com/api/?name=' + encodeURIComponent(data.name),
      location: 'Unknown',
      trustRating: 5.0,
      verified: false,
      memberSince: new Date().toISOString().split('T')[0],
      reviews: [],
      badges: [],
      bio: '',
    };
    const updatedUsers = [...users, newUser];
    dispatch(setUsers(updatedUsers));
    dispatch(setUser(newUser));
    localStorage.setItem('users', JSON.stringify(updatedUsers));
    localStorage.setItem('currentUser', JSON.stringify(newUser));
    navigate(`/${newUser.username}`);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] py-12 px-4">
      <div className="w-full max-w-md bg-white rounded-lg shadow-md p-8 border border-gray-200">
        <h2 className="text-2xl font-bold text-center mb-6">Create your account</h2>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <input
              type="text"
              {...register('name')}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Full Name"
            />
            {errors.name && <div className="text-red-600 text-sm mt-1">{errors.name.message}</div>}
          </div>
          <div>
            <input
              type="text"
              {...register('username')}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Username"
            />
            {errors.username && <div className="text-red-600 text-sm mt-1">{errors.username.message}</div>}
          </div>
          <div>
            <input
              type="email"
              {...register('email')}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Email"
            />
            {errors.email && <div className="text-red-600 text-sm mt-1">{errors.email.message}</div>}
          </div>
          <div>
            <input
              type="password"
              {...register('password')}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Password"
            />
            {errors.password && <div className="text-red-600 text-sm mt-1">{errors.password.message}</div>}
          </div>
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded-md font-semibold hover:bg-blue-700 transition-colors"
          >
            Sign Up
          </button>
        </form>
        <div className="mt-6 text-center">
          <button
            onClick={() => navigate('/signin')}
            className="text-blue-600 hover:underline text-sm font-medium"
          >
            Already have an account? Sign in
          </button>
        </div>
      </div>
    </div>
  );
} 