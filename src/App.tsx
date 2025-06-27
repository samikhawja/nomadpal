import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import HomePage from './pages/HomePage';
import FeedPage from './pages/FeedPage';
import ProfilePage from './pages/ProfilePage';
import TrustPage from './pages/TrustPage';
import ConciergePage from './pages/ConciergePage';
import SignInPage from './pages/SignInPage';
import SignUpPage from './pages/SignUpPage';
import { useDispatch, useSelector } from 'react-redux';
import { setUsers } from './slices/userSlice';
import { setPosts } from './slices/postSlice';
import { setServices } from './slices/serviceSlice';
import { setLocation } from './slices/locationSlice';
import { RootState } from './store';

function App() {
  const dispatch = useDispatch();
  const currentUser = useSelector((state: RootState) => state.user.currentUser);

  useEffect(() => {
    const loadData = async () => {
      const response = await fetch(process.env.PUBLIC_URL + '/data/data.json');
      const data = await response.json();
      dispatch(setUsers(data.users));
      dispatch(setPosts(data.posts));
      dispatch(setServices(data.services));
      if (data.users && data.users[0]?.location) {
        dispatch(setLocation(data.users[0].location));
      }
    };
    loadData();
  }, [dispatch]);

  useEffect(() => {
    console.log('[App] Saving currentUser to localStorage:', currentUser);
    if (currentUser) {
      localStorage.setItem('currentUser', JSON.stringify(currentUser));
    } else {
      localStorage.removeItem('currentUser');
    }
  }, [currentUser]);

  return (
    <Router basename="/nomadpal">
      <div className="App min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
        <Header />
        <main className="flex-1">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/feed" element={<FeedPage />} />
            <Route path=":username" element={<ProfilePage />} />
            <Route path="/trust" element={<TrustPage />} />
            <Route path="/concierge" element={<ConciergePage />} />
            <Route path="/signin" element={<SignInPage />} />
            <Route path="/signup" element={<SignUpPage />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
