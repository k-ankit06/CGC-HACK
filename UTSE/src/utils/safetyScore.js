// utils/safetyScore.js

// ---------------------------
// 🔹 Format Helpers
// ---------------------------
export const formatTime = (isoString) => {
  if (!isoString) return 'N/A';
  const date = new Date(isoString);
  return date.toLocaleTimeString('en-US', {
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: true
  });
};

export const formatDate = (date) => {
  return date.toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
};

// ---------------------------
// 🔹 Location Safety Score
// ---------------------------
export const calculateSafetyScore = (locationData) => {
  const safeAreas = ['New Delhi', 'Goa', 'Rajasthan', 'Mumbai', 'Bangalore'];
  const moderateAreas = ['Kolkata', 'Chennai', 'Hyderabad'];
  const riskyAreas = ['...'];

  if (safeAreas.includes(locationData.city)) {
    return Math.floor(Math.random() * 30) + 70; // 70–100
  } else if (moderateAreas.includes(locationData.city)) {
    return Math.floor(Math.random() * 30) + 40; // 40–70
  } else if (riskyAreas.includes(locationData.city)) {
    return Math.floor(Math.random() * 30) + 10; // 10–40
  } else {
    return Math.floor(Math.random() * 100); // 0–100
  }
};

export const getSafetyLevel = (score) => {
  if (score > 70) return 'Very Safe';
  if (score > 40) return 'Moderately Safe';
  if (score > 20) return 'Caution Advised';
  return 'High Risk Area';
};

export const getSafetyColor = (score) => {
  if (score > 70) return 'bg-green-100 text-green-800';
  if (score > 40) return 'bg-yellow-100 text-yellow-800';
  if (score > 20) return 'bg-orange-100 text-orange-800';
  return 'bg-red-100 text-red-800';
};

// ---------------------------
// 🔹 Route Safety
// ---------------------------
export const calculateRouteSafetyScore = (route) => {
  const routePoints = route.routePoints || [];
  let totalScore = 0;

  for (const point of routePoints) {
    const pointScore = Math.floor(Math.random() * 30) + 40; // 40–70
    totalScore += pointScore;
  }

  const averageScore = totalScore / (routePoints.length || 1);

  if (route.distance > 10) {
    return Math.max(10, averageScore - 20);
  } else if (route.distance < 2) {
    return Math.min(100, averageScore + 10);
  }

  return averageScore;
};

export const getRouteSafetyLevel = (score) => {
  if (score > 70) return 'Very Safe Route';
  if (score > 40) return 'Moderately Safe Route';
  if (score > 20) return 'Caution Advised Route';
  return 'High Risk Route';
};

export const getRouteSafetyColor = (score) => {
  if (score > 70) return 'bg-green-100 text-green-800';
  if (score > 40) return 'bg-yellow-100 text-yellow-800';
  if (score > 20) return 'bg-orange-100 text-orange-800';
  return 'bg-red-100 text-red-800';
};

// ---------------------------
// 🔹 Incident Severity
// ---------------------------
export const calculateIncidentSeverity = (incident) => {
  const severityLevels = {
    minor: 1,
    moderate: 2,
    serious: 3,
    critical: 4
  };

  return severityLevels[incident.severity] || 2;
};

export const getIncidentSeverityColor = (severity) => {
  const severityLevels = {
    1: 'bg-green-100 text-green-800',
    2: 'bg-yellow-100 text-yellow-800',
    3: 'bg-orange-100 text-orange-800',
    4: 'bg-red-100 text-red-800'
  };

  return severityLevels[severity] || 'bg-gray-100 text-gray-800';
};

export const getIncidentSeverityLabel = (severity) => {
  const severityLabels = {
    1: 'Minor',
    2: 'Moderate',
    3: 'Serious',
    4: 'Critical'
  };

  return severityLabels[severity] || 'Unknown';
};

// ---------------------------
// 🔹 Response Time
// ---------------------------
export const calculateResponseTimeScore = (responseTime) => {
  if (responseTime <= 5) return 100;
  if (responseTime <= 10) return 80;
  if (responseTime <= 15) return 60;
  if (responseTime <= 20) return 40;
  return 20;
};

export const getResponseTimeColor = (score) => {
  if (score > 70) return 'bg-green-100 text-green-800';
  if (score > 40) return 'bg-yellow-100 text-yellow-800';
  return 'bg-red-100 text-red-800';
};

export const getResponseTimeLabel = (score) => {
  if (score > 70) return 'Excellent';
  if (score > 40) return 'Good';
  return 'Poor';
};
