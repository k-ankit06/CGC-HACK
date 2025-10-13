import { useState } from 'react';
import { FileText, Plus, Search, Download, Eye, Edit, Trash2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const initialIncidentsData = [
  { id: 'INC-2024-001', type: 'Medical Emergency', tourist: 'John Anderson', location: 'Taj Mahal, Agra', date: '2024-01-20', time: '14:30', severity: 'Critical', status: 'Resolved', description: 'Tourist collapsed due to heat exhaustion', responseTeam: 'Medical Team Alpha', officer: 'Officer Sharma' },
  { id: 'INC-2024-002', type: 'Theft', tourist: 'Sarah Williams', location: 'India Gate, Delhi', date: '2024-01-21', time: '16:45', severity: 'High', status: 'Investigating', description: 'Wallet and phone stolen', responseTeam: 'Police Unit Bravo', officer: 'Officer Kumar' },
  { id: 'INC-2024-003', type: 'Lost Tourist', tourist: 'Hans Mueller', location: 'Red Fort, Delhi', date: '2024-01-21', time: '11:20', severity: 'Medium', status: 'Resolved', description: 'Tourist separated from group', responseTeam: 'Patrol Team Charlie', officer: 'Officer Patel' },
];

const IncidentManagement = () => {
  const [incidents, setIncidents] = useState(initialIncidentsData); 
  const [showModal, setShowModal] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [selectedIncident, setSelectedIncident] = useState(null);
  const [filterType, setFilterType] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');

  const handleAddNewIncident = (formData) => {
    const newIncident = {
      id: `INC-${Date.now().toString().slice(-5)}`,
      ...formData,
      status: 'In Progress' 
    };
    setIncidents([newIncident, ...incidents]);
    setShowModal(false);
  };

  const handleUpdateIncident = (formData) => {
    setIncidents(incidents.map(inc => inc.id === formData.id ? { ...inc, ...formData } : inc));
    setShowModal(false);
    setSelectedIncident(null);
  };

  const handleDeleteIncident = (incidentId) => {
    if (window.confirm("Are you sure you want to delete this incident record?")) {
      setIncidents(incidents.filter(inc => inc.id !== incidentId));
    }
  };

  const openModal = (incident = null) => {
    setSelectedIncident(incident);
    setIsEditing(!!incident);
    setShowModal(true);
  };
  
  const getStatusColor = (status) => {};
  const getSeverityColor = (severity) => {};

  const filteredIncidents = incidents.filter(incident => {
    const matchesSearch = incident.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         incident.tourist.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         incident.type.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filterType === 'all' || incident.type === filterType;
    return matchesSearch && matchesFilter;
  });

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold text-gray-900">Incident Management</h2>
          <p className="text-gray-600 mt-1">Comprehensive incident tracking and reporting system</p>
        </div>
        <button onClick={() => openModal()} className="btn-primary">
          <Plus className="inline h-5 w-5 mr-2" /> Report New Incident
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="card bg-gradient-to-br from-primary-500 to-primary-600 text-white"><p>Total Incidents</p><p className="text-4xl font-bold mt-1">{incidents.length}</p></div>
        <div className="card bg-gradient-to-br from-success-500 to-success-600 text-white"><p>Resolved</p><p className="text-4xl font-bold mt-1">{incidents.filter(i => i.status === 'Resolved').length}</p></div>
        <div className="card bg-gradient-to-br from-warning-500 to-warning-600 text-white"><p>In Progress</p><p className="text-4xl font-bold mt-1">{incidents.filter(i => i.status !== 'Resolved').length}</p></div>
      </div>

      <div className="card">{}</div>

      <div className="card overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">{}</thead>
            <tbody>
              {filteredIncidents.map((incident) => (
                <tr key={incident.id} className="border-t hover:bg-gray-50">
                  <td className="py-4 px-4 font-mono text-sm font-semibold text-primary-600">{incident.id}</td>
                  <td className="py-4 px-4">{incident.type}</td>
                  <td className="py-4 px-4 font-medium">{incident.tourist}</td>
                  <td className="py-4 px-4">{incident.location}</td>
                  <td className="py-4 px-4"><div>{incident.date}</div><div className="text-sm">{incident.time}</div></td>
                  <td className="py-4 px-4"><span className={`px-2 py-1 rounded-full text-xs font-semibold ${getSeverityColor(incident.severity)}`}>{incident.severity}</span></td>
                  <td className="py-4 px-4"><span className={`px-2 py-1 rounded-full text-xs font-semibold ${getStatusColor(incident.status)}`}>{incident.status}</span></td>
                  <td className="py-4 px-4">
                    <div className="flex gap-2">
                      <button onClick={() => openModal(incident)} className="p-2 text-primary-600 hover:bg-primary-50 rounded"><Eye className="h-4 w-4" /></button>
                      <button onClick={() => handleDeleteIncident(incident.id)} className="p-2 text-danger-600 hover:bg-danger-50 rounded"><Trash2 className="h-4 w-4" /></button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      
      <AnimatePresence>
        {showModal && (
          <IncidentFormModal
            incident={selectedIncident}
            isEditing={isEditing}
            onClose={() => setShowModal(false)}
            onSave={isEditing ? handleUpdateIncident : handleAddNewIncident}
          />
        )}
      </AnimatePresence>
    </div>
  );
};


const IncidentFormModal = ({ incident, isEditing, onClose, onSave }) => {
  const [formData, setFormData] = useState(
    incident || {
      type: 'Medical Emergency', severity: 'Medium', tourist: '', location: '',
      date: new Date().toISOString().split('T')[0], time: new Date().toTimeString().slice(0, 5),
      description: '', responseTeam: 'Medical Team Alpha', officer: ''
    }
  );

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(formData);
  };

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <motion.div initial={{ y: -50, opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ y: 50, opacity: 0 }} className="bg-white rounded-2xl max-w-3xl w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-2xl font-bold">{isEditing ? `Edit Incident: ${incident.id}` : 'Report New Incident'}</h3>
            <button onClick={onClose} className="text-gray-500 text-2xl">×</button>
          </div>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div><label className="block text-sm font-semibold">Incident Type *</label><select name="type" className="input-field" value={formData.type} onChange={handleChange}><option>Medical Emergency</option><option>Theft</option><option>Lost Tourist</option></select></div>
              <div><label className="block text-sm font-semibold">Severity Level *</label><select name="severity" className="input-field" value={formData.severity} onChange={handleChange}><option>Critical</option><option>High</option><option>Medium</option><option>Low</option></select></div>
              <div><label className="block text-sm font-semibold">Tourist Name *</label><input name="tourist" type="text" className="input-field" value={formData.tourist} onChange={handleChange} required /></div>
              <div className="col-span-2"><label className="block text-sm font-semibold">Location *</label><input name="location" type="text" className="input-field" value={formData.location} onChange={handleChange} required /></div>
              <div><label className="block text-sm font-semibold">Date *</label><input name="date" type="date" className="input-field" value={formData.date} onChange={handleChange} /></div>
              <div><label className="block text-sm font-semibold">Time *</label><input name="time" type="time" className="input-field" value={formData.time} onChange={handleChange} /></div>
              <div className="col-span-2"><label className="block text-sm font-semibold">Description *</label><textarea name="description" className="input-field" rows="3" value={formData.description} onChange={handleChange}></textarea></div>
            </div>
            <div className="flex gap-3 pt-4">
              <button type="submit" className="flex-1 btn-primary">{isEditing ? 'Save Changes' : 'Submit Report'}</button>
              <button type="button" onClick={onClose} className="flex-1 bg-gray-600 text-white px-4 py-2 rounded-lg">Cancel</button>
            </div>
          </form>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default IncidentManagement;