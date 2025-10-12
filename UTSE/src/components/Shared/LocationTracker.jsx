import { useState, useEffect } from 'react';
import axios from 'axios';
import { motion } from 'framer-motion';

const LocationTracker = ({ showMap = true }) => {
  const [location, setLocation] = useState(null);
  const [error, setError] = useState(null);
  const [safetyScore, setSafetyScore] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [currentTime, setCurrentTime] = useState(new Date());
  const [showDetails, setShowDetails] = useState(false);

  useEffect(() => {
    // Fetch location and safety score
    const fetchLocation = async () => {
      try {
        setIsLoading(true);

        // In a real app, you would fetch this from your API
        await new Promise(resolve => setTimeout(resolve, 1000));

        // Simulate API response
        const mockLocation = {
          city: "New Delhi",
          region: "Delhi",
          country: "India",
          latitude: 28.6139,
          longitude: 77.2090,
          timezone: "Asia/Kolkata"
        };

        // Simulate safety score calculation
        const simulatedScore = calculateSafetyScore(mockLocation);

        setLocation(mockLocation);
        setSafetyScore(simulatedScore);
        setIsLoading(false);
      } catch (err) {
        setError('Unable to fetch location');
        console.error(err);
        setIsLoading(false);
      }
    };

    fetchLocation();

    // Update time every second
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const calculateSafetyScore = (locationData) => {
    // This is a simplified example - in a real app, you would use your risk assessment API
    const safeAreas = ['New Delhi', 'Goa', 'Rajasthan', 'Mumbai', 'Bangalore'];
    const moderateAreas = ['Kolkata', 'Chennai', 'Hyderabad'];
    const riskyAreas = ['...'];

    if (safeAreas.includes(locationData.city)) {
      return Math.floor(Math.random() * 30) + 70; // 70-100
    } else if (moderateAreas.includes(locationData.city)) {
      return Math.floor(Math.random() * 30) + 40; // 40-70
    } else if (riskyAreas.includes(locationData.city)) {
      return Math.floor(Math.random() * 30) + 10; // 10-40
    } else {
      return Math.floor(Math.random() * 100); // 0-100
    }
  };

  const formatTime = (date) => {
    return date.toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: true
    });
  };

  const formatDate = (date) => {
    return date.toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

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

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="bg-white p-6 rounded-lg shadow-md"
    >
      <div className="flex justify-between items-start mb-4">
        <div>
          <h2 className="text-xl font-bold text-indigo-800">Current Location Safety</h2>
          <p className="text-gray-600 text-sm">Real-time safety assessment for your current location</p>
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
      ) : error ? (
        <div className="text-red-500 p-4 bg-red-50 rounded-lg">
          <p>{error}</p>
        </div>
      ) : (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="text-lg font-semibold text-gray-800 mb-2">Location Information</h3>
              <div className="space-y-3">
                <div>
                  <p className="text-sm text-gray-500"><i className="fas fa-map-marker-alt text-indigo-500 mr-1"></i>City</p>
                  <p className="font-medium">{location.city || 'Unknown'}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500"><i className="fas fa-globe-americas text-indigo-500 mr-1"></i>Region</p>
                  <p className="font-medium">{location.region || 'Unknown'}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500"><i className="fas fa-flag text-indigo-500 mr-1"></i>Country</p>
                  <p className="font-medium">{location.country || 'Unknown'}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500"><i className="fas fa-clock text-indigo-500 mr-1"></i>Local Time</p>
                  <p className="font-medium">{formatTime(currentTime)}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500"><i className="fas fa-calendar-alt text-indigo-500 mr-1"></i>Date</p>
                  <p className="font-medium">{formatDate(currentTime)}</p>
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-gray-800 mb-2">Safety Assessment</h3>
              <div className="space-y-4">
                <div>
                  <p className="text-sm text-gray-500">Safety Score</p>
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

                {showMap && (
                  <div>
                    <p className="text-sm text-gray-500">Location on Map</p>
                    <div className="h-40 bg-gray-100 rounded-lg flex items-center justify-center mt-2">
                      {/* In a real app, this would be a map component */}
                      <div className="text-center text-gray-500">
                        <i className="fas fa-map-marked-alt text-4xl mb-2"></i>
                        <p>Map view showing your current location</p>
                        <p className="text-sm mt-2">Lat: {location.latitude.toFixed(4)}, Lng: {location.longitude.toFixed(4)}</p>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>

          {showDetails && (
            <div className="mt-6 pt-6 border-t border-gray-200">
              <h3 className="text-lg font-semibold text-gray-800 mb-4">Safety Details</h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-medium text-gray-700 mb-2">Crime Statistics</h4>
                  <div className="space-y-2">
                    <div>
                      <p className="text-sm text-gray-500">Violent Crime Rate</p>
                      <p className="font-medium">{Math.floor(Math.random() * 50) + 10}/100,000</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Property Crime Rate</p>
                      <p className="font-medium">{Math.floor(Math.random() * 100) + 50}/100,000</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Tourist Scams</p>
                      <p className="font-medium">{Math.floor(Math.random() * 10) + 5} reported incidents</p>
                    </div>
                  </div>
                </div>

                <div>
                  <h4 className="font-medium text-gray-700 mb-2">Emergency Services</h4>
                  <div className="space-y-2">
                    <div>
                      <p className="text-sm text-gray-500">Nearest Police Station</p>
                      <p className="font-medium">{Math.floor(Math.random() * 5) + 1} km away</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Nearest Hospital</p>
                      <p className="font-medium">{Math.floor(Math.random() * 5) + 1} km away</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Emergency Contact</p>
                      <a href="tel:112" className="text-indigo-600 hover:underline font-medium">
                        112 (National Emergency Number)
                      </a>
                    </div>
                  </div>
                </div>

                <div>
                  <h4 className="font-medium text-gray-700 mb-2">Weather Conditions</h4>
                  <div className="space-y-2">
                    <div>
                      <p className="text-sm text-gray-500">Current Temperature</p>
                      <p className="font-medium">{Math.floor(Math.random() * 20) + 20}°C</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Weather</p>
                      <p className="font-medium">{"Sunny, Clear".split(', ')[Math.floor(Math.random() * 3)]}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Air Quality</p>
                      <p className="font-medium">{Math.floor(Math.random() * 100) + 50} AQI</p>
                    </div>
                  </div>
                </div>

                <div>
                  <h4 className="font-medium text-gray-700 mb-2">Safety Recommendations</h4>
                  <ul className="list-disc pl-5 space-y-1 text-gray-700">
                    <li>Stay in well-lit and populated areas, especially at night</li>
                    <li>Keep your belongings secure and be aware of your surroundings</li>
                    <li>Use only registered taxis or ride-sharing services</li>
                    <li>Have your emergency contacts and tourist card ready</li>
                    <li>Check the weather conditions before starting your journey</li>
                  </ul>
                </div>
              </div>
            </div>
          )}
        </>
      )}
    </motion.div>
  );
};

export default LocationTracker;