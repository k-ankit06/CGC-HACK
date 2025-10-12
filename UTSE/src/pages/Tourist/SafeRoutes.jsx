import { useState } from 'react'
import { MapPin, Navigation, AlertTriangle, Shield, Clock, TrendingUp, CheckCircle } from 'lucide-react'

const SafeRoutes = () => {
  const [selectedRoute, setSelectedRoute] = useState(null)
  const [fromLocation, setFromLocation] = useState('')
  const [toLocation, setToLocation] = useState('')

  const popularRoutes = [
    {
      id: 1,
      from: 'Hotel Oberoi Amarvilas',
      to: 'Taj Mahal',
      distance: '1.2 km',
      duration: '5 mins',
      safetyScore: 98,
      crowdLevel: 'Medium',
      riskFactors: ['None'],
      recommendedTime: '6:00 AM - 6:00 PM',
      route: 'Via Taj East Gate Road',
      transportMode: 'Walking/Auto',
      highlights: ['Well-lit path', 'Tourist police present', 'CCTV coverage']
    },
    {
      id: 2,
      from: 'Taj Mahal',
      to: 'Agra Fort',
      distance: '2.5 km',
      duration: '12 mins',
      safetyScore: 95,
      crowdLevel: 'High',
      riskFactors: ['Heavy traffic'],
      recommendedTime: 'All day',
      route: 'Via Taj Road',
      transportMode: 'Auto/Taxi',
      highlights: ['Main road', 'Multiple help points', 'Good connectivity']
    },
    {
      id: 3,
      from: 'India Gate',
      to: 'Red Fort',
      distance: '5.8 km',
      duration: '25 mins',
      safetyScore: 88,
      crowdLevel: 'High',
      riskFactors: ['Pickpocketing risk', 'Heavy crowd'],
      recommendedTime: '9:00 AM - 5:00 PM',
      route: 'Via Rajpath and Netaji Subhash Marg',
      transportMode: 'Metro/Taxi',
      highlights: ['Metro available', 'Tourist police', 'Safe parking']
    },
    {
      id: 4,
      from: 'Gateway of India',
      to: 'Marine Drive',
      distance: '3.2 km',
      duration: '15 mins',
      safetyScore: 85,
      crowdLevel: 'Very High',
      riskFactors: ['Evening crowd', 'Traffic congestion'],
      recommendedTime: 'Morning preferred',
      route: 'Via Mahatma Gandhi Road',
      transportMode: 'Taxi/Bus',
      highlights: ['Scenic route', 'Well-maintained', 'Police patrolling']
    }
  ]

  const safetyFeatures = [
    {
      icon: Shield,
      title: 'Real-time Safety Monitoring',
      description: 'AI-powered risk assessment updates every 5 minutes'
    },
    {
      icon: AlertTriangle,
      title: 'Live Alerts',
      description: 'Instant notifications about incidents or unsafe conditions'
    },
    {
      icon: MapPin,
      title: 'GPS Tracking',
      description: 'Your location is tracked for emergency assistance'
    },
    {
      icon: Clock,
      title: 'Best Time Suggestions',
      description: 'Recommended travel times based on safety data'
    }
  ]

  const nearbyHelpPoints = [
    { name: 'Tourist Police Booth', distance: '200m', type: 'Police' },
    { name: 'Medical Aid Center', distance: '350m', type: 'Medical' },
    { name: 'Tourist Help Desk', distance: '150m', type: 'Information' },
    { name: 'Safe Zone Shelter', distance: '400m', type: 'Shelter' }
  ]

  const getSafetyColor = (score) => {
    if (score >= 90) return 'text-success-600 bg-success-100'
    if (score >= 75) return 'text-warning-600 bg-warning-100'
    return 'text-danger-600 bg-danger-100'
  }

  const getCrowdColor = (level) => {
    switch(level) {
      case 'Low': return 'bg-success-100 text-success-700'
      case 'Medium': return 'bg-warning-100 text-warning-700'
      case 'High': return 'bg-orange-100 text-orange-700'
      case 'Very High': return 'bg-danger-100 text-danger-700'
      default: return 'bg-gray-100 text-gray-700'
    }
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold text-gray-900">Safe Routes Navigator</h2>
        <p className="text-gray-600 mt-1">AI-powered safe route recommendations with real-time risk assessment</p>
      </div>

      {/* Route Planner */}
      <div className="card bg-gradient-to-r from-primary-600 to-primary-700 text-white">
        <h3 className="text-xl font-bold mb-4 flex items-center">
          <Navigation className="h-6 w-6 mr-2" />
          Plan Your Safe Route
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <div>
            <label className="block text-sm text-primary-100 mb-2">From (Current Location)</label>
            <input
              type="text"
              placeholder="Enter starting point..."
              className="w-full px-4 py-3 rounded-lg text-gray-900"
              value={fromLocation}
              onChange={(e) => setFromLocation(e.target.value)}
            />
          </div>
          <div>
            <label className="block text-sm text-primary-100 mb-2">To (Destination)</label>
            <input
              type="text"
              placeholder="Enter destination..."
              className="w-full px-4 py-3 rounded-lg text-gray-900"
              value={toLocation}
              onChange={(e) => setToLocation(e.target.value)}
            />
          </div>
        </div>
        <button className="w-full bg-white text-primary-600 py-3 rounded-lg hover:bg-primary-50 font-semibold">
          🗺️ Find Safest Route
        </button>
      </div>

      {/* Safety Features */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {safetyFeatures.map((feature, index) => {
          const Icon = feature.icon
          return (
            <div key={index} className="card text-center hover:shadow-lg transition-shadow">
              <div className="inline-block p-3 bg-primary-100 rounded-full mb-3">
                <Icon className="h-8 w-8 text-primary-600" />
              </div>
              <h4 className="font-bold text-gray-900 mb-2">{feature.title}</h4>
              <p className="text-sm text-gray-600">{feature.description}</p>
            </div>
          )
        })}
      </div>

      {/* Popular Safe Routes */}
      <div className="card">
        <h3 className="text-xl font-bold mb-4">🌟 Popular Safe Routes</h3>
        <div className="space-y-4">
          {popularRoutes.map((route) => (
            <div key={route.id} className="border-2 border-gray-200 rounded-lg p-5 hover:border-primary-500 hover:shadow-lg transition-all">
              <div className="flex items-start justify-between mb-3">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="flex items-center gap-2">
                      <MapPin className="h-5 w-5 text-success-600" />
                      <span className="font-semibold text-gray-900">{route.from}</span>
                    </div>
                    <span className="text-gray-400">→</span>
                    <div className="flex items-center gap-2">
                      <MapPin className="h-5 w-5 text-danger-600" />
                      <span className="font-semibold text-gray-900">{route.to}</span>
                    </div>
                  </div>
                  <p className="text-sm text-gray-600 mb-1">{route.route}</p>
                  <p className="text-xs text-gray-500">Recommended: {route.transportMode}</p>
                </div>
                <div className="text-right">
                  <div className={`px-4 py-2 rounded-full font-bold text-lg mb-1 ${getSafetyColor(route.safetyScore)}`}>
                    {route.safetyScore}%
                  </div>
                  <p className="text-xs text-gray-500">Safety Score</p>
                </div>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-3">
                <div className="bg-gray-50 p-3 rounded-lg">
                  <p className="text-xs text-gray-600 mb-1">Distance</p>
                  <p className="font-bold text-gray-900">{route.distance}</p>
                </div>
                <div className="bg-gray-50 p-3 rounded-lg">
                  <p className="text-xs text-gray-600 mb-1">Duration</p>
                  <p className="font-bold text-gray-900">{route.duration}</p>
                </div>
                <div className="bg-gray-50 p-3 rounded-lg">
                  <p className="text-xs text-gray-600 mb-1">Crowd Level</p>
                  <span className={`px-2 py-1 rounded-full text-xs font-semibold ${getCrowdColor(route.crowdLevel)}`}>
                    {route.crowdLevel}
                  </span>
                </div>
                <div className="bg-gray-50 p-3 rounded-lg">
                  <p className="text-xs text-gray-600 mb-1">Best Time</p>
                  <p className="font-bold text-gray-900 text-xs">{route.recommendedTime}</p>
                </div>
              </div>

              <div className="bg-primary-50 p-3 rounded-lg mb-3">
                <p className="text-sm font-semibold text-primary-900 mb-2">✨ Route Highlights:</p>
                <div className="flex flex-wrap gap-2">
                  {route.highlights.map((highlight, idx) => (
                    <span key={idx} className="px-2 py-1 bg-white text-primary-700 rounded text-xs font-medium">
                      ✓ {highlight}
                    </span>
                  ))}
                </div>
              </div>

              {route.riskFactors[0] !== 'None' && (
                <div className="bg-warning-50 border-l-4 border-warning-500 p-3 rounded mb-3">
                  <p className="text-sm font-semibold text-warning-900 mb-1">⚠️ Risk Factors:</p>
                  <p className="text-sm text-warning-800">{route.riskFactors.join(', ')}</p>
                </div>
              )}

              <div className="flex gap-3">
                <button 
                  onClick={() => setSelectedRoute(route)}
                  className="flex-1 btn-primary"
                >
                  <Navigation className="inline h-4 w-4 mr-2" />
                  Start Navigation
                </button>
                <button className="flex-1 bg-success-600 text-white px-4 py-2 rounded-lg hover:bg-success-700 font-semibold">
                  <MapPin className="inline h-4 w-4 mr-2" />
                  View on Map
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Nearby Help Points */}
      <div className="card">
        <h3 className="text-xl font-bold mb-4 flex items-center">
          <Shield className="h-6 w-6 mr-2 text-primary-600" />
          Nearby Help Points on Your Route
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {nearbyHelpPoints.map((point, index) => (
            <div key={index} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
              <div className="flex items-center justify-between mb-2">
                <span className={`px-2 py-1 rounded text-xs font-semibold ${
                  point.type === 'Police' ? 'bg-primary-100 text-primary-700' :
                  point.type === 'Medical' ? 'bg-danger-100 text-danger-700' :
                  point.type === 'Information' ? 'bg-success-100 text-success-700' :
                  'bg-purple-100 text-purple-700'
                }`}>
                  {point.type}
                </span>
                <span className="text-sm font-bold text-gray-600">{point.distance}</span>
              </div>
              <p className="font-semibold text-gray-900">{point.name}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Safety Tips */}
      <div className="card bg-success-50 border-2 border-success-300">
        <h3 className="text-xl font-bold text-success-900 mb-4">🛡️ Route Safety Tips</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {[
            'Share your route and ETA with family/friends',
            'Keep your phone charged and GPS enabled',
            'Follow the recommended route for maximum safety',
            'Avoid shortcuts through unfamiliar areas',
            'Travel during recommended time windows',
            'Stay alert and aware of your surroundings',
            'Keep emergency contacts readily accessible',
            'Use authorized transportation services only'
          ].map((tip, index) => (
            <div key={index} className="flex items-start gap-2 bg-white p-3 rounded-lg">
              <CheckCircle className="h-5 w-5 text-success-600 flex-shrink-0 mt-0.5" />
              <span className="text-gray-700">{tip}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Live Safety Updates */}
      <div className="card bg-gradient-to-r from-purple-600 to-purple-700 text-white">
        <h3 className="text-xl font-bold mb-4 flex items-center">
          <TrendingUp className="h-6 w-6 mr-2" />
          Live Safety Updates
        </h3>
        <div className="space-y-3">
          <div className="bg-white/20 backdrop-blur rounded-lg p-3">
            <div className="flex items-center justify-between mb-1">
              <span className="font-semibold">Taj Mahal Area</span>
              <span className="px-2 py-1 bg-success-500 rounded-full text-xs font-bold">SAFE</span>
            </div>
            <p className="text-sm text-purple-100">Low crowd density. Excellent visibility. Tourist police active.</p>
            <p className="text-xs text-purple-200 mt-1">Updated 2 mins ago</p>
          </div>
          <div className="bg-white/20 backdrop-blur rounded-lg p-3">
            <div className="flex items-center justify-between mb-1">
              <span className="font-semibold">Sadar Bazaar</span>
              <span className="px-2 py-1 bg-warning-500 rounded-full text-xs font-bold">CAUTION</span>
            </div>
            <p className="text-sm text-purple-100">High crowd. Pickpocketing reports. Keep valuables secure.</p>
            <p className="text-xs text-purple-200 mt-1">Updated 5 mins ago</p>
          </div>
          <div className="bg-white/20 backdrop-blur rounded-lg p-3">
            <div className="flex items-center justify-between mb-1">
              <span className="font-semibold">Agra Fort</span>
              <span className="px-2 py-1 bg-success-500 rounded-full text-xs font-bold">SAFE</span>
            </div>
            <p className="text-sm text-purple-100">Moderate crowd. Well-lit pathways. Help points available.</p>
            <p className="text-xs text-purple-200 mt-1">Updated 1 min ago</p>
          </div>
        </div>
      </div>

      {/* Route Detail Modal */}
      {selectedRoute && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl max-w-3xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-2xl font-bold text-gray-900">Route Details & Navigation</h3>
                <button
                  onClick={() => setSelectedRoute(null)}
                  className="text-gray-500 hover:text-gray-700 text-2xl"
                >
                  ×
                </button>
              </div>

              <div className="space-y-6">
                {/* Route Overview */}
                <div className="bg-gradient-to-r from-primary-600 to-primary-700 text-white rounded-xl p-6">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <MapPin className="h-6 w-6" />
                      <div>
                        <p className="text-sm text-primary-100">From</p>
                        <p className="font-bold text-lg">{selectedRoute.from}</p>
                      </div>
                    </div>
                    <Navigation className="h-8 w-8" />
                    <div className="flex items-center gap-3">
                      <div className="text-right">
                        <p className="text-sm text-primary-100">To</p>
                        <p className="font-bold text-lg">{selectedRoute.to}</p>
                      </div>
                      <MapPin className="h-6 w-6" />
                    </div>
                  </div>
                  <div className="grid grid-cols-3 gap-4">
                    <div className="bg-white/20 backdrop-blur rounded-lg p-3 text-center">
                      <p className="text-2xl font-bold">{selectedRoute.distance}</p>
                      <p className="text-sm text-primary-100">Distance</p>
                    </div>
                    <div className="bg-white/20 backdrop-blur rounded-lg p-3 text-center">
                      <p className="text-2xl font-bold">{selectedRoute.duration}</p>
                      <p className="text-sm text-primary-100">Duration</p>
                    </div>
                    <div className="bg-white/20 backdrop-blur rounded-lg p-3 text-center">
                      <p className="text-2xl font-bold">{selectedRoute.safetyScore}%</p>
                      <p className="text-sm text-primary-100">Safety</p>
                    </div>
                  </div>
                </div>

                {/* Turn by Turn Navigation */}
                <div>
                  <h4 className="font-bold text-lg mb-3">📍 Turn-by-Turn Directions</h4>
                  <div className="space-y-2">
                    {[
                      'Start from Hotel Oberoi Amarvilas',
                      'Head east on Taj East Gate Road (200m)',
                      'Turn right toward Taj Mahal entrance (150m)',
                      'Pass through security checkpoint',
                      'Arrive at Taj Mahal East Gate'
                    ].map((direction, idx) => (
                      <div key={idx} className="flex items-start gap-3 bg-gray-50 p-3 rounded-lg">
                        <div className="h-8 w-8 bg-primary-600 text-white rounded-full flex items-center justify-center font-bold flex-shrink-0">
                          {idx + 1}
                        </div>
                        <p className="text-gray-700 pt-1">{direction}</p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Safety Information */}
                <div className="bg-success-50 border-2 border-success-300 rounded-lg p-4">
                  <h4 className="font-bold text-success-900 mb-2">✅ Safety Features on This Route</h4>
                  <ul className="space-y-1">
                    {selectedRoute.highlights.map((highlight, idx) => (
                      <li key={idx} className="flex items-center gap-2 text-success-800">
                        <CheckCircle className="h-4 w-4" />
                        <span>{highlight}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Action Buttons */}
                <div className="flex gap-3">
                  <button className="flex-1 btn-primary">
                    <Navigation className="inline h-5 w-5 mr-2" />
                    Start Navigation
                  </button>
                  <button className="flex-1 bg-success-600 text-white px-4 py-3 rounded-lg hover:bg-success-700 font-semibold">
                    Share Route
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default SafeRoutes