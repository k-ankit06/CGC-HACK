import { useState } from 'react'
import { Shield, MapPin, AlertTriangle, Phone, QrCode, Bell, Activity, Navigation } from 'lucide-react'
import { useAuth } from '../../components/Auth/AuthContext'
import { motion } from 'framer-motion'
import axios from 'axios'  // For API calls

const TouristDashboard = () => {
  const { user } = useAuth()
  const [panicActive, setPanicActive] = useState(false)
  const [currentLocation, setCurrentLocation] = useState({ lat: null, lng: null, address: 'Not fetched yet' })
  const [locationLoading, setLocationLoading] = useState(false)
  const [locationError, setLocationError] = useState('')

  const handlePanic = () => {
    setPanicActive(true)
    // Trigger emergency response
    setTimeout(() => setPanicActive(false), 3000)
  }

  const fetchLocation = () => {
    setLocationLoading(true)
    setLocationError('')
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          const lat = position.coords.latitude
          const lng = position.coords.longitude
          try {
            // Reverse geocoding using OpenStreetMap Nominatim API
            const response = await axios.get(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lng}&zoom=18&addressdetails=1`)
            const address = response.data.display_name || 'Unknown location'
            setCurrentLocation({ lat, lng, address })
          } catch (err) {
            setLocationError('Unable to fetch address. Showing coordinates only.')
            setCurrentLocation({ lat, lng, address: 'Address not available' })
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

  const safetyScore = 92
  const nearbyHelp = [
    { type: 'Police Station', name: 'Taj Ganj Police Post', distance: '0.5 km', phone: '100' },
    { type: 'Hospital', name: 'District Hospital Agra', distance: '2.1 km', phone: '102' },
    { type: 'Tourist Help', name: 'Tourist Helpline Center', distance: '0.3 km', phone: '1363' },
    { type: 'Embassy', name: 'US Consulate', distance: '5.2 km', phone: '+91-11-2419-8000' },
  ]

  const safetyAlerts = [
    { type: 'info', message: 'Weather Update: High temperature expected (42°C). Stay hydrated!', time: '10 mins ago' },
    { type: 'warning', message: 'Pickpocket alert in Sadar Bazaar area. Keep valuables secure.', time: '1 hour ago' },
    { type: 'success', message: 'You are in a safe zone. Enjoy your visit!', time: '2 hours ago' },
  ]

  const recentActivity = [
    { action: 'Check-in at Taj Mahal', time: '2 hours ago', icon: MapPin },
    { action: 'Safety score updated', time: '3 hours ago', icon: Shield },
    { action: 'Visited India Gate', time: '1 day ago', icon: MapPin },
  ]

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

      {/* Emergency Panic Button with bounce animation */}
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

      {/* Safety Score & Location with creative visuals */}
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
              
              
              className={`text-6xl font-bold mb-2 animate-pulse ${
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
                className="btn-primary text-sm"
              >
                {locationLoading ? 'Fetching...' : <Navigation className="inline h-4 w-4 mr-1" />}
                {locationLoading ? 'Loading...' : 'Fetch Location'}
              </motion.button>
              <motion.button 
                whileHover={{ scale: 1.05 }}
                className="bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 text-sm font-medium"
              >
                <MapPin className="inline h-4 w-4 mr-1" />
                Safe Routes
              </motion.button>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Quick Actions with hover animations */}
      <div className="card">
        <h3 className="text-lg font-bold mb-4">Quick Actions ⚡</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { icon: QrCode, label: 'My Tourist Card' },
            { icon: Phone, label: 'Emergency Contacts' },
            { icon: MapPin, label: 'Nearby Help' },
            { icon: Shield, label: 'Safety Tips' }
          ].map((action, index) => (
            <motion.button 
              key={index}
              whileHover={{ scale: 1.05, rotate: 5 }}
              transition={{ duration: 0.2 }}
              className="p-4 bg-gradient-to-br from-primary-500 to-primary-600 text-white rounded-lg hover:shadow-lg transition-shadow"
              title={action.label}
            >
              <action.icon className="h-8 w-8 mb-2 mx-auto" />
              <p className="text-sm font-semibold">{action.label}</p>
            </motion.button>
          ))}
        </div>
      </div>

      {/* Nearby Help Points */}
      <div className="card">
        <h3 className="text-lg font-bold mb-4 flex items-center">
          <MapPin className="h-5 w-5 mr-2 text-primary-600" />
          Nearby Help Points
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
                <button className="bg-primary-600 text-white p-2 rounded-lg hover:bg-primary-700">
                  <Phone className="h-4 w-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Safety Alerts */}
      <div className="card">
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
      </div>

      {/* Recent Activity */}
      <div className="card">
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
      </div>
    </motion.div>
  )
}

export default TouristDashboard  