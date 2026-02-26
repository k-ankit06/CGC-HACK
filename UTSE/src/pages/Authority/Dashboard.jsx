import { Users, AlertTriangle, Shield, Clock, TrendingUp, TrendingDown } from 'lucide-react'
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'
import { motion } from 'framer-motion'

const glass = { background: 'rgba(255,255,255,0.06)', backdropFilter: 'blur(24px)', WebkitBackdropFilter: 'blur(24px)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '1rem', boxShadow: '0 8px 32px rgba(0,0,0,0.3)' }
const cAnim = { hidden: { opacity: 0 }, visible: { opacity: 1, transition: { staggerChildren: 0.1 } } }
const iAnim = { hidden: { opacity: 0, y: 30 }, visible: { opacity: 1, y: 0, transition: { duration: 0.5 } } }

const StatsCard = ({ title, value, icon: Icon, trend, gradient }) => (
  <motion.div variants={iAnim} whileHover={{ scale: 1.05, y: -5 }} className="p-6 rounded-2xl text-white" style={{ background: gradient, boxShadow: '0 8px 30px rgba(0,0,0,0.3)' }}>
    <div className="flex items-center justify-between">
      <div>
        <p className="text-sm opacity-80">{title}</p>
        <p className="text-3xl font-bold mt-2">{value}</p>
        {trend && (
          <div className="flex items-center mt-2" style={{ color: trend > 0 ? '#86efac' : '#fca5a5' }}>
            {trend > 0 ? <TrendingUp className="h-4 w-4 mr-1" /> : <TrendingDown className="h-4 w-4 mr-1" />}
            <span className="text-sm font-medium">{Math.abs(trend)}% from last month</span>
          </div>
        )}
      </div>
      <div className="p-4 rounded-xl" style={{ background: 'rgba(255,255,255,0.15)' }}><Icon className="h-8 w-8" /></div>
    </div>
  </motion.div>
)

const AuthorityDashboard = () => {
  const incidentData = [
    { month: 'Jan', incidents: 45, resolved: 42 }, { month: 'Feb', incidents: 38, resolved: 36 },
    { month: 'Mar', incidents: 42, resolved: 40 }, { month: 'Apr', incidents: 35, resolved: 34 },
    { month: 'May', incidents: 28, resolved: 28 }, { month: 'Jun', incidents: 22, resolved: 22 },
  ]
  const recentIncidents = [
    { id: 1, type: 'Medical Emergency', location: 'Taj Mahal', time: '10 mins ago', severity: 'High' },
    { id: 2, type: 'Lost Tourist', location: 'Red Fort', time: '25 mins ago', severity: 'Medium' },
    { id: 3, type: 'Theft Report', location: 'Gateway of India', time: '1 hour ago', severity: 'High' },
    { id: 4, type: 'Language Barrier', location: 'Hawa Mahal', time: '2 hours ago', severity: 'Low' },
  ]

  return (
    <motion.div variants={cAnim} initial="hidden" animate="visible" className="space-y-6">
      <motion.div variants={iAnim}>
        <h2 className="text-3xl font-bold text-white" style={{ textShadow: '0 0 30px rgba(6,182,212,0.4)' }}>Dashboard Overview</h2>
        <p className="mt-1" style={{ color: 'rgba(153,246,228,0.6)' }}>Real-time tourist safety monitoring and analytics 📊</p>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatsCard title="Active Tourists" value="2,847" icon={Users} trend={12} gradient="linear-gradient(135deg, #06b6d4, #0891b2)" />
        <StatsCard title="Active Incidents" value="3" icon={AlertTriangle} trend={-25} gradient="linear-gradient(135deg, #ef4444, #dc2626)" />
        <StatsCard title="Safety Score" value="94%" icon={Shield} trend={5} gradient="linear-gradient(135deg, #10b981, #059669)" />
        <StatsCard title="Avg Response Time" value="2.3 min" icon={Clock} trend={-15} gradient="linear-gradient(135deg, #f59e0b, #d97706)" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <motion.div variants={iAnim} className="p-6" style={glass}>
          <h3 className="text-lg font-semibold text-white mb-4">Incident Trends 📈</h3>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={incidentData}>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.08)" />
              <XAxis dataKey="month" stroke="rgba(153,246,228,0.5)" />
              <YAxis stroke="rgba(153,246,228,0.5)" />
              <Tooltip contentStyle={{ background: 'rgba(10,10,26,0.9)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '0.75rem', color: '#fff' }} />
              <Line type="monotone" dataKey="incidents" stroke="#06b6d4" strokeWidth={2} dot={{ fill: '#06b6d4' }} />
              <Line type="monotone" dataKey="resolved" stroke="#10b981" strokeWidth={2} dot={{ fill: '#10b981' }} />
            </LineChart>
          </ResponsiveContainer>
        </motion.div>

        <motion.div variants={iAnim} className="p-6" style={glass}>
          <h3 className="text-lg font-semibold text-white mb-4">Recent Incidents ⚠️</h3>
          <div className="space-y-3">
            {recentIncidents.map((incident) => (
              <motion.div key={incident.id} whileHover={{ x: 5, scale: 1.02 }} className="p-4 rounded-xl" style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)', borderLeft: `4px solid ${incident.severity === 'High' ? '#ef4444' : incident.severity === 'Medium' ? '#f59e0b' : '#10b981'}` }}>
                <div className="flex items-center justify-between">
                  <div><p className="font-semibold text-white">{incident.type}</p><p className="text-sm" style={{ color: 'rgba(153,246,228,0.5)' }}>{incident.location} - {incident.time}</p></div>
                  <span className="px-2 py-1 rounded-full text-xs font-bold text-white" style={{ background: incident.severity === 'High' ? 'rgba(239,68,68,0.3)' : incident.severity === 'Medium' ? 'rgba(245,158,11,0.3)' : 'rgba(16,185,129,0.3)' }}>{incident.severity}</span>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </motion.div>
  )
}

export default AuthorityDashboard