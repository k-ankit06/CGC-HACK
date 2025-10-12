import { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';

const MapComponent = ({ center, zoom, markers, onMarkerClick, showRoutes, routes }) => {
  const mapRef = useRef(null);
  const [mapLoaded, setMapLoaded] = useState(false);
  const [selectedMarker, setSelectedMarker] = useState(null);

  // This is a simplified map component. In a real application, you would use a proper map library like Google Maps, Mapbox, or Leaflet

  useEffect(() => {
    // Simulate map loading
    const timer = setTimeout(() => {
      setMapLoaded(true);
    }, 500);

    return () => clearTimeout(timer);
  }, []);

  const handleMarkerClick = (marker) => {
    setSelectedMarker(marker);
    if (onMarkerClick) {
      onMarkerClick(marker);
    }
  };

  return (
    <div className="relative h-full w-full rounded-lg overflow-hidden">
      {!mapLoaded ? (
        <div className="absolute inset-0 bg-gray-100 flex items-center justify-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-500"></div>
        </div>
      ) : (
        <div className="relative h-full w-full">
          {/* This would be replaced with an actual map component in a real application */}
          <div
            ref={mapRef}
            className="h-full w-full bg-gray-100"
            style={{
              backgroundImage: 'url(https://via.placeholder.com/1200x800?text=Map+View)',
              backgroundSize: 'cover',
              backgroundPosition: 'center'
            }}
          >
            {/* Markers */}
            {markers && markers.map((marker, index) => (
              <motion.div
                key={index}
                whileHover={{ scale: 1.2 }}
                whileTap={{ scale: 0.8 }}
                onClick={() => handleMarkerClick(marker)}
                className="absolute bg-indigo-600 text-white rounded-full w-8 h-8 flex items-center justify-center cursor-pointer shadow-lg"
                style={{
                  left: `${marker.position.x}%`,
                  top: `${marker.position.y}%`,
                  transform: 'translate(-50%, -50%)'
                }}
              >
                <i className="fas fa-map-marker-alt text-sm"></i>
              </motion.div>
            ))}

            {/* Selected Marker Info */}
            {selectedMarker && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 20 }}
                className="absolute bottom-4 left-4 bg-white p-4 rounded-lg shadow-lg max-w-sm z-10"
              >
                <h3 className="font-semibold text-gray-800 mb-2">{selectedMarker.title}</h3>
                <p className="text-gray-600 mb-2">{selectedMarker.description}</p>
                <div className="flex items-center text-sm">
                  <i className="fas fa-map-marker-alt text-indigo-500 mr-1"></i>
                  <span>Lat: {selectedMarker.coordinates.lat.toFixed(4)}, Lng: {selectedMarker.coordinates.lng.toFixed(4)}</span>
                </div>
                {selectedMarker.safetyScore && (
                  <div className="mt-2">
                    <div className="flex items-center">
                      <span className="text-sm font-medium text-green-600 mr-2">{selectedMarker.safetyScore}/100</span>
                      <div className="w-24 h-2 bg-gray-200 rounded-full">
                        <div
                          className="h-full bg-green-500"
                          style={{ width: `${selectedMarker.safetyScore}%` }}
                        ></div>
                      </div>
                    </div>
                  </div>
                )}
                <button
                  onClick={() => setSelectedMarker(null)}
                  className="mt-3 text-indigo-600 hover:text-indigo-800 text-sm flex items-center"
                >
                  <i className="fas fa-times mr-1"></i>
                  Close
                </button>
              </motion.div>
            )}

            {/* Routes */}
            {showRoutes && routes && (
              <div className="absolute inset-0 pointer-events-none">
                {routes.map((route, index) => (
                  <div key={index} className="absolute w-full h-full">
                    <svg
                      className="absolute inset-0 w-full h-full"
                      viewBox="0 0 100 100"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d={route.path}
                        fill="none"
                        stroke="#3b82f6"
                        strokeWidth="0.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeDasharray="3,2"
                      />
                    </svg>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default MapComponent;