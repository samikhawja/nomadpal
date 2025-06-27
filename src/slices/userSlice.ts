import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface User {
  id: string;
  name?: string;
  username?: string;
  email?: string;
  avatar: string;
  location: string;
  trustRating: number;
  verified: boolean;
  memberSince: string;
  reviews: any[];
  password?: string;
  badges?: string[];
  bio?: string;
}

interface UserState {
  currentUser: User | null;
  users: User[];
}

const savedUser = typeof window !== 'undefined' ? localStorage.getItem('currentUser') : null;

console.log('[userSlice] Initial currentUser from localStorage:', savedUser);

const initialState: UserState = {
  currentUser: savedUser ? JSON.parse(savedUser) : null,
  users: [],
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser(state, action: PayloadAction<User | null>) {
      console.log('[userSlice] setUser called with:', action.payload);
      state.currentUser = action.payload;
    },
    setUsers(state, action: PayloadAction<User[]>) {
      state.users = action.payload;
    },
    signOut(state) {
      console.log('[userSlice] signOut called');
      state.currentUser = null;
    },
  },
});

export const { setUser, setUsers, signOut } = userSlice.actions;
export default userSlice.reducer; 