// // import { Outlet, Link, useLocation, useNavigate } from 'react-router-dom'
// // import { useAuth } from '../Auth/AuthContext'
// // import { 
// //   Shield, LayoutDashboard, Users, AlertTriangle, 
// //   TrendingUp, FileText, CreditCard, Headphones,
// //   LogOut, Bell, User
// // } from 'lucide-react'
// // import { motion } from 'framer-motion'

// // const AuthorityLayout = () => {
// //   const { user, logout } = useAuth()
// //   const location = useLocation()
// //   const navigate = useNavigate()

// //   const menuItems = [
// //     { path: '/authority/dashboard', icon: LayoutDashboard, label: 'Dashboard' },
// //     { path: '/authority/monitoring', icon: Users, label: 'Tourist Monitoring' },
// //     { path: '/authority/emergency', icon: AlertTriangle, label: 'Emergency Response' },
// //     { path: '/authority/risk', icon: TrendingUp, label: 'Risk Assessment' },
// //     { path: '/authority/incidents', icon: FileText, label: 'Incident Management' },
// //     { path: '/authority/smart-id', icon: CreditCard, label: 'Smart ID System' },
// //     { path: '/authority/response-team', icon: Headphones, label: 'Response Team' },
// //     { path: '/authority/analytics', icon: TrendingUp, label: 'Analytics' },
// //   ]

// //   const handleLogout = () => {
// //     logout()
// //     navigate('/login')
// //   }

// //   return (
// //     <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
// //       {/* Animated Header */}
// //       <motion.header 
// //         initial={{ y: -50, opacity: 0 }}
// //         animate={{ y: 0, opacity: 1 }}
// //         transition={{ duration: 0.5 }}
// //         className="bg-white shadow-sm border-b border-gray-200 sticky top-0 z-50"
// //       >
// //         <div className="px-6 py-4 flex items-center justify-between">
// //           <div className="flex items-center space-x-3">
// //             {/* Animated Logo */}
// //             <motion.div 
// //               whileHover={{ rotate: 360, scale: 1.1 }}
// //               transition={{ duration: 0.5 }}
// //               className="p-2 bg-primary-100 rounded-full shadow-md"
// //             >
// //               <Shield className="h-8 w-8 text-primary-600" />
// //             </motion.div>
// //             <div>
// //               <h1 className="text-2xl font-bold text-gray-900">
// //                 Authority Dashboard
// //               </h1>
// //               <p className="text-sm text-gray-500">Tourist Safety Control Center</p>
// //             </div>
// //           </div>
          
// //           <div className="flex items-center space-x-4">
// //             <motion.button 
// //               whileHover={{ scale: 1.1 }}
// //               className="relative p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors"
// //               title="Notifications"
// //             >
// //               <Bell className="h-6 w-6" />
// //               <span className="absolute top-1 right-1 h-3 w-3 bg-danger-500 rounded-full border-2 border-white animate-pulse"></span>
// //             </motion.button>
            
// //             <div className="flex items-center space-x-3 pl-4 border-l border-gray-200">
// //               <div className="text-right">
// //                 <p className="text-sm font-semibold text-gray-900">{user?.name}</p>
// //                 <p className="text-xs text-gray-500">{user?.designation || 'Authority'}</p>
// //               </div>
// //               <motion.div 
// //                 whileHover={{ scale: 1.1 }}
// //                 className="h-10 w-10 bg-primary-100 rounded-full flex items-center justify-center shadow-md"
// //               >
// //                 <User className="h-6 w-6 text-primary-600" />
// //               </motion.div>
// //               <motion.button 
// //                 whileHover={{ scale: 1.1, rotate: 90 }}
// //                 transition={{ duration: 0.3 }}
// //                 onClick={handleLogout}
// //                 className="p-2 text-gray-600 hover:text-danger-600 hover:bg-danger-50 rounded-lg transition-colors"
// //                 title="Logout"
// //               >
// //                 <LogOut className="h-5 w-5" />
// //               </motion.button>
// //             </div>
// //           </div>
// //         </div>
// //       </motion.header>

// //       <div className="flex">
// //         {/* Animated Sidebar */}
// //         <motion.aside 
// //           initial={{ x: -100, opacity: 0 }}
// //           animate={{ x: 0, opacity: 1 }}
// //           transition={{ duration: 0.5 }}
// //           className="w-72 bg-white shadow-xl min-h-[calc(100vh-73px)] sticky top-[73px] overflow-y-auto"
// //         >
// //           <nav className="p-4">
// //             <ul className="space-y-2">
// //               {menuItems.map((item) => {
// //                 const Icon = item.icon
// //                 const isActive = location.pathname === item.path
// //                 return (
// //                   <motion.li 
// //                     key={item.path}
// //                     whileHover={{ scale: 1.05, x: 5 }}
// //                     whileTap={{ scale: 0.95 }}
// //                     transition={{ duration: 0.2 }}
// //                   >
// //                     <Link
// //                       to={item.path}
// //                       className={`flex items-center space-x-3 px-4 py-3 rounded-lg transition-all shadow-md hover:shadow-lg ${
// //                         isActive 
// //                           ? 'bg-primary-600 text-white' 
// //                           : 'text-gray-700 hover:bg-gray-100'
// //                       }`}
// //                       title={item.label}
// //                     >
// //                       <Icon className="h-5 w-5" />
// //                       <span className="font-medium">{item.label}</span>
// //                     </Link>
// //                   </motion.li>
// //                 )
// //               })}
// //             </ul>
// //           </nav>
// //         </motion.aside>

// //         {/* Animated Main Content */}
// //         <motion.main 
// //           key={location.pathname}
// //           initial={{ opacity: 0, x: 20 }}
// //           animate={{ opacity: 1, x: 0 }}
// //           exit={{ opacity: 0, x: -20 }}
// //           transition={{ duration: 0.5 }}
// //           className="flex-1 p-6 bg-white/50 rounded-lg m-4 shadow-xl"
// //         >
// //           <Outlet />
// //         </motion.main>
// //       </div>
// //     </div>
// //   )
// // }

// // export default AuthorityLayout

// import { useState } from 'react';
// import { Link, Outlet } from 'react-router-dom';
// import { useAuth } from '../Auth/AuthContext';
// import { motion } from 'framer-motion';

// const AuthorityLayout = () => {
//   const { user, logout } = useAuth();
//   const [isMenuOpen, setIsMenuOpen] = useState(false);

//   const toggleMenu = () => {
//     setIsMenuOpen(!isMenuOpen);
//   };

//   return (
//     <div className="flex flex-col min-h-screen">
//       {/* Header */}
//       <header className="bg-indigo-900 text-white shadow-md">
//         <div className="container mx-auto px-4 py-3 flex justify-between items-center">
//           <div className="flex items-center">
//             <button
//               onClick={toggleMenu}
//               className="lg:hidden focus:outline-none"
//             >
//               <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                 <path
//                   strokeLinecap="round"
//                   strokeLinejoin="round"
//                   strokeWidth={2}
//                   d="M4 6h16M4 12h16M4 18h16"
//                 />
//               </svg>
//             </button>
//             <h1 className="ml-2 text-xl font-bold">Authority Dashboard</h1>
//           </div>

//           <div className="hidden lg:flex items-center space-x-4">
//             <Link to="/authority/dashboard" className="hover:text-indigo-200">
//               Dashboard
//             </Link>
//             <Link to="/authority/risk-assessment" className="hover:text-indigo-200">
//               Risk Assessment
//             </Link>
//             <Link to="/authority/incident-management" className="hover:text-indigo-200">
//               Incident Management
//             </Link>
//             <Link to="/authority/emergency-response" className="hover:text-indigo-200">
//               Emergency Response
//             </Link>
//             <Link to="/authority/analytics" className="hover:text-indigo-200">
//               Analytics
//             </Link>
//           </div>

//           <div className="flex items-center space-x-4">
//             <div className="hidden md:block">
//               <p className="text-sm">Welcome, {user?.name || 'Authority'}</p>
//             </div>
//             <button
//               onClick={logout}
//               className="bg-white text-indigo-700 px-3 py-1 rounded-md text-sm hover:bg-gray-100 transition-colors"
//             >
//               Logout
//             </button>
//           </div>
//         </div>
//       </header>

//       {/* Mobile Menu */}
//       {isMenuOpen && (
//         <motion.div
//           initial={{ opacity: 0, y: -20 }}
//           animate={{ opacity: 1, y: 0 }}
//           className="lg:hidden bg-indigo-800 text-white"
//         >
//           <div className="container mx-auto px-4 py-2">
//             <Link
//               to="/authority/dashboard"
//               className="block py-2 hover:bg-indigo-600 rounded"
//               onClick={toggleMenu}
//             >
//               Dashboard
//             </Link>
//             <Link
//               to="/authority/risk-assessment"
//               className="block py-2 hover:bg-indigo-600 rounded"
//               onClick={toggleMenu}
//             >
//               Risk Assessment
//             </Link>
//             <Link
//               to="/authority/incident-management"
//               className="block py-2 hover:bg-indigo-600 rounded"
//               onClick={toggleMenu}
//             >
//               Incident Management
//             </Link>
//             <Link
//               to="/authority/emergency-response"
//               className="block py-2 hover:bg-indigo-600 rounded"
//               onClick={toggleMenu}
//             >
//               Emergency Response
//             </Link>
//             <Link
//               to="/authority/analytics"
//               className="block py-2 hover:bg-indigo-600 rounded"
//               onClick={toggleMenu}
//             >
//               Analytics
//             </Link>
//           </div>
//         </motion.div>
//       )}

//       {/* Main Content */}
//       <main className="flex-grow container mx-auto px-4 py-6">
//         <Outlet />
//       </main>

//       {/* Footer */}
//       <footer className="bg-gray-800 text-white py-4">
//         <div className="container mx-auto px-4 text-center">
//           <p>© {new Date().getFullYear()} Tourist Safety System. All rights reserved.</p>
//         </div>
//       </footer>
//     </div>
//   );
// };

// export default AuthorityLayout;



import { useState } from 'react';
import { Link, Outlet, useLocation } from 'react-router-dom';
import { useAuth } from '../Auth/AuthContext';
import { motion } from 'framer-motion';

const AuthorityLayout = () => {
  const { user, logout } = useAuth();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <div className="flex flex-col min-h-screen">
      {/* Header */}
      <header className="bg-indigo-900 text-white shadow-md">
        <div className="container mx-auto px-4 py-3 flex justify-between items-center">
          <div className="flex items-center">
            <button
              onClick={toggleMenu}
              className="lg:hidden focus:outline-none"
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
            <Link to="/authority/dashboard" className="ml-2">
              <h1 className="text-xl font-bold">Authority Dashboard</h1>
            </Link>
          </div>

          <div className="hidden lg:flex items-center space-x-4">
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
          </div>

          <div className="flex items-center space-x-4">
            <div className="hidden md:block">
              <p className="text-sm">Welcome, {user?.name || 'Authority'}</p>
            </div>
            <button
              onClick={logout}
              className="bg-white text-indigo-700 px-3 py-1 rounded-md text-sm hover:bg-gray-100 transition-colors"
            >
              Logout
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          exit={{ opacity: 0, height: 0 }}
          transition={{ duration: 0.3 }}
          className="lg:hidden bg-indigo-800 text-white"
        >
          <div className="container mx-auto px-4 py-2">
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
          </div>
        </motion.div>
      )}

      {/* Main Content */}
      <main className="flex-grow container mx-auto px-4 py-6">
        <Outlet />
      </main>

      {/* Footer */}
      <footer className="bg-gray-800 text-white py-4">
        <div className="container mx-auto px-4 text-center">
          <p>© {new Date().getFullYear()} Tourist Safety System. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default AuthorityLayout;