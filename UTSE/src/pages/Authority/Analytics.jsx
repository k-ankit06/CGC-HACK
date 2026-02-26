import { BarChart, Bar, PieChart, Pie, Cell, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts'
import { TrendingUp, Users, AlertTriangle, MapPin } from 'lucide-react'
import { motion } from 'framer-motion'

const glass = { background: 'rgba(255,255,255,0.06)', backdropFilter: 'blur(24px)', WebkitBackdropFilter: 'blur(24px)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '1rem', boxShadow: '0 8px 32px rgba(0,0,0,0.3)' }
const cAnim = { hidden: { opacity: 0 }, visible: { opacity: 1, transition: { staggerChildren: 0.1 } } }
const iAnim = { hidden: { opacity: 0, y: 30 }, visible: { opacity: 1, y: 0, transition: { duration: 0.5 } } }
const ttStyle = { background: 'rgba(10,10,26,0.9)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '0.75rem', color: '#fff' }

const AuthorityAnalytics = () => {
  const monthlyData = [
    { month: 'Jan', tourists: 2400, incidents: 45, resolved: 42 }, { month: 'Feb', tourists: 2210, incidents: 38, resolved: 36 },
    { month: 'Mar', tourists: 2780, incidents: 42, resolved: 40 }, { month: 'Apr', tourists: 3100, incidents: 35, resolved: 34 },
    { month: 'May', tourists: 3500, incidents: 28, resolved: 28 }, { month: 'Jun', tourists: 3800, incidents: 22, resolved: 22 },
  ]
  const incidentTypes = [
    { name: 'Medical', value: 35, color: '#ef4444' }, { name: 'Theft', value: 25, color: '#f59e0b' },
    { name: 'Lost Tourist', value: 20, color: '#06b6d4' }, { name: 'Language', value: 12, color: '#8b5cf6' },
    { name: 'Others', value: 8, color: '#10b981' },
  ]
  const locationData = [
    { location: 'Taj Mahal', tourists: 4500, incidents: 12 }, { location: 'India Gate', tourists: 3800, incidents: 18 },
    { location: 'Red Fort', tourists: 3200, incidents: 22 }, { location: 'Qutub Minar', tourists: 2500, incidents: 8 },
    { location: 'Gateway', tourists: 4200, incidents: 15 },
  ]
  const metrics = [
    { m: 'Avg Response Time', c: '3.2 min', t: '< 5 min', s: 'Achieved' },
    { m: 'Resolution Rate', c: '96.5%', t: '> 95%', s: 'Achieved' },
    { m: 'Tourist Satisfaction', c: '91.2%', t: '> 90%', s: 'Achieved' },
    { m: 'Safety Score', c: '94.2%', t: '> 95%', s: 'Near Target' },
  ]

  return (
    <motion.div variants={cAnim} initial="hidden" animate="visible" className="space-y-6">
      <motion.div variants={iAnim}>
        <h2 className="text-3xl font-bold text-white" style={{ textShadow: '0 0 30px rgba(6,182,212,0.4)' }}>Analytics & Insights</h2>
        <p className="mt-1" style={{ color: 'rgba(153,246,228,0.6)' }}>Comprehensive data analysis and performance metrics</p>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {[{ l: 'Total Tourists (YTD)', v: '18,790', s: '↑ 24%', icon: Users, g: 'linear-gradient(135deg,#06b6d4,#0891b2)' },
        { l: 'Resolution Rate', v: '96.5%', s: '↑ 3.2%', icon: TrendingUp, g: 'linear-gradient(135deg,#10b981,#059669)' },
        { l: 'Avg Response', v: '3.2min', s: '↓ 18% faster', icon: AlertTriangle, g: 'linear-gradient(135deg,#f59e0b,#d97706)' },
        { l: 'Safety Score', v: '94.2%', s: '↑ 2.8%', icon: TrendingUp, g: 'linear-gradient(135deg,#8b5cf6,#7c3aed)' }
        ].map((c, i) => (
          <motion.div key={i} variants={iAnim} whileHover={{ scale: 1.05, y: -5 }} className="p-5 rounded-2xl text-white" style={{ background: c.g, boxShadow: '0 8px 30px rgba(0,0,0,0.3)' }}>
            <div className="flex items-center justify-between">
              <div><p className="text-sm opacity-80">{c.l}</p><p className="text-3xl font-bold mt-1">{c.v}</p><p className="text-sm opacity-70 mt-1">{c.s}</p></div>
              <c.icon className="h-12 w-12 opacity-40" />
            </div>
          </motion.div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <motion.div variants={iAnim} className="p-6" style={glass}>
          <h3 className="text-xl font-bold text-white mb-4">Tourist & Incident Trends</h3>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={monthlyData}>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.08)" />
              <XAxis dataKey="month" stroke="rgba(153,246,228,0.5)" /><YAxis yAxisId="left" stroke="rgba(153,246,228,0.5)" /><YAxis yAxisId="right" orientation="right" stroke="rgba(153,246,228,0.5)" />
              <Tooltip contentStyle={ttStyle} /><Legend wrapperStyle={{ color: 'rgba(153,246,228,0.7)' }} />
              <Line yAxisId="left" type="monotone" dataKey="tourists" stroke="#06b6d4" strokeWidth={2} name="Tourists" />
              <Line yAxisId="right" type="monotone" dataKey="incidents" stroke="#ef4444" strokeWidth={2} name="Incidents" />
            </LineChart>
          </ResponsiveContainer>
        </motion.div>
        <motion.div variants={iAnim} className="p-6" style={glass}>
          <h3 className="text-xl font-bold text-white mb-4">Incident Distribution</h3>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie data={incidentTypes} cx="50%" cy="50%" labelLine={false} label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`} outerRadius={100} dataKey="value">
                {incidentTypes.map((entry, index) => (<Cell key={`cell-${index}`} fill={entry.color} />))}
              </Pie>
              <Tooltip contentStyle={ttStyle} />
            </PieChart>
          </ResponsiveContainer>
        </motion.div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <motion.div variants={iAnim} className="p-6" style={glass}>
          <h3 className="text-xl font-bold text-white mb-4">Location-wise Analysis</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={locationData}>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.08)" />
              <XAxis dataKey="location" stroke="rgba(153,246,228,0.5)" angle={-15} textAnchor="end" height={80} />
              <YAxis stroke="rgba(153,246,228,0.5)" /><Tooltip contentStyle={ttStyle} /><Legend wrapperStyle={{ color: 'rgba(153,246,228,0.7)' }} />
              <Bar dataKey="tourists" fill="#06b6d4" name="Tourists" radius={[4, 4, 0, 0]} />
              <Bar dataKey="incidents" fill="#ef4444" name="Incidents" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </motion.div>
        <motion.div variants={iAnim} className="p-6" style={glass}>
          <h3 className="text-xl font-bold text-white mb-4">Resolution Performance</h3>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={monthlyData}>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.08)" />
              <XAxis dataKey="month" stroke="rgba(153,246,228,0.5)" /><YAxis stroke="rgba(153,246,228,0.5)" />
              <Tooltip contentStyle={ttStyle} /><Legend wrapperStyle={{ color: 'rgba(153,246,228,0.7)' }} />
              <Line type="monotone" dataKey="incidents" stroke="#f59e0b" strokeWidth={2} name="Total" />
              <Line type="monotone" dataKey="resolved" stroke="#10b981" strokeWidth={2} name="Resolved" />
            </LineChart>
          </ResponsiveContainer>
        </motion.div>
      </div>

      <motion.div variants={iAnim} className="p-6" style={glass}>
        <h3 className="text-xl font-bold text-white mb-4">Performance Summary</h3>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead><tr style={{ borderBottom: '1px solid rgba(255,255,255,0.1)' }}>
              {['Metric', 'Current', 'Target', 'Status'].map(h => <th key={h} className="text-left py-3 px-4 font-semibold" style={{ color: 'rgba(153,246,228,0.7)' }}>{h}</th>)}
            </tr></thead>
            <tbody>
              {metrics.map((r, i) => (
                <tr key={i} style={{ borderTop: '1px solid rgba(255,255,255,0.06)' }}>
                  <td className="py-3 px-4 text-white">{r.m}</td>
                  <td className="py-3 px-4 font-semibold text-white">{r.c}</td>
                  <td className="py-3 px-4" style={{ color: 'rgba(153,246,228,0.5)' }}>{r.t}</td>
                  <td className="py-3 px-4"><span className="px-2 py-1 rounded-full text-xs font-bold" style={{ background: r.s === 'Achieved' ? 'rgba(16,185,129,0.2)' : 'rgba(245,158,11,0.2)', color: r.s === 'Achieved' ? '#6ee7b7' : '#fde68a' }}>{r.s}</span></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </motion.div>
    </motion.div>
  )
}

export default AuthorityAnalytics