import { useState } from 'react'
import { AlertTriangle, Phone, MapPin, Clock, User, CheckCircle } from 'lucide-react'
import { motion } from 'framer-motion'

const glass = { background: 'rgba(255,255,255,0.06)', backdropFilter: 'blur(24px)', WebkitBackdropFilter: 'blur(24px)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '1rem', boxShadow: '0 8px 32px rgba(0,0,0,0.3)' }
const cAnim = { hidden: { opacity: 0 }, visible: { opacity: 1, transition: { staggerChildren: 0.08 } } }
const iAnim = { hidden: { opacity: 0, y: 30 }, visible: { opacity: 1, y: 0, transition: { duration: 0.5 } } }

const EmergencyResponse = () => {
  const [activeTab, setActiveTab] = useState('active')
  const [selectedIncident, setSelectedIncident] = useState(null)

  const emergencies = [
    { id: 1, type: 'Medical Emergency', severity: 'Critical', tourist: 'John Anderson', country: 'USA', location: 'Taj Mahal, Agra', coordinates: '27.1751° N, 78.0421° E', phone: '+1 555-0123', description: 'Tourist collapsed, needs immediate medical attention', time: '2 mins ago', status: 'active', assignedTeam: 'Medical Team Alpha', responseTime: '00:02:15', distance: '0.5 km' },
    { id: 2, type: 'Lost Tourist', severity: 'Medium', tourist: 'Sarah Williams', country: 'UK', location: 'Red Fort, Delhi', coordinates: '28.6562° N, 77.2410° E', phone: '+44 20 7123 4567', description: 'Tourist separated from group', time: '15 mins ago', status: 'active', assignedTeam: 'Patrol Team Bravo', responseTime: '00:15:30', distance: '1.2 km' },
    { id: 3, type: 'Theft Report', severity: 'High', tourist: 'Hans Mueller', country: 'Germany', location: 'Gateway of India, Mumbai', coordinates: '18.9220° N, 72.8347° E', phone: '+49 30 12345678', description: 'Wallet and passport stolen', time: '30 mins ago', status: 'active', assignedTeam: 'Police Unit Charlie', responseTime: '00:30:45', distance: '2.1 km' },
    { id: 4, type: 'Accident', severity: 'Critical', tourist: 'Maria Rodriguez', country: 'Spain', location: 'Marine Drive, Mumbai', coordinates: '18.9432° N, 72.8236° E', phone: '+34 91 123 4567', description: 'Tourist involved in vehicle accident', time: '5 mins ago', status: 'responding', assignedTeam: 'Ambulance Unit Delta', responseTime: '00:05:20', distance: '0.8 km' },
  ]
  const resolvedEmergencies = [
    { id: 5, type: 'Language Barrier', severity: 'Low', tourist: 'Takeshi Yamamoto', country: 'Japan', location: 'Hawa Mahal, Jaipur', phone: '+81 3 1234 5678', description: 'Tourist needs translator', time: '2 hours ago', status: 'resolved', assignedTeam: 'Language Support Echo', responseTime: '00:08:15' },
    { id: 6, type: 'Health Issue', severity: 'Medium', tourist: 'Emma Wilson', country: 'Australia', location: 'Qutub Minar, Delhi', phone: '+61 2 1234 5678', description: 'Heat exhaustion', time: '3 hours ago', status: 'resolved', assignedTeam: 'Medical Team Alpha', responseTime: '00:04:30' },
  ]

  const displayEmergencies = activeTab === 'active' ? emergencies : resolvedEmergencies
  const sevColor = (s) => ({ Critical: { bg: 'rgba(239,68,68,0.2)', color: '#fca5a5' }, High: { bg: 'rgba(245,158,11,0.2)', color: '#fde68a' }, Medium: { bg: 'rgba(250,204,21,0.2)', color: '#fef08a' }, Low: { bg: 'rgba(74,222,128,0.2)', color: '#bbf7d0' } }[s] || { bg: 'rgba(255,255,255,0.1)', color: '#fff' })
  const statColor = (s) => s === 'active' ? '#ef4444' : s === 'responding' ? '#f59e0b' : '#10b981'

  return (
    <motion.div variants={cAnim} initial="hidden" animate="visible" className="space-y-6">
      <motion.div variants={iAnim} className="flex items-center justify-between flex-wrap gap-3">
        <div>
          <h2 className="text-3xl font-bold text-white" style={{ textShadow: '0 0 30px rgba(6,182,212,0.4)' }}>Emergency Response Center</h2>
          <p className="mt-1" style={{ color: 'rgba(153,246,228,0.6)' }}>Real-time emergency incident management</p>
        </div>
        <div className="px-4 py-2 rounded-xl font-semibold flex items-center" style={{ background: 'rgba(239,68,68,0.2)', color: '#fca5a5', border: '1px solid rgba(239,68,68,0.3)' }}>
          <AlertTriangle className="h-5 w-5 mr-2" />{emergencies.length} Active Emergencies
        </div>
      </motion.div>

      {/* Tabs */}
      <motion.div variants={iAnim} className="p-0 overflow-hidden" style={{ ...glass, padding: 0 }}>
        <div className="flex" style={{ borderBottom: '1px solid rgba(255,255,255,0.08)' }}>
          {['active', 'resolved'].map(tab => (
            <button key={tab} onClick={() => setActiveTab(tab)} className="flex-1 px-6 py-4 font-semibold transition-colors capitalize" style={activeTab === tab ? { color: '#22d3ee', borderBottom: '2px solid #22d3ee', background: 'rgba(6,182,212,0.05)' } : { color: 'rgba(153,246,228,0.5)' }}>
              {tab === 'active' ? `Active (${emergencies.length})` : `Resolved (${resolvedEmergencies.length})`}
            </button>
          ))}
        </div>
      </motion.div>

      {/* Emergency Cards */}
      <div className="grid grid-cols-1 gap-4">
        {displayEmergencies.map((e) => (
          <motion.div key={e.id} variants={iAnim} whileHover={{ scale: 1.005 }} className="p-6 rounded-xl" style={{ ...glass, borderLeft: `4px solid ${e.severity === 'Critical' ? '#ef4444' : e.severity === 'High' ? '#f59e0b' : e.severity === 'Medium' ? '#facc15' : '#10b981'}` }}>
            <div className="flex items-start justify-between flex-wrap gap-4">
              <div className="flex items-start gap-4 flex-1">
                <div className="p-3 rounded-xl" style={{ background: sevColor(e.severity).bg }}><AlertTriangle className="h-8 w-8" style={{ color: sevColor(e.severity).color }} /></div>
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2 flex-wrap">
                    <h3 className="text-xl font-bold text-white">{e.type}</h3>
                    <span className="px-3 py-1 rounded-full text-xs font-semibold" style={{ background: sevColor(e.severity).bg, color: sevColor(e.severity).color }}>{e.severity}</span>
                    <div className="flex items-center gap-2"><div className="h-3 w-3 rounded-full animate-pulse" style={{ background: statColor(e.status) }} /><span className="text-sm font-medium capitalize" style={{ color: 'rgba(153,246,228,0.5)' }}>{e.status}</span></div>
                  </div>
                  <p className="text-white mb-3">{e.description}</p>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-3">
                    {[{ icon: User, l: 'Tourist', v: e.tourist, s: e.country }, { icon: MapPin, l: 'Location', v: e.location, s: e.distance }, { icon: Phone, l: 'Contact', v: e.phone }, { icon: Clock, l: 'Response', v: e.responseTime, s: e.time }].map((d, i) => (
                      <div key={i} className="flex items-center gap-2"><d.icon className="h-4 w-4" style={{ color: '#22d3ee' }} /><div><p className="text-xs" style={{ color: 'rgba(153,246,228,0.4)' }}>{d.l}</p><p className="font-medium text-white text-sm">{d.v}</p>{d.s && <p className="text-xs" style={{ color: 'rgba(153,246,228,0.4)' }}>{d.s}</p>}</div></div>
                    ))}
                  </div>
                  <div className="px-4 py-2 rounded-lg" style={{ background: 'rgba(6,182,212,0.08)', border: '1px solid rgba(6,182,212,0.15)' }}><p className="text-sm text-white"><span className="font-semibold">Assigned:</span> {e.assignedTeam}</p></div>
                </div>
              </div>
              <div className="flex flex-col gap-2">
                {e.status !== 'resolved' ? (
                  <>
                    <motion.button whileHover={{ scale: 1.05 }} className="px-4 py-2 rounded-xl font-medium text-sm text-white whitespace-nowrap" style={{ background: 'linear-gradient(135deg, #ef4444, #dc2626)' }}><Phone className="inline h-4 w-4 mr-1" />Call</motion.button>
                    <motion.button whileHover={{ scale: 1.05 }} className="px-4 py-2 rounded-xl font-medium text-sm text-white whitespace-nowrap" style={{ background: 'linear-gradient(135deg, #06b6d4, #0891b2)' }}><MapPin className="inline h-4 w-4 mr-1" />Track</motion.button>
                    <motion.button whileHover={{ scale: 1.05 }} className="px-4 py-2 rounded-xl font-medium text-sm text-white whitespace-nowrap" style={{ background: 'linear-gradient(135deg, #10b981, #059669)' }}><CheckCircle className="inline h-4 w-4 mr-1" />Resolve</motion.button>
                  </>
                ) : (<div className="px-4 py-2 rounded-xl font-semibold flex items-center" style={{ background: 'rgba(16,185,129,0.2)', color: '#6ee7b7' }}><CheckCircle className="h-5 w-5 mr-1" />Resolved</div>)}
                <motion.button whileHover={{ scale: 1.05 }} onClick={() => setSelectedIncident(e)} className="px-4 py-2 rounded-xl font-medium text-sm text-white whitespace-nowrap" style={{ background: 'rgba(255,255,255,0.08)', border: '1px solid rgba(255,255,255,0.15)' }}>Details</motion.button>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Quick Actions */}
      <motion.div variants={iAnim} className="p-6" style={{ ...glass, background: 'linear-gradient(135deg, rgba(6,182,212,0.15), rgba(16,185,129,0.05))', border: '1px solid rgba(6,182,212,0.2)' }}>
        <h3 className="text-xl font-bold text-white mb-4">Emergency Quick Actions</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {['📞 Emergency Hotline', '🚑 Dispatch Ambulance', '🚓 Police Backup', '🏥 Nearby Hospitals'].map((a, i) => (
            <motion.button key={i} whileHover={{ scale: 1.05 }} className="px-4 py-3 rounded-xl font-medium text-white" style={{ background: 'rgba(255,255,255,0.08)', border: '1px solid rgba(255,255,255,0.12)' }}>{a}</motion.button>
          ))}
        </div>
      </motion.div>

      {/* Modal */}
      {selectedIncident && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="fixed inset-0 flex items-center justify-center z-50 p-4" style={{ background: 'rgba(0,0,0,0.7)', backdropFilter: 'blur(8px)' }}>
          <motion.div initial={{ scale: 0.9 }} animate={{ scale: 1 }} className="max-w-3xl w-full max-h-[90vh] overflow-y-auto rounded-2xl p-6" style={{ background: 'linear-gradient(135deg, #0a0a1a, #16213e)', border: '1px solid rgba(255,255,255,0.15)', boxShadow: '0 25px 50px rgba(0,0,0,0.5)' }}>
            <div className="flex items-center justify-between mb-6"><h3 className="text-2xl font-bold text-white">Emergency Details</h3><button onClick={() => setSelectedIncident(null)} className="text-white/50 hover:text-white text-2xl">×</button></div>
            <div className="space-y-6">
              <div className="rounded-xl p-4" style={{ background: 'rgba(239,68,68,0.1)', borderLeft: '4px solid #ef4444' }}>
                <div className="flex items-center gap-2 mb-2"><AlertTriangle className="h-6 w-6" style={{ color: '#fca5a5' }} /><h4 className="text-lg font-bold text-white">{selectedIncident.type}</h4></div>
                <p style={{ color: 'rgba(254,202,202,0.7)' }}>{selectedIncident.description}</p>
              </div>
              <div className="grid grid-cols-2 gap-4">
                {[{ l: 'Tourist', v: selectedIncident.tourist }, { l: 'Country', v: selectedIncident.country }, { l: 'Location', v: selectedIncident.location }, { l: 'Coordinates', v: selectedIncident.coordinates }, { l: 'Contact', v: selectedIncident.phone }, { l: 'Severity', v: selectedIncident.severity }, { l: 'Response Time', v: selectedIncident.responseTime }, { l: 'Assigned Team', v: selectedIncident.assignedTeam }].map((d, i) => (
                  <div key={i} className="pl-4" style={{ borderLeft: '4px solid rgba(6,182,212,0.4)' }}><p className="text-sm" style={{ color: 'rgba(153,246,228,0.4)' }}>{d.l}</p><p className="font-semibold text-white">{d.v}</p></div>
                ))}
              </div>
              <div className="rounded-lg p-4" style={{ background: 'rgba(255,255,255,0.04)' }}>
                <h5 className="font-semibold text-white mb-2">Response Timeline</h5>
                <div className="space-y-2">
                  {[{ c: '#ef4444', t: `Emergency reported - ${selectedIncident.time}` }, { c: '#f59e0b', t: 'Team dispatched - 1 min after' }, { c: '#10b981', t: `Team on location - ${selectedIncident.responseTime}` }].map((tl, i) => (
                    <div key={i} className="flex items-center gap-2"><div className="h-2 w-2 rounded-full" style={{ background: tl.c }} /><span className="text-sm text-white">{tl.t}</span></div>
                  ))}
                </div>
              </div>
              <div className="flex gap-3">
                {['Call Tourist', 'Track Location', 'Mark Resolved'].map((b, i) => (
                  <motion.button key={i} whileHover={{ scale: 1.03 }} className="flex-1 py-3 rounded-xl font-semibold text-white" style={{ background: i === 0 ? 'linear-gradient(135deg,#ef4444,#dc2626)' : i === 1 ? 'linear-gradient(135deg,#06b6d4,#0891b2)' : 'linear-gradient(135deg,#10b981,#059669)' }}>{b}</motion.button>
                ))}
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </motion.div>
  )
}

export default EmergencyResponse