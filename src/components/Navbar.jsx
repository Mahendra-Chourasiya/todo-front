import React, { useState } from 'react';
import { useAuth } from './context/AuthContext';
import logo from '../assets/logo.png';

function Navbar() {
  const { isAuthenticated, logout } = useAuth();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleLogout = () => {
    logout();
    setIsMenuOpen(false);
  };

  const handleMenuToggle = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className="p-4 bg-black text-white">
      <div className="container mx-auto flex justify-between items-center">
        {/* Logo and Title */}
        <div className="flex items-center space-x-4">
          <img
            src={logo}
            alt="Logo"
            className="h-10 w-10 rounded-full object-cover"
          />
          <a href="/" className="text-2xl font-bold hover:underline transition duration-300">
            Taskify™
          </a>
        </div>

        {/* Hamburger Menu */}
        <button
          className="lg:hidden p-2 rounded-md text-gray-400 hover:bg-gray-100 hover:text-black focus:outline-none"
          onClick={handleMenuToggle}
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7"></path>
          </svg>
        </button>

        {/* Navigation Links */}
        <div className={`lg:flex lg:space-x-6 ${isMenuOpen ? 'block' : 'hidden'} transition-transform duration-500 ease-in-out`}>
          {isAuthenticated ? (
            <button onClick={handleLogout} className="bg-red-600 hover:bg-blue-700 text-white px-4 py-2 rounded-full transition duration-300">
              Logout
            </button>
          ) : (
            <div className='flex gap-4'>
              <a href="/login" className="px-4 py-2 text-white bg-gradient-to-r from-green-500 via-green-600 to-green-700 hover:bg-gradient-to-br rounded-full transition-all duration-300">
                Login
              </a>
              <a href="/register" className="px-4 py-2 text-white bg-gradient-to-r from-green-500 via-green-600 to-green-700 hover:bg-gradient-to-br rounded-full transition-all duration-300">
                Register
              </a>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
