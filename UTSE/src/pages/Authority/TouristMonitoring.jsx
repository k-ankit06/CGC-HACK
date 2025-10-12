// import { useState, useEffect } from 'react'
// import { Search, MapPin, Phone, Mail, Calendar, Globe, AlertCircle, CheckCircle, Eye, Filter } from 'lucide-react'
// import { motion } from 'framer-motion'

// const TouristMonitoring = () => {
//   const [searchTerm, setSearchTerm] = useState('')
//   const [filterStatus, setFilterStatus] = useState('all')
//   const [selectedTourist, setSelectedTourist] = useState(null)
//   const [tourists, setTourists] = useState([])

//   useEffect(() => {
//     const allTourists = JSON.parse(localStorage.getItem('allTourists') || '[]')
//     setTourists(allTourists.map(t => ({
//       ...t,
//       status: 'safe',  // Default
//       safetyScore: Math.floor(Math.random() * 100) + 1,  // Random for demo
//       currentLocation: 'Taj Mahal, Agra'  // Demo
//     })))
//   }, [])

//   const filteredTourists = tourists.filter(tourist => {
//     const matchesSearch = tourist.fullName.toLowerCase().includes(searchTerm.toLowerCase()) ||
//                          tourist.passportNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
//                          tourist.country.toLowerCase().includes(searchTerm.toLowerCase())
//     const matchesFilter = filterStatus === 'all' || tourist.status === filterStatus
//     return matchesSearch && matchesFilter
//   })

//   return (
//     <motion.div 
//       initial={{ opacity: 0 }}
//       animate={{ opacity: 1 }}
//       transition={{ duration: 0.5 }}
//       className="space-y-6"
//     >
//       <div>
//         <h2 className="text-3xl font-bold text-gray-900">Tourist Monitoring</h2>
//         <p className="text-gray-600 mt-1">Real-time tracking and monitoring of all registered tourists</p>
//       </div>

//       {/* Search and Filter */}
//       <div className="card">
//         <div className="flex flex-col md:flex-row gap-4">
//           <div className="flex-1 relative">
//             <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
//             <input
//               type="text"
//               placeholder="Search by name, passport, or country..."
//               className="input-field pl-10"
//               value={searchTerm}
//               onChange={(e) => setSearchTerm(e.target.value)}
//             />
//           </div>
//           <div className="flex gap-2">
//             <button
//               onClick={() => setFilterStatus('all')}
//               className={`px-4 py-2 rounded-lg font-medium transition-colors ${
//                 filterStatus === 'all' ? 'bg-primary-600 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
//               }`}
//             >
//               All ({tourists.length})
//             </button>
//             <button
//               onClick={() => setFilterStatus('safe')}
//               className={`px-4 py-2 rounded-lg font-medium transition-colors ${
//                 filterStatus === 'safe' ? 'bg-success-600 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
//               }`}
//             >
//               Safe
//             </button>
//             <button
//               onClick={() => setFilterStatus('warning')}
//               className={`px-4 py-2 rounded-lg font-medium transition-colors ${
//                 filterStatus === 'warning' ? 'bg-warning-600 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
//               }`}
//             >
//               Warning
//             </button>
//             <button
//               onClick={() => setFilterStatus('danger')}
//               className={`px-4 py-2 rounded-lg font-medium transition-colors ${
//                 filterStatus === 'danger' ? 'bg-danger-600 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
//               }`}
//             >
//               Danger
//             </button>
//           </div>
//         </div>
//       </div>

//       {/* Tourists List */}
//       <motion.div 
//         className="grid grid-cols-1 gap-4"
//         initial="hidden"
//         animate="visible"
//         variants={{
//           hidden: { opacity: 0 },
//           visible: { opacity: 1, transition: { staggerChildren: 0.1 } }
//         }}
//       >
//         {filteredTourists.map((tourist) => (
//           <motion.div 
//             key={tourist.touristId}
//             variants={{ hidden: { y: 20, opacity: 0 }, visible: { y: 0, opacity: 1 } }}
//             className="card hover:shadow-lg transition-shadow"
//           >
//             <div className="flex items-start justify-between">
//               <div className="flex-1">
//                 <div className="flex items-center gap-3 mb-3">
//                   <div className={`h-12 w-12 rounded-full flex items-center justify-center text-white font-bold text-lg ${
//                     tourist.status === 'safe' ? 'bg-success-500' :
//                     tourist.status === 'warning' ? 'bg-warning-500' :
//                     'bg-danger-500'
//                   }`}>
//                     {tourist.fullName.charAt(0)}
//                   </div>
//                   <div>
//                     <h3 className="text-xl font-bold text-gray-900">{tourist.fullName}</h3>
//                     <div className="flex items-center gap-2 text-sm text-gray-600">
//                       <Globe className="h-4 w-4" />
//                       <span>{tourist.country}</span>
//                       <span className="mx-2">•</span>
//                       <span>Passport: {tourist.passportNumber}</span>
//                     </div>
//                   </div>
//                 </div>

//                 <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-3">
//                   <div className="flex items-center gap-2 text-sm">
//                     <MapPin className="h-4 w-4 text-primary-600" />
//                     <div>
//                       <p className="text-gray-500">Current Location</p>
//                       <p className="font-medium text-gray-900">{tourist.currentLocation}</p>
//                     </div>
//                   </div>
//                   <div className="flex items-center gap-2 text-sm">
//                     <Phone className="h-4 w-4 text-primary-600" />
//                     <div>
//                       <p className="text-gray-500">Phone</p>
//                       <p className="font-medium text-gray-900">{tourist.phone}</p>
//                     </div>
//                   </div>
//                   <div className="flex items-center gap-2 text-sm">
//                     <Mail className="h-4 w-4 text-primary-600" />
//                     <div>
//                       <p className="text-gray-500">Email</p>
//                       <p className="font-medium text-gray-900">{tourist.email}</p>
//                     </div>
//                   </div>
//                   <div className="flex items-center gap-2 text-sm">
//                     <Calendar className="h-4 w-4 text-primary-600" />
//                     <div>
//                       <p className="text-gray-500">Check-in Date</p>
//                       <p className="font-medium text-gray-900">{tourist.checkInDate}</p>
//                     </div>
//                   </div>
//                 </div>

//                 <div className="flex items-center gap-4">
//                   <div className="flex-1">
//                     <div className="flex items-center justify-between mb-1">
//                       <span className="text-sm text-gray-600">Safety Score</span>
//                       <span className={`text-sm font-bold ${
//                         tourist.safetyScore >= 90 ? 'text-success-600' :
//                         tourist.safetyScore >= 70 ? 'text-warning-600' :
//                         'text-danger-600'
//                       }`}>
//                         {tourist.safetyScore}%
//                       </span>
//                     </div>
//                     <div className="w-full bg-gray-200 rounded-full h-2">
//                       <div 
//                         className={`h-2 rounded-full transition-all ${
//                           tourist.safetyScore >= 90 ? 'bg-success-500' :
//                           tourist.safetyScore >= 70 ? 'bg-warning-500' :
//                           'bg-danger-500'
//                         }`}
//                         style={{ width: `${tourist.safetyScore}%` }}
//                       ></div>
//                     </div>
//                   </div>
//                   <span className="text-xs text-gray-500">Updated 2 mins ago</span>
//                 </div>
//               </div>

//               <div className="flex flex-col gap-2 ml-4">
//                 <span className={`px-3 py-1 rounded-full text-xs font-semibold text-center ${
//                   tourist.status === 'safe' ? 'bg-success-100 text-success-700' :
//                   tourist.status === 'warning' ? 'bg-warning-100 text-warning-700' :
//                   'bg-danger-100 text-danger-700'
//                 }`}>
//                   {tourist.status === 'safe' ? '✓ Safe' :
//                    tourist.status === 'warning' ? '⚠ Warning' :
//                    '⚠ Danger'}
//                 </span>
//                 <motion.button 
//                   whileHover={{ scale: 1.05 }}
//                   whileTap={{ scale: 0.95 }}
//                   onClick={() => setSelectedTourist(tourist)}
//                   className="px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors text-sm font-medium"
//                 >
//                   <Eye className="h-4 w-4 inline mr-1" />
//                   View Details
//                 </motion.button>
//               </div>
//             </div>
//           </motion.div>
//         ))}
//       </motion.div>

//       {/* Tourist Detail Modal */}
//       {selectedTourist && (
//         <motion.div 
//           initial={{ opacity: 0, scale: 0.9 }}
//           animate={{ opacity: 1, scale: 1 }}
//           exit={{ opacity: 0, scale: 0.9 }}
//           className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
//         >
//           <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
//             <div className="p-6">
//               <div className="flex items-center justify-between mb-6">
//                 <h3 className="text-2xl font-bold text-gray-900">Tourist Details</h3>
//                 <button
//                   onClick={() => setSelectedTourist(null)}
//                   className="text-gray-500 hover:text-gray-700 text-2xl"
//                 >
//                   ×
//                 </button>
//               </div>

//               <div className="space-y-6">
//                 <div className="flex items-center gap-4">
//                   <div className={`h-20 w-20 rounded-full flex items-center justify-center text-white font-bold text-3xl ${
//                     selectedTourist.status === 'safe' ? 'bg-success-500' :
//                     selectedTourist.status === 'warning' ? 'bg-warning-500' :
//                     'bg-danger-500'
//                   }`}>
//                     {selectedTourist.fullName.charAt(0)}
//                   </div>
//                   <div>
//                     <h4 className="text-2xl font-bold text-gray-900">{selectedTourist.fullName}</h4>
//                     <p className="text-gray-600">{selectedTourist.country}</p>
//                   </div>
//                 </div>

//                 <div className="grid grid-cols-2 gap-4">
//                   <div className="border-l-4 border-primary-600 pl-4">
//                     <p className="text-sm text-gray-700 mb-1">Passport Number</p>
//                     <p className="font-semibold text-gray-900">{selectedTourist.passportNumber}</p>
//                   </div>
//                   <div className="border-l-4 border-primary-600 pl-4">
//                     <p className="text-sm text-gray-700 mb-1">Phone</p>
//                     <p className="font-semibold text-gray-900">{selectedTourist.phone}</p>
//                   </div>
//                   <div className="border-l-4 border-primary-600 pl-4">
//                     <p className="text-sm text-gray-700 mb-1">Email</p>
//                     <p className="font-semibold text-gray-900">{selectedTourist.email}</p>
//                   </div>
//                   <div className="border-l-4 border-primary-600 pl-4">
//                     <p className="text-sm text-gray-700 mb-1">Emergency Contact</p>
//                     <p className="font-semibold text-gray-900">{selectedTourist.emergencyContactPhone}</p>
//                   </div>
//                   <div className="border-l-4 border-primary-600 pl-4">
//                     <p className="text-sm text-gray-700 mb-1">Current Location</p>
//                     <p className="font-semibold text-gray-900">{selectedTourist.currentLocation}</p>
//                   </div>
//                   <div className="border-l-4 border-primary-600 pl-4">
//                     <p className="text-sm text-gray-700 mb-1">Hotel</p>
//                     <p className="font-semibold text-gray-900">{selectedTourist.hotelName}</p>
//                   </div>
//                   <div className="border-l-4 border-primary-600 pl-4">
//                     <p className="text-sm text-gray-700 mb-1">Check-in Date</p>
//                     <p className="font-semibold text-gray-900">{selectedTourist.checkInDate}</p>
//                   </div>
//                   <div className="border-l-4 border-primary-600 pl-4">
//                     <p className="text-sm text-gray-700 mb-1">Safety Score</p>
//                     <p className="font-semibold text-gray-900">{selectedTourist.safetyScore}%</p>
//                   </div>
//                 </div>

//                 <div className="flex gap-3">
//                   <button className="flex-1 btn-primary">
//                     Send Alert
//                   </button>
//                   <button className="flex-1 btn-success">
//                     Track Location
//                   </button>
//                   <button className="flex-1 bg-gray-600 text-white px-4 py-2 rounded-lg hover:bg-gray-700">
//                     View History
//                   </button>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </motion.div>
//       )}
//     </motion.div>
//   )
// }

// export default TouristMonitoring

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import LocationTracker from '../../components/Shared/LocationTracker';

const TouristMonitoring = () => {
  const [tourists, setTourists] = useState([]);
  const [selectedTourist, setSelectedTourist] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filter, setFilter] = useState('all');
  const [mapView, setMapView] = useState(false);
  const [selectedLocation, setSelectedLocation] = useState(null);

  useEffect(() => {
    // Simulate fetching tourist data
    const fetchTourists = () => {
      const sampleTourists = [
        {
          id: 1,
          name: 'John Smith',
          email: 'john.smith@example.com',
          passportNumber: 'AB1234567',
          country: 'USA',
          arrivalDate: '2023-05-10',
          departureDate: '2023-05-20',
          emergencyContact: 'Mary Smith (Mother)',
          medicalConditions: 'None',
          status: 'active',
          lastLocation: 'Connaught Place',
          lastUpdated: '2023-05-15 14:30',
          currentLocation: {
            latitude: 28.6304,
            longitude: 77.2177,
            address: 'Connaught Place, New Delhi'
          },
          movementHistory: [
            { time: '2023-05-15 14:00', location: 'Janpath', latitude: 28.6286, longitude: 77.2179 },
            { time: '2023-05-15 13:30', location: 'India Gate', latitude: 28.6122, longitude: 77.2295 },
            { time: '2023-05-15 12:45', location: 'Rajpath', latitude: 28.6129, longitude: 77.2174 }
          ]
        },
        {
          id: 2,
          name: 'Sarah Johnson',
          email: 'sarah.j@example.com',
          passportNumber: 'CD2345678',
          country: 'UK',
          arrivalDate: '2023-05-12',
          departureDate: '2023-05-25',
          emergencyContact: 'Michael Johnson (Father)',
          medicalConditions: 'Asthma',
          status: 'active',
          lastLocation: 'India Gate',
          lastUpdated: '2023-05-15 13:45',
          currentLocation: {
            latitude: 28.6122,
            longitude: 77.2295,
            address: 'India Gate, New Delhi'
          },
          movementHistory: [
            { time: '2023-05-15 13:15', location: 'Rajpath', latitude: 28.6129, longitude: 77.2174 },
            { time: '2023-05-15 12:30', location: 'Rashtrapati Bhavan', latitude: 28.6146, longitude: 77.2170 }
          ]
        },
        {
          id: 3,
          name: 'Carlos Rodriguez',
          email: 'carlos.r@example.com',
          passportNumber: 'EF3456789',
          country: 'Spain',
          arrivalDate: '2023-05-08',
          departureDate: '2023-05-18',
          emergencyContact: 'Ana Rodriguez (Sister)',
          medicalConditions: 'Diabetes',
          status: 'active',
          lastLocation: 'Chandni Chowk',
          lastUpdated: '2023-05-15 11:20',
          currentLocation: {
            latitude: 28.6507,
            longitude: 77.0691,
            address: 'Chandni Chowk, Old Delhi'
          },
          movementHistory: [
            { time: '2023-05-15 10:45', location: 'Red Fort', latitude: 28.6529, longitude: 77.2413 },
            { time: '2023-05-15 10:00', location: 'Jama Masjid', latitude: 28.6498, longitude: 77.2413 }
          ]
        },
        {
          id: 4,
          name: 'Aisha Patel',
          email: 'aisha.p@example.com',
          passportNumber: 'GH4567890',
          country: 'Canada',
          arrivalDate: '2023-05-14',
          departureDate: '2023-05-28',
          emergencyContact: 'Raj Patel (Father)',
          medicalConditions: 'None',
          status: 'active',
          lastLocation: 'Dwarka Sector 21',
          lastUpdated: '2023-05-15 10:15',
          currentLocation: {
            latitude: 28.6999,
            longitude: 77.0431,
            address: 'Dwarka Sector 21, New Delhi'
          },
          movementHistory: [
            { time: '2023-05-15 09:45', location: 'Dwarka Metro Station', latitude: 28.7006, longitude: 77.0425 }
          ]
        },
        {
          id: 5,
          name: 'Michael Chen',
          email: 'michael.c@example.com',
          passportNumber: 'IJ5678901',
          country: 'China',
          arrivalDate: '2023-05-05',
          departureDate: '2023-05-15',
          emergencyContact: 'Li Chen (Mother)',
          medicalConditions: 'Allergies (Peanuts)',
          status: 'departed',
          lastLocation: 'Lajpat Nagar',
          lastUpdated: '2023-05-15 09:30',
          currentLocation: {
            latitude: 28.5355,
            longitude: 77.2673,
            address: 'Lajpat Nagar, New Delhi'
          },
          movementHistory: [
            { time: '2023-05-15 09:00', location: 'Lajpat Nagar Metro Station', latitude: 28.5355, longitude: 77.2673 }
          ]
        }
      ];

      setTourists(sampleTourists);
    };

    fetchTourists();
  }, []);

  const filteredTourists = tourists.filter(tourist => {
    const matchesSearch = tourist.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         tourist.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         tourist.passportNumber.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesFilter = filter === 'all' || tourist.status === filter;

    return matchesSearch && matchesFilter;
  });

  const getStatusColor = (status) => {
    switch(status.toLowerCase()) {
      case 'active': return 'bg-green-100 text-green-800';
      case 'departed': return 'bg-gray-100 text-gray-800';
      case 'lost': return 'bg-red-100 text-red-800';
      case 'in-distress': return 'bg-yellow-100 text-yellow-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const handleViewOnMap = (location) => {
    setSelectedLocation(location);
    setMapView(true);
  };

  return (
    <div className="space-y-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="bg-white p-6 rounded-lg shadow-md"
      >
        <h1 className="text-2xl font-bold text-gray-800 mb-4">Tourist Monitoring</h1>
        <p className="text-gray-600">Track and monitor tourist locations in real-time</p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
        className="grid grid-cols-1 md:grid-cols-2 gap-6"
      >
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-4">Current Location</h2>
          <LocationTracker />
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-4">Tourist Statistics</h2>
          <div className="space-y-4">
            {['active', 'departed'].map((status, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
                className="p-4 border rounded-md"
              >
                <div className="flex justify-between items-center">
                  <div>
                    <p className="font-medium">{status.charAt(0).toUpperCase() + status.slice(1)} Tourists</p>
                    <p className="text-sm text-gray-500">
                      {tourists.filter(t => t.status === status).length} tourists
                    </p>
                  </div>
                  <span className={`px-2 py-1 text-xs rounded-full ${getStatusColor(status)}`}>
                    {tourists.filter(t => t.status === status).length}
                  </span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="bg-white p-6 rounded-lg shadow-md"
      >
        <h2 className="text-xl font-semibold mb-4">Filter Tourists</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-gray-700 text-sm font-bold mb-2">Search</label>
            <input
              type="text"
              placeholder="Search by name, email, or passport number"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          <div>
            <label className="block text-gray-700 text-sm font-bold mb-2">Filter by Status</label>
            <select
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
            >
              <option value="all">All Statuses</option>
              <option value="active">Active</option>
              <option value="departed">Departed</option>
              <option value="lost">Lost</option>
              <option value="in-distress">In Distress</option>
            </select>
          </div>
        </div>
      </motion.div>

      {mapView ? (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="bg-white p-6 rounded-lg shadow-md"
        >
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold">Tourist Location Map</h2>
            <button
              onClick={() => setMapView(false)}
              className="px-4 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300 transition-colors"
            >
              Back to List
            </button>
          </div>

          <div className="h-96 bg-gray-100 rounded-lg flex items-center justify-center">
            {/* In a real app, you would use a map library like Google Maps or Mapbox */}
            <div className="text-center">
              <p className="text-gray-500">Map View</p>
              <p className="text-sm mt-2">Location: {selectedLocation?.address}</p>
              <p className="text-sm">Coordinates: {selectedLocation?.latitude}, {selectedLocation?.longitude}</p>
            </div>
          </div>

          <div className="mt-4">
            <h3 className="text-lg font-medium mb-2">Movement History</h3>
            <div className="space-y-2">
              {selectedTourist?.movementHistory?.map((location, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                  className="p-3 border rounded-md hover:bg-gray-50 cursor-pointer"
                  onClick={() => handleViewOnMap(location)}
                >
                  <p className="font-medium">{location.location}</p>
                  <p className="text-sm text-gray-500">{location.time}</p>
                  <p className="text-xs text-gray-400">Click to view on map</p>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>
      ) : (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="bg-white p-6 rounded-lg shadow-md"
        >
          <h2 className="text-xl font-semibold mb-4">Tourist List</h2>

          {selectedTourist ? (
            <div className="space-y-4">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
                className="p-4 border rounded-md bg-indigo-50"
              >
                <h3 className="text-lg font-medium mb-2">{selectedTourist.name}</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <p className="text-gray-500 text-sm">Passport Number</p>
                    <p className="font-medium">{selectedTourist.passportNumber}</p>
                  </div>
                  <div>
                    <p className="text-gray-500 text-sm">Country</p>
                    <p className="font-medium">{selectedTourist.country}</p>
                  </div>
                  <div>
                    <p className="text-gray-500 text-sm">Status</p>
                    <p className="font-medium">
                      <span className={`px-2 py-1 text-xs rounded-full ${getStatusColor(selectedTourist.status)}`}>
                        {selectedTourist.status}
                      </span>
                    </p>
                  </div>
                  <div>
                    <p className="text-gray-500 text-sm">Last Location</p>
                    <p className="font-medium">{selectedTourist.lastLocation}</p>
                  </div>
                  <div>
                    <p className="text-gray-500 text-sm">Last Updated</p>
                    <p className="font-medium">{selectedTourist.lastUpdated}</p>
                  </div>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: 0.1 }}
                className="space-y-4"
              >
                <h3 className="text-lg font-medium">Current Location</h3>
                <div className="p-4 border rounded-md bg-gray-50">
                  <p className="font-medium">{selectedTourist.currentLocation.address}</p>
                  <p className="text-sm text-gray-500">
                    Coordinates: {selectedTourist.currentLocation.latitude}, {selectedTourist.currentLocation.longitude}
                  </p>
                  <button
                    onClick={() => handleViewOnMap(selectedTourist.currentLocation)}
                    className="mt-2 px-3 py-1 text-sm bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition-colors"
                  >
                    View on Map
                  </button>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: 0.2 }}
                className="space-y-4"
              >
                <h3 className="text-lg font-medium">Movement History</h3>
                <div className="space-y-2">
                  {selectedTourist.movementHistory.map((location, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.3, delay: index * 0.1 }}
                      className="p-3 border rounded-md hover:bg-gray-50 cursor-pointer"
                      onClick={() => handleViewOnMap(location)}
                    >
                      <p className="font-medium">{location.location}</p>
                      <p className="text-sm text-gray-500">{location.time}</p>
                      <p className="text-xs text-gray-400">Click to view on map</p>
                    </motion.div>
                  ))}
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: 0.3 }}
                className="flex justify-end space-x-4"
              >
                <button
                  onClick={() => setSelectedTourist(null)}
                  className="px-4 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300 transition-colors"
                >
                  Back to List
                </button>
                <button
                  className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition-colors"
                >
                  Update Tourist Info
                </button>
              </motion.div>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Passport</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Country</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Last Location</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {filteredTourists.map((tourist) => (
                    <motion.tr
                      key={tourist.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3, delay: tourist.id * 0.05 }}
                      className="hover:bg-gray-50 transition-colors"
                    >
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{tourist.name}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{tourist.passportNumber}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{tourist.country}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        <span className={`px-2 py-1 text-xs rounded-full ${getStatusColor(tourist.status)}`}>
                          {tourist.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{tourist.lastLocation}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                        <button
                          onClick={() => setSelectedTourist(tourist)}
                          className="text-indigo-600 hover:text-indigo-900"
                        >
                          View Details
                        </button>
                      </td>
                    </motion.tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </motion.div>
      )}
    </div>
  );
};

export default TouristMonitoring;