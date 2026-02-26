import { useState, useRef, useEffect } from 'react';
import { Outlet, Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../Auth/AuthContext';
import {
  Shield, LayoutDashboard, Users, AlertTriangle, TrendingUp, FileText, CreditCard, Headphones,
  LogOut, Bell, User, Edit, ChevronRight
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const AuthorityLayout = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  const handleLogout = () => { logout(); navigate('/login'); };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) setIsDropdownOpen(false);
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [dropdownRef]);

  const menuItems = [
    { path: '/authority/dashboard', icon: LayoutDashboard, label: 'Dashboard' },
    { path: '/authority/monitoring', icon: Users, label: 'Tourist Monitoring' },
    { path: '/authority/emergency', icon: AlertTriangle, label: 'Emergency Response' },
    { path: '/authority/risk', icon: TrendingUp, label: 'Risk Assessment' },
    { path: '/authority/incidents', icon: FileText, label: 'Incident Management' },
    { path: '/authority/smart-id', icon: CreditCard, label: 'Smart ID System' },
    { path: '/authority/response-team', icon: Headphones, label: 'Response Team' },
    { path: '/authority/analytics', icon: TrendingUp, label: 'Analytics' },
  ];

  return (
    <div className="min-h-screen relative overflow-hidden" style={{ background: 'linear-gradient(135deg, #0a0a1a 0%, #1a0a2e 25%, #16213e 50%, #0a192f 75%, #0a0a1a 100%)' }}>
      {/* Animated BG Blobs */}
      <motion.div className="fixed w-[600px] h-[600px] rounded-full opacity-10 pointer-events-none" style={{ background: 'radial-gradient(circle, #06b6d4, transparent 70%)', top: '-15%', right: '-10%', filter: 'blur(100px)' }} animate={{ x: [0, -50, 0], y: [0, 30, 0] }} transition={{ duration: 15, repeat: Infinity, ease: 'easeInOut' }} />
      <motion.div className="fixed w-[500px] h-[500px] rounded-full opacity-10 pointer-events-none" style={{ background: 'radial-gradient(circle, #8b5cf6, transparent 70%)', bottom: '-10%', left: '-5%', filter: 'blur(100px)' }} animate={{ x: [0, 40, 0], y: [0, -30, 0] }} transition={{ duration: 18, repeat: Infinity, ease: 'easeInOut' }} />
      <motion.div className="fixed w-[400px] h-[400px] rounded-full opacity-8 pointer-events-none" style={{ background: 'radial-gradient(circle, #10b981, transparent 70%)', top: '50%', left: '30%', filter: 'blur(100px)' }} animate={{ x: [0, -30, 30, 0], y: [0, 20, -20, 0] }} transition={{ duration: 20, repeat: Infinity, ease: 'easeInOut' }} />

      {/* Header */}
      <motion.header initial={{ y: -50, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ duration: 0.5 }}
        className="sticky top-0 z-50" style={{ background: 'rgba(10, 10, 26, 0.85)', backdropFilter: 'blur(20px)', WebkitBackdropFilter: 'blur(20px)', borderBottom: '1px solid rgba(255,255,255,0.08)', boxShadow: '0 8px 32px rgba(0,0,0,0.3)' }}>
        <div className="px-6 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <motion.div whileHover={{ rotate: 360 }} transition={{ duration: 0.5 }} className="p-2 rounded-full" style={{ background: 'linear-gradient(135deg, #06b6d4, #0891b2)', boxShadow: '0 4px 15px rgba(6,182,212,0.4)' }}>
              <Shield className="h-8 w-8 text-white" />
            </motion.div>
            <div>
              <h1 className="text-2xl font-bold text-white" style={{ textShadow: '0 0 20px rgba(6,182,212,0.3)' }}>Authority Dashboard</h1>
              <p className="text-sm" style={{ color: 'rgba(153,246,228,0.5)' }}>Tourist Safety Control Center 🚀</p>
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <motion.button whileHover={{ scale: 1.1 }} className="relative p-2 rounded-lg transition-colors" style={{ color: 'rgba(153,246,228,0.7)' }} title="Notifications">
              <Bell className="h-6 w-6" />
              <span className="absolute top-1 right-1 h-3 w-3 rounded-full animate-pulse" style={{ background: '#ef4444', boxShadow: '0 0 10px rgba(239,68,68,0.5)' }} />
            </motion.button>
            <div className="relative pl-4" style={{ borderLeft: '1px solid rgba(255,255,255,0.1)' }} ref={dropdownRef}>
              <button onClick={() => setIsDropdownOpen(!isDropdownOpen)} className="flex items-center space-x-3">
                <div className="text-right">
                  <p className="text-sm font-semibold text-white">{user?.name}</p>
                  <p className="text-xs" style={{ color: 'rgba(153,246,228,0.4)' }}>{user?.designation || 'Authority'}</p>
                </div>
                <motion.div whileHover={{ scale: 1.1 }} className="h-10 w-10 rounded-full flex items-center justify-center" style={{ background: 'linear-gradient(135deg, #06b6d4, #0891b2)', boxShadow: '0 4px 15px rgba(6,182,212,0.3)' }}>
                  <User className="h-6 w-6 text-white" />
                </motion.div>
              </button>
              <AnimatePresence>
                {isDropdownOpen && (
                  <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}
                    className="absolute right-0 mt-2 w-48 rounded-xl py-1 z-50" style={{ background: 'rgba(10, 10, 26, 0.95)', backdropFilter: 'blur(20px)', border: '1px solid rgba(255,255,255,0.1)', boxShadow: '0 8px 32px rgba(0,0,0,0.4)' }}>
                    <Link to="/authority/profile" className="flex items-center px-4 py-2 text-sm text-white hover:bg-white/10 transition-colors">
                      <Edit className="h-4 w-4 mr-2" style={{ color: '#22d3ee' }} />Edit Profile
                    </Link>
                    <button onClick={handleLogout} className="w-full text-left flex items-center px-4 py-2 text-sm transition-colors" style={{ color: '#f87171' }}>
                      <LogOut className="h-4 w-4 mr-2" />Logout
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>
      </motion.header>

      <div className="flex">
        {/* Sidebar */}
        <motion.aside initial={{ x: -100, opacity: 0 }} animate={{ x: 0, opacity: 1 }} transition={{ duration: 0.5 }}
          className="w-72 min-h-[calc(100vh-73px)] sticky top-[73px] overflow-y-auto" style={{ background: 'rgba(10, 10, 26, 0.6)', backdropFilter: 'blur(20px)', WebkitBackdropFilter: 'blur(20px)', borderRight: '1px solid rgba(255,255,255,0.06)' }}>
          <nav className="p-4">
            <ul className="space-y-2">
              {menuItems.map((item) => {
                const Icon = item.icon;
                const isActive = location.pathname === item.path;
                return (
                  <motion.li key={item.path} whileHover={{ x: 5 }} whileTap={{ scale: 0.97 }} transition={{ duration: 0.2 }}>
                    <Link to={item.path} className="flex items-center space-x-3 px-4 py-3 rounded-xl transition-all" title={item.label}
                      style={isActive ? { background: 'linear-gradient(135deg, rgba(6,182,212,0.3), rgba(16,185,129,0.2))', border: '1px solid rgba(6,182,212,0.3)', boxShadow: '0 4px 15px rgba(6,182,212,0.15)', color: '#fff' } : { color: 'rgba(153,246,228,0.6)', border: '1px solid transparent' }}>
                      <Icon className="h-5 w-5" style={isActive ? { color: '#22d3ee' } : {}} />
                      <span className="font-medium">{item.label}</span>
                      {isActive && <ChevronRight className="h-4 w-4 ml-auto" style={{ color: '#22d3ee' }} />}
                    </Link>
                  </motion.li>
                );
              })}
            </ul>
          </nav>
        </motion.aside>

        {/* Main Content */}
        <motion.main key={location.pathname} initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} transition={{ duration: 0.5 }}
          className="flex-1 p-6">
          <Outlet />
        </motion.main>
      </div>
    </div>
  );
}

export default AuthorityLayout;