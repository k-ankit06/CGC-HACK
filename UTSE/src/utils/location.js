// utils/location.js

export const locationUtils = {
  // Get current location using browser geolocation API
  getCurrentLocation: () => {
    return new Promise((resolve, reject) => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            resolve({
              latitude: position.coords.latitude,
              longitude: position.coords.longitude,
              accuracy: position.coords.accuracy,
              timestamp: position.timestamp,
            });
          },
          (error) => {
            console.error('Error getting location:', error);
            reject(error);
          },
          {
            enableHighAccuracy: true,
            timeout: 10000,
            maximumAge: 60000,
          }
        );
      } else {
        reject(new Error('Geolocation is not supported by this browser.'));
      }
    });
  },

  // Convert latitude and longitude to a readable address
  getAddressFromCoordinates: async (lat, lng) => {
    try {
      // In a real app, you would use a geocoding service like Google Maps, Mapbox, or OpenStreetMap
      // This is a simplified example

      // Mock data - in a real app, you would call a geocoding API
      const mockAddresses = {
        '28.6139,77.2090': 'Connaught Place, New Delhi, India',
        '12.9716,77.5946': 'Bangalore, Karnataka, India',
        '19.0760,72.8777': 'Mumbai, Maharashtra, India',
        '17.3850,78.4867': 'Hyderabad, Telangana, India',
        '28.7041,77.1025': 'Gurgaon, Haryana, India',
      };

      const key = `${lat.toFixed(4)},${lng.toFixed(4)}`;
      return mockAddresses[key] || `Location at ${lat.toFixed(4)}, ${lng.toFixed(4)}`;
    } catch (error) {
      console.error('Error getting address from coordinates:', error);
      throw error;
    }
  },

  // Calculate distance between two coordinates in kilometers
  calculateDistance: (lat1, lon1, lat2, lon2) => {
    const R = 6371; // Earth's radius in km
    const dLat = (lat2 - lat1) * (Math.PI / 180);
    const dLon = (lon2 - lon1) * (Math.PI / 180);
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(lat1 * (Math.PI / 180)) *
      Math.cos(lat2 * (Math.PI / 180)) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c;
  },

  // Calculate bearing between two coordinates
  calculateBearing: (lat1, lon1, lat2, lon2) => {
    const y = Math.sin(lon2 - lon1) * Math.cos(lat2);
    const x = Math.cos(lat1) * Math.sin(lat2) -
               Math.sin(lat1) * Math.cos(lat2) * Math.cos(lon2 - lon1);
    return Math.atan2(y, x) * (180 / Math.PI);
  },

  // Get direction text from bearing
  getDirectionText: (bearing) => {
    const directions = [
      'North',
      'North-Northeast',
      'Northeast',
      'East-Northeast',
      'East',
      'East-Southeast',
      'Southeast',
      'South-Southeast',
      'South',
      'South-Southwest',
      'Southwest',
      'West-Southwest',
      'West',
      'West-Northwest',
      'Northwest',
      'North-Northwest',
    ];

    const index = Math.round(bearing / 22.5) % 16;
    return directions[index];
  },

  // Get nearby locations within a radius
  getNearbyLocations: (centerLat, centerLng, radiusKm, locations) => {
    return locations.filter(location => {
      const distance = locationUtils.calculateDistance(
        centerLat,
        centerLng,
        location.latitude,
        location.longitude
      );
      return distance <= radiusKm;
    });
  },

  // Get the closest location from a list
  getClosestLocation: (currentLat, currentLng, locations) => {
    if (!locations || locations.length === 0) return null;

    let closest = locations[0];
    let minDistance = locationUtils.calculateDistance(
      currentLat,
      currentLng,
      closest.latitude,
      closest.longitude
    );

    for (let i = 1; i < locations.length; i++) {
      const distance = locationUtils.calculateDistance(
        currentLat,
        currentLng,
        locations[i].latitude,
        locations[i].longitude
      );

      if (distance < minDistance) {
        minDistance = distance;
        closest = locations[i];
      }
    }

    return closest;
  },

  // Format coordinates for display
  formatCoordinates: (lat, lng) => {
    return `${lat.toFixed(4)}° N, ${lng.toFixed(4)}° E`;
  },

  // Convert coordinates to DMS format
  convertToDMS: (lat, lng) => {
    const latDMS = locationUtils.convertToDMSSingle(lat, 'N', 'S');
    const lngDMS = locationUtils.convertToDMSSingle(lng, 'E', 'W');
    return `${latDMS} ${lngDMS}`;
  },

  // Convert a single coordinate to DMS format
  convertToDMSSingle: (coord, posLabel, negLabel) => {
    const absCoord = Math.abs(coord);
    const degrees = Math.floor(absCoord);
    const minutesFloat = (absCoord - degrees) * 60;
    const minutes = Math.floor(minutesFloat);
    const seconds = (minutesFloat - minutes) * 60;

    const label = coord >= 0 ? posLabel : negLabel;
    return `${degrees}° ${minutes.toFixed(0)}' ${seconds.toFixed(2)}" ${label}`;
  },

  // Get location type (city, landmark, etc.)
  getLocationType: (location) => {
    if (!location) return 'unknown';

    if (location.isCity) return 'city';
    if (location.isLandmark) return 'landmark';
    if (location.isAttraction) return 'attraction';
    if (location.isHotel) return 'hotel';
    if (location.isRestaurant) return 'restaurant';
    if (location.isTransport) return 'transport';
    if (location.isEmergency) return 'emergency';

    return 'location';
  },

  // Get location icon based on type
  getLocationIcon: (location) => {
    const type = locationUtils.getLocationType(location);

    switch (type) {
      case 'city':
        return 'fas fa-city';
      case 'landmark':
        return 'fas fa-landmark';
      case 'attraction':
        return 'fas fa-umbrella-beach';
      case 'hotel':
        return 'fas fa-hotel';
      case 'restaurant':
        return 'fas fa-utensils';
      case 'transport':
        return 'fas fa-bus';
      case 'emergency':
        return 'fas fa-ambulance';
      default:
        return 'fas fa-map-marker-alt';
    }
  },

  // Get location color based on type
  getLocationColor: (location) => {
    const type = locationUtils.getLocationType(location);

    switch (type) {
      case 'city':
        return 'bg-blue-500';
      case 'landmark':
        return 'bg-purple-500';
      case 'attraction':
        return 'bg-green-500';
      case 'hotel':
        return 'bg-orange-500';
      case 'restaurant':
        return 'bg-yellow-500';
      case 'transport':
        return 'bg-indigo-500';
      case 'emergency':
        return 'bg-red-500';
      default:
        return 'bg-gray-500';
    }
  },

  // Get location name with type
  getLocationNameWithType: (location) => {
    const type = locationUtils.getLocationType(location);
    const typeNames = {
      city: 'City',
      landmark: 'Landmark',
      attraction: 'Attraction',
      hotel: 'Hotel',
      restaurant: 'Restaurant',
      transport: 'Transport',
      emergency: 'Emergency',
    };

    return `${location.name} (${typeNames[type] || 'Location'})`;
  },

  // Get location description
  getLocationDescription: (location) => {
    if (location.description) return location.description;

    const type = locationUtils.getLocationType(location);
    const descriptions = {
      city: 'A major city with various attractions and services',
      landmark: 'A notable landmark or historical site',
      attraction: 'A popular tourist attraction',
      hotel: 'A place to stay with accommodation services',
      restaurant: 'A place to eat with various food options',
      transport: 'A transportation hub or station',
      emergency: 'An emergency service location',
    };

    return descriptions[type] || 'A location of interest';
  },

  // Get location safety score text
  getLocationSafetyScoreText: (score) => {
    if (score > 80) return 'Very Safe';
    if (score > 60) return 'Safe';
    if (score > 40) return 'Moderately Safe';
    if (score > 20) return 'Caution Advised';
    return 'High Risk Area';
  },

  // Get location safety score color
  getLocationSafetyScoreColor: (score) => {
    if (score > 80) return 'bg-green-100 text-green-800';
    if (score > 60) return 'bg-green-200 text-green-800';
    if (score > 40) return 'bg-yellow-100 text-yellow-800';
    if (score > 20) return 'bg-orange-100 text-orange-800';
    return 'bg-red-100 text-red-800';
  },

  // Get location safety score icon
  getLocationSafetyScoreIcon: (score) => {
    if (score > 80) return 'fas fa-check-circle';
    if (score > 60) return 'fas fa-check-circle';
    if (score > 40) return 'fas fa-exclamation-triangle';
    if (score > 20) return 'fas fa-exclamation-triangle';
    return 'fas fa-times-circle';
  },

  // Get location safety score badge
  getLocationSafetyScoreBadge: (score) => {
    const text = locationUtils.getLocationSafetyScoreText(score);
    const color = locationUtils.getLocationSafetyScoreColor(score);
    const icon = locationUtils.getLocationSafetyScoreIcon(score);

    return (
      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${color}`}>
        <i className={`${icon} mr-1`}></i>
        {text}
      </span>
    );
  },

  // Get location safety score progress bar
  getLocationSafetyScoreProgress: (score) => {
    const color = score > 60 ? 'bg-green-500' :
                 score > 40 ? 'bg-yellow-500' :
                 'bg-red-500';

    return (
      <div className="w-full bg-gray-200 rounded-full h-2.5">
        <div
          className={`h-2.5 rounded-full ${color}`}
          style={{ width: `${score}%` }}
        ></div>
      </div>
    );
  },

  // Get location safety score display
  getLocationSafetyScoreDisplay: (score) => {
    return (
      <div className="flex items-center">
        <span className="mr-2 text-sm font-medium">{score}/100</span>
        {locationUtils.getLocationSafetyScoreProgress(score)}
      </div>
    );
  },

  // Get location safety score with all elements
  getLocationSafetyScoreFull: (score) => {
    return (
      <div className="flex items-center">
        <span className="mr-2 text-sm font-medium">{score}/100</span>
        {locationUtils.getLocationSafetyScoreProgress(score)}
        <span className="ml-2 text-xs font-medium">
          {locationUtils.getLocationSafetyScoreText(score)}
        </span>
      </div>
    );
  },

  // Get location safety score with icon
  getLocationSafetyScoreWithIcon: (score) => {
    const icon = locationUtils.getLocationSafetyScoreIcon(score);
    const color = locationUtils.getLocationSafetyScoreColor(score);

    return (
      <div className="flex items-center">
        <i className={`${icon} mr-2 text-lg ${color.includes('text-') ? color.split('text-')[1] : 'text-gray-800'}`}></i>
        <span className="mr-2 text-sm font-medium">{score}/100</span>
        {locationUtils.getLocationSafetyScoreProgress(score)}
      </div>
    );
  },

  // Get location safety score with all elements and icon
  getLocationSafetyScoreFullWithIcon: (score) => {
    const icon = locationUtils.getLocationSafetyScoreIcon(score);
    const color = locationUtils.getLocationSafetyScoreColor(score);

    return (
      <div className="flex items-center">
        <i className={`${icon} mr-2 text-lg ${color.includes('text-') ? color.split('text-')[1] : 'text-gray-800'}`}></i>
        <span className="mr-2 text-sm font-medium">{score}/100</span>
        {locationUtils.getLocationSafetyScoreProgress(score)}
        <span className="ml-2 text-xs font-medium">
          {locationUtils.getLocationSafetyScoreText(score)}
        </span>
      </div>
    );
  },

  // Get location safety score with all elements and icon in a card
  getLocationSafetyScoreCard: (score) => {
    const icon = locationUtils.getLocationSafetyScoreIcon(score);
    const color = locationUtils.getLocationSafetyScoreColor(score);
    const text = locationUtils.getLocationSafetyScoreText(score);

    return (
      <div className="bg-white p-4 rounded-lg shadow">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-sm font-medium text-gray-500">Safety Score</h3>
            <div className="flex items-center">
              <i className={`${icon} mr-2 text-lg ${color.includes('text-') ? color.split('text-')[1] : 'text-gray-800'}`}></i>
              <span className="text-2xl font-bold">{score}</span>
              <span className="ml-1 text-gray-500">/100</span>
            </div>
          </div>
          <div className="text-right">
            <p className="text-xs font-medium text-gray-500">Current Safety Level</p>
            <p className="text-sm font-medium">{text}</p>
          </div>
        </div>
        {locationUtils.getLocationSafetyScoreProgress(score)}
      </div>
    );
  },
};