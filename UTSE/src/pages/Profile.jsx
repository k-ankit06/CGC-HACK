import { useState } from 'react';
import { useAuth } from '../components/Auth/AuthContext';
import { User, Phone, Save, AlertCircle, Briefcase } from 'lucide-react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

const Profile = () => {
  const { user, updateUser } = useAuth();
  const navigate = useNavigate();
  
  
  const isAuthority = user?.role === 'authority';

  const [formData, setFormData] = useState({
    name: user?.name || '',
    phone: user?.phone || '',
    
    emergencyContactName: isAuthority ? '' : (user?.emergencyContactName || ''),
    emergencyContactPhone: isAuthority ? '' : (user?.emergencyContactPhone || ''),
   
    designation: isAuthority ? (user?.designation || '') : '',
  });

  const [message, setMessage] = useState('');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
   
    updateUser(formData);

    setMessage('Profile updated successfully!');
    setTimeout(() => {
        setMessage('');
        
        navigate(`/${user.role}/dashboard`);
    }, 2000);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="max-w-4xl mx-auto">
        <h2 className="text-3xl font-bold text-gray-900 mb-6">Edit Profile</h2>

        {message && (
            <div className="mb-4 p-4 bg-success-100 border border-success-200 rounded-lg flex items-center text-success-700">
                <AlertCircle className="h-5 w-5 mr-2" />
                {message}
            </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-8">
          <div className="card">
            <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
              <User className="h-5 w-5 mr-2 text-primary-600" />
              Personal Details
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Full Name</label>
                <input type="text" name="name" className="input-field" value={formData.name} onChange={handleChange} />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Phone Number</label>
                <input type="tel" name="phone" className="input-field" value={formData.phone} onChange={handleChange} />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Email (Cannot be changed)</label>
                <input type="email" name="email" className="input-field bg-gray-100 cursor-not-allowed" value={user?.email || ''} readOnly />
              </div>
              
              
              {isAuthority && (
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Designation</label>
                  <input type="text" name="designation" className="input-field" value={formData.designation} onChange={handleChange} />
                </div>
              )}
            </div>
          </div>

          
          {!isAuthority && (
            <div className="card">
              <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
                <Phone className="h-5 w-5 mr-2 text-danger-600" />
                Emergency Contact
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Contact Name</label>
                  <input type="text" name="emergencyContactName" className="input-field" value={formData.emergencyContactName} onChange={handleChange} />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Contact Phone</label>
                  <input type="tel" name="emergencyContactPhone" className="input-field" value={formData.emergencyContactPhone} onChange={handleChange} />
                </div>
              </div>
            </div>
          )}
          
          <div className="flex justify-end">
            <button type="submit" className="btn-primary">
              <Save className="h-4 w-4 mr-2" />
              Save Changes
            </button>
          </div>
        </form>
      </div>
    </motion.div>
  );
};

export default Profile;