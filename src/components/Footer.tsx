import React from 'react';
import { Link } from 'react-router-dom';
import { Heart, Globe, Shield, Users } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center space-x-2 mb-4">
              <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">NP</span>
              </div>
              <span className="text-xl font-bold">NomadPal</span>
            </div>
            <p className="text-gray-300 mb-4 max-w-md">
              Your trusted companion for authentic travel experiences. Connect with verified locals and fellow travelers worldwide.
            </p>
            <div className="flex space-x-4">
              <div className="flex items-center space-x-2 text-sm text-gray-400">
                <Shield className="w-4 h-4" />
                <span>Trust Verified</span>
              </div>
              <div className="flex items-center space-x-2 text-sm text-gray-400">
                <Users className="w-4 h-4" />
                <span>Community Driven</span>
              </div>
              <div className="flex items-center space-x-2 text-sm text-gray-400">
                <Globe className="w-4 h-4" />
                <span>Global Network</span>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/feed" className="text-gray-300 hover:text-white transition-colors">
                  Travel Feed
                </Link>
              </li>
              <li>
                <Link to="/trust" className="text-gray-300 hover:text-white transition-colors">
                  Trust Network
                </Link>
              </li>
              <li>
                <Link to="/concierge" className="text-gray-300 hover:text-white transition-colors">
                  AI Concierge
                </Link>
              </li>
              <li>
                <Link to="/profile" className="text-gray-300 hover:text-white transition-colors">
                  My Profile
                </Link>
              </li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Support</h3>
            <ul className="space-y-2">
              <li>
                <button className="text-gray-300 hover:text-white transition-colors">
                  Help Center
                </button>
              </li>
              <li>
                <button className="text-gray-300 hover:text-white transition-colors">
                  Safety Guidelines
                </button>
              </li>
              <li>
                <button className="text-gray-300 hover:text-white transition-colors">
                  Contact Us
                </button>
              </li>
              <li>
                <button className="text-gray-300 hover:text-white transition-colors">
                  Privacy Policy
                </button>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-400 text-sm">
            © 2024 NomadPal. Made with <Heart className="inline w-4 h-4 text-red-500" /> for travelers worldwide.
          </p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <button className="text-gray-400 hover:text-white transition-colors">
              Terms of Service
            </button>
            <button className="text-gray-400 hover:text-white transition-colors">
              Privacy Policy
            </button>
            <button className="text-gray-400 hover:text-white transition-colors">
              Cookie Policy
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer; 