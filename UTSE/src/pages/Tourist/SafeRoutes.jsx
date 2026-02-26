import { useState } from 'react'
import { MapPin, Navigation, AlertTriangle, Shield, Clock, TrendingUp, CheckCircle, Loader } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'

const glass = { background: 'rgba(255,255,255,0.06)', backdropFilter: 'blur(24px)', WebkitBackdropFilter: 'blur(24px)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '1rem', boxShadow: '0 8px 32px rgba(0,0,0,0.3), inset 0 1px 0 rgba(255,255,255,0.08)' }
const containerAnim = { hidden: { opacity: 0 }, visible: { opacity: 1, transition: { staggerChildren: 0.08 } } }
const itemAnim = { hidden: { opacity: 0, y: 30 }, visible: { opacity: 1, y: 0, transition: { duration: 0.5 } } }

const SafeRoutes = () => {
  const [selectedRoute, setSelectedRoute] = useState(null)
  const [searchedRoute, setSearchedRoute] = useState(null)
  const [isLoading, setIsLoading] = useState(false)
  const [fromLocation, setFromLocation] = useState('')
  const [toLocation, setToLocation] = useState('')

  const popularRoutes = [
    { id: 1, from: 'Hotel Oberoi Amarvilas', to: 'Taj Mahal', distance: '1.2 km', duration: '5 mins', safetyScore: 98, crowdLevel: 'Medium', route: 'Via Taj East Gate Road', transportMode: 'Walking/Auto', highlights: ['Well-lit path', 'Tourist police present', 'CCTV coverage'], riskFactors: ['None'], nearbyHelpPoints: [{ name: 'Tourist Police Booth (Taj)', distance: '150m', type: 'Police' }, { name: 'First Aid Center', distance: '200m', type: 'Medical' }, { name: 'Safe Zone Shelter', distance: '400m', type: 'Shelter' }, { name: 'Tourist Help Desk', distance: '100m', type: 'Information' }], liveUpdates: [{ area: 'Taj Mahal Area', status: 'SAFE', message: 'Low crowd. Excellent visibility. Police active.' }], turnByTurn: ['Start from Hotel Oberoi Amarvilas', 'Head east on Taj East Gate Road (200m)', 'Turn right toward Taj Mahal entrance (150m)', 'Pass through security checkpoint', 'Arrive at Taj Mahal East Gate'] },
    { id: 2, from: 'India Gate', to: 'Red Fort', distance: '5.8 km', duration: '25 mins', safetyScore: 88, crowdLevel: 'High', route: 'Via Rajpath & Netaji Subhash Marg', transportMode: 'Metro/Taxi', highlights: ['Metro available', 'Tourist police', 'Safe parking'], riskFactors: ['Pickpocketing risk', 'Heavy crowd'], nearbyHelpPoints: [{ name: 'Chandni Chowk Police Station', distance: '500m', type: 'Police' }, { name: 'LNJP Hospital', distance: '1.2 km', type: 'Medical' }, { name: 'Delhi Tourist Center', distance: '800m', type: 'Information' }], liveUpdates: [{ area: 'Chandni Chowk Market', status: 'CAUTION', message: 'High crowd density reported. Beware of belongings.' }], turnByTurn: ['Start from India Gate Circle', 'Take C-Hexagon to Tilak Marg (1.5 km)', 'Continue on Netaji Subhash Marg (4 km)', 'You will see Red Fort on your right'] }
  ]

  const safetyFeatures = [
    { icon: Shield, title: 'Real-time Safety Monitoring', description: 'AI-powered risk assessment updates every 5 minutes' },
    { icon: AlertTriangle, title: 'Live Alerts', description: 'Instant notifications about incidents or unsafe conditions' },
    { icon: MapPin, title: 'GPS Tracking', description: 'Your location is tracked for emergency assistance' },
    { icon: Clock, title: 'Best Time Suggestions', description: 'Recommended travel times based on safety data' }
  ]

  const handleSearchRoute = () => {
    if (!fromLocation || !toLocation) { alert("Please enter both From and To locations."); return }
    setIsLoading(true); setSearchedRoute(null); setSelectedRoute(null)
    setTimeout(() => {
      const randomRoute = popularRoutes[Math.floor(Math.random() * popularRoutes.length)]
      setSearchedRoute({ ...randomRoute, from: fromLocation, to: toLocation, id: Date.now() })
      setIsLoading(false)
    }, 2000)
  }

  const getSafetyColor = (score) => score >= 90 ? { bg: 'rgba(74,222,128,0.15)', color: '#4ade80' } : score >= 75 ? { bg: 'rgba(250,204,21,0.15)', color: '#facc15' } : { bg: 'rgba(248,113,113,0.15)', color: '#f87171' }
  const getCrowdColor = (level) => ({ Low: { bg: 'rgba(74,222,128,0.15)', color: '#4ade80' }, Medium: { bg: 'rgba(250,204,21,0.15)', color: '#facc15' }, High: { bg: 'rgba(251,146,60,0.15)', color: '#fb923c' }, 'Very High': { bg: 'rgba(248,113,113,0.15)', color: '#f87171' } }[level] || { bg: 'rgba(255,255,255,0.06)', color: 'rgba(199,210,254,0.6)' })

  const activeRouteData = searchedRoute || selectedRoute || popularRoutes[0]
  const inputStyle = { background: 'rgba(255,255,255,0.08)', border: '1px solid rgba(255,255,255,0.15)', borderRadius: '0.75rem', color: '#fff', padding: '0.75rem 1rem', width: '100%', outline: 'none' }

  const renderRouteCard = (route, isSearched = false) => (
    <motion.div key={route.id} whileHover={{ scale: 1.01 }} className="rounded-xl p-5" style={{ background: isSearched ? 'rgba(99,102,241,0.1)' : 'rgba(255,255,255,0.04)', border: isSearched ? '2px solid rgba(99,102,241,0.3)' : '1px solid rgba(255,255,255,0.08)', borderRadius: '0.75rem' }}>
      <div className="flex items-start justify-between mb-3">
        <div className="flex-1">
          <div className="flex items-center gap-3 mb-2 flex-wrap">
            <div className="flex items-center gap-2"><MapPin className="h-5 w-5" style={{ color: '#4ade80' }} /><span className="font-semibold text-white">{route.from}</span></div>
            <span style={{ color: 'rgba(199,210,254,0.3)' }}>→</span>
            <div className="flex items-center gap-2"><MapPin className="h-5 w-5" style={{ color: '#f87171' }} /><span className="font-semibold text-white">{route.to}</span></div>
          </div>
          <p className="text-sm" style={{ color: 'rgba(199,210,254,0.5)' }}>{route.route}</p>
          <p className="text-xs" style={{ color: 'rgba(199,210,254,0.4)' }}>Recommended: {route.transportMode}</p>
        </div>
        <div className="text-right">
          <div className="px-4 py-2 rounded-full font-bold text-lg mb-1" style={{ background: getSafetyColor(route.safetyScore).bg, color: getSafetyColor(route.safetyScore).color }}>{route.safetyScore}%</div>
          <p className="text-xs" style={{ color: 'rgba(199,210,254,0.4)' }}>Safety Score</p>
        </div>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 my-3">
        {[{ l: 'Distance', v: route.distance }, { l: 'Duration', v: route.duration }, { l: 'Crowd Level', v: route.crowdLevel, isCrowd: true }, { l: 'Transport', v: route.transportMode }].map((d, i) => (
          <div key={i} className="p-3 rounded-lg" style={{ background: 'rgba(255,255,255,0.04)' }}>
            <p className="text-xs mb-1" style={{ color: 'rgba(199,210,254,0.4)' }}>{d.l}</p>
            {d.isCrowd ? <span className="px-2 py-1 rounded-full text-xs font-semibold" style={{ background: getCrowdColor(d.v).bg, color: getCrowdColor(d.v).color }}>{d.v}</span> : <p className="font-bold text-white text-sm">{d.v}</p>}
          </div>
        ))}
      </div>
      <div className="rounded-lg p-3 mb-3" style={{ background: 'rgba(99,102,241,0.08)', border: '1px solid rgba(99,102,241,0.15)' }}>
        <p className="text-sm font-semibold text-white mb-2">✨ Route Highlights:</p>
        <div className="flex flex-wrap gap-2">{route.highlights.map((h, idx) => (<span key={idx} className="px-2 py-1 rounded text-xs font-medium" style={{ background: 'rgba(255,255,255,0.06)', color: '#a5b4fc' }}>✓ {h}</span>))}</div>
      </div>
      {route.riskFactors[0] !== 'None' && (
        <div className="rounded-lg p-3 mb-3" style={{ background: 'rgba(250,204,21,0.06)', borderLeft: '4px solid rgba(250,204,21,0.5)' }}>
          <p className="text-sm font-semibold text-white mb-1">⚠️ Risk Factors:</p>
          <p className="text-sm" style={{ color: 'rgba(254,243,199,0.7)' }}>{route.riskFactors.join(', ')}</p>
        </div>
      )}
      <div className="flex gap-3">
        <motion.button whileHover={{ scale: 1.03 }} onClick={() => setSelectedRoute(route)} className="flex-1 py-2 rounded-xl font-semibold text-white" style={{ background: 'linear-gradient(135deg, #6366f1, #8b5cf6)' }}><Navigation className="inline h-4 w-4 mr-2" />Details & Navigate</motion.button>
        <motion.button whileHover={{ scale: 1.03 }} className="flex-1 py-2 rounded-xl font-semibold text-white" style={{ background: 'linear-gradient(135deg, #10b981, #34d399)' }}><MapPin className="inline h-4 w-4 mr-2" />View on Map</motion.button>
      </div>
    </motion.div>
  )

  return (
    <motion.div variants={containerAnim} initial="hidden" animate="visible" className="space-y-6">
      <motion.div variants={itemAnim}>
        <h2 className="text-3xl font-bold text-white" style={{ textShadow: '0 0 30px rgba(99,102,241,0.4)' }}>Safe Routes Navigator</h2>
        <p className="mt-1" style={{ color: 'rgba(199,210,254,0.6)' }}>AI-powered safe route recommendations with real-time risk assessment</p>
      </motion.div>

      {/* Search */}
      <motion.div variants={itemAnim} className="p-6" style={{ ...glass, background: 'linear-gradient(135deg, rgba(99,102,241,0.15), rgba(139,92,246,0.08))', border: '1px solid rgba(99,102,241,0.25)' }}>
        <h3 className="text-xl font-bold text-white mb-4 flex items-center"><Navigation className="h-6 w-6 mr-2" />Plan Your Safe Route</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <div><label className="block text-sm mb-2" style={{ color: 'rgba(199,210,254,0.7)' }}>From</label><input type="text" placeholder="Enter starting point..." style={inputStyle} value={fromLocation} onChange={(e) => setFromLocation(e.target.value)} /></div>
          <div><label className="block text-sm mb-2" style={{ color: 'rgba(199,210,254,0.7)' }}>To</label><input type="text" placeholder="Enter destination..." style={inputStyle} value={toLocation} onChange={(e) => setToLocation(e.target.value)} /></div>
        </div>
        <motion.button whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }} onClick={handleSearchRoute} disabled={isLoading} className="w-full py-3 rounded-xl font-semibold flex items-center justify-center text-white disabled:opacity-50" style={{ background: 'rgba(255,255,255,0.1)', border: '1px solid rgba(255,255,255,0.2)' }}>
          {isLoading ? <Loader className="animate-spin h-5 w-5 mr-2" /> : '🗺️ '}{isLoading ? 'Finding Safest Route...' : 'Find Safest Route'}
        </motion.button>
      </motion.div>

      {/* Safety Features */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {safetyFeatures.map((feature, index) => {
          const Icon = feature.icon; return (
            <motion.div key={index} variants={itemAnim} whileHover={{ scale: 1.05, y: -5 }} className="p-5 text-center" style={glass}>
              <div className="inline-block p-3 rounded-full mb-3" style={{ background: 'rgba(99,102,241,0.15)' }}><Icon className="h-8 w-8" style={{ color: '#818cf8' }} /></div>
              <h4 className="font-bold text-white mb-2">{feature.title}</h4>
              <p className="text-sm" style={{ color: 'rgba(199,210,254,0.5)' }}>{feature.description}</p>
            </motion.div>
          )
        })}
      </div>

      {/* Searched Route */}
      <AnimatePresence>
        {searchedRoute && (
          <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} className="p-6" style={glass}>
            <h3 className="text-xl font-bold text-white mb-4">✨ Your Recommended Safest Route</h3>
            {renderRouteCard(searchedRoute, true)}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Popular Routes */}
      <motion.div variants={itemAnim} className="p-6" style={glass}>
        <h3 className="text-xl font-bold text-white mb-4">🌟 Popular Safe Routes</h3>
        <div className="space-y-4">{popularRoutes.map((route) => renderRouteCard(route))}</div>
      </motion.div>

      {/* Nearby Help */}
      <motion.div variants={itemAnim} className="p-6" style={glass}>
        <h3 className="text-xl font-bold text-white mb-4 flex items-center"><Shield className="h-6 w-6 mr-2" style={{ color: '#818cf8' }} />Nearby Help Points on: <span className="ml-2" style={{ color: '#a5b4fc' }}>{activeRouteData.to}</span></h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {activeRouteData.nearbyHelpPoints.map((point, index) => (
            <motion.div key={index} whileHover={{ scale: 1.03 }} className="rounded-xl p-4" style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '0.75rem' }}>
              <div className="flex items-center justify-between mb-2">
                <span className="px-2 py-1 rounded text-xs font-semibold" style={{ background: point.type === 'Police' ? 'rgba(99,102,241,0.15)' : point.type === 'Medical' ? 'rgba(239,68,68,0.15)' : 'rgba(16,185,129,0.15)', color: point.type === 'Police' ? '#a5b4fc' : point.type === 'Medical' ? '#fca5a5' : '#6ee7b7' }}>{point.type}</span>
                <span className="text-sm font-bold" style={{ color: 'rgba(199,210,254,0.6)' }}>{point.distance}</span>
              </div>
              <p className="font-semibold text-white">{point.name}</p>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Safety Tips */}
      <motion.div variants={itemAnim} className="p-6" style={{ ...glass, background: 'rgba(74,222,128,0.05)', border: '1px solid rgba(74,222,128,0.15)' }}>
        <h3 className="text-xl font-bold text-white mb-4">🛡️ Route Safety Tips</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {['Share your route and ETA with family/friends', 'Keep your phone charged and GPS enabled', 'Follow the recommended route for maximum safety', 'Avoid shortcuts through unfamiliar areas', 'Travel during recommended time windows', 'Stay alert and aware of your surroundings', 'Keep emergency contacts readily accessible', 'Use authorized transportation services only'].map((tip, index) => (
            <div key={index} className="flex items-start gap-2 p-3 rounded-xl" style={{ background: 'rgba(255,255,255,0.04)' }}>
              <CheckCircle className="h-5 w-5 flex-shrink-0 mt-0.5" style={{ color: '#4ade80' }} />
              <span className="text-white">{tip}</span>
            </div>
          ))}
        </div>
      </motion.div>

      {/* Live Updates */}
      <motion.div variants={itemAnim} className="p-6" style={{ ...glass, background: 'linear-gradient(135deg, rgba(168,85,247,0.15), rgba(139,92,246,0.05))', border: '1px solid rgba(168,85,247,0.2)' }}>
        <h3 className="text-xl font-bold text-white mb-4 flex items-center"><TrendingUp className="h-6 w-6 mr-2" />Live Safety Updates for: <span className="ml-2" style={{ color: '#c4b5fd' }}>{activeRouteData.to}</span></h3>
        <div className="space-y-3">
          {activeRouteData.liveUpdates.map((update, index) => (
            <div key={index} className="rounded-xl p-3" style={{ background: 'rgba(255,255,255,0.06)' }}>
              <div className="flex items-center justify-between mb-1">
                <span className="font-semibold text-white">{update.area}</span>
                <span className="px-2 py-1 rounded-full text-xs font-bold text-white" style={{ background: update.status === 'SAFE' ? 'rgba(74,222,128,0.3)' : 'rgba(250,204,21,0.3)' }}>{update.status}</span>
              </div>
              <p className="text-sm" style={{ color: 'rgba(199,210,254,0.6)' }}>{update.message}</p>
            </div>
          ))}
        </div>
      </motion.div>

      {/* Route Details Modal */}
      {selectedRoute && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="fixed inset-0 flex items-center justify-center z-50 p-4" style={{ background: 'rgba(0,0,0,0.7)', backdropFilter: 'blur(8px)' }}>
          <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="max-w-3xl w-full max-h-[90vh] overflow-y-auto rounded-2xl" style={{ background: 'linear-gradient(135deg, #1a1a4e, #302b63)', border: '1px solid rgba(255,255,255,0.15)', boxShadow: '0 25px 50px rgba(0,0,0,0.5)' }}>
            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-2xl font-bold text-white">Route Details & Navigation</h3>
                <button onClick={() => setSelectedRoute(null)} className="text-white/50 hover:text-white text-2xl">×</button>
              </div>
              <div className="space-y-6">
                <div className="rounded-xl p-6" style={{ background: 'linear-gradient(135deg, rgba(99,102,241,0.2), rgba(139,92,246,0.1))', border: '1px solid rgba(99,102,241,0.2)' }}>
                  <div className="flex items-center justify-between mb-4 flex-wrap gap-3">
                    <div className="flex items-center gap-3"><MapPin className="h-6 w-6" style={{ color: '#818cf8' }} /><div><p className="text-sm" style={{ color: 'rgba(199,210,254,0.5)' }}>From</p><p className="font-bold text-lg text-white">{selectedRoute.from}</p></div></div>
                    <Navigation className="h-8 w-8" style={{ color: '#818cf8' }} />
                    <div className="flex items-center gap-3"><div className="text-right"><p className="text-sm" style={{ color: 'rgba(199,210,254,0.5)' }}>To</p><p className="font-bold text-lg text-white">{selectedRoute.to}</p></div><MapPin className="h-6 w-6" style={{ color: '#818cf8' }} /></div>
                  </div>
                  <div className="grid grid-cols-3 gap-4">
                    {[{ v: selectedRoute.distance, l: 'Distance' }, { v: selectedRoute.duration, l: 'Duration' }, { v: `${selectedRoute.safetyScore}%`, l: 'Safety' }].map((d, i) => (
                      <div key={i} className="rounded-lg p-3 text-center" style={{ background: 'rgba(255,255,255,0.06)' }}><p className="text-2xl font-bold text-white">{d.v}</p><p className="text-sm" style={{ color: 'rgba(199,210,254,0.5)' }}>{d.l}</p></div>
                    ))}
                  </div>
                </div>
                <div>
                  <h4 className="font-bold text-lg text-white mb-3">📍 Turn-by-Turn Directions</h4>
                  <div className="space-y-2">
                    {selectedRoute.turnByTurn.map((direction, idx) => (
                      <div key={idx} className="flex items-start gap-3 p-3 rounded-lg" style={{ background: 'rgba(255,255,255,0.04)' }}>
                        <div className="h-8 w-8 rounded-full flex items-center justify-center font-bold flex-shrink-0 text-white" style={{ background: 'linear-gradient(135deg, #6366f1, #8b5cf6)' }}>{idx + 1}</div>
                        <p className="text-white pt-1">{direction}</p>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="rounded-lg p-4" style={{ background: 'rgba(74,222,128,0.08)', border: '1px solid rgba(74,222,128,0.15)' }}>
                  <h4 className="font-bold mb-2" style={{ color: '#4ade80' }}>✅ Safety Features on This Route</h4>
                  <ul className="space-y-1">{selectedRoute.highlights.map((h, idx) => (<li key={idx} className="flex items-center gap-2 text-white"><CheckCircle className="h-4 w-4" style={{ color: '#4ade80' }} /><span>{h}</span></li>))}</ul>
                </div>
                <div className="flex gap-3">
                  <motion.button whileHover={{ scale: 1.03 }} className="flex-1 py-3 rounded-xl font-semibold text-white" style={{ background: 'linear-gradient(135deg, #6366f1, #8b5cf6)' }}><Navigation className="inline h-5 w-5 mr-2" />Start Navigation</motion.button>
                  <motion.button whileHover={{ scale: 1.03 }} className="flex-1 py-3 rounded-xl font-semibold text-white" style={{ background: 'linear-gradient(135deg, #10b981, #34d399)' }}>Share Route</motion.button>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </motion.div>
  )
}

export default SafeRoutes