import { useState } from 'react'
import { Users, Phone, MapPin, CheckCircle, Clock } from 'lucide-react'
import { motion } from 'framer-motion'

const glass = { background: 'rgba(255,255,255,0.06)', backdropFilter: 'blur(24px)', WebkitBackdropFilter: 'blur(24px)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '1rem', boxShadow: '0 8px 32px rgba(0,0,0,0.3)' }
const cAnim = { hidden: { opacity: 0 }, visible: { opacity: 1, transition: { staggerChildren: 0.08 } } }
const iAnim = { hidden: { opacity: 0, y: 30 }, visible: { opacity: 1, y: 0, transition: { duration: 0.5 } } }

const initialTeamsData = [
  { id: 1, name: 'Medical Team Alpha', type: 'Medical', members: 4, status: 'Available', location: 'Taj Mahal Station', currentAssignment: null, responseTime: '2:30', completedToday: 8, contact: '+91 98765 43210' },
  { id: 2, name: 'Police Unit Bravo', type: 'Police', members: 6, status: 'On Duty', location: 'Red Fort Area', currentAssignment: 'INC-2024-023', responseTime: '3:45', completedToday: 12, contact: '+91 98765 43211' },
  { id: 3, name: 'Patrol Team Charlie', type: 'Patrol', members: 3, status: 'Available', location: 'India Gate', currentAssignment: null, responseTime: '2:15', completedToday: 15, contact: '+91 98765 43212' },
  { id: 4, name: 'Language Support Delta', type: 'Support', members: 5, status: 'Available', location: 'Tourist Help Center', currentAssignment: null, responseTime: '1:50', completedToday: 20, contact: '+91 98765 43213' },
  { id: 5, name: 'Emergency Medical Echo', type: 'Medical', members: 4, status: 'On Duty', location: 'Gateway of India', currentAssignment: 'INC-2024-025', responseTime: '4:20', completedToday: 6, contact: '+91 98765 43214' },
]

const ResponseTeam = () => {
  const [teams, setTeams] = useState(initialTeamsData)
  const handleAssignTask = (teamId) => {
    const incidentId = prompt("Enter Incident ID:", `INC-${Date.now().toString().slice(-5)}`)
    if (incidentId) setTeams(teams.map(t => t.id === teamId ? { ...t, status: 'On Duty', currentAssignment: incidentId } : t))
  }
  const handleCompleteTask = (teamId) => {
    if (window.confirm("Mark task as complete?")) setTeams(teams.map(t => t.id === teamId ? { ...t, status: 'Available', currentAssignment: null, completedToday: t.completedToday + 1 } : t))
  }
  const typeColor = (type) => ({ Medical: { bg: 'rgba(239,68,68,0.15)', c: '#fca5a5' }, Police: { bg: 'rgba(6,182,212,0.15)', c: '#67e8f9' }, Patrol: { bg: 'rgba(245,158,11,0.15)', c: '#fde68a' }, Support: { bg: 'rgba(168,85,247,0.15)', c: '#d8b4fe' } }[type] || { bg: 'rgba(255,255,255,0.1)', c: '#fff' })

  return (
    <motion.div variants={cAnim} initial="hidden" animate="visible" className="space-y-6">
      <motion.div variants={iAnim}>
        <h2 className="text-3xl font-bold text-white" style={{ textShadow: '0 0 30px rgba(6,182,212,0.4)' }}>Response Team Management</h2>
        <p className="mt-1" style={{ color: 'rgba(153,246,228,0.6)' }}>Real-time monitoring and coordination</p>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {[{ l: 'Total Teams', v: teams.length, g: 'linear-gradient(135deg,#06b6d4,#0891b2)' }, { l: 'Available', v: teams.filter(t => t.status === 'Available').length, g: 'linear-gradient(135deg,#10b981,#059669)' }, { l: 'On Duty', v: teams.filter(t => t.status === 'On Duty').length, g: 'linear-gradient(135deg,#f59e0b,#d97706)' }, { l: 'Total Members', v: teams.reduce((s, t) => s + t.members, 0), g: 'linear-gradient(135deg,#8b5cf6,#7c3aed)' }].map((s, i) => (
          <motion.div key={i} variants={iAnim} whileHover={{ scale: 1.05, y: -5 }} className="p-5 rounded-2xl text-white" style={{ background: s.g, boxShadow: '0 8px 30px rgba(0,0,0,0.3)' }}>
            <p className="text-sm opacity-80">{s.l}</p><p className="text-4xl font-bold mt-1">{s.v}</p>
          </motion.div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {teams.map((team) => (
          <motion.div key={team.id} variants={iAnim} whileHover={{ scale: 1.01 }} className="p-6" style={{ ...glass, borderLeft: `4px solid ${team.status === 'Available' ? '#10b981' : '#f59e0b'}` }}>
            <div className="flex items-start justify-between mb-4">
              <div>
                <div className="flex items-center gap-3 mb-2 flex-wrap">
                  <h3 className="text-xl font-bold text-white">{team.name}</h3>
                  <span className="px-3 py-1 rounded-full text-xs font-semibold" style={{ background: typeColor(team.type).bg, color: typeColor(team.type).c }}>{team.type}</span>
                </div>
                <div className="flex items-center gap-2"><div className="h-3 w-3 rounded-full animate-pulse" style={{ background: team.status === 'Available' ? '#10b981' : '#f59e0b' }} /><span className="text-sm font-medium" style={{ color: 'rgba(153,246,228,0.5)' }}>{team.status}</span></div>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4 mb-4">
              {[{ icon: Users, l: 'Members', v: `${team.members} Officers` }, { icon: MapPin, l: 'Location', v: team.location }, { icon: Clock, l: 'Avg Response', v: `${team.responseTime} mins` }, { icon: CheckCircle, l: 'Completed', v: `${team.completedToday} Tasks` }].map((d, i) => (
                <div key={i} className="flex items-center gap-2"><d.icon className="h-4 w-4" style={{ color: '#22d3ee' }} /><div><p className="text-xs" style={{ color: 'rgba(153,246,228,0.4)' }}>{d.l}</p><p className="font-semibold text-sm text-white">{d.v}</p></div></div>
              ))}
            </div>
            {team.currentAssignment ? (
              <div className="rounded-xl p-3 mb-4" style={{ background: 'rgba(245,158,11,0.08)', borderLeft: '4px solid rgba(245,158,11,0.5)' }}>
                <p className="text-sm font-semibold text-white">Current: <span className="font-mono" style={{ color: '#fde68a' }}>{team.currentAssignment}</span></p>
                <button onClick={() => handleCompleteTask(team.id)} className="text-xs font-semibold mt-2" style={{ color: '#6ee7b7' }}>✓ Mark Complete</button>
              </div>
            ) : (
              <div className="rounded-xl p-3 mb-4" style={{ background: 'rgba(16,185,129,0.08)', borderLeft: '4px solid rgba(16,185,129,0.5)' }}>
                <p className="text-sm font-semibold" style={{ color: '#6ee7b7' }}>Available for assignment</p>
              </div>
            )}
            <div className="flex gap-2">
              <motion.button whileHover={{ scale: 1.05 }} className="flex-1 py-2 rounded-xl font-medium text-sm text-white" style={{ background: 'linear-gradient(135deg, #06b6d4, #0891b2)' }}><Phone className="inline h-4 w-4 mr-1" />Contact</motion.button>
              <motion.button whileHover={{ scale: 1.05 }} className="flex-1 py-2 rounded-xl font-medium text-sm text-white" style={{ background: 'linear-gradient(135deg, #8b5cf6, #7c3aed)' }}><MapPin className="inline h-4 w-4 mr-1" />Track</motion.button>
              <motion.button whileHover={{ scale: 1.05 }} onClick={() => handleAssignTask(team.id)} disabled={team.status !== 'Available'} className="flex-1 py-2 rounded-xl font-medium text-sm text-white disabled:opacity-30 disabled:cursor-not-allowed" style={{ background: 'rgba(255,255,255,0.08)', border: '1px solid rgba(255,255,255,0.15)' }}>Assign</motion.button>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  )
}

export default ResponseTeam