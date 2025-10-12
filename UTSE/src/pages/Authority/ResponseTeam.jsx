import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useAuth } from '../../components/Auth/AuthContext';

const ResponseTeam = () => {
  const { user } = useAuth();
  const [responseTeams, setResponseTeams] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedTeam, setSelectedTeam] = useState(null);
  const [activeTab, setActiveTab] = useState('teams');
  const [newTeam, setNewTeam] = useState({
    name: '',
    type: 'police',
    members: 0,
    vehicles: 0,
    contact: '',
    coverageArea: '',
    responseTime: 0
  });
  const [isAddingTeam, setIsAddingTeam] = useState(false);

  useEffect(() => {
    // Simulate fetching response teams data
    const fetchResponseTeams = async () => {
      try {
        setIsLoading(true);

        // In a real app, you would fetch this from your API
        await new Promise(resolve => setTimeout(resolve, 1000));

        // Mock data - in a real app, this would come from your API
        const mockTeams = [
          {
            id: 1,
            name: "Tourist Police Unit A",
            type: "police",
            members: 15,
            vehicles: 3,
            contact: "+91-11-23456789",
            coverageArea: "City Center, Historical District",
            responseTime: 3,
            status: "active",
            lastIncident: "2023-11-15T14:30:00",
            location: {
              lat: 28.6139,
              lng: 77.2090
            }
          },
          {
            id: 2,
            name: "Emergency Medical Team",
            type: "medical",
            members: 8,
            vehicles: 2,
            contact: "+91-11-98765432",
            coverageArea: "Tourist Zone, Beach Area",
            responseTime: 5,
            status: "active",
            lastIncident: "2023-11-14T09:15:00",
            location: {
              lat: 28.6145,
              lng: 77.2100
            }
          },
          {
            id: 3,
            name: "Fire & Rescue Unit",
            type: "fire",
            members: 12,
            vehicles: 4,
            contact: "+91-11-87654321",
            coverageArea: "Industrial Zone, Residential Areas",
            responseTime: 7,
            status: "active",
            lastIncident: "2023-11-10T18:45:00",
            location: {
              lat: 28.6150,
              lng: 77.2110
            }
          },
          {
            id: 4,
            name: "Tourist Assistance Team",
            type: "support",
            members: 6,
            vehicles: 1,
            contact: "+91-11-76543210",
            coverageArea: "Airport, Train Station",
            responseTime: 4,
            status: "active",
            lastIncident: "2023-11-12T11:20:00",
            location: {
              lat: 28.6155,
              lng: 77.2120
            }
          }
        ];

        setResponseTeams(mockTeams);
        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching response teams:", error);
        setIsLoading(false);
      }
    };

    fetchResponseTeams();
  }, []);

  const handleTeamSelect = (team) => {
    setSelectedTeam(team);
    setActiveTab('teamDetails');
  };

  const handleTabChange = (tab) => {
    setActiveTab(tab);
    if (tab === 'teams') {
      setSelectedTeam(null);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewTeam(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleAddTeam = () => {
    setIsAddingTeam(true);
  };

  const handleCancelAddTeam = () => {
    setIsAddingTeam(false);
    setNewTeam({
      name: '',
      type: 'police',
      members: 0,
      vehicles: 0,
      contact: '',
      coverageArea: '',
      responseTime: 0
    });
  };

  const handleSaveTeam = () => {
    // In a real app, you would send this to your API
    const newTeamWithId = {
      ...newTeam,
      id: responseTeams.length + 1,
      status: 'active',
      lastIncident: new Date().toISOString(),
      location: {
        lat: 28.6139 + Math.random() * 0.001,
        lng: 77.2090 + Math.random() * 0.001
      }
    };

    setResponseTeams([...responseTeams, newTeamWithId]);
    setIsAddingTeam(false);
    setNewTeam({
      name: '',
      type: 'police',
      members: 0,
      vehicles: 0,
      contact: '',
      coverageArea: '',
      responseTime: 0
    });
  };

  const formatTime = (isoString) => {
    if (!isoString) return 'N/A';
    const date = new Date(isoString);
    return date.toLocaleString();
  };

  return (
    <div className="space-y-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="bg-white p-6 rounded-lg shadow-md"
      >
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-indigo-800">Emergency Response Teams</h2>
          <button
            onClick={handleAddTeam}
            className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700 transition-colors flex items-center"
          >
            <i className="fas fa-plus mr-2"></i>
            Add New Team
          </button>
        </div>

        <div className="flex flex-wrap gap-2 mb-6">
          <button
            onClick={() => handleTabChange('teams')}
            className={`px-4 py-2 rounded-md text-sm font-medium ${activeTab === 'teams' ? 'bg-indigo-600 text-white' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'}`}
          >
            All Teams
          </button>
          <button
            onClick={() => handleTabChange('teamDetails')}
            className={`px-4 py-2 rounded-md text-sm font-medium ${activeTab === 'teamDetails' ? 'bg-indigo-600 text-white' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'}`}
            disabled={!selectedTeam}
          >
            Team Details
          </button>
          <button
            onClick={() => handleTabChange('performance')}
            className={`px-4 py-2 rounded-md text-sm font-medium ${activeTab === 'performance' ? 'bg-indigo-600 text-white' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'}`}
          >
            Performance
          </button>
        </div>

        {activeTab === 'teams' && (
          <>
            {isLoading ? (
              <div className="flex justify-center items-center py-12">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-500"></div>
              </div>
            ) : (
              <>
                {isAddingTeam ? (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="bg-white p-6 rounded-lg shadow-md mb-6"
                  >
                    <h3 className="text-xl font-semibold text-indigo-800 mb-4">Add New Response Team</h3>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">Team Name</label>
                        <input
                          type="text"
                          id="name"
                          name="name"
                          value={newTeam.name}
                          onChange={handleInputChange}
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                          required
                        />
                      </div>

                      <div>
                        <label htmlFor="type" className="block text-sm font-medium text-gray-700 mb-1">Team Type</label>
                        <select
                          id="type"
                          name="type"
                          value={newTeam.type}
                          onChange={handleInputChange}
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        >
                          <option value="police">Police</option>
                          <option value="medical">Medical</option>
                          <option value="fire">Fire & Rescue</option>
                          <option value="support">Support</option>
                        </select>
                      </div>

                      <div>
                        <label htmlFor="members" className="block text-sm font-medium text-gray-700 mb-1">Number of Members</label>
                        <input
                          type="number"
                          id="members"
                          name="members"
                          value={newTeam.members}
                          onChange={handleInputChange}
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                          min="1"
                          required
                        />
                      </div>

                      <div>
                        <label htmlFor="vehicles" className="block text-sm font-medium text-gray-700 mb-1">Number of Vehicles</label>
                        <input
                          type="number"
                          id="vehicles"
                          name="vehicles"
                          value={newTeam.vehicles}
                          onChange={handleInputChange}
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                          min="0"
                          required
                        />
                      </div>

                      <div>
                        <label htmlFor="contact" className="block text-sm font-medium text-gray-700 mb-1">Contact Number</label>
                        <input
                          type="tel"
                          id="contact"
                          name="contact"
                          value={newTeam.contact}
                          onChange={handleInputChange}
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                          required
                        />
                      </div>

                      <div>
                        <label htmlFor="coverageArea" className="block text-sm font-medium text-gray-700 mb-1">Coverage Area</label>
                        <input
                          type="text"
                          id="coverageArea"
                          name="coverageArea"
                          value={newTeam.coverageArea}
                          onChange={handleInputChange}
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                          required
                        />
                      </div>

                      <div>
                        <label htmlFor="responseTime" className="block text-sm font-medium text-gray-700 mb-1">Average Response Time (minutes)</label>
                        <input
                          type="number"
                          id="responseTime"
                          name="responseTime"
                          value={newTeam.responseTime}
                          onChange={handleInputChange}
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                          min="1"
                          required
                        />
                      </div>
                    </div>

                    <div className="mt-6 flex justify-end space-x-3">
                      <button
                        onClick={handleCancelAddTeam}
                        className="px-4 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300 transition-colors"
                      >
                        Cancel
                      </button>
                      <button
                        onClick={handleSaveTeam}
                        className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition-colors"
                      >
                        Save Team
                      </button>
                    </div>
                  </motion.div>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {responseTeams.map((team) => (
                      <motion.div
                        key={team.id}
                        whileHover={{ scale: 1.03 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={() => handleTeamSelect(team)}
                        className={`border rounded-lg overflow-hidden cursor-pointer transition-all ${selectedTeam?.id === team.id ? 'ring-2 ring-indigo-500 shadow-lg' : 'hover:shadow-md'}`}
                      >
                        <div className="p-4">
                          <div className="flex justify-between items-start">
                            <div>
                              <h3 className="font-semibold text-lg text-gray-800">{team.name}</h3>
                              <p className="text-sm text-gray-500 capitalize">{team.type} team</p>
                            </div>
                            <div className={`px-2 py-1 text-xs rounded-full ${team.status === 'active' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'}`}>
                              {team.status}
                            </div>
                          </div>

                          <div className="mt-4 grid grid-cols-2 gap-2">
                            <div>
                              <p className="text-xs text-gray-500">Members</p>
                              <p className="font-medium">{team.members}</p>
                            </div>
                            <div>
                              <p className="text-xs text-gray-500">Vehicles</p>
                              <p className="font-medium">{team.vehicles}</p>
                            </div>
                            <div>
                              <p className="text-xs text-gray-500">Response Time</p>
                              <p className="font-medium">{team.responseTime} min</p>
                            </div>
                            <div>
                              <p className="text-xs text-gray-500">Last Incident</p>
                              <p className="font-medium text-sm">{formatTime(team.lastIncident)}</p>
                            </div>
                          </div>

                          <div className="mt-4">
                            <p className="text-sm text-gray-500">Coverage Area:</p>
                            <p className="text-sm">{team.coverageArea}</p>
                          </div>

                          <div className="mt-4 pt-4 border-t border-gray-200">
                            <p className="text-sm text-gray-500">Contact:</p>
                            <a href={`tel:${team.contact}`} className="text-sm text-indigo-600 hover:underline">
                              {team.contact}
                            </a>
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                )}
              </>
            )}
          </>
        )}

        {activeTab === 'teamDetails' && selectedTeam && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white p-6 rounded-lg shadow-md"
          >
            <div className="flex justify-between items-start mb-6">
              <div>
                <h2 className="text-2xl font-bold text-indigo-800">{selectedTeam.name}</h2>
                <p className="text-gray-600 capitalize">{selectedTeam.type} team</p>
              </div>
              <div className={`px-3 py-1 text-sm rounded-full ${selectedTeam.status === 'active' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'}`}>
                {selectedTeam.status}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h3 className="text-lg font-semibold text-gray-800 mb-4">Team Information</h3>

                <div className="space-y-4">
                  <div>
                    <p className="text-sm text-gray-500">Team Type</p>
                    <p className="font-medium capitalize">{selectedTeam.type}</p>
                  </div>

                  <div>
                    <p className="text-sm text-gray-500">Number of Members</p>
                    <p className="font-medium">{selectedTeam.members}</p>
                  </div>

                  <div>
                    <p className="text-sm text-gray-500">Number of Vehicles</p>
                    <p className="font-medium">{selectedTeam.vehicles}</p>
                  </div>

                  <div>
                    <p className="text-sm text-gray-500">Average Response Time</p>
                    <p className="font-medium">{selectedTeam.responseTime} minutes</p>
                  </div>

                  <div>
                    <p className="text-sm text-gray-500">Coverage Area</p>
                    <p className="font-medium">{selectedTeam.coverageArea}</p>
                  </div>

                  <div>
                    <p className="text-sm text-gray-500">Last Incident</p>
                    <p className="font-medium">{formatTime(selectedTeam.lastIncident)}</p>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-gray-800 mb-4">Contact Information</h3>

                <div className="space-y-4">
                  <div>
                    <p className="text-sm text-gray-500">Primary Contact</p>
                    <a href={`tel:${selectedTeam.contact}`} className="text-indigo-600 hover:underline font-medium">
                      {selectedTeam.contact}
                    </a>
                  </div>

                  <div>
                    <p className="text-sm text-gray-500">Location</p>
                    <p className="font-medium">
                      Lat: {selectedTeam.location.lat.toFixed(4)}, Lng: {selectedTeam.location.lng.toFixed(4)}
                    </p>
                  </div>

                  <div className="mt-6">
                    <h4 className="font-medium text-gray-700 mb-2">Team Members</h4>
                    <div className="space-y-2">
                      {[...Array(selectedTeam.members)].map((_, index) => (
                        <div key={index} className="flex items-center">
                          <div className="w-8 h-8 bg-indigo-100 rounded-full flex items-center justify-center mr-3">
                            <i className="fas fa-user text-indigo-600 text-sm"></i>
                          </div>
                          <div>
                            <p className="font-medium">Member {index + 1}</p>
                            <p className="text-sm text-gray-500">Role: {['Leader', 'Officer', 'Driver', 'Medical Staff'][index % 4]}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-6">
              <h3 className="text-lg font-semibold text-gray-800 mb-4">Team Performance</h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="font-medium text-gray-700 mb-2">Response Time Statistics</h4>
                  <div className="space-y-2">
                    <div>
                      <p className="text-sm text-gray-500">Average Response Time</p>
                      <p className="font-medium">{selectedTeam.responseTime} minutes</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Fastest Response</p>
                      <p className="font-medium">{Math.max(1, selectedTeam.responseTime - 2)} minutes</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Slowest Response</p>
                      <p className="font-medium">{Math.min(10, selectedTeam.responseTime + 3)} minutes</p>
                    </div>
                  </div>
                </div>

                <div className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="font-medium text-gray-700 mb-2">Incident Handling</h4>
                  <div className="space-y-2">
                    <div>
                      <p className="text-sm text-gray-500">Total Incidents Handled</p>
                      <p className="font-medium">{Math.floor(Math.random() * 50) + 20}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Successful Resolutions</p>
                      <p className="font-medium">{Math.floor(Math.random() * 10) + 90}%</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Average Resolution Time</p>
                      <p className="font-medium">{Math.floor(Math.random() * 30) + 15} minutes</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-6">
              <h3 className="text-lg font-semibold text-gray-800 mb-4">Team Map</h3>
              <div className="h-64 bg-gray-100 rounded-lg flex items-center justify-center">
                {/* In a real app, this would be a map component */}
                <div className="text-center text-gray-500">
                  <i className="fas fa-map-marked-alt text-4xl mb-2"></i>
                  <p>Interactive map showing team coverage area</p>
                  <p className="text-sm mt-2">Team location: {selectedTeam.location.lat.toFixed(4)}, {selectedTeam.location.lng.toFixed(4)}</p>
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {activeTab === 'performance' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white p-6 rounded-lg shadow-md"
          >
            <h2 className="text-2xl font-bold text-indigo-800 mb-6">Response Team Performance</h2>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {responseTeams.map((team) => (
                <motion.div
                  key={team.id}
                  whileHover={{ scale: 1.02 }}
                  className="border rounded-lg overflow-hidden"
                >
                  <div className="p-4">
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="font-semibold text-lg text-gray-800">{team.name}</h3>
                        <p className="text-sm text-gray-500 capitalize">{team.type} team</p>
                      </div>
                      <div className={`px-2 py-1 text-xs rounded-full ${team.status === 'active' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'}`}>
                        {team.status}
                      </div>
                    </div>

                    <div className="mt-4">
                      <h4 className="font-medium text-gray-700 mb-2">Performance Metrics</h4>

                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <p className="text-xs text-gray-500">Response Time</p>
                          <p className="font-medium">{team.responseTime} min</p>
                        </div>
                        <div>
                          <p className="text-xs text-gray-500">Incidents Handled</p>
                          <p className="font-medium">{Math.floor(Math.random() * 50) + 20}</p>
                        </div>
                        <div>
                          <p className="text-xs text-gray-500">Success Rate</p>
                          <p className="font-medium">{Math.floor(Math.random() * 10) + 90}%</p>
                        </div>
                        <div>
                          <p className="text-xs text-gray-500">Coverage</p>
                          <p className="font-medium">{team.coverageArea}</p>
                        </div>
                      </div>
                    </div>

                    <div className="mt-4 pt-4 border-t border-gray-200">
                      <div className="flex items-center justify-between">
                        <p className="text-sm text-gray-500">Overall Rating</p>
                        <div className="flex items-center">
                          <div className="w-24 h-2 bg-gray-200 rounded-full mr-2">
                            <div
                              className="h-full bg-green-500"
                              style={{ width: `${Math.floor(Math.random() * 30) + 70}%` }}
                            ></div>
                          </div>
                          <span className="text-sm font-medium">
                            {Math.floor(Math.random() * 30) + 70}/100
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            <div className="mt-6">
              <h3 className="text-lg font-semibold text-gray-800 mb-4">Performance Analysis</h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="font-medium text-gray-700 mb-2">Response Time Analysis</h4>
                  <div className="h-48 bg-gray-100 rounded-lg flex items-center justify-center">
                    {/* In a real app, this would be a chart component */}
                    <div className="text-center text-gray-500">
                      <i className="fas fa-chart-line text-4xl mb-2"></i>
                      <p>Response time trends over time</p>
                    </div>
                  </div>
                </div>

                <div className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="font-medium text-gray-700 mb-2">Incident Resolution Rates</h4>
                  <div className="h-48 bg-gray-100 rounded-lg flex items-center justify-center">
                    {/* In a real app, this would be a chart component */}
                    <div className="text-center text-gray-500">
                      <i className="fas fa-chart-bar text-4xl mb-2"></i>
                      <p>Incident resolution rates by team</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </motion.div>
    </div>
  );
};

export default ResponseTeam;