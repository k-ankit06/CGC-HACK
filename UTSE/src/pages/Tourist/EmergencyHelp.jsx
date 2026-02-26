import { useState } from 'react'
import { Phone, MapPin, Activity, Shield, AlertTriangle, Navigation, Clock } from 'lucide-react'
import { motion } from 'framer-motion'

const glass = { background: 'rgba(255,255,255,0.06)', backdropFilter: 'blur(24px)', WebkitBackdropFilter: 'blur(24px)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '1rem', boxShadow: '0 8px 32px rgba(0,0,0,0.3), inset 0 1px 0 rgba(255,255,255,0.08)' }
const containerAnim = { hidden: { opacity: 0 }, visible: { opacity: 1, transition: { staggerChildren: 0.08 } } }
const itemAnim = { hidden: { opacity: 0, y: 30 }, visible: { opacity: 1, y: 0, transition: { duration: 0.5 } } }

const EmergencyHelp = () => {
  const [selectedEmergency, setSelectedEmergency] = useState(null)
  const [panicActivated, setPanicActivated] = useState(false)

  const emergencyContacts = [
    { id: 1, type: 'Police Emergency', number: '100', icon: Shield, gradient: 'linear-gradient(135deg, #6366f1, #8b5cf6)', description: 'For crime, theft, or security emergencies', avgResponseTime: '5-8 minutes', available247: true },
    { id: 2, type: 'Medical Emergency', number: '102', icon: Activity, gradient: 'linear-gradient(135deg, #ef4444, #f87171)', description: 'For medical emergencies and ambulance services', avgResponseTime: '8-12 minutes', available247: true },
    { id: 3, type: 'Tourist Police', number: '1363', icon: Shield, gradient: 'linear-gradient(135deg, #a855f7, #c084fc)', description: 'Dedicated helpline for tourist assistance', avgResponseTime: '3-5 minutes', available247: true },
    { id: 4, type: 'Women Helpline', number: '1091', icon: AlertTriangle, gradient: 'linear-gradient(135deg, #ec4899, #f472b6)', description: 'Emergency helpline for women in distress', avgResponseTime: '5-7 minutes', available247: true }
  ]

  const nearbyEmergencyServices = [
    { name: 'District Hospital Agra', type: 'Hospital', distance: '2.1 km', address: 'MG Road, Agra', phone: '+91-562-2226355', rating: 4.2, facilities: ['Emergency Ward', 'ICU', 'Trauma Center'] },
    { name: 'Taj Ganj Police Station', type: 'Police', distance: '0.5 km', address: 'Near Taj Mahal, Agra', phone: '+91-562-2330047', rating: 4.0, facilities: ['24/7 Service', 'Tourist Help Desk'] },
    { name: 'Pushpanjali Hospital', type: 'Hospital', distance: '3.5 km', address: 'Fatehabad Road, Agra', phone: '+91-562-4045454', rating: 4.5, facilities: ['Emergency', 'Pharmacy', 'Ambulance'] },
    { name: 'Tourist Police Booth', type: 'Tourist Help', distance: '0.3 km', address: 'Taj East Gate', phone: '+91-562-2227261', rating: 4.8, facilities: ['Tourist Assistance', 'Lost & Found'] }
  ]

  const embassyContacts = [
    { country: 'USA', phone: '+91-11-2419-8000', city: 'New Delhi' }, { country: 'UK', phone: '+91-11-2419-2100', city: 'New Delhi' },
    { country: 'Canada', phone: '+91-11-4178-2000', city: 'New Delhi' }, { country: 'Australia', phone: '+91-11-4139-9900', city: 'New Delhi' },
    { country: 'Germany', phone: '+91-11-4479-9199', city: 'New Delhi' }, { country: 'France', phone: '+91-11-4319-6100', city: 'New Delhi' }
  ]

  return (
    <motion.div variants={containerAnim} initial="hidden" animate="visible" className="space-y-6">
      <motion.div variants={itemAnim}>
        <h2 className="text-3xl font-bold text-white" style={{ textShadow: '0 0 30px rgba(99,102,241,0.4)' }}>Emergency Help</h2>
        <p className="mt-1" style={{ color: 'rgba(199,210,254,0.6)' }}>Immediate assistance and emergency contacts at your fingertips</p>
      </motion.div>

      {/* SOS */}
      <motion.div variants={itemAnim} className="p-6" style={{ ...glass, background: 'linear-gradient(135deg, rgba(239,68,68,0.25), rgba(220,38,38,0.1))', border: '1px solid rgba(239,68,68,0.3)' }}>
        <div className="flex items-center justify-between">
          <div className="flex-1">
            <h3 className="text-2xl font-bold text-white mb-2">🚨 Emergency SOS</h3>
            <p style={{ color: 'rgba(254,202,202,0.7)' }}>Press this button to send immediate emergency alert</p>
            <div className="flex gap-3 mt-4">
              <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} onClick={() => { setPanicActivated(true); setTimeout(() => setPanicActivated(false), 5000) }}
                className="px-8 py-4 rounded-xl font-bold text-lg" style={{ background: panicActivated ? 'rgba(255,255,255,0.95)' : 'rgba(255,255,255,0.15)', color: panicActivated ? '#dc2626' : '#fff', boxShadow: panicActivated ? '0 0 40px rgba(239,68,68,0.6)' : 'none' }}>
                {panicActivated ? '📡 ALERT SENT!' : '🆘 ACTIVATE SOS'}
              </motion.button>
              <motion.button whileHover={{ scale: 1.05 }} className="px-6 py-4 rounded-xl font-semibold text-white" style={{ background: 'rgba(255,255,255,0.15)' }}>📞 Call 100</motion.button>
            </div>
          </div>
          <div className="hidden md:block">
            <motion.div animate={panicActivated ? { scale: [1, 1.1, 1] } : {}} transition={{ duration: 0.5, repeat: panicActivated ? Infinity : 0 }}
              className="w-40 h-40 rounded-full flex items-center justify-center" style={{ background: panicActivated ? 'rgba(255,255,255,0.9)' : 'rgba(255,255,255,0.1)', boxShadow: panicActivated ? '0 0 60px rgba(239,68,68,0.5)' : '0 0 20px rgba(239,68,68,0.2)' }}>
              <AlertTriangle className={`h-20 w-20 ${panicActivated ? 'text-red-600 animate-bounce' : 'text-white'}`} />
            </motion.div>
          </div>
        </div>
        {panicActivated && (
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="mt-4 rounded-xl p-4" style={{ background: 'rgba(255,255,255,0.1)' }}>
            <p className="font-bold text-white text-lg">✅ Emergency Alert Activated!</p>
            <p className="text-sm mt-1" style={{ color: 'rgba(254,202,202,0.8)' }}>📍 Location shared • 🚓 Police notified (ETA: 3 mins) • 🚑 Ambulance on standby</p>
          </motion.div>
        )}
      </motion.div>

      {/* Emergency Contacts */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {emergencyContacts.map((contact) => {
          const Icon = contact.icon
          return (
            <motion.div key={contact.id} variants={itemAnim} whileHover={{ scale: 1.05, y: -5 }} className="p-5 cursor-pointer" style={glass} onClick={() => setSelectedEmergency(contact)}>
              <div className="rounded-xl p-4 mb-3" style={{ background: contact.gradient }}>
                <Icon className="h-8 w-8 text-white mb-2" />
                <p className="font-semibold text-white">{contact.type}</p>
              </div>
              <p className="text-3xl font-bold text-white mb-2">{contact.number}</p>
              <p className="text-sm mb-2" style={{ color: 'rgba(199,210,254,0.6)' }}>{contact.description}</p>
              <div className="flex items-center gap-2 text-xs mb-3" style={{ color: 'rgba(199,210,254,0.4)' }}>
                <Clock className="h-3 w-3" /><span>{contact.avgResponseTime}</span>
              </div>
              <motion.button whileHover={{ scale: 1.05 }} className="w-full py-2 rounded-xl font-semibold text-white" style={{ background: 'linear-gradient(135deg, #6366f1, #8b5cf6)', boxShadow: '0 4px 15px rgba(99,102,241,0.3)' }}>📞 Call Now</motion.button>
            </motion.div>
          )
        })}
      </div>

      {/* Nearby Services */}
      <motion.div variants={itemAnim} className="p-6" style={glass}>
        <h3 className="text-xl font-bold text-white mb-4 flex items-center"><MapPin className="h-6 w-6 mr-2" style={{ color: '#818cf8' }} />Nearby Emergency Services</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {nearbyEmergencyServices.map((service, index) => (
            <motion.div key={index} whileHover={{ scale: 1.02 }} className="rounded-xl p-4" style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '0.75rem' }}>
              <div className="flex items-start justify-between mb-3">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <h4 className="font-bold text-white">{service.name}</h4>
                    <span className="px-2 py-1 rounded-full text-xs font-semibold" style={{ background: 'rgba(99,102,241,0.2)', color: '#a5b4fc' }}>{service.type}</span>
                  </div>
                  <p className="text-sm" style={{ color: 'rgba(199,210,254,0.5)' }}>{service.address}</p>
                </div>
                <div className="text-right">
                  <div className="flex items-center gap-1 mb-1"><span>⭐</span><span className="font-semibold text-white">{service.rating}</span></div>
                  <p className="text-xs" style={{ color: 'rgba(199,210,254,0.4)' }}>{service.distance}</p>
                </div>
              </div>
              <div className="flex flex-wrap gap-2 mb-3">
                {service.facilities.map((f, idx) => (<span key={idx} className="px-2 py-1 rounded text-xs" style={{ background: 'rgba(255,255,255,0.06)', color: 'rgba(199,210,254,0.6)' }}>{f}</span>))}
              </div>
              <div className="flex gap-2">
                <motion.button whileHover={{ scale: 1.05 }} className="flex-1 py-2 rounded-xl font-semibold text-sm text-white" style={{ background: 'linear-gradient(135deg, #6366f1, #8b5cf6)' }}><Phone className="inline h-4 w-4 mr-1" />Call</motion.button>
                <motion.button whileHover={{ scale: 1.05 }} className="flex-1 py-2 rounded-xl font-semibold text-sm text-white" style={{ background: 'linear-gradient(135deg, #10b981, #34d399)' }}><Navigation className="inline h-4 w-4 mr-1" />Navigate</motion.button>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Embassy */}
      <motion.div variants={itemAnim} className="p-6" style={glass}>
        <h3 className="text-xl font-bold text-white mb-4">Embassy/Consulate Contacts</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {embassyContacts.map((embassy, index) => (
            <motion.div key={index} whileHover={{ scale: 1.03 }} className="rounded-xl p-4" style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '0.75rem' }}>
              <div className="flex items-center gap-2 mb-2">
                <span className="text-2xl">🏛️</span>
                <div><h4 className="font-bold text-white">{embassy.country}</h4><p className="text-xs" style={{ color: 'rgba(199,210,254,0.4)' }}>{embassy.city}</p></div>
              </div>
              <p className="font-mono font-semibold mb-2" style={{ color: '#a5b4fc' }}>{embassy.phone}</p>
              <motion.button whileHover={{ scale: 1.05 }} className="w-full py-2 rounded-xl font-semibold text-sm text-white" style={{ background: 'rgba(255,255,255,0.1)', border: '1px solid rgba(255,255,255,0.15)' }}>Call Embassy</motion.button>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Checklist */}
      <motion.div variants={itemAnim} className="p-6" style={{ ...glass, background: 'rgba(250,204,21,0.06)', border: '1px solid rgba(250,204,21,0.15)' }}>
        <h3 className="text-xl font-bold text-white mb-4">⚠️ Emergency Preparedness Checklist</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {['Tourist ID card saved on phone', 'Emergency contacts programmed', 'Location services enabled', 'Phone fully charged', 'Know your hotel address', 'Know your blood group', 'Travel insurance details accessible', 'Embassy contact number saved'].map((item, index) => (
            <div key={index} className="flex items-center gap-2 p-3 rounded-xl" style={{ background: 'rgba(255,255,255,0.04)' }}>
              <input type="checkbox" className="h-5 w-5 accent-indigo-500" />
              <span className="text-white">{item}</span>
            </div>
          ))}
        </div>
      </motion.div>

      {/* Modal */}
      {selectedEmergency && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="fixed inset-0 flex items-center justify-center z-50 p-4" style={{ background: 'rgba(0,0,0,0.7)', backdropFilter: 'blur(8px)' }}>
          <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="max-w-lg w-full rounded-2xl p-6" style={{ background: 'linear-gradient(135deg, #1a1a4e, #302b63)', border: '1px solid rgba(255,255,255,0.15)', boxShadow: '0 25px 50px rgba(0,0,0,0.5)' }}>
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-2xl font-bold text-white">{selectedEmergency.type}</h3>
              <button onClick={() => setSelectedEmergency(null)} className="text-white/50 hover:text-white text-2xl">×</button>
            </div>
            <div className="space-y-4">
              <div className="rounded-xl p-4" style={{ background: 'rgba(99,102,241,0.15)' }}>
                <p className="text-sm" style={{ color: 'rgba(199,210,254,0.5)' }}>Emergency Number</p>
                <p className="text-4xl font-bold" style={{ color: '#818cf8' }}>{selectedEmergency.number}</p>
              </div>
              <div><p className="text-sm" style={{ color: 'rgba(199,210,254,0.5)' }}>Description</p><p className="text-white">{selectedEmergency.description}</p></div>
              <div className="grid grid-cols-2 gap-4">
                <div><p className="text-sm" style={{ color: 'rgba(199,210,254,0.5)' }}>Response Time</p><p className="font-semibold text-white">{selectedEmergency.avgResponseTime}</p></div>
                <div><p className="text-sm" style={{ color: 'rgba(199,210,254,0.5)' }}>Availability</p><p className="font-semibold text-white">{selectedEmergency.available247 ? '24/7' : 'Limited'}</p></div>
              </div>
              <motion.button whileHover={{ scale: 1.03 }} className="w-full py-3 rounded-xl font-bold text-lg text-white" style={{ background: 'linear-gradient(135deg, #6366f1, #8b5cf6)', boxShadow: '0 4px 20px rgba(99,102,241,0.4)' }}>📞 Call {selectedEmergency.number} Now</motion.button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </motion.div>
  )
}

export default EmergencyHelp