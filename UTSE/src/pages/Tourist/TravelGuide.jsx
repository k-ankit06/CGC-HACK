import { MapPin, Star, Camera, Utensils, Hotel, Clock, DollarSign, Info } from 'lucide-react'
import { motion } from 'framer-motion'

const glass = { background: 'rgba(255,255,255,0.06)', backdropFilter: 'blur(24px)', WebkitBackdropFilter: 'blur(24px)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '1rem', boxShadow: '0 8px 32px rgba(0,0,0,0.3)' }
const cAnim = { hidden: { opacity: 0 }, visible: { opacity: 1, transition: { staggerChildren: 0.08 } } }
const iAnim = { hidden: { opacity: 0, y: 30 }, visible: { opacity: 1, y: 0, transition: { duration: 0.5 } } }

const TravelGuide = () => {
  const spots = [
    { name: 'Taj Mahal', location: 'Agra', rating: 4.8, image: '🕌', bestTime: 'Oct-Mar', entryFee: '₹50/$20', timings: '6AM-7PM', timeNeeded: '2-3h', description: 'One of the Seven Wonders of the World', tips: ['Visit early morning', 'Book tickets online', 'Sunset from Mehtab Bagh'], safetyScore: 95 },
    { name: 'Red Fort', location: 'Delhi', rating: 4.6, image: '🏰', bestTime: 'Oct-Mar', entryFee: '₹35/₹500', timings: '9:30AM-4:30PM', timeNeeded: '2-3h', description: 'Historic fortified palace of Mughal emperors', tips: ['Light & Sound show', 'Comfortable shoes', 'Avoid weekends'], safetyScore: 88 },
    { name: 'Gateway of India', location: 'Mumbai', rating: 4.5, image: '🚪', bestTime: 'Oct-Feb', entryFee: 'Free', timings: '24 hours', timeNeeded: '1-2h', description: 'Iconic monument overlooking Arabian Sea', tips: ['Visit at sunset', 'Ferry to Elephanta Caves', 'Watch belongings'], safetyScore: 82 }
  ]
  const cuisine = [
    { dish: 'Butter Chicken', desc: 'Creamy tomato curry', origin: 'North India', price: '₹300-500', spice: 'Medium', veg: false },
    { dish: 'Biryani', desc: 'Fragrant rice dish', origin: 'Hyderabad', price: '₹250-400', spice: 'Medium-High', veg: false },
    { dish: 'Masala Dosa', desc: 'Crispy rice crepe', origin: 'South India', price: '₹60-150', spice: 'Low-Medium', veg: true },
    { dish: 'Paneer Tikka', desc: 'Grilled cottage cheese', origin: 'North India', price: '₹200-350', spice: 'Medium', veg: true }
  ]
  const cultural = [
    { title: 'Namaste 🙏', desc: 'Traditional greeting with palms together' },
    { title: 'Shoes Off 👞', desc: 'Remove shoes in temples and homes' },
    { title: 'Right Hand ✋', desc: 'Use right hand for eating and giving' },
    { title: 'Dress Modestly 👗', desc: 'Cover shoulders/knees at religious places' },
    { title: 'Photography 📸', desc: 'Ask permission before photographing' },
    { title: 'Bargaining 💰', desc: 'Haggling is common, pay 50-70% of ask' }
  ]
  const tips = ['Best time: October to March', 'Download offline maps', 'Carry small cash denominations', 'Try food from busy stalls', 'Learn basic Hindi phrases', 'Use Uber/Ola for rides', 'Drink bottled water only', 'Respect local customs']

  return (
    <motion.div variants={cAnim} initial="hidden" animate="visible" className="space-y-6">
      <motion.div variants={iAnim}>
        <h2 className="text-3xl font-bold text-white" style={{ textShadow: '0 0 30px rgba(99,102,241,0.4)' }}>Travel Guide</h2>
        <p className="mt-1" style={{ color: 'rgba(199,210,254,0.6)' }}>Explore India's rich culture, cuisine, and heritage</p>
      </motion.div>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[{ icon: MapPin, l: 'Tourist Spots', v: '50+', g: 'linear-gradient(135deg,#6366f1,#8b5cf6)' }, { icon: Utensils, l: 'Local Dishes', v: '200+', g: 'linear-gradient(135deg,#10b981,#34d399)' }, { icon: Hotel, l: 'Hotels', v: '1000+', g: 'linear-gradient(135deg,#f59e0b,#fbbf24)' }, { icon: Camera, l: 'UNESCO Sites', v: '38', g: 'linear-gradient(135deg,#a855f7,#c084fc)' }].map((s, i) => (
          <motion.div key={i} variants={iAnim} whileHover={{ scale: 1.08, y: -5 }} className="p-5 text-center text-white rounded-2xl" style={{ background: s.g, boxShadow: '0 8px 30px rgba(0,0,0,0.3)' }}>
            <s.icon className="h-8 w-8 mx-auto mb-2" /><p className="text-2xl font-bold">{s.v}</p><p className="text-sm opacity-80">{s.l}</p>
          </motion.div>
        ))}
      </div>
      <motion.div variants={iAnim} className="p-6" style={glass}>
        <h3 className="text-xl font-bold text-white mb-4 flex items-center"><MapPin className="h-6 w-6 mr-2" style={{ color: '#818cf8' }} />Must-Visit Destinations</h3>
        <div className="space-y-6">
          {spots.map((spot, index) => (
            <motion.div key={index} whileHover={{ scale: 1.01 }} className="rounded-xl p-6" style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)' }}>
              <div className="flex items-start gap-4">
                <div className="text-6xl">{spot.image}</div>
                <div className="flex-1">
                  <div className="flex items-start justify-between mb-2">
                    <div><h4 className="text-2xl font-bold text-white">{spot.name}</h4><p style={{ color: 'rgba(199,210,254,0.5)' }}>{spot.location}</p></div>
                    <div className="text-right">
                      <div className="flex items-center gap-1 mb-1"><Star className="h-5 w-5 fill-yellow-400" style={{ color: '#facc15' }} /><span className="font-bold text-lg text-white">{spot.rating}</span></div>
                      <span className="px-3 py-1 rounded-full text-xs font-semibold" style={{ background: spot.safetyScore >= 90 ? 'rgba(74,222,128,0.15)' : 'rgba(250,204,21,0.15)', color: spot.safetyScore >= 90 ? '#4ade80' : '#facc15' }}>Safety: {spot.safetyScore}%</span>
                    </div>
                  </div>
                  <p className="text-white mb-4">{spot.description}</p>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-4">
                    {[{ l: 'Timings', v: spot.timings }, { l: 'Entry Fee', v: spot.entryFee }, { l: 'Duration', v: spot.timeNeeded }, { l: 'Best Time', v: spot.bestTime }].map((d, i) => (
                      <div key={i} className="p-3 rounded-lg" style={{ background: 'rgba(255,255,255,0.04)' }}>
                        <p className="text-xs mb-1" style={{ color: 'rgba(199,210,254,0.4)' }}>{d.l}</p><p className="text-xs font-semibold text-white">{d.v}</p>
                      </div>
                    ))}
                  </div>
                  <div className="rounded-lg p-4" style={{ background: 'rgba(99,102,241,0.08)' }}>
                    <p className="font-semibold text-white mb-2">💡 Tips:</p>
                    <ul className="space-y-1">{spot.tips.map((t, idx) => (<li key={idx} className="text-sm flex items-start gap-2 text-white"><span style={{ color: '#818cf8' }}>•</span>{t}</li>))}</ul>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
      <motion.div variants={iAnim} className="p-6" style={glass}>
        <h3 className="text-xl font-bold text-white mb-4 flex items-center"><Utensils className="h-6 w-6 mr-2" style={{ color: '#818cf8' }} />Must-Try Cuisine</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {cuisine.map((f, i) => (
            <motion.div key={i} whileHover={{ scale: 1.03 }} className="rounded-xl p-4" style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)' }}>
              <h4 className="font-bold text-lg text-white flex items-center gap-2 flex-wrap">{f.dish}
                <span className="text-xs px-2 py-1 rounded-full" style={{ background: 'rgba(239,68,68,0.15)', color: '#fca5a5' }}>Must Try!</span>
                {f.veg && <span className="text-xs px-2 py-1 rounded-full" style={{ background: 'rgba(74,222,128,0.15)', color: '#6ee7b7' }}>🌱 Veg</span>}
              </h4>
              <p className="text-xs mb-1" style={{ color: 'rgba(199,210,254,0.4)' }}>{f.origin}</p>
              <p className="text-sm mb-3" style={{ color: 'rgba(199,210,254,0.6)' }}>{f.desc}</p>
              <div className="flex justify-between items-center">
                <span className="font-bold" style={{ color: '#a5b4fc' }}>{f.price}</span>
                <span className="px-2 py-1 rounded text-xs font-semibold" style={{ background: 'rgba(250,204,21,0.15)', color: '#fde68a' }}>🌶️ {f.spice}</span>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
      <motion.div variants={iAnim} className="p-6" style={{ ...glass, background: 'rgba(168,85,247,0.06)', border: '1px solid rgba(168,85,247,0.15)' }}>
        <h3 className="text-xl font-bold text-white mb-4">🙏 Cultural Etiquette</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {cultural.map((t, i) => (<div key={i} className="p-4 rounded-xl" style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)' }}><h4 className="font-bold text-white mb-2">{t.title}</h4><p className="text-sm" style={{ color: 'rgba(199,210,254,0.6)' }}>{t.desc}</p></div>))}
        </div>
      </motion.div>
      <motion.div variants={iAnim} className="p-6" style={glass}>
        <h3 className="text-xl font-bold text-white mb-4">✈️ Essential Tips</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {tips.map((t, i) => (<div key={i} className="flex items-start gap-2 p-3 rounded-xl" style={{ background: 'rgba(255,255,255,0.04)' }}><div className="h-2 w-2 rounded-full mt-2" style={{ background: '#818cf8' }} /><p className="text-white">{t}</p></div>))}
        </div>
      </motion.div>
      <motion.div variants={iAnim} className="p-6" style={{ ...glass, background: 'linear-gradient(135deg,rgba(245,158,11,0.15),rgba(217,119,6,0.05))' }}>
        <h3 className="text-xl font-bold text-white mb-4">🌤️ Best Time to Visit</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {[{ t: 'Winter (Oct-Mar)', d: 'Pleasant. Best for sightseeing.' }, { t: 'Summer (Apr-Jun)', d: 'Hot. Visit hill stations.' }, { t: 'Monsoon (Jul-Sep)', d: 'Rainy. Beautiful landscapes.' }].map((s, i) => (
            <div key={i} className="rounded-xl p-4" style={{ background: 'rgba(255,255,255,0.06)' }}><h4 className="font-bold text-white mb-2">{s.t}</h4><p className="text-sm" style={{ color: 'rgba(254,243,199,0.6)' }}>{s.d}</p></div>
          ))}
        </div>
      </motion.div>
    </motion.div>
  )
}

export default TravelGuide