import { Shield, AlertTriangle, Phone, MapPin, Heart, Sun, Droplet, Wind, Users } from 'lucide-react'
import { motion } from 'framer-motion'

const glass = { background: 'rgba(255,255,255,0.06)', backdropFilter: 'blur(24px)', WebkitBackdropFilter: 'blur(24px)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '1rem', boxShadow: '0 8px 32px rgba(0,0,0,0.3), inset 0 1px 0 rgba(255,255,255,0.08)' }
const containerAnim = { hidden: { opacity: 0 }, visible: { opacity: 1, transition: { staggerChildren: 0.08 } } }
const itemAnim = { hidden: { opacity: 0, y: 30 }, visible: { opacity: 1, y: 0, transition: { duration: 0.5 } } }

const SafetyInfo = () => {
  const safetyTips = [
    { category: 'General Safety', icon: Shield, gradient: 'linear-gradient(135deg, #6366f1, #8b5cf6)', tips: ['Always keep your Tourist ID card and QR code accessible', 'Share your itinerary with family or friends', 'Keep copies of important documents', 'Avoid carrying large amounts of cash', 'Use hotel safes for valuables', 'Stay aware of your surroundings'] },
    { category: 'Health & Medical', icon: Heart, gradient: 'linear-gradient(135deg, #ef4444, #f87171)', tips: ['Drink only bottled or purified water', 'Carry necessary medications with prescriptions', 'Get travel insurance before your trip', 'Know your blood group and allergies', 'Avoid street food if sensitive stomach', 'Keep emergency medical contacts handy'] },
    { category: 'Weather Precautions', icon: Sun, gradient: 'linear-gradient(135deg, #f59e0b, #fbbf24)', tips: ['Stay hydrated in hot weather (3-4 liters daily)', 'Use sunscreen (SPF 30+) and wear hats', 'Avoid outdoor activities during peak heat (12-3 PM)', 'Carry umbrella for rain and sun protection', 'Wear light, breathable clothing', 'Check weather forecasts daily'] },
    { category: 'Travel Safety', icon: MapPin, gradient: 'linear-gradient(135deg, #10b981, #34d399)', tips: ['Use authorized taxi services or ride-sharing apps', 'Avoid traveling alone late at night', 'Keep your phone charged at all times', 'Learn basic local phrases for emergencies', 'Inform hotel staff about your daily plans', 'Use GPS tracking and share location'] },
    { category: 'Cultural Awareness', icon: Users, gradient: 'linear-gradient(135deg, #a855f7, #c084fc)', tips: ['Dress modestly when visiting religious places', 'Remove shoes before entering temples and homes', 'Ask permission before photographing people', 'Respect local customs and traditions', 'Avoid public displays of affection', 'Learn about local festivals and holidays'] }
  ]

  const emergencyNumbers = [
    { service: 'Police Emergency', number: '100', icon: '🚓' }, { service: 'Ambulance', number: '102', icon: '🚑' },
    { service: 'Fire Brigade', number: '101', icon: '🚒' }, { service: 'Women Helpline', number: '1091', icon: '👮‍♀️' },
    { service: 'Tourist Helpline', number: '1363', icon: '🏛️' }, { service: 'Child Helpline', number: '1098', icon: '👶' },
    { service: 'Disaster Management', number: '108', icon: '⚠️' }, { service: 'Senior Citizen Helpline', number: '1091', icon: '👴' }
  ]

  const dosDonts = {
    dos: ['Do carry your identification documents always', 'Do inform local police about your stay', 'Do use authorized money exchange services', 'Do bargain politely at local markets', 'Do try local cuisine at reputable restaurants', 'Do learn basic Hindi phrases', 'Do respect queue systems', 'Do tip service staff appropriately (10-15%)'],
    donts: ["Don't accept food/drinks from strangers", "Don't share personal details with unknown people", "Don't use unlicensed tour guides", "Don't venture into isolated areas alone", "Don't leave belongings unattended", "Don't take photographs of military installations", "Don't give money to beggars (donate to NGOs instead)", "Don't argue with authorities"]
  }

  const handleCall = (service, number) => { alert(`Simulating call to ${service} at number ${number}...`) }

  return (
    <motion.div variants={containerAnim} initial="hidden" animate="visible" className="space-y-6">
      <motion.div variants={itemAnim}>
        <h2 className="text-3xl font-bold text-white" style={{ textShadow: '0 0 30px rgba(99,102,241,0.4)' }}>Safety Information</h2>
        <p className="mt-1" style={{ color: 'rgba(199,210,254,0.6)' }}>Essential tips and guidelines for a safe journey in India</p>
      </motion.div>

      {/* Emergency Numbers */}
      <motion.div variants={itemAnim} className="p-6" style={{ ...glass, background: 'linear-gradient(135deg, rgba(239,68,68,0.2), rgba(220,38,38,0.08))', border: '1px solid rgba(239,68,68,0.25)' }}>
        <h3 className="text-2xl font-bold text-white mb-4 flex items-center"><Phone className="h-6 w-6 mr-3" />Emergency Contact Numbers</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {emergencyNumbers.map((contact, index) => (
            <motion.div key={index} whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} onClick={() => handleCall(contact.service, contact.number)}
              className="rounded-xl p-4 text-center cursor-pointer" style={{ background: 'rgba(255,255,255,0.08)', border: '1px solid rgba(255,255,255,0.1)' }}>
              <div className="text-4xl mb-2">{contact.icon}</div>
              <p className="text-sm font-semibold mb-1" style={{ color: 'rgba(254,202,202,0.7)' }}>{contact.service}</p>
              <p className="text-2xl font-bold text-white font-mono">{contact.number}</p>
            </motion.div>
          ))}
        </div>
        <div className="mt-4 rounded-xl p-3" style={{ background: 'rgba(255,255,255,0.06)' }}>
          <p className="text-sm" style={{ color: 'rgba(254,202,202,0.6)' }}><strong className="text-white">Note:</strong> All emergency numbers are toll-free and available 24/7.</p>
        </div>
      </motion.div>

      {/* Safety Tips */}
      {safetyTips.map((category, index) => {
        const Icon = category.icon
        return (
          <motion.div key={index} variants={itemAnim} className="p-6" style={glass}>
            <div className="flex items-center gap-3 mb-4">
              <div className="p-3 rounded-xl" style={{ background: category.gradient }}><Icon className="h-6 w-6 text-white" /></div>
              <h3 className="text-xl font-bold text-white">{category.category}</h3>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {category.tips.map((tip, tipIndex) => (
                <motion.div key={tipIndex} whileHover={{ x: 5 }} className="flex items-start gap-2 p-3 rounded-xl" style={{ background: 'rgba(255,255,255,0.04)' }}>
                  <div className="h-2 w-2 rounded-full mt-2 flex-shrink-0" style={{ background: '#818cf8' }} />
                  <p className="text-white">{tip}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )
      })}

      {/* Do's & Don'ts */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <motion.div variants={itemAnim} className="p-6" style={{ ...glass, borderLeft: '4px solid #4ade80' }}>
          <h3 className="text-xl font-bold mb-4 flex items-center" style={{ color: '#4ade80' }}>✅ Do's - Follow These</h3>
          <ul className="space-y-3">
            {dosDonts.dos.map((item, index) => (<li key={index} className="flex items-start gap-2"><span className="font-bold mt-1" style={{ color: '#4ade80' }}>✓</span><span className="text-white">{item}</span></li>))}
          </ul>
        </motion.div>
        <motion.div variants={itemAnim} className="p-6" style={{ ...glass, borderLeft: '4px solid #f87171' }}>
          <h3 className="text-xl font-bold mb-4 flex items-center" style={{ color: '#f87171' }}>❌ Don'ts - Avoid These</h3>
          <ul className="space-y-3">
            {dosDonts.donts.map((item, index) => (<li key={index} className="flex items-start gap-2"><span className="font-bold mt-1" style={{ color: '#f87171' }}>✗</span><span className="text-white">{item}</span></li>))}
          </ul>
        </motion.div>
      </div>

      {/* Weather */}
      <motion.div variants={itemAnim} className="p-6" style={{ ...glass, background: 'linear-gradient(135deg, rgba(245,158,11,0.2), rgba(217,119,6,0.08))', border: '1px solid rgba(245,158,11,0.25)' }}>
        <h3 className="text-xl font-bold text-white mb-4 flex items-center"><Sun className="h-6 w-6 mr-2" />Current Weather Safety Alert</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {[{ label: 'Temperature', value: '42°C', sub: 'Extreme Heat Warning', icon: Sun }, { label: 'Humidity', value: '65%', sub: 'Moderate Humidity', icon: Droplet }, { label: 'Air Quality', value: 'AQI 85', sub: 'Moderate - Limit outdoor', icon: Wind }].map((w, i) => (
            <div key={i} className="rounded-xl p-4" style={{ background: 'rgba(255,255,255,0.08)' }}>
              <div className="flex items-center justify-between mb-2"><span style={{ color: 'rgba(254,243,199,0.7)' }}>{w.label}</span><w.icon className="h-5 w-5 text-white" /></div>
              <p className="text-3xl font-bold text-white">{w.value}</p><p className="text-sm mt-1" style={{ color: 'rgba(254,243,199,0.6)' }}>{w.sub}</p>
            </div>
          ))}
        </div>
      </motion.div>

      {/* Documents Checklist */}
      <motion.div variants={itemAnim} className="p-6" style={glass}>
        <h3 className="text-xl font-bold text-white mb-4">Essential Documents Checklist</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {['Valid Passport', 'Valid Indian Visa', 'Tourist ID Card & QR Code', 'Travel Insurance Documents', 'Hotel Booking Confirmations', 'Return Flight Tickets', 'Emergency Contact List', 'Medical Prescriptions'].map((doc, index) => (
            <div key={index} className="flex items-center gap-2 p-3 rounded-xl" style={{ background: 'rgba(255,255,255,0.04)' }}>
              <input type="checkbox" className="h-5 w-5 accent-indigo-500" /><span className="text-white">{doc}</span>
            </div>
          ))}
        </div>
      </motion.div>

      {/* Quick Tips */}
      <motion.div variants={itemAnim} className="p-6" style={{ ...glass, background: 'rgba(99,102,241,0.08)', border: '1px solid rgba(99,102,241,0.2)' }}>
        <h4 className="font-bold text-white mb-3">💡 Quick Safety Tips</h4>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {[{ t: '🚨 In Emergency', d: 'Press the SOS button on your dashboard or call 100 immediately' }, { t: '📱 Stay Connected', d: 'Keep your phone charged and enable location services' }, { t: '🗺️ Plan Ahead', d: 'Check safe routes and safety scores before visiting new locations' }].map((tip, i) => (
            <div key={i}><p className="font-semibold text-white mb-1">{tip.t}</p><p style={{ color: 'rgba(199,210,254,0.6)' }}>{tip.d}</p></div>
          ))}
        </div>
      </motion.div>
    </motion.div>
  )
}

export default SafetyInfo