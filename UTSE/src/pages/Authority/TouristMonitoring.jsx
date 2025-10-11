import { useState, useEffect } from 'react'
import { Search, MapPin, Phone, Mail, Calendar, Globe, AlertCircle, CheckCircle, Eye, Filter } from 'lucide-react'
import { motion } from 'framer-motion'

const TouristMonitoring = () => {
  const [searchTerm, setSearchTerm] = useState('')
  const [filterStatus, setFilterStatus] = useState('all')
  const [selectedTourist, setSelectedTourist] = useState(null)
  const [tourists, setTourists] = useState([])

  useEffect(() => {
    const allTourists = JSON.parse(localStorage.getItem('allTourists') || '[]')
    setTourists(allTourists.map(t => ({
      ...t,
      status: 'safe',  // Default
      safetyScore: Math.floor(Math.random() * 100) + 1,  // Random for demo
      currentLocation: 'Taj Mahal, Agra'  // Demo
    })))
  }, [])

  const filteredTourists = tourists.filter(tourist => {
    const matchesSearch = tourist.fullName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         tourist.passportNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         tourist.country.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesFilter = filterStatus === 'all' || tourist.status === filterStatus
    return matchesSearch && matchesFilter
  })

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="space-y-6"
    >
      <div>
        <h2 className="text-3xl font-bold text-gray-900">Tourist Monitoring</h2>
        <p className="text-gray-600 mt-1">Real-time tracking and monitoring of all registered tourists</p>
      </div>

      {/* Search and Filter */}
      <div className="card">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search by name, passport, or country..."
              className="input-field pl-10"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div className="flex gap-2">
            <button
              onClick={() => setFilterStatus('all')}
              className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                filterStatus === 'all' ? 'bg-primary-600 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              All ({tourists.length})
            </button>
            <button
              onClick={() => setFilterStatus('safe')}
              className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                filterStatus === 'safe' ? 'bg-success-600 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              Safe
            </button>
            <button
              onClick={() => setFilterStatus('warning')}
              className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                filterStatus === 'warning' ? 'bg-warning-600 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              Warning
            </button>
            <button
              onClick={() => setFilterStatus('danger')}
              className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                filterStatus === 'danger' ? 'bg-danger-600 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              Danger
            </button>
          </div>
        </div>
      </div>

      {/* Tourists List */}
      <motion.div 
        className="grid grid-cols-1 gap-4"
        initial="hidden"
        animate="visible"
        variants={{
          hidden: { opacity: 0 },
          visible: { opacity: 1, transition: { staggerChildren: 0.1 } }
        }}
      >
        {filteredTourists.map((tourist) => (
          <motion.div 
            key={tourist.touristId}
            variants={{ hidden: { y: 20, opacity: 0 }, visible: { y: 0, opacity: 1 } }}
            className="card hover:shadow-lg transition-shadow"
          >
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-3">
                  <div className={`h-12 w-12 rounded-full flex items-center justify-center text-white font-bold text-lg ${
                    tourist.status === 'safe' ? 'bg-success-500' :
                    tourist.status === 'warning' ? 'bg-warning-500' :
                    'bg-danger-500'
                  }`}>
                    {tourist.fullName.charAt(0)}
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-gray-900">{tourist.fullName}</h3>
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <Globe className="h-4 w-4" />
                      <span>{tourist.country}</span>
                      <span className="mx-2">•</span>
                      <span>Passport: {tourist.passportNumber}</span>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-3">
                  <div className="flex items-center gap-2 text-sm">
                    <MapPin className="h-4 w-4 text-primary-600" />
                    <div>
                      <p className="text-gray-500">Current Location</p>
                      <p className="font-medium text-gray-900">{tourist.currentLocation}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <Phone className="h-4 w-4 text-primary-600" />
                    <div>
                      <p className="text-gray-500">Phone</p>
                      <p className="font-medium text-gray-900">{tourist.phone}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <Mail className="h-4 w-4 text-primary-600" />
                    <div>
                      <p className="text-gray-500">Email</p>
                      <p className="font-medium text-gray-900">{tourist.email}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <Calendar className="h-4 w-4 text-primary-600" />
                    <div>
                      <p className="text-gray-500">Check-in Date</p>
                      <p className="font-medium text-gray-900">{tourist.checkInDate}</p>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-sm text-gray-600">Safety Score</span>
                      <span className={`text-sm font-bold ${
                        tourist.safetyScore >= 90 ? 'text-success-600' :
                        tourist.safetyScore >= 70 ? 'text-warning-600' :
                        'text-danger-600'
                      }`}>
                        {tourist.safetyScore}%
                      </span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div 
                        className={`h-2 rounded-full transition-all ${
                          tourist.safetyScore >= 90 ? 'bg-success-500' :
                          tourist.safetyScore >= 70 ? 'bg-warning-500' :
                          'bg-danger-500'
                        }`}
                        style={{ width: `${tourist.safetyScore}%` }}
                      ></div>
                    </div>
                  </div>
                  <span className="text-xs text-gray-500">Updated 2 mins ago</span>
                </div>
              </div>

              <div className="flex flex-col gap-2 ml-4">
                <span className={`px-3 py-1 rounded-full text-xs font-semibold text-center ${
                  tourist.status === 'safe' ? 'bg-success-100 text-success-700' :
                  tourist.status === 'warning' ? 'bg-warning-100 text-warning-700' :
                  'bg-danger-100 text-danger-700'
                }`}>
                  {tourist.status === 'safe' ? '✓ Safe' :
                   tourist.status === 'warning' ? '⚠ Warning' :
                   '⚠ Danger'}
                </span>
                <motion.button 
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setSelectedTourist(tourist)}
                  className="px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors text-sm font-medium"
                >
                  <Eye className="h-4 w-4 inline mr-1" />
                  View Details
                </motion.button>
              </div>
            </div>
          </motion.div>
        ))}
      </motion.div>

      {/* Tourist Detail Modal */}
      {selectedTourist && (
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.9 }}
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
        >
          <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-2xl font-bold text-gray-900">Tourist Details</h3>
                <button
                  onClick={() => setSelectedTourist(null)}
                  className="text-gray-500 hover:text-gray-700 text-2xl"
                >
                  ×
                </button>
              </div>

              <div className="space-y-6">
                <div className="flex items-center gap-4">
                  <div className={`h-20 w-20 rounded-full flex items-center justify-center text-white font-bold text-3xl ${
                    selectedTourist.status === 'safe' ? 'bg-success-500' :
                    selectedTourist.status === 'warning' ? 'bg-warning-500' :
                    'bg-danger-500'
                  }`}>
                    {selectedTourist.fullName.charAt(0)}
                  </div>
                  <div>
                    <h4 className="text-2xl font-bold text-gray-900">{selectedTourist.fullName}</h4>
                    <p className="text-gray-600">{selectedTourist.country}</p>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="border-l-4 border-primary-600 pl-4">
                    <p className="text-sm text-gray-700 mb-1">Passport Number</p>
                    <p className="font-semibold text-gray-900">{selectedTourist.passportNumber}</p>
                  </div>
                  <div className="border-l-4 border-primary-600 pl-4">
                    <p className="text-sm text-gray-700 mb-1">Phone</p>
                    <p className="font-semibold text-gray-900">{selectedTourist.phone}</p>
                  </div>
                  <div className="border-l-4 border-primary-600 pl-4">
                    <p className="text-sm text-gray-700 mb-1">Email</p>
                    <p className="font-semibold text-gray-900">{selectedTourist.email}</p>
                  </div>
                  <div className="border-l-4 border-primary-600 pl-4">
                    <p className="text-sm text-gray-700 mb-1">Emergency Contact</p>
                    <p className="font-semibold text-gray-900">{selectedTourist.emergencyContactPhone}</p>
                  </div>
                  <div className="border-l-4 border-primary-600 pl-4">
                    <p className="text-sm text-gray-700 mb-1">Current Location</p>
                    <p className="font-semibold text-gray-900">{selectedTourist.currentLocation}</p>
                  </div>
                  <div className="border-l-4 border-primary-600 pl-4">
                    <p className="text-sm text-gray-700 mb-1">Hotel</p>
                    <p className="font-semibold text-gray-900">{selectedTourist.hotelName}</p>
                  </div>
                  <div className="border-l-4 border-primary-600 pl-4">
                    <p className="text-sm text-gray-700 mb-1">Check-in Date</p>
                    <p className="font-semibold text-gray-900">{selectedTourist.checkInDate}</p>
                  </div>
                  <div className="border-l-4 border-primary-600 pl-4">
                    <p className="text-sm text-gray-700 mb-1">Safety Score</p>
                    <p className="font-semibold text-gray-900">{selectedTourist.safetyScore}%</p>
                  </div>
                </div>

                <div className="flex gap-3">
                  <button className="flex-1 btn-primary">
                    Send Alert
                  </button>
                  <button className="flex-1 btn-success">
                    Track Location
                  </button>
                  <button className="flex-1 bg-gray-600 text-white px-4 py-2 rounded-lg hover:bg-gray-700">
                    View History
                  </button>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </motion.div>
  )
}

export default TouristMonitoring