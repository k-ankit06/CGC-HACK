import { useState } from 'react'
import { Shield, MapPin, AlertTriangle, Phone, QrCode, Bell, Activity, Navigation } from 'lucide-react'
import { useAuth } from '../../components/Auth/AuthContext'
import { motion } from 'framer-motion'
import axios from 'axios'

const glassCard = {
  background: 'rgba(255, 255, 255, 0.06)',
  backdropFilter: 'blur(24px)',
  WebkitBackdropFilter: 'blur(24px)',
  border: '1px solid rgba(255, 255, 255, 0.1)',
  borderRadius: '1rem',
  boxShadow: '0 8px 32px rgba(0, 0, 0, 0.3), inset 0 1px 0 rgba(255, 255, 255, 0.08)',
}

const TouristDashboard = () => {
  const { user } = useAuth()
  const [panicActive, setPanicActive] = useState(false)
  const [currentLocation, setCurrentLocation] = useState({ lat: null, lng: null, address: 'Not fetched yet' })
  const [locationLoading, setLocationLoading] = useState(false)
  const [locationError, setLocationError] = useState('')

  const handlePanic = () => { setPanicActive(true); setTimeout(() => setPanicActive(false), 3000) }

  const fetchLocation = () => {
    setLocationLoading(true); setLocationError('')
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          const lat = position.coords.latitude, lng = position.coords.longitude
          try {
            const response = await axios.get(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lng}&zoom=18&addressdetails=1`)
            setCurrentLocation({ lat, lng, address: response.data.display_name || 'Unknown' })
          } catch { setCurrentLocation({ lat, lng, address: 'Address not available' }) }
          setLocationLoading(false)
        },
        (error) => { setLocationLoading(false); setLocationError("Location error: " + error.message) }
      )
    } else { setLocationError("Geolocation not supported."); setLocationLoading(false) }
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

  const containerAnim = { hidden: { opacity: 0 }, visible: { opacity: 1, transition: { staggerChildren: 0.1 } } }
  const itemAnim = { hidden: { opacity: 0, y: 30 }, visible: { opacity: 1, y: 0, transition: { duration: 0.5 } } }

  return (
    <motion.div variants={containerAnim} initial="hidden" animate="visible" className="space-y-6">
      {/* Header */}
      <motion.div variants={itemAnim}>
        <h2 className="text-3xl font-bold text-white" style={{ textShadow: '0 0 30px rgba(99,102,241,0.4)' }}>Welcome, {user?.name}! 👋</h2>
        <p className="mt-1" style={{ color: 'rgba(199,210,254,0.6)' }}>Your safety is our priority. Have a wonderful journey! 🌟</p>
      </motion.div>

      {/* SOS */}
      <motion.div variants={itemAnim} whileHover={{ scale: 1.01 }} className="p-6" style={{ ...glassCard, background: 'linear-gradient(135deg, rgba(239,68,68,0.25), rgba(220,38,38,0.1))', border: '1px solid rgba(239,68,68,0.3)' }}>
        <div className="flex items-center justify-between">
          <div className="flex-1">
            <h3 className="text-xl font-bold text-white mb-2">Emergency SOS 🚨</h3>
            <p style={{ color: 'rgba(254,202,202,0.7)' }}>Press the panic button for immediate help</p>
          </div>
          <motion.button animate={panicActive ? { scale: [1, 1.1, 1] } : {}} transition={{ duration: 0.3, repeat: panicActive ? Infinity : 0 }} onClick={handlePanic}
            className="w-24 h-24 rounded-full font-bold text-lg"
            style={{ background: panicActive ? 'rgba(255,255,255,0.95)' : 'rgba(255,255,255,0.15)', color: panicActive ? '#dc2626' : '#fff', boxShadow: panicActive ? '0 0 40px rgba(239,68,68,0.6)' : '0 0 20px rgba(239,68,68,0.2)' }}>
            <div className="flex flex-col items-center"><AlertTriangle className={`h-10 w-10 ${panicActive ? 'animate-bounce' : ''}`} /><span className="text-xs mt-1">{panicActive ? 'HELP!' : 'SOS'}</span></div>
          </motion.button>
        </div>
        {panicActive && (
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="mt-4 rounded-xl p-3" style={{ background: 'rgba(255,255,255,0.1)' }}>
            <p className="font-semibold text-white">🚨 Emergency alert sent! Help is on the way...</p>
          </motion.div>
        )}
      </motion.div>

      {/* Score + Location */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <motion.div variants={itemAnim} whileHover={{ scale: 1.02 }} className="p-6" style={glassCard}>
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-bold text-white">Your Safety Score</h3>
            <Shield className="h-6 w-6" style={{ color: '#818cf8' }} />
          </div>
          <div className="text-center">
            <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: 'spring', stiffness: 200 }}
              className="text-6xl font-bold mb-2" style={{ color: '#4ade80', textShadow: '0 0 30px rgba(74,222,128,0.4)' }}>{safetyScore}</motion.div>
            <p className="text-lg font-semibold mb-4" style={{ color: '#86efac' }}>Safe Zone ✅</p>
            <div className="w-full rounded-full h-3 overflow-hidden" style={{ background: 'rgba(255,255,255,0.1)' }}>
              <motion.div initial={{ width: 0 }} animate={{ width: `${safetyScore}%` }} transition={{ duration: 1.5 }}
                className="h-3 rounded-full" style={{ background: 'linear-gradient(90deg, #6366f1, #06b6d4, #4ade80)' }} />
            </div>
          </div>
        </motion.div>

        <motion.div variants={itemAnim} whileHover={{ scale: 1.02 }} className="p-6" style={glassCard}>
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-bold text-white">Current Location</h3>
            <MapPin className="h-6 w-6" style={{ color: '#818cf8' }} />
          </div>
          <div className="rounded-xl p-4 mb-3" style={{ background: 'rgba(99,102,241,0.15)', border: '1px solid rgba(99,102,241,0.2)', borderRadius: '0.75rem' }}>
            <p className="text-sm mb-1" style={{ color: 'rgba(199,210,254,0.5)' }}>You are at</p>
            <p className="text-xl font-bold text-white">{currentLocation.address}</p>
            <p className="text-sm mt-2" style={{ color: 'rgba(199,210,254,0.5)' }}>📍 Lat: {currentLocation.lat ? currentLocation.lat.toFixed(4) : 'N/A'}, Lng: {currentLocation.lng ? currentLocation.lng.toFixed(4) : 'N/A'}</p>
            {locationError && <p className="text-sm mt-2" style={{ color: '#fca5a5' }}>{locationError}</p>}
          </div>
          <div className="grid grid-cols-2 gap-2">
            <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} onClick={fetchLocation} disabled={locationLoading}
              className="py-2.5 rounded-xl font-medium text-sm text-white flex items-center justify-center gap-1"
              style={{ background: 'linear-gradient(135deg, #6366f1, #8b5cf6)', boxShadow: '0 4px 15px rgba(99,102,241,0.3)' }}>
              <Navigation className="h-4 w-4" />{locationLoading ? 'Loading...' : 'Fetch Location'}
            </motion.button>
            <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}
              className="py-2.5 rounded-xl font-medium text-sm text-white flex items-center justify-center gap-1"
              style={{ background: 'linear-gradient(135deg, #a855f7, #6366f1)', boxShadow: '0 4px 15px rgba(168,85,247,0.3)' }}>
              <MapPin className="h-4 w-4" />Safe Routes
            </motion.button>
          </div>
        </motion.div>
      </div>

      {/* Quick Actions */}
      <motion.div variants={itemAnim} className="p-6" style={glassCard}>
        <h3 className="text-lg font-bold text-white mb-4">Quick Actions ⚡</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[{ icon: QrCode, label: 'My Tourist Card', gradient: 'linear-gradient(135deg, #6366f1, #8b5cf6)' },
          { icon: Phone, label: 'Emergency Contacts', gradient: 'linear-gradient(135deg, #ef4444, #f87171)' },
          { icon: MapPin, label: 'Nearby Help', gradient: 'linear-gradient(135deg, #06b6d4, #22d3ee)' },
          { icon: Shield, label: 'Safety Tips', gradient: 'linear-gradient(135deg, #10b981, #34d399)' }
          ].map((action, index) => (
            <motion.button key={index} whileHover={{ scale: 1.08, y: -5 }} whileTap={{ scale: 0.95 }}
              className="p-5 text-white rounded-2xl" style={{ background: action.gradient, boxShadow: '0 4px 20px rgba(0,0,0,0.3)' }}>
              <action.icon className="h-8 w-8 mb-2 mx-auto" /><p className="text-sm font-semibold">{action.label}</p>
            </motion.button>
          ))}
        </div>
      </motion.div>

      {/* Nearby Help */}
      <motion.div variants={itemAnim} className="p-6" style={glassCard}>
        <h3 className="text-lg font-bold text-white mb-4 flex items-center"><MapPin className="h-5 w-5 mr-2" style={{ color: '#818cf8' }} />Nearby Help Points</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {nearbyHelp.map((help, index) => (
            <motion.div key={index} whileHover={{ scale: 1.02 }} className="rounded-xl p-4" style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '0.75rem' }}>
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <p className="text-xs mb-1" style={{ color: 'rgba(199,210,254,0.4)' }}>{help.type}</p>
                  <p className="font-semibold text-white">{help.name}</p>
                  <p className="text-sm mt-1" style={{ color: 'rgba(199,210,254,0.5)' }}>📍 {help.distance} away</p>
                </div>
                <motion.button whileHover={{ scale: 1.1 }} className="p-2 rounded-xl text-white" style={{ background: 'linear-gradient(135deg, #6366f1, #8b5cf6)' }}>
                  <Phone className="h-4 w-4" />
                </motion.button>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Safety Alerts */}
      <motion.div variants={itemAnim} className="p-6" style={glassCard}>
        <h3 className="text-lg font-bold text-white mb-4 flex items-center"><Bell className="h-5 w-5 mr-2" style={{ color: '#818cf8' }} />Safety Alerts</h3>
        <div className="space-y-3">
          {safetyAlerts.map((alert, index) => (
            <motion.div key={index} whileHover={{ x: 5 }} className="p-4 rounded-xl" style={{
              borderLeft: `4px solid ${alert.type === 'success' ? '#4ade80' : alert.type === 'warning' ? '#facc15' : '#818cf8'}`,
              background: alert.type === 'success' ? 'rgba(74,222,128,0.08)' : alert.type === 'warning' ? 'rgba(250,204,21,0.08)' : 'rgba(129,140,248,0.08)',
              borderRadius: '0.75rem'
            }}>
              <p className="font-medium text-white">{alert.message}</p>
              <p className="text-xs mt-1" style={{ color: 'rgba(199,210,254,0.4)' }}>{alert.time}</p>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </motion.div>
  )
}

export default TouristDashboard