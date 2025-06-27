import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import HomePage from './pages/HomePage';
import FeedPage from './pages/FeedPage';
import ProfilePage from './pages/ProfilePage';
import TrustPage from './pages/TrustPage';
import ConciergePage from './pages/ConciergePage';
import { NomadProvider } from './context/NomadContext';

function App() {
  return (
    <NomadProvider>
      <Router basename="/nomadpal">
        <div className="App min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
          <Header />
          <main className="flex-1">
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/feed" element={<FeedPage />} />
              <Route path="/profile" element={<ProfilePage />} />
              <Route path="/trust" element={<TrustPage />} />
              <Route path="/concierge" element={<ConciergePage />} />
            </Routes>
          </main>
          <Footer />
        </div>
      </Router>
    </NomadProvider>
  );
}

export default App;
