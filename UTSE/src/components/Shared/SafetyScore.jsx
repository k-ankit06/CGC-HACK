import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const SafetyScore = ({ initialScore = 75, locationName = "Current Location" }) => {
  const [safetyScore, setSafetyScore] = useState(initialScore);
  const [isLoading, setIsLoading] = useState(true);
  const [showDetails, setShowDetails] = useState(false);
  const [scoreHistory, setScoreHistory] = useState([]);
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    // Simulate fetching safety score
    const fetchSafetyScore = async () => {
      try {
        setIsLoading(true);

        // In a real app, you would fetch this from your API
        await new Promise(resolve => setTimeout(resolve, 1000));

        // Simulate API response
        const mockScore = Math.floor(Math.random() * 30) + 40; // 40-70

        // Generate some history data
        const history = [];
        for (let i = 0; i < 7; i++) {
          const date = new Date();
          date.setDate(date.getDate() - (7 - i));
          history.push({
            date: date.toLocaleDateString('en-US', { weekday: 'short' }),
            score: Math.floor(Math.random() * 30) + 40
          });
        }

        setSafetyScore(mockScore);
        setScoreHistory(history);
        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching safety score:", error);
        setIsLoading(false);
      }
    };

    fetchSafetyScore();

    // Update time every minute
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 60000);

    return () => clearInterval(timer);
  }, []);

  const getSafetyLevel = (score) => {
    if (score > 70) return 'Very Safe';
    if (score > 40) return 'Moderately Safe';
    if (score > 20) return 'Caution Advised';
    return 'High Risk Area';
  };

  const getSafetyColor = (score) => {
    if (score > 70) return 'bg-green-100 text-green-800';
    if (score > 40) return 'bg-yellow-100 text-yellow-800';
    if (score > 20) return 'bg-orange-100 text-orange-800';
    return 'bg-red-100 text-red-800';
  };

  const formatTime = (date) => {
    return date.toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
      hour12: true
    });
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="bg-white p-6 rounded-lg shadow-md"
    >
      <div className="flex justify-between items-start mb-4">
        <div>
          <h2 className="text-xl font-bold text-indigo-800">Safety Score for {locationName}</h2>
          <p className="text-gray-600 text-sm">Real-time safety assessment based on multiple factors</p>
        </div>
        <button
          onClick={() => setShowDetails(!showDetails)}
          className="text-indigo-600 hover:text-indigo-800 text-sm flex items-center"
        >
          {showDetails ? (
            <>
              <i className="fas fa-chevron-up mr-1"></i>
              Hide Details
            </>
          ) : (
            <>
              <i className="fas fa-chevron-down mr-1"></i>
              Show Details
            </>
          )}
        </button>
      </div>

      {isLoading ? (
        <div className="flex justify-center items-center py-8">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-500"></div>
        </div>
      ) : (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="text-lg font-semibold text-gray-800 mb-2">Current Safety Score</h3>
              <div className="space-y-4">
                <div>
                  <p className="text-sm text-gray-500">Overall Safety Score</p>
                  <div className="flex items-center">
                    <div className="w-32 h-8 bg-gray-200 rounded-full mr-4">
                      <motion.div
                        className="h-full bg-green-500 rounded-full"
                        style={{ width: `${safetyScore}%` }}
                        animate={{ width: `${safetyScore}%` }}
                        transition={{ duration: 1, ease: "easeOut" }}
                      ></motion.div>
                    </div>
                    <span className="text-2xl font-bold">{safetyScore}/100</span>
                  </div>
                </div>

                <div className={`p-2 rounded ${getSafetyColor(safetyScore)}`}>
                  <p className="text-sm font-medium">{getSafetyLevel(safetyScore)}</p>
                </div>

                <div>
                  <p className="text-sm text-gray-500">Last Updated</p>
                  <p className="font-medium">{formatTime(currentTime)}</p>
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-gray-800 mb-2">Safety Components</h3>
              <div className="space-y-4">
                {[
                  { name: "Crime Rate", score: Math.floor(Math.random() * 30) + 40, color: "bg-blue-100 text-blue-800" },
                  { name: "Emergency Response", score: Math.floor(Math.random() * 30) + 50, color: "bg-green-100 text-green-800" },
                  { name: "Infrastructure", score: Math.floor(Math.random() * 30) + 60, color: "bg-yellow-100 text-yellow-800" },
                  { name: "Weather Conditions", score: Math.floor(Math.random() * 30) + 70, color: "bg-orange-100 text-orange-800" }
                ].map((component, index) => (
                  <div key={index}>
                    <p className="text-sm text-gray-500">{component.name}</p>
                    <div className="flex items-center">
                      <div className={`w-24 h-4 rounded-full mr-2 ${component.color}`}>
                        <div
                          className="h-full bg-indigo-500 rounded-full"
                          style={{ width: `${component.score}%` }}
                        ></div>
                      </div>
                      <span className="text-sm font-medium">{component.score}/100</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {showDetails && (
            <div className="mt-6 pt-6 border-t border-gray-200">
              <h3 className="text-lg font-semibold text-gray-800 mb-4">Safety History</h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-medium text-gray-700 mb-2">Weekly Trend</h4>
                  <div className="h-48 bg-gray-50 rounded-lg p-4">
                    {/* In a real app, this would be a chart component */}
                    <div className="text-center text-gray-500">
                      <i className="fas fa-chart-line text-4xl mb-2"></i>
                      <p>Safety score trend over the past week</p>
                    </div>
                  </div>
                </div>

                <div>
                  <h4 className="font-medium text-gray-700 mb-2">Safety Factors</h4>
                  <div className="space-y-4">
                    {[
                      { name: "Police Presence", value: "High", description: "Strong police presence in tourist areas" },
                      { name: "Medical Facilities", value: "Good", description: "Hospitals and clinics within 5 km" },
                      { name: "Transport Safety", value: "Moderate", description: "Some areas have unreliable public transport" },
                      { name: "Night Safety", value: "Fair", description: "Some areas become less safe after dark" }
                    ].map((factor, index) => (
                      <div key={index} className="p-3 bg-gray-50 rounded-lg">
                        <div className="flex justify-between items-start">
                          <div>
                            <p className="font-medium text-gray-800">{factor.name}</p>
                            <p className="text-sm text-gray-500">{factor.description}</p>
                          </div>
                          <div className={`px-2 py-1 text-xs rounded-full ${factor.value === 'High' ? 'bg-green-100 text-green-800' :
                            factor.value === 'Good' ? 'bg-blue-100 text-blue-800' :
                            factor.value === 'Moderate' ? 'bg-yellow-100 text-yellow-800' :
                            'bg-red-100 text-red-800'}`}>
                            {factor.value}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="mt-6">
                <h4 className="font-medium text-gray-700 mb-2">Safety Recommendations</h4>
                <ul className="list-disc pl-5 space-y-2 text-gray-700">
                  <li>Stay in well-lit and populated areas, especially at night</li>
                  <li>Keep your belongings secure and be aware of your surroundings</li>
                  <li>Use only registered taxis or ride-sharing services</li>
                  <li>Have your emergency contacts and tourist card ready</li>
                  <li>Check the weather conditions before starting your journey</li>
                </ul>
              </div>
            </div>
          )}
        </>
      )}
    </motion.div>
  );
};

export default SafetyScore;