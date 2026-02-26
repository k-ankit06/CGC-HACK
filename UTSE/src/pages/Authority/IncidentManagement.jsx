import { useState } from 'react'
import { FileText, Plus, Search, Eye, Trash2 } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'

const glass = { background: 'rgba(255,255,255,0.06)', backdropFilter: 'blur(24px)', WebkitBackdropFilter: 'blur(24px)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '1rem', boxShadow: '0 8px 32px rgba(0,0,0,0.3)' }
const cAnim = { hidden: { opacity: 0 }, visible: { opacity: 1, transition: { staggerChildren: 0.08 } } }
const iAnim = { hidden: { opacity: 0, y: 30 }, visible: { opacity: 1, y: 0, transition: { duration: 0.5 } } }
const inputStyle = { background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.12)', borderRadius: '0.75rem', color: '#fff', padding: '0.75rem 1rem', width: '100%', outline: 'none' }
const labelStyle = { color: 'rgba(153,246,228,0.7)', fontSize: '0.875rem', fontWeight: 600, display: 'block', marginBottom: '0.25rem' }

const initialIncidentsData = [
  { id: 'INC-2024-001', type: 'Medical Emergency', tourist: 'John Anderson', location: 'Taj Mahal, Agra', date: '2024-01-20', time: '14:30', severity: 'Critical', status: 'Resolved', description: 'Tourist collapsed due to heat exhaustion', responseTeam: 'Medical Team Alpha', officer: 'Officer Sharma' },
  { id: 'INC-2024-002', type: 'Theft', tourist: 'Sarah Williams', location: 'India Gate, Delhi', date: '2024-01-21', time: '16:45', severity: 'High', status: 'Investigating', description: 'Wallet and phone stolen', responseTeam: 'Police Unit Bravo', officer: 'Officer Kumar' },
  { id: 'INC-2024-003', type: 'Lost Tourist', tourist: 'Hans Mueller', location: 'Red Fort, Delhi', date: '2024-01-21', time: '11:20', severity: 'Medium', status: 'Resolved', description: 'Tourist separated from group', responseTeam: 'Patrol Team Charlie', officer: 'Officer Patel' },
]

const IncidentManagement = () => {
  const [incidents, setIncidents] = useState(initialIncidentsData)
  const [showModal, setShowModal] = useState(false)
  const [isEditing, setIsEditing] = useState(false)
  const [selectedIncident, setSelectedIncident] = useState(null)
  const [filterType, setFilterType] = useState('all')
  const [searchTerm, setSearchTerm] = useState('')

  const handleAddNewIncident = (formData) => { setIncidents([{ id: `INC-${Date.now().toString().slice(-5)}`, ...formData, status: 'In Progress' }, ...incidents]); setShowModal(false) }
  const handleUpdateIncident = (formData) => { setIncidents(incidents.map(inc => inc.id === formData.id ? { ...inc, ...formData } : inc)); setShowModal(false); setSelectedIncident(null) }
  const handleDeleteIncident = (id) => { if (window.confirm("Delete this incident record?")) setIncidents(incidents.filter(inc => inc.id !== id)) }
  const openModal = (incident = null) => { setSelectedIncident(incident); setIsEditing(!!incident); setShowModal(true) }

  const sevColor = (s) => ({ Critical: { bg: 'rgba(239,68,68,0.2)', c: '#fca5a5' }, High: { bg: 'rgba(245,158,11,0.2)', c: '#fde68a' }, Medium: { bg: 'rgba(250,204,21,0.2)', c: '#fef08a' }, Low: { bg: 'rgba(74,222,128,0.2)', c: '#bbf7d0' } }[s] || { bg: 'rgba(255,255,255,0.1)', c: '#fff' })
  const statColor = (s) => s === 'Resolved' ? { bg: 'rgba(16,185,129,0.2)', c: '#6ee7b7' } : s === 'Investigating' ? { bg: 'rgba(245,158,11,0.2)', c: '#fde68a' } : { bg: 'rgba(6,182,212,0.2)', c: '#67e8f9' }

  const filteredIncidents = incidents.filter(i => {
    const matchesSearch = i.id.toLowerCase().includes(searchTerm.toLowerCase()) || i.tourist.toLowerCase().includes(searchTerm.toLowerCase()) || i.type.toLowerCase().includes(searchTerm.toLowerCase())
    return matchesSearch && (filterType === 'all' || i.type === filterType)
  })

  return (
    <motion.div variants={cAnim} initial="hidden" animate="visible" className="space-y-6">
      <motion.div variants={iAnim} className="flex items-center justify-between flex-wrap gap-3">
        <div>
          <h2 className="text-3xl font-bold text-white" style={{ textShadow: '0 0 30px rgba(6,182,212,0.4)' }}>Incident Management</h2>
          <p className="mt-1" style={{ color: 'rgba(153,246,228,0.6)' }}>Comprehensive incident tracking and reporting</p>
        </div>
        <motion.button whileHover={{ scale: 1.05 }} onClick={() => openModal()} className="px-4 py-2 rounded-xl font-semibold text-white" style={{ background: 'linear-gradient(135deg, #06b6d4, #0891b2)' }}><Plus className="inline h-5 w-5 mr-2" />Report New</motion.button>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {[{ l: 'Total Incidents', v: incidents.length, g: 'linear-gradient(135deg,#06b6d4,#0891b2)' }, { l: 'Resolved', v: incidents.filter(i => i.status === 'Resolved').length, g: 'linear-gradient(135deg,#10b981,#059669)' }, { l: 'In Progress', v: incidents.filter(i => i.status !== 'Resolved').length, g: 'linear-gradient(135deg,#f59e0b,#d97706)' }].map((s, i) => (
          <motion.div key={i} variants={iAnim} whileHover={{ scale: 1.05, y: -5 }} className="p-5 rounded-2xl text-white" style={{ background: s.g, boxShadow: '0 8px 30px rgba(0,0,0,0.3)' }}>
            <p className="text-sm opacity-80">{s.l}</p><p className="text-4xl font-bold mt-1">{s.v}</p>
          </motion.div>
        ))}
      </div>

      {/* Search */}
      <motion.div variants={iAnim} className="p-4" style={glass}>
        <div className="flex items-center gap-2" style={{ ...inputStyle, display: 'flex' }}>
          <Search className="h-5 w-5" style={{ color: 'rgba(153,246,228,0.4)' }} />
          <input type="text" placeholder="Search incidents..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} style={{ background: 'transparent', border: 'none', color: '#fff', outline: 'none', flex: 1 }} />
        </div>
      </motion.div>

      {/* Table */}
      <motion.div variants={iAnim} className="p-0 overflow-hidden" style={{ ...glass, padding: 0 }}>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead><tr style={{ borderBottom: '1px solid rgba(255,255,255,0.1)' }}>
              {['ID', 'Type', 'Tourist', 'Location', 'Date', 'Severity', 'Status', 'Actions'].map(h => <th key={h} className="text-left py-3 px-4 font-semibold text-sm" style={{ color: 'rgba(153,246,228,0.7)' }}>{h}</th>)}
            </tr></thead>
            <tbody>
              {filteredIncidents.map((inc) => (
                <tr key={inc.id} className="transition-colors" style={{ borderTop: '1px solid rgba(255,255,255,0.06)' }}>
                  <td className="py-4 px-4 font-mono text-sm font-semibold" style={{ color: '#22d3ee' }}>{inc.id}</td>
                  <td className="py-4 px-4 text-white">{inc.type}</td>
                  <td className="py-4 px-4 font-medium text-white">{inc.tourist}</td>
                  <td className="py-4 px-4 text-sm" style={{ color: 'rgba(153,246,228,0.5)' }}>{inc.location}</td>
                  <td className="py-4 px-4"><div className="text-white text-sm">{inc.date}</div><div className="text-xs" style={{ color: 'rgba(153,246,228,0.4)' }}>{inc.time}</div></td>
                  <td className="py-4 px-4"><span className="px-2 py-1 rounded-full text-xs font-semibold" style={{ background: sevColor(inc.severity).bg, color: sevColor(inc.severity).c }}>{inc.severity}</span></td>
                  <td className="py-4 px-4"><span className="px-2 py-1 rounded-full text-xs font-semibold" style={{ background: statColor(inc.status).bg, color: statColor(inc.status).c }}>{inc.status}</span></td>
                  <td className="py-4 px-4">
                    <div className="flex gap-2">
                      <motion.button whileHover={{ scale: 1.1 }} onClick={() => openModal(inc)} className="p-2 rounded-lg" style={{ color: '#22d3ee' }}><Eye className="h-4 w-4" /></motion.button>
                      <motion.button whileHover={{ scale: 1.1 }} onClick={() => handleDeleteIncident(inc.id)} className="p-2 rounded-lg" style={{ color: '#f87171' }}><Trash2 className="h-4 w-4" /></motion.button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </motion.div>

      {/* Modal */}
      <AnimatePresence>
        {showModal && (<IncidentFormModal incident={selectedIncident} isEditing={isEditing} onClose={() => setShowModal(false)} onSave={isEditing ? handleUpdateIncident : handleAddNewIncident} />)}
      </AnimatePresence>
    </motion.div>
  )
}

const IncidentFormModal = ({ incident, isEditing, onClose, onSave }) => {
  const [formData, setFormData] = useState(incident || { type: 'Medical Emergency', severity: 'Medium', tourist: '', location: '', date: new Date().toISOString().split('T')[0], time: new Date().toTimeString().slice(0, 5), description: '', responseTeam: 'Medical Team Alpha', officer: '' })
  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value })
  const handleSubmit = (e) => { e.preventDefault(); onSave(formData) }
  const is = { background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.12)', borderRadius: '0.75rem', color: '#fff', padding: '0.75rem 1rem', width: '100%', outline: 'none' }
  const ls = { color: 'rgba(153,246,228,0.7)', fontSize: '0.875rem', fontWeight: 600, display: 'block', marginBottom: '0.25rem' }

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 flex items-center justify-center z-50 p-4" style={{ background: 'rgba(0,0,0,0.7)', backdropFilter: 'blur(8px)' }}>
      <motion.div initial={{ y: -50, opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ y: 50, opacity: 0 }} className="max-w-3xl w-full max-h-[90vh] overflow-y-auto rounded-2xl p-6" style={{ background: 'linear-gradient(135deg, #0a0a1a, #16213e)', border: '1px solid rgba(255,255,255,0.15)', boxShadow: '0 25px 50px rgba(0,0,0,0.5)' }}>
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-2xl font-bold text-white">{isEditing ? `Edit: ${incident.id}` : 'Report New Incident'}</h3>
          <button onClick={onClose} className="text-white/50 hover:text-white text-2xl">×</button>
        </div>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div><label style={ls}>Incident Type *</label><select name="type" style={is} value={formData.type} onChange={handleChange}><option>Medical Emergency</option><option>Theft</option><option>Lost Tourist</option></select></div>
            <div><label style={ls}>Severity *</label><select name="severity" style={is} value={formData.severity} onChange={handleChange}><option>Critical</option><option>High</option><option>Medium</option><option>Low</option></select></div>
            <div><label style={ls}>Tourist Name *</label><input name="tourist" type="text" style={is} value={formData.tourist} onChange={handleChange} required /></div>
            <div className="col-span-2"><label style={ls}>Location *</label><input name="location" type="text" style={is} value={formData.location} onChange={handleChange} required /></div>
            <div><label style={ls}>Date *</label><input name="date" type="date" style={{ ...is, colorScheme: 'dark' }} value={formData.date} onChange={handleChange} /></div>
            <div><label style={ls}>Time *</label><input name="time" type="time" style={{ ...is, colorScheme: 'dark' }} value={formData.time} onChange={handleChange} /></div>
            <div className="col-span-2"><label style={ls}>Description *</label><textarea name="description" style={{ ...is, resize: 'vertical' }} rows="3" value={formData.description} onChange={handleChange} /></div>
          </div>
          <div className="flex gap-3 pt-4" style={{ borderTop: '1px solid rgba(255,255,255,0.08)' }}>
            <motion.button whileHover={{ scale: 1.03 }} type="submit" className="flex-1 py-3 rounded-xl font-semibold text-white" style={{ background: 'linear-gradient(135deg, #06b6d4, #0891b2)' }}>{isEditing ? 'Save Changes' : 'Submit Report'}</motion.button>
            <motion.button whileHover={{ scale: 1.03 }} type="button" onClick={onClose} className="flex-1 py-3 rounded-xl font-semibold text-white" style={{ background: 'rgba(255,255,255,0.08)', border: '1px solid rgba(255,255,255,0.15)' }}>Cancel</motion.button>
          </div>
        </form>
      </motion.div>
    </motion.div>
  )
}

export default IncidentManagement