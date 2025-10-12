import { Routes, Route } from 'react-router-dom';
import SplashScreen from './components/Layout/SplashScreen';
import Login from './components/Auth/Login';
import SignUp from './components/Auth/SignUp';
import TouristLayout from './components/Layout/TouristLayout';
import AuthorityLayout from './components/Layout/AuthorityLayout';
import ProtectedRoute from './components/Auth/ProtectedRoute';

// Tourist Pages
import TouristDashboard from './pages/Tourist/Dashboard';
import SafeRoutes from './pages/Tourist/SafeRoutes';
import SafetyInfo from './pages/Tourist/SafetyInfo';
import EmergencyHelp from './pages/Tourist/EmergencyHelp';
import MyTouristCard from './pages/Tourist/MyTouristCard';
import Registration from './pages/Tourist/Registration';
import TravelGuide from './pages/Tourist/TravelGuide';
import LanguageTranslator from './pages/Tourist/LanguageTranslator';

// Authority Pages
import AuthorityDashboard from './pages/Authority/Dashboard';
import RiskAssessment from './pages/Authority/RiskAssessment';
import IncidentManagement from './pages/Authority/IncidentManagement';
import EmergencyResponse from './pages/Authority/EmergencyResponse';
import Analytics from './pages/Authority/Analytics';
import SmartIDSystem from './pages/Authority/SmartIDSystem';
import TouristMonitoring from './pages/Authority/TouristMonitoring';
import ResponseTeam from './pages/Authority/ResponseTeam';

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<SplashScreen />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<SignUp />} />

      {/* Tourist Routes */}
      <Route path="/tourist" element={<ProtectedRoute allowedRoles={['tourist']}><TouristLayout /></ProtectedRoute>}>
        <Route index element={<TouristDashboard />} />
        <Route path="dashboard" element={<TouristDashboard />} />
        <Route path="safe-routes" element={<SafeRoutes />} />
        <Route path="safety-info" element={<SafetyInfo />} />
        <Route path="emergency-help" element={<EmergencyHelp />} />
        <Route path="my-tourist-card" element={<MyTouristCard />} />
        <Route path="registration" element={<Registration />} />
        <Route path="travel-guide" element={<TravelGuide />} />
        <Route path="language-translator" element={<LanguageTranslator />} />
      </Route>

      {/* Authority Routes */}
      <Route path="/authority" element={<ProtectedRoute allowedRoles={['authority']}><AuthorityLayout /></ProtectedRoute>}>
        <Route index element={<AuthorityDashboard />} />
        <Route path="dashboard" element={<AuthorityDashboard />} />
        <Route path="risk-assessment" element={<RiskAssessment />} />
        <Route path="incident-management" element={<IncidentManagement />} />
        <Route path="emergency-response" element={<EmergencyResponse />} />
        <Route path="analytics" element={<Analytics />} />
        <Route path="smart-id-system" element={<SmartIDSystem />} />
        <Route path="tourist-monitoring" element={<TouristMonitoring />} />
        <Route path="response-team" element={<ResponseTeam />} />
      </Route>

      {/* 404 Page */}
      <Route path="*" element={<div className="flex items-center justify-center min-h-screen">404 Not Found</div>} />
    </Routes>
  );
};

export default AppRoutes;