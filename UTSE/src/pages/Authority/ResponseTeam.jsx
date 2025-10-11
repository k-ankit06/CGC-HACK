import { useState } from 'react'
import { Users, Phone, MapPin, Activity, CheckCircle, Clock } from 'lucide-react'

const ResponseTeam = () => {
  const teams = [
    {
      id: 1,
      name: 'Medical Team Alpha',
      type: 'Medical',
      members: 4,
      status: 'Available',
      location: 'Taj Mahal Station',
      currentAssignment: null,
      responseTime: '2:30',
      completedToday: 8,
      contact: '+91 98765 43210'
    },
    {
      id: 2,
      name: 'Police Unit Bravo',
      type: 'Police',
      members: 6,
      status: 'On Duty',
      location: 'Red Fort Area',
      currentAssignment: 'INC-2024-023',
      responseTime: '3:45',
      completedToday: 12,
      contact: '+91 98765 43211'
    },
    {
      id: 3,
      name: 'Patrol Team Charlie',
      type: 'Patrol',
      members: 3,
      status: 'Available',
      location: 'India Gate',
      currentAssignment: null,
      responseTime: '2:15',
      completedToday: 15,
      contact: '+91 98765 43212'
    },
    {
      id: 4,
      name: 'Language Support Delta',
      type: 'Support',
      members: 5,
      status: 'Available',
      location: 'Tourist Help Center',
      currentAssignment: null,
      responseTime: '1:50',
      completedToday: 20,
      contact: '+91 98765 43213'
    },
    {
      id: 5,
      name: 'Emergency Medical Echo',
      type: 'Medical',
      members: 4,
      status: 'On Duty',
      location: 'Gateway of India',
      currentAssignment: 'INC-2024-025',
      responseTime: '4:20',
      completedToday: 6,
      contact: '+91 98765 43214'
    },
  ]

  const getStatusColor = (status) => {
    switch(status) {
      case 'Available': return 'bg-success-100 text-success-700'
      case 'On Duty': return 'bg-warning-100 text-warning-700'
      case 'Off Duty': return 'bg-gray-100 text-gray-700'
      default: return 'bg-gray-100 text-gray-700'
    }
  }

  const getTypeColor = (type) => {
    switch(type) {
      case 'Medical': return 'bg-danger-100 text-danger-700'
      case 'Police': return 'bg-primary-100 text-primary-700'
      case 'Patrol': return 'bg-purple-100 text-purple-700'
      case 'Support': return 'bg-yellow-100 text-yellow-700'
      default: return 'bg-gray-100 text-gray-700'
    }
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold text-gray-900">Response Team Management</h2>
        <p className="text-gray-600 mt-1">Real-time monitoring and coordination of emergency response teams</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="card bg-gradient-to-br from-primary-500 to-primary-600 text-white">
          <p className="text-primary-100 text-sm">Total Teams</p>
          <p className="text-4xl font-bold mt-1">{teams.length}</p>
        </div>
        <div className="card bg-gradient-to-br from-success-500 to-success-600 text-white">
          <p className="text-success-100 text-sm">Available Teams</p>
          <p className="text-4xl font-bold mt-1">{teams.filter(t => t.status === 'Available').length}</p>
        </div>
        <div className="card bg-gradient-to-br from-warning-500 to-warning-600 text-white">
          <p className="text-warning-100 text-sm">On Active Duty</p>
          <p className="text-4xl font-bold mt-1">{teams.filter(t => t.status === 'On Duty').length}</p>
        </div>
        <div className="card bg-gradient-to-br from-purple-500 to-purple-600 text-white">
          <p className="text-purple-100 text-sm">Total Members</p>
          <p className="text-4xl font-bold mt-1">{teams.reduce((sum, t) => sum + t.members, 0)}</p>
        </div>
      </div>

      {/* Response Teams Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {teams.map((team) => (
          <div key={team.id} className="card hover:shadow-xl transition-shadow border-l-4 border-primary-500">
            <div className="flex items-start justify-between mb-4">
              <div>
                <div className="flex items-center gap-3 mb-2">
                  <h3 className="text-xl font-bold text-gray-900">{team.name}</h3>
                  <span className={`px-3 py-1 rounded-full text-xs font-semibold ${getTypeColor(team.type)}`}>
                    {team.type}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <div className={`h-3 w-3 rounded-full ${
                    team.status === 'Available' ? 'bg-success-500' : 
                    team.status === 'On Duty' ? 'bg-warning-500' : 
                    'bg-gray-500'
                  } animate-pulse`}></div>
                  <span className="text-sm font-medium text-gray-600">{team.status}</span>
                </div>
              </div>
              <span className={`px-3 py-1 rounded-full text-xs font-semibold ${getStatusColor(team.status)}`}>
                {team.status}
              </span>
            </div>

            <div className="grid grid-cols-2 gap-4 mb-4">
              <div className="flex items-center gap-2">
                <Users className="h-4 w-4 text-primary-600" />
                <div>
                  <p className="text-xs text-gray-500">Team Members</p>
                  <p className="font-semibold">{team.members} Officers</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="h-4 w-4 text-primary-600" />
                <div>
                  <p className="text-xs text-gray-500">Current Location</p>
                  <p className="font-semibold text-sm">{team.location}</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="h-4 w-4 text-primary-600" />
                <div>
                  <p className="text-xs text-gray-500">Avg Response Time</p>
                  <p className="font-semibold">{team.responseTime} mins</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="h-4 w-4 text-primary-600" />
                <div>
                  <p className="text-xs text-gray-500">Completed Today</p>
                  <p className="font-semibold">{team.completedToday} Tasks</p>
                </div>
              </div>
            </div>

            {team.currentAssignment && (
              <div className="bg-warning-50 border-l-4 border-warning-500 p-3 rounded mb-4">
                <p className="text-sm font-semibold text-warning-900">Current Assignment</p>
                <p className="text-sm text-warning-700 font-mono">{team.currentAssignment}</p>
              </div>
            )}

            <div className="flex gap-2">
              <button className="flex-1 btn-primary">
                <Phone className="inline h-4 w-4 mr-1" />
                Contact
              </button>
              <button className="flex-1 bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 font-medium">
                <MapPin className="inline h-4 w-4 mr-1" />
                Track
              </button>
              <button className="flex-1 bg-gray-600 text-white px-4 py-2 rounded-lg hover:bg-gray-700 font-medium">
                Assign
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default ResponseTeam