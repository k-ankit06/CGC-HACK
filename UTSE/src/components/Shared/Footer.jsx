import { useAuth } from '../Auth/AuthContext';

const Footer = () => {
  const { user } = useAuth();
  const isTouristRoute = window.location.pathname.startsWith('/tourist');

  return (
    <footer className={`bg-gray-800 text-white py-4 ${isTouristRoute ? 'tourist-footer' : 'authority-footer'}`}>
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-4 md:mb-0">
            <h3 className="text-lg font-semibold">
              {isTouristRoute ? 'Tourist Safety System' : 'Authority Dashboard'}
            </h3>
            <p className="text-sm text-gray-400">
              {isTouristRoute
                ? 'Your safety is our priority. Enjoy your travels with confidence.'
                : 'Monitor and manage tourist safety with our comprehensive system.'}
            </p>
          </div>

          <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-8">
            <div>
              <h4 className="text-sm font-medium text-gray-300 mb-2">Quick Links</h4>
              <ul className="space-y-1">
                {isTouristRoute ? (
                  <>
                    <li><a href="/tourist/dashboard" className="text-gray-400 hover:text-white text-sm">Dashboard</a></li>
                    <li><a href="/tourist/safe-routes" className="text-gray-400 hover:text-white text-sm">Safe Routes</a></li>
                    <li><a href="/tourist/safety-info" className="text-gray-400 hover:text-white text-sm">Safety Info</a></li>
                    <li><a href="/tourist/emergency-help" className="text-gray-400 hover:text-white text-sm">Emergency Help</a></li>
                  </>
                ) : (
                  <>
                    <li><a href="/authority/dashboard" className="text-gray-400 hover:text-white text-sm">Dashboard</a></li>
                    <li><a href="/authority/risk-assessment" className="text-gray-400 hover:text-white text-sm">Risk Assessment</a></li>
                    <li><a href="/authority/incident-management" className="text-gray-400 hover:text-white text-sm">Incident Management</a></li>
                    <li><a href="/authority/emergency-response" className="text-gray-400 hover:text-white text-sm">Emergency Response</a></li>
                  </>
                )}
              </ul>
            </div>

            <div>
              <h4 className="text-sm font-medium text-gray-300 mb-2">Support</h4>
              <ul className="space-y-1">
                <li><a href="#" className="text-gray-400 hover:text-white text-sm">Help Center</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white text-sm">Contact Us</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white text-sm">FAQs</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white text-sm">Feedback</a></li>
              </ul>
            </div>

            <div>
              <h4 className="text-sm font-medium text-gray-300 mb-2">Legal</h4>
              <ul className="space-y-1">
                <li><a href="#" className="text-gray-400 hover:text-white text-sm">Privacy Policy</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white text-sm">Terms of Service</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white text-sm">Data Protection</a></li>
              </ul>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-700 mt-6 pt-6 text-center text-sm text-gray-400">
          <p>© {new Date().getFullYear()} Tourist Safety System. All rights reserved.</p>
          <p className="mt-2">
            {isTouristRoute
              ? 'Designed for tourists to ensure safe and enjoyable travel experiences.'
              : 'Developed for authorities to monitor and enhance tourist safety.'}
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;