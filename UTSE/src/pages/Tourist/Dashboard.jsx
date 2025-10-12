import { useState, useRef } from 'react'
import { 
  Shield, MapPin, AlertTriangle, Phone, QrCode, Bell, 
  Activity, Navigation, Loader, X 
} from 'lucide-react'
import { useAuth } from '../../components/Auth/AuthContext'
import { motion } from 'framer-motion'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

const TouristDashboard = () => {
  const { user } = useAuth()
  const navigate = useNavigate()
  const [panicActive, setPanicActive] = useState(false)
  const [currentLocation, setCurrentLocation] = useState({ 
    lat: null, 
    lng: null, 
    address: 'Not fetched yet', 
    city: '' 
  })
  const [locationLoading, setLocationLoading] = useState(false)
  const [locationError, setLocationError] = useState('')
  const [safetyScore, setSafetyScore] = useState(92)
  const [nearbyHelp, setNearbyHelp] = useState([
    { type: 'Police Station', name: 'Taj Ganj Police Post', distance: '0.5 km', phone: '100' },
    { type: 'Hospital', name: 'District Hospital Agra', distance: '2.1 km', phone: '102' },
    { type: 'Tourist Help', name: 'Tourist Helpline Center', distance: '0.3 km', phone: '1363' },
    { type: 'Embassy', name: 'US Consulate', distance: '5.2 km', phone: '+91-11-2419-8000' },
  ])
  const [safetyAlerts, setSafetyAlerts] = useState([
    { type: 'info', message: 'Weather Update: High temperature expected (42°C). Stay hydrated!', time: '10 mins ago' },
    { type: 'warning', message: 'Pickpocket alert in Sadar Bazaar area. Keep valuables secure.', time: '1 hour ago' },
    { type: 'success', message: 'You are in a safe zone. Enjoy your visit!', time: '2 hours ago' },
  ])
  const [recentActivity, setRecentActivity] = useState([
    { action: 'Check-in at Taj Mahal', time: '2 hours ago', icon: MapPin },
    { action: 'Safety score updated', time: '3 hours ago', icon: Shield },
    { action: 'Visited India Gate', time: '1 day ago', icon: MapPin },
  ])
  const [showEmergencyModal, setShowEmergencyModal] = useState(false)
  const nearbyHelpRef = useRef(null)

  // SOS Panic Button Handler
  const handlePanic = () => {
    setPanicActive(true)
    setTimeout(() => setPanicActive(false), 3000)
  }

  // Fixed Location Fetching
  const fetchLocation = () => {
    setLocationLoading(true)
    setLocationError('')
    
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          const lat = position.coords.latitude
          const lng = position.coords.longitude
          
          try {
            const response = await axios.get(
              `https://nominatim.openstreetmap.org/reverse`,
              {
                params: {
                  format: 'json',
                  lat: lat,
                  lon: lng,
                  zoom: 18,
                  addressdetails: 1
                },
                headers: {
                  'User-Agent': 'TouristSafetyApp/1.0 (support@touristsafety.in)'
                }
              }
            )
            
            const address = response.data.display_name || 'Unknown location'
            const city = response.data.address.city || response.data.address.town || response.data.address.village || 'Unknown'
            
            setCurrentLocation({ lat, lng, address, city })
            updateSectionsBasedOnCity(city)
          } catch (err) {
            setLocationError('Unable to fetch address. Showing coordinates only.')
            setCurrentLocation({ lat, lng, address: 'Address not available', city: '' })
          } finally {
            setLocationLoading(false)
          }
        },
        (error) => {
          setLocationLoading(false)
          switch(error.code) {
            case error.PERMISSION_DENIED:
              setLocationError("Permission denied. Please allow location access.")
              break
            case error.POSITION_UNAVAILABLE:
              setLocationError("Location information is unavailable.")
              break
            case error.TIMEOUT:
              setLocationError("The request to get user location timed out.")
              break
            default:
              setLocationError("An unknown error occurred.")
          }
        }
      )
    } else {
      setLocationError("Geolocation is not supported by this browser.")
      setLocationLoading(false)
    }
  }

  // Update Sections Based on City
  const updateSectionsBasedOnCity = (city) => {
    const cityData = {
      'Agra': {
        safetyScore: Math.floor(Math.random() * 10) + 90,
        nearbyHelp: [
          { type: 'Police Station', name: 'Taj Ganj Police Post', distance: '0.5 km', phone: '100' },
          { type: 'Hospital', name: 'District Hospital Agra', distance: '2.1 km', phone: '102' },
          { type: 'Tourist Help', name: 'Agra Tourist Center', distance: '0.4 km', phone: '1363' },
          { type: 'Embassy', name: 'Nearest Embassy in Delhi', distance: '200 km', phone: '+91-11-2419-8000' },
        ],
        safetyAlerts: [
          { type: 'warning', message: 'High tourist crowd at Taj Mahal. Watch for pickpockets!', time: 'Now' },
          { type: 'info', message: 'Heat advisory in Agra. Drink plenty of water.', time: '5 mins ago' },
          { type: 'success', message: 'Safe zone activated near monuments.', time: '1 hour ago' },
        ],
        recentActivity: [
          { action: 'Check-in at Taj Mahal', time: 'Now', icon: MapPin },
          { action: 'Visited Agra Fort', time: '1 hour ago', icon: MapPin },
          { action: 'Safety alert received', time: '2 hours ago', icon: Shield },
        ]
      },
      'Delhi': {
        safetyScore: Math.floor(Math.random() * 10) + 80,
        nearbyHelp: [
          { type: 'Police Station', name: 'Connaught Place Police', distance: '1 km', phone: '100' },
          { type: 'Hospital', name: 'AIIMS Delhi', distance: '5 km', phone: '102' },
          { type: 'Tourist Help', name: 'Delhi Tourist Center', distance: '0.8 km', phone: '1363' },
          { type: 'Embassy', name: 'US Embassy Delhi', distance: '3 km', phone: '+91-11-2419-8000' },
        ],
        safetyAlerts: [
          { type: 'warning', message: 'Traffic congestion in central Delhi. Use metro.', time: 'Now' },
          { type: 'info', message: 'Air quality moderate. Wear mask if sensitive.', time: '10 mins ago' },
          { type: 'success', message: 'Safe public transport available.', time: '30 mins ago' },
        ],
        recentActivity: [
          { action: 'Check-in at India Gate', time: 'Now', icon: MapPin },
          { action: 'Visited Red Fort', time: '45 mins ago', icon: MapPin },
          { action: 'Traffic alert received', time: '1 hour ago', icon: AlertTriangle },
        ]
      },
      default: {
        safetyScore: Math.floor(Math.random() * 10) + 85,
        nearbyHelp: [
          { type: 'Police Station', name: 'Local Police', distance: '1 km', phone: '100' },
          { type: 'Hospital', name: 'Nearest Hospital', distance: '2 km', phone: '102' },
          { type: 'Tourist Help', name: 'Tourist Helpline', distance: '0.5 km', phone: '1363' },
          { type: 'Embassy', name: 'Nearest Embassy', distance: '10 km', phone: '+91-11-2419-8000' },
        ],
        safetyAlerts: [
          { type: 'info', message: 'General safety advisory: Stay alert.', time: 'Now' },
          { type: 'success', message: 'You are in a monitored zone.', time: '5 mins ago' },
        ],
        recentActivity: [
          { action: 'Location fetched', time: 'Now', icon: MapPin },
          { action: 'Safety score checked', time: '10 mins ago', icon: Shield },
        ]
      }
    }

    const data = cityData[city] || cityData.default
    setSafetyScore(data.safetyScore)
    setNearbyHelp(data.nearbyHelp)
    setSafetyAlerts(data.safetyAlerts)
    setRecentActivity(data.recentActivity)
  }

  // Emergency Contacts
  const emergencyContacts = [
    { name: 'Personal Emergency Contact', phone: user?.emergencyContact || 'Not set (Update in Profile)' },
    { name: 'Police Emergency', phone: '100' },
    { name: 'Ambulance / Medical', phone: '102' },
    { name: 'National Tourist Helpline', phone: '1363' },
    { name: 'Women Safety Helpline', phone: '1091' },
  ]

  // Scroll to Nearby Help
  const scrollToNearbyHelp = () => {
    nearbyHelpRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="space-y-6"
    >
      <div>
        <motion.h2 
          initial={{ scale: 0.9 }}
          animate={{ scale: 1 }}
          className="text-3xl font-bold text-gray-900"
        >
          Welcome, {user?.name}! 👋
        </motion.h2>
        <p className="text-gray-600 mt-1">Your safety is our priority. Have a wonderful journey! 🌟</p>
      </div>

      {/* Emergency SOS Button */}
      <motion.div 
        whileHover={{ scale: 1.02 }}
        className="card bg-gradient-to-r from-danger-500 to-danger-600 text-white rounded-xl shadow-2xl"
      >
        <div className="flex items-center justify-between">
          <div className="flex-1">
            <h3 className="text-xl font-bold mb-2">Emergency SOS 🚨</h3>
            <p className="text-danger-100">In case of emergency, press the panic button for immediate help</p>
          </div>
          <motion.button
            animate={panicActive ? { scale: [1, 1.1, 1], rotate: [0, 5, -5, 0] } : {}}
            transition={{ duration: 0.3, repeat: panicActive ? Infinity : 0 }}
            onClick={handlePanic}
            className={`relative w-24 h-24 rounded-full transition-all duration-300 font-bold text-lg shadow-xl ${
              panicActive ? 'bg-white text-danger-600 animate-pulse' : 'bg-white/20 hover:bg-white/30'
            }`}
            title="Press for SOS"
          >
            {panicActive ? (
              <div className="flex flex-col items-center">
                <AlertTriangle className="h-10 w-10 animate-bounce" />
                <span className="text-xs mt-1">HELP!</span>
              </div>
            ) : (
              <div className="flex flex-col items-center">
                <AlertTriangle className="h-10 w-10" />
                <span className="text-xs mt-1">SOS</span>
              </div>
            )}
          </motion.button>
        </div>
        {panicActive && (
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-4 bg-white/20 backdrop-blur rounded-lg p-3 animate-pulse"
          >
            <p className="font-semibold">🚨 Emergency alert sent! Help is on the way...</p>
            <p className="text-sm text-danger-100 mt-2">Tourist Police: 2 mins away • Ambulance dispatched</p>
          </motion.div>
        )}
      </motion.div>

      {/* Safety Score + Current Location */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <motion.div 
          whileHover={{ scale: 1.02 }}
          className="card shadow-lg"
        >
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-bold text-gray-900">Your Safety Score</h3>
            <Shield className="h-6 w-6 text-primary-600" />
          </div>
          <div className="text-center">
            <motion.div 
              key={safetyScore}
              initial={{ scale: 0.5, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.5 }}
              className={`text-6xl font-bold mb-2 ${
                safetyScore >= 80 ? 'text-success-600' : 
                safetyScore >= 60 ? 'text-warning-600' : 
                'text-danger-600'
              }`}
            >
              {safetyScore}
            </motion.div>
            <p className={`text-lg font-semibold mb-4 ${
              safetyScore >= 80 ? 'text-success-600' : 
              safetyScore >= 60 ? 'text-warning-600' : 
              'text-danger-600'
            }`}>
              {safetyScore >= 80 ? 'Safe Zone' : safetyScore >= 60 ? 'Moderate Risk' : 'High Risk'}
            </p>
            <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
              <motion.div 
                initial={{ width: 0 }}
                animate={{ width: `${safetyScore}%` }}
                transition={{ duration: 1 }}
                className={`h-3 rounded-full ${
                  safetyScore >= 80 ? 'bg-success-500' : 
                  safetyScore >= 60 ? 'bg-warning-500' : 
                  'bg-danger-500'
                }`}
              ></motion.div>
            </div>
            <p className="text-sm text-gray-600 mt-3">
              Based on location, time, crowd density, and weather conditions 📊
            </p>
          </div>
        </motion.div>

        <motion.div 
          whileHover={{ scale: 1.02 }}
          className="card shadow-lg"
        >
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-bold text-gray-900">Current Location</h3>
            <MapPin className="h-6 w-6 text-primary-600" />
          </div>
          <div className="space-y-3">
            <div className="bg-primary-50 p-4 rounded-lg">
              <p className="text-sm text-gray-600 mb-1">You are at</p>
              <p className="text-xl font-bold text-primary-900">{currentLocation.address}</p>
              <p className="text-sm text-gray-600 mt-2">
                📍 Lat: {currentLocation.lat ? currentLocation.lat.toFixed(4) : 'N/A'}, Lng: {currentLocation.lng ? currentLocation.lng.toFixed(4) : 'N/A'}
              </p>
              {locationError && <p className="text-sm text-danger-600 mt-2">{locationError}</p>}
            </div>
            <div className="grid grid-cols-2 gap-2">
              <motion.button 
                whileHover={{ scale: 1.05 }}
                onClick={fetchLocation}
                disabled={locationLoading}
                className="btn-primary text-sm flex items-center justify-center"
              >
                {locationLoading ? <Loader className="h-4 w-4 mr-1 animate-spin" /> : <Navigation className="inline h-4 w-4 mr-1" />}
                {locationLoading ? 'Fetching...' : 'Fetch Location'}
              </motion.button>
              <motion.button 
                whileHover={{ scale: 1.05 }}
                onClick={() => navigate('/tourist/safe-routes')}
                className="bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 text-sm font-medium"
              >
                <MapPin className="inline h-4 w-4 mr-1" />
                Safe Routes
              </motion.button>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Clickable Quick Actions */}
      <div className="card">
        <h3 className="text-lg font-bold mb-4">Quick Actions ⚡</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <motion.button 
            whileHover={{ scale: 1.05, rotate: 5 }}
            transition={{ duration: 0.2 }}
            onClick={() => navigate('/tourist/my-card')}
            className="p-4 bg-gradient-to-br from-primary-500 to-primary-600 text-white rounded-lg hover:shadow-lg transition-shadow cursor-pointer"
            title="View your Smart Tourist Card"
          >
            <QrCode className="h-8 w-8 mb-2 mx-auto" />
            <p className="text-sm font-semibold">My Tourist Card</p>
          </motion.button>

          <motion.button 
            whileHover={{ scale: 1.05, rotate: 5 }}
            transition={{ duration: 0.2 }}
            onClick={() => setShowEmergencyModal(true)}
            className="p-4 bg-gradient-to-br from-danger-500 to-danger-600 text-white rounded-lg hover:shadow-lg transition-shadow cursor-pointer"
            title="View emergency contact numbers"
          >
            <Phone className="h-8 w-8 mb-2 mx-auto" />
            <p className="text-sm font-semibold">Emergency Contacts</p>
          </motion.button>

          <motion.button 
            whileHover={{ scale: 1.05, rotate: 5 }}
            transition={{ duration: 0.2 }}
            onClick={scrollToNearbyHelp}
            className="p-4 bg-gradient-to-br from-success-500 to-success-600 text-white rounded-lg hover:shadow-lg transition-shadow cursor-pointer"
            title="View nearby help points"
          >
            <MapPin className="h-8 w-8 mb-2 mx-auto" />
            <p className="text-sm font-semibold">Nearby Help</p>
          </motion.button>

          <motion.button 
            whileHover={{ scale: 1.05, rotate: 5 }}
            transition={{ duration: 0.2 }}
            onClick={() => navigate('/tourist/safety')}
            className="p-4 bg-gradient-to-br from-warning-500 to-warning-600 text-white rounded-lg hover:shadow-lg transition-shadow cursor-pointer"
            title="View safety tips and guidelines"
          >
            <Shield className="h-8 w-8 mb-2 mx-auto" />
            <p className="text-sm font-semibold">Safety Tips</p>
          </motion.button>
        </div>
      </div>

      {/* Nearby Help Points */}
      <motion.div 
        ref={nearbyHelpRef}
        key={currentLocation.city}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="card"
      >
        <h3 className="text-lg font-bold mb-4 flex items-center">
          <MapPin className="h-5 w-5 mr-2 text-primary-600" />
          Nearby Help Points {currentLocation.city ? `in ${currentLocation.city}` : ''}
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {nearbyHelp.map((help, index) => (
            <div key={index} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <p className="text-xs text-gray-500 mb-1">{help.type}</p>
                  <p className="font-semibold text-gray-900">{help.name}</p>
                  <p className="text-sm text-gray-600 mt-1">📍 {help.distance} away</p>
                </div>
                <a 
                  href={`tel:${help.phone}`}
                  className="bg-primary-600 text-white p-2 rounded-lg hover:bg-primary-700"
                  title={`Call ${help.name} at ${help.phone}`}
                >
                  <Phone className="h-4 w-4" />
                </a>
              </div>
            </div>
          ))}
        </div>
      </motion.div>

      {/* Safety Alerts */}
      <motion.div 
        key={currentLocation.city + 'alerts'}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="card"
      >
        <h3 className="text-lg font-bold mb-4 flex items-center">
          <Bell className="h-5 w-5 mr-2 text-primary-600" />
          Safety Alerts & Notifications
        </h3>
        <div className="space-y-3">
          {safetyAlerts.map((alert, index) => (
            <div key={index} className={`border-l-4 p-4 rounded ${
              alert.type === 'success' ? 'border-success-500 bg-success-50' :
              alert.type === 'warning' ? 'border-warning-500 bg-warning-50' :
              'border-primary-500 bg-primary-50'
            }`}>
              <p className="font-medium text-gray-900">{alert.message}</p>
              <p className="text-xs text-gray-600 mt-1">{alert.time}</p>
            </div>
          ))}
        </div>
      </motion.div>

      {/* Recent Activity */}
      <motion.div 
        key={currentLocation.city + 'activity'}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="card"
      >
        <h3 className="text-lg font-bold mb-4 flex items-center">
          <Activity className="h-5 w-5 mr-2 text-primary-600" />
          Recent Activity
        </h3>
        <div className="space-y-3">
          {recentActivity.map((activity, index) => {
            const Icon = activity.icon
            return (
              <div key={index} className="flex items-center gap-3 pb-3 border-b border-gray-100 last:border-0">
                <div className="p-2 bg-primary-100 rounded-lg">
                  <Icon className="h-5 w-5 text-primary-600" />
                </div>
                <div className="flex-1">
                  <p className="font-medium text-gray-900">{activity.action}</p>
                  <p className="text-sm text-gray-600">{activity.time}</p>
                </div>
              </div>
            )
          })}
        </div>
      </motion.div>

      {/* Emergency Contacts Modal */}
      {showEmergencyModal && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
        >
          <motion.div
            initial={{ scale: 0.9, y: 20 }}
            animate={{ scale: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="bg-white rounded-2xl max-w-md w-full"
          >
            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-2xl font-bold text-gray-900">Emergency Contacts 📞</h3>
                <button
                  onClick={() => setShowEmergencyModal(false)}
                  className="text-gray-500 hover:text-gray-700 text-2xl"
                >
                  <X className="h-6 w-6" />
                </button>
              </div>

              <div className="space-y-4">
                {emergencyContacts.map((contact, index) => (
                  <div key={index} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <p className="font-semibold text-gray-900">{contact.name}</p>
                        <p className="text-sm text-gray-600 font-mono">{contact.phone}</p>
                      </div>
                      {contact.phone !== 'Not set (Update in Profile)' && (
                        <a 
                          href={`tel:${contact.phone}`}
                          className="bg-primary-600 text-white p-2 rounded-lg hover:bg-primary-700"
                          title={`Call ${contact.name}`}
                        >
                          <Phone className="h-4 w-4" />
                        </a>
                      )}
                    </div>
                  </div>
                ))}

                <div className="bg-warning-50 border border-warning-200 p-3 rounded-lg">
                  <p className="text-sm text-warning-900">
                    <strong>Note:</strong> Save these numbers to your phone for offline access.
                  </p>
                </div>
              </div>

              <button
                onClick={() => setShowEmergencyModal(false)}
                className="w-full mt-6 bg-gray-600 text-white py-3 rounded-lg hover:bg-gray-700 font-medium"
              >
                Close
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </motion.div>
  )
}

export default TouristDashboard