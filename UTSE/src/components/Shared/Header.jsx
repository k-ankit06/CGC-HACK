import { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../Auth/AuthContext';
import { motion, AnimatePresence } from 'framer-motion';

const Header = () => {
  const { user, logout } = useAuth();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const toggleProfile = () => {
    setIsProfileOpen(!isProfileOpen);
  };

  const handleLogout = () => {
    logout();
    setIsProfileOpen(false);
  };

  const isTouristRoute = location.pathname.startsWith('/tourist');
  const isAuthorityRoute = location.pathname.startsWith('/authority');

  return (
    <header className={`bg-indigo-700 text-white shadow-md ${isTouristRoute ? 'tourist-header' : 'authority-header'}`}>
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
        <div className="flex items-center">
          <button
            onClick={toggleMenu}
            className="lg:hidden focus:outline-none"
            aria-label="Toggle menu"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          </button>
          <Link to={isTouristRoute ? '/tourist/dashboard' : '/authority/dashboard'} className="ml-2">
            <h1 className="text-xl font-bold">
              {isTouristRoute ? 'Tourist Safety' : 'Authority Dashboard'}
            </h1>
          </Link>
        </div>

        <div className="hidden lg:flex items-center space-x-4">
          {isTouristRoute && (
            <>
              <Link
                to="/tourist/dashboard"
                className={`hover:text-indigo-200 ${location.pathname === '/tourist/dashboard' ? 'text-white font-medium' : ''}`}
              >
                Dashboard
              </Link>
              <Link
                to="/tourist/safe-routes"
                className={`hover:text-indigo-200 ${location.pathname === '/tourist/safe-routes' ? 'text-white font-medium' : ''}`}
              >
                Safe Routes
              </Link>
              <Link
                to="/tourist/safety-info"
                className={`hover:text-indigo-200 ${location.pathname === '/tourist/safety-info' ? 'text-white font-medium' : ''}`}
              >
                Safety Info
              </Link>
              <Link
                to="/tourist/emergency-help"
                className={`hover:text-indigo-200 ${location.pathname === '/tourist/emergency-help' ? 'text-white font-medium' : ''}`}
              >
                Emergency Help
              </Link>
            </>
          )}

          {isAuthorityRoute && (
            <>
              <Link
                to="/authority/dashboard"
                className={`hover:text-indigo-200 ${location.pathname === '/authority/dashboard' ? 'text-white font-medium' : ''}`}
              >
                Dashboard
              </Link>
              <Link
                to="/authority/risk-assessment"
                className={`hover:text-indigo-200 ${location.pathname === '/authority/risk-assessment' ? 'text-white font-medium' : ''}`}
              >
                Risk Assessment
              </Link>
              <Link
                to="/authority/incident-management"
                className={`hover:text-indigo-200 ${location.pathname === '/authority/incident-management' ? 'text-white font-medium' : ''}`}
              >
                Incident Management
              </Link>
              <Link
                to="/authority/emergency-response"
                className={`hover:text-indigo-200 ${location.pathname === '/authority/emergency-response' ? 'text-white font-medium' : ''}`}
              >
                Emergency Response
              </Link>
              <Link
                to="/authority/analytics"
                className={`hover:text-indigo-200 ${location.pathname === '/authority/analytics' ? 'text-white font-medium' : ''}`}
              >
                Analytics
              </Link>
            </>
          )}
        </div>

        <div className="flex items-center space-x-4">
          <div className="hidden md:block">
            <p className="text-sm">Welcome, {user?.name || (isTouristRoute ? 'Tourist' : 'Authority')}</p>
          </div>

          <div className="relative">
            <button
              onClick={toggleProfile}
              className="flex items-center focus:outline-none"
              aria-label="User profile"
            >
              <div className="w-8 h-8 bg-indigo-200 rounded-full flex items-center justify-center text-indigo-700 font-medium">
                {user?.name?.charAt(0) || (isTouristRoute ? 'T' : 'A')}
              </div>
            </button>

            <AnimatePresence>
              {isProfileOpen && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.2 }}
                  className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-50"
                >
                  <Link
                    to={isTouristRoute ? '/tourist/dashboard' : '/authority/dashboard'}
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 flex items-center"
                    onClick={() => setIsProfileOpen(false)}
                  >
                    <i className="fas fa-home mr-2 text-gray-500"></i>
                    Dashboard
                  </Link>
                  <Link
                    to={isTouristRoute ? '/tourist/my-tourist-card' : '/authority/dashboard'}
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 flex items-center"
                    onClick={() => setIsProfileOpen(false)}
                  >
                    <i className="fas fa-id-card mr-2 text-gray-500"></i>
                    {isTouristRoute ? 'My Card' : 'Profile'}
                  </Link>
                  <button
                    onClick={handleLogout}
                    className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 flex items-center"
                  >
                    <i className="fas fa-sign-out-alt mr-2 text-gray-500"></i>
                    Logout
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="lg:hidden bg-indigo-800 text-white"
          >
            <div className="container mx-auto px-4 py-2">
              {isTouristRoute && (
                <>
                  <Link
                    to="/tourist/dashboard"
                    className={`block py-2 hover:bg-indigo-600 rounded ${location.pathname === '/tourist/dashboard' ? 'bg-indigo-600' : ''}`}
                    onClick={toggleMenu}
                  >
                    Dashboard
                  </Link>
                  <Link
                    to="/tourist/safe-routes"
                    className={`block py-2 hover:bg-indigo-600 rounded ${location.pathname === '/tourist/safe-routes' ? 'bg-indigo-600' : ''}`}
                    onClick={toggleMenu}
                  >
                    Safe Routes
                  </Link>
                  <Link
                    to="/tourist/safety-info"
                    className={`block py-2 hover:bg-indigo-600 rounded ${location.pathname === '/tourist/safety-info' ? 'bg-indigo-600' : ''}`}
                    onClick={toggleMenu}
                  >
                    Safety Info
                  </Link>
                  <Link
                    to="/tourist/emergency-help"
                    className={`block py-2 hover:bg-indigo-600 rounded ${location.pathname === '/tourist/emergency-help' ? 'bg-indigo-600' : ''}`}
                    onClick={toggleMenu}
                  >
                    Emergency Help
                  </Link>
                </>
              )}

              {isAuthorityRoute && (
                <>
                  <Link
                    to="/authority/dashboard"
                    className={`block py-2 hover:bg-indigo-600 rounded ${location.pathname === '/authority/dashboard' ? 'bg-indigo-600' : ''}`}
                    onClick={toggleMenu}
                  >
                    Dashboard
                  </Link>
                  <Link
                    to="/authority/risk-assessment"
                    className={`block py-2 hover:bg-indigo-600 rounded ${location.pathname === '/authority/risk-assessment' ? 'bg-indigo-600' : ''}`}
                    onClick={toggleMenu}
                  >
                    Risk Assessment
                  </Link>
                  <Link
                    to="/authority/incident-management"
                    className={`block py-2 hover:bg-indigo-600 rounded ${location.pathname === '/authority/incident-management' ? 'bg-indigo-600' : ''}`}
                    onClick={toggleMenu}
                  >
                    Incident Management
                  </Link>
                  <Link
                    to="/authority/emergency-response"
                    className={`block py-2 hover:bg-indigo-600 rounded ${location.pathname === '/authority/emergency-response' ? 'bg-indigo-600' : ''}`}
                    onClick={toggleMenu}
                  >
                    Emergency Response
                  </Link>
                  <Link
                    to="/authority/analytics"
                    className={`block py-2 hover:bg-indigo-600 rounded ${location.pathname === '/authority/analytics' ? 'bg-indigo-600' : ''}`}
                    onClick={toggleMenu}
                  >
                    Analytics
                  </Link>
                </>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Header;