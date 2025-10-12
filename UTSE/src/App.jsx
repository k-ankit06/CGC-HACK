// src/App.jsx
import { Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';

import SplashScreen from './components/Layout/SplashScreen';
import Login from './components/Auth/Login';
import SignUp from './components/Auth/SignUp';
import ProtectedRoute from './components/Auth/ProtectedRoute';

import TouristLayout from './components/Layout/TouristLayout';
import AuthorityLayout from './components/Layout/AuthorityLayout';

// Tourist pages
import TouristDashboard from './pages/Tourist/Dashboard';
import SafeRoutes from './pages/Tourist/SafeRoutes';
import EmergencyHelp from './pages/Tourist/EmergencyHelp';
import LanguageTranslator from './pages/Tourist/LanguageTranslator';
import MyTouristCard from './pages/Tourist/MyTouristCard';
import Registration from './pages/Tourist/Registration';

// Authority pages
import AuthorityDashboard from './pages/Authority/Dashboard';
import TouristMonitoring from './pages/Authority/TouristMonitoring';
import IncidentManagement from './pages/Authority/IncidentManagement';

export default function App() {
  const location = useLocation();
  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        {/* Public */}
        <Route path="/" element={<SplashScreen />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />

        {/* Tourist */}
        <Route
          path="/tourist"
          element={
            <ProtectedRoute allowedRoles={['tourist']}>
              <TouristLayout />
            </ProtectedRoute>
          }
        >
          <Route index element={<TouristDashboard />} />
          <Route path="safe-routes" element={<SafeRoutes />} />
          <Route path="help" element={<EmergencyHelp />} />
          <Route path="translate" element={<LanguageTranslator />} />
          <Route path="my-card" element={<MyTouristCard />} />
          <Route path="register" element={<Registration />} />
        </Route>

        {/* Authority */}
        <Route
          path="/authority"
          element={
            <ProtectedRoute allowedRoles={['authority']}>
              <AuthorityLayout />
            </ProtectedRoute>
          }
        >
          <Route index element={<AuthorityDashboard />} />
          <Route path="monitoring" element={<TouristMonitoring />} />
          <Route path="incidents" element={<IncidentManagement />} />
        </Route>
      </Routes>
    </AnimatePresence>
  );
}