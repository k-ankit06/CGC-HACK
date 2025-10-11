import { useState } from 'react'
import { useAuth } from '../../components/Auth/AuthContext'
import { Camera, Upload, CheckCircle, User, Phone, Mail, Globe, MapPin, Heart, FileText } from 'lucide-react'
import QRCode from 'qrcode.react'
import { motion } from 'framer-motion'

const TouristRegistration = () => {
  const { user, updateUser } = useAuth()
  const [step, setStep] = useState(1)
  const [showQR, setShowQR] = useState(false)
  const [formData, setFormData] = useState({
    fullName: user?.name || '',
    email: user?.email || '',
    phone: user?.phone || '',
    country: user?.country || '',
    passportNumber: user?.passportNumber || '',
    dateOfBirth: '',
    gender: '',
    nationality: '',
    address: '',
    emergencyContactName: '',
    emergencyContactPhone: user?.emergencyContact || '',
    emergencyContactRelation: '',
    hotelName: '',
    hotelAddress: '',
    checkInDate: '',
    checkOutDate: '',
    purposeOfVisit: '',
    bloodGroup: '',
    medicalConditions: '',
    allergies: '',
    travelInsurance: '',
    insuranceProvider: ''
  })

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const handleNext = () => {
    if (step < 4) {
      setStep(step + 1)
    } else {
      handleSubmit()
    }
  }

  const handlePrevious = () => {
    if (step > 1) setStep(step - 1)
  }

  const handleSubmit = () => {
    const registrationData = {
      ...formData,
      touristId: `TID-2024-${Math.floor(Math.random() * 10000)}`,
      registrationDate: new Date().toISOString(),
      isRegistered: true
    }
    
    localStorage.setItem('touristData', JSON.stringify(registrationData))
    
    const allTourists = JSON.parse(localStorage.getItem('allTourists') || '[]')
    allTourists.push(registrationData)
    localStorage.setItem('allTourists', JSON.stringify(allTourists))
    
    updateUser(registrationData)
    setShowQR(true)
  }

  const downloadQR = () => {
    const canvas = document.getElementById('tourist-qr-code')
    const pngUrl = canvas.toDataURL("image/png").replace("image/png", "image/octet-stream")
    let downloadLink = document.createElement("a")
    downloadLink.href = pngUrl
    downloadLink.download = `tourist-card-${formData.passportNumber}.png`
    downloadLink.click()
  }

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="max-w-4xl mx-auto"
    >
      <div className="card">
        <motion.h2 
          initial={{ scale: 0.9 }}
          animate={{ scale: 1 }}
          className="text-3xl font-bold text-gray-900 mb-2"
        >
          Tourist Registration
        </motion.h2>
        <p className="text-gray-600">Complete your registration to get your Smart Tourist Card with QR Code</p>

        {/* Progress Steps */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            {[1, 2, 3, 4].map((s) => (
              <div key={s} className="flex-1 flex items-center">
                <motion.div 
                  animate={{ scale: step >= s ? 1.1 : 1 }}
                  className={`h-10 w-10 rounded-full flex items-center justify-center font-bold ${
                    step >= s ? 'bg-primary-600 text-white' : 'bg-gray-200 text-gray-600'
                  }`}
                >
                  {s}
                </motion.div>
                {s < 4 && (
                  <div className={`flex-1 h-1 mx-2 ${
                    step > s ? 'bg-primary-600' : 'bg-gray-200'
                  }`}></div>
                )}
              </div>
            ))}
          </div>
          <div className="flex justify-between mt-2">
            <span className="text-xs font-medium">Personal Info</span>
            <span className="text-xs font-medium">Contact Details</span>
            <span className="text-xs font-medium">Stay Details</span>
            <span className="text-xs font-medium">Medical Info</span>
          </div>
        </div>

        {/* Form Steps */}
        <form className="space-y-6">
          {/* Step 1: Personal Information */}
          {step === 1 && (
            <motion.div 
              initial={{ x: -50, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.3 }}
              className="space-y-4"
            >
              <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
                <User className="h-6 w-6 mr-2 text-primary-600" />
                Personal Information
              </h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    name="fullName"
                    required
                    className="input-field"
                    value={formData.fullName}
                    onChange={handleChange}
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Date of Birth *
                  </label>
                  <input
                    type="date"
                    name="dateOfBirth"
                    required
                    className="input-field"
                    value={formData.dateOfBirth}
                    onChange={handleChange}
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Gender *
                  </label>
                  <select
                    name="gender"
                    required
                    className="input-field"
                    value={formData.gender}
                    onChange={handleChange}
                  >
                    <option value="">Select Gender</option>
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                    <option value="Other">Other</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Nationality *
                  </label>
                  <input
                    type="text"
                    name="nationality"
                    required
                    className="input-field"
                    value={formData.nationality}
                    onChange={handleChange}
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Country *
                  </label>
                  <input
                    type="text"
                    name="country"
                    required
                    className="input-field"
                    value={formData.country}
                    onChange={handleChange}
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Passport Number *
                  </label>
                  <input
                    type="text"
                    name="passportNumber"
                    required
                    className="input-field"
                    value={formData.passportNumber}
                    onChange={handleChange}
                  />
                </div>

                <div className="md:col-span-2">
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Home Address
                  </label>
                  <textarea
                    name="address"
                    className="input-field"
                    rows="3"
                    value={formData.address}
                    onChange={handleChange}
                  ></textarea>
                </div>
              </div>
            </motion.div>
          )}

          {/* Step 2: Contact Details */}
          {step === 2 && (
            <motion.div 
              initial={{ x: -50, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.3 }}
              className="space-y-4"
            >
              <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
                <Phone className="h-6 w-6 mr-2 text-primary-600" />
                Contact & Emergency Details
              </h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    name="email"
                    required
                    className="input-field"
                    value={formData.email}
                    onChange={handleChange}
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Phone Number *
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    required
                    className="input-field"
                    value={formData.phone}
                    onChange={handleChange}
                  />
                </div>

                <div className="md:col-span-2 bg-warning-50 border border-warning-200 rounded-lg p-4">
                  <p className="font-semibold text-warning-900 mb-3">Emergency Contact Information</p>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Emergency Contact Name *
                      </label>
                      <input
                        type="text"
                        name="emergencyContactName"
                        required
                        className="input-field"
                        value={formData.emergencyContactName}
                        onChange={handleChange}
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Emergency Contact Phone *
                      </label>
                      <input
                        type="tel"
                        name="emergencyContactPhone"
                        required
                        className="input-field"
                        value={formData.emergencyContactPhone}
                        onChange={handleChange}
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Relation *
                      </label>
                      <select
                        name="emergencyContactRelation"
                        required
                        className="input-field"
                        value={formData.emergencyContactRelation}
                        onChange={handleChange}
                      >
                        <option value="">Select Relation</option>
                        <option value="Spouse">Spouse</option>
                        <option value="Parent">Parent</option>
                        <option value="Sibling">Sibling</option>
                        <option value="Friend">Friend</option>
                        <option value="Other">Other</option>
                      </select>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {/* Step 3: Stay Details */}
          {step === 3 && (
            <motion.div 
              initial={{ x: -50, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.3 }}
              className="space-y-4"
            >
              <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
                <MapPin className="h-6 w-6 mr-2 text-primary-600" />
                Stay & Travel Details
              </h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Hotel/Accommodation Name *
                  </label>
                  <input
                    type="text"
                    name="hotelName"
                    required
                    className="input-field"
                    value={formData.hotelName}
                    onChange={handleChange}
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Hotel Address *
                  </label>
                  <input
                    type="text"
                    name="hotelAddress"
                    required
                    className="input-field"
                    value={formData.hotelAddress}
                    onChange={handleChange}
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Check-in Date *
                  </label>
                  <input
                    type="date"
                    name="checkInDate"
                    required
                    className="input-field"
                    value={formData.checkInDate}
                    onChange={handleChange}
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Check-out Date *
                  </label>
                  <input
                    type="date"
                    name="checkOutDate"
                    required
                    className="input-field"
                    value={formData.checkOutDate}
                    onChange={handleChange}
                  />
                </div>

                <div className="md:col-span-2">
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Purpose of Visit *
                  </label>
                  <select
                    name="purposeOfVisit"
                    required
                    className="input-field"
                    value={formData.purposeOfVisit}
                    onChange={handleChange}
                  >
                    <option value="">Select Purpose</option>
                    <option value="Tourism">Tourism</option>
                    <option value="Business">Business</option>
                    <option value="Education">Education</option>
                    <option value="Medical">Medical</option>
                    <option value="Other">Other</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Travel Insurance Number
                  </label>
                  <input
                    type="text"
                    name="travelInsurance"
                    className="input-field"
                    value={formData.travelInsurance}
                    onChange={handleChange}
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Insurance Provider
                  </label>
                  <input
                    type="text"
                    name="insuranceProvider"
                    className="input-field"
                    value={formData.insuranceProvider}
                    onChange={handleChange}
                  />
                </div>
              </div>
            </motion.div>
          )}

          {/* Step 4: Medical Information */}
          {step === 4 && (
            <motion.div 
              initial={{ x: -50, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.3 }}
              className="space-y-4"
            >
              <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
                <Heart className="h-6 w-6 mr-2 text-danger-600" />
                Medical Information
              </h3>
              
              <div className="bg-danger-50 border border-danger-200 rounded-lg p-4 mb-4">
                <p className="text-sm text-danger-900">
                  This information is crucial for emergency medical assistance. All data is encrypted and secure.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Blood Group
                  </label>
                  <select
                    name="bloodGroup"
                    className="input-field"
                    value={formData.bloodGroup}
                    onChange={handleChange}
                  >
                    <option value="">Select Blood Group</option>
                    <option value="A+">A+</option>
                    <option value="A-">A-</option>
                    <option value="B+">B+</option>
                    <option value="B-">B-</option>
                    <option value="O+">O+</option>
                    <option value="O-">O-</option>
                    <option value="AB+">AB+</option>
                    <option value="AB-">AB-</option>
                  </select>
                </div>

                <div className="md:col-span-2">
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Medical Conditions (if any)
                  </label>
                  <textarea
                    name="medicalConditions"
                    className="input-field"
                    rows="3"
                    placeholder="Diabetes, Heart condition, etc."
                    value={formData.medicalConditions}
                    onChange={handleChange}
                  ></textarea>
                </div>

                <div className="md:col-span-2">
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Allergies (if any)
                  </label>
                  <textarea
                    name="allergies"
                    className="input-field"
                    rows="3"
                    placeholder="Food allergies, Medicine allergies, etc."
                    value={formData.allergies}
                    onChange={handleChange}
                  ></textarea>
                </div>
              </div>

              <div className="bg-primary-50 border border-primary-200 rounded-lg p-4 mt-6">
                <div className="flex items-start gap-3">
                  <input type="checkbox" required className="mt-1" />
                  <p className="text-sm text-primary-900">
                    I confirm that all the information provided is accurate and true. I understand that this information 
                    will be used for safety and emergency purposes only. I agree to the terms and conditions of the 
                    Tourist Safety System.
                  </p>
                </div>
              </div>
            </motion.div>
          )}

          {/* Navigation Buttons */}
          <div className="flex gap-4 pt-6 border-t border-gray-200">
            {step > 1 && (
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                type="button"
                onClick={handlePrevious}
                className="flex-1 bg-gray-600 text-white px-6 py-3 rounded-lg hover:bg-gray-700 font-semibold"
              >
                Previous
              </motion.button>
            )}
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              type="button"
              onClick={handleNext}
              className="flex-1 btn-primary"
            >
              {step === 4 ? 'Complete Registration' : 'Next'}
            </motion.button>
          </div>
        </form>
      </div>
    </motion.div>
  )
}

export default TouristRegistration