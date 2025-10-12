// import { useState } from 'react'
// import { useAuth } from '../../components/Auth/AuthContext'
// import { 
//   Camera, Upload, CheckCircle, User, Users, Phone, 
//   Mail, Globe, MapPin, Heart, FileText, Plus, X 
// } from 'lucide-react'
// import QRCode from 'qrcode.react'
// import { motion } from 'framer-motion'

// const TouristRegistration = () => {
//   const { user, updateUser } = useAuth()
//   const [step, setStep] = useState(1)
//   const [showQR, setShowQR] = useState(false)
//   const [error, setError] = useState('')
  
//   // Get tourist type from signup (Domestic/International)
//   const touristType = user?.touristType || 'international'

//   // Initial Member Data (PRE-FILL FROM SIGNUP DATA)
//   const initialMember = {
//     id: Date.now(),
//     fullName: user?.name || '',
//     dateOfBirth: '',
//     gender: '',
//     // Pre-fill ID if available from signup
//     [touristType === 'domestic' ? 'aadhaarNumber' : 'passportNumber']: user?.aadhaarNumber || user?.passportNumber || '',
//     emergencyContactName: user?.emergencyContactName || user?.name || '',
//     emergencyContactPhone: user?.emergencyContactPhone || user?.phone || '',
//     emergencyContactRelation: ''
//   }

//   // State for multiple members
//   const [members, setMembers] = useState([initialMember])

//   // Other Form Data (PRE-FILL FROM SIGNUP DATA)
//   const [formData, setFormData] = useState({
//     email: user?.email || '',
//     phone: user?.phone || '',
//     country: user?.country || '',
//     nationality: user?.nationality || user?.country || '',
//     address: '',
//     hotelName: '',
//     hotelAddress: '',
//     checkInDate: '',
//     checkOutDate: '',
//     purposeOfVisit: '',
//     travelInsurance: '',
//     insuranceProvider: '',
//     bloodGroup: '' // Add blood group to common data
//   })

//   // Add New Member
//   const addMember = () => {
//     const newMember = {
//       id: Date.now(),
//       fullName: '',
//       dateOfBirth: '',
//       gender: '',
//       [touristType === 'domestic' ? 'aadhaarNumber' : 'passportNumber']: '',
//       emergencyContactName: user?.emergencyContactName || user?.name || '',
//       emergencyContactPhone: user?.emergencyContactPhone || user?.phone || '',
//       emergencyContactRelation: ''
//     }
//     setMembers([...members, newMember])
//   }

//   // Remove Member
//   const removeMember = (memberId) => {
//     if (members.length > 1) {
//       setMembers(members.filter(member => member.id !== memberId))
//     }
//   }

//   // Handle Member Input Change
//   const handleMemberChange = (memberId, e) => {
//     setMembers(members.map(member => {
//       if (member.id === memberId) {
//         return { ...member, [e.target.name]: e.target.value }
//       }
//       return member
//     }))
//   }

//   // Handle Common Form Change
//   const handleChange = (e) => {
//     setFormData({
//       ...formData,
//       [e.target.name]: e.target.value
//     })
//   }

//   // Validate Unique IDs
//   const validateUniqueIds = () => {
//     const idField = touristType === 'domestic' ? 'aadhaarNumber' : 'passportNumber'
//     const ids = members.map(member => member[idField].trim())
    
//     // Check duplicates
//     const duplicates = ids.filter((id, index) => ids.indexOf(id) !== index && id !== '')
//     if (duplicates.length > 0) {
//       setError(`Duplicate ${touristType === 'domestic' ? 'Aadhaar' : 'Passport'} number found!`)
//       return false
//     }

//     // Check empty IDs
//     const emptyIds = members.filter(member => member[idField].trim() === '')
//     if (emptyIds.length > 0) {
//       setError(`Please fill ${touristType === 'domestic' ? 'Aadhaar' : 'Passport'} number for all members`)
//       return false
//     }
//     return true
//   }

//   const handleNext = () => {
//     setError('')
//     if (step === 3 && !validateUniqueIds()) return
//     if (step < 4) setStep(step + 1)
//     else handleSubmit()
//   }

//   const handlePrevious = () => {
//     if (step > 1) setStep(step - 1)
//   }

//   const handleSubmit = () => {
//     setError('')
//     if (!validateUniqueIds()) return

//     const registrationData = {
//       ...formData,
//       touristId: `TID-2024-${Math.floor(Math.random() * 10000)}`,
//       touristType: touristType,
//       registrationDate: new Date().toISOString(),
//       isRegistered: true,
//       members: members
//     }
    
//     localStorage.setItem('touristData', JSON.stringify(registrationData))
    
//     const allTourists = JSON.parse(localStorage.getItem('allTourists') || '[]')
//     allTourists.push(registrationData)
//     localStorage.setItem('allTourists', JSON.stringify(allTourists))
    
//     updateUser(registrationData)
//     setShowQR(true)
//   }

//   const downloadQR = () => {
//     const canvas = document.getElementById('tourist-qr-code')
//     const pngUrl = canvas.toDataURL("image/png").replace("image/png", "image/octet-stream")
//     let downloadLink = document.createElement("a")
//     downloadLink.href = pngUrl
//     downloadLink.download = `tourist-card-${formData.country}.png`
//     downloadLink.click()
//   }

//   return (
//     <motion.div 
//       initial={{ opacity: 0, y: 20 }}
//       animate={{ opacity: 1, y: 0 }}
//       transition={{ duration: 0.5 }}
//       className="max-w-4xl mx-auto"
//     >
//       <div className="card">
//         <motion.h2 
//           initial={{ scale: 0.9 }}
//           animate={{ scale: 1 }}
//           className="text-3xl font-bold text-gray-900 mb-2"
//         >
//           Complete Your Registration
//         </motion.h2>
//         <p className="text-gray-600">
//           Some details are pre-filled from your signup. Fill remaining fields to get your Smart Tourist Card
//         </p>

//         {/* Progress Steps */}
//         <div className="mb-8">
//           <div className="flex items-center justify-between">
//             {[1, 2, 3, 4].map((s) => (
//               <div key={s} className="flex-1 flex items-center">
//                 <motion.div 
//                   animate={{ scale: step >= s ? 1.1 : 1 }}
//                   className={`h-10 w-10 rounded-full flex items-center justify-center font-bold ${
//                     step >= s ? 'bg-primary-600 text-white' : 'bg-gray-200 text-gray-600'
//                   }`}
//                 >
//                   {s}
//                 </motion.div>
//                 {s < 4 && (
//                   <div className={`flex-1 h-1 mx-2 ${
//                     step > s ? 'bg-primary-600' : 'bg-gray-200'
//                   }`}></div>
//                 )}
//               </div>
//             ))}
//           </div>
//           <div className="flex justify-between mt-2">
//             <span className="text-xs font-medium">Personal Info</span>
//             <span className="text-xs font-medium">Group Members</span>
//             <span className="text-xs font-medium">Stay Details</span>
//             <span className="text-xs font-medium">Medical Info</span>
//           </div>
//         </div>

//         {error && (
//           <div className="mb-4 p-3 bg-danger-50 border border-danger-200 rounded-lg flex items-center text-danger-700">
//             <X className="h-5 w-5 mr-2" />
//             {error}
//           </div>
//         )}

//         <form className="space-y-6">
//           {/* Step 1: Personal Info */}
//           {step === 1 && (
//             <motion.div 
//               initial={{ x: -50, opacity: 0 }}
//               animate={{ x: 0, opacity: 1 }}
//               transition={{ duration: 0.3 }}
//               className="space-y-4"
//             >
//               <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
//                 <User className="h-6 w-6 mr-2 text-primary-600" />
//                 Personal & Contact Information
//               </h3>
              
//               <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                 <div>
//                   <label className="block text-sm font-semibold text-gray-700 mb-2">
//                     Primary Contact Email *
//                   </label>
//                   <input
//                     type="email"
//                     name="email"
//                     required
//                     className="input-field"
//                     value={formData.email}
//                     onChange={handleChange}
//                   />
//                 </div>

//                 <div>
//                   <label className="block text-sm font-semibold text-gray-700 mb-2">
//                     Primary Contact Phone *
//                   </label>
//                   <input
//                     type="tel"
//                     name="phone"
//                     required
//                     className="input-field"
//                     value={formData.phone}
//                     onChange={handleChange}
//                   />
//                 </div>

//                 <div>
//                   <label className="block text-sm font-semibold text-gray-700 mb-2">
//                     Country *
//                   </label>
//                   <input
//                     type="text"
//                     name="country"
//                     required
//                     className="input-field"
//                     value={formData.country}
//                     onChange={handleChange}
//                   />
//                 </div>

//                 <div>
//                   <label className="block text-sm font-semibold text-gray-700 mb-2">
//                     Nationality *
//                   </label>
//                   <input
//                     type="text"
//                     name="nationality"
//                     required
//                     className="input-field"
//                     value={formData.nationality}
//                     onChange={handleChange}
//                   />
//                 </div>

//                 <div className="md:col-span-2">
//                   <label className="block text-sm font-semibold text-gray-700 mb-2">
//                     Home Address
//                   </label>
//                   <textarea
//                     name="address"
//                     className="input-field"
//                     rows="3"
//                     value={formData.address}
//                     onChange={handleChange}
//                   ></textarea>
//                 </div>
//               </div>
//             </motion.div>
//           )}

//           {/* Step 2: Group Members */}
//           {step === 2 && (
//             <motion.div 
//               initial={{ x: -50, opacity: 0 }}
//               animate={{ x: 0, opacity: 1 }}
//               transition={{ duration: 0.3 }}
//               className="space-y-4"
//             >
//               <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
//                 <Users className="h-6 w-6 mr-2 text-primary-600" />
//                 Group Members ({members.length})
//               </h3>
              
//               <div className="grid grid-cols-1 gap-4">
//                 {members.map((member, index) => (
//                   <motion.div 
//                     key={member.id}
//                     initial={{ opacity: 0, y: 20 }}
//                     animate={{ opacity: 1, y: 0 }}
//                     transition={{ delay: index * 0.1 }}
//                     className="border border-gray-200 rounded-lg p-5 hover:shadow-md"
//                   >
//                     <div className="flex items-center justify-between mb-3">
//                       <h4 className="font-bold text-lg">
//                         Member {index + 1}
//                       </h4>
//                       {members.length > 1 && (
//                         <button
//                           type="button"
//                           onClick={() => removeMember(member.id)}
//                           className="text-danger-600 hover:bg-danger-50 p-2 rounded-lg"
//                         >
//                           <X className="h-5 w-5" />
//                         </button>
//                       )}
//                     </div>

//                     <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                       <div>
//                         <label className="block text-sm font-semibold text-gray-700 mb-2">
//                           Full Name *
//                         </label>
//                         <input
//                           type="text"
//                           name="fullName"
//                           required
//                           className="input-field"
//                           value={member.fullName}
//                           onChange={(e) => handleMemberChange(member.id, e)}
//                         />
//                       </div>

//                       <div>
//                         <label className="block text-sm font-semibold text-gray-700 mb-2">
//                           Date of Birth *
//                         </label>
//                         <input
//                           type="date"
//                           name="dateOfBirth"
//                           required
//                           className="input-field"
//                           value={member.dateOfBirth}
//                           onChange={(e) => handleMemberChange(member.id, e)}
//                         />
//                       </div>

//                       <div>
//                         <label className="block text-sm font-semibold text-gray-700 mb-2">
//                           Gender *
//                         </label>
//                         <select
//                           name="gender"
//                           required
//                           className="input-field"
//                           value={member.gender}
//                           onChange={(e) => handleMemberChange(member.id, e)}
//                         >
//                           <option value="">Select Gender</option>
//                           <option value="Male">Male</option>
//                           <option value="Female">Female</option>
//                           <option value="Other">Other</option>
//                         </select>
//                       </div>

//                       {/* Conditional ID Field */}
//                       <div>
//                         <label className="block text-sm font-semibold text-gray-700 mb-2">
//                           {touristType === 'domestic' ? 'Aadhaar Number *' : 'Passport Number *'}
//                         </label>
//                         <input
//                           type={touristType === 'domestic' ? 'number' : 'text'}
//                           name={touristType === 'domestic' ? 'aadhaarNumber' : 'passportNumber'}
//                           required
//                           maxLength={touristType === 'domestic' ? 12 : 20}
//                           className="input-field"
//                           value={member[touristType === 'domestic' ? 'aadhaarNumber' : 'passportNumber']}
//                           onChange={(e) => handleMemberChange(member.id, e)}
//                           placeholder={touristType === 'domestic' ? '12-digit Aadhaar' : 'Passport Number'}
//                         />
//                       </div>

//                       <div>
//                         <label className="block text-sm font-semibold text-gray-700 mb-2">
//                           Emergency Contact Name *
//                         </label>
//                         <input
//                           type="text"
//                           name="emergencyContactName"
//                           required
//                           className="input-field"
//                           value={member.emergencyContactName}
//                           onChange={(e) => handleMemberChange(member.id, e)}
//                         />
//                       </div>

//                       <div>
//                         <label className="block text-sm font-semibold text-gray-700 mb-2">
//                           Emergency Contact Phone *
//                         </label>
//                         <input
//                           type="tel"
//                           name="emergencyContactPhone"
//                           required
//                           className="input-field"
//                           value={member.emergencyContactPhone}
//                           onChange={(e) => handleMemberChange(member.id, e)}
//                         />
//                       </div>

//                       <div>
//                         <label className="block text-sm font-semibold text-gray-700 mb-2">
//                           Relation to Emergency Contact *
//                         </label>
//                         <select
//                           name="emergencyContactRelation"
//                           required
//                           className="input-field"
//                           value={member.emergencyContactRelation}
//                           onChange={(e) => handleMemberChange(member.id, e)}
//                         >
//                           <option value="">Select Relation</option>
//                           <option value="Spouse">Spouse</option>
//                           <option value="Parent">Parent</option>
//                           <option value="Sibling">Sibling</option>
//                           <option value="Friend">Friend</option>
//                           <option value="Other">Other</option>
//                         </select>
//                       </div>
//                     </div>
//                   </motion.div>
//                 ))}
//               </div>

//               <motion.button
//                 whileHover={{ scale: 1.05 }}
//                 type="button"
//                 onClick={addMember}
//                 className="w-full bg-success-600 text-white py-3 rounded-lg hover:bg-success-700 font-semibold"
//               >
//                 <Plus className="inline h-5 w-5 mr-2" />
//                 Add New Member
//               </motion.button>
//             </motion.div>
//           )}

//           {/* Step 3: Stay Details */}
//           {step === 3 && (
//             <motion.div 
//               initial={{ x: -50, opacity: 0 }}
//               animate={{ x: 0, opacity: 1 }}
//               transition={{ duration: 0.3 }}
//               className="space-y-4"
//             >
//               <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
//                 <MapPin className="h-6 w-6 mr-2 text-primary-600" />
//                 Stay & Travel Details
//               </h3>
              
//               <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                 <div>
//                   <label className="block text-sm font-semibold text-gray-700 mb-2">
//                     Hotel/Accommodation Name *
//                   </label>
//                   <input
//                     type="text"
//                     name="hotelName"
//                     required
//                     className="input-field"
//                     value={formData.hotelName}
//                     onChange={handleChange}
//                   />
//                 </div>

//                 <div>
//                   <label className="block text-sm font-semibold text-gray-700 mb-2">
//                     Hotel Address *
//                   </label>
//                   <input
//                     type="text"
//                     name="hotelAddress"
//                     required
//                     className="input-field"
//                     value={formData.hotelAddress}
//                     onChange={handleChange}
//                   />
//                 </div>

//                 <div>
//                   <label className="block text-sm font-semibold text-gray-700 mb-2">
//                     Check-in Date *
//                   </label>
//                   <input
//                     type="date"
//                     name="checkInDate"
//                     required
//                     className="input-field"
//                     value={formData.checkInDate}
//                     onChange={handleChange}
//                   />
//                 </div>

//                 <div>
//                   <label className="block text-sm font-semibold text-gray-700 mb-2">
//                     Check-out Date *
//                   </label>
//                   <input
//                     type="date"
//                     name="checkOutDate"
//                     required
//                     className="input-field"
//                     value={formData.checkOutDate}
//                     onChange={handleChange}
//                   />
//                 </div>

//                 <div className="md:col-span-2">
//                   <label className="block text-sm font-semibold text-gray-700 mb-2">
//                     Purpose of Visit *
//                   </label>
//                   <select
//                     name="purposeOfVisit"
//                     required
//                     className="input-field"
//                     value={formData.purposeOfVisit}
//                     onChange={handleChange}
//                   >
//                     <option value="">Select Purpose</option>
//                     <option value="Tourism">Tourism</option>
//                     <option value="Business">Business</option>
//                     <option value="Education">Education</option>
//                     <option value="Medical">Medical</option>
//                     <option value="Other">Other</option>
//                   </select>
//                 </div>

//                 <div>
//                   <label className="block text-sm font-semibold text-gray-700 mb-2">
//                     Travel Insurance Number
//                   </label>
//                   <input
//                     type="text"
//                     name="travelInsurance"
//                     className="input-field"
//                     value={formData.travelInsurance}
//                     onChange={handleChange}
//                   />
//                 </div>

//                 <div>
//                   <label className="block text-sm font-semibold text-gray-700 mb-2">
//                     Insurance Provider
//                   </label>
//                   <input
//                     type="text"
//                     name="insuranceProvider"
//                     className="input-field"
//                     value={formData.insuranceProvider}
//                     onChange={handleChange}
//                   />
//                 </div>
//               </div>
//             </motion.div>
//           )}

//           {/* Step 4: Medical Info */}
//           {step === 4 && (
//             <motion.div 
//               initial={{ x: -50, opacity: 0 }}
//               animate={{ x: 0, opacity: 1 }}
//               transition={{ duration: 0.3 }}
//               className="space-y-4"
//             >
//               <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
//                 <Heart className="h-6 w-6 mr-2 text-danger-600" />
//                 Medical Information
//               </h3>
              
//               <div className="bg-danger-50 border border-danger-200 rounded-lg p-4 mb-4">
//                 <p className="text-sm text-danger-900">
//                   This information is crucial for emergency medical assistance. All data is encrypted and secure.
//                 </p>
//               </div>

//               <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                 <div>
//                   <label className="block text-sm font-semibold text-gray-700 mb-2">
//                     Blood Group *
//                   </label>
//                   <select
//                     name="bloodGroup"
//                     required
//                     className="input-field"
//                     value={formData.bloodGroup}
//                     onChange={handleChange}
//                   >
//                     <option value="">Select Blood Group</option>
//                     <option value="A+">A+</option>
//                     <option value="A-">A-</option>
//                     <option value="B+">B+</option>
//                     <option value="B-">B-</option>
//                     <option value="O+">O+</option>
//                     <option value="O-">O-</option>
//                     <option value="AB+">AB+</option>
//                     <option value="AB-">AB-</option>
//                   </select>
//                 </div>

//                 <div className="md:col-span-2">
//                   <label className="block text-sm font-semibold text-gray-700 mb-2">
//                     Medical Conditions (if any)
//                   </label>
//                   <textarea
//                     name="medicalConditions"
//                     className="input-field"
//                     rows="3"
//                     placeholder="Diabetes, Heart condition, etc."
//                     onChange={handleChange}
//                   ></textarea>
//                 </div>

//                 <div className="md:col-span-2">
//                   <label className="block text-sm font-semibold text-gray-700 mb-2">
//                     Allergies (if any)
//                   </label>
//                   <textarea
//                     name="allergies"
//                     className="input-field"
//                     rows="3"
//                     placeholder="Food allergies, Medicine allergies, etc."
//                     onChange={handleChange}
//                   ></textarea>
//                 </div>
//               </div>

//               <div className="bg-primary-50 border border-primary-200 rounded-lg p-4 mt-6">
//                 <div className="flex items-start gap-3">
//                   <input type="checkbox" required className="mt-1" />
//                   <p className="text-sm text-primary-900">
//                     I confirm that all the information provided is accurate and true. I understand that this information 
//                     will be used for safety and emergency purposes only. I agree to the terms and conditions of the 
//                     Tourist Safety System.
//                   </p>
//                 </div>
//               </div>
//             </motion.div>
//           )}

//           {/* Navigation Buttons */}
//           <div className="flex gap-4 pt-6 border-t border-gray-200">
//             {step > 1 && (
//               <motion.button
//                 whileHover={{ scale: 1.05 }}
//                 whileTap={{ scale: 0.95 }}
//                 type="button"
//                 onClick={handlePrevious}
//                 className="flex-1 bg-gray-600 text-white px-6 py-3 rounded-lg hover:bg-gray-700 font-semibold"
//               >
//                 Previous
//               </motion.button>
//             )}
//             <motion.button
//               whileHover={{ scale: 1.05 }}
//               whileTap={{ scale: 0.95 }}
//               type="button"
//               onClick={handleNext}
//               className="flex-1 btn-primary"
//             >
//               {step === 4 ? 'Complete Registration' : 'Next'}
//             </motion.button>
//           </div>
//         </form>
//       </div>

//       {/* QR Code Modal */}
//       {showQR && (
//         <motion.div 
//           initial={{ opacity: 0, scale: 0.9 }}
//           animate={{ opacity: 1, scale: 1 }}
//           transition={{ duration: 0.5 }}
//           className="max-w-4xl mx-auto"
//         >
//           <div className="card text-center">
//             <div className="inline-block p-4 bg-success-100 rounded-full mb-4">
//               <CheckCircle className="h-16 w-16 text-success-600" />
//             </div>
//             <h2 className="text-3xl font-bold text-gray-900 mb-2">Registration Successful! 🎉</h2>
//             <p className="text-gray-600">Your Smart Tourist Card has been generated</p>

//             <div className="bg-gradient-to-br from-primary-600 to-primary-800 rounded-2xl p-8 text-white mb-6 shadow-2xl max-w-2xl mx-auto">
//               <div className="flex items-start justify-between mb-6">
//                 <div>
//                   <p className="text-primary-200 text-sm mb-1">India Tourism • Ministry of Tourism</p>
//                   <h3 className="text-3xl font-bold">Smart Tourist Card</h3>
//                   <p className="text-primary-200 text-sm mt-1">Valid Till: {formData.checkOutDate}</p>
//                 </div>
//                 <div className="bg-white p-4 rounded-lg shadow-md">
//                   <QRCode 
//                     id="tourist-qr-code"
//                     value={JSON.stringify({
//                       touristId: `TID-2024-${Math.floor(Math.random() * 10000)}`,
//                       groupSize: members.length,
//                       members: members,
//                       ...formData
//                     })}
//                     size={150}
//                     level="H"
//                     includeMargin={true}
//                   />
//                 </div>
//               </div>

//               {/* Show Single Member Card (as per your image) */}
//               {members.length === 1 && (
//                 <div className="flex gap-6 mb-6">
//                   <div className="h-36 w-36 bg-white rounded-xl flex items-center justify-center text-7xl">
//                     👤
//                   </div>
//                   <div className="flex-1 text-left">
//                     <h4 className="text-3xl font-bold mb-3">{members[0].fullName}</h4>
//                     <div className="space-y-2">
//                       <div className="flex items-center gap-2 bg-white/10 backdrop-blur rounded-lg px-3 py-2">
//                         <span className="text-primary-200 text-sm font-medium">Tourist ID:</span>
//                         <span className="font-semibold">TID-2024-{Math.floor(Math.random() * 10000)}</span>
//                       </div>
//                       {/* Show Aadhaar/Passport based on tourist type */}
//                       <div className="flex items-center gap-2 bg-white/10 backdrop-blur rounded-lg px-3 py-2">
//                         <span className="text-primary-200 text-sm font-medium">
//                           {touristType === 'domestic' ? 'Aadhaar:' : 'Passport:'}
//                         </span>
//                         <span className="font-semibold">
//                           {members[0][touristType === 'domestic' ? 'aadhaarNumber' : 'passportNumber']}
//                         </span>
//                       </div>
//                       <div className="flex items-center gap-2 bg-white/10 backdrop-blur rounded-lg px-3 py-2">
//                         <span className="text-primary-200 text-sm font-medium">Country:</span>
//                         <span className="font-semibold">{formData.country}</span>
//                       </div>
//                     </div>
//                   </div>
//                 </div>
//               )}

//               {/* Show Group Card if multiple members */}
//               {members.length > 1 && (
//                 <div className="flex gap-6 mb-6">
//                   <div className="h-36 w-36 bg-white rounded-xl flex items-center justify-center text-7xl">
//                     👥
//                   </div>
//                   <div className="flex-1 text-left">
//                     <h4 className="text-3xl font-bold mb-3">Group Details</h4>
//                     <div className="space-y-2">
//                       <div className="flex items-center gap-2 bg-white/10 backdrop-blur rounded-lg px-3 py-2">
//                         <span className="text-primary-200 text-sm font-medium">Primary Contact:</span>
//                         <span className="font-semibold">{members[0].fullName}</span>
//                       </div>
//                       <div className="flex items-center gap-2 bg-white/10 backdrop-blur rounded-lg px-3 py-2">
//                         <span className="text-primary-200 text-sm font-medium">Group Size:</span>
//                         <span className="font-semibold">{members.length} Member(s)</span>
//                       </div>
//                       <div className="flex items-center gap-2 bg-white/10 backdrop-blur rounded-lg px-3 py-2">
//                         <span className="text-primary-200 text-sm font-medium">Country:</span>
//                         <span className="font-semibold">{formData.country}</span>
//                       </div>
//                     </div>
//                   </div>
//                 </div>
//               )}

//               {/* Common Details for All Cards */}
//               <div className="grid grid-cols-3 gap-4 mb-4">
//                 <div className="bg-white/10 backdrop-blur rounded-lg p-3 text-center">
//                   <p className="text-primary-200 text-xs mb-1">Gender</p>
//                   <p className="font-semibold">{members[0].gender || 'Not specified'}</p>
//                 </div>
//                 <div className="bg-white/10 backdrop-blur rounded-lg p-3 text-center">
//                   <p className="text-primary-200 text-xs mb-1">Blood Group</p>
//                   <p className="font-semibold">{formData.bloodGroup || 'Not specified'}</p>
//                 </div>
//                 <div className="bg-white/10 backdrop-blur rounded-lg p-3 text-center">
//                   <p className="text-primary-200 text-xs mb-1">Valid Till</p>
//                   <p className="font-semibold">{formData.checkOutDate}</p>
//                 </div>
//               </div>

//               {/* Emergency Contact (FIXed: now shows number) */}
//               <div className="bg-danger-500 rounded-lg p-4 mb-4">
//                 <p className="text-success-100 text-xs mb-1 font-medium">EMERGENCY CONTACT</p>
//                 <div className="flex items-center justify-between">
//                   <div>
//                     <p className="font-semibold text-lg">{members[0].emergencyContactName}</p>
//                     <p className="text-success-100 text-sm">{members[0].emergencyContactRelation}</p>
//                   </div>
//                   <p className="font-mono font-bold text-xl">{members[0].emergencyContactPhone}</p>
//                 </div>
//               </div>

//               <div className="flex items-center justify-center gap-2 bg-success-500 text-white px-4 py-3 rounded-lg font-bold shadow-lg">
//                 <CheckCircle className="h-6 w-6" />
//                 VERIFIED TOURIST - ACTIVE STATUS
//               </div>
//             </div>

//             <div className="space-y-4">
//               <div className="flex gap-4 justify-center">
//                 <motion.button 
//                   whileHover={{ scale: 1.05 }}
//                   onClick={downloadQR} 
//                   className="btn-primary"
//                 >
//                   <Upload className="inline h-5 w-5 mr-2" />
//                   Download Tourist Card
//                 </motion.button>
//                 <motion.button 
//                   whileHover={{ scale: 1.05 }}
//                   onClick={() => window.location.href = '/tourist/my-card'}
//                   className="bg-purple-600 text-white px-6 py-3 rounded-lg hover:bg-purple-700 font-semibold"
//                 >
//                   <Mail className="inline h-5 w-5 mr-2" />
//                   View Full Card
//                 </motion.button>
//               </div>
              
//               <div className="bg-primary-50 border border-primary-200 rounded-lg p-4">
//                 <p className="text-sm text-primary-900">
//                   <strong>Important:</strong> Save this QR code! Show it at tourist spots, hotel, and in case of emergencies.
//                   Your Tourist ID: <span className="font-mono font-bold">TID-2024-{Math.floor(Math.random() * 10000)}</span>
//                 </p>
//               </div>
//             </div>
//           </div>
//         </motion.div>
//       )}
//     </motion.div>
//   )
// }

// export default TouristRegistration

import { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

const Registration = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    passportNumber: '',
    nationality: '',
    arrivalDate: '',
    departureDate: '',
    accommodation: '',
    emergencyContact: '',
    emergencyContactRelation: '',
    medicalConditions: '',
    dietaryRestrictions: '',
    termsAccepted: false
  });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.firstName.trim()) newErrors.firstName = 'First name is required';
    if (!formData.lastName.trim()) newErrors.lastName = 'Last name is required';
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email';
    }
    if (!formData.phone.trim()) newErrors.phone = 'Phone number is required';
    if (!formData.passportNumber.trim()) newErrors.passportNumber = 'Passport number is required';
    if (!formData.nationality.trim()) newErrors.nationality = 'Nationality is required';
    if (!formData.arrivalDate) newErrors.arrivalDate = 'Arrival date is required';
    if (!formData.departureDate) newErrors.departureDate = 'Departure date is required';
    if (!formData.accommodation.trim()) newErrors.accommodation = 'Accommodation details are required';
    if (!formData.emergencyContact.trim()) newErrors.emergencyContact = 'Emergency contact is required';
    if (!formData.emergencyContactRelation.trim()) newErrors.emergencyContactRelation = 'Relationship is required';
    if (!formData.termsAccepted) newErrors.termsAccepted = 'You must accept the terms and conditions';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);
    setSuccessMessage('');

    try {
      // Simulate API call to register tourist
      await new Promise(resolve => setTimeout(resolve, 2000));

      // In a real app, you would send the form data to your backend
      console.log('Tourist registration data:', formData);

      // Show success message
      setSuccessMessage('Registration successful! Your tourist card has been created.');

      // Redirect to tourist dashboard after a delay
      setTimeout(() => {
        navigate('/tourist/dashboard');
      }, 3000);
    } catch (error) {
      console.error('Registration error:', error);
      setErrors(prev => ({
        ...prev,
        form: 'An error occurred during registration. Please try again.'
      }));
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="space-y-6">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="text-3xl font-bold text-gray-800">Tourist Registration</h1>
        <p className="text-gray-600">Complete your registration to access all tourist safety features</p>
      </motion.div>

      {successMessage ? (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded"
        >
          {successMessage}
        </motion.div>
      ) : (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="bg-white p-6 rounded-lg shadow-md"
        >
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="firstName" className="block text-gray-700 text-sm font-bold mb-2">
                  First Name
                </label>
                <input
                  type="text"
                  id="firstName"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleChange}
                  className={`w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 ${errors.firstName ? 'border-red-400 focus:ring-red-200' : 'border-gray-300 focus:ring-indigo-500'}`}
                />
                {errors.firstName && <p className="mt-1 text-sm text-red-600">{errors.firstName}</p>}
              </div>

              <div>
                <label htmlFor="lastName" className="block text-gray-700 text-sm font-bold mb-2">
                  Last Name
                </label>
                <input
                  type="text"
                  id="lastName"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleChange}
                  className={`w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 ${errors.lastName ? 'border-red-400 focus:ring-red-200' : 'border-gray-300 focus:ring-indigo-500'}`}
                />
                {errors.lastName && <p className="mt-1 text-sm text-red-600">{errors.lastName}</p>}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="email" className="block text-gray-700 text-sm font-bold mb-2">
                  Email Address
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className={`w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 ${errors.email ? 'border-red-400 focus:ring-red-200' : 'border-gray-300 focus:ring-indigo-500'}`}
                />
                {errors.email && <p className="mt-1 text-sm text-red-600">{errors.email}</p>}
              </div>

              <div>
                <label htmlFor="phone" className="block text-gray-700 text-sm font-bold mb-2">
                  Phone Number
                </label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  className={`w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 ${errors.phone ? 'border-red-400 focus:ring-red-200' : 'border-gray-300 focus:ring-indigo-500'}`}
                />
                {errors.phone && <p className="mt-1 text-sm text-red-600">{errors.phone}</p>}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="passportNumber" className="block text-gray-700 text-sm font-bold mb-2">
                  Passport Number
                </label>
                <input
                  type="text"
                  id="passportNumber"
                  name="passportNumber"
                  value={formData.passportNumber}
                  onChange={handleChange}
                  className={`w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 ${errors.passportNumber ? 'border-red-400 focus:ring-red-200' : 'border-gray-300 focus:ring-indigo-500'}`}
                />
                {errors.passportNumber && <p className="mt-1 text-sm text-red-600">{errors.passportNumber}</p>}
              </div>

              <div>
                <label htmlFor="nationality" className="block text-gray-700 text-sm font-bold mb-2">
                  Nationality
                </label>
                <input
                  type="text"
                  id="nationality"
                  name="nationality"
                  value={formData.nationality}
                  onChange={handleChange}
                  className={`w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 ${errors.nationality ? 'border-red-400 focus:ring-red-200' : 'border-gray-300 focus:ring-indigo-500'}`}
                />
                {errors.nationality && <p className="mt-1 text-sm text-red-600">{errors.nationality}</p>}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="arrivalDate" className="block text-gray-700 text-sm font-bold mb-2">
                  Arrival Date
                </label>
                <input
                  type="date"
                  id="arrivalDate"
                  name="arrivalDate"
                  value={formData.arrivalDate}
                  onChange={handleChange}
                  className={`w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 ${errors.arrivalDate ? 'border-red-400 focus:ring-red-200' : 'border-gray-300 focus:ring-indigo-500'}`}
                />
                {errors.arrivalDate && <p className="mt-1 text-sm text-red-600">{errors.arrivalDate}</p>}
              </div>

              <div>
                <label htmlFor="departureDate" className="block text-gray-700 text-sm font-bold mb-2">
                  Departure Date
                </label>
                <input
                  type="date"
                  id="departureDate"
                  name="departureDate"
                  value={formData.departureDate}
                  onChange={handleChange}
                  className={`w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 ${errors.departureDate ? 'border-red-400 focus:ring-red-200' : 'border-gray-300 focus:ring-indigo-500'}`}
                />
                {errors.departureDate && <p className="mt-1 text-sm text-red-600">{errors.departureDate}</p>}
              </div>
            </div>

            <div>
              <label htmlFor="accommodation" className="block text-gray-700 text-sm font-bold mb-2">
                Accommodation Details
              </label>
              <input
                type="text"
                id="accommodation"
                name="accommodation"
                value={formData.accommodation}
                onChange={handleChange}
                className={`w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 ${errors.accommodation ? 'border-red-400 focus:ring-red-200' : 'border-gray-300 focus:ring-indigo-500'}`}
                placeholder="Hotel name and address"
              />
              {errors.accommodation && <p className="mt-1 text-sm text-red-600">{errors.accommodation}</p>}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="emergencyContact" className="block text-gray-700 text-sm font-bold mb-2">
                  Emergency Contact Name
                </label>
                <input
                  type="text"
                  id="emergencyContact"
                  name="emergencyContact"
                  value={formData.emergencyContact}
                  onChange={handleChange}
                  className={`w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 ${errors.emergencyContact ? 'border-red-400 focus:ring-red-200' : 'border-gray-300 focus:ring-indigo-500'}`}
                />
                {errors.emergencyContact && <p className="mt-1 text-sm text-red-600">{errors.emergencyContact}</p>}
              </div>

              <div>
                <label htmlFor="emergencyContactRelation" className="block text-gray-700 text-sm font-bold mb-2">
                  Relationship
                </label>
                <input
                  type="text"
                  id="emergencyContactRelation"
                  name="emergencyContactRelation"
                  value={formData.emergencyContactRelation}
                  onChange={handleChange}
                  className={`w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 ${errors.emergencyContactRelation ? 'border-red-400 focus:ring-red-200' : 'border-gray-300 focus:ring-indigo-500'}`}
                  placeholder="e.g., Spouse, Parent, Friend"
                />
                {errors.emergencyContactRelation && <p className="mt-1 text-sm text-red-600">{errors.emergencyContactRelation}</p>}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="medicalConditions" className="block text-gray-700 text-sm font-bold mb-2">
                  Medical Conditions (if any)
                </label>
                <textarea
                  id="medicalConditions"
                  name="medicalConditions"
                  value={formData.medicalConditions}
                  onChange={handleChange}
                  rows="3"
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  placeholder="Any medical conditions we should be aware of"
                ></textarea>
              </div>

              <div>
                <label htmlFor="dietaryRestrictions" className="block text-gray-700 text-sm font-bold mb-2">
                  Dietary Restrictions
                </label>
                <textarea
                  id="dietaryRestrictions"
                  name="dietaryRestrictions"
                  value={formData.dietaryRestrictions}
                  onChange={handleChange}
                  rows="3"
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  placeholder="Any dietary restrictions or allergies"
                ></textarea>
              </div>
            </div>

            <div className="flex items-start">
              <div className="flex items-center h-5">
                <input
                  id="termsAccepted"
                  name="termsAccepted"
                  type="checkbox"
                  checked={formData.termsAccepted}
                  onChange={handleChange}
                  className={`w-4 h-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded ${errors.termsAccepted ? 'border-red-400' : 'border-gray-300'}`}
                />
              </div>
              <div className="ml-3 text-sm">
                <label htmlFor="termsAccepted" className="font-medium text-gray-700">
                  I agree to the <a href="#" className="text-indigo-600 hover:underline">Terms and Conditions</a> and <a href="#" className="text-indigo-600 hover:underline">Privacy Policy</a>
                </label>
                {errors.termsAccepted && <p className="mt-1 text-sm text-red-600">{errors.termsAccepted}</p>}
              </div>
            </div>

            {errors.form && <p className="mt-1 text-sm text-red-600">{errors.form}</p>}

            <div className="pt-4 border-t border-gray-200">
              <button
                type="submit"
                disabled={isSubmitting}
                className={`w-full py-3 px-4 rounded-md text-white font-medium ${isSubmitting ? 'bg-indigo-400' : 'bg-indigo-600 hover:bg-indigo-700'} transition-colors`}
              >
                {isSubmitting ? (
                  <>
                    <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Registering...
                  </>
                ) : 'Complete Registration'}
              </button>
            </div>
          </form>
        </motion.div>
      )}

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="bg-white p-6 rounded-lg shadow-md"
      >
        <h2 className="text-xl font-semibold mb-4">Why Register?</h2>
        <div className="space-y-4">
          <div className="flex items-start">
            <svg className="w-5 h-5 text-indigo-500 mt-1 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <div>
              <h3 className="font-medium">Emergency Identification</h3>
              <p className="text-gray-600 mt-1">
                Quick identification in case of emergencies with all your critical information.
              </p>
            </div>
          </div>

          <div className="flex items-start">
            <svg className="w-5 h-5 text-indigo-500 mt-1 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 8h6m-6 4h6m-12 8h.01M4 12h16m-6-4h.01" />
            </svg>
            <div>
              <h3 className="font-medium">Location Tracking</h3>
              <p className="text-gray-600 mt-1">
                Your location can be tracked in case of emergencies (with your permission).
              </p>
            </div>
          </div>

          <div className="flex items-start">
            <svg className="w-5 h-5 text-indigo-500 mt-1 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
            <div>
              <h3 className="font-medium">Safety Alerts</h3>
              <p className="text-gray-600 mt-1">
                Receive safety alerts and warnings based on your location.
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
                Quick access to emergency contacts including local authorities and your embassy.
              </p>
            </div>
          </div>

          <div className="flex items-start">
            <svg className="w-5 h-5 text-indigo-500 mt-1 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
            <div>
              <h3 className="font-medium">Safe Routes</h3>
              <p className="text-gray-600 mt-1">
                Access to pre-approved safe routes and areas for tourists.
              </p>
            </div>
          </div>

          <div className="flex items-start">
            <svg className="w-5 h-5 text-indigo-500 mt-1 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
            <div>
              <h3 className="font-medium">Language Support</h3>
              <p className="text-gray-600 mt-1">
                Access to translation services and common phrases in local languages.
              </p>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default Registration;