// // import { useEffect } from 'react'
// // import { useNavigate } from 'react-router-dom'
// // import { motion } from 'framer-motion'
// // import { Shield } from 'lucide-react'

// // const SplashScreen = () => {
// //   const navigate = useNavigate()

// //   // Redirect to login after 3 seconds
// //   useEffect(() => {
// //     const timer = setTimeout(() => {
// //       // Save splash shown flag in session (so it doesn't show again on refresh)
// //       sessionStorage.setItem('splashShown', 'true')
// //       navigate('/login')
// //     }, 3000)

// //     return () => clearTimeout(timer)
// //   }, [navigate])

// //   return (
// //     <div className="min-h-screen bg-gradient-to-br from-primary-600 to-primary-900 flex flex-col items-center justify-center text-white">
// //       {/* Animated Logo */}
// //       <motion.div
// //         initial={{ scale: 0, rotate: 0 }}
// //         animate={{ scale: 1, rotate: 360 }}
// //         transition={{ duration: 1.5, ease: "easeInOut" }}
// //         className="mb-8"
// //       >
// //         <div className="h-32 w-32 bg-white rounded-full flex items-center justify-center shadow-2xl">
// //           <Shield className="h-16 w-16 text-primary-600" />
// //         </div>
// //       </motion.div>

// //       {/* Animated App Name */}
// //       <motion.h1
// //         initial={{ opacity: 0, y: 20 }}
// //         animate={{ opacity: 1, y: 0 }}
// //         transition={{ delay: 0.5, duration: 1 }}
// //         className="text-5xl font-bold mb-2 text-center"
// //       >
// //         Tourist Safety System
// //       </motion.h1>
// //       <motion.p
// //         initial={{ opacity: 0 }}
// //         animate={{ opacity: 1 }}
// //         transition={{ delay: 1, duration: 1 }}
// //         className="text-primary-100 text-lg"
// //       >
// //         Your Safety Companion in India
// //       </motion.p>

// //       {/* Loading Dots */}
// //       <motion.div
// //         className="flex gap-2 mt-12"
// //         initial={{ opacity: 0 }}
// //         animate={{ opacity: 1 }}
// //         transition={{ delay: 1.5 }}
// //       >
// //         {[1,2,3].map((dot) => (
// //           <motion.div
// //             key={dot}
// //             className="h-3 w-3 bg-white rounded-full"
// //             animate={{ scale: [1, 1.5, 1] }}
// //             transition={{ repeat: Infinity, delay: dot * 0.2, duration: 0.5 }}
// //           />
// //         ))}
// //       </motion.div>
// //     </div>
// //   )
// // }

// // export default SplashScreen
// import { useEffect, useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { motion } from 'framer-motion';
// // import logo from '../assets/images/logo.png';

// const SplashScreen = () => {
//   const [loading, setLoading] = useState(true);
//   const navigate = useNavigate();

//   useEffect(() => {
//     const timer = setTimeout(() => {
//       setLoading(false);
//       navigate('/login');
//     }, 3000);

//     return () => clearTimeout(timer);
//   }, [navigate]);

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
//       <motion.div
//         initial={{ opacity: 0, scale: 0.5 }}
//         animate={{ opacity: 1, scale: 1 }}
//         transition={{ duration: 0.5 }}
//         className="text-center"
//       >
//         <img
//           src={logo}
//           alt="Tourist Safety Logo"
//           className="w-48 h-48 mx-auto mb-6 animate-bounce"
//         />
//         <h1 className="text-4xl font-bold text-indigo-800 mb-2">
//           Smart Tourist Safety
//         </h1>
//         <p className="text-xl text-gray-600 mb-8">
//           Your Safety, Our Priority
//         </p>
//         <div className="w-24 h-2 bg-indigo-500 rounded-full mx-auto">
//           <div className="w-full h-full bg-indigo-300 rounded-full animate-pulse"></div>
//         </div>
//       </motion.div>
//     </div>
//   );
// };

// export default SplashScreen;

import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
// import logo from '../assets/images/logo.png';

const SplashScreen = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      navigate('/login');
    }, 3000);

    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.5 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="text-center"
      >
        <img
          src={logo}
          alt="Tourist Safety Logo"
          className="w-48 h-48 mx-auto mb-6 animate-bounce"
        />
        <h1 className="text-4xl font-bold text-indigo-800 mb-2">
          Smart Tourist Safety
        </h1>
        <p className="text-xl text-gray-600 mb-8">
          Your Safety, Our Priority
        </p>
        <div className="w-24 h-2 bg-indigo-500 rounded-full mx-auto">
          <div className="w-full h-full bg-indigo-300 rounded-full animate-pulse"></div>
        </div>
      </motion.div>
    </div>
  );
};

export default SplashScreen