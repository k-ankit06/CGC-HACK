// import { useState } from 'react'
// import { CreditCard, QrCode, Search, CheckCircle, XCircle, Download, Printer } from 'lucide-react'
// import QRCode from 'qrcode.react'

// const SmartIDSystem = () => {
//   const [searchTerm, setSearchTerm] = useState('')
//   const [selectedCard, setSelectedCard] = useState(null)

//   const touristCards = [
//     {
//       id: 'TID-2024-001',
//       name: 'John Anderson',
//       country: 'USA',
//       passport: 'US123456789',
//       phone: '+1 555-0123',
//       email: 'john@email.com',
//       emergencyContact: '+1 555-0124',
//       hotel: 'Oberoi Amarvilas, Agra',
//       checkIn: '2024-01-15',
//       checkOut: '2024-01-25',
//       status: 'Active',
//       photo: '👤',
//       verified: true
//     },
//     {
//       id: 'TID-2024-002',
//       name: 'Sarah Williams',
//       country: 'UK',
//       passport: 'UK987654321',
//       phone: '+44 20 7123 4567',
//       email: 'sarah@email.com',
//       emergencyContact: '+44 20 7123 4568',
//       hotel: 'The Leela Palace, Delhi',
//       checkIn: '2024-01-18',
//       checkOut: '2024-01-28',
//       status: 'Active',
//       photo: '👤',
//       verified: true
//     },
//     {
//       id: 'TID-2024-003',
//       name: 'Hans Mueller',
//       country: 'Germany',
//       passport: 'DE456789123',
//       phone: '+49 30 12345678',
//       email: 'hans@email.com',
//       emergencyContact: '+49 30 12345679',
//       hotel: 'Rambagh Palace, Jaipur',
//       checkIn: '2024-01-20',
//       checkOut: '2024-01-30',
//       status: 'Pending',
//       photo: '👤',
//       verified: false
//     },
//   ]

//   const filteredCards = touristCards.filter(card =>
//     card.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
//     card.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
//     card.passport.toLowerCase().includes(searchTerm.toLowerCase())
//   )

//   return (
//     <div className="space-y-6">
//       <div>
//         <h2 className="text-3xl font-bold text-gray-900">Smart Tourist ID System</h2>
//         <p className="text-gray-600 mt-1">Digital tourist cards with QR/NFC technology and biometric integration</p>
//       </div>

//       {/* Stats */}
//       <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
//         <div className="card bg-gradient-to-br from-primary-500 to-primary-600 text-white">
//           <p className="text-primary-100 text-sm">Total Cards Issued</p>
//           <p className="text-4xl font-bold mt-1">2,847</p>
//         </div>
//         <div className="card bg-gradient-to-br from-success-500 to-success-600 text-white">
//           <p className="text-success-100 text-sm">Active Cards</p>
//           <p className="text-4xl font-bold mt-1">2,450</p>
//         </div>
//         <div className="card bg-gradient-to-br from-warning-500 to-warning-600 text-white">
//           <p className="text-warning-100 text-sm">Pending Verification</p>
//           <p className="text-4xl font-bold mt-1">285</p>
//         </div>
//         <div className="card bg-gradient-to-br from-danger-500 to-danger-600 text-white">
//           <p className="text-danger-100 text-sm">Expired Cards</p>
//           <p className="text-4xl font-bold mt-1">112</p>
//         </div>
//       </div>

//       {/* Search */}
//       <div className="card">
//         <div className="relative">
//           <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
//           <input
//             type="text"
//             placeholder="Search by Tourist ID, Name, or Passport..."
//             className="input-field pl-10"
//             value={searchTerm}
//             onChange={(e) => setSearchTerm(e.target.value)}
//           />
//         </div>
//       </div>

//       {/* Tourist Cards Grid */}
//       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//         {filteredCards.map((card) => (
//           <div key={card.id} className="card border-2 border-gray-200 hover:border-primary-500 hover:shadow-xl transition-all">
//             <div className="flex items-start justify-between mb-4">
//               <div className="flex items-center gap-3">
//                 <div className="h-16 w-16 bg-gradient-to-br from-primary-500 to-primary-600 rounded-full flex items-center justify-center text-3xl">
//                   {card.photo}
//                 </div>
//                 <div>
//                   <h3 className="font-bold text-lg text-gray-900">{card.name}</h3>
//                   <p className="text-sm text-gray-600">{card.country}</p>
//                   <p className="text-xs text-gray-500 font-mono">{card.id}</p>
//                 </div>
//               </div>
//               {card.verified ? (
//                 <CheckCircle className="h-6 w-6 text-success-500" />
//               ) : (
//                 <XCircle className="h-6 w-6 text-warning-500" />
//               )}
//             </div>

//             <div className="space-y-2 mb-4 text-sm">
//               <div className="flex justify-between">
//                 <span className="text-gray-600">Passport:</span>
//                 <span className="font-semibold">{card.passport}</span>
//               </div>
//               <div className="flex justify-between">
//                 <span className="text-gray-600">Phone:</span>
//                 <span className="font-semibold">{card.phone}</span>
//               </div>
//               <div className="flex justify-between">
//                 <span className="text-gray-600">Status:</span>
//                 <span className={`px-2 py-1 rounded-full text-xs font-semibold ${
//                   card.status === 'Active' ? 'bg-success-100 text-success-700' : 'bg-warning-100 text-warning-700'
//                 }`}>
//                   {card.status}
//                 </span>
//               </div>
//             </div>

//             <button 
//               onClick={() => setSelectedCard(card)}
//               className="w-full btn-primary"
//             >
//               <QrCode className="inline h-4 w-4 mr-2" />
//               View Digital Card
//             </button>
//           </div>
//         ))}
//       </div>

//       {/* Digital Card Modal */}
//       {selectedCard && (
//         <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
//           <div className="bg-white rounded-2xl max-w-2xl w-full">
//             <div className="p-6">
//               <div className="flex items-center justify-between mb-6">
//                 <h3 className="text-2xl font-bold text-gray-900">Smart Tourist ID Card</h3>
//                 <button
//                   onClick={() => setSelectedCard(null)}
//                   className="text-gray-500 hover:text-gray-700 text-2xl"
//                 >
//                   ×
//                 </button>
//               </div>

//               {/* Digital Card Design */}
//               <div className="bg-gradient-to-br from-primary-600 to-primary-800 rounded-2xl p-8 text-white mb-6 shadow-2xl">
//                 <div className="flex items-start justify-between mb-6">
//                   <div>
//                     <p className="text-primary-200 text-sm mb-1">Tourist Safety System</p>
//                     <h4 className="text-2xl font-bold">Digital Tourist Card</h4>
//                   </div>
//                   <CreditCard className="h-12 w-12 text-primary-200" />
//                 </div>

//                 <div className="flex gap-6 mb-6">
//                   <div className="h-24 w-24 bg-white rounded-lg flex items-center justify-center text-6xl">
//                     {selectedCard.photo}
//                   </div>
//                   <div className="flex-1">
//                     <p className="text-2xl font-bold mb-1">{selectedCard.name}</p>
//                     <p className="text-primary-100 mb-1">{selectedCard.country}</p>
//                     <p className="text-primary-200 text-sm font-mono">{selectedCard.id}</p>
//                     <div className="mt-2 flex items-center gap-2">
//                       {selectedCard.verified && (
//                         <span className="bg-success-500 text-white px-2 py-1 rounded-full text-xs font-semibold flex items-center gap-1">
//                           <CheckCircle className="h-3 w-3" />
//                           Verified
//                         </span>
//                       )}
//                       <span className="bg-white/20 backdrop-blur px-2 py-1 rounded-full text-xs font-semibold">
//                         {selectedCard.status}
//                       </span>
//                     </div>
//                   </div>
//                 </div>

//                 <div className="grid grid-cols-2 gap-4 mb-6">
//                   <div>
//                     <p className="text-primary-200 text-xs mb-1">Passport Number</p>
//                     <p className="font-semibold">{selectedCard.passport}</p>
//                   </div>
//                   <div>
//                     <p className="text-primary-200 text-xs mb-1">Phone</p>
//                     <p className="font-semibold">{selectedCard.phone}</p>
//                   </div>
//                   <div>
//                     <p className="text-primary-200 text-xs mb-1">Check-in Date</p>
//                     <p className="font-semibold">{selectedCard.checkIn}</p>
//                   </div>
//                   <div>
//                     <p className="text-primary-200 text-xs mb-1">Check-out Date</p>
//                     <p className="font-semibold">{selectedCard.checkOut}</p>
//                   </div>
//                 </div>

//                 <div className="bg-white/10 backdrop-blur rounded-lg p-3">
//                   <p className="text-primary-100 text-xs mb-1">Emergency Contact</p>
//                   <p className="font-semibold text-lg">{selectedCard.emergencyContact}</p>
//                 </div>
//               </div>

//               {/* QR Code Section */}
//               <div className="bg-gray-50 rounded-xl p-6 mb-6">
//                 <div className="flex items-center justify-between">
//                   <div>
//                     <h5 className="font-bold text-lg mb-1">Digital QR Code</h5>
//                     <p className="text-sm text-gray-600">Scan for instant verification</p>
//                   </div>
//                   <div className="bg-white p-4 rounded-lg shadow-md">
//                     <QRCode 
//                       value={JSON.stringify({
//                         id: selectedCard.id,
//                         name: selectedCard.name,
//                         passport: selectedCard.passport,
//                         country: selectedCard.country,
//                         emergency: selectedCard.emergencyContact
//                       })}
//                       size={150}
//                       level="H"
//                       includeMargin={true}
//                     />
//                   </div>
//                 </div>
//               </div>

//               {/* Card Details */}
//               <div className="grid grid-cols-2 gap-4 mb-6">
//                 <div className="border-l-4 border-primary-600 pl-4">
//                   <p className="text-sm text-gray-600">Email Address</p>
//                   <p className="font-semibold">{selectedCard.email}</p>
//                 </div>
//                 <div className="border-l-4 border-primary-600 pl-4">
//                   <p className="text-sm text-gray-600">Current Hotel</p>
//                   <p className="font-semibold">{selectedCard.hotel}</p>
//                 </div>
//               </div>

//               {/* Actions */}
//               <div className="flex gap-3">
//                 <button className="flex-1 btn-primary">
//                   <Download className="inline h-4 w-4 mr-2" />
//                   Download Card
//                 </button>
//                 <button className="flex-1 bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 font-medium">
//                   <Printer className="inline h-4 w-4 mr-2" />
//                   Print Card
//                 </button>
//                 <button className="flex-1 bg-gray-600 text-white px-4 py-2 rounded-lg hover:bg-gray-700 font-medium">
//                   Send via Email
//                 </button>
//               </div>
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   )
// }

// export default SmartIDSystem

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import LocationTracker from '../../components/Shared/LocationTracker';

const SmartIDSystem = () => {
  const [tourists, setTourists] = useState([]);
  const [selectedTourist, setSelectedTourist] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filter, setFilter] = useState('all');
  const [newTourist, setNewTourist] = useState({
    name: '',
    email: '',
    passportNumber: '',
    country: '',
    arrivalDate: '',
    departureDate: '',
    emergencyContact: '',
    medicalConditions: '',
    status: 'active'
  });

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
          lastUpdated: '2023-05-15 14:30'
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
          lastUpdated: '2023-05-15 13:45'
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
          lastUpdated: '2023-05-15 11:20'
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
          lastUpdated: '2023-05-15 10:15'
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
          lastUpdated: '2023-05-15 09:30'
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

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewTourist(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // In a real app, you would send this to your API
    const newTouristData = {
      id: Date.now(),
      ...newTourist,
      lastUpdated: new Date().toLocaleString()
    };

    setTourists(prev => [newTouristData, ...prev]);
    setNewTourist({
      name: '',
      email: '',
      passportNumber: '',
      country: '',
      arrivalDate: '',
      departureDate: '',
      emergencyContact: '',
      medicalConditions: '',
      status: 'active'
    });
  };

  return (
    <div className="space-y-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="bg-white p-6 rounded-lg shadow-md"
      >
        <h1 className="text-2xl font-bold text-gray-800 mb-4">Smart ID System</h1>
        <p className="text-gray-600">Manage tourist identification and tracking</p>
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

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.3 }}
        className="bg-white p-6 rounded-lg shadow-md"
      >
        <h2 className="text-xl font-semibold mb-4">Register New Tourist</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-gray-700 text-sm font-bold mb-2">Full Name</label>
              <input
                type="text"
                name="name"
                value={newTourist.name}
                onChange={handleInputChange}
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                placeholder="Full name"
              />
            </div>

            <div>
              <label className="block text-gray-700 text-sm font-bold mb-2">Email</label>
              <input
                type="email"
                name="email"
                value={newTourist.email}
                onChange={handleInputChange}
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                placeholder="Email address"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-gray-700 text-sm font-bold mb-2">Passport Number</label>
              <input
                type="text"
                name="passportNumber"
                value={newTourist.passportNumber}
                onChange={handleInputChange}
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                placeholder="Passport number"
              />
            </div>

            <div>
              <label className="block text-gray-700 text-sm font-bold mb-2">Country</label>
              <input
                type="text"
                name="country"
                value={newTourist.country}
                onChange={handleInputChange}
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                placeholder="Country of origin"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-gray-700 text-sm font-bold mb-2">Arrival Date</label>
              <input
                type="date"
                name="arrivalDate"
                value={newTourist.arrivalDate}
                onChange={handleInputChange}
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>

            <div>
              <label className="block text-gray-700 text-sm font-bold mb-2">Departure Date</label>
              <input
                type="date"
                name="departureDate"
                value={newTourist.departureDate}
                onChange={handleInputChange}
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-gray-700 text-sm font-bold mb-2">Emergency Contact</label>
              <input
                type="text"
                name="emergencyContact"
                value={newTourist.emergencyContact}
                onChange={handleInputChange}
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                placeholder="Name and relationship"
              />
            </div>

            <div>
              <label className="block text-gray-700 text-sm font-bold mb-2">Medical Conditions</label>
              <input
                type="text"
                name="medicalConditions"
                value={newTourist.medicalConditions}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                placeholder="Any medical conditions"
              />
            </div>
          </div>

          <div className="flex justify-end space-x-4">
            <button
              type="button"
              onClick={() => setNewTourist({
                name: '',
                email: '',
                passportNumber: '',
                country: '',
                arrivalDate: '',
                departureDate: '',
                emergencyContact: '',
                medicalConditions: '',
                status: 'active'
              })}
              className="px-4 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300 transition-colors"
            >
              Clear Form
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition-colors"
            >
              Register Tourist
            </button>
          </div>
        </form>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.4 }}
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
              <h3 className="text-lg font-medium">Contact Information</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <p className="text-gray-500 text-sm">Email</p>
                  <p className="font-medium">{selectedTourist.email}</p>
                </div>
                <div>
                  <p className="text-gray-500 text-sm">Emergency Contact</p>
                  <p className="font-medium">{selectedTourist.emergencyContact}</p>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: 0.2 }}
              className="space-y-4"
            >
              <h3 className="text-lg font-medium">Travel Details</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <p className="text-gray-500 text-sm">Arrival Date</p>
                  <p className="font-medium">{selectedTourist.arrivalDate}</p>
                </div>
                <div>
                  <p className="text-gray-500 text-sm">Departure Date</p>
                  <p className="font-medium">{selectedTourist.departureDate}</p>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: 0.3 }}
              className="space-y-4"
            >
              <h3 className="text-lg font-medium">Medical Information</h3>
              <p className="text-gray-700">{selectedTourist.medicalConditions || 'No medical conditions reported'}</p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: 0.4 }}
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
    </div>
  );
};

export default SmartIDSystem;