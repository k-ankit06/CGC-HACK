
// import { useState } from 'react'
// import { Phone, MapPin, Activity, Shield, AlertTriangle, Navigation, Clock } from 'lucide-react'

// const EmergencyHelp = () => {
//   const [selectedEmergency, setSelectedEmergency] = useState(null)
//   const [panicActivated, setPanicActivated] = useState(false)

//   const emergencyContacts = [
//     {
//       id: 1,
//       type: 'Police Emergency',
//       number: '100',
//       icon: Shield,
//       color: 'primary',
//       description: 'For crime, theft, or security emergencies',
//       avgResponseTime: '5-8 minutes',
//       available247: true
//     },
//     {
//       id: 2,
//       type: 'Medical Emergency',
//       number: '102',
//       icon: Activity,
//       color: 'danger',
//       description: 'For medical emergencies and ambulance services',
//       avgResponseTime: '8-12 minutes',
//       available247: true
//     },
//     {
//       id: 3,
//       type: 'Tourist Police',
//       number: '1363',
//       icon: Shield,
//       color: 'purple',
//       description: 'Dedicated helpline for tourist assistance',
//       avgResponseTime: '3-5 minutes',
//       available247: true
//     },
//     {
//       id: 4,
//       type: 'Women Helpline',
//       number: '1091',
//       icon: AlertTriangle,
//       color: 'danger',
//       description: 'Emergency helpline for women in distress',
//       avgResponseTime: '5-7 minutes',
//       available247: true
//     }
//   ]

//   const nearbyEmergencyServices = [
//     {
//       name: 'District Hospital Agra',
//       type: 'Hospital',
//       distance: '2.1 km',
//       address: 'MG Road, Agra',
//       phone: '+91-562-2226355',
//       rating: 4.2,
//       facilities: ['Emergency Ward', 'ICU', 'Trauma Center']
//     },
//     {
//       name: 'Taj Ganj Police Station',
//       type: 'Police',
//       distance: '0.5 km',
//       address: 'Near Taj Mahal, Agra',
//       phone: '+91-562-2330047',
//       rating: 4.0,
//       facilities: ['24/7 Service', 'Tourist Help Desk']
//     },
//     {
//       name: 'Pushpanjali Hospital',
//       type: 'Hospital',
//       distance: '3.5 km',
//       address: 'Fatehabad Road, Agra',
//       phone: '+91-562-4045454',
//       rating: 4.5,
//       facilities: ['Emergency', 'Pharmacy', 'Ambulance']
//     },
//     {
//       name: 'Tourist Police Booth',
//       type: 'Tourist Help',
//       distance: '0.3 km',
//       address: 'Taj East Gate',
//       phone: '+91-562-2227261',
//       rating: 4.8,
//       facilities: ['Tourist Assistance', 'Lost & Found']
//     }
//   ]

//   const embassyContacts = [
//     { country: 'USA', phone: '+91-11-2419-8000', city: 'New Delhi' },
//     { country: 'UK', phone: '+91-11-2419-2100', city: 'New Delhi' },
//     { country: 'Canada', phone: '+91-11-4178-2000', city: 'New Delhi' },
//     { country: 'Australia', phone: '+91-11-4139-9900', city: 'New Delhi' },
//     { country: 'Germany', phone: '+91-11-4479-9199', city: 'New Delhi' },
//     { country: 'France', phone: '+91-11-4319-6100', city: 'New Delhi' }
//   ]

//   const handlePanic = () => {
//     setPanicActivated(true)
//     // Simulate emergency alert
//     setTimeout(() => {
//       setPanicActivated(false)
//     }, 5000)
//   }

//   const getColorClasses = (color) => {
//     const colors = {
//       primary: 'from-primary-500 to-primary-600',
//       danger: 'from-danger-500 to-danger-600',
//       purple: 'from-purple-500 to-purple-600',
//       success: 'from-success-500 to-success-600'
//     }
//     return colors[color] || colors.primary
//   }

//   return (
//     <div className="space-y-6">
//       <div>
//         <h2 className="text-3xl font-bold text-gray-900">Emergency Help</h2>
//         <p className="text-gray-600 mt-1">Immediate assistance and emergency contacts at your fingertips</p>
//       </div>

//       {/* SOS Panic Button */}
//       <div className="card bg-gradient-to-r from-danger-500 to-danger-600 text-white">
//         <div className="flex items-center justify-between">
//           <div className="flex-1">
//             <h3 className="text-2xl font-bold mb-2">🚨 Emergency SOS</h3>
//             <p className="text-danger-100 mb-4">
//               Press this button in case of immediate emergency. Your location will be sent to nearest authorities.
//             </p>
//             <div className="flex gap-3">
//               <button
//                 onClick={handlePanic}
//                 className={`px-8 py-4 rounded-xl font-bold text-lg transition-all ${
//                   panicActivated
//                     ? 'bg-white text-danger-600 animate-pulse scale-105'
//                     : 'bg-white/20 hover:bg-white/30 backdrop-blur'
//                 } shadow-xl`}
//               >
//                 {panicActivated ? '📡 ALERT SENT!' : '🆘 ACTIVATE SOS'}
//               </button>
//               <button className="px-6 py-4 bg-white/20 hover:bg-white/30 backdrop-blur rounded-xl font-semibold">
//                 📞 Call 100
//               </button>
//             </div>
//           </div>
//           <div className="hidden md:block">
//             <div className={`w-40 h-40 rounded-full flex items-center justify-center ${
//               panicActivated ? 'bg-white animate-pulse' : 'bg-white/20 backdrop-blur'
//             } shadow-2xl`}>
//               <AlertTriangle className={`h-20 w-20 ${panicActivated ? 'text-danger-600' : 'text-white'}`} />
//             </div>
//           </div>
//         </div>
//         {panicActivated && (
//           <div className="mt-4 bg-white/20 backdrop-blur rounded-lg p-4 animate-pulse">
//             <p className="font-bold text-lg">✅ Emergency Alert Activated!</p>
//             <p className="text-sm text-danger-100 mt-1">
//               📍 Location shared • 🚓 Police notified (ETA: 3 mins) • 🚑 Ambulance on standby • 📞 Emergency contacts alerted
//             </p>
//           </div>
//         )}
//       </div>

//       {/* Quick Emergency Contacts */}
//       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
//         {emergencyContacts.map((contact) => {
//           const Icon = contact.icon
//           return (
//             <div
//               key={contact.id}
//               className="card cursor-pointer hover:shadow-xl transition-all"
//               onClick={() => setSelectedEmergency(contact)}
//             >
//               <div className={`bg-gradient-to-br ${getColorClasses(contact.color)} text-white rounded-lg p-4 mb-3`}>
//                 <Icon className="h-8 w-8 mb-2" />
//                 <p className="font-semibold">{contact.type}</p>
//               </div>
//               <p className="text-3xl font-bold text-gray-900 mb-2">{contact.number}</p>
//               <p className="text-sm text-gray-600 mb-2">{contact.description}</p>
//               <div className="flex items-center gap-2 text-xs text-gray-500">
//                 <Clock className="h-3 w-3" />
//                 <span>{contact.avgResponseTime}</span>
//               </div>
//               <button className="w-full mt-3 bg-primary-600 text-white py-2 rounded-lg hover:bg-primary-700 font-semibold">
//                 📞 Call Now
//               </button>
//             </div>
//           )
//         })}
//       </div>

//       {/* Nearby Emergency Services */}
//       <div className="card">
//         <h3 className="text-xl font-bold mb-4 flex items-center">
//           <MapPin className="h-6 w-6 mr-2 text-primary-600" />
//           Nearby Emergency Services
//         </h3>
//         <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//           {nearbyEmergencyServices.map((service, index) => (
//             <div key={index} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
//               <div className="flex items-start justify-between mb-3">
//                 <div className="flex-1">
//                   <div className="flex items-center gap-2 mb-1">
//                     <h4 className="font-bold text-gray-900">{service.name}</h4>
//                     <span className="px-2 py-1 bg-primary-100 text-primary-700 rounded-full text-xs font-semibold">
//                       {service.type}
//                     </span>
//                   </div>
//                   <p className="text-sm text-gray-600">{service.address}</p>
//                 </div>
//                 <div className="text-right">
//                   <div className="flex items-center gap-1 mb-1">
//                     <span className="text-yellow-500">⭐</span>
//                     <span className="font-semibold">{service.rating}</span>
//                   </div>
//                   <p className="text-xs text-gray-500">{service.distance}</p>
//                 </div>
//               </div>

//               <div className="flex flex-wrap gap-2 mb-3">
//                 {service.facilities.map((facility, idx) => (
//                   <span key={idx} className="px-2 py-1 bg-gray-100 text-gray-700 rounded text-xs">
//                     {facility}
//                   </span>
//                 ))}
//               </div>

//               <div className="flex gap-2">
//                 <button className="flex-1 bg-primary-600 text-white py-2 rounded-lg hover:bg-primary-700 font-semibold text-sm">
//                   <Phone className="inline h-4 w-4 mr-1" />
//                   Call
//                 </button>
//                 <button className="flex-1 bg-success-600 text-white py-2 rounded-lg hover:bg-success-700 font-semibold text-sm">
//                   <Navigation className="inline h-4 w-4 mr-1" />
//                   Navigate
//                 </button>
//               </div>
//             </div>
//           ))}
//         </div>
//       </div>

//       {/* Embassy Contacts */}
//       <div className="card">
//         <h3 className="text-xl font-bold mb-4">Embassy/Consulate Contacts</h3>
//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
//           {embassyContacts.map((embassy, index) => (
//             <div key={index} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
//               <div className="flex items-center gap-2 mb-2">
//                 <span className="text-2xl">🏛️</span>
//                 <div>
//                   <h4 className="font-bold text-gray-900">{embassy.country}</h4>
//                   <p className="text-xs text-gray-600">{embassy.city}</p>
//                 </div>
//               </div>
//               <p className="font-mono font-semibold text-primary-600 mb-2">{embassy.phone}</p>
//               <button className="w-full bg-gray-600 text-white py-2 rounded-lg hover:bg-gray-700 font-semibold text-sm">
//                 Call Embassy
//               </button>
//             </div>
//           ))}
//         </div>
//       </div>

//       {/* Safety Checklist */}
//       <div className="card bg-warning-50 border-2 border-warning-300">
//         <h3 className="text-xl font-bold text-warning-900 mb-4">⚠️ Emergency Preparedness Checklist</h3>
//         <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
//           {[
//             'Tourist ID card saved on phone',
//             'Emergency contacts programmed in phone',
//             'Location services enabled',
//             'Phone fully charged',
//             'Know your hotel address',
//             'Know your blood group',
//             'Travel insurance details accessible',
//             'Embassy contact number saved'
//           ].map((item, index) => (
//             <div key={index} className="flex items-center gap-2 bg-white p-3 rounded-lg">
//               <input type="checkbox" className="h-5 w-5 text-warning-600" />
//               <span className="text-gray-700">{item}</span>
//             </div>
//           ))}
//         </div>
//       </div>

//       {/* Emergency Detail Modal */}
//       {selectedEmergency && (
//         <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
//           <div className="bg-white rounded-2xl max-w-lg w-full">
//             <div className="p-6">
//               <div className="flex items-center justify-between mb-6">
//                 <h3 className="text-2xl font-bold text-gray-900">{selectedEmergency.type}</h3>
//                 <button
//                   onClick={() => setSelectedEmergency(null)}
//                   className="text-gray-500 hover:text-gray-700 text-2xl"
//                 >
//                   ×
//                 </button>
//               </div>

//               <div className="space-y-4">
//                 <div className="bg-primary-50 p-4 rounded-lg">
//                   <p className="text-sm text-gray-600 mb-1">Emergency Number</p>
//                   <p className="text-4xl font-bold text-primary-600">{selectedEmergency.number}</p>
//                 </div>

//                 <div>
//                   <p className="text-sm text-gray-600 mb-1">Description</p>
//                   <p className="text-gray-900">{selectedEmergency.description}</p>
//                 </div>

//                 <div className="grid grid-cols-2 gap-4">
//                   <div>
//                     <p className="text-sm text-gray-600 mb-1">Response Time</p>
//                     <p className="font-semibold text-gray-900">{selectedEmergency.avgResponseTime}</p>
//                   </div>
//                   <div>
//                     <p className="text-sm text-gray-600 mb-1">Availability</p>
//                     <p className="font-semibold text-gray-900">
//                       {selectedEmergency.available247 ? '24/7' : 'Limited Hours'}
//                     </p>
//                   </div>
//                 </div>

//                 <div className="bg-warning-50 border border-warning-200 p-3 rounded-lg">
//                   <p className="text-sm text-warning-900">
//                     <strong>Note:</strong> This is a toll-free emergency number. Your location will be automatically shared when you call.
//                   </p>
//                 </div>

//                 <button className="w-full bg-primary-600 text-white py-3 rounded-lg hover:bg-primary-700 font-bold text-lg">
//                   📞 Call {selectedEmergency.number} Now
//                 </button>
//               </div>
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   )
// }

// export default EmergencyHelp


import { useState } from 'react';
import { motion } from 'framer-motion';
import { useAuth } from '../../components/Auth/AuthContext';

const EmergencyHelp = () => {
  const [emergencyType, setEmergencyType] = useState('medical');
  const [description, setDescription] = useState('');
  const [location, setLocation] = useState('');
  const [isSending, setIsSending] = useState(false);
  const [isSent, setIsSent] = useState(false);
  const [error, setError] = useState('');
  const { user } = useAuth();

  const emergencyTypes = [
    { id: 'medical', label: 'Medical Emergency', icon: '🏥' },
    { id: 'police', label: 'Police Assistance', icon: '👮' },
    { id: 'lost', label: 'Lost or Stranded', icon: '🚶' },
    { id: 'safety', label: 'Safety Concern', icon: '⚠️' },
    { id: 'other', label: 'Other Emergency', icon: '❗' }
  ];

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!description.trim()) {
      setError('Please describe your emergency');
      return;
    }

    setIsSending(true);

    try {
      // Simulate API call to send emergency alert
      await new Promise(resolve => setTimeout(resolve, 2000));

      // In a real app, you would send the emergency data to your backend
      console.log('Emergency alert sent:', {
        type: emergencyType,
        description,
        location,
        touristId: user?.id
      });

      setIsSent(true);
    } catch (err) {
      setError('Failed to send emergency alert. Please try again.');
      console.error(err);
    } finally {
      setIsSending(false);
    }
  };

  const getEmergencyColor = (type) => {
    const colors = {
      medical: 'bg-red-100 text-red-800',
      police: 'bg-blue-100 text-blue-800',
      lost: 'bg-yellow-100 text-yellow-800',
      safety: 'bg-orange-100 text-orange-800',
      other: 'bg-purple-100 text-purple-800'
    };
    return colors[type] || 'bg-gray-100 text-gray-800';
  };

  return (
    <div className="space-y-6">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="text-3xl font-bold text-gray-800">Emergency Help</h1>
        <p className="text-gray-600">Get immediate assistance in case of emergencies</p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className="bg-white p-6 rounded-lg shadow-md"
      >
        <h2 className="text-xl font-semibold mb-4">Emergency Alert</h2>

        {isSent ? (
          <div className="text-center py-12">
            <div className="mx-auto mb-4">
              <svg className="w-20 h-20 text-green-500 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h3 className="text-2xl font-bold text-green-700 mb-2">Emergency Alert Sent!</h3>
            <p className="text-gray-600">
              Help is on the way. Stay safe and follow instructions from authorities.
            </p>
            <p className="mt-4 text-gray-500">
              If your situation changes, please call emergency services directly.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-6">
            {error && (
              <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
                {error}
              </div>
            )}

            <div>
              <label className="block text-gray-700 text-sm font-bold mb-2">
                Select Emergency Type
              </label>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                {emergencyTypes.map((type) => (
                  <button
                    key={type.id}
                    type="button"
                    onClick={() => setEmergencyType(type.id)}
                    className={`flex items-center justify-center p-3 rounded-md ${emergencyType === type.id ? 'ring-2 ring-indigo-500' : ''} ${getEmergencyColor(type.id)}`}
                  >
                    <span className="mr-2 text-xl">{type.icon}</span>
                    <span>{type.label}</span>
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label htmlFor="description" className="block text-gray-700 text-sm font-bold mb-2">
                Describe the Emergency
              </label>
              <textarea
                id="description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                rows="4"
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                placeholder="Describe your situation in detail..."
                required
              ></textarea>
            </div>

            <div>
              <label htmlFor="location" className="block text-gray-700 text-sm font-bold mb-2">
                Current Location
              </label>
              <input
                type="text"
                id="location"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                placeholder="Your current location (or let us detect it)"
              />
              <p className="text-sm text-gray-500 mt-1">
                If you're unsure of your location, leave this blank and we'll use your device's location.
              </p>
            </div>

            <div className="flex items-center">
              <input
                id="location-permission"
                type="checkbox"
                checked={true}
                readOnly
                className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
              />
              <label htmlFor="location-permission" className="ml-2 block text-gray-700 text-sm">
                Allow use of my current location
              </label>
            </div>

            <div className="pt-4 border-t border-gray-200">
              <button
                type="submit"
                disabled={isSending}
                className={`w-full py-3 px-4 rounded-md text-white font-medium ${isSending ? 'bg-indigo-400' : 'bg-indigo-600 hover:bg-indigo-700'} transition-colors`}
              >
                {isSending ? (
                  <>
                    <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Sending Alert...
                  </>
                ) : 'Send Emergency Alert'}
              </button>
            </div>
          </form>
        )}
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="bg-white p-6 rounded-lg shadow-md"
      >
        <h2 className="text-xl font-semibold mb-4">Emergency Contacts</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <div className="bg-red-50 p-4 rounded-lg">
            <h3 className="font-semibold text-red-800">Medical Emergency</h3>
            <p className="text-red-600 text-sm mt-1">For immediate medical assistance</p>
            <div className="mt-2">
              <a href="tel:102" className="text-red-600 hover:text-red-800 font-medium">
                102 (Ambulance)
              </a>
            </div>
          </div>

          <div className="bg-blue-50 p-4 rounded-lg">
            <h3 className="font-semibold text-blue-800">Police Assistance</h3>
            <p className="text-blue-600 text-sm mt-1">For police help or reporting crimes</p>
            <div className="mt-2">
              <a href="tel:100" className="text-blue-600 hover:text-blue-800 font-medium">
                100 (Police)
              </a>
            </div>
          </div>

          <div className="bg-yellow-50 p-4 rounded-lg">
            <h3 className="font-semibold text-yellow-800">Fire Emergency</h3>
            <p className="text-yellow-600 text-sm mt-1">For fire-related emergencies</p>
            <div className="mt-2">
              <a href="tel:101" className="text-yellow-600 hover:text-yellow-800 font-medium">
                101 (Fire)
              </a>
            </div>
          </div>

          <div className="bg-indigo-50 p-4 rounded-lg">
            <h3 className="font-semibold text-indigo-800">Tourist Police</h3>
            <p className="text-indigo-600 text-sm mt-1">For tourist-specific assistance</p>
            <div className="mt-2">
              <a href="tel:+911123456789" className="text-indigo-600 hover:text-indigo-800 font-medium">
                +91 11 2345 6789
              </a>
            </div>
          </div>

          <div className="bg-purple-50 p-4 rounded-lg">
            <h3 className="font-semibold text-purple-800">Women's Helpline</h3>
            <p className="text-purple-600 text-sm mt-1">For women in distress</p>
            <div className="mt-2">
              <a href="tel:1091" className="text-purple-600 hover:text-purple-800 font-medium">
                1091 (Women's Helpline)
              </a>
            </div>
          </div>

          <div className="bg-green-50 p-4 rounded-lg">
            <h3 className="font-semibold text-green-800">Child Helpline</h3>
            <p className="text-green-600 text-sm mt-1">For children in need</p>
            <div className="mt-2">
              <a href="tel:1098" className="text-green-600 hover:text-green-800 font-medium">
                1098 (Child Helpline)
              </a>
            </div>
          </div>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="bg-white p-6 rounded-lg shadow-md"
      >
        <h2 className="text-xl font-semibold mb-4">Emergency Procedures</h2>
        <div className="space-y-4">
          <div className="flex items-start">
            <svg className="w-5 h-5 text-indigo-500 mt-1 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <div>
              <h3 className="font-medium">Medical Emergency</h3>
              <p className="text-gray-600 mt-1">
                If you need immediate medical attention:
                <ul className="list-disc pl-5 mt-1 text-sm">
                  <li>Call 102 for an ambulance</li>
                  <li>If possible, move to a safe location</li>
                  <li>Provide clear information about your location</li>
                  <li>Stay on the line until help arrives</li>
                </ul>
              </p>
            </div>
          </div>

          <div className="flex items-start">
            <svg className="w-5 h-5 text-indigo-500 mt-1 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 8h6m-6 4h6m-12 8h.01M4 12h16m-6-4h.01" />
            </svg>
            <div>
              <h3 className="font-medium">Police Assistance</h3>
              <p className="text-gray-600 mt-1">
                If you need police help:
                <ul className="list-disc pl-5 mt-1 text-sm">
                  <li>Call 100 for immediate police assistance</li>
                  <li>Provide your location and describe the situation</li>
                  <li>Stay calm and follow police instructions</li>
                  <li>If in immediate danger, try to move to a safe location</li>
                </ul>
              </p>
            </div>
          </div>

          <div className="flex items-start">
            <svg className="w-5 h-5 text-indigo-500 mt-1 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
            <div>
              <h3 className="font-medium">Other Emergencies</h3>
              <p className="text-gray-600 mt-1">
                For other emergencies:
                <ul className="list-disc pl-5 mt-1 text-sm">
                  <li>Use the emergency alert button above</li>
                  <li>Provide as much detail as possible</li>
                  <li>Stay in a safe location until help arrives</li>
                  <li>If possible, have someone stay with you</li>
                </ul>
              </p>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default EmergencyHelp;