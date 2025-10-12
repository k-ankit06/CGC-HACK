// // import { Shield, AlertTriangle, Phone, MapPin, Heart, Sun, Droplet, Wind, Users } from 'lucide-react'

// // const SafetyInfo = () => {
// //   const safetyTips = [
// //     {
// //       category: 'General Safety',
// //       icon: Shield,
// //       color: 'primary',
// //       tips: [
// //         'Always keep your Tourist ID card and QR code accessible',
// //         'Share your itinerary with family or friends',
// //         'Keep copies of important documents (passport, visa, etc.)',
// //         'Avoid carrying large amounts of cash',
// //         'Use hotel safes for valuables',
// //         'Stay aware of your surroundings at all times'
// //       ]
// //     },
// //     {
// //       category: 'Health & Medical',
// //       icon: Heart,
// //       color: 'danger',
// //       tips: [
// //         'Drink only bottled or purified water',
// //         'Carry necessary medications with prescriptions',
// //         'Get travel insurance before your trip',
// //         'Know your blood group and allergies',
// //         'Avoid street food if you have a sensitive stomach',
// //         'Keep emergency medical contacts handy'
// //       ]
// //     },
// //     {
// //       category: 'Weather Precautions',
// //       icon: Sun,
// //       color: 'warning',
// //       tips: [
// //         'Stay hydrated in hot weather (drink 3-4 liters of water daily)',
// //         'Use sunscreen (SPF 30+) and wear hats',
// //         'Avoid outdoor activities during peak heat (12 PM - 3 PM)',
// //         'Carry an umbrella for rain and sun protection',
// //         'Wear light, breathable clothing in summer',
// //         'Check weather forecasts daily'
// //       ]
// //     },
// //     {
// //       category: 'Travel Safety',
// //       icon: MapPin,
// //       color: 'success',
// //       tips: [
// //         'Use authorized taxi services or ride-sharing apps',
// //         'Avoid traveling alone late at night',
// //         'Keep your phone charged at all times',
// //         'Learn basic local phrases for emergencies',
// //         'Inform hotel staff about your daily plans',
// //         'Use GPS tracking and share location with trusted contacts'
// //       ]
// //     },
// //     {
// //       category: 'Cultural Awareness',
// //       icon: Users,
// //       color: 'purple',
// //       tips: [
// //         'Dress modestly when visiting religious places',
// //         'Remove shoes before entering temples and homes',
// //         'Ask permission before photographing people',
// //         'Respect local customs and traditions',
// //         'Avoid public displays of affection',
// //         'Learn about local festivals and holidays'
// //       ]
// //     }
// //   ]

// //   const emergencyNumbers = [
// //     { service: 'Police Emergency', number: '100', icon: '🚓' },
// //     { service: 'Ambulance', number: '102', icon: '🚑' },
// //     { service: 'Fire Brigade', number: '101', icon: '🚒' },
// //     { service: 'Women Helpline', number: '1091', icon: '👮‍♀️' },
// //     { service: 'Tourist Helpline', number: '1363', icon: '🏛️' },
// //     { service: 'Child Helpline', number: '1098', icon: '👶' },
// //     { service: 'Disaster Management', number: '108', icon: '⚠️' },
// //     { service: 'Senior Citizen Helpline', number: '1091', icon: '👴' }
// //   ]

// //   const dosDonts = {
// //     dos: [
// //       'Do carry your identification documents always',
// //       'Do inform local police about your stay',
// //       'Do use authorized money exchange services',
// //       'Do bargain politely at local markets',
// //       'Do try local cuisine at reputable restaurants',
// //       'Do learn basic Hindi phrases',
// //       'Do respect queue systems',
// //       'Do tip service staff appropriately (10-15%)'
// //     ],
// //     donts: [
// //       "Don't accept food/drinks from strangers",
// //       "Don't share personal details with unknown people",
// //       "Don't use unlicensed tour guides",
// //       "Don't venture into isolated areas alone",
// //       "Don't leave belongings unattended",
// //       "Don't take photographs of military installations",
// //       "Don't give money to beggars (donate to NGOs instead)",
// //       "Don't argue with authorities"
// //     ]
// //   }

// //   const getColorClasses = (color) => {
// //     const colors = {
// //       primary: 'bg-primary-100 text-primary-600',
// //       danger: 'bg-danger-100 text-danger-600',
// //       warning: 'bg-warning-100 text-warning-600',
// //       success: 'bg-success-100 text-success-600',
// //       purple: 'bg-purple-100 text-purple-600'
// //     }
// //     return colors[color] || colors.primary
// //   }

// //   return (
// //     <div className="space-y-6">
// //       <div>
// //         <h2 className="text-3xl font-bold text-gray-900">Safety Information</h2>
// //         <p className="text-gray-600 mt-1">Essential tips and guidelines for a safe journey in India</p>
// //       </div>

// //       {/* Emergency Numbers Card */}
// //       <div className="card bg-gradient-to-r from-danger-500 to-danger-600 text-white">
// //         <h3 className="text-2xl font-bold mb-4 flex items-center">
// //           <Phone className="h-6 w-6 mr-2" />
// //           Emergency Contact Numbers
// //         </h3>
// //         <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
// //           {emergencyNumbers.map((contact, index) => (
// //             <div key={index} className="bg-white/20 backdrop-blur rounded-lg p-4 text-center hover:bg-white/30 transition-colors">
// //               <div className="text-4xl mb-2">{contact.icon}</div>
// //               <p className="text-sm text-danger-100 mb-1">{contact.service}</p>
// //               <p className="text-2xl font-bold font-mono">{contact.number}</p>
// //             </div>
// //           ))}
// //         </div>
// //         <div className="mt-4 bg-white/20 backdrop-blur rounded-lg p-3">
// //           <p className="text-sm">
// //             <strong>Note:</strong> All emergency numbers are toll-free and available 24/7. Save these numbers in your phone immediately.
// //           </p>
// //         </div>
// //       </div>

// //       {/* Safety Tips by Category */}
// //       {safetyTips.map((category, index) => {
// //         const Icon = category.icon
// //         return (
// //           <div key={index} className="card">
// //             <div className="flex items-center gap-3 mb-4">
// //               <div className={`p-3 rounded-lg ${getColorClasses(category.color)}`}>
// //                 <Icon className="h-6 w-6" />
// //               </div>
// //               <h3 className="text-xl font-bold text-gray-900">{category.category}</h3>
// //             </div>
// //             <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
// //               {category.tips.map((tip, tipIndex) => (
// //                 <div key={tipIndex} className="flex items-start gap-2 bg-gray-50 p-3 rounded-lg">
// //                   <div className="h-2 w-2 bg-primary-600 rounded-full mt-2 flex-shrink-0"></div>
// //                   <p className="text-gray-700">{tip}</p>
// //                 </div>
// //               ))}
// //             </div>
// //           </div>
// //         )
// //       })}

// //       {/* Do's and Don'ts */}
// //       <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
// //         <div className="card border-2 border-success-300">
// //           <h3 className="text-xl font-bold text-success-700 mb-4 flex items-center">
// //             ✅ Do's - Follow These
// //           </h3>
// //           <ul className="space-y-3">
// //             {dosDonts.dos.map((item, index) => (
// //               <li key={index} className="flex items-start gap-2">
// //                 <span className="text-success-600 font-bold mt-1">✓</span>
// //                 <span className="text-gray-700">{item}</span>
// //               </li>
// //             ))}
// //           </ul>
// //         </div>

// //         <div className="card border-2 border-danger-300">
// //           <h3 className="text-xl font-bold text-danger-700 mb-4 flex items-center">
// //             ❌ Don'ts - Avoid These
// //           </h3>
// //           <ul className="space-y-3">
// //             {dosDonts.donts.map((item, index) => (
// //               <li key={index} className="flex items-start gap-2">
// //                 <span className="text-danger-600 font-bold mt-1">✗</span>
// //                 <span className="text-gray-700">{item}</span>
// //               </li>
// //             ))}
// //           </ul>
// //         </div>
// //       </div>

// //       {/* Weather Safety Alert */}
// //       <div className="card bg-gradient-to-r from-warning-500 to-warning-600 text-white">
// //         <h3 className="text-xl font-bold mb-4 flex items-center">
// //           <Sun className="h-6 w-6 mr-2" />
// //           Current Weather Safety Alert
// //         </h3>
// //         <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
// //           <div className="bg-white/20 backdrop-blur rounded-lg p-4">
// //             <div className="flex items-center justify-between mb-2">
// //               <span className="text-warning-100">Temperature</span>
// //               <Sun className="h-5 w-5" />
// //             </div>
// //             <p className="text-3xl font-bold">42°C</p>
// //             <p className="text-sm text-warning-100 mt-1">Extreme Heat Warning</p>
// //           </div>
// //           <div className="bg-white/20 backdrop-blur rounded-lg p-4">
// //             <div className="flex items-center justify-between mb-2">
// //               <span className="text-warning-100">Humidity</span>
// //               <Droplet className="h-5 w-5" />
// //             </div>
// //             <p className="text-3xl font-bold">65%</p>
// //             <p className="text-sm text-warning-100 mt-1">Moderate Humidity</p>
// //           </div>
// //           <div className="bg-white/20 backdrop-blur rounded-lg p-4">
// //             <div className="flex items-center justify-between mb-2">
// //               <span className="text-warning-100">Air Quality</span>
// //               <Wind className="h-5 w-5" />
// //             </div>
// //             <p className="text-3xl font-bold">AQI 85</p>
// //             <p className="text-sm text-warning-100 mt-1">Moderate - Sensitive people should limit outdoor activity</p>
// //           </div>
// //         </div>
// //       </div>

// //       {/* Important Documents Checklist */}
// //       <div className="card">
// //         <h3 className="text-xl font-bold mb-4">Essential Documents Checklist</h3>
// //         <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
// //           {[
// //             'Valid Passport with 6 months validity',
// //             'Valid Indian Visa',
// //             'Tourist ID Card & QR Code',
// //             'Travel Insurance Documents',
// //             'Hotel Booking Confirmations',
// //             'Return Flight Tickets',
// //             'Emergency Contact List',
// //             'Medical Prescriptions (if any)',
// //             'Credit/Debit Cards',
// //             'International Driving Permit (if driving)'
// //           ].map((doc, index) => (
// //             <div key={index} className="flex items-center gap-2 bg-gray-50 p-3 rounded-lg">
// //               <input type="checkbox" className="h-5 w-5 text-primary-600" />
// //               <span className="text-gray-700">{doc}</span>
// //             </div>
// //           ))}
// //         </div>
// //       </div>

// //       {/* Quick Tips Banner */}
// //       <div className="card bg-primary-50 border-2 border-primary-300">
// //         <h4 className="font-bold text-primary-900 mb-3">💡 Quick Safety Tips</h4>
// //         <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm text-primary-800">
// //           <div>
// //             <p className="font-semibold mb-1">🚨 In Emergency</p>
// //             <p>Press the SOS button on your dashboard or call 100 (Police) immediately</p>
// //           </div>
// //           <div>
// //             <p className="font-semibold mb-1">📱 Stay Connected</p>
// //             <p>Keep your phone charged and enable location services for safety tracking</p>
// //           </div>
// //           <div>
// //             <p className="font-semibold mb-1">🗺️ Plan Ahead</p>
// //             <p>Check safe routes and current safety scores before visiting new locations</p>
// //           </div>
// //         </div>
// //       </div>
// //     </div>
// //   )
// // }

// // export default SafetyInfo

// import { useState, useEffect } from 'react';
// import { motion } from 'framer-motion';
// import LocationTracker from '../../components/Shared/LocationTracker';

// const SafetyInfo = () => {
//   const [safetyInfo, setSafetyInfo] = useState({
//     emergencyNumbers: [
//       { name: 'Police', number: '100' },
//       { name: 'Ambulance', number: '102' },
//       { name: 'Fire', number: '101' },
//       { name: 'Tourist Helpline', number: '1800-11-1363' },
//       { name: 'Women Helpline', number: '1091' },
//       { name: 'Child Helpline', number: '1098' }
//     ],
//     medicalCenters: [
//       {
//         name: 'All India Institute of Medical Sciences (AIIMS)',
//         address: 'Ansari Nagar, New Delhi',
//         phone: '011-26987000',
//         distance: '5.2 km',
//         services: ['Emergency', 'General Medicine', 'Specialist Care']
//       },
//       {
//         name: 'Fortis Escorts Heart Institute',
//         address: 'Okhla Road, New Delhi',
//         phone: '011-41676767',
//         distance: '12.5 km',
//         services: ['Cardiology', 'Emergency', 'Specialist Care']
//       },
//       {
//         name: 'Max Super Specialty Hospital',
//         address: 'Pandav Nagar, New Delhi',
//         phone: '011-45559999',
//         distance: '8.7 km',
//         services: ['Emergency', 'General Medicine', 'Specialist Care']
//       },
//       {
//         name: 'Apollo Hospital',
//         address: 'Mathura Road, New Delhi',
//         phone: '011-26925000',
//         distance: '10.3 km',
//         services: ['Emergency', 'General Medicine', 'Specialist Care']
//       }
//     ],
//     safetyTips: [
//       {
//         category: 'General Safety',
//         tips: [
//           'Always keep your tourist ID card with you',
//           'Avoid carrying large amounts of cash',
//           'Be cautious of pickpockets in crowded areas',
//           'Use only registered taxis or ride-sharing services',
//           'Keep emergency contact numbers saved in your phone',
//           'Stay aware of your surroundings, especially at night',
//           'Learn basic local phrases for emergencies',
//           'Avoid political gatherings or protests'
//         ]
//       },
//       {
//         category: 'Transport Safety',
//         tips: [
//           'Use only registered taxis or ride-sharing services',
//           'Avoid traveling alone at night',
//           'Keep your belongings secure in your vehicle',
//           'Use the metro for safer and faster travel',
//           'Be cautious of unlicensed drivers',
//           'Always check the vehicle license plate matches the app',
//           'Share your trip details with a friend or family member',
//           'Sit in the back seat of taxis for better safety'
//         ]
//       },
//       {
//         category: 'Health Safety',
//         tips: [
//           'Drink only bottled or purified water',
//           'Avoid street food if you have a sensitive stomach',
//           'Carry basic medications for common ailments',
//           'Be aware of local health risks and vaccinations',
//           'Use sunscreen and stay hydrated in hot weather',
//           'Be cautious of extreme weather conditions',
//           'Know the location of the nearest medical facility',
//           'Carry your medical history and emergency contacts'
//         ]
//       }
//     ],
//     culturalGuidelines: [
//       {
//         category: 'Dress Code',
//         tips: [
//           'Dress modestly when visiting religious sites',
//           'Remove shoes before entering temples or mosques',
//           'Avoid wearing revealing clothing in conservative areas',
//           'Carry a scarf for covering shoulders in religious places',
//           'Respect local customs and traditions'
//         ]
//       },
//       {
//         category: 'Behavior',
//         tips: [
//           'Greet people with a smile and respect',
//           'Avoid public displays of affection',
//           'Ask permission before taking someone\'s photo',
//           'Be mindful of your volume in public places',
//           'Respect local customs and traditions',
//           'Learn basic local phrases to show respect',
//           'Be patient and polite in all interactions',
//           'Avoid sensitive political or religious discussions'
//         ]
//       },
//       {
//         category: 'Photography',
//         tips: [
//           'Ask permission before photographing people',
//           'Avoid photographing military or government buildings',
//           'Respect signs prohibiting photography',
//           'Be discreet when taking photos in crowded areas',
//           'Avoid photographing religious ceremonies without permission',
//           'Respect local customs regarding photography',
//           'Be aware of your surroundings while taking photos',
//           'Keep your camera and valuables secure'
//         ]
//       }
//     ]
//   });
//   const [selectedCategory, setSelectedCategory] = useState('emergencyNumbers');

//   return (
//     <div className="space-y-6">
//       <motion.div
//         initial={{ opacity: 0, y: 20 }}
//         animate={{ opacity: 1, y: 0 }}
//         transition={{ duration: 0.5 }}
//         className="bg-white p-6 rounded-lg shadow-md"
//       >
//         <h1 className="text-2xl font-bold text-gray-800 mb-4">Safety Information</h1>
//         <p className="text-gray-600">Important safety information and guidelines for tourists</p>
//       </motion.div>

//       <motion.div
//         initial={{ opacity: 0, y: 20 }}
//         animate={{ opacity: 1, y: 0 }}
//         transition={{ duration: 0.5, delay: 0.1 }}
//         className="grid grid-cols-1 md:grid-cols-2 gap-6"
//       >
//         <div className="bg-white p-6 rounded-lg shadow-md">
//           <h2 className="text-xl font-semibold mb-4">Current Location</h2>
//           <LocationTracker />
//         </div>

//         <div className="bg-white p-6 rounded-lg shadow-md">
//           <h2 className="text-xl font-semibold mb-4">Safety Categories</h2>
//           <div className="space-y-4">
//             {[
//               { id: 'emergencyNumbers', name: 'Emergency Numbers' },
//               { id: 'medicalCenters', name: 'Nearby Medical Centers' },
//               { id: 'safetyTips', name: 'Safety Tips' },
//               { id: 'culturalGuidelines', name: 'Cultural Guidelines' }
//             ].map((category) => (
//               <motion.div
//                 key={category.id}
//                 initial={{ opacity: 0, x: -20 }}
//                 animate={{ opacity: 1, x: 0 }}
//                 transition={{ duration: 0.3, delay: category.id === 'emergencyNumbers' ? 0 : category.id === 'medicalCenters' ? 0.1 : category.id === 'safetyTips' ? 0.2 : 0.3 }}
//                 className={`p-4 border rounded-md cursor-pointer ${selectedCategory === category.id ? 'bg-indigo-50 border-indigo-300' : 'hover:bg-gray-50'}`}
//                 onClick={() => setSelectedCategory(category.id)}
//               >
//                 <p className="font-medium">{category.name}</p>
//               </motion.div>
//             ))}
//           </div>
//         </div>
//       </motion.div>

//       <motion.div
//         initial={{ opacity: 0, y: 20 }}
//         animate={{ opacity: 1, y: 0 }}
//         transition={{ duration: 0.5, delay: 0.2 }}
//         className="bg-white p-6 rounded-lg shadow-md"
//       >
//         <h2 className="text-xl font-semibold mb-4">{selectedCategory === 'emergencyNumbers' ? 'Emergency Numbers' :
//           selectedCategory === 'medicalCenters' ? 'Nearby Medical Centers' :
//           selectedCategory === 'safetyTips' ? 'Safety Tips' : 'Cultural Guidelines'}</h2>

//         {selectedCategory === 'emergencyNumbers' && (
//           <div className="space-y-4">
//             <motion.div
//               initial={{ opacity: 0, y: 20 }}
//               animate={{ opacity: 1, y: 0 }}
//               transition={{ duration: 0.3 }}
//               className="p-4 border rounded-md"
//             >
//               <h3 className="text-lg font-medium mb-2">Important Emergency Numbers</h3>
//               <div className="space-y-2">
//                 {safetyInfo.emergencyNumbers.map((number, index) => (
//                   <motion.div
//                     key={index}
//                     initial={{ opacity: 0, x: -20 }}
//                     animate={{ opacity: 1, x: 0 }}
//                     transition={{ duration: 0.3, delay: index * 0.05 }}
//                     className="p-3 border rounded-md bg-gray-50"
//                   >
//                     <div className="flex justify-between">
//                       <p className="font-medium">{number.name}</p>
//                       <p className="text-indigo-600 font-bold">{number.number}</p>
//                     </div>
//                   </motion.div>
//                 ))}
//               </div>
//             </motion.div>
//           </div>
//         )}

//         {selectedCategory === 'medicalCenters' && (
//           <div className="space-y-4">
//             <motion.div
//               initial={{ opacity: 0, y: 20 }}
//               animate={{ opacity: 1, y: 0 }}
//               transition={{ duration: 0.3 }}
//               className="p-4 border rounded-md"
//             >
//               <h3 className="text-lg font-medium mb-2">Nearby Medical Centers</h3>
//               <div className="space-y-2">
//                 {safetyInfo.medicalCenters.map((center, index) => (
//                   <motion.div
//                     key={index}
//                     initial={{ opacity: 0, x: -20 }}
//                     animate={{ opacity: 1, x: 0 }}
//                     transition={{ duration: 0.3, delay: index * 0.05 }}
//                     className="p-3 border rounded-md bg-gray-50"
//                   >
//                     <p className="font-medium">{center.name}</p>
//                     <p className="text-sm text-gray-500">{center.address}</p>
//                     <p className="text-sm text-gray-500">Phone: {center.phone}</p>
//                     <p className="text-sm text-gray-500">Distance: {center.distance}</p>
//                     <p className="text-sm text-gray-500">Services: {center.services.join(', ')}</p>
//                   </motion.div>
//                 ))}
//               </div>
//             </motion.div>
//           </div>
//         )}

//         {selectedCategory === 'safetyTips' && (
//           <div className="space-y-4">
//             {safetyInfo.safetyTips.map((category, index) => (
//               <motion.div
//                 key={index}
//                 initial={{ opacity: 0, y: 20 }}
//                 animate={{ opacity: 1, y: 0 }}
//                 transition={{ duration: 0.3, delay: index * 0.1 }}
//                 className="p-4 border rounded-md"
//               >
//                 <h3 className="text-lg font-medium mb-2">{category.category}</h3>
//                 <div className="space-y-2">
//                   {category.tips.map((tip, tipIndex) => (
//                     <motion.div
//                       key={tipIndex}
//                       initial={{ opacity: 0, x: -20 }}
//                       animate={{ opacity: 1, x: 0 }}
//                       transition={{ duration: 0.3, delay: tipIndex * 0.05 }}
//                       className="p-3 border rounded-md bg-gray-50"
//                     >
//                       <p className="text-gray-700">{tip}</p>
//                     </motion.div>
//                   ))}
//                 </div>
//               </motion.div>
//             ))}
//           </div>
//         )}

//         {selectedCategory === 'culturalGuidelines' && (
//           <div className="space-y-4">
//             {safetyInfo.culturalGuidelines.map((category, index) => (
//               <motion.div
//                 key={index}
//                 initial={{ opacity: 0, y: 20 }}
//                 animate={{ opacity: 1, y: 0 }}
//                 transition={{ duration: 0.3, delay: index * 0.1 }}
//                 className="p-4 border rounded-md"
//               >
//                 <h3 className="text-lg font-medium mb-2">{category.category}</h3>
//                 <div className="space-y-2">
//                   {category.tips.map((tip, tipIndex) => (
//                     <motion.div
//                       key={tipIndex}
//                       initial={{ opacity: 0, x: -20 }}
//                       animate={{ opacity: 1, x: 0 }}
//                       transition={{ duration: 0.3, delay: tipIndex * 0.05 }}
//                       className="p-3 border rounded-md bg-gray-50"
//                     >
//                       <p className="text-gray-700">{tip}</p>
//                     </motion.div>
//                   ))}
//                 </div>
//               </motion.div>
//             ))}
//           </div>
//         )}
//       </motion.div>
//     </div>
//   );
// };

// export default SafetyInfo;

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useAuth } from '../../components/Auth/AuthContext';
import LocationTracker from '../../components/Shared/LocationTracker';

const SafetyInfo = () => {
  const { user } = useAuth();
  const [safetyTips, setSafetyTips] = useState([]);
  const [emergencyContacts, setEmergencyContacts] = useState([]);
  const [localLaws, setLocalLaws] = useState([]);
  const [currentLocation, setCurrentLocation] = useState(null);
  const [activeTab, setActiveTab] = useState('safetyTips');

  useEffect(() => {
    // Simulate fetching safety information based on current location
    const fetchSafetyInfo = async () => {
      try {
        // In a real app, you would fetch this from your API
        await new Promise(resolve => setTimeout(resolve, 1000));

        // Mock data - in a real app, this would come from your API
        const mockSafetyTips = [
          {
            id: 1,
            title: "General Safety Tips",
            description: "Always keep your belongings secure and be aware of your surroundings. Avoid walking alone at night in poorly lit areas.",
            category: "general"
          },
          {
            id: 2,
            title: "Transport Safety",
            description: "Use only registered taxis or ride-sharing services. Avoid unmarked vehicles and always check the driver's ID.",
            category: "transport"
          },
          {
            id: 3,
            title: "Emergency Preparedness",
            description: "Save emergency contact numbers in your phone. Know the location of the nearest police station and hospital.",
            category: "emergency"
          },
          {
            id: 4,
            title: "Cultural Sensitivity",
            description: "Respect local customs and traditions. Dress appropriately for religious sites and ask before taking photographs of people.",
            category: "cultural"
          }
        ];

        const mockEmergencyContacts = [
          {
            id: 1,
            name: "Tourist Police",
            phone: "+91-11-23456789",
            description: "Dedicated police unit for tourist assistance"
          },
          {
            id: 2,
            name: "Ambulance",
            phone: "102",
            description: "Medical emergency services"
          },
          {
            id: 3,
            name: "Fire Department",
            phone: "101",
            description: "Fire and rescue services"
          },
          {
            id: 4,
            name: "Your Embassy",
            phone: "+91-11-98765432",
            phone2: "+91-11-98765433",
            description: "Consular assistance for citizens"
          }
        ];

        const mockLocalLaws = [
          {
            id: 1,
            title: "Visa Requirements",
            description: "Ensure your visa is valid for the duration of your stay. Overstaying can result in fines or detention."
          },
          {
            id: 2,
            title: "Drug Laws",
            description: "Strict penalties apply for drug possession or trafficking. Even small amounts can lead to severe consequences."
          },
          {
            id: 3,
            title: "Photography Restrictions",
            description: "Some government buildings and military installations prohibit photography. Always ask permission before photographing people."
          },
          {
            id: 4,
            title: "Public Behavior",
            description: "Public intoxication and disorderly conduct are illegal. Respect local customs regarding public behavior and dress."
          }
        ];

        setSafetyTips(mockSafetyTips);
        setEmergencyContacts(mockEmergencyContacts);
        setLocalLaws(mockLocalLaws);
      } catch (error) {
        console.error("Error fetching safety information:", error);
      }
    };

    fetchSafetyInfo();
  }, [currentLocation]);

  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };

  return (
    <div className="space-y-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="bg-white p-6 rounded-lg shadow-md"
      >
        <h2 className="text-2xl font-bold text-indigo-800 mb-4">Safety Information</h2>
        <p className="text-gray-600 mb-6">
          Stay informed about safety guidelines, emergency contacts, and local laws to ensure a safe and enjoyable trip.
        </p>

        <div className="flex flex-wrap gap-2 mb-6">
          <button
            onClick={() => handleTabChange('safetyTips')}
            className={`px-4 py-2 rounded-md text-sm font-medium ${activeTab === 'safetyTips' ? 'bg-indigo-600 text-white' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'}`}
          >
            Safety Tips
          </button>
          <button
            onClick={() => handleTabChange('emergencyContacts')}
            className={`px-4 py-2 rounded-md text-sm font-medium ${activeTab === 'emergencyContacts' ? 'bg-indigo-600 text-white' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'}`}
          >
            Emergency Contacts
          </button>
          <button
            onClick={() => handleTabChange('localLaws')}
            className={`px-4 py-2 rounded-md text-sm font-medium ${activeTab === 'localLaws' ? 'bg-indigo-600 text-white' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'}`}
          >
            Local Laws
          </button>
        </div>

        {activeTab === 'safetyTips' && (
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-800 mb-2">Safety Tips for Your Location</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {safetyTips.map((tip) => (
                <motion.div
                  key={tip.id}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="border rounded-lg p-4 hover:shadow-md transition-shadow"
                >
                  <div className="flex items-start">
                    <div className="w-10 h-10 bg-indigo-100 rounded-full flex items-center justify-center mr-3">
                      <i className="fas fa-info-circle text-indigo-600 text-lg"></i>
                    </div>
                    <div>
                      <h4 className="font-medium text-gray-800">{tip.title}</h4>
                      <p className="text-gray-600 mt-1">{tip.description}</p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'emergencyContacts' && (
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-800 mb-2">Emergency Contacts</h3>
            <p className="text-gray-600 mb-4">
              Save these important numbers in your phone for quick access during emergencies.
            </p>

            <div className="space-y-4">
              {emergencyContacts.map((contact) => (
                <motion.div
                  key={contact.id}
                  whileHover={{ scale: 1.01 }}
                  className="border rounded-lg p-4 hover:shadow-md transition-shadow"
                >
                  <div className="flex items-start">
                    <div className="w-10 h-10 bg-red-100 rounded-full flex items-center justify-center mr-3">
                      <i className="fas fa-phone-alt text-red-600 text-lg"></i>
                    </div>
                    <div>
                      <h4 className="font-medium text-gray-800">{contact.name}</h4>
                      <p className="text-gray-600 mt-1">
                        <a href={`tel:${contact.phone}`} className="text-indigo-600 hover:underline">
                          {contact.phone}
                        </a>
                        {contact.phone2 && (
                          <>
                            <br />
                            <a href={`tel:${contact.phone2}`} className="text-indigo-600 hover:underline">
                              {contact.phone2}
                            </a>
                          </>
                        )}
                      </p>
                      <p className="text-sm text-gray-500 mt-1">{contact.description}</p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            <div className="mt-6 pt-6 border-t border-gray-200">
              <h4 className="font-medium text-gray-700 mb-2">Emergency Procedures</h4>
              <ul className="list-disc pl-5 space-y-2 text-gray-700">
                <li>In case of emergency, call the appropriate number immediately</li>
                <li>If you can't make a call, use the emergency button in the app</li>
                <li>Stay calm and follow instructions from emergency personnel</li>
                <li>If possible, move to a safe location before calling for help</li>
              </ul>
            </div>
          </div>
        )}

        {activeTab === 'localLaws' && (
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-800 mb-2">Important Local Laws</h3>
            <p className="text-gray-600 mb-4">
              Familiarize yourself with these laws to avoid legal issues during your stay.
            </p>

            <div className="space-y-4">
              {localLaws.map((law) => (
                <motion.div
                  key={law.id}
                  whileHover={{ scale: 1.01 }}
                  className="border rounded-lg p-4 hover:shadow-md transition-shadow"
                >
                  <div className="flex items-start">
                    <div className="w-10 h-10 bg-yellow-100 rounded-full flex items-center justify-center mr-3">
                      <i className="fas fa-gavel text-yellow-600 text-lg"></i>
                    </div>
                    <div>
                      <h4 className="font-medium text-gray-800">{law.title}</h4>
                      <p className="text-gray-600 mt-1">{law.description}</p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            <div className="mt-6 pt-6 border-t border-gray-200">
              <h4 className="font-medium text-gray-700 mb-2">Additional Legal Information</h4>
              <ul className="list-disc pl-5 space-y-2 text-gray-700">
                <li>Carry your passport and visa at all times</li>
                <li>Respect local customs and religious practices</li>
                <li>Obtain proper permits for photography in restricted areas</li>
                <li>Follow all traffic laws and regulations</li>
                <li>Report any legal issues to your embassy immediately</li>
              </ul>
            </div>
          </div>
        )}
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="bg-white p-6 rounded-lg shadow-md"
      >
        <h2 className="text-2xl font-bold text-indigo-800 mb-4">Current Location Safety</h2>
        <LocationTracker />
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.4 }}
        className="bg-white p-6 rounded-lg shadow-md"
      >
        <h2 className="text-2xl font-bold text-indigo-800 mb-4">Safety Checklist</h2>
        <p className="text-gray-600 mb-6">
          Use this checklist to ensure you're prepared for your travels.
        </p>

        <div className="space-y-4">
          <div className="border rounded-lg p-4">
            <h3 className="font-medium text-gray-800 mb-3">Before You Travel</h3>
            <ul className="space-y-2">
              {[
                "Register with your embassy",
                "Make copies of important documents",
                "Share your itinerary with family",
                "Check travel advisories for your destination",
                "Ensure you have travel insurance"
              ].map((item, index) => (
                <li key={index} className="flex items-center">
                  <input
                    type="checkbox"
                    id={`checklist-${index}`}
                    className="h-4 w-4 text-indigo-600 rounded focus:ring-indigo-500"
                  />
                  <label htmlFor={`checklist-${index}`} className="ml-2 text-gray-700">
                    {item}
                  </label>
                </li>
              ))}
            </ul>
          </div>

          <div className="border rounded-lg p-4">
            <h3 className="font-medium text-gray-800 mb-3">During Your Trip</h3>
            <ul className="space-y-2">
              {[
                "Keep your belongings secure",
                "Be aware of your surroundings",
                "Avoid walking alone at night",
                "Use only registered taxis",
                "Keep emergency contacts handy"
              ].map((item, index) => (
                <li key={index} className="flex items-center">
                  <input
                    type="checkbox"
                    id={`checklist-${index + 5}`}
                    className="h-4 w-4 text-indigo-600 rounded focus:ring-indigo-500"
                  />
                  <label htmlFor={`checklist-${index + 5}`} className="ml-2 text-gray-700">
                    {item}
                  </label>
                </li>
              ))}
            </ul>
          </div>

          <div className="border rounded-lg p-4">
            <h3 className="font-medium text-gray-800 mb-3">In Case of Emergency</h3>
            <ul className="space-y-2">
              {[
                "Stay calm and assess the situation",
                "Call emergency services immediately",
                "Move to a safe location if possible",
                "Contact your embassy if needed",
                "Follow instructions from authorities"
              ].map((item, index) => (
                <li key={index} className="flex items-center">
                  <input
                    type="checkbox"
                    id={`checklist-${index + 10}`}
                    className="h-4 w-4 text-indigo-600 rounded focus:ring-indigo-500"
                  />
                  <label htmlFor={`checklist-${index + 10}`} className="ml-2 text-gray-700">
                    {item}
                  </label>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default SafetyInfo;