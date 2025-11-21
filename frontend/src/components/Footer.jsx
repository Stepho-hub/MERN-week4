import React from 'react';
import { Link } from 'react-router-dom';
import { useTheme } from '../ThemeContext';

const Footer = () => {
  const { isDark } = useTheme();
  return (
    <footer className={`p-10 mt-10 rounded-xl shadow-lg ${isDark ? 'bg-gray-800 text-white' : 'bg-gray-50 text-black'}`}>
      <div className="flex flex-wrap justify-between gap-8 max-w-6xl mx-auto">
        <div className="flex-1 min-w-48">
          <h3 className="text-2xl font-bold mb-3">Post Blog</h3>
          <p className="mb-3 leading-relaxed">A modern blogging platform.</p>
        </div>
        <div className="flex-1 min-w-48">
          <h4 className="text-lg font-semibold mb-3">Quick Links</h4>
          <ul className="list-none p-0">
            <li className="mb-2"><Link to="/" className={`no-underline transition-colors duration-300 ${isDark ? 'text-white hover:text-gray-400' : 'text-black hover:text-gray-600'}`}>Home</Link></li>
            <li className="mb-2"><Link to="/create" className={`no-underline transition-colors duration-300 ${isDark ? 'text-white hover:text-gray-400' : 'text-black hover:text-gray-600'}`}>Create Post</Link></li>
            <li className="mb-2"><Link to="/login" className={`no-underline transition-colors duration-300 ${isDark ? 'text-white hover:text-gray-400' : 'text-black hover:text-gray-600'}`}>Login</Link></li>
            <li className="mb-2"><Link to="/register" className={`no-underline transition-colors duration-300 ${isDark ? 'text-white hover:text-gray-400' : 'text-black hover:text-gray-600'}`}>Register</Link></li>
          </ul>
        </div>
        <div className="flex-1 min-w-48">
          <h4 className="text-lg font-semibold mb-3">Contact</h4>
          <p className="mb-2">Email: info@mernblog.com</p>
          <p className="mb-2">Phone: +254 707855656</p>
        </div>
      </div>
      <div className={`text-center mt-8 pt-5 border-t max-w-6xl mx-auto ${isDark ? 'border-gray-600' : 'border-gray-300'}`}>
        <p className={`m-0 text-sm ${isDark ? 'text-white' : 'text-black'}`}>&copy; 2025 Blog. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;