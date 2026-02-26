import { useState, useEffect } from 'react'
import { CreditCard, QrCode, Search, CheckCircle, XCircle } from 'lucide-react'
import QRCode from 'qrcode.react'
import { motion } from 'framer-motion'

const glass = { background: 'rgba(255,255,255,0.06)', backdropFilter: 'blur(24px)', WebkitBackdropFilter: 'blur(24px)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '1rem', boxShadow: '0 8px 32px rgba(0,0,0,0.3)' }
const cAnim = { hidden: { opacity: 0 }, visible: { opacity: 1, transition: { staggerChildren: 0.08 } } }
const iAnim = { hidden: { opacity: 0, y: 30 }, visible: { opacity: 1, y: 0, transition: { duration: 0.5 } } }

const SmartIDSystem = () => {
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCard, setSelectedCard] = useState(null)
  const [touristCards, setTouristCards] = useState([])

  useEffect(() => {
    const allTourists = JSON.parse(localStorage.getItem('allTourists') || '[]')
    setTouristCards(allTourists.map(tourist => ({
      id: tourist.touristId, name: tourist.fullName, country: tourist.country, passport: tourist.passportNumber,
      aadhaar: tourist.aadhaarNumber, touristType: tourist.touristType, phone: tourist.phone, email: tourist.email,
      emergencyContact: tourist.emergencyContactPhone, emergencyContactName: tourist.emergencyContactName,
      hotel: tourist.hotelName, checkIn: tourist.checkInDate, checkOut: tourist.checkOutDate,
      status: 'Active', photo: '👤', verified: true
    })))
  }, [])

  const filteredCards = touristCards.filter(card => {
    const s = searchTerm.toLowerCase()
    return (card.name && card.name.toLowerCase().includes(s)) || (card.id && card.id.toLowerCase().includes(s)) || (card.passport && card.passport.toLowerCase().includes(s)) || (card.aadhaar && card.aadhaar.toLowerCase().includes(s))
  })

  const verificationUrl = selectedCard ? `${window.location.origin}/verify/${selectedCard.id}` : ''

  return (
    <motion.div variants={cAnim} initial="hidden" animate="visible" className="space-y-6">
      <motion.div variants={iAnim}>
        <h2 className="text-3xl font-bold text-white" style={{ textShadow: '0 0 30px rgba(6,182,212,0.4)' }}>Smart Tourist ID System</h2>
        <p className="mt-1" style={{ color: 'rgba(153,246,228,0.6)' }}>Digital tourist cards for all registered travellers</p>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {[{ l: 'Total Cards', v: touristCards.length, g: 'linear-gradient(135deg,#06b6d4,#0891b2)' }, { l: 'Active', v: touristCards.filter(c => c.status === 'Active').length, g: 'linear-gradient(135deg,#10b981,#059669)' }, { l: 'Pending', v: 0, g: 'linear-gradient(135deg,#f59e0b,#d97706)' }, { l: 'Expired', v: 0, g: 'linear-gradient(135deg,#ef4444,#dc2626)' }].map((s, i) => (
          <motion.div key={i} variants={iAnim} whileHover={{ scale: 1.05, y: -5 }} className="p-5 rounded-2xl text-white" style={{ background: s.g, boxShadow: '0 8px 30px rgba(0,0,0,0.3)' }}>
            <p className="text-sm opacity-80">{s.l}</p><p className="text-4xl font-bold mt-1">{s.v}</p>
          </motion.div>
        ))}
      </div>

      {/* Search */}
      <motion.div variants={iAnim} className="p-4" style={glass}>
        <div className="flex items-center gap-2 px-3 py-2 rounded-xl" style={{ background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.12)' }}>
          <Search className="h-5 w-5" style={{ color: 'rgba(153,246,228,0.4)' }} />
          <input type="text" placeholder="Search by ID, Name, or Passport/Aadhaar..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} style={{ background: 'transparent', border: 'none', color: '#fff', outline: 'none', flex: 1 }} />
        </div>
      </motion.div>

      {/* Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredCards.map((card) => (
          <motion.div key={card.id} variants={iAnim} whileHover={{ scale: 1.03, y: -5 }} className="p-6" style={{ ...glass, border: '2px solid rgba(255,255,255,0.06)' }}>
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className="h-16 w-16 rounded-full flex items-center justify-center text-3xl text-white" style={{ background: 'linear-gradient(135deg, #06b6d4, #0891b2)' }}>{card.photo}</div>
                <div><h3 className="font-bold text-lg text-white">{card.name}</h3><p className="text-sm" style={{ color: 'rgba(153,246,228,0.5)' }}>{card.country}</p><p className="text-xs font-mono" style={{ color: '#22d3ee' }}>{card.id}</p></div>
              </div>
              {card.verified ? <CheckCircle className="h-6 w-6" style={{ color: '#10b981' }} /> : <XCircle className="h-6 w-6" style={{ color: '#f59e0b' }} />}
            </div>
            <div className="space-y-2 mb-4 text-sm">
              {[{ l: card.touristType === 'domestic' ? 'Aadhaar' : 'Passport', v: card.passport || card.aadhaar }, { l: 'Phone', v: card.phone }].map((d, i) => (
                <div key={i} className="flex justify-between"><span style={{ color: 'rgba(153,246,228,0.4)' }}>{d.l}:</span><span className="font-semibold text-white">{d.v}</span></div>
              ))}
              <div className="flex justify-between"><span style={{ color: 'rgba(153,246,228,0.4)' }}>Status:</span><span className="px-2 py-1 rounded-full text-xs font-semibold" style={{ background: 'rgba(16,185,129,0.15)', color: '#6ee7b7' }}>{card.status}</span></div>
            </div>
            <motion.button whileHover={{ scale: 1.03 }} onClick={() => setSelectedCard(card)} className="w-full py-2 rounded-xl font-semibold text-white" style={{ background: 'linear-gradient(135deg, #06b6d4, #0891b2)' }}><QrCode className="inline h-4 w-4 mr-2" />View Digital Card</motion.button>
          </motion.div>
        ))}
        {filteredCards.length === 0 && <p className="text-center md:col-span-3" style={{ color: 'rgba(153,246,228,0.5)' }}>No registered tourists found.</p>}
      </div>

      {/* Modal */}
      {selectedCard && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="fixed inset-0 flex items-center justify-center z-50 p-4" style={{ background: 'rgba(0,0,0,0.7)', backdropFilter: 'blur(8px)' }}>
          <motion.div initial={{ scale: 0.9 }} animate={{ scale: 1 }} className="max-w-2xl w-full rounded-2xl overflow-hidden" style={{ background: 'linear-gradient(135deg, #0a0a1a, #16213e)', border: '1px solid rgba(255,255,255,0.15)', boxShadow: '0 25px 50px rgba(0,0,0,0.5)' }}>
            <div className="p-6">
              <div className="flex items-center justify-between mb-6"><h3 className="text-2xl font-bold text-white">Smart Tourist ID Card</h3><button onClick={() => setSelectedCard(null)} className="text-white/50 hover:text-white text-2xl">×</button></div>
              {/* ID Card */}
              <div className="rounded-2xl p-8 text-white mb-6" style={{ background: 'linear-gradient(135deg, #06b6d4, #0e7490)', boxShadow: '0 15px 40px rgba(6,182,212,0.3)' }}>
                <div className="flex items-start justify-between mb-6"><div><h4 className="text-2xl font-bold">Digital Tourist Card</h4></div><CreditCard className="h-12 w-12 opacity-40" /></div>
                <div className="flex gap-6 mb-6">
                  <div className="h-24 w-24 bg-white rounded-lg flex items-center justify-center text-6xl" style={{ color: '#0e7490' }}>{selectedCard.photo}</div>
                  <div className="flex-1">
                    <p className="text-2xl font-bold mb-1">{selectedCard.name}</p><p className="opacity-80 mb-1">{selectedCard.country}</p><p className="text-sm font-mono opacity-60">{selectedCard.id}</p>
                    <div className="mt-2 flex items-center gap-2">
                      {selectedCard.verified && <span className="px-2 py-1 rounded-full text-xs font-semibold flex items-center gap-1" style={{ background: 'rgba(16,185,129,0.3)' }}><CheckCircle className="h-3 w-3" />Verified</span>}
                      <span className="px-2 py-1 rounded-full text-xs font-semibold" style={{ background: 'rgba(255,255,255,0.15)' }}>{selectedCard.status}</span>
                    </div>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4 mb-6">
                  {[{ l: selectedCard.touristType === 'domestic' ? 'Aadhaar' : 'Passport', v: selectedCard.passport || selectedCard.aadhaar }, { l: 'Phone', v: selectedCard.phone }, { l: 'Check-in', v: selectedCard.checkIn }, { l: 'Check-out', v: selectedCard.checkOut }].map((d, i) => (
                    <div key={i}><p className="text-xs opacity-60 mb-1">{d.l}</p><p className="font-semibold">{d.v}</p></div>
                  ))}
                </div>
                <div className="rounded-lg p-3" style={{ background: 'rgba(255,255,255,0.1)' }}><p className="text-xs opacity-60 mb-1">Emergency Contact</p><p className="font-semibold text-lg">{selectedCard.emergencyContactName} ({selectedCard.emergencyContact})</p></div>
              </div>
              {/* QR */}
              <div className="rounded-xl p-6 mb-4" style={{ background: 'rgba(255,255,255,0.04)' }}>
                <div className="flex items-center justify-between">
                  <div><h5 className="font-bold text-lg text-white mb-1">Digital QR Code</h5><p className="text-sm" style={{ color: 'rgba(153,246,228,0.5)' }}>Scan for instant verification</p></div>
                  <div className="bg-white p-4 rounded-lg"><QRCode value={verificationUrl} size={150} level="H" includeMargin={true} /></div>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </motion.div>
  )
}

export default SmartIDSystem