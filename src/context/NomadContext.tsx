import React, { createContext, useContext, useReducer, ReactNode } from 'react';

// Types
export interface User {
  id: string;
  name: string;
  avatar: string;
  location: string;
  trustRating: number;
  verified: boolean;
  memberSince: string;
  reviews: Review[];
}

export interface Post {
  id: string;
  userId: string;
  type: 'question' | 'offer' | 'review' | 'request';
  title: string;
  content: string;
  location: string;
  tags: string[];
  createdAt: string;
  replies: Reply[];
  upvotes: number;
  downvotes: number;
}

export interface Reply {
  id: string;
  userId: string;
  content: string;
  createdAt: string;
  helpful: boolean;
}

export interface Review {
  id: string;
  reviewerId: string;
  rating: number;
  comment: string;
  createdAt: string;
}

export interface Service {
  id: string;
  providerId: string;
  type: 'guide' | 'driver' | 'host' | 'tour';
  title: string;
  description: string;
  price: number;
  currency: string;
  location: string;
  rating: number;
  verified: boolean;
}

interface NomadState {
  currentUser: User | null;
  posts: Post[];
  services: Service[];
  users: User[];
  currentLocation: string;
}

type NomadAction =
  | { type: 'SET_USER'; payload: User }
  | { type: 'ADD_POST'; payload: Post }
  | { type: 'UPDATE_POST'; payload: Post }
  | { type: 'ADD_REPLY'; payload: { postId: string; reply: Reply } }
  | { type: 'SET_LOCATION'; payload: string }
  | { type: 'ADD_SERVICE'; payload: Service }
  | { type: 'UPDATE_TRUST_RATING'; payload: { userId: string; rating: number } };

const initialState: NomadState = {
  currentUser: null,
  posts: [],
  services: [],
  users: [],
  currentLocation: 'El Nido, Philippines'
};

const nomadReducer = (state: NomadState, action: NomadAction): NomadState => {
  switch (action.type) {
    case 'SET_USER':
      return { ...state, currentUser: action.payload };
    case 'ADD_POST':
      return { ...state, posts: [action.payload, ...state.posts] };
    case 'UPDATE_POST':
      return {
        ...state,
        posts: state.posts.map(post => 
          post.id === action.payload.id ? action.payload : post
        )
      };
    case 'ADD_REPLY':
      return {
        ...state,
        posts: state.posts.map(post =>
          post.id === action.payload.postId
            ? { ...post, replies: [...post.replies, action.payload.reply] }
            : post
        )
      };
    case 'SET_LOCATION':
      return { ...state, currentLocation: action.payload };
    case 'ADD_SERVICE':
      return { ...state, services: [...state.services, action.payload] };
    case 'UPDATE_TRUST_RATING':
      return {
        ...state,
        users: state.users.map(user =>
          user.id === action.payload.userId
            ? { ...user, trustRating: action.payload.rating }
            : user
        )
      };
    default:
      return state;
  }
};

interface NomadContextType {
  state: NomadState;
  dispatch: React.Dispatch<NomadAction>;
}

const NomadContext = createContext<NomadContextType | undefined>(undefined);

export const useNomad = () => {
  const context = useContext(NomadContext);
  if (context === undefined) {
    throw new Error('useNomad must be used within a NomadProvider');
  }
  return context;
};

interface NomadProviderProps {
  children: ReactNode;
}

export const NomadProvider: React.FC<NomadProviderProps> = ({ children }) => {
  const [state, dispatch] = useReducer(nomadReducer, initialState);

  return (
    <NomadContext.Provider value={{ state, dispatch }}>
      {children}
    </NomadContext.Provider>
  );
}; 