import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Bar, Line, Pie } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  PointElement,
  LineElement,
  ArcElement
} from 'chart.js';

// Register the required components
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  PointElement,
  LineElement,
  ArcElement
);

const Analytics = () => {
  const [analyticsData, setAnalyticsData] = useState({
    incidents: [],
    safetyScores: [],
    responseTimes: []
  });
  const [isLoading, setIsLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('incidents');

  useEffect(() => {
    // Simulate fetching analytics data
    const fetchAnalyticsData = async () => {
      try {
        setIsLoading(true);

        // In a real app, you would fetch this from your API
        await new Promise(resolve => setTimeout(resolve, 1000));

        // Mock data - in a real app, this would come from your API
        const mockIncidents = {
          labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
          datasets: [
            {
              label: 'Incidents Reported',
              data: [12, 19, 15, 18, 22, 25],
              backgroundColor: 'rgba(59, 130, 246, 0.5)',
              borderColor: 'rgba(59, 130, 246, 1)',
              borderWidth: 1
            }
          ]
        };

        const mockSafetyScores = {
          labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
          datasets: [
            {
              label: 'Average Safety Score',
              data: [75, 78, 72, 76, 79, 81],
              backgroundColor: 'rgba(16, 185, 129, 0.5)',
              borderColor: 'rgba(16, 185, 129, 1)',
              borderWidth: 1,
              tension: 0.3
            }
          ]
        };

        const mockResponseTimes = {
          labels: ['Police', 'Medical', 'Fire', 'Support'],
          datasets: [
            {
              label: 'Average Response Time (minutes)',
              data: [4.2, 5.8, 6.5, 3.9],
              backgroundColor: [
                'rgba(59, 130, 246, 0.7)',
                'rgba(16, 185, 129, 0.7)',
                'rgba(245, 158, 11, 0.7)',
                'rgba(153, 142, 255, 0.7)'
              ],
              borderColor: [
                'rgba(59, 130, 246, 1)',
                'rgba(16, 185, 129, 1)',
                'rgba(245, 158, 11, 1)',
                'rgba(153, 142, 255, 1)'
              ],
              borderWidth: 1
            }
          ]
        };

        setAnalyticsData({
          incidents: mockIncidents,
          safetyScores: mockSafetyScores,
          responseTimes: mockResponseTimes
        });
        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching analytics data:", error);
        setIsLoading(false);
      }
    };

    fetchAnalyticsData();
  }, []);

  return (
    <div className="space-y-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="bg-white p-6 rounded-lg shadow-md"
      >
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-indigo-800">Tourist Safety Analytics</h2>
        </div>

        <div className="flex flex-wrap gap-2 mb-6">
          <button
            onClick={() => setActiveTab('incidents')}
            className={`px-4 py-2 rounded-md text-sm font-medium ${activeTab === 'incidents' ? 'bg-indigo-600 text-white' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'}`}
          >
            Incident Trends
          </button>
          <button
            onClick={() => setActiveTab('safetyScores')}
            className={`px-4 py-2 rounded-md text-sm font-medium ${activeTab === 'safetyScores' ? 'bg-indigo-600 text-white' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'}`}
          >
            Safety Scores
          </button>
          <button
            onClick={() => setActiveTab('responseTimes')}
            className={`px-4 py-2 rounded-md text-sm font-medium ${activeTab === 'responseTimes' ? 'bg-indigo-600 text-white' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'}`}
          >
            Response Times
          </button>
        </div>

        {isLoading ? (
          <div className="flex justify-center items-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-500"></div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {activeTab === 'incidents' && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="bg-white p-6 rounded-lg shadow-md"
              >
                <h3 className="text-lg font-semibold text-gray-800 mb-4">Incident Trends</h3>
                <div className="h-80">
                  <Bar
                    data={analyticsData.incidents}
                    options={{
                      responsive: true,
                      plugins: {
                        legend: {
                          position: 'top',
                        },
                        title: {
                          display: true,
                          text: 'Monthly Incident Reports',
                          font: {
                            size: 14
                          }
                        },
                        tooltip: {
                          callbacks: {
                            label: function(context) {
                              return `${context.parsed.y} incidents`;
                            }
                          }
                        }
                      },
                      scales: {
                        y: {
                          beginAtZero: true,
                          ticks: {
                            stepSize: 1
                          }
                        }
                      }
                    }}
                  />
                </div>
              </motion.div>
            )}

            {activeTab === 'safetyScores' && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="bg-white p-6 rounded-lg shadow-md"
              >
                <h3 className="text-lg font-semibold text-gray-800 mb-4">Safety Scores</h3>
                <div className="h-80">
                  <Line
                    data={analyticsData.safetyScores}
                    options={{
                      responsive: true,
                      plugins: {
                        legend: {
                          position: 'top',
                        },
                        title: {
                          display: true,
                          text: 'Monthly Average Safety Scores',
                          font: {
                            size: 14
                          }
                        },
                        tooltip: {
                          callbacks: {
                            label: function(context) {
                              return `${context.parsed.y}/100`;
                            }
                          }
                        }
                      },
                      scales: {
                        y: {
                          beginAtZero: false,
                          min: 0,
                          max: 100,
                          ticks: {
                            stepSize: 10
                          }
                        }
                      }
                    }}
                  />
                </div>
              </motion.div>
            )}

            {activeTab === 'responseTimes' && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="bg-white p-6 rounded-lg shadow-md"
              >
                <h3 className="text-lg font-semibold text-gray-800 mb-4">Response Times</h3>
                <div className="h-80">
                  <Pie
                    data={analyticsData.responseTimes}
                    options={{
                      responsive: true,
                      plugins: {
                        legend: {
                          position: 'top',
                        },
                        title: {
                          display: true,
                          text: 'Average Response Times by Team',
                          font: {
                            size: 14
                          }
                        },
                        tooltip: {
                          callbacks: {
                            label: function(context) {
                              return `${context.parsed.y} minutes`;
                            }
                          }
                        }
                      }
                    }}
                  />
                </div>
              </motion.div>
            )}
          </div>
        )}
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
        className="bg-white p-6 rounded-lg shadow-md"
      >
        <h2 className="text-2xl font-bold text-indigo-800 mb-4">Key Metrics</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="bg-gray-50 p-4 rounded-lg"
          >
            <h3 className="text-lg font-semibold text-gray-800 mb-2">Total Incidents</h3>
            <p className="text-3xl font-bold text-indigo-600">124</p>
            <p className="text-sm text-gray-500 mt-1">This month</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="bg-gray-50 p-4 rounded-lg"
          >
            <h3 className="text-lg font-semibold text-gray-800 mb-2">Average Safety Score</h3>
            <p className="text-3xl font-bold text-green-600">78/100</p>
            <p className="text-sm text-gray-500 mt-1">Current rating</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="bg-gray-50 p-4 rounded-lg"
          >
            <h3 className="text-lg font-semibold text-gray-800 mb-2">Response Time</h3>
            <p className="text-3xl font-bold text-yellow-600">4.5 min</p>
            <p className="text-sm text-gray-500 mt-1">Average response</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.5 }}
            className="bg-gray-50 p-4 rounded-lg"
          >
            <h3 className="text-lg font-semibold text-gray-800 mb-2">Tourist Satisfaction</h3>
            <p className="text-3xl font-bold text-blue-600">89%</p>
            <p className="text-sm text-gray-500 mt-1">Satisfaction rate</p>
          </motion.div>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.6 }}
        className="bg-white p-6 rounded-lg shadow-md"
      >
        <h2 className="text-2xl font-bold text-indigo-800 mb-4">Recent Incidents</h2>

        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Incident ID</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Type</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Location</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Response Time</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {[
                { id: '#INC-2023-00124', type: 'Theft', location: 'City Center', date: '2023-11-15 14:30', status: 'Resolved', responseTime: '3 min' },
                { id: '#INC-2023-00123', type: 'Medical Emergency', location: 'Beach Area', date: '2023-11-14 09:15', status: 'Resolved', responseTime: '5 min' },
                { id: '#INC-2023-00122', type: 'Lost Tourist', location: 'Historical District', date: '2023-11-13 18:45', status: 'Resolved', responseTime: '7 min' },
                { id: '#INC-2023-00121', type: 'Transport Issue', location: 'Airport', date: '2023-11-12 11:20', status: 'Resolved', responseTime: '4 min' },
                { id: '#INC-2023-00120', type: 'Scam Report', location: 'Market Square', date: '2023-11-11 16:00', status: 'Resolved', responseTime: '6 min' },
              ].map((incident, index) => (
                <tr key={index} className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{incident.id}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{incident.type}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{incident.location}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{incident.date}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm">
                    <span className={`px-2 py-1 rounded-full text-xs ${incident.status === 'Resolved' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'}`}>
                      {incident.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{incident.responseTime}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </motion.div>
    </div>
  );
};

export default Analytics;