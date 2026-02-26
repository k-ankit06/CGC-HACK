import { useState } from 'react'
import { Shield, AlertTriangle, TrendingUp, MapPin, Activity } from 'lucide-react'
import { BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts'
import { motion } from 'framer-motion'

const glass = { background: 'rgba(255,255,255,0.06)', backdropFilter: 'blur(24px)', WebkitBackdropFilter: 'blur(24px)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '1rem', boxShadow: '0 8px 32px rgba(0,0,0,0.3)' }
const cAnim = { hidden: { opacity: 0 }, visible: { opacity: 1, transition: { staggerChildren: 0.08 } } }
const iAnim = { hidden: { opacity: 0, y: 30 }, visible: { opacity: 1, y: 0, transition: { duration: 0.5 } } }
const ttStyle = { background: 'rgba(10,10,26,0.9)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '0.75rem', color: '#fff' }

const RiskAssessment = () => {
  const [selectedLocation, setSelectedLocation] = useState(null)
  const riskData = [
    { month: 'Jan', crime: 12, weather: 8, crowd: 15, overall: 35 }, { month: 'Feb', crime: 10, weather: 6, crowd: 12, overall: 28 },
    { month: 'Mar', crime: 15, weather: 10, crowd: 18, overall: 43 }, { month: 'Apr', crime: 8, weather: 12, crowd: 14, overall: 34 },
    { month: 'May', crime: 6, weather: 15, crowd: 10, overall: 31 }, { month: 'Jun', crime: 5, weather: 18, crowd: 8, overall: 31 },
  ]
  const locations = [
    { id: 1, name: 'Taj Mahal, Agra', riskScore: 25, riskLevel: 'Low', factors: { crime: 15, weather: 20, crowd: 40, health: 10 }, tourists: 450, incidents: 2, recommendations: ['Increased security during peak hours', 'Heat advisory - provide water stations', 'Crowd management at entrance'] },
    { id: 2, name: 'India Gate, Delhi', riskScore: 35, riskLevel: 'Low', factors: { crime: 20, weather: 25, crowd: 50, health: 15 }, tourists: 380, incidents: 3, recommendations: ['Monitor vendor activities', 'Air quality monitoring', 'Pickpocket awareness'] },
    { id: 3, name: 'Gateway of India, Mumbai', riskScore: 58, riskLevel: 'Medium', factors: { crime: 45, weather: 30, crowd: 70, health: 25 }, tourists: 520, incidents: 8, recommendations: ['Enhanced police patrol', 'Heavy rain warning', 'Crowd flow control'] },
    { id: 4, name: 'Hawa Mahal, Jaipur', riskScore: 42, riskLevel: 'Medium', factors: { crime: 30, weather: 35, crowd: 55, health: 20 }, tourists: 290, incidents: 5, recommendations: ['Extreme heat warning', 'Tourist scam alerts', 'Dehydration prevention'] },
    { id: 5, name: 'Red Fort, Delhi', riskScore: 72, riskLevel: 'High', factors: { crime: 60, weather: 40, crowd: 85, health: 35 }, tourists: 680, incidents: 12, recommendations: ['CRITICAL: Security reinforcement', 'Stampede risk - restrict entry', 'Multiple theft reports'] },
  ]
  const riskColor = (l) => ({ Low: { bg: 'rgba(16,185,129,0.15)', c: '#6ee7b7', border: '#10b981' }, Medium: { bg: 'rgba(245,158,11,0.15)', c: '#fde68a', border: '#f59e0b' }, High: { bg: 'rgba(239,68,68,0.15)', c: '#fca5a5', border: '#ef4444' } }[l] || { bg: 'rgba(255,255,255,0.06)', c: '#fff', border: '#666' })
  const barColors = { crime: '#ef4444', weather: '#f59e0b', crowd: '#06b6d4', health: '#a855f7' }

  return (
    <motion.div variants={cAnim} initial="hidden" animate="visible" className="space-y-6">
      <motion.div variants={iAnim}>
        <h2 className="text-3xl font-bold text-white" style={{ textShadow: '0 0 30px rgba(6,182,212,0.4)' }}>AI-Powered Risk Assessment</h2>
        <p className="mt-1" style={{ color: 'rgba(153,246,228,0.6)' }}>Real-time predictive analytics and risk monitoring</p>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {[{ l: 'Low Risk', v: '15', icon: Shield, g: 'linear-gradient(135deg,#10b981,#059669)' }, { l: 'Medium Risk', v: '8', icon: AlertTriangle, g: 'linear-gradient(135deg,#f59e0b,#d97706)' }, { l: 'High Risk', v: '3', icon: AlertTriangle, g: 'linear-gradient(135deg,#ef4444,#dc2626)' }, { l: 'Avg Score', v: '42%', icon: TrendingUp, g: 'linear-gradient(135deg,#06b6d4,#0891b2)' }].map((s, i) => (
          <motion.div key={i} variants={iAnim} whileHover={{ scale: 1.05, y: -5 }} className="p-5 rounded-2xl text-white" style={{ background: s.g, boxShadow: '0 8px 30px rgba(0,0,0,0.3)' }}>
            <div className="flex items-center justify-between"><div><p className="text-sm opacity-80">{s.l}</p><p className="text-3xl font-bold mt-1">{s.v}</p></div><s.icon className="h-12 w-12 opacity-40" /></div>
          </motion.div>
        ))}
      </div>

      {/* Risk Trends */}
      <motion.div variants={iAnim} className="p-6" style={glass}>
        <h3 className="text-xl font-bold text-white mb-4 flex items-center"><Activity className="h-5 w-5 mr-2" style={{ color: '#22d3ee' }} />Risk Trends (6 Months)</h3>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={riskData}>
            <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.08)" />
            <XAxis dataKey="month" stroke="rgba(153,246,228,0.5)" /><YAxis stroke="rgba(153,246,228,0.5)" />
            <Tooltip contentStyle={ttStyle} /><Legend wrapperStyle={{ color: 'rgba(153,246,228,0.7)' }} />
            <Line type="monotone" dataKey="crime" stroke="#ef4444" strokeWidth={2} name="Crime" />
            <Line type="monotone" dataKey="weather" stroke="#f59e0b" strokeWidth={2} name="Weather" />
            <Line type="monotone" dataKey="crowd" stroke="#06b6d4" strokeWidth={2} name="Crowd" />
            <Line type="monotone" dataKey="overall" stroke="#a855f7" strokeWidth={3} name="Overall" />
          </LineChart>
        </ResponsiveContainer>
      </motion.div>

      {/* Location Cards */}
      <div>
        <h3 className="text-xl font-bold text-white mb-4">Location-wise Risk Assessment</h3>
        <div className="grid grid-cols-1 gap-4">
          {locations.map((loc) => (
            <motion.div key={loc.id} variants={iAnim} whileHover={{ scale: 1.005 }} className="p-6" style={{ ...glass, borderLeft: `4px solid ${riskColor(loc.riskLevel).border}` }}>
              <div className="flex items-start justify-between flex-wrap gap-4">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-3 flex-wrap"><MapPin className="h-6 w-6" style={{ color: '#22d3ee' }} /><h4 className="text-xl font-bold text-white">{loc.name}</h4><span className="px-3 py-1 rounded-full text-sm font-semibold" style={{ background: riskColor(loc.riskLevel).bg, color: riskColor(loc.riskLevel).c }}>{loc.riskLevel} Risk</span></div>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                    {[{ l: 'Risk Score', v: `${loc.riskScore}%` }, { l: 'Active Tourists', v: loc.tourists }, { l: 'Incidents (24h)', v: loc.incidents }, { l: 'Status', v: 'Active Monitoring' }].map((d, i) => (
                      <div key={i}><p className="text-sm" style={{ color: 'rgba(153,246,228,0.4)' }}>{d.l}</p><p className="text-2xl font-bold text-white">{d.v}</p></div>
                    ))}
                  </div>
                  {/* Risk Factors */}
                  <div className="rounded-xl p-4 mb-3" style={{ background: 'rgba(255,255,255,0.03)' }}>
                    <p className="font-semibold text-white mb-3">Risk Factors</p>
                    <div className="space-y-2">
                      {[{ l: 'Crime Risk', v: loc.factors.crime, c: barColors.crime }, { l: 'Weather Risk', v: loc.factors.weather, c: barColors.weather }, { l: 'Crowd Density', v: loc.factors.crowd, c: barColors.crowd }, { l: 'Health Risk', v: loc.factors.health, c: barColors.health }].map((f, i) => (
                        <div key={i}>
                          <div className="flex justify-between mb-1"><span className="text-sm" style={{ color: 'rgba(153,246,228,0.5)' }}>{f.l}</span><span className="text-sm font-semibold text-white">{f.v}%</span></div>
                          <div className="w-full rounded-full h-2" style={{ background: 'rgba(255,255,255,0.08)' }}><div className="h-2 rounded-full transition-all" style={{ width: `${f.v}%`, background: f.c }} /></div>
                        </div>
                      ))}
                    </div>
                  </div>
                  {/* Recommendations */}
                  <div className="rounded-xl p-4" style={{ background: riskColor(loc.riskLevel).bg, borderLeft: `4px solid ${riskColor(loc.riskLevel).border}` }}>
                    <p className="font-semibold text-white mb-2 flex items-center"><AlertTriangle className="h-4 w-4 mr-2" />AI Recommendations</p>
                    <ul className="space-y-1">{loc.recommendations.map((r, i) => (<li key={i} className="text-sm flex items-start gap-2"><span style={{ color: '#22d3ee', marginTop: '0.25rem' }}>•</span><span className="text-white">{r}</span></li>))}</ul>
                  </div>
                </div>
                <div className="flex flex-col gap-2">
                  <motion.button whileHover={{ scale: 1.05 }} onClick={() => setSelectedLocation(loc)} className="px-4 py-2 rounded-xl font-medium text-sm text-white whitespace-nowrap" style={{ background: 'linear-gradient(135deg,#06b6d4,#0891b2)' }}>Details</motion.button>
                  <motion.button whileHover={{ scale: 1.05 }} className="px-4 py-2 rounded-xl font-medium text-sm text-white whitespace-nowrap" style={{ background: 'linear-gradient(135deg,#8b5cf6,#7c3aed)' }}>Alert</motion.button>
                  <motion.button whileHover={{ scale: 1.05 }} className="px-4 py-2 rounded-xl font-medium text-sm text-white whitespace-nowrap" style={{ background: 'rgba(255,255,255,0.08)', border: '1px solid rgba(255,255,255,0.15)' }}>Map</motion.button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Predictive */}
      <motion.div variants={iAnim} className="p-6" style={{ ...glass, background: 'linear-gradient(135deg, rgba(139,92,246,0.15), rgba(168,85,247,0.05))', border: '1px solid rgba(139,92,246,0.2)' }}>
        <h3 className="text-xl font-bold text-white mb-4 flex items-center"><TrendingUp className="h-5 w-5 mr-2" />Predictive Analytics (Next 7 Days)</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {[{ l: 'High Risk Days', v: '3 days', s: 'Weekend crowd surge' }, { l: 'Weather Alerts', v: '2 locations', s: 'Heavy rain forecast' }, { l: 'Actions Pending', v: '5 pending', s: 'Security enhancements' }].map((p, i) => (
            <div key={i} className="rounded-xl p-4" style={{ background: 'rgba(255,255,255,0.06)' }}>
              <p className="text-sm mb-1" style={{ color: 'rgba(199,210,254,0.5)' }}>{p.l}</p><p className="text-3xl font-bold text-white">{p.v}</p><p className="text-sm mt-1" style={{ color: 'rgba(199,210,254,0.4)' }}>{p.s}</p>
            </div>
          ))}
        </div>
      </motion.div>

      {/* Modal */}
      {selectedLocation && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="fixed inset-0 flex items-center justify-center z-50 p-4" style={{ background: 'rgba(0,0,0,0.7)', backdropFilter: 'blur(8px)' }}>
          <motion.div initial={{ scale: 0.9 }} animate={{ scale: 1 }} className="max-w-4xl w-full max-h-[90vh] overflow-y-auto rounded-2xl p-6" style={{ background: 'linear-gradient(135deg, #0a0a1a, #16213e)', border: '1px solid rgba(255,255,255,0.15)', boxShadow: '0 25px 50px rgba(0,0,0,0.5)' }}>
            <div className="flex items-center justify-between mb-6"><h3 className="text-2xl font-bold text-white">Detailed Risk Analysis</h3><button onClick={() => setSelectedLocation(null)} className="text-white/50 hover:text-white text-2xl">×</button></div>
            <div className="space-y-6">
              <div className="rounded-xl p-4" style={{ borderLeft: `4px solid ${riskColor(selectedLocation.riskLevel).border}`, background: 'rgba(255,255,255,0.04)' }}>
                <h4 className="text-xl font-bold text-white mb-1">{selectedLocation.name}</h4>
                <span className="px-3 py-1 rounded-full text-sm font-semibold" style={{ background: riskColor(selectedLocation.riskLevel).bg, color: riskColor(selectedLocation.riskLevel).c }}>{selectedLocation.riskLevel} Risk - {selectedLocation.riskScore}%</span>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="p-5 rounded-xl" style={{ background: 'rgba(255,255,255,0.04)' }}><p style={{ color: 'rgba(153,246,228,0.5)' }}>Active Tourists</p><p className="text-4xl font-bold" style={{ color: '#22d3ee' }}>{selectedLocation.tourists}</p></div>
                <div className="p-5 rounded-xl" style={{ background: 'rgba(255,255,255,0.04)' }}><p style={{ color: 'rgba(153,246,228,0.5)' }}>Incidents (24h)</p><p className="text-4xl font-bold" style={{ color: '#ef4444' }}>{selectedLocation.incidents}</p></div>
              </div>
              <div><h5 className="font-semibold text-white text-lg mb-3">Risk Factors</h5>
                <ResponsiveContainer width="100%" height={250}>
                  <BarChart data={[{ name: 'Crime', value: selectedLocation.factors.crime }, { name: 'Weather', value: selectedLocation.factors.weather }, { name: 'Crowd', value: selectedLocation.factors.crowd }, { name: 'Health', value: selectedLocation.factors.health }]}>
                    <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.08)" /><XAxis dataKey="name" stroke="rgba(153,246,228,0.5)" /><YAxis stroke="rgba(153,246,228,0.5)" /><Tooltip contentStyle={ttStyle} /><Bar dataKey="value" fill="#06b6d4" radius={[4, 4, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
              <div className="rounded-xl p-4" style={{ background: 'rgba(6,182,212,0.08)' }}>
                <h5 className="font-semibold text-white mb-3 flex items-center"><AlertTriangle className="h-5 w-5 mr-2" style={{ color: '#22d3ee' }} />Recommended Actions</h5>
                <ul className="space-y-2">{selectedLocation.recommendations.map((r, i) => (<li key={i} className="flex items-center gap-2 text-white"><div className="h-2 w-2 rounded-full" style={{ background: '#22d3ee' }} />{r}</li>))}</ul>
              </div>
              <div className="flex gap-3">
                {['Deploy Security', 'Send Mass Alert', 'View Live Feed'].map((b, i) => (
                  <motion.button key={i} whileHover={{ scale: 1.03 }} className="flex-1 py-3 rounded-xl font-semibold text-white" style={{ background: i === 0 ? 'linear-gradient(135deg,#06b6d4,#0891b2)' : i === 1 ? 'linear-gradient(135deg,#ef4444,#dc2626)' : 'linear-gradient(135deg,#8b5cf6,#7c3aed)' }}>{b}</motion.button>
                ))}
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </motion.div>
  )
}

export default RiskAssessment