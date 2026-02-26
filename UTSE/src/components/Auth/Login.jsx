import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Shield, User, Lock, Globe, AlertCircle, ArrowRight, Eye, EyeOff } from 'lucide-react'
import { useAuth } from './AuthContext'
import { motion, AnimatePresence } from 'framer-motion'
import axios from 'axios'

/* ─── floating particle ─── */
const Particle = ({ x, y, size, delay, duration }) => (
  <motion.div
    className="absolute rounded-full"
    style={{
      width: size,
      height: size,
      background: 'radial-gradient(circle, rgba(255,255,255,0.2) 0%, transparent 70%)',
      left: `${x}%`,
      top: `${y}%`,
    }}
    animate={{
      opacity: [0, 0.6, 0],
      scale: [0, 1.3, 0],
      y: [0, -100, -200],
    }}
    transition={{ duration, delay, repeat: Infinity, ease: 'easeInOut' }}
  />
)

const particles = [
  { x: 8, y: 75, size: 5, delay: 0, duration: 4.5 },
  { x: 22, y: 85, size: 7, delay: 1, duration: 5 },
  { x: 45, y: 70, size: 4, delay: 0.5, duration: 3.8 },
  { x: 65, y: 80, size: 6, delay: 1.5, duration: 4.2 },
  { x: 80, y: 65, size: 5, delay: 0.8, duration: 5.2 },
  { x: 92, y: 78, size: 8, delay: 2, duration: 4 },
  { x: 35, y: 25, size: 4, delay: 0.3, duration: 3.5 },
  { x: 75, y: 35, size: 6, delay: 1.2, duration: 4.8 },
]

const Login = () => {
  const [userType, setUserType] = useState('tourist')
  const [formData, setFormData] = useState({ email: '', password: '' })
  const [error, setError] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const { login } = useAuth()
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')

    if (!formData.email || !formData.password) {
      setError("Please enter both email and password.")
      return
    }

    try {
      const response = await axios.post('/api/v1/auth/login', {
        email: formData.email,
        password: formData.password
      })

      if (response.data.success) {
        const userData = response.data.data.user

        if (userData.role !== userType) {
          setError(`You are registered as an '${userData.role}'. Please switch to the correct tab to log in.`)
          return
        }

        login(userData)
        navigate(`/${userData.role}/dashboard`)
      }
    } catch (err) {
      const errorMessage = err.response?.data?.message || "Login failed. Please check your credentials."
      setError(errorMessage)
    }
  }

  return (
    <div
      className="min-h-screen relative overflow-hidden flex items-center justify-center p-4"
      style={{
        background: 'linear-gradient(135deg, #0f0c29 0%, #1a1a4e 25%, #302b63 50%, #24243e 75%, #0f0c29 100%)',
      }}
    >
      {/* ─── Animated Gradient Blobs ─── */}
      <motion.div
        className="absolute w-[500px] h-[500px] rounded-full opacity-20"
        style={{
          background: 'radial-gradient(circle, #6366f1, transparent 70%)',
          top: '-15%',
          left: '-10%',
          filter: 'blur(80px)',
        }}
        animate={{ x: [0, 50, 0], y: [0, 30, 0] }}
        transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
      />
      <motion.div
        className="absolute w-[400px] h-[400px] rounded-full opacity-20"
        style={{
          background: 'radial-gradient(circle, #06b6d4, transparent 70%)',
          bottom: '-15%',
          right: '-10%',
          filter: 'blur(80px)',
        }}
        animate={{ x: [0, -40, 0], y: [0, -25, 0] }}
        transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut' }}
      />
      <motion.div
        className="absolute w-[350px] h-[350px] rounded-full opacity-15"
        style={{
          background: 'radial-gradient(circle, #a855f7, transparent 70%)',
          top: '50%',
          left: '60%',
          filter: 'blur(60px)',
        }}
        animate={{ x: [0, 30, -30, 0], y: [0, -40, 20, 0] }}
        transition={{ duration: 12, repeat: Infinity, ease: 'easeInOut' }}
      />

      {/* ─── Particles ─── */}
      {particles.map((p, i) => (
        <Particle key={i} {...p} />
      ))}

      {/* ─── Main Card ─── */}
      <motion.div
        initial={{ opacity: 0, y: 40, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        className="relative z-10 max-w-md w-full"
      >
        {/* ─── Header ─── */}
        <div className="text-center mb-8">
          <motion.div
            initial={{ scale: 0, rotate: -180 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
            className="inline-flex items-center justify-center mb-5"
          >
            <div
              className="h-20 w-20 rounded-2xl flex items-center justify-center"
              style={{
                background: 'linear-gradient(135deg, #6366f1 0%, #8b5cf6 50%, #06b6d4 100%)',
                boxShadow: '0 0 40px rgba(99, 102, 241, 0.4), 0 0 80px rgba(99, 102, 241, 0.15)',
              }}
            >
              <Shield className="h-10 w-10 text-white" strokeWidth={1.5} />
            </div>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.6 }}
            className="text-3xl font-bold text-white mb-1"
            style={{ textShadow: '0 0 30px rgba(99, 102, 241, 0.4)' }}
          >
            Welcome Back
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.6 }}
            className="text-sm tracking-[0.2em] uppercase"
            style={{ color: 'rgba(199, 210, 254, 0.6)' }}
          >
            Tourist Safety System
          </motion.p>
        </div>

        {/* ─── Glass Form Card ─── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.6 }}
          className="rounded-3xl p-8"
          style={{
            background: 'rgba(255, 255, 255, 0.06)',
            backdropFilter: 'blur(24px)',
            WebkitBackdropFilter: 'blur(24px)',
            border: '1px solid rgba(255, 255, 255, 0.1)',
            boxShadow: '0 8px 32px rgba(0, 0, 0, 0.3), inset 0 1px 0 rgba(255, 255, 255, 0.08)',
          }}
        >
          {/* ─── Tab Switcher ─── */}
          <div
            className="flex mb-7 rounded-xl p-1 relative"
            style={{ background: 'rgba(255, 255, 255, 0.06)', border: '1px solid rgba(255, 255, 255, 0.08)' }}
          >
            <motion.div
              className="absolute top-1 bottom-1 rounded-lg"
              style={{
                width: 'calc(50% - 4px)',
                background: 'linear-gradient(135deg, rgba(99, 102, 241, 0.3), rgba(6, 182, 212, 0.3))',
                border: '1px solid rgba(99, 102, 241, 0.3)',
                boxShadow: '0 0 20px rgba(99, 102, 241, 0.15)',
              }}
              animate={{ x: userType === 'tourist' ? 0 : '100%' }}
              transition={{ type: 'spring', stiffness: 300, damping: 30 }}
            />
            <button
              onClick={() => setUserType('tourist')}
              className="flex-1 py-3 px-4 rounded-lg transition-all font-medium relative z-10 flex items-center justify-center gap-2"
              style={{ color: userType === 'tourist' ? '#c7d2fe' : 'rgba(199, 210, 254, 0.4)' }}
            >
              <Globe className="h-4 w-4" />
              Tourist
            </button>
            <button
              onClick={() => setUserType('authority')}
              className="flex-1 py-3 px-4 rounded-lg transition-all font-medium relative z-10 flex items-center justify-center gap-2"
              style={{ color: userType === 'authority' ? '#c7d2fe' : 'rgba(199, 210, 254, 0.4)' }}
            >
              <Shield className="h-4 w-4" />
              Authority
            </button>
          </div>

          {/* ─── Error Alert ─── */}
          <AnimatePresence>
            {error && (
              <motion.div
                initial={{ opacity: 0, y: -10, height: 0 }}
                animate={{ opacity: 1, y: 0, height: 'auto' }}
                exit={{ opacity: 0, y: -10, height: 0 }}
                className="mb-5 p-3 rounded-xl flex items-center gap-2 text-sm"
                style={{
                  background: 'rgba(239, 68, 68, 0.15)',
                  border: '1px solid rgba(239, 68, 68, 0.3)',
                  color: '#fca5a5',
                }}
              >
                <AlertCircle className="h-4 w-4 flex-shrink-0" />
                {error}
              </motion.div>
            )}
          </AnimatePresence>

          {/* ─── Form ─── */}
          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-xs font-medium uppercase tracking-wider mb-2" style={{ color: 'rgba(199, 210, 254, 0.6)' }}>
                Email Address
              </label>
              <div className="relative">
                <User className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4" style={{ color: 'rgba(199, 210, 254, 0.4)' }} />
                <input
                  type="email"
                  required
                  className="w-full pl-11 pr-4 py-3.5 rounded-xl text-white placeholder-gray-500 outline-none transition-all duration-300"
                  style={{
                    background: 'rgba(255, 255, 255, 0.05)',
                    border: '1px solid rgba(255, 255, 255, 0.1)',
                    fontSize: '0.95rem',
                  }}
                  onFocus={(e) => {
                    e.target.style.borderColor = 'rgba(99, 102, 241, 0.5)'
                    e.target.style.boxShadow = '0 0 20px rgba(99, 102, 241, 0.15)'
                  }}
                  onBlur={(e) => {
                    e.target.style.borderColor = 'rgba(255, 255, 255, 0.1)'
                    e.target.style.boxShadow = 'none'
                  }}
                  placeholder="Enter your email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-medium uppercase tracking-wider mb-2" style={{ color: 'rgba(199, 210, 254, 0.6)' }}>
                Password
              </label>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4" style={{ color: 'rgba(199, 210, 254, 0.4)' }} />
                <input
                  type={showPassword ? 'text' : 'password'}
                  required
                  className="w-full pl-11 pr-12 py-3.5 rounded-xl text-white placeholder-gray-500 outline-none transition-all duration-300"
                  style={{
                    background: 'rgba(255, 255, 255, 0.05)',
                    border: '1px solid rgba(255, 255, 255, 0.1)',
                    fontSize: '0.95rem',
                  }}
                  onFocus={(e) => {
                    e.target.style.borderColor = 'rgba(99, 102, 241, 0.5)'
                    e.target.style.boxShadow = '0 0 20px rgba(99, 102, 241, 0.15)'
                  }}
                  onBlur={(e) => {
                    e.target.style.borderColor = 'rgba(255, 255, 255, 0.1)'
                    e.target.style.boxShadow = 'none'
                  }}
                  placeholder="Enter your password"
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 transition-colors"
                  style={{ color: 'rgba(199, 210, 254, 0.4)' }}
                >
                  {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>
            </div>

            <motion.button
              type="submit"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="w-full py-4 rounded-xl font-semibold text-white flex items-center justify-center gap-2 transition-all duration-300 mt-2"
              style={{
                background: 'linear-gradient(135deg, #6366f1 0%, #8b5cf6 50%, #06b6d4 100%)',
                boxShadow: '0 4px 20px rgba(99, 102, 241, 0.4)',
                fontSize: '1rem',
              }}
              onMouseEnter={(e) => e.target.style.boxShadow = '0 6px 30px rgba(99, 102, 241, 0.6)'}
              onMouseLeave={(e) => e.target.style.boxShadow = '0 4px 20px rgba(99, 102, 241, 0.4)'}
            >
              Login as {userType === 'tourist' ? 'Tourist' : 'Authority'}
              <ArrowRight className="h-4 w-4" />
            </motion.button>
          </form>

          {/* ─── Divider ─── */}
          <div className="flex items-center gap-4 my-6">
            <div className="flex-1 h-px" style={{ background: 'rgba(255, 255, 255, 0.08)' }} />
            <span className="text-[11px] uppercase tracking-widest" style={{ color: 'rgba(199, 210, 254, 0.3)' }}>
              or
            </span>
            <div className="flex-1 h-px" style={{ background: 'rgba(255, 255, 255, 0.08)' }} />
          </div>

          {/* ─── SignUp Link ─── */}
          <div className="text-center">
            <p className="text-sm" style={{ color: 'rgba(199, 210, 254, 0.5)' }}>
              Don't have an account?{' '}
              <Link
                to="/signup"
                className="font-semibold transition-colors hover:underline"
                style={{ color: '#818cf8' }}
              >
                Sign Up Now
              </Link>
            </p>
          </div>
        </motion.div>
      </motion.div>
    </div>
  )
}

export default Login