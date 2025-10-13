import { useState } from 'react'
import { FileText, Plus, Search, Download, Eye, Edit, Trash2 } from 'lucide-react'

const IncidentManagement = () => {
  const [showAddForm, setShowAddForm] = useState(false)
  const [filterType, setFilterType] = useState('all')
  const [searchTerm, setSearchTerm] = useState('')

  const incidents = [
    { id: 'INC-2024-001', type: 'Medical Emergency', tourist: 'John Anderson', location: 'Taj Mahal, Agra', date: '2024-01-20', time: '14:30', severity: 'Critical', status: 'Resolved', description: 'Tourist collapsed due to heat exhaustion', responseTeam: 'Medical Team Alpha', responseTime: '00:03:15', resolution: 'Provided immediate medical care, tourist recovered', officer: 'Officer Sharma' },
    { id: 'INC-2024-002', type: 'Theft', tourist: 'Sarah Williams', location: 'India Gate, Delhi', date: '2024-01-21', time: '16:45', severity: 'High', status: 'Investigating', description: 'Wallet and phone stolen from tourist bag', responseTeam: 'Police Unit Bravo', responseTime: '00:05:30', resolution: 'Investigation ongoing, CCTV footage obtained', officer: 'Officer Kumar' },
    { id: 'INC-2024-003', type: 'Lost Tourist', tourist: 'Hans Mueller', location: 'Red Fort, Delhi', date: '2024-01-21', time: '11:20', severity: 'Medium', status: 'Resolved', description: 'Tourist separated from group, unable to find exit', responseTeam: 'Patrol Team Charlie', responseTime: '00:08:00', resolution: 'Tourist located and reunited with group', officer: 'Officer Patel' },
    { id: 'INC-2024-004', type: 'Language Barrier', tourist: 'Takeshi Yamamoto', location: 'Hawa Mahal, Jaipur', date: '2024-01-22', time: '10:15', severity: 'Low', status: 'Resolved', description: 'Tourist unable to communicate, needed translator', responseTeam: 'Language Support Delta', responseTime: '00:06:45', resolution: 'Japanese translator provided assistance', officer: 'Officer Singh' },
    { id: 'INC-2024-005', type: 'Accident', tourist: 'Maria Rodriguez', location: 'Gateway of India, Mumbai', date: '2024-01-22', time: '18:00', severity: 'High', status: 'In Progress', description: 'Tourist involved in vehicle collision', responseTeam: 'Emergency Medical Echo', responseTime: '00:04:20', resolution: 'Under medical care at hospital', officer: 'Officer Verma' },
  ]

  const getStatusColor = (status) => {
    switch(status) {
      case 'Resolved': return 'bg-success-100 text-success-700';
      case 'In Progress': return 'bg-warning-100 text-warning-700';
      case 'Investigating': return 'bg-primary-100 text-primary-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  }

  const getSeverityColor = (severity) => {
    switch(severity) {
      case 'Critical': return 'bg-danger-100 text-danger-700';
      case 'High': return 'bg-warning-100 text-warning-700';
      case 'Medium': return 'bg-yellow-100 text-yellow-700';
      case 'Low': return 'bg-success-100 text-success-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  }

  const filteredIncidents = incidents.filter(incident => {
    const matchesSearch = incident.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         incident.tourist.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         incident.type.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesFilter = filterType === 'all' || incident.type === filterType
    return matchesSearch && matchesFilter
  })

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold text-gray-900">Incident Management</h2>
          <p className="text-gray-600 mt-1">Comprehensive incident tracking and reporting system</p>
        </div>
        <button onClick={() => setShowAddForm(true)} className="btn-primary">
          <Plus className="inline h-5 w-5 mr-2" /> Report New Incident
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="card bg-gradient-to-br from-primary-500 to-primary-600 text-white"><p className="text-primary-100 text-sm">Total Incidents</p><p className="text-4xl font-bold mt-1">{incidents.length}</p></div>
        <div className="card bg-gradient-to-br from-success-500 to-success-600 text-white"><p className="text-success-100 text-sm">Resolved</p><p className="text-4xl font-bold mt-1">{incidents.filter(i => i.status === 'Resolved').length}</p></div>
        <div className="card bg-gradient-to-br from-warning-500 to-warning-600 text-white"><p className="text-warning-100 text-sm">In Progress</p><p className="text-4xl font-bold mt-1">{incidents.filter(i => i.status === 'In Progress').length}</p></div>
        <div className="card bg-gradient-to-br from-purple-500 to-purple-600 text-white"><p className="text-purple-100 text-sm">Avg Response Time</p><p className="text-4xl font-bold mt-1">5:12</p></div>
      </div>

      <div className="card">
        <div className="flex flex-col md:flex-row gap-4 items-center">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
            <input type="text" placeholder="Search by incident ID, tourist name, or type..." className="input-field pl-10" value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} />
          </div>
          <div className="flex gap-2">
            <select className="input-field" value={filterType} onChange={(e) => setFilterType(e.target.value)}>
              <option value="all">All Types</option>
              <option value="Medical Emergency">Medical Emergency</option>
              <option value="Theft">Theft</option>
              <option value="Lost Tourist">Lost Tourist</option>
              <option value="Language Barrier">Language Barrier</option>
              <option value="Accident">Accident</option>
            </select>
            <button className="btn-primary"><Download className="h-5 w-5 mr-2 inline" />Export</button>
          </div>
        </div>
      </div>

      <div className="card overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="text-left py-4 px-4 font-semibold text-gray-700">Incident ID</th>
                <th className="text-left py-4 px-4 font-semibold text-gray-700">Type</th>
                <th className="text-left py-4 px-4 font-semibold text-gray-700">Tourist</th>
                <th className="text-left py-4 px-4 font-semibold text-gray-700">Location</th>
                <th className="text-left py-4 px-4 font-semibold text-gray-700">Date & Time</th>
                <th className="text-left py-4 px-4 font-semibold text-gray-700">Severity</th>
                <th className="text-left py-4 px-4 font-semibold text-gray-700">Status</th>
                <th className="text-left py-4 px-4 font-semibold text-gray-700">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredIncidents.map((incident) => (
                <tr key={incident.id} className="border-t border-gray-100 hover:bg-gray-50">
                  <td className="py-4 px-4 font-mono text-sm font-semibold text-primary-600">{incident.id}</td>
                  <td className="py-4 px-4">{incident.type}</td>
                  <td className="py-4 px-4 font-medium">{incident.tourist}</td>
                  <td className="py-4 px-4 text-gray-600">{incident.location}</td>
                  <td className="py-4 px-4 text-gray-600"><div>{incident.date}</div><div className="text-sm">{incident.time}</div></td>
                  <td className="py-4 px-4"><span className={`px-2 py-1 rounded-full text-xs font-semibold ${getSeverityColor(incident.severity)}`}>{incident.severity}</span></td>
                  <td className="py-4 px-4"><span className={`px-2 py-1 rounded-full text-xs font-semibold ${getStatusColor(incident.status)}`}>{incident.status}</span></td>
                  <td className="py-4 px-4">
                    <div className="flex gap-2">
                      <button className="p-2 text-primary-600 hover:bg-primary-50 rounded"><Eye className="h-4 w-4" /></button>
                      <button className="p-2 text-gray-600 hover:bg-gray-100 rounded"><Edit className="h-4 w-4" /></button>
                      <button className="p-2 text-danger-600 hover:bg-danger-50 rounded"><Trash2 className="h-4 w-4" /></button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      
      {showAddForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl max-w-3xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-2xl font-bold text-gray-900">Report New Incident</h3>
                <button onClick={() => setShowAddForm(false)} className="text-gray-500 hover:text-gray-700 text-2xl">×</button>
              </div>
              <form className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div><label className="block text-sm font-semibold text-gray-700 mb-2">Incident Type *</label><select className="input-field"><option>Medical Emergency</option><option>Theft</option><option>Lost Tourist</option><option>Language Barrier</option><option>Accident</option><option>Harassment</option><option>Other</option></select></div>
                  <div><label className="block text-sm font-semibold text-gray-700 mb-2">Severity Level *</label><select className="input-field"><option>Critical</option><option>High</option><option>Medium</option><option>Low</option></select></div>
                  <div><label className="block text-sm font-semibold text-gray-700 mb-2">Tourist Name *</label><input type="text" className="input-field" placeholder="Enter tourist name" /></div>
                  <div><label className="block text-sm font-semibold text-gray-700 mb-2">Tourist Contact</label><input type="tel" className="input-field" placeholder="+91 1234567890" /></div>
                  <div className="col-span-2"><label className="block text-sm font-semibold text-gray-700 mb-2">Location *</label><input type="text" className="input-field" placeholder="Incident location" /></div>
                  <div><label className="block text-sm font-semibold text-gray-700 mb-2">Date *</label><input type="date" className="input-field" /></div>
                  <div><label className="block text-sm font-semibold text-gray-700 mb-2">Time *</label><input type="time" className="input-field" /></div>
                  <div className="col-span-2"><label className="block text-sm font-semibold text-gray-700 mb-2">Description *</label><textarea className="input-field" rows="4" placeholder="Detailed description of the incident"></textarea></div>
                  <div><label className="block text-sm font-semibold text-gray-700 mb-2">Response Team</label><select className="input-field"><option>Medical Team Alpha</option><option>Police Unit Bravo</option><option>Patrol Team Charlie</option><option>Emergency Medical Delta</option></select></div>
                  <div><label className="block text-sm font-semibold text-gray-700 mb-2">Reporting Officer *</label><input type="text" className="input-field" placeholder="Officer name" /></div>
                </div>
                <div className="flex gap-3 pt-4">
                  <button type="submit" className="flex-1 btn-primary">Submit Incident Report</button>
                  <button type="button" onClick={() => setShowAddForm(false)} className="flex-1 bg-gray-600 text-white px-4 py-2 rounded-lg hover:bg-gray-700">Cancel</button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default IncidentManagement