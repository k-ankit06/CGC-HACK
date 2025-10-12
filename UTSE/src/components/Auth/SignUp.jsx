// // import { useState } from 'react'
// // import { Link, useNavigate } from 'react-router-dom'
// // import { Shield, Globe, AlertCircle, CheckCircle } from 'lucide-react'
// // import { useAuth } from './AuthContext'
// // import { motion } from 'framer-motion'

// // const SignUp = () => {
// //   const [userType, setUserType] = useState('tourist')
// //   const [touristType, setTouristType] = useState('international')
// //   const [formData, setFormData] = useState({
// //     name: '',
// //     email: '',
// //     phone: '',
// //     password: '',
// //     confirmPassword: '',
// //     country: '',
// //     passportNumber: '',
// //     aadhaarNumber: '',
// //     emergencyContact: '',
// //     departmentId: '',
// //     designation: ''
// //   })
// //   const [error, setError] = useState('')
// //   const { login } = useAuth()
// //   const navigate = useNavigate()

// //   const handleSubmit = (e) => {
// //     e.preventDefault()
// //     setError('')

// //     if (formData.password !== formData.confirmPassword) {
// //       setError('Passwords do not match')
// //       return
// //     }

// //     if (formData.password.length < 6) {
// //       setError('Password must be at least 6 characters')
// //       return
// //     }

// //     // Create user data
// //     const userData = {
// //       id: Date.now(),
// //       ...formData,
// //       role: userType,
// //       touristType: userType === 'tourist' ? touristType : null,
// //       isRegistered: false
// //     }
    
// //     // Save to registeredUsers in localStorage
// //     const registeredUsers = JSON.parse(localStorage.getItem('registeredUsers') || '[]')
// //     registeredUsers.push(userData)
// //     localStorage.setItem('registeredUsers', JSON.stringify(registeredUsers))
    
// //     // Login the user
// //     login(userData)
// //     navigate(`/${userType}/dashboard`)
// //   }

// //   return (
// //     <motion.div 
// //       initial={{ opacity: 0, y: 20 }}
// //       animate={{ opacity: 1, y: 0 }}
// //       transition={{ duration: 0.5 }}
// //       className="min-h-screen bg-gradient-to-br from-primary-50 to-primary-100 flex items-center justify-center p-4"
// //     >
// //       <div className="max-w-2xl w-full">
// //         <div className="text-center mb-8">
// //           <Shield className="h-16 w-16 text-primary-600 mx-auto mb-4" />
// //           <h1 className="text-3xl font-bold text-gray-900">Create Account</h1>
// //           <p className="text-gray-600 mt-2">Join the Tourist Safety Ecosystem</p>
// //         </div>

// //         <div className="bg-white rounded-lg shadow-xl p-8">
// //           {/* User Type Toggle */}
// //           <div className="flex mb-6 bg-gray-100 rounded-lg p-1">
// //             <button
// //               onClick={() => setUserType('tourist')}
// //               className={`flex-1 py-2 px-4 rounded-md transition-all ${
// //                 userType === 'tourist' 
// //                   ? 'bg-white shadow-sm text-primary-600 font-medium' 
// //                   : 'text-gray-600'
// //               }`}
// //             >
// //               <Globe className="inline h-4 w-4 mr-2" />
// //               Tourist
// //             </button>
// //             <button
// //               onClick={() => setUserType('authority')}
// //               className={`flex-1 py-2 px-4 rounded-md transition-all ${
// //                 userType === 'authority' 
// //                   ? 'bg-white shadow-sm text-primary-600 font-medium' 
// //                   : 'text-gray-600'
// //               }`}
// //             >
// //               <Shield className="inline h-4 w-4 mr-2" />
// //               Authority
// //             </button>
// //           </div>

// //           {error && (
// //             <div className="mb-6 p-3 bg-danger-50 border border-danger-200 rounded-lg flex items-center text-danger-700">
// //               <AlertCircle className="h-5 w-5 mr-2" />
// //               {error}
// //             </div>
// //           )}

// //           <form onSubmit={handleSubmit} className="space-y-4">
// //             <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
// //               <div>
// //                 <label className="block text-sm font-semibold text-gray-700 mb-2">
// //                   Full Name
// //                 </label>
// //                 <input
// //                   type="text"
// //                   required
// //                   className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500"
// //                   value={formData.name}
// //                   onChange={(e) => setFormData({...formData, name: e.target.value})}
// //                 />
// //               </div>

// //               <div>
// //                 <label className="block text-sm font-semibold text-gray-700 mb-2">
// //                   Email Address
// //                 </label>
// //                 <input
// //                   type="email"
// //                   required
// //                   className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500"
// //                   value={formData.email}
// //                   onChange={(e) => setFormData({...formData, email: e.target.value})}
// //                 />
// //               </div>

// //               <div>
// //                 <label className="block text-sm font-semibold text-gray-700 mb-2">
// //                   Phone Number
// //                 </label>
// //                 <input
// //                   type="tel"
// //                   required
// //                   className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500"
// //                   value={formData.phone}
// //                   onChange={(e) => setFormData({...formData, phone: e.target.value})}
// //                 />
// //               </div>

// //               {userType === 'tourist' && (
// //                 <>
// //                   <div>
// //                     <label className="block text-sm font-semibold text-gray-700 mb-2">
// //                       Country
// //                     </label>
// //                     <input
// //                       type="text"
// //                       required
// //                       className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500"
// //                       value={formData.country}
// //                       onChange={(e) => setFormData({...formData, country: e.target.value})}
// //                     />
// //                   </div>

// //                   {/* Domestic/International Selection */}
// //                   <div className="col-span-2">
// //                     <label className="block text-sm font-semibold text-gray-700 mb-2">
// //                       Tourist Type
// //                     </label>
// //                     <div className="flex gap-4">
// //                       <label className="flex items-center gap-2">
// //                         <input
// //                           type="radio"
// //                           value="international"
// //                           checked={touristType === 'international'}
// //                           onChange={() => setTouristType('international')}
// //                           className="text-primary-600"
// //                         />
// //                         International
// //                       </label>
// //                       <label className="flex items-center gap-2">
// //                         <input
// //                           type="radio"
// //                           value="domestic"
// //                           checked={touristType === 'domestic'}
// //                           onChange={() => setTouristType('domestic')}
// //                           className="text-primary-600"
// //                         />
// //                         Domestic
// //                       </label>
// //                     </div>
// //                   </div>

// //                   {/* Conditional ID Field */}
// //                   {touristType === 'international' ? (
// //                     <div>
// //                       <label className="block text-sm font-semibold text-gray-700 mb-2">
// //                         Passport Number
// //                       </label>
// //                       <input
// //                         type="text"
// //                         required
// //                         className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500"
// //                         value={formData.passportNumber}
// //                         onChange={(e) => setFormData({...formData, passportNumber: e.target.value})}
// //                       />
// //                     </div>
// //                   ) : (
// //                     <div>
// //                       <label className="block text-sm font-semibold text-gray-700 mb-2">
// //                         Aadhaar Number
// //                       </label>
// //                       <input
// //                         type="text"
// //                         required
// //                         maxLength={12}
// //                         pattern="\d{12}"
// //                         title="Aadhaar number must be 12 digits"
// //                         className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500"
// //                         value={formData.aadhaarNumber}
// //                         onChange={(e) => setFormData({...formData, aadhaarNumber: e.target.value})}
// //                       />
// //                     </div>
// //                   )}

// //                   <div>
// //                     <label className="block text-sm font-semibold text-gray-700 mb-2">
// //                       Emergency Contact
// //                     </label>
// //                     <input
// //                       type="tel"
// //                       required
// //                       className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500"
// //                       value={formData.emergencyContact}
// //                       onChange={(e) => setFormData({...formData, emergencyContact: e.target.value})}
// //                     />
// //                   </div>
// //                 </>
// //               )}

// //               {userType === 'authority' && (
// //                 <>
// //                   <div>
// //                     <label className="block text-sm font-semibold text-gray-700 mb-2">
// //                       Department ID
// //                     </label>
// //                     <input
// //                       type="text"
// //                       required
// //                       className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500"
// //                       value={formData.departmentId}
// //                       onChange={(e) => setFormData({...formData, departmentId: e.target.value})}
// //                     />
// //                   </div>

// //                   <div>
// //                     <label className="block text-sm font-semibold text-gray-700 mb-2">
// //                       Designation
// //                     </label>
// //                     <input
// //                       type="text"
// //                       required
// //                       className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500"
// //                       value={formData.designation}
// //                       onChange={(e) => setFormData({...formData, designation: e.target.value})}
// //                     />
// //                   </div>
// //                 </>
// //               )}

// //               <div>
// //                 <label className="block text-sm font-semibold text-gray-700 mb-2">
// //                   Password
// //                 </label>
// //                 <input
// //                   type="password"
// //                   required
// //                   className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500"
// //                   value={formData.password}
// //                   onChange={(e) => setFormData({...formData, password: e.target.value})}
// //                 />
// //               </div>

// //               <div>
// //                 <label className="block text-sm font-semibold text-gray-700 mb-2">
// //                   Confirm Password
// //                 </label>
// //                 <input
// //                   type="password"
// //                   required
// //                   className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500"
// //                   value={formData.confirmPassword}
// //                   onChange={(e) => setFormData({...formData, confirmPassword: e.target.value})}
// //                 />
// //               </div>
// //             </div>

// //             <motion.button
// //               whileHover={{ scale: 1.02 }}
// //               whileTap={{ scale: 0.98 }}
// //               type="submit"
// //               className="w-full bg-primary-600 text-white py-3 rounded-lg hover:bg-primary-700 transition-colors font-medium"
// //             >
// //               Create {userType === 'tourist' ? 'Tourist' : 'Authority'} Account
// //             </motion.button>
// //           </form>

// //           <div className="mt-6 text-center">
// //             <p className="text-gray-600">
// //               Already have an account?{' '}
// //               <Link to="/login" className="text-primary-600 hover:text-primary-700 font-semibold">
// //                 Login
// //               </Link>
// //             </p>
// //           </div>
// //         </div>
// //       </div>
// //     </motion.div>
// //   )
// // }

// // export default SignUp

// import { useState } from 'react';
// import { useAuth } from '../Auth/AuthContext';
// import { motion } from 'framer-motion';
// import { Link, useNavigate } from 'react-router-dom';

// const SignUp = () => {
//   const [formData, setFormData] = useState({
//     name: '',
//     email: '',
//     password: '',
//     confirmPassword: '',
//     role: 'tourist'
//   });
//   const [errors, setErrors] = useState({});
//   const [isSubmitting, setIsSubmitting] = useState(false);
//   const { login } = useAuth();
//   const navigate = useNavigate();

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData(prev => ({
//       ...prev,
//       [name]: value
//     }));
//   };

//   const validateForm = () => {
//     const newErrors = {};

//     if (!formData.name.trim()) {
//       newErrors.name = 'Name is required';
//     }

//     if (!formData.email.trim()) {
//       newErrors.email = 'Email is required';
//     } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
//       newErrors.email = 'Email is invalid';
//     }

//     if (!formData.password) {
//       newErrors.password = 'Password is required';
//     } else if (formData.password.length < 6) {
//       newErrors.password = 'Password must be at least 6 characters';
//     }

//     if (formData.password !== formData.confirmPassword) {
//       newErrors.confirmPassword = 'Passwords do not match';
//     }

//     setErrors(newErrors);
//     return Object.keys(newErrors).length === 0;
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     if (validateForm()) {
//       setIsSubmitting(true);

//       try {
//         // In a real app, you would call your registration API here
//         await new Promise(resolve => setTimeout(resolve, 1000));

//         // Simulate successful registration and then login
//         await login(formData.email, formData.password, formData.role);
//         navigate(formData.role === 'tourist' ? '/tourist/dashboard' : '/authority/dashboard');
//       } catch (error) {
//         console.error('Registration error:', error);
//         setErrors({ form: 'Registration failed. Please try again.' });
//       } finally {
//         setIsSubmitting(false);
//       }
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
//           Create Your Account
//         </h2>

//         {errors.form && (
//           <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
//             {errors.form}
//           </div>
//         )}

//         <form onSubmit={handleSubmit}>
//           <div className="mb-4">
//             <label htmlFor="name" className="block text-gray-700 text-sm font-bold mb-2">
//               Full Name
//             </label>
//             <input
//               type="text"
//               id="name"
//               name="name"
//               value={formData.name}
//               onChange={handleChange}
//               className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 ${errors.name ? 'border-red-500 focus:ring-red-500' : 'border-gray-300 focus:ring-indigo-500'}`}
//             />
//             {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name}</p>}
//           </div>

//           <div className="mb-4">
//             <label htmlFor="email" className="block text-gray-700 text-sm font-bold mb-2">
//               Email Address
//             </label>
//             <input
//               type="email"
//               id="email"
//               name="email"
//               value={formData.email}
//               onChange={handleChange}
//               className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 ${errors.email ? 'border-red-500 focus:ring-red-500' : 'border-gray-300 focus:ring-indigo-500'}`}
//             />
//             {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
//           </div>

//           <div className="mb-4">
//             <label htmlFor="password" className="block text-gray-700 text-sm font-bold mb-2">
//               Password
//             </label>
//             <input
//               type="password"
//               id="password"
//               name="password"
//               value={formData.password}
//               onChange={handleChange}
//               className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 ${errors.password ? 'border-red-500 focus:ring-red-500' : 'border-gray-300 focus:ring-indigo-500'}`}
//             />
//             {errors.password && <p className="text-red-500 text-xs mt-1">{errors.password}</p>}
//           </div>

//           <div className="mb-4">
//             <label htmlFor="confirmPassword" className="block text-gray-700 text-sm font-bold mb-2">
//               Confirm Password
//             </label>
//             <input
//               type="password"
//               id="confirmPassword"
//               name="confirmPassword"
//               value={formData.confirmPassword}
//               onChange={handleChange}
//               className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 ${errors.confirmPassword ? 'border-red-500 focus:ring-red-500' : 'border-gray-300 focus:ring-indigo-500'}`}
//             />
//             {errors.confirmPassword && <p className="text-red-500 text-xs mt-1">{errors.confirmPassword}</p>}
//           </div>

//           <div className="mb-6">
//             <label className="block text-gray-700 text-sm font-bold mb-2">
//               Sign Up As
//             </label>
//             <div className="flex space-x-4">
//               <label className="inline-flex items-center">
//                 <input
//                   type="radio"
//                   className="form-radio"
//                   name="role"
//                   value="tourist"
//                   checked={formData.role === 'tourist'}
//                   onChange={handleChange}
//                 />
//                 <span className="ml-2">Tourist</span>
//               </label>
//               <label className="inline-flex items-center">
//                 <input
//                   type="radio"
//                   className="form-radio"
//                   name="role"
//                   value="authority"
//                   checked={formData.role === 'authority'}
//                   onChange={handleChange}
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
//                 Signing Up...
//               </span>
//             ) : 'Sign Up'}
//           </button>
//         </form>

//         <div className="mt-4 text-center">
//           <p className="text-gray-600">
//             Already have an account?{' '}
//             <Link to="/login" className="text-indigo-600 hover:text-indigo-800 font-medium">
//               Login here
//             </Link>
//           </p>
//         </div>
//       </motion.div>
//     </div>
//   );
// };

// export default SignUp;

import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

const SignUp = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    role: 'tourist'
  });
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    setIsSubmitting(true);

    try {
      // In a real app, you would call your authentication API here
      console.log('Signing up with:', formData);

      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));

      // Simulate successful registration
      navigate('/login');
    } catch (err) {
      setError('Registration failed. Please try again.');
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
          Create Your Account
        </h2>

        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="name" className="block text-gray-700 text-sm font-bold mb-2">
              Full Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
              required
            />
          </div>

          <div className="mb-4">
            <label htmlFor="email" className="block text-gray-700 text-sm font-bold mb-2">
              Email Address
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
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
              name="password"
              value={formData.password}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
              required
            />
          </div>

          <div className="mb-4">
            <label htmlFor="confirmPassword" className="block text-gray-700 text-sm font-bold mb-2">
              Confirm Password
            </label>
            <input
              type="password"
              id="confirmPassword"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
              required
            />
          </div>

          <div className="mb-6">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Sign Up As
            </label>
            <div className="flex space-x-4">
              <label className="inline-flex items-center">
                <input
                  type="radio"
                  className="form-radio"
                  name="role"
                  value="tourist"
                  checked={formData.role === 'tourist'}
                  onChange={handleChange}
                />
                <span className="ml-2">Tourist</span>
              </label>
              <label className="inline-flex items-center">
                <input
                  type="radio"
                  className="form-radio"
                  name="role"
                  value="authority"
                  checked={formData.role === 'authority'}
                  onChange={handleChange}
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
                Signing up...
              </span>
            ) : 'Sign Up'}
          </button>
        </form>

        <div className="mt-4 text-center">
          <p className="text-gray-600">
            Already have an account?{' '}
            <a href="/login" className="text-indigo-600 hover:text-indigo-800 font-medium">
              Log in
            </a>
          </p>
        </div>
      </motion.div>
    </div>
  );
};

export default SignUp;