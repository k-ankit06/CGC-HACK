// // import { useState } from 'react'
// // import { MapPin, Navigation, AlertTriangle, Shield, Clock, TrendingUp, CheckCircle } from 'lucide-react'

// // const SafeRoutes = () => {
// //   const [selectedRoute, setSelectedRoute] = useState(null)
// //   const [fromLocation, setFromLocation] = useState('')
// //   const [toLocation, setToLocation] = useState('')

// //   const popularRoutes = [
// //     {
// //       id: 1,
// //       from: 'Hotel Oberoi Amarvilas',
// //       to: 'Taj Mahal',
// //       distance: '1.2 km',
// //       duration: '5 mins',
// //       safetyScore: 98,
// //       crowdLevel: 'Medium',
// //       riskFactors: ['None'],
// //       recommendedTime: '6:00 AM - 6:00 PM',
// //       route: 'Via Taj East Gate Road',
// //       transportMode: 'Walking/Auto',
// //       highlights: ['Well-lit path', 'Tourist police present', 'CCTV coverage']
// //     },
// //     {
// //       id: 2,
// //       from: 'Taj Mahal',
// //       to: 'Agra Fort',
// //       distance: '2.5 km',
// //       duration: '12 mins',
// //       safetyScore: 95,
// //       crowdLevel: 'High',
// //       riskFactors: ['Heavy traffic'],
// //       recommendedTime: 'All day',
// //       route: 'Via Taj Road',
// //       transportMode: 'Auto/Taxi',
// //       highlights: ['Main road', 'Multiple help points', 'Good connectivity']
// //     },
// //     {
// //       id: 3,
// //       from: 'India Gate',
// //       to: 'Red Fort',
// //       distance: '5.8 km',
// //       duration: '25 mins',
// //       safetyScore: 88,
// //       crowdLevel: 'High',
// //       riskFactors: ['Pickpocketing risk', 'Heavy crowd'],
// //       recommendedTime: '9:00 AM - 5:00 PM',
// //       route: 'Via Rajpath and Netaji Subhash Marg',
// //       transportMode: 'Metro/Taxi',
// //       highlights: ['Metro available', 'Tourist police', 'Safe parking']
// //     },
// //     {
// //       id: 4,
// //       from: 'Gateway of India',
// //       to: 'Marine Drive',
// //       distance: '3.2 km',
// //       duration: '15 mins',
// //       safetyScore: 85,
// //       crowdLevel: 'Very High',
// //       riskFactors: ['Evening crowd', 'Traffic congestion'],
// //       recommendedTime: 'Morning preferred',
// //       route: 'Via Mahatma Gandhi Road',
// //       transportMode: 'Taxi/Bus',
// //       highlights: ['Scenic route', 'Well-maintained', 'Police patrolling']
// //     }
// //   ]

// //   const safetyFeatures = [
// //     {
// //       icon: Shield,
// //       title: 'Real-time Safety Monitoring',
// //       description: 'AI-powered risk assessment updates every 5 minutes'
// //     },
// //     {
// //       icon: AlertTriangle,
// //       title: 'Live Alerts',
// //       description: 'Instant notifications about incidents or unsafe conditions'
// //     },
// //     {
// //       icon: MapPin,
// //       title: 'GPS Tracking',
// //       description: 'Your location is tracked for emergency assistance'
// //     },
// //     {
// //       icon: Clock,
// //       title: 'Best Time Suggestions',
// //       description: 'Recommended travel times based on safety data'
// //     }
// //   ]

// //   const nearbyHelpPoints = [
// //     { name: 'Tourist Police Booth', distance: '200m', type: 'Police' },
// //     { name: 'Medical Aid Center', distance: '350m', type: 'Medical' },
// //     { name: 'Tourist Help Desk', distance: '150m', type: 'Information' },
// //     { name: 'Safe Zone Shelter', distance: '400m', type: 'Shelter' }
// //   ]

// //   const getSafetyColor = (score) => {
// //     if (score >= 90) return 'text-success-600 bg-success-100'
// //     if (score >= 75) return 'text-warning-600 bg-warning-100'
// //     return 'text-danger-600 bg-danger-100'
// //   }

// //   const getCrowdColor = (level) => {
// //     switch(level) {
// //       case 'Low': return 'bg-success-100 text-success-700'
// //       case 'Medium': return 'bg-warning-100 text-warning-700'
// //       case 'High': return 'bg-orange-100 text-orange-700'
// //       case 'Very High': return 'bg-danger-100 text-danger-700'
// //       default: return 'bg-gray-100 text-gray-700'
// //     }
// //   }

// //   return (
// //     <div className="space-y-6">
// //       <div>
// //         <h2 className="text-3xl font-bold text-gray-900">Safe Routes Navigator</h2>
// //         <p className="text-gray-600 mt-1">AI-powered safe route recommendations with real-time risk assessment</p>
// //       </div>

// //       {/* Route Planner */}
// //       <div className="card bg-gradient-to-r from-primary-600 to-primary-700 text-white">
// //         <h3 className="text-xl font-bold mb-4 flex items-center">
// //           <Navigation className="h-6 w-6 mr-2" />
// //           Plan Your Safe Route
// //         </h3>
// //         <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
// //           <div>
// //             <label className="block text-sm text-primary-100 mb-2">From (Current Location)</label>
// //             <input
// //               type="text"
// //               placeholder="Enter starting point..."
// //               className="w-full px-4 py-3 rounded-lg text-gray-900"
// //               value={fromLocation}
// //               onChange={(e) => setFromLocation(e.target.value)}
// //             />
// //           </div>
// //           <div>
// //             <label className="block text-sm text-primary-100 mb-2">To (Destination)</label>
// //             <input
// //               type="text"
// //               placeholder="Enter destination..."
// //               className="w-full px-4 py-3 rounded-lg text-gray-900"
// //               value={toLocation}
// //               onChange={(e) => setToLocation(e.target.value)}
// //             />
// //           </div>
// //         </div>
// //         <button className="w-full bg-white text-primary-600 py-3 rounded-lg hover:bg-primary-50 font-semibold">
// //           🗺️ Find Safest Route
// //         </button>
// //       </div>

// //       {/* Safety Features */}
// //       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
// //         {safetyFeatures.map((feature, index) => {
// //           const Icon = feature.icon
// //           return (
// //             <div key={index} className="card text-center hover:shadow-lg transition-shadow">
// //               <div className="inline-block p-3 bg-primary-100 rounded-full mb-3">
// //                 <Icon className="h-8 w-8 text-primary-600" />
// //               </div>
// //               <h4 className="font-bold text-gray-900 mb-2">{feature.title}</h4>
// //               <p className="text-sm text-gray-600">{feature.description}</p>
// //             </div>
// //           )
// //         })}
// //       </div>

// //       {/* Popular Safe Routes */}
// //       <div className="card">
// //         <h3 className="text-xl font-bold mb-4">🌟 Popular Safe Routes</h3>
// //         <div className="space-y-4">
// //           {popularRoutes.map((route) => (
// //             <div key={route.id} className="border-2 border-gray-200 rounded-lg p-5 hover:border-primary-500 hover:shadow-lg transition-all">
// //               <div className="flex items-start justify-between mb-3">
// //                 <div className="flex-1">
// //                   <div className="flex items-center gap-3 mb-2">
// //                     <div className="flex items-center gap-2">
// //                       <MapPin className="h-5 w-5 text-success-600" />
// //                       <span className="font-semibold text-gray-900">{route.from}</span>
// //                     </div>
// //                     <span className="text-gray-400">→</span>
// //                     <div className="flex items-center gap-2">
// //                       <MapPin className="h-5 w-5 text-danger-600" />
// //                       <span className="font-semibold text-gray-900">{route.to}</span>
// //                     </div>
// //                   </div>
// //                   <p className="text-sm text-gray-600 mb-1">{route.route}</p>
// //                   <p className="text-xs text-gray-500">Recommended: {route.transportMode}</p>
// //                 </div>
// //                 <div className="text-right">
// //                   <div className={`px-4 py-2 rounded-full font-bold text-lg mb-1 ${getSafetyColor(route.safetyScore)}`}>
// //                     {route.safetyScore}%
// //                   </div>
// //                   <p className="text-xs text-gray-500">Safety Score</p>
// //                 </div>
// //               </div>

// //               <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-3">
// //                 <div className="bg-gray-50 p-3 rounded-lg">
// //                   <p className="text-xs text-gray-600 mb-1">Distance</p>
// //                   <p className="font-bold text-gray-900">{route.distance}</p>
// //                 </div>
// //                 <div className="bg-gray-50 p-3 rounded-lg">
// //                   <p className="text-xs text-gray-600 mb-1">Duration</p>
// //                   <p className="font-bold text-gray-900">{route.duration}</p>
// //                 </div>
// //                 <div className="bg-gray-50 p-3 rounded-lg">
// //                   <p className="text-xs text-gray-600 mb-1">Crowd Level</p>
// //                   <span className={`px-2 py-1 rounded-full text-xs font-semibold ${getCrowdColor(route.crowdLevel)}`}>
// //                     {route.crowdLevel}
// //                   </span>
// //                 </div>
// //                 <div className="bg-gray-50 p-3 rounded-lg">
// //                   <p className="text-xs text-gray-600 mb-1">Best Time</p>
// //                   <p className="font-bold text-gray-900 text-xs">{route.recommendedTime}</p>
// //                 </div>
// //               </div>

// //               <div className="bg-primary-50 p-3 rounded-lg mb-3">
// //                 <p className="text-sm font-semibold text-primary-900 mb-2">✨ Route Highlights:</p>
// //                 <div className="flex flex-wrap gap-2">
// //                   {route.highlights.map((highlight, idx) => (
// //                     <span key={idx} className="px-2 py-1 bg-white text-primary-700 rounded text-xs font-medium">
// //                       ✓ {highlight}
// //                     </span>
// //                   ))}
// //                 </div>
// //               </div>

// //               {route.riskFactors[0] !== 'None' && (
// //                 <div className="bg-warning-50 border-l-4 border-warning-500 p-3 rounded mb-3">
// //                   <p className="text-sm font-semibold text-warning-900 mb-1">⚠️ Risk Factors:</p>
// //                   <p className="text-sm text-warning-800">{route.riskFactors.join(', ')}</p>
// //                 </div>
// //               )}

// //               <div className="flex gap-3">
// //                 <button 
// //                   onClick={() => setSelectedRoute(route)}
// //                   className="flex-1 btn-primary"
// //                 >
// //                   <Navigation className="inline h-4 w-4 mr-2" />
// //                   Start Navigation
// //                 </button>
// //                 <button className="flex-1 bg-success-600 text-white px-4 py-2 rounded-lg hover:bg-success-700 font-semibold">
// //                   <MapPin className="inline h-4 w-4 mr-2" />
// //                   View on Map
// //                 </button>
// //               </div>
// //             </div>
// //           ))}
// //         </div>
// //       </div>

// //       {/* Nearby Help Points */}
// //       <div className="card">
// //         <h3 className="text-xl font-bold mb-4 flex items-center">
// //           <Shield className="h-6 w-6 mr-2 text-primary-600" />
// //           Nearby Help Points on Your Route
// //         </h3>
// //         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
// //           {nearbyHelpPoints.map((point, index) => (
// //             <div key={index} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
// //               <div className="flex items-center justify-between mb-2">
// //                 <span className={`px-2 py-1 rounded text-xs font-semibold ${
// //                   point.type === 'Police' ? 'bg-primary-100 text-primary-700' :
// //                   point.type === 'Medical' ? 'bg-danger-100 text-danger-700' :
// //                   point.type === 'Information' ? 'bg-success-100 text-success-700' :
// //                   'bg-purple-100 text-purple-700'
// //                 }`}>
// //                   {point.type}
// //                 </span>
// //                 <span className="text-sm font-bold text-gray-600">{point.distance}</span>
// //               </div>
// //               <p className="font-semibold text-gray-900">{point.name}</p>
// //             </div>
// //           ))}
// //         </div>
// //       </div>

// //       {/* Safety Tips */}
// //       <div className="card bg-success-50 border-2 border-success-300">
// //         <h3 className="text-xl font-bold text-success-900 mb-4">🛡️ Route Safety Tips</h3>
// //         <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
// //           {[
// //             'Share your route and ETA with family/friends',
// //             'Keep your phone charged and GPS enabled',
// //             'Follow the recommended route for maximum safety',
// //             'Avoid shortcuts through unfamiliar areas',
// //             'Travel during recommended time windows',
// //             'Stay alert and aware of your surroundings',
// //             'Keep emergency contacts readily accessible',
// //             'Use authorized transportation services only'
// //           ].map((tip, index) => (
// //             <div key={index} className="flex items-start gap-2 bg-white p-3 rounded-lg">
// //               <CheckCircle className="h-5 w-5 text-success-600 flex-shrink-0 mt-0.5" />
// //               <span className="text-gray-700">{tip}</span>
// //             </div>
// //           ))}
// //         </div>
// //       </div>

// //       {/* Live Safety Updates */}
// //       <div className="card bg-gradient-to-r from-purple-600 to-purple-700 text-white">
// //         <h3 className="text-xl font-bold mb-4 flex items-center">
// //           <TrendingUp className="h-6 w-6 mr-2" />
// //           Live Safety Updates
// //         </h3>
// //         <div className="space-y-3">
// //           <div className="bg-white/20 backdrop-blur rounded-lg p-3">
// //             <div className="flex items-center justify-between mb-1">
// //               <span className="font-semibold">Taj Mahal Area</span>
// //               <span className="px-2 py-1 bg-success-500 rounded-full text-xs font-bold">SAFE</span>
// //             </div>
// //             <p className="text-sm text-purple-100">Low crowd density. Excellent visibility. Tourist police active.</p>
// //             <p className="text-xs text-purple-200 mt-1">Updated 2 mins ago</p>
// //           </div>
// //           <div className="bg-white/20 backdrop-blur rounded-lg p-3">
// //             <div className="flex items-center justify-between mb-1">
// //               <span className="font-semibold">Sadar Bazaar</span>
// //               <span className="px-2 py-1 bg-warning-500 rounded-full text-xs font-bold">CAUTION</span>
// //             </div>
// //             <p className="text-sm text-purple-100">High crowd. Pickpocketing reports. Keep valuables secure.</p>
// //             <p className="text-xs text-purple-200 mt-1">Updated 5 mins ago</p>
// //           </div>
// //           <div className="bg-white/20 backdrop-blur rounded-lg p-3">
// //             <div className="flex items-center justify-between mb-1">
// //               <span className="font-semibold">Agra Fort</span>
// //               <span className="px-2 py-1 bg-success-500 rounded-full text-xs font-bold">SAFE</span>
// //             </div>
// //             <p className="text-sm text-purple-100">Moderate crowd. Well-lit pathways. Help points available.</p>
// //             <p className="text-xs text-purple-200 mt-1">Updated 1 min ago</p>
// //           </div>
// //         </div>
// //       </div>

// //       {/* Route Detail Modal */}
// //       {selectedRoute && (
// //         <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
// //           <div className="bg-white rounded-2xl max-w-3xl w-full max-h-[90vh] overflow-y-auto">
// //             <div className="p-6">
// //               <div className="flex items-center justify-between mb-6">
// //                 <h3 className="text-2xl font-bold text-gray-900">Route Details & Navigation</h3>
// //                 <button
// //                   onClick={() => setSelectedRoute(null)}
// //                   className="text-gray-500 hover:text-gray-700 text-2xl"
// //                 >
// //                   ×
// //                 </button>
// //               </div>

// //               <div className="space-y-6">
// //                 {/* Route Overview */}
// //                 <div className="bg-gradient-to-r from-primary-600 to-primary-700 text-white rounded-xl p-6">
// //                   <div className="flex items-center justify-between mb-4">
// //                     <div className="flex items-center gap-3">
// //                       <MapPin className="h-6 w-6" />
// //                       <div>
// //                         <p className="text-sm text-primary-100">From</p>
// //                         <p className="font-bold text-lg">{selectedRoute.from}</p>
// //                       </div>
// //                     </div>
// //                     <Navigation className="h-8 w-8" />
// //                     <div className="flex items-center gap-3">
// //                       <div className="text-right">
// //                         <p className="text-sm text-primary-100">To</p>
// //                         <p className="font-bold text-lg">{selectedRoute.to}</p>
// //                       </div>
// //                       <MapPin className="h-6 w-6" />
// //                     </div>
// //                   </div>
// //                   <div className="grid grid-cols-3 gap-4">
// //                     <div className="bg-white/20 backdrop-blur rounded-lg p-3 text-center">
// //                       <p className="text-2xl font-bold">{selectedRoute.distance}</p>
// //                       <p className="text-sm text-primary-100">Distance</p>
// //                     </div>
// //                     <div className="bg-white/20 backdrop-blur rounded-lg p-3 text-center">
// //                       <p className="text-2xl font-bold">{selectedRoute.duration}</p>
// //                       <p className="text-sm text-primary-100">Duration</p>
// //                     </div>
// //                     <div className="bg-white/20 backdrop-blur rounded-lg p-3 text-center">
// //                       <p className="text-2xl font-bold">{selectedRoute.safetyScore}%</p>
// //                       <p className="text-sm text-primary-100">Safety</p>
// //                     </div>
// //                   </div>
// //                 </div>

// //                 {/* Turn by Turn Navigation */}
// //                 <div>
// //                   <h4 className="font-bold text-lg mb-3">📍 Turn-by-Turn Directions</h4>
// //                   <div className="space-y-2">
// //                     {[
// //                       'Start from Hotel Oberoi Amarvilas',
// //                       'Head east on Taj East Gate Road (200m)',
// //                       'Turn right toward Taj Mahal entrance (150m)',
// //                       'Pass through security checkpoint',
// //                       'Arrive at Taj Mahal East Gate'
// //                     ].map((direction, idx) => (
// //                       <div key={idx} className="flex items-start gap-3 bg-gray-50 p-3 rounded-lg">
// //                         <div className="h-8 w-8 bg-primary-600 text-white rounded-full flex items-center justify-center font-bold flex-shrink-0">
// //                           {idx + 1}
// //                         </div>
// //                         <p className="text-gray-700 pt-1">{direction}</p>
// //                       </div>
// //                     ))}
// //                   </div>
// //                 </div>

// //                 {/* Safety Information */}
// //                 <div className="bg-success-50 border-2 border-success-300 rounded-lg p-4">
// //                   <h4 className="font-bold text-success-900 mb-2">✅ Safety Features on This Route</h4>
// //                   <ul className="space-y-1">
// //                     {selectedRoute.highlights.map((highlight, idx) => (
// //                       <li key={idx} className="flex items-center gap-2 text-success-800">
// //                         <CheckCircle className="h-4 w-4" />
// //                         <span>{highlight}</span>
// //                       </li>
// //                     ))}
// //                   </ul>
// //                 </div>

// //                 {/* Action Buttons */}
// //                 <div className="flex gap-3">
// //                   <button className="flex-1 btn-primary">
// //                     <Navigation className="inline h-5 w-5 mr-2" />
// //                     Start Navigation
// //                   </button>
// //                   <button className="flex-1 bg-success-600 text-white px-4 py-3 rounded-lg hover:bg-success-700 font-semibold">
// //                     Share Route
// //                   </button>
// //                 </div>
// //               </div>
// //             </div>
// //           </div>
// //         </div>
// //       )}
// //     </div>
// //   )
// // }

// // export default SafeRoutes

// import { useState, useEffect } from 'react';
// import { motion } from 'framer-motion';
// import LocationTracker from '../../components/Shared/LocationTracker';

// const SafeRoutes = () => {
//   const [routes, setRoutes] = useState([]);
//   const [selectedRoute, setSelectedRoute] = useState(null);
//   const [searchTerm, setSearchTerm] = useState('');
//   const [filter, setFilter] = useState('all');
//   const [mapView, setMapView] = useState(false);
//   const [selectedLocation, setSelectedLocation] = useState(null);

//   useEffect(() => {
//     // Simulate fetching route data
//     const fetchRoutes = () => {
//       const sampleRoutes = [
//         {
//           id: 1,
//           name: 'India Gate to Connaught Place',
//           distance: '3.5 km',
//           duration: '15 minutes',
//           safetyScore: 85,
//           description: 'This route takes you through Rajpath and passes by important landmarks. It is generally safe during the day but can get crowded in the evenings.',
//           startPoint: 'India Gate',
//           endPoint: 'Connaught Place',
//           waypoints: [
//             { name: 'India Gate', latitude: 28.6122, longitude: 77.2295 },
//             { name: 'Rajpath', latitude: 28.6129, longitude: 77.2174 },
//             { name: 'Vijay Chowk', latitude: 28.6146, longitude: 77.2170 },
//             { name: 'Connaught Place', latitude: 28.6304, longitude: 77.2177 }
//           ],
//           safetyTips: [
//             'Avoid walking alone after 8 PM',
//             'Use designated pedestrian crossings',
//             'Be cautious of pickpockets in crowded areas',
//             'Stay on well-lit paths at night'
//           ]
//         },
//         {
//           id: 2,
//           name: 'Chandni Chowk to Red Fort',
//           distance: '2.0 km',
//           duration: '10 minutes',
//           safetyScore: 70,
//           description: 'This historic route takes you through the bustling Chandni Chowk market to the iconic Red Fort. It can be very crowded, especially on weekends.',
//           startPoint: 'Chandni Chowk',
//           endPoint: 'Red Fort',
//           waypoints: [
//             { name: 'Chandni Chowk', latitude: 28.6507, longitude: 77.0691 },
//             { name: 'Jama Masjid', latitude: 28.6498, longitude: 77.2413 },
//             { name: 'Red Fort', latitude: 28.6529, longitude: 77.2413 }
//           ],
//           safetyTips: [
//             'Keep your belongings secure',
//             'Be aware of your surroundings',
//             'Avoid crowded areas if you feel uncomfortable',
//             'Use registered auto-rickshaws for longer distances'
//           ]
//         },
//         {
//           id: 3,
//           name: 'Dwarka to Janakpuri',
//           distance: '12.0 km',
//           duration: '45 minutes',
//           safetyScore: 65,
//           description: 'This route connects two major residential areas. It is generally safe but can have traffic congestion during peak hours.',
//           startPoint: 'Dwarka Sector 21',
//           endPoint: 'Janakpuri',
//           waypoints: [
//             { name: 'Dwarka Sector 21', latitude: 28.6999, longitude: 77.0431 },
//             { name: 'Dwarka Metro Station', latitude: 28.7006, longitude: 77.0425 },
//             { name: 'Janakpuri Metro Station', latitude: 28.6507, longitude: 77.0691 }
//           ],
//           safetyTips: [
//             'Use the metro for a safer and faster journey',
//             'Avoid walking alone at night',
//             'Keep emergency contact numbers handy',
//             'Use registered cabs for late-night travel'
//           ]
//         },
//         {
//           id: 4,
//           name: 'Lajpat Nagar to Safdarjung',
//           distance: '5.0 km',
//           duration: '20 minutes',
//           safetyScore: 75,
//           description: 'This route connects two popular shopping areas. It is generally safe but can be busy during market hours.',
//           startPoint: 'Lajpat Nagar',
//           endPoint: 'Safdarjung',
//           waypoints: [
//             { name: 'Lajpat Nagar', latitude: 28.5355, longitude: 77.2673 },
//             { name: 'Lajpat Nagar Metro Station', latitude: 28.5355, longitude: 77.2673 },
//             { name: 'Safdarjung Metro Station', latitude: 28.5507, longitude: 77.2391 }
//           ],
//           safetyTips: [
//             'Use the metro for a safer journey',
//             'Be cautious of pickpockets in crowded markets',
//             'Avoid walking alone at night',
//             'Use registered auto-rickshaws for short distances'
//           ]
//         }
//       ];

//       setRoutes(sampleRoutes);
//     };

//     fetchRoutes();
//   }, []);

//   const filteredRoutes = routes.filter(route => {
//     const matchesSearch = route.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
//                          route.startPoint.toLowerCase().includes(searchTerm.toLowerCase()) ||
//                          route.endPoint.toLowerCase().includes(searchTerm.toLowerCase());

//     const matchesFilter = filter === 'all' || route.safetyScore >= (filter === 'high' ? 80 : filter === 'medium' ? 50 : 0);

//     return matchesSearch && matchesFilter;
//   });

//   const getSafetyColor = (score) => {
//     if (score >= 80) return 'bg-green-100 text-green-800';
//     if (score >= 50) return 'bg-yellow-100 text-yellow-800';
//     return 'bg-red-100 text-red-800';
//   };

//   const handleViewOnMap = (location) => {
//     setSelectedLocation(location);
//     setMapView(true);
//   };

//   return (
//     <div className="space-y-6">
//       <motion.div
//         initial={{ opacity: 0, y: 20 }}
//         animate={{ opacity: 1, y: 0 }}
//         transition={{ duration: 0.5 }}
//         className="bg-white p-6 rounded-lg shadow-md"
//       >
//         <h1 className="text-2xl font-bold text-gray-800 mb-4">Safe Routes</h1>
//         <p className="text-gray-600">Find the safest routes for your travels</p>
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
//           <h2 className="text-xl font-semibold mb-4">Filter Routes</h2>
//           <div className="space-y-4">
//             <div>
//               <label className="block text-gray-700 text-sm font-bold mb-2">Search</label>
//               <input
//                 type="text"
//                 placeholder="Search by route name or location"
//                 value={searchTerm}
//                 onChange={(e) => setSearchTerm(e.target.value)}
//                 className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
//               />
//             </div>

//             <div>
//               <label className="block text-gray-700 text-sm font-bold mb-2">Filter by Safety</label>
//               <select
//                 value={filter}
//                 onChange={(e) => setFilter(e.target.value)}
//                 className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
//               >
//                 <option value="all">All Routes</option>
//                 <option value="high">High Safety (80+)</option>
//                 <option value="medium">Medium Safety (50-79)</option>
//                 <option value="low">Low Safety (Below 50)</option>
//               </select>
//             </div>
//           </div>
//         </div>
//       </motion.div>

//       {mapView ? (
//         <motion.div
//           initial={{ opacity: 0, y: 20 }}
//           animate={{ opacity: 1, y: 0 }}
//           transition={{ duration: 0.5, delay: 0.2 }}
//           className="bg-white p-6 rounded-lg shadow-md"
//         >
//           <div className="flex justify-between items-center mb-4">
//             <h2 className="text-xl font-semibold">Route Map</h2>
//             <button
//               onClick={() => setMapView(false)}
//               className="px-4 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300 transition-colors"
//             >
//               Back to List
//             </button>
//           </div>

//           <div className="h-96 bg-gray-100 rounded-lg flex items-center justify-center">
//             {/* In a real app, you would use a map library like Google Maps or Mapbox */}
//             <div className="text-center">
//               <p className="text-gray-500">Map View</p>
//               <p className="text-sm mt-2">Location: {selectedLocation?.name}</p>
//               <p className="text-sm">Coordinates: {selectedLocation?.latitude}, {selectedLocation?.longitude}</p>
//             </div>
//           </div>

//           {selectedRoute && (
//             <div className="mt-4">
//               <h3 className="text-lg font-medium mb-2">Route Details</h3>
//               <div className="space-y-2">
//                 <p className="text-gray-700"><strong>Route:</strong> {selectedRoute.name}</p>
//                 <p className="text-gray-700"><strong>Distance:</strong> {selectedRoute.distance}</p>
//                 <p className="text-gray-700"><strong>Duration:</strong> {selectedRoute.duration}</p>
//                 <p className="text-gray-700"><strong>Safety Score:</strong> {selectedRoute.safetyScore}</p>
//               </div>
//             </div>
//           )}
//         </motion.div>
//       ) : (
//         <motion.div
//           initial={{ opacity: 0, y: 20 }}
//           animate={{ opacity: 1, y: 0 }}
//           transition={{ duration: 0.5, delay: 0.2 }}
//           className="bg-white p-6 rounded-lg shadow-md"
//         >
//           <h2 className="text-xl font-semibold mb-4">Safe Routes List</h2>

//           {selectedRoute ? (
//             <div className="space-y-4">
//               <motion.div
//                 initial={{ opacity: 0, y: 20 }}
//                 animate={{ opacity: 1, y: 0 }}
//                 transition={{ duration: 0.3 }}
//                 className="p-4 border rounded-md bg-indigo-50"
//               >
//                 <h3 className="text-lg font-medium mb-2">{selectedRoute.name}</h3>
//                 <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                   <div>
//                     <p className="text-gray-500 text-sm">Start Point</p>
//                     <p className="font-medium">{selectedRoute.startPoint}</p>
//                   </div>
//                   <div>
//                     <p className="text-gray-500 text-sm">End Point</p>
//                     <p className="font-medium">{selectedRoute.endPoint}</p>
//                   </div>
//                   <div>
//                     <p className="text-gray-500 text-sm">Distance</p>
//                     <p className="font-medium">{selectedRoute.distance}</p>
//                   </div>
//                   <div>
//                     <p className="text-gray-500 text-sm">Duration</p>
//                     <p className="font-medium">{selectedRoute.duration}</p>
//                   </div>
//                   <div>
//                     <p className="text-gray-500 text-sm">Safety Score</p>
//                     <p className="font-medium">
//                       <span className={`px-2 py-1 text-xs rounded-full ${getSafetyColor(selectedRoute.safetyScore)}`}>
//                         {selectedRoute.safetyScore}
//                       </span>
//                     </p>
//                   </div>
//                 </div>
//               </motion.div>

//               <motion.div
//                 initial={{ opacity: 0, y: 20 }}
//                 animate={{ opacity: 1, y: 0 }}
//                 transition={{ duration: 0.3, delay: 0.1 }}
//                 className="space-y-4"
//               >
//                 <h3 className="text-lg font-medium">Description</h3>
//                 <p className="text-gray-700">{selectedRoute.description}</p>
//               </motion.div>

//               <motion.div
//                 initial={{ opacity: 0, y: 20 }}
//                 animate={{ opacity: 1, y: 0 }}
//                 transition={{ duration: 0.3, delay: 0.2 }}
//                 className="space-y-4"
//               >
//                 <h3 className="text-lg font-medium">Safety Tips</h3>
//                 <div className="space-y-2">
//                   {selectedRoute.safetyTips.map((tip, index) => (
//                     <motion.div
//                       key={index}
//                       initial={{ opacity: 0, x: -20 }}
//                       animate={{ opacity: 1, x: 0 }}
//                       transition={{ duration: 0.3, delay: index * 0.05 }}
//                       className="p-3 border rounded-md bg-gray-50"
//                     >
//                       <p className="text-gray-700">{tip}</p>
//                     </motion.div>
//                   ))}
//                 </div>
//               </motion.div>

//               <motion.div
//                 initial={{ opacity: 0, y: 20 }}
//                 animate={{ opacity: 1, y: 0 }}
//                 transition={{ duration: 0.3, delay: 0.3 }}
//                 className="space-y-4"
//               >
//                 <h3 className="text-lg font-medium">Route Waypoints</h3>
//                 <div className="space-y-2">
//                   {selectedRoute.waypoints.map((waypoint, index) => (
//                     <motion.div
//                       key={index}
//                       initial={{ opacity: 0, x: -20 }}
//                       animate={{ opacity: 1, x: 0 }}
//                       transition={{ duration: 0.3, delay: index * 0.05 }}
//                       className="p-3 border rounded-md hover:bg-gray-50 cursor-pointer"
//                       onClick={() => handleViewOnMap(waypoint)}
//                     >
//                       <p className="font-medium">{waypoint.name}</p>
//                       <p className="text-sm text-gray-500">Coordinates: {waypoint.latitude}, {waypoint.longitude}</p>
//                       <p className="text-xs text-gray-400">Click to view on map</p>
//                     </motion.div>
//                   ))}
//                 </div>
//               </motion.div>

//               <motion.div
//                 initial={{ opacity: 0, y: 20 }}
//                 animate={{ opacity: 1, y: 0 }}
//                 transition={{ duration: 0.3, delay: 0.4 }}
//                 className="flex justify-end space-x-4"
//               >
//                 <button
//                   onClick={() => setSelectedRoute(null)}
//                   className="px-4 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300 transition-colors"
//                 >
//                   Back to List
//                 </button>
//                 <button
//                   onClick={() => {
//                     handleViewOnMap(selectedRoute.waypoints[0]);
//                     setMapView(true);
//                   }}
//                   className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition-colors"
//                 >
//                   View Full Route on Map
//                 </button>
//               </motion.div>
//             </div>
//           ) : (
//             <div className="overflow-x-auto">
//               <table className="min-w-full divide-y divide-gray-200">
//                 <thead className="bg-gray-50">
//                   <tr>
//                     <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Route</th>
//                     <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">From</th>
//                     <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">To</th>
//                     <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Safety Score</th>
//                     <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
//                   </tr>
//                 </thead>
//                 <tbody className="bg-white divide-y divide-gray-200">
//                   {filteredRoutes.map((route) => (
//                     <motion.tr
//                       key={route.id}
//                       initial={{ opacity: 0, y: 20 }}
//                       animate={{ opacity: 1, y: 0 }}
//                       transition={{ duration: 0.3, delay: route.id * 0.05 }}
//                       className="hover:bg-gray-50 transition-colors"
//                     >
//                       <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{route.name}</td>
//                       <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{route.startPoint}</td>
//                       <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{route.endPoint}</td>
//                       <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
//                         <span className={`px-2 py-1 text-xs rounded-full ${getSafetyColor(route.safetyScore)}`}>
//                           {route.safetyScore}
//                         </span>
//                       </td>
//                       <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
//                         <button
//                           onClick={() => setSelectedRoute(route)}
//                           className="text-indigo-600 hover:text-indigo-900"
//                         >
//                           View Details
//                         </button>
//                       </td>
//                     </motion.tr>
//                   ))}
//                 </tbody>
//               </table>
//             </div>
//           )}
//         </motion.div>
//       )}
//     </div>
//   );
// };

// export default SafeRoutes;

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import LocationTracker from '../../components/Shared/LocationTracker';
import { useAuth } from '../../components/Auth/AuthContext';

const SafeRoutes = () => {
  const { user } = useAuth();
  const [safeRoutes, setSafeRoutes] = useState([]);
  const [currentLocation, setCurrentLocation] = useState(null);
  const [selectedRoute, setSelectedRoute] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate fetching safe routes based on current location
    const fetchSafeRoutes = async () => {
      try {
        // In a real app, you would fetch this from your API
        setIsLoading(true);

        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 1000));

        // Mock data - in a real app, this would come from your API
        const mockRoutes = [
          {
            id: 1,
            name: "Tourist Zone A",
            description: "Safe route through the main tourist attractions",
            startPoint: "City Center",
            endPoint: "Beach Area",
            distance: "5.2 km",
            duration: "25 minutes",
            safetyScore: 85,
            routePoints: [
              { lat: 28.6139, lng: 77.2090, description: "Start at City Center" },
              { lat: 28.6145, lng: 77.2100, description: "Pass through Market Square" },
              { lat: 28.6150, lng: 77.2110, description: "Continue to Cultural District" },
              { lat: 28.6155, lng: 77.2120, description: "Arrive at Beach Area" }
            ]
          },
          {
            id: 2,
            name: "Historical Walk",
            description: "Route through historical landmarks",
            startPoint: "Old City Gate",
            endPoint: "Museum",
            distance: "3.8 km",
            duration: "20 minutes",
            safetyScore: 90,
            routePoints: [
              { lat: 28.6130, lng: 77.2080, description: "Start at Old City Gate" },
              { lat: 28.6135, lng: 77.2085, description: "Pass through Ancient Bazaar" },
              { lat: 28.6140, lng: 77.2090, description: "Continue to Historical Square" },
              { lat: 28.6145, lng: 77.2095, description: "Arrive at Museum" }
            ]
          }
        ];

        setSafeRoutes(mockRoutes);
        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching safe routes:", error);
        setIsLoading(false);
      }
    };

    fetchSafeRoutes();
  }, [currentLocation]);

  const handleRouteSelect = (route) => {
    setSelectedRoute(route);
  };

  return (
    <div className="space-y-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="bg-white p-6 rounded-lg shadow-md"
      >
        <h2 className="text-2xl font-bold text-indigo-800 mb-4">Safe Routes</h2>
        <p className="text-gray-600 mb-6">
          Discover the safest routes for your journey. Our system analyzes real-time data to provide you with the most secure paths.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {isLoading ? (
            <div className="col-span-1 md:col-span-2 flex justify-center items-center py-12">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-500"></div>
            </div>
          ) : (
            <>
              {safeRoutes.map((route) => (
                <motion.div
                  key={route.id}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className={`border rounded-lg overflow-hidden cursor-pointer transition-all ${selectedRoute?.id === route.id ? 'ring-2 ring-indigo-500 shadow-lg' : 'hover:shadow-md'}`}
                  onClick={() => handleRouteSelect(route)}
                >
                  <div className="p-4">
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="font-semibold text-lg text-gray-800">{route.name}</h3>
                        <p className="text-sm text-gray-500 mt-1">{route.description}</p>
                      </div>
                      <div className="flex items-center">
                        <span className="text-sm font-medium text-green-600">{route.safetyScore}/100</span>
                        <div className="w-20 h-2 bg-gray-200 rounded-full ml-2">
                          <div
                            className="h-full bg-green-500"
                            style={{ width: `${route.safetyScore}%` }}
                          ></div>
                        </div>
                      </div>
                    </div>
                    <div className="mt-4 flex justify-between text-sm text-gray-600">
                      <span><i className="fas fa-map-marker-alt mr-1"></i>{route.startPoint}</span>
                      <span><i className="fas fa-map-marker-alt mr-1"></i>{route.endPoint}</span>
                    </div>
                    <div className="mt-2 flex justify-between text-sm text-gray-500">
                      <span><i className="fas fa-road mr-1"></i>{route.distance}</span>
                      <span><i className="fas fa-clock mr-1"></i>{route.duration}</span>
                    </div>
                  </div>
                </motion.div>
              ))}
            </>
          )}
        </div>
      </motion.div>

      {selectedRoute && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="bg-white p-6 rounded-lg shadow-md"
        >
          <h2 className="text-2xl font-bold text-indigo-800 mb-4">Route Details: {selectedRoute.name}</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="text-lg font-semibold text-gray-800 mb-2">Route Overview</h3>
              <p className="text-gray-600 mb-4">{selectedRoute.description}</p>

              <div className="space-y-4">
                <div>
                  <h4 className="font-medium text-gray-700">Safety Score</h4>
                  <div className="flex items-center">
                    <div className="w-32 h-6 bg-gray-200 rounded-full mr-4">
                      <div
                        className="h-full bg-green-500"
                        style={{ width: `${selectedRoute.safetyScore}%` }}
                      ></div>
                    </div>
                    <span className="text-lg font-bold">{selectedRoute.safetyScore}/100</span>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-gray-500"><i className="fas fa-map-marker-alt text-indigo-500 mr-1"></i>Start Point</p>
                    <p className="font-medium">{selectedRoute.startPoint}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500"><i className="fas fa-map-marker-alt text-indigo-500 mr-1"></i>End Point</p>
                    <p className="font-medium">{selectedRoute.endPoint}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500"><i className="fas fa-road text-indigo-500 mr-1"></i>Distance</p>
                    <p className="font-medium">{selectedRoute.distance}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500"><i className="fas fa-clock text-indigo-500 mr-1"></i>Duration</p>
                    <p className="font-medium">{selectedRoute.duration}</p>
                  </div>
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-gray-800 mb-2">Route Map</h3>
              <div className="h-64 bg-gray-100 rounded-lg flex items-center justify-center">
                {/* In a real app, this would be a map component */}
                <div className="text-center text-gray-500">
                  <i className="fas fa-map-marked-alt text-4xl mb-2"></i>
                  <p>Interactive map would be displayed here</p>
                  <p className="text-sm mt-2">Showing route from {selectedRoute.startPoint} to {selectedRoute.endPoint}</p>
                </div>
              </div>

              <div className="mt-4">
                <h4 className="font-medium text-gray-700 mb-2">Route Points</h4>
                <div className="space-y-3">
                  {selectedRoute.routePoints.map((point, index) => (
                    <div key={index} className="flex items-start">
                      <div className="w-8 h-8 bg-indigo-100 rounded-full flex items-center justify-center mr-3">
                        <span className="text-indigo-600 font-medium">{index + 1}</span>
                      </div>
                      <div>
                        <p className="font-medium">{point.description}</p>
                        <p className="text-sm text-gray-500">
                          Lat: {point.lat.toFixed(4)}, Lng: {point.lng.toFixed(4)}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div className="mt-6 pt-6 border-t border-gray-200">
            <h3 className="text-lg font-semibold text-gray-800 mb-2">Safety Tips for This Route</h3>
            <ul className="list-disc pl-5 space-y-2 text-gray-700">
              <li>Stay on the marked path and avoid shortcuts</li>
              <li>Keep your belongings secure and be aware of your surroundings</li>
              <li>If possible, travel with a companion</li>
              <li>Check the weather conditions before starting your journey</li>
              <li>Have your emergency contacts and tourist card ready</li>
            </ul>
          </div>
        </motion.div>
      )}

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.4 }}
        className="bg-white p-6 rounded-lg shadow-md"
      >
        <h2 className="text-2xl font-bold text-indigo-800 mb-4">Current Location Safety</h2>
        <LocationTracker />
      </motion.div>
    </div>
  );
};

export default SafeRoutes;