// import { useState } from 'react'
// import { FileText, Plus, Search, Filter, Download, Eye, Edit, Trash2, Calendar } from 'lucide-react'

// const IncidentManagement = () => {
//   const [showAddForm, setShowAddForm] = useState(false)
//   const [filterType, setFilterType] = useState('all')
//   const [searchTerm, setSearchTerm] = useState('')

//   const incidents = [
//     {
//       id: 'INC-2024-001',
//       type: 'Medical Emergency',
//       tourist: 'John Anderson',
//       location: 'Taj Mahal, Agra',
//       date: '2024-01-20',
//       time: '14:30',
//       severity: 'Critical',
//       status: 'Resolved',
//       description: 'Tourist collapsed due to heat exhaustion',
//       responseTeam: 'Medical Team Alpha',
//       responseTime: '00:03:15',
//       resolution: 'Provided immediate medical care, tourist recovered',
//       officer: 'Officer Sharma'
//     },
//     {
//       id: 'INC-2024-002',
//       type: 'Theft',
//       tourist: 'Sarah Williams',
//       location: 'India Gate, Delhi',
//       date: '2024-01-21',
//       time: '16:45',
//       severity: 'High',
//       status: 'Investigating',
//       description: 'Wallet and phone stolen from tourist bag',
//       responseTeam: 'Police Unit Bravo',
//       responseTime: '00:05:30',
//       resolution: 'Investigation ongoing, CCTV footage obtained',
//       officer: 'Officer Kumar'
//     },
//     {
//       id: 'INC-2024-003',
//       type: 'Lost Tourist',
//       tourist: 'Hans Mueller',
//       location: 'Red Fort, Delhi',
//       date: '2024-01-21',
//       time: '11:20',
//       severity: 'Medium',
//       status: 'Resolved',
//       description: 'Tourist separated from group, unable to find exit',
//       responseTeam: 'Patrol Team Charlie',
//       responseTime: '00:08:00',
//       resolution: 'Tourist located and reunited with group',
//       officer: 'Officer Patel'
//     },
//     {
//       id: 'INC-2024-004',
//       type: 'Language Barrier',
//       tourist: 'Takeshi Yamamoto',
//       location: 'Hawa Mahal, Jaipur',
//       date: '2024-01-22',
//       time: '10:15',
//       severity: 'Low',
//       status: 'Resolved',
//       description: 'Tourist unable to communicate, needed translator',
//       responseTeam: 'Language Support Delta',
//       responseTime: '00:06:45',
//       resolution: 'Japanese translator provided assistance',
//       officer: 'Officer Singh'
//     },
//     {
//       id: 'INC-2024-005',
//       type: 'Accident',
//       tourist: 'Maria Rodriguez',
//       location: 'Gateway of India, Mumbai',
//       date: '2024-01-22',
//       time: '18:00',
//       severity: 'High',
//       status: 'In Progress',
//       description: 'Tourist involved in vehicle collision',
//       responseTeam: 'Emergency Medical Echo',
//       responseTime: '00:04:20',
//       resolution: 'Under medical care at hospital',
//       officer: 'Officer Verma'
//     },
//   ]

//   const getStatusColor = (status) => {
//     switch(status) {
//       case 'Resolved': return 'bg-success-100 text-success-700'
//       case 'In Progress': return 'bg-warning-100 text-warning-700'
//       case 'Investigating': return 'bg-primary-100 text-primary-700'
//       default: return 'bg-gray-100 text-gray-700'
//     }
//   }

//   const getSeverityColor = (severity) => {
//     switch(severity) {
//       case 'Critical': return 'bg-danger-100 text-danger-700'
//       case 'High': return 'bg-warning-100 text-warning-700'
//       case 'Medium': return 'bg-yellow-100 text-yellow-700'
//       case 'Low': return 'bg-success-100 text-success-700'
//       default: return 'bg-gray-100 text-gray-700'
//     }
//   }

//   const filteredIncidents = incidents.filter(incident => {
//     const matchesSearch = incident.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
//                          incident.tourist.toLowerCase().includes(searchTerm.toLowerCase()) ||
//                          incident.type.toLowerCase().includes(searchTerm.toLowerCase())
//     const matchesFilter = filterType === 'all' || incident.type === filterType
//     return matchesSearch && matchesFilter
//   })

//   return (
//     <div className="space-y-6">
//       <div className="flex items-center justify-between">
//         <div>
//           <h2 className="text-3xl font-bold text-gray-900">Incident Management</h2>
//           <p className="text-gray-600 mt-1">Comprehensive incident tracking and reporting system</p>
//         </div>
//         <button 
//           onClick={() => setShowAddForm(true)}
//           className="btn-primary"
//         >
//           <Plus className="inline h-5 w-5 mr-2" />
//           Report New Incident
//         </button>
//       </div>

//       {/* Stats Overview */}
//       <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
//         <div className="card bg-gradient-to-br from-primary-500 to-primary-600 text-white">
//           <p className="text-primary-100 text-sm">Total Incidents</p>
//           <p className="text-4xl font-bold mt-1">{incidents.length}</p>
//         </div>
//         <div className="card bg-gradient-to-br from-success-500 to-success-600 text-white">
//           <p className="text-success-100 text-sm">Resolved</p>
//           <p className="text-4xl font-bold mt-1">{incidents.filter(i => i.status === 'Resolved').length}</p>
//         </div>
//         <div className="card bg-gradient-to-br from-warning-500 to-warning-600 text-white">
//           <p className="text-warning-100 text-sm">In Progress</p>
//           <p className="text-4xl font-bold mt-1">{incidents.filter(i => i.status === 'In Progress').length}</p>
//         </div>
//         <div className="card bg-gradient-to-br from-purple-500 to-purple-600 text-white">
//           <p className="text-purple-100 text-sm">Avg Response Time</p>
//           <p className="text-4xl font-bold mt-1">5:12</p>
//         </div>
//       </div>

//       {/* Search and Filter */}
//       <div className="card">
//         <div className="flex flex-col md:flex-row gap-4 items-center">
//           <div className="flex-1 relative">
//             <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
//             <input
//               type="text"
//               placeholder="Search by incident ID, tourist name, or type..."
//               className="input-field pl-10"
//               value={searchTerm}
//               onChange={(e) => setSearchTerm(e.target.value)}
//             />
//           </div>
//           <div className="flex gap-2">
//             <select 
//               className="input-field"
//               value={filterType}
//               onChange={(e) => setFilterType(e.target.value)}
//             >
//               <option value="all">All Types</option>
//               <option value="Medical Emergency">Medical Emergency</option>
//               <option value="Theft">Theft</option>
//               <option value="Lost Tourist">Lost Tourist</option>
//               <option value="Language Barrier">Language Barrier</option>
//               <option value="Accident">Accident</option>
//             </select>
//             <button className="btn-primary">
//               <Download className="h-5 w-5 mr-2 inline" />
//               Export
//             </button>
//           </div>
//         </div>
//       </div>

//       {/* Incidents Table */}
//       <div className="card overflow-hidden">
//         <div className="overflow-x-auto">
//           <table className="w-full">
//             <thead className="bg-gray-50">
//               <tr>
//                 <th className="text-left py-4 px-4 font-semibold text-gray-700">Incident ID</th>
//                 <th className="text-left py-4 px-4 font-semibold text-gray-700">Type</th>
//                 <th className="text-left py-4 px-4 font-semibold text-gray-700">Tourist</th>
//                 <th className="text-left py-4 px-4 font-semibold text-gray-700">Location</th>
//                 <th className="text-left py-4 px-4 font-semibold text-gray-700">Date & Time</th>
//                 <th className="text-left py-4 px-4 font-semibold text-gray-700">Severity</th>
//                 <th className="text-left py-4 px-4 font-semibold text-gray-700">Status</th>
//                 <th className="text-left py-4 px-4 font-semibold text-gray-700">Actions</th>
//               </tr>
//             </thead>
//             <tbody>
//               {filteredIncidents.map((incident) => (
//                 <tr key={incident.id} className="border-t border-gray-100 hover:bg-gray-50">
//                   <td className="py-4 px-4 font-mono text-sm font-semibold text-primary-600">{incident.id}</td>
//                   <td className="py-4 px-4">{incident.type}</td>
//                   <td className="py-4 px-4 font-medium">{incident.tourist}</td>
//                   <td className="py-4 px-4 text-gray-600">{incident.location}</td>
//                   <td className="py-4 px-4 text-gray-600">
//                     <div>{incident.date}</div>
//                     <div className="text-sm">{incident.time}</div>
//                   </td>
//                   <td className="py-4 px-4">
//                     <span className={`px-2 py-1 rounded-full text-xs font-semibold ${getSeverityColor(incident.severity)}`}>
//                       {incident.severity}
//                     </span>
//                   </td>
//                   <td className="py-4 px-4">
//                     <span className={`px-2 py-1 rounded-full text-xs font-semibold ${getStatusColor(incident.status)}`}>
//                       {incident.status}
//                     </span>
//                   </td>
//                   <td className="py-4 px-4">
//                     <div className="flex gap-2">
//                       <button className="p-2 text-primary-600 hover:bg-primary-50 rounded">
//                         <Eye className="h-4 w-4" />
//                       </button>
//                       <button className="p-2 text-gray-600 hover:bg-gray-100 rounded">
//                         <Edit className="h-4 w-4" />
//                       </button>
//                       <button className="p-2 text-danger-600 hover:bg-danger-50 rounded">
//                         <Trash2 className="h-4 w-4" />
//                       </button>
//                     </div>
//                   </td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         </div>
//       </div>

//       {/* Add Incident Form Modal */}
//       {showAddForm && (
//         <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
//           <div className="bg-white rounded-2xl max-w-3xl w-full max-h-[90vh] overflow-y-auto">
//             <div className="p-6">
//               <div className="flex items-center justify-between mb-6">
//                 <h3 className="text-2xl font-bold text-gray-900">Report New Incident</h3>
//                 <button
//                   onClick={() => setShowAddForm(false)}
//                   className="text-gray-500 hover:text-gray-700 text-2xl"
//                 >
//                   ×
//                 </button>
//               </div>

//               <form className="space-y-4">
//                 <div className="grid grid-cols-2 gap-4">
//                   <div>
//                     <label className="block text-sm font-semibold text-gray-700 mb-2">
//                       Incident Type *
//                     </label>
//                     <select className="input-field">
//                       <option>Medical Emergency</option>
//                       <option>Theft</option>
//                       <option>Lost Tourist</option>
//                       <option>Language Barrier</option>
//                       <option>Accident</option>
//                       <option>Harassment</option>
//                       <option>Other</option>
//                     </select>
//                   </div>

//                   <div>
//                     <label className="block text-sm font-semibold text-gray-700 mb-2">
//                       Severity Level *
//                     </label>
//                     <select className="input-field">
//                       <option>Critical</option>
//                       <option>High</option>
//                       <option>Medium</option>
//                       <option>Low</option>
//                     </select>
//                   </div>

//                   <div>
//                     <label className="block text-sm font-semibold text-gray-700 mb-2">
//                       Tourist Name *
//                     </label>
//                     <input type="text" className="input-field" placeholder="Enter tourist name" />
//                   </div>

//                   <div>
//                     <label className="block text-sm font-semibold text-gray-700 mb-2">
//                       Tourist Contact
//                     </label>
//                     <input type="tel" className="input-field" placeholder="+91 1234567890" />
//                   </div>

//                   <div className="col-span-2">
//                     <label className="block text-sm font-semibold text-gray-700 mb-2">
//                       Location *
//                     </label>
//                     <input type="text" className="input-field" placeholder="Incident location" />
//                   </div>

//                   <div>
//                     <label className="block text-sm font-semibold text-gray-700 mb-2">
//                       Date *
//                     </label>
//                     <input type="date" className="input-field" />
//                   </div>

//                   <div>
//                     <label className="block text-sm font-semibold text-gray-700 mb-2">
//                       Time *
//                     </label>
//                     <input type="time" className="input-field" />
//                   </div>

//                   <div className="col-span-2">
//                     <label className="block text-sm font-semibold text-gray-700 mb-2">
//                       Description *
//                     </label>
//                     <textarea 
//                       className="input-field" 
//                       rows="4" 
//                       placeholder="Detailed description of the incident"
//                     ></textarea>
//                   </div>

//                   <div>
//                     <label className="block text-sm font-semibold text-gray-700 mb-2">
//                       Response Team
//                     </label>
//                     <select className="input-field">
//                       <option>Medical Team Alpha</option>
//                       <option>Police Unit Bravo</option>
//                       <option>Patrol Team Charlie</option>
//                       <option>Emergency Medical Delta</option>
//                     </select>
//                   </div>

//                   <div>
//                     <label className="block text-sm font-semibold text-gray-700 mb-2">
//                       Reporting Officer *
//                     </label>
//                     <input type="text" className="input-field" placeholder="Officer name" />
//                   </div>
//                 </div>

//                 <div className="flex gap-3 pt-4">
//                   <button type="submit" className="flex-1 btn-primary">
//                     Submit Incident Report
//                   </button>
//                   <button 
//                     type="button"
//                     onClick={() => setShowAddForm(false)}
//                     className="flex-1 bg-gray-600 text-white px-4 py-2 rounded-lg hover:bg-gray-700"
//                   >
//                     Cancel
//                   </button>
//                 </div>
//               </form>
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   )
// }

// export default IncidentManagement

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import LocationTracker from '../../components/Shared/LocationTracker';

const IncidentManagement = () => {
  const [incidents, setIncidents] = useState([]);
  const [selectedIncident, setSelectedIncident] = useState(null);
  const [statusFilter, setStatusFilter] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [newIncident, setNewIncident] = useState({
    title: '',
    description: '',
    location: '',
    severity: 'medium',
    status: 'open'
  });

  useEffect(() => {
    // Simulate fetching incidents
    const fetchIncidents = () => {
      const sampleIncidents = [
        {
          id: 1,
          title: 'Lost Tourist',
          description: 'Tourist lost in Connaught Place, needs assistance finding their hotel',
          location: 'Connaught Place',
          severity: 'medium',
          status: 'open',
          reportedAt: '2023-05-15 14:30',
          updatedAt: '2023-05-15 14:30'
        },
        {
          id: 2,
          title: 'Medical Emergency',
          description: 'Tourist with heat stroke near India Gate',
          location: 'India Gate',
          severity: 'high',
          status: 'in-progress',
          reportedAt: '2023-05-15 13:45',
          updatedAt: '2023-05-15 14:10'
        },
        {
          id: 3,
          title: 'Pickpocketing Report',
          description: 'Tourist reported pickpocketing in Chandni Chowk',
          location: 'Chandni Chowk',
          severity: 'low',
          status: 'resolved',
          reportedAt: '2023-05-15 11:20',
          updatedAt: '2023-05-15 12:05'
        },
        {
          id: 4,
          title: 'Transportation Issue',
          description: 'Tourist stranded at bus stop with no transportation options',
          location: 'Dwarka Sector 21',
          severity: 'medium',
          status: 'open',
          reportedAt: '2023-05-15 10:15',
          updatedAt: '2023-05-15 10:15'
        },
        {
          id: 5,
          title: 'Language Barrier',
          description: 'Tourist unable to communicate with local vendors',
          location: 'Lajpat Nagar',
          severity: 'low',
          status: 'in-progress',
          reportedAt: '2023-05-15 09:30',
          updatedAt: '2023-05-15 10:00'
        }
      ];

      setIncidents(sampleIncidents);
    };

    fetchIncidents();
  }, []);

  const filteredIncidents = incidents.filter(incident => {
    const matchesSearch = incident.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         incident.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         incident.location.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesStatus = statusFilter === 'all' || incident.status === statusFilter;

    return matchesSearch && matchesStatus;
  });

  const getSeverityColor = (severity) => {
    switch(severity.toLowerCase()) {
      case 'high': return 'bg-red-100 text-red-800';
      case 'medium': return 'bg-yellow-100 text-yellow-800';
      case 'low': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusColor = (status) => {
    switch(status.toLowerCase()) {
      case 'open': return 'bg-blue-100 text-blue-800';
      case 'in-progress': return 'bg-orange-100 text-orange-800';
      case 'resolved': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewIncident(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // In a real app, you would send this to your API
    const newInc = {
      id: Date.now(),
      ...newIncident,
      reportedAt: new Date().toLocaleString(),
      updatedAt: new Date().toLocaleString()
    };

    setIncidents(prev => [newInc, ...prev]);
    setNewIncident({
      title: '',
      description: '',
      location: '',
      severity: 'medium',
      status: 'open'
    });
  };

  return (
    <div className="space-y-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="bg-white p-6 rounded-lg shadow-md"
      >
        <h1 className="text-2xl font-bold text-gray-800 mb-4">Incident Management</h1>
        <p className="text-gray-600">Track and manage incidents reported by tourists</p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
        className="grid grid-cols-1 md:grid-cols-2 gap-6"
      >
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-4">Current Location</h2>
          <LocationTracker />
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-4">Incident Statistics</h2>
          <div className="space-y-4">
            {['open', 'in-progress', 'resolved'].map((status, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
                className="p-4 border rounded-md"
              >
                <div className="flex justify-between items-center">
                  <div>
                    <p className="font-medium">{status.charAt(0).toUpperCase() + status.slice(1)} Incidents</p>
                    <p className="text-sm text-gray-500">
                      {incidents.filter(inc => inc.status === status).length} incidents
                    </p>
                  </div>
                  <span className={`px-2 py-1 text-xs rounded-full ${getStatusColor(status)}`}>
                    {status}
                  </span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="bg-white p-6 rounded-lg shadow-md"
      >
        <h2 className="text-xl font-semibold mb-4">Filter Incidents</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-gray-700 text-sm font-bold mb-2">Search</label>
            <input
              type="text"
              placeholder="Search by title, description, or location"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          <div>
            <label className="block text-gray-700 text-sm font-bold mb-2">Filter by Status</label>
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
            >
              <option value="all">All Statuses</option>
              <option value="open">Open</option>
              <option value="in-progress">In Progress</option>
              <option value="resolved">Resolved</option>
            </select>
          </div>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.3 }}
        className="bg-white p-6 rounded-lg shadow-md"
      >
        <h2 className="text-xl font-semibold mb-4">Report New Incident</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-gray-700 text-sm font-bold mb-2">Title</label>
              <input
                type="text"
                name="title"
                value={newIncident.title}
                onChange={handleInputChange}
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                placeholder="Brief description of incident"
              />
            </div>

            <div>
              <label className="block text-gray-700 text-sm font-bold mb-2">Location</label>
              <input
                type="text"
                name="location"
                value={newIncident.location}
                onChange={handleInputChange}
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                placeholder="Where did it happen?"
              />
            </div>
          </div>

          <div>
            <label className="block text-gray-700 text-sm font-bold mb-2">Description</label>
            <textarea
              name="description"
              value={newIncident.description}
              onChange={handleInputChange}
              required
              rows="3"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
              placeholder="Detailed description of the incident"
            ></textarea>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-gray-700 text-sm font-bold mb-2">Severity</label>
              <select
                name="severity"
                value={newIncident.severity}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
              >
                <option value="low">Low</option>
                <option value="medium">Medium</option>
                <option value="high">High</option>
              </select>
            </div>

            <div>
              <label className="block text-gray-700 text-sm font-bold mb-2">Status</label>
              <select
                name="status"
                value={newIncident.status}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
              >
                <option value="open">Open</option>
                <option value="in-progress">In Progress</option>
                <option value="resolved">Resolved</option>
              </select>
            </div>
          </div>

          <div className="flex justify-end space-x-4">
            <button
              type="button"
              onClick={() => setNewIncident({
                title: '',
                description: '',
                location: '',
                severity: 'medium',
                status: 'open'
              })}
              className="px-4 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300 transition-colors"
            >
              Clear Form
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition-colors"
            >
              Report Incident
            </button>
          </div>
        </form>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.4 }}
        className="bg-white p-6 rounded-lg shadow-md"
      >
        <h2 className="text-xl font-semibold mb-4">Incident List</h2>

        {selectedIncident ? (
          <div className="space-y-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              className="p-4 border rounded-md bg-indigo-50"
            >
              <h3 className="text-lg font-medium mb-2">{selectedIncident.title}</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <p className="text-gray-500 text-sm">Location</p>
                  <p className="font-medium">{selectedIncident.location}</p>
                </div>
                <div>
                  <p className="text-gray-500 text-sm">Severity</p>
                  <p className="font-medium">
                    <span className={`px-2 py-1 text-xs rounded-full ${getSeverityColor(selectedIncident.severity)}`}>
                      {selectedIncident.severity}
                    </span>
                  </p>
                </div>
                <div>
                  <p className="text-gray-500 text-sm">Status</p>
                  <p className="font-medium">
                    <span className={`px-2 py-1 text-xs rounded-full ${getStatusColor(selectedIncident.status)}`}>
                      {selectedIncident.status}
                    </span>
                  </p>
                </div>
                <div>
                  <p className="text-gray-500 text-sm">Reported At</p>
                  <p className="font-medium">{selectedIncident.reportedAt}</p>
                </div>
                <div>
                  <p className="text-gray-500 text-sm">Last Updated</p>
                  <p className="font-medium">{selectedIncident.updatedAt}</p>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: 0.1 }}
              className="space-y-4"
            >
              <h3 className="text-lg font-medium">Description</h3>
              <p className="text-gray-700">{selectedIncident.description}</p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: 0.2 }}
              className="flex justify-end space-x-4"
            >
              <button
                onClick={() => setSelectedIncident(null)}
                className="px-4 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300 transition-colors"
              >
                Back to List
              </button>
              <button
                className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition-colors"
              >
                Update Incident
              </button>
            </motion.div>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Title</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Location</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Severity</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Reported At</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredIncidents.map((incident) => (
                  <motion.tr
                    key={incident.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: incident.id * 0.05 }}
                    className="hover:bg-gray-50 transition-colors"
                  >
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{incident.title}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{incident.location}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      <span className={`px-2 py-1 text-xs rounded-full ${getSeverityColor(incident.severity)}`}>
                        {incident.severity}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      <span className={`px-2 py-1 text-xs rounded-full ${getStatusColor(incident.status)}`}>
                        {incident.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{incident.reportedAt}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <button
                        onClick={() => setSelectedIncident(incident)}
                        className="text-indigo-600 hover:text-indigo-900"
                      >
                        View Details
                      </button>
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </motion.div>
    </div>
  );
};

export default IncidentManagement;