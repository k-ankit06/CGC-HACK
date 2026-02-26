import { useState, useEffect } from 'react'
import { Search, MapPin, Phone, Mail, Calendar, Globe, Eye, Users } from 'lucide-react'
import { motion } from 'framer-motion'

const glass = { background: 'rgba(255,255,255,0.06)', backdropFilter: 'blur(24px)', WebkitBackdropFilter: 'blur(24px)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '1rem', boxShadow: '0 8px 32px rgba(0,0,0,0.3)' }
const cAnim = { hidden: { opacity: 0 }, visible: { opacity: 1, transition: { staggerChildren: 0.08 } } }
const iAnim = { hidden: { opacity: 0, y: 30 }, visible: { opacity: 1, y: 0, transition: { duration: 0.5 } } }

const TouristMonitoring = () => {
  const [searchTerm, setSearchTerm] = useState('')
  const [filterStatus, setFilterStatus] = useState('all')
  const [selectedTourist, setSelectedTourist] = useState(null)
  const [tourists, setTourists] = useState([])

  useEffect(() => {
    const storedData = localStorage.getItem('allTourists')
    const allTouristGroups = storedData ? JSON.parse(storedData) : []
    let flatList = []
    allTouristGroups.forEach(group => {
      if (!group.group) group.group = []
      flatList.push({ ...group, isGroupLeader: true, groupSize: group.group.length })
      if (group.group.length > 0) group.group.forEach(member => { flatList.push({ ...member, isGroupLeader: false, leaderId: group.touristId, leaderName: group.fullName }) })
    })
    setTourists(flatList.map(t => ({ ...t, status: 'safe', safetyScore: Math.floor(Math.random() * 31) + 70, currentLocation: 'Taj Mahal, Agra' })))
  }, [])

  const filteredTourists = tourists.filter(tourist => {
    const s = searchTerm.toLowerCase()
    const matchesSearch = (tourist.fullName && tourist.fullName.toLowerCase().includes(s)) || (tourist.passportNumber && tourist.passportNumber.toLowerCase().includes(s)) || (tourist.aadhaarNumber && tourist.aadhaarNumber.toLowerCase().includes(s)) || (tourist.country && tourist.country.toLowerCase().includes(s))
    return matchesSearch && (filterStatus === 'all' || tourist.status === filterStatus)
  })

  return (
    <motion.div variants={cAnim} initial="hidden" animate="visible" className="space-y-6">
      <motion.div variants={iAnim}>
        <h2 className="text-3xl font-bold text-white" style={{ textShadow: '0 0 30px rgba(6,182,212,0.4)' }}>Tourist Monitoring</h2>
        <p className="mt-1" style={{ color: 'rgba(153,246,228,0.6)' }}>Real-time tracking of all registered tourists</p>
      </motion.div>

      {/* Search & Filter */}
      <motion.div variants={iAnim} className="p-4" style={glass}>
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1 flex items-center gap-2 px-3 py-2 rounded-xl" style={{ background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.12)' }}>
            <Search className="h-5 w-5" style={{ color: 'rgba(153,246,228,0.4)' }} />
            <input type="text" placeholder="Search by name, passport, or country..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} style={{ background: 'transparent', border: 'none', color: '#fff', outline: 'none', flex: 1 }} />
          </div>
          <div className="flex gap-2">
            {[{ v: 'all', l: `All (${tourists.length})`, bg: '#06b6d4' }, { v: 'safe', l: 'Safe', bg: '#10b981' }, { v: 'warning', l: 'Warning', bg: '#f59e0b' }].map(f => (
              <motion.button key={f.v} whileHover={{ scale: 1.05 }} onClick={() => setFilterStatus(f.v)} className="px-4 py-2 rounded-xl font-medium transition-colors text-white text-sm" style={{ background: filterStatus === f.v ? f.bg : 'rgba(255,255,255,0.06)', border: `1px solid ${filterStatus === f.v ? f.bg : 'rgba(255,255,255,0.1)'}` }}>{f.l}</motion.button>
            ))}
          </div>
        </div>
      </motion.div>

      {/* Tourist List */}
      <motion.div className="grid grid-cols-1 gap-4" variants={cAnim} initial="hidden" animate="visible">
        {filteredTourists.map((tourist) => (
          <motion.div key={tourist.touristId || tourist.memberId} variants={iAnim} whileHover={{ scale: 1.005 }} className="p-6" style={glass}>
            <div className="flex items-start justify-between flex-wrap gap-4">
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-3">
                  <div className="h-12 w-12 rounded-full flex items-center justify-center text-white font-bold text-lg" style={{ background: tourist.status === 'safe' ? 'linear-gradient(135deg, #10b981, #059669)' : 'linear-gradient(135deg, #f59e0b, #d97706)' }}>
                    {tourist.fullName ? tourist.fullName.charAt(0) : '?'}
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-white flex items-center gap-2 flex-wrap">
                      {tourist.fullName || 'Unnamed Tourist'}
                      {tourist.isGroupLeader && tourist.groupSize > 0 && <span className="text-xs px-2 py-1 rounded-full flex items-center gap-1" style={{ background: 'rgba(6,182,212,0.15)', color: '#67e8f9' }}><Users size={12} />Group Leader</span>}
                      {!tourist.isGroupLeader && <span className="text-xs px-2 py-1 rounded-full" style={{ background: 'rgba(255,255,255,0.06)', color: 'rgba(153,246,228,0.5)' }}>Member</span>}
                    </h3>
                    <div className="flex items-center gap-2 text-sm" style={{ color: 'rgba(153,246,228,0.5)' }}>
                      <Globe className="h-4 w-4" /><span>{tourist.country || 'N/A'}</span><span className="mx-2">•</span><span>ID: {tourist.passportNumber || tourist.aadhaarNumber || 'N/A'}</span>
                    </div>
                  </div>
                </div>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-3">
                  {[{ icon: MapPin, l: 'Location', v: tourist.currentLocation }, { icon: Phone, l: 'Phone', v: tourist.phone || 'N/A' }, { icon: Mail, l: 'Email', v: tourist.email || 'N/A' }, { icon: Calendar, l: 'Check-in', v: tourist.checkInDate || 'N/A' }].map((d, i) => (
                    <div key={i} className="flex items-center gap-2 text-sm"><d.icon className="h-4 w-4" style={{ color: '#22d3ee' }} /><div><p style={{ color: 'rgba(153,246,228,0.4)' }}>{d.l}</p><p className="font-medium text-white">{d.v}</p></div></div>
                  ))}
                </div>
              </div>
              <div className="flex flex-col gap-2 ml-4">
                <span className="px-3 py-1 rounded-full text-xs font-semibold text-center" style={{ background: tourist.status === 'safe' ? 'rgba(16,185,129,0.15)' : 'rgba(245,158,11,0.15)', color: tourist.status === 'safe' ? '#6ee7b7' : '#fde68a' }}>{tourist.status === 'safe' ? '✓ Safe' : '⚠ Warning'}</span>
                <motion.button whileHover={{ scale: 1.05 }} onClick={() => setSelectedTourist(tourist)} className="px-4 py-2 rounded-xl text-sm font-medium text-white" style={{ background: 'linear-gradient(135deg, #06b6d4, #0891b2)' }}><Eye className="h-4 w-4 inline mr-1" />Details</motion.button>
              </div>
            </div>
          </motion.div>
        ))}
      </motion.div>

      {/* Modal */}
      {selectedTourist && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="fixed inset-0 flex items-center justify-center z-50 p-4" style={{ background: 'rgba(0,0,0,0.7)', backdropFilter: 'blur(8px)' }}>
          <motion.div initial={{ scale: 0.9 }} animate={{ scale: 1 }} className="max-w-2xl w-full max-h-[90vh] overflow-y-auto rounded-2xl p-6" style={{ background: 'linear-gradient(135deg, #0a0a1a, #16213e)', border: '1px solid rgba(255,255,255,0.15)', boxShadow: '0 25px 50px rgba(0,0,0,0.5)' }}>
            <div className="flex items-center justify-between mb-6"><h3 className="text-2xl font-bold text-white">Tourist Details</h3><button onClick={() => setSelectedTourist(null)} className="text-white/50 hover:text-white text-2xl">×</button></div>
            <div className="space-y-4">
              <div className="flex items-center gap-4">
                <div className="h-20 w-20 rounded-full flex items-center justify-center text-white font-bold text-3xl" style={{ background: selectedTourist.status === 'safe' ? 'linear-gradient(135deg, #10b981, #059669)' : 'linear-gradient(135deg, #f59e0b, #d97706)' }}>{selectedTourist.fullName ? selectedTourist.fullName.charAt(0) : '?'}</div>
                <div><h4 className="text-2xl font-bold text-white">{selectedTourist.fullName || 'N/A'}</h4><p style={{ color: 'rgba(153,246,228,0.5)' }}>{selectedTourist.country || 'N/A'}</p></div>
              </div>
              {!selectedTourist.isGroupLeader && (
                <div className="rounded-xl p-3" style={{ background: 'rgba(6,182,212,0.08)', borderLeft: '4px solid rgba(6,182,212,0.5)' }}>
                  <p className="text-sm font-semibold" style={{ color: '#67e8f9' }}>Part of group led by: {selectedTourist.leaderName}</p>
                </div>
              )}
              <div className="grid grid-cols-2 gap-4" style={{ borderTop: '1px solid rgba(255,255,255,0.08)', paddingTop: '1rem' }}>
                {[{ l: 'ID Number', v: selectedTourist.passportNumber || selectedTourist.aadhaarNumber || 'N/A' }, { l: 'Phone', v: selectedTourist.phone || 'N/A' }, { l: 'Email', v: selectedTourist.email || 'N/A' }, { l: 'Emergency', v: selectedTourist.emergencyContactPhone || 'N/A' }].map((d, i) => (
                  <div key={i} className="pl-3" style={{ borderLeft: '4px solid rgba(6,182,212,0.4)' }}><p className="text-sm" style={{ color: 'rgba(153,246,228,0.4)' }}>{d.l}</p><p className="font-semibold text-white">{d.v}</p></div>
                ))}
              </div>
              <div className="flex gap-3" style={{ borderTop: '1px solid rgba(255,255,255,0.08)', paddingTop: '1rem' }}>
                <motion.button whileHover={{ scale: 1.03 }} className="flex-1 py-3 rounded-xl font-semibold text-white" style={{ background: 'linear-gradient(135deg, #06b6d4, #0891b2)' }}>Send Alert</motion.button>
                <motion.button whileHover={{ scale: 1.03 }} className="flex-1 py-3 rounded-xl font-semibold text-white" style={{ background: 'rgba(255,255,255,0.08)', border: '1px solid rgba(255,255,255,0.15)' }}>View History</motion.button>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </motion.div>
  )
}

export default TouristMonitoring