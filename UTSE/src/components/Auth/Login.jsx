// // import { useState } from 'react'
// // import { Link, useNavigate } from 'react-router-dom'
// // import { Shield, User, Lock, Globe, AlertCircle } from 'lucide-react'
// // import { useAuth } from './AuthContext'
// // import { motion } from 'framer-motion'

// // const Login = () => {
// //   const [userType, setUserType] = useState('tourist')
// //   const [formData, setFormData] = useState({
// //     email: '',
// //     password: ''
// //   })
// //   const [error, setError] = useState('')
// //   const { login } = useAuth()
// //   const navigate = useNavigate()

// //   const handleSubmit = (e) => {
// //     e.preventDefault()
// //     setError('')

// //     // Get registered users from localStorage
// //     const registeredUsers = JSON.parse(localStorage.getItem('registeredUsers') || '[]')
    
// //     // Validate user: Match email, password, and userType
// //     const validUser = registeredUsers.find(
// //       user => user.email === formData.email &&
// //               user.password === formData.password &&
// //               user.role === userType
// //     )

// //     if (validUser) {
// //       login(validUser)
// //       navigate(`/${userType}/dashboard`)
// //     } else {
// //       setError(
// //         '❌ Invalid credentials! OR You are not signed up yet. Please sign up first.'
// //       )
// //     }
// //   }

// //   return (
// //     <motion.div 
// //       initial={{ opacity: 0, y: 20 }}
// //       animate={{ opacity: 1, y: 0 }}
// //       transition={{ duration: 0.5 }}
// //       className="min-h-screen bg-gradient-to-br from-primary-600 via-primary-700 to-primary-900 flex items-center justify-center p-4"
// //     >
// //       <div className="max-w-md w-full">
// //         <div className="text-center mb-8">
// //           <div className="inline-block p-4 bg-white rounded-full mb-4">
// //             <Shield className="h-16 w-16 text-primary-600" />
// //           </div>
// //           <h1 className="text-4xl font-bold text-white mb-2">Tourist Safety System</h1>
// //           <p className="text-primary-100">Secure login to continue</p>
// //         </div>

// //         <div className="bg-white rounded-2xl shadow-2xl p-8">
// //           {/* User Type Toggle */}
// //           <div className="flex mb-6 bg-gray-100 rounded-xl p-1">
// //             <button
// //               onClick={() => setUserType('tourist')}
// //               className={`flex-1 py-3 px-4 rounded-lg transition-all font-medium ${
// //                 userType === 'tourist' 
// //                   ? 'bg-white shadow-md text-primary-600' 
// //                   : 'text-gray-600'
// //               }`}
// //             >
// //               <Globe className="inline h-4 w-4 mr-2" />
// //               Tourist
// //             </button>
// //             <button
// //               onClick={() => setUserType('authority')}
// //               className={`flex-1 py-3 px-4 rounded-lg transition-all font-medium ${
// //                 userType === 'authority' 
// //                   ? 'bg-white shadow-md text-primary-600' 
// //                   : 'text-gray-600'
// //               }`}
// //             >
// //               <Shield className="inline h-4 w-4 mr-2" />
// //               Authority
// //             </button>
// //           </div>

// //           {error && (
// //             <div className="mb-4 p-3 bg-danger-50 border border-danger-200 rounded-lg flex items-center text-danger-700">
// //               <AlertCircle className="h-5 w-5 mr-2" />
// //               {error}
// //             </div>
// //           )}

// //           <form onSubmit={handleSubmit} className="space-y-5">
// //             <div>
// //               <label className="block text-sm font-semibold text-gray-700 mb-2">
// //                 Email Address
// //               </label>
// //               <div className="relative">
// //                 <User className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
// //                 <input
// //                   type="email"
// //                   required
// //                   className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
// //                   placeholder="Enter your email"
// //                   value={formData.email}
// //                   onChange={(e) => setFormData({...formData, email: e.target.value})}
// //                 />
// //               </div>
// //             </div>

// //             <div>
// //               <label className="block text-sm font-semibold text-gray-700 mb-2">
// //                 Password
// //               </label>
// //               <div className="relative">
// //                 <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
// //                 <input
// //                   type="password"
// //                   required
// //                   className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
// //                   placeholder="Enter your password"
// //                   value={formData.password}
// //                   onChange={(e) => setFormData({...formData, password: e.target.value})}
// //                 />
// //               </div>
// //             </div>

// //             <motion.button
// //               whileHover={{ scale: 1.02 }}
// //               whileTap={{ scale: 0.98 }}
// //               type="submit"
// //               className="w-full bg-primary-600 text-white py-3 rounded-lg hover:bg-primary-700 transition-colors font-semibold text-lg shadow-lg hover:shadow-xl"
// //             >
// //               Login as {userType === 'tourist' ? 'Tourist' : 'Authority'}
// //             </motion.button>
// //           </form>

// //           <div className="mt-6 text-center">
// //             <p className="text-gray-600">
// //               Don't have an account?{' '}
// //               <Link to="/signup" className="text-primary-600 hover:text-primary-700 font-semibold">
// //                 Sign Up Now
// //               </Link>
// //             </p>
// //           </div>
// //         </div>
// //       </div>
// //     </motion.div>
// //   )
// // }

// // export default Login

// import { useState } from 'react';
// import { useAuth } from '../Auth/AuthContext';
// import { motion } from 'framer-motion';
// import { Link } from 'react-router-dom';

// const Login = () => {
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const [role, setRole] = useState('tourist');
//   const [error, setError] = useState('');
//   const [isSubmitting, setIsSubmitting] = useState(false);
//   const { login } = useAuth();

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setError('');
//     setIsSubmitting(true);

//     try {
//       await login(email, password, role);
//     } catch (err) {
//       setError('Invalid email or password');
//     } finally {
//       setIsSubmitting(false);
//     }
//   };

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
//       <motion.div
//         initial={{ opacity: 0, y: 20 }}
//         animate={{ opacity: 1, y: 0 }}
//         transition={{ duration: 0.5 }}
//         className="bg-white p-8 rounded-lg shadow-md w-full max-w-md"
//       >
//         <h2 className="text-2xl font-bold text-center text-indigo-800 mb-6">
//           Login to Your Account
//         </h2>

//         {error && (
//           <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
//             {error}
//           </div>
//         )}

//         <form onSubmit={handleSubmit}>
//           <div className="mb-4">
//             <label htmlFor="email" className="block text-gray-700 text-sm font-bold mb-2">
//               Email Address
//             </label>
//             <input
//               type="email"
//               id="email"
//               value={email}
//               onChange={(e) => setEmail(e.target.value)}
//               className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
//               required
//             />
//           </div>

//           <div className="mb-4">
//             <label htmlFor="password" className="block text-gray-700 text-sm font-bold mb-2">
//               Password
//             </label>
//             <input
//               type="password"
//               id="password"
//               value={password}
//               onChange={(e) => setPassword(e.target.value)}
//               className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
//               required
//             />
//           </div>

//           <div className="mb-6">
//             <label className="block text-gray-700 text-sm font-bold mb-2">
//               Login As
//             </label>
//             <div className="flex space-x-4">
//               <label className="inline-flex items-center">
//                 <input
//                   type="radio"
//                   className="form-radio"
//                   name="role"
//                   value="tourist"
//                   checked={role === 'tourist'}
//                   onChange={() => setRole('tourist')}
//                 />
//                 <span className="ml-2">Tourist</span>
//               </label>
//               <label className="inline-flex items-center">
//                 <input
//                   type="radio"
//                   className="form-radio"
//                   name="role"
//                   value="authority"
//                   checked={role === 'authority'}
//                   onChange={() => setRole('authority')}
//                 />
//                 <span className="ml-2">Authority</span>
//               </label>
//             </div>
//           </div>

//           <button
//             type="submit"
//             disabled={isSubmitting}
//             className={`w-full bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition-colors ${isSubmitting ? 'opacity-50 cursor-not-allowed' : ''}`}
//           >
//             {isSubmitting ? (
//               <span className="flex items-center justify-center">
//                 <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
//                   <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
//                   <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
//                 </svg>
//                 Logging in...
//               </span>
//             ) : 'Login'}
//           </button>
//         </form>

//         <div className="mt-4 text-center">
//           <p className="text-gray-600">
//             Don't have an account?{' '}
//             <Link to="/signup" className="text-indigo-600 hover:text-indigo-800 font-medium">
//               Sign up
//             </Link>
//           </p>
//         </div>
//       </motion.div>
//     </div>
//   );
// };

// export default Login;

import { useState } from 'react';
import { useAuth } from '../Auth/AuthContext';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('tourist');
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setIsSubmitting(true);

    try {
      const user = await login(email, password, role);
      // Navigation is handled here after successful login
      if (user) {
        if (role === 'tourist') {
          navigate('/tourist/dashboard');
        } else {
          navigate('/authority/dashboard');
        }
      }
    } catch (err) {
      setError('Invalid email or password');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="bg-white p-8 rounded-lg shadow-md w-full max-w-md"
      >
        <h2 className="text-2xl font-bold text-center text-indigo-800 mb-6">
          Login to Your Account
        </h2>

        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="email" className="block text-gray-700 text-sm font-bold mb-2">
              Email Address
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
              required
            />
          </div>

          <div className="mb-4">
            <label htmlFor="password" className="block text-gray-700 text-sm font-bold mb-2">
              Password
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
              required
            />
          </div>

          <div className="mb-6">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Login As
            </label>
            <div className="flex space-x-4">
              <label className="inline-flex items-center">
                <input
                  type="radio"
                  className="form-radio"
                  name="role"
                  value="tourist"
                  checked={role === 'tourist'}
                  onChange={() => setRole('tourist')}
                />
                <span className="ml-2">Tourist</span>
              </label>
              <label className="inline-flex items-center">
                <input
                  type="radio"
                  className="form-radio"
                  name="role"
                  value="authority"
                  checked={role === 'authority'}
                  onChange={() => setRole('authority')}
                />
                <span className="ml-2">Authority</span>
              </label>
            </div>
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className={`w-full bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition-colors ${isSubmitting ? 'opacity-50 cursor-not-allowed' : ''}`}
          >
            {isSubmitting ? (
              <span className="flex items-center justify-center">
                <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Logging in...
              </span>
            ) : 'Login'}
          </button>
        </form>

        <div className="mt-4 text-center">
          <p className="text-gray-600">
            Don't have an account?{' '}
            <a href="/signup" className="text-indigo-600 hover:text-indigo-800 font-medium">
              Sign up
            </a>
          </p>
        </div>
      </motion.div>
    </div>
  );
};

export default Login;