import React, { useState, useRef, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAtom } from 'jotai';
import { authAtom } from '../../../atoms/authAtom';
import useLogin from '../../../hooks/useLogin';

const Header = () => {
  const [auth] = useAtom(authAtom);
  const { isAuthenticated, user } = auth;
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuRef = useRef(null);
  const { logout } = useLogin();

  const handleLogout = () => {
    logout();
    setIsMenuOpen(false);
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setIsMenuOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const renderDesktopMenu = () => (
    <div className="hidden md:flex items-center space-x-6">
      {!isAuthenticated ? (
        <>
          <Link
            to="/login"
            className="text-gray-600 hover:text-blue-600 transition duration-150 ease-in-out"
          >
            Login
          </Link>
          <Link
            to="/register"
            className="bg-blue-500 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-full transition duration-150 ease-in-out"
          >
            Sign Up
          </Link>
        </>
      ) : (
        <>
          <div className="relative">
            <button
              onClick={toggleMenu}
              className="text-gray-600 hover:text-blue-600 transition duration-150 ease-in-out flex items-center"
            >
              {user ? user.name : 'User'}
              <svg
                className="ml-2 -mr-1 h-5 w-5"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
                aria-hidden="true"
              >
                <path
                  fillRule="evenodd"
                  d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 011.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                  clipRule="evenodd"
                />
              </svg>
            </button>
            {isMenuOpen && (
              <div className="absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5">
                <div
                  className="py-1"
                  role="menu"
                  aria-orientation="vertical"
                  aria-labelledby="options-menu"
                >
                  {renderMenuItems()}
                </div>
              </div>
            )}
          </div>
          <button
            onClick={handleLogout}
            className="bg-red-500 hover:bg-red-600 text-white font-medium py-2 px-4 rounded-full transition duration-150 ease-in-out"
          >
            Logout
          </button>
        </>
      )}
    </div>
  );

  const renderMobileMenu = () => (
    <div className="md:hidden">
      <button
        onClick={toggleMenu}
        className="text-blue-600 hover:text-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
      >
        <svg
          className="h-6 w-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          {isMenuOpen ? (
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M6 18L18 6M6 6l12 12"
            />
          ) : (
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4 6h16M4 12h16M4 18h16"
            />
          )}
        </svg>
      </button>
      {isMenuOpen && (
        <div className="absolute top-20 left-0 right-0 bg-white shadow-md">
          <div className="px-2 pt-2 pb-3 space-y-1">
            {!isAuthenticated ? (
              <>
                <Link
                  to="/login"
                  className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-blue-600 hover:bg-blue-50 transition duration-150 ease-in-out"
                >
                  Login
                </Link>
                <Link
                  to="/register"
                  className="block px-3 py-2 rounded-md text-base font-medium text-white bg-blue-600 hover:bg-blue-700 transition duration-150 ease-in-out"
                >
                  Sign Up
                </Link>
              </>
            ) : (
              renderMenuItems()
            )}
          </div>
        </div>
      )}
    </div>
  );

  const renderMenuItems = () => (
    <>
      {user && user.role === 'talent' && (
        <Link
          to="/talent/profile"
          className="block px-4 py-2 text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-600"
        >
          Profile
        </Link>
      )}
      {user && user.role === 'recruiter' && (
        <>
          {' '}
          <Link
            to="/recruiter/dashboard"
            className="block px-4 py-2 text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-600"
          >
            Dashboard
          </Link>
          <Link
            to={`/recruiter/company-profile/${user.userId}`}
            className="block px-4 py-2 text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-600"
          >
            Company Profile
          </Link>
        </>
      )}
      {isAuthenticated && (
        <button
          onClick={handleLogout}
          className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50 hover:text-red-700 md:hidden"
        >
          Logout
        </button>
      )}
    </>
  );

  return (
    <header className="bg-white shadow-md">
      <nav className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          <Link to="/job-listings" className="flex items-center">
            <span className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-blue-400 bg-clip-text text-transparent">
              JobSquare
            </span>
          </Link>
          {renderDesktopMenu()}
          {renderMobileMenu()}
        </div>
      </nav>
    </header>
  );
};

export default Header;
