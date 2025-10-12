// // src/pages/Tourist/MyTouristCard.jsx
// import React, { useEffect, useState } from 'react'
// import QRCode from 'qrcode.react'
// import { useAuth } from '../../components/Auth/AuthContext'
// import { Download, Share2, Printer, CheckCircle, Phone, Mail, MapPin, User, Shield, AlertTriangle, Loader } from 'lucide-react' // Added icons, removed unused

// const MyTouristCard = () => {
//   const { user } = useAuth()
//   const [myMembers, setMyMembers] = useState([])

//   useEffect(() => {
//     const allTourists = JSON.parse(localStorage.getItem('allTourists') || '[]')
//     const touristGroups = JSON.parse(localStorage.getItem('touristGroups') || '[]')
//     let membersList = []

//     // Prioritize groupId from user if available
//     const userGroupId = user?.groupId
//     if (userGroupId) {
//       const group = touristGroups.find(g => g.groupId === userGroupId)
//       if (group?.members) {
//         membersList = allTourists.filter(t => group.members.includes(t.touristId))
//       }
//     }
//     // Fallback 1: If no groupId, find latest group registered by the user's email
//     else if (user?.email) {
//       const userGroups = touristGroups.filter(g => g.registeredBy === user.email)
//         .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)) // Sort by creation date descending
//       if (userGroups.length > 0 && userGroups[0]?.members) {
//         membersList = allTourists.filter(t => userGroups[0].members.includes(t.touristId))
//       }
//     }

//     // Fallback 2: If still no members found, get directly registered tourists by user's email
//     if ((!membersList || membersList.length === 0) && user?.email) {
//       membersList = allTourists.filter(t => t.registeredBy === user.email)
//     }

//     setMyMembers(membersList)
//   }, [user]) // Re-run if user object changes

//   const downloadQR = (touristId) => {
//     const canvas = document.getElementById(`card-qr-${touristId}`)
//     if (!canvas) {
//       console.error(`Canvas element with ID card-qr-${touristId} not found.`);
//       alert('QR Code generation failed.')
//       return
//     }
//     const pngUrl = canvas.toDataURL("image/png").replace("image/png", "image/octet-stream")
//     const a = document.createElement("a")
//     a.href = pngUrl
//     a.download = `${touristId}.png`
//     document.body.appendChild(a)
//     a.click()
//     document.body.removeChild(a)
//   }

//   const shareCard = (member) => {
//     // Determine the correct ID label and number based on member's ID type
//     const idLabel = member.idType === 'aadhaar' ? 'Aadhaar' : 'Passport'
//     const idNumber = member.idType === 'aadhaar' ? member.aadhaarNumber : member.passportNumber

//     const payload = `Tourist Card\nName: ${member.fullName}\nTourist ID: ${member.touristId}\n${idLabel}: ${idNumber}\nBlood Group: ${member.bloodGroup || 'N/A'}\nEmergency Contact: ${member.emergencyContactPhone || member.emergencyContact || 'N/A'}`

//     if (navigator.share) {
//       navigator.share({ title: 'Smart Tourist Card', text: payload })
//         .catch((error) => console.log('Error sharing:', error))
//     } else {
//       // Fallback for browsers that don't support navigator.share
//       navigator.clipboard.writeText(payload).then(() => {
//         alert('Card details copied to clipboard!')
//       }).catch(err => {
//         console.error('Failed to copy card details: ', err)
//         alert('Failed to copy card details.')
//       })
//     }
//   }

//   const printCard = (touristId) => {
//     const cardElement = document.getElementById(`card-${touristId}`)
//     if (!cardElement) {
//       console.error(`Card element with ID card-${touristId} not found.`);
//       alert('Could not prepare card for printing.');
//       return;
//     }
//     const printWindow = window.open('', '_blank', 'width=800,height=700');
//     if (!printWindow) {
//       alert('Please allow popups for printing.');
//       return;
//     }
//     printWindow.document.write(`
//       <html>
//         <head>
//           <title>Print Tourist Card</title>
//           <style>
//             body { font-family: Arial, Helvetica, sans-serif; padding: 20px; }
//             .card { width: 100%; border-radius: 12px; padding: 20px; background: #f7f9ff; box-shadow: 0 4px 6px rgba(0,0,0,0.1); }
//             /* Add any specific print styles if needed */
//           </style>
//         </head>
//         <body>${cardElement.outerHTML}</body>
//       </html>
//     `);
//     printWindow.document.close();
//     printWindow.focus();
//     setTimeout(() => {
//       printWindow.print();
//       printWindow.close();
//     }, 500);
//   };

//   if (!myMembers || myMembers.length === 0) {
//     return (
//       <div className="max-w-2xl mx-auto">
//         <div className="card text-center p-6">
//           <QrCode className="h-24 w-24 text-gray-300 mx-auto mb-4" />
//           <h2 className="text-2xl font-bold text-gray-900 mb-2">No Tourist Cards Found</h2>
//           <p className="text-gray-600 mb-6">Please complete your registration to generate Smart Tourist Cards for your group members.</p>
//           <button onClick={() => navigate('/tourist/registration')} className="btn-primary">
//             Complete Registration
//           </button>
//         </div>
//       </div>
//     )
//   }

//   return (
//     <div className="max-w-5xl mx-auto space-y-6 p-4">
//       <div>
//         <h2 className="text-3xl font-bold text-gray-900">My Tourist Card{myMembers.length > 1 ? 's' : ''}</h2>
//         <p className="text-gray-600 mt-1">Your digital safety passport</p>
//       </div>

//       <div className="grid grid-cols-1 md:grid-grid-cols-2 gap-6">
//         {myMembers.map((member) => {
//           // Dynamically determine ID label and number
//           const idLabel = member.idType === 'aadhaar' ? 'Aadhaar' : 'Passport'
//           const idNumber = member.idType === 'aadhaar' ? member.aadhaarNumber : member.passportNumber
          
//           const emergencyContactDisplay = member.emergencyContactPhone || member.emergencyContact || 'N/A'
//           const bloodGroupDisplay = member.bloodGroup || 'N/A'
//           const validTillDisplay = member.checkOutDate || '—'
//           const genderDisplay = member.gender || '—'

//           return (
//             <div key={member.touristId} id={`card-${member.touristId}`} className="card relative shadow-lg hover:shadow-xl transition-shadow">
//               <div className="flex items-start gap-4">
//                 <div className="h-20 w-20 bg-gray-100 rounded-lg flex items-center justify-center text-3xl text-gray-500">👤</div>
//                 <div className="flex-1">
//                   <div className="flex justify-between items-start">
//                     <div>
//                       <h3 className="text-xl font-bold text-gray-900">{member.fullName}</h3>
//                       <p className="text-sm text-gray-500">Tourist ID: <span className="font-mono text-primary-600">{member.touristId}</span></p>
//                       <p className="text-sm text-gray-600 mt-1">{idLabel}: {idNumber}</p>
//                       <p className="text-sm text-gray-600 mt-1">Blood: {bloodGroupDisplay}</p>
//                       <p className="text-sm text-gray-600 mt-1">Emergency: {emergencyContactDisplay}</p>
//                     </div>
//                     <div className="bg-white p-3 rounded-xl shadow-lg">
//                       <QRCode id={`card-qr-${member.touristId}`} value={JSON.stringify(member)} size={110} level="H" includeMargin={true} />
//                     </div>
//                   </div>

//                   <div className="mt-4 grid grid-cols-2 gap-3">
//                     <button onClick={() => downloadQR(member.touristId)} className="btn-primary flex items-center justify-center gap-2">
//                       <Download className="h-4 w-4" /> Download QR
//                     </button>
//                     <button onClick={() => shareCard(member)} className="bg-gray-600 text-white px-4 py-2 rounded flex items-center justify-center gap-2 hover:bg-gray-700">
//                       <Share2 className="h-4 w-4" /> Share
//                     </button>
//                   </div>
//                 </div>
//               </div>

//               <div className="mt-4 flex items-center justify-between bg-primary-50 p-3 rounded-lg">
//                 <div className="flex items-center gap-2">
//                   <p className="text-sm font-semibold text-primary-900">Gender:</p>
//                   <p className="text-sm text-gray-700">{genderDisplay}</p>
//                 </div>
//                 <div className="flex items-center gap-2">
//                   <p className="text-sm font-semibold text-primary-900">Valid Till:</p>
//                   <p className="font-semibold">{validTillDisplay}</p>
//                 </div>
//               </div>

//               <div className="mt-4 text-green-600 flex items-center justify-center gap-2 text-sm font-semibold bg-success-100 py-3 rounded-lg">
//                 <CheckCircle className="h-5 w-5" />
//                 VERIFIED TOURIST - ACTIVE STATUS
//               </div>
//             </div>
//           )
//         })}
//       </div>
//     </div>
//   )
// }

// export default MyTouristCard

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useAuth } from '../../components/Auth/AuthContext';

const MyTouristCard = () => {
  const [touristData, setTouristData] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [editData, setEditData] = useState({
    name: '',
    email: '',
    phone: '',
    emergencyContact: '',
    passportNumber: '',
    nationality: '',
    address: ''
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const { user } = useAuth();

  useEffect(() => {
    // Simulate fetching tourist card data
    const fetchTouristCard = async () => {
      try {
        setLoading(true);
        // In a real app, you would fetch this from your API
        await new Promise(resolve => setTimeout(resolve, 1000));

        // Mock data
        const mockTouristData = {
          id: 'TST-001',
          name: 'John Smith',
          email: 'john.smith@example.com',
          phone: '+1 234 567 8901',
          emergencyContact: '+1 987 654 3210',
          passportNumber: 'US12345678',
          nationality: 'USA',
          address: '123 Main St, New York, USA',
          registrationDate: '2023-04-15',
          status: 'Active',
          location: 'New Delhi, India',
          lastUpdated: '2023-05-20 14:30'
        };

        setTouristData(mockTouristData);
        setEditData(mockTouristData);
      } catch (err) {
        setError('Failed to load tourist card data');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchTouristCard();
  }, []);

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleCancel = () => {
    setIsEditing(false);
    setEditData(touristData);
    setError('');
  };

  const handleSave = async () => {
    setError('');
    setSuccessMessage('');

    // Simple validation
    if (!editData.name.trim()) {
      setError('Name is required');
      return;
    }

    if (!editData.email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(editData.email)) {
      setError('Valid email is required');
      return;
    }

    if (!editData.phone.trim()) {
      setError('Phone number is required');
      return;
    }

    if (!editData.emergencyContact.trim()) {
      setError('Emergency contact is required');
      return;
    }

    if (!editData.passportNumber.trim()) {
      setError('Passport number is required');
      return;
    }

    if (!editData.nationality.trim()) {
      setError('Nationality is required');
      return;
    }

    setLoading(true);

    try {
      // Simulate API call to update tourist card
      await new Promise(resolve => setTimeout(resolve, 1000));

      // In a real app, you would send the updated data to your backend
      console.log('Updating tourist card:', editData);

      // Update the tourist data
      setTouristData(editData);
      setIsEditing(false);
      setSuccessMessage('Your tourist card has been updated successfully!');
    } catch (err) {
      setError('Failed to update tourist card. Please try again.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const getStatusColor = (status) => {
    if (status === 'Active') return 'bg-green-100 text-green-800';
    return 'bg-red-100 text-red-800';
  };

  return (
    <div className="space-y-6">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="text-3xl font-bold text-gray-800">My Tourist Card</h1>
        <p className="text-gray-600">Your digital tourist identification and emergency information</p>
      </motion.div>

      {loading ? (
        <div className="flex justify-center items-center py-12">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-500"></div>
        </div>
      ) : (
        <>
          {error && (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
              {error}
            </div>
          )}

          {successMessage && (
            <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded">
              {successMessage}
            </div>
          )}

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="bg-white p-6 rounded-lg shadow-md"
          >
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-semibold">Tourist Identification Card</h2>
              {isEditing ? (
                <div className="flex space-x-3">
                  <button
                    onClick={handleSave}
                    disabled={loading}
                    className={`px-4 py-2 rounded-md text-white font-medium ${loading ? 'bg-indigo-400' : 'bg-indigo-600 hover:bg-indigo-700'} transition-colors`}
                  >
                    {loading ? (
                      <>
                        <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        Saving...
                      </>
                    ) : 'Save Changes'}
                  </button>
                  <button
                    onClick={handleCancel}
                    className="px-4 py-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300 transition-colors"
                  >
                    Cancel
                  </button>
                </div>
              ) : (
                <button
                  onClick={handleEdit}
                  className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition-colors"
                >
                  Edit Information
                </button>
              )}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <div className="mb-4">
                  <label className="block text-gray-700 text-sm font-bold mb-2">
                    Full Name
                  </label>
                  {isEditing ? (
                    <input
                      type="text"
                      name="name"
                      value={editData.name}
                      onChange={handleInputChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    />
                  ) : (
                    <p className="text-gray-800">{touristData?.name}</p>
                  )}
                </div>

                <div className="mb-4">
                  <label className="block text-gray-700 text-sm font-bold mb-2">
                    Email Address
                  </label>
                  {isEditing ? (
                    <input
                      type="email"
                      name="email"
                      value={editData.email}
                      onChange={handleInputChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    />
                  ) : (
                    <p className="text-gray-800">{touristData?.email}</p>
                  )}
                </div>

                <div className="mb-4">
                  <label className="block text-gray-700 text-sm font-bold mb-2">
                    Phone Number
                  </label>
                  {isEditing ? (
                    <input
                      type="tel"
                      name="phone"
                      value={editData.phone}
                      onChange={handleInputChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    />
                  ) : (
                    <p className="text-gray-800">{touristData?.phone}</p>
                  )}
                </div>

                <div className="mb-4">
                  <label className="block text-gray-700 text-sm font-bold mb-2">
                    Emergency Contact
                  </label>
                  {isEditing ? (
                    <input
                      type="tel"
                      name="emergencyContact"
                      value={editData.emergencyContact}
                      onChange={handleInputChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    />
                  ) : (
                    <p className="text-gray-800">{touristData?.emergencyContact}</p>
                  )}
                </div>
              </div>

              <div>
                <div className="mb-4">
                  <label className="block text-gray-700 text-sm font-bold mb-2">
                    Passport Number
                  </label>
                  {isEditing ? (
                    <input
                      type="text"
                      name="passportNumber"
                      value={editData.passportNumber}
                      onChange={handleInputChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    />
                  ) : (
                    <p className="text-gray-800">{touristData?.passportNumber}</p>
                  )}
                </div>

                <div className="mb-4">
                  <label className="block text-gray-700 text-sm font-bold mb-2">
                    Nationality
                  </label>
                  {isEditing ? (
                    <input
                      type="text"
                      name="nationality"
                      value={editData.nationality}
                      onChange={handleInputChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    />
                  ) : (
                    <p className="text-gray-800">{touristData?.nationality}</p>
                  )}
                </div>

                <div className="mb-4">
                  <label className="block text-gray-700 text-sm font-bold mb-2">
                    Current Address
                  </label>
                  {isEditing ? (
                    <input
                      type="text"
                      name="address"
                      value={editData.address}
                      onChange={handleInputChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    />
                  ) : (
                    <p className="text-gray-800">{touristData?.address}</p>
                  )}
                </div>

                <div className="mb-4">
                  <label className="block text-gray-700 text-sm font-bold mb-2">
                    Card Status
                  </label>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(touristData?.status)}`}>
                    {touristData?.status}
                  </span>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-gray-700 text-sm font-bold mb-2">
                  Registration Date
                </label>
                <p className="text-gray-800">{touristData?.registrationDate}</p>
              </div>

              <div>
                <label className="block text-gray-700 text-sm font-bold mb-2">
                  Last Updated
                </label>
                <p className="text-gray-800">{touristData?.lastUpdated}</p>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="bg-white p-6 rounded-lg shadow-md"
          >
            <h2 className="text-xl font-semibold mb-4">Tourist Card Features</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              <div className="bg-gray-50 p-4 rounded-lg">
                <h3 className="font-semibold text-gray-800">Emergency Identification</h3>
                <p className="text-gray-600 text-sm mt-1">
                  Quick identification in case of emergencies with all your critical information.
                </p>
              </div>

              <div className="bg-gray-50 p-4 rounded-lg">
                <h3 className="font-semibold text-gray-800">Location Tracking</h3>
                <p className="text-gray-600 text-sm mt-1">
                  Your location can be tracked in case of emergencies (with your permission).
                </p>
              </div>

              <div className="bg-gray-50 p-4 rounded-lg">
                <h3 className="font-semibold text-gray-800">Safety Alerts</h3>
                <p className="text-gray-600 text-sm mt-1">
                  Receive safety alerts and warnings based on your location.
                </p>
              </div>

              <div className="bg-gray-50 p-4 rounded-lg">
                <h3 className="font-semibold text-gray-800">Emergency Contacts</h3>
                <p className="text-gray-600 text-sm mt-1">
                  Quick access to emergency contacts including local authorities and your embassy.
                </p>
              </div>

              <div className="bg-gray-50 p-4 rounded-lg">
                <h3 className="font-semibold text-gray-800">Safe Routes</h3>
                <p className="text-gray-600 text-sm mt-1">
                  Access to pre-approved safe routes and areas for tourists.
                </p>
              </div>

              <div className="bg-gray-50 p-4 rounded-lg">
                <h3 className="font-semibold text-gray-800">Language Support</h3>
                <p className="text-gray-600 text-sm mt-1">
                  Access to translation services and common phrases in local languages.
                </p>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="bg-white p-6 rounded-lg shadow-md"
          >
            <h2 className="text-xl font-semibold mb-4">Important Safety Information</h2>
            <div className="space-y-4">
              <div className="flex items-start">
                <svg className="w-5 h-5 text-indigo-500 mt-1 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <div>
                  <h3 className="font-medium">Keep Your Card Accessible</h3>
                  <p className="text-gray-600 mt-1">
                    Always keep your tourist card with you, especially when traveling to new areas.
                  </p>
                </div>
              </div>

              <div className="flex items-start">
                <svg className="w-5 h-5 text-indigo-500 mt-1 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 8h6m-6 4h6m-12 8h.01M4 12h16m-6-4h.01" />
                </svg>
                <div>
                  <h3 className="font-medium">Update Your Information</h3>
                  <p className="text-gray-600 mt-1">
                    Keep your contact information up to date so authorities can reach you in case of emergencies.
                  </p>
                </div>
              </div>

              <div className="flex items-start">
                <svg className="w-5 h-5 text-indigo-500 mt-1 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                </svg>
                <div>
                  <h3 className="font-medium">Emergency Contacts</h3>
                  <p className="text-gray-600 mt-1">
                    Make sure your emergency contact information is accurate and that your contacts know you're traveling.
                  </p>
                </div>
              </div>

              <div className="flex items-start">
                <svg className="w-5 h-5 text-indigo-500 mt-1 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                </svg>
                <div>
                  <h3 className="font-medium">Use Safe Routes</h3>
                  <p className="text-gray-600 mt-1">
                    Always use the safe routes recommended in your app to minimize risks while traveling.
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </div>
  );
};

export default MyTouristCard;