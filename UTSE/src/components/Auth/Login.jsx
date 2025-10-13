import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Shield, User, Lock, Globe, AlertCircle } from 'lucide-react'
import { useAuth } from './AuthContext'

const Login = () => {
  const [userType, setUserType] = useState('tourist')
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  })
  const [error, setError] = useState('')
  const { login } = useAuth()
  const navigate = useNavigate()

  const handleSubmit = (e) => {
    e.preventDefault()
    setError('')

  
    if (formData.email && formData.password) {
      const userData = {
        id: Date.now(),
        email: formData.email,
        role: userType,
        name: userType === 'authority' ? 'Admin Officer' : 'Tourist User',
        isRegistered: userType === 'tourist' ? false : true
      }
      login(userData)
      navigate(`/${userType}/dashboard`)
    } else {
      setError('Please enter valid credentials')
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-600 via-primary-700 to-primary-900 flex items-center justify-center p-4">
      <div className="max-w-md w-full">
        <div className="text-center mb-8">
          <div className="inline-block p-4 bg-white rounded-full mb-4">
            <Shield className="h-16 w-16 text-primary-600" />
          </div>
          <h1 className="text-4xl font-bold text-white mb-2">Tourist Safety System</h1>
          <p className="text-primary-100">Protecting tourists, ensuring safety</p>
        </div>

        <div className="bg-white rounded-2xl shadow-2xl p-8">
    
          <div className="flex mb-6 bg-gray-100 rounded-xl p-1">
            <button
              onClick={() => setUserType('tourist')}
              className={`flex-1 py-3 px-4 rounded-lg transition-all font-medium ${
                userType === 'tourist' 
                  ? 'bg-white shadow-md text-primary-600' 
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              <Globe className="inline h-5 w-5 mr-2" />
              Tourist
            </button>
            <button
              onClick={() => setUserType('authority')}
              className={`flex-1 py-3 px-4 rounded-lg transition-all font-medium ${
                userType === 'authority' 
                  ? 'bg-white shadow-md text-primary-600' 
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              <Shield className="inline h-5 w-5 mr-2" />
              Authority
            </button>
          </div>

          {error && (
            <div className="mb-4 p-3 bg-danger-50 border border-danger-200 rounded-lg flex items-center text-danger-700">
              <AlertCircle className="h-5 w-5 mr-2" />
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Email Address
              </label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                <input
                  type="email"
                  required
                  className="input-field pl-10"
                  placeholder="Enter your email"
                  value={formData.email}
                  onChange={(e) => setFormData({...formData, email: e.target.value})}
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Password
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                <input
                  type="password"
                  required
                  className="input-field pl-10"
                  placeholder="Enter your password"
                  value={formData.password}
                  onChange={(e) => setFormData({...formData, password: e.target.value})}
                />
              </div>
            </div>

            <button
              type="submit"
              className="w-full bg-primary-600 text-white py-3 rounded-lg hover:bg-primary-700 transition-colors font-semibold text-lg shadow-lg hover:shadow-xl"
            >
              Login as {userType === 'tourist' ? 'Tourist' : 'Authority'}
            </button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-gray-600">
              Don't have an account?{' '}
              <Link to="/signup" className="text-primary-600 hover:text-primary-700 font-semibold">
                Sign Up Now
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Login