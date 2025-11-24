import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { FaUser, FaChevronDown, FaSignOutAlt } from "react-icons/fa";

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const { user, logout } = useAuth();

  const handleLogout = () => {
    logout();
    setIsProfileOpen(false);
    setIsMenuOpen(false);
  };

  return (
    <nav className="w-full py-3 md:py-4 lg:py-5 bg-black/30 backdrop-blur-md rounded-none md:rounded-full max-w-7xl mx-auto px-4 md:px-6 fixed top-0 md:top-5 left-0 right-0 z-50">
      <div className="flex justify-between items-center">
        {/* Logo */}
        <Link to="/" className="text-lg md:text-xl lg:text-2xl font-bold text-white">
          Fac Hotel
        </Link>

        {/* Menu Desktop */}
        <div className="hidden md:flex items-center gap-4 lg:gap-6 xl:gap-8 text-white font-medium text-sm lg:text-base">
          <Link to="/" className="hover:text-gray-300 transition-colors">Home</Link>
          <Link to="/chambres" className="hover:text-gray-300 transition-colors">Chambres</Link>
          <Link to="/reservation" className="hover:text-gray-300 transition-colors">Réserver</Link>
          <Link to="/about" className="hover:text-gray-300 transition-colors">About Us</Link>
          <Link to="/contact" className="hover:text-gray-300 transition-colors">Contact</Link>
          
          {/* Section utilisateur */}
          {user ? (
            <div className="relative">
              <button
                onClick={() => setIsProfileOpen(!isProfileOpen)}
                className="flex items-center gap-2 hover:text-gray-300 transition-colors"
              >
                <FaUser className="text-sm" />
                <span>Mon compte</span>
                <FaChevronDown className="text-xs" />
              </button>

              {isProfileOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white/95 backdrop-blur-md rounded-lg shadow-xl border border-white/20 py-2">
                  <Link
                    to="/profil"
                    className="block px-4 py-2 text-gray-800 hover:bg-gray-100 transition-colors"
                    onClick={() => setIsProfileOpen(false)}
                  >
                    Mon profil
                  </Link>
                  <button
                    onClick={handleLogout}
                    className="w-full text-left px-4 py-2 text-red-600 hover:bg-red-50 transition-colors flex items-center gap-2"
                  >
                    <FaSignOutAlt />
                    Déconnexion
                  </button>
                </div>
              )}
            </div>
          ) : (
            <div className="flex items-center gap-4">
              <Link
                to="/connexion"
                className="hover:text-gray-300 transition-colors"
              >
                Connexion
              </Link>
              <Link
                to="/inscription"
                className="bg-white text-black px-4 py-2 rounded-full hover:bg-gray-200 transition-colors font-medium"
              >
                Inscription
              </Link>
            </div>
          )}
        </div>

        {/* Menu Mobile Hamburger */}
        <button 
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="md:hidden text-white p-2 focus:outline-none"
          aria-label="Menu"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            {isMenuOpen ? (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            )}
          </svg>
        </button>
      </div>

      {/* Menu Mobile Dropdown */}
      {isMenuOpen && (
        <div className="md:hidden absolute top-full left-0 w-full bg-black/95 backdrop-blur-md border-t border-white/20">
          <div className="flex flex-col items-center py-4 space-y-4">
            <Link 
              to="/" 
              className="text-white hover:text-gray-300 transition-colors text-lg font-medium w-full text-center py-2"
              onClick={() => setIsMenuOpen(false)}
            >
              Home
            </Link>
            <Link 
              to="/chambres" 
              className="text-white hover:text-gray-300 transition-colors text-lg font-medium w-full text-center py-2"
              onClick={() => setIsMenuOpen(false)}
            >
              Chambres
            </Link>
            <Link 
              to="/reservation" 
              className="text-white hover:text-gray-300 transition-colors text-lg font-medium w-full text-center py-2"
              onClick={() => setIsMenuOpen(false)}
            >
              Réserver
            </Link>
            <Link 
              to="/about" 
              className="text-white hover:text-gray-300 transition-colors text-lg font-medium w-full text-center py-2"
              onClick={() => setIsMenuOpen(false)}
            >
              About Us
            </Link>
            <Link 
              to="/contact" 
              className="text-white hover:text-gray-300 transition-colors text-lg font-medium w-full text-center py-2"
              onClick={() => setIsMenuOpen(false)}
            >
              Contact
            </Link>

            {/* Section utilisateur mobile */}
            {user ? (
              <div className="w-full border-t border-white/20 pt-4 space-y-2">
                <Link 
                  to="/profil" 
                  className="text-white hover:text-gray-300 transition-colors text-lg font-medium w-full text-center py-2 block"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Mon profil
                </Link>
                <button
                  onClick={handleLogout}
                  className="text-red-400 hover:text-red-300 transition-colors text-lg font-medium w-full text-center py-2"
                >
                  Déconnexion
                </button>
              </div>
            ) : (
              <div className="w-full border-t border-white/20 pt-4 space-y-2">
                <Link 
                  to="/connexion" 
                  className="text-white hover:text-gray-300 transition-colors text-lg font-medium w-full text-center py-2 block"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Connexion
                </Link>
                <Link 
                  to="/inscription" 
                  className="bg-white text-black rounded-full py-2 text-lg font-medium w-full text-center block hover:bg-gray-200 transition-colors"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Inscription
                </Link>
              </div>
            )}
          </div>
        </div>
      )}
    </nav>
  );
}