import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Shield, Globe, AlertCircle } from 'lucide-react'
import { useAuth } from './AuthContext'
import { motion } from 'framer-motion'  // For animations

const SignUp = () => {
  const [userType, setUserType] = useState('tourist')
  const [touristType, setTouristType] = useState('international')  // New: Domestic or International
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
    country: '',
    passportNumber: '',
    aadhaarNumber: '',  // New: For domestic
    emergencyContact: '',
    departmentId: '',
    designation: ''
  })
  const [error, setError] = useState('')
  const { login } = useAuth()
  const navigate = useNavigate()

  const handleSubmit = (e) => {
    e.preventDefault()
    setError('')

    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match')
      return
    }

    if (formData.password.length < 6) {
      setError('Password must be at least 6 characters')
      return
    }

    const userData = {
      id: Date.now(),
      ...formData,
      role: userType,
      touristType: userType === 'tourist' ? touristType : null,  // Save touristType
      isRegistered: false
    }
    
    login(userData)
    navigate(`/${userType}/dashboard`)
  }

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen bg-gradient-to-br from-primary-50 to-primary-100 flex items-center justify-center p-4"
    >
      <div className="max-w-2xl w-full">
        <div className="text-center mb-8">
          <Shield className="h-16 w-16 text-primary-600 mx-auto mb-4" />
          <h1 className="text-3xl font-bold text-gray-900">Create Account</h1>
          <p className="text-gray-600 mt-2">Join the Tourist Safety System</p>
        </div>

        <div className="bg-white rounded-lg shadow-xl p-8">
          {/* User Type Toggle */}
          <div className="flex mb-6 bg-gray-100 rounded-lg p-1">
            <button
              onClick={() => setUserType('tourist')}
              className={`flex-1 py-2 px-4 rounded-md transition-all ${
                userType === 'tourist' 
                  ? 'bg-white shadow-sm text-primary-600 font-medium' 
                  : 'text-gray-600'
              }`}
            >
              <Globe className="inline h-4 w-4 mr-2" />
              Tourist
            </button>
            <button
              onClick={() => setUserType('authority')}
              className={`flex-1 py-2 px-4 rounded-md transition-all ${
                userType === 'authority' 
                  ? 'bg-white shadow-sm text-primary-600 font-medium' 
                  : 'text-gray-600'
              }`}
            >
              <Shield className="inline h-4 w-4 mr-2" />
              Authority
            </button>
          </div>

          {error && (
            <div className="mb-6 p-3 bg-danger-50 border border-danger-200 rounded-lg flex items-center text-danger-700">
              <AlertCircle className="h-5 w-5 mr-2" />
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Full Name
                </label>
                <input
                  type="text"
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500"
                  value={formData.name}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Email Address
                </label>
                <input
                  type="email"
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500"
                  value={formData.email}
                  onChange={(e) => setFormData({...formData, email: e.target.value})}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Phone Number
                </label>
                <input
                  type="tel"
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500"
                  value={formData.phone}
                  onChange={(e) => setFormData({...formData, phone: e.target.value})}
                />
              </div>

              {userType === 'tourist' && (
                <>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Country
                    </label>
                    <input
                      type="text"
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500"
                      value={formData.country}
                      onChange={(e) => setFormData({...formData, country: e.target.value})}
                    />
                  </div>

                  {/* New: Domestic/International Selection */}
                  <div className="col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Tourist Type
                    </label>
                    <div className="flex gap-4">
                      <label className="flex items-center gap-2">
                        <input
                          type="radio"
                          value="international"
                          checked={touristType === 'international'}
                          onChange={() => setTouristType('international')}
                          className="text-primary-600"
                        />
                        International
                      </label>
                      <label className="flex items-center gap-2">
                        <input
                          type="radio"
                          value="domestic"
                          checked={touristType === 'domestic'}
                          onChange={() => setTouristType('domestic')}
                          className="text-primary-600"
                        />
                        Domestic
                      </label>
                    </div>
                  </div>

                  {/* Conditional ID Field */}
                  {touristType === 'international' ? (
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Passport Number
                      </label>
                      <input
                        type="text"
                        required
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500"
                        value={formData.passportNumber}
                        onChange={(e) => setFormData({...formData, passportNumber: e.target.value})}
                      />
                    </div>
                  ) : (
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Aadhaar Number
                      </label>
                      <input
                        type="text"
                        required
                        maxLength={12}
                        pattern="\d{12}"
                        title="Aadhaar number must be 12 digits"
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500"
                        value={formData.aadhaarNumber}
                        onChange={(e) => setFormData({...formData, aadhaarNumber: e.target.value})}
                      />
                    </div>
                  )}

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Emergency Contact
                    </label>
                    <input
                      type="tel"
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500"
                      value={formData.emergencyContact}
                      onChange={(e) => setFormData({...formData, emergencyContact: e.target.value})}
                    />
                  </div>
                </>
              )}

              {userType === 'authority' && (
                <>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Department ID
                    </label>
                    <input
                      type="text"
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500"
                      value={formData.departmentId}
                      onChange={(e) => setFormData({...formData, departmentId: e.target.value})}
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Designation
                    </label>
                    <input
                      type="text"
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500"
                      value={formData.designation}
                      onChange={(e) => setFormData({...formData, designation: e.target.value})}
                    />
                  </div>
                </>
              )}

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Password
                </label>
                <input
                  type="password"
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500"
                  value={formData.password}
                  onChange={(e) => setFormData({...formData, password: e.target.value})}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Confirm Password
                </label>
                <input
                  type="password"
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500"
                  value={formData.confirmPassword}
                  onChange={(e) => setFormData({...formData, confirmPassword: e.target.value})}
                />
              </div>
            </div>

            <button
              type="submit"
              className="w-full bg-primary-600 text-white py-3 rounded-lg hover:bg-primary-700 transition-colors font-medium"
            >
              Create {userType === 'tourist' ? 'Tourist' : 'Authority'} Account
            </button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-gray-600">
              Already have an account?{' '}
              <Link to="/login" className="text-primary-600 hover:text-primary-700 font-medium">
                Login
              </Link>
            </p>
          </div>
        </div>
      </div>
    </motion.div>
  )
}

export default SignUp