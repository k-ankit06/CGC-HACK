import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Shield, Globe, AlertCircle, ArrowRight, User, Mail, Phone, MapPin, Hash, CreditCard, Briefcase, Lock, Eye, EyeOff, ChevronDown } from 'lucide-react'
import { useAuth } from './AuthContext'
import { motion, AnimatePresence } from 'framer-motion'

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
  { x: 5, y: 80, size: 5, delay: 0, duration: 4.5 },
  { x: 20, y: 90, size: 7, delay: 1, duration: 5 },
  { x: 50, y: 75, size: 4, delay: 0.5, duration: 3.8 },
  { x: 70, y: 85, size: 6, delay: 1.5, duration: 4.2 },
  { x: 88, y: 70, size: 5, delay: 0.8, duration: 5.2 },
  { x: 95, y: 82, size: 8, delay: 2, duration: 4 },
  { x: 30, y: 20, size: 4, delay: 0.3, duration: 3.5 },
  { x: 78, y: 30, size: 6, delay: 1.2, duration: 4.8 },
]

/* ─── shared glass input style ─── */
const glassInputStyle = {
  background: 'rgba(255, 255, 255, 0.05)',
  border: '1px solid rgba(255, 255, 255, 0.1)',
  fontSize: '0.95rem',
}

const GlassInput = ({ icon: Icon, label, ...props }) => (
  <div>
    <label className="block text-xs font-medium uppercase tracking-wider mb-2" style={{ color: 'rgba(199, 210, 254, 0.6)' }}>
      {label}
    </label>
    <div className="relative">
      {Icon && <Icon className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4" style={{ color: 'rgba(199, 210, 254, 0.4)' }} />}
      <input
        className={`w-full ${Icon ? 'pl-11' : 'pl-4'} pr-4 py-3.5 rounded-xl text-white placeholder-gray-500 outline-none transition-all duration-300`}
        style={glassInputStyle}
        onFocus={(e) => {
          e.target.style.borderColor = 'rgba(99, 102, 241, 0.5)'
          e.target.style.boxShadow = '0 0 20px rgba(99, 102, 241, 0.15)'
        }}
        onBlur={(e) => {
          e.target.style.borderColor = 'rgba(255, 255, 255, 0.1)'
          e.target.style.boxShadow = 'none'
        }}
        {...props}
      />
    </div>
  </div>
)

const SignUp = () => {
  const [userType, setUserType] = useState('tourist')
  const [touristType, setTouristType] = useState('international')
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
    country: '',
    passportNumber: '',
    aadhaarNumber: '',
    emergencyContact: '',
    departmentId: '',
    designation: ''
  })
  const [error, setError] = useState('')
  const { login } = useAuth()
  const navigate = useNavigate()

  const handleSubmit = (e) => {
    e.preventDefault()
    setError('')

    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match')
      return
    }

    if (formData.password.length < 6) {
      setError('Password must be at least 6 characters')
      return
    }

    const userData = {
      id: Date.now(),
      ...formData,
      role: userType,
      touristType: userType === 'tourist' ? touristType : null,
      isRegistered: false
    }

    login(userData)
    navigate(`/${userType}/dashboard`)
  }

  const update = (key, val) => setFormData({ ...formData, [key]: val })

  return (
    <div
      className="min-h-screen relative overflow-hidden flex items-center justify-center p-4 py-8"
      style={{
        background: 'linear-gradient(135deg, #0f0c29 0%, #1a1a4e 25%, #302b63 50%, #24243e 75%, #0f0c29 100%)',
      }}
    >
      {/* ─── Animated Gradient Blobs ─── */}
      <motion.div
        className="absolute w-[500px] h-[500px] rounded-full opacity-20"
        style={{
          background: 'radial-gradient(circle, #6366f1, transparent 70%)',
          top: '-10%',
          right: '-10%',
          filter: 'blur(80px)',
        }}
        animate={{ x: [0, -50, 0], y: [0, 40, 0] }}
        transition={{ duration: 9, repeat: Infinity, ease: 'easeInOut' }}
      />
      <motion.div
        className="absolute w-[450px] h-[450px] rounded-full opacity-20"
        style={{
          background: 'radial-gradient(circle, #06b6d4, transparent 70%)',
          bottom: '-10%',
          left: '-10%',
          filter: 'blur(80px)',
        }}
        animate={{ x: [0, 40, 0], y: [0, -30, 0] }}
        transition={{ duration: 11, repeat: Infinity, ease: 'easeInOut' }}
      />
      <motion.div
        className="absolute w-[300px] h-[300px] rounded-full opacity-15"
        style={{
          background: 'radial-gradient(circle, #a855f7, transparent 70%)',
          top: '30%',
          left: '50%',
          filter: 'blur(60px)',
        }}
        animate={{ x: [0, 30, -30, 0], y: [0, -40, 20, 0] }}
        transition={{ duration: 13, repeat: Infinity, ease: 'easeInOut' }}
      />

      {/* ─── Particles ─── */}
      {particles.map((p, i) => (
        <Particle key={i} {...p} />
      ))}

      {/* ─── Main Content ─── */}
      <motion.div
        initial={{ opacity: 0, y: 40, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        className="relative z-10 max-w-2xl w-full"
      >
        {/* ─── Header ─── */}
        <div className="text-center mb-8">
          <motion.div
            initial={{ scale: 0, rotate: -180 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
            className="inline-flex items-center justify-center mb-4"
          >
            <div
              className="h-16 w-16 rounded-2xl flex items-center justify-center"
              style={{
                background: 'linear-gradient(135deg, #6366f1 0%, #8b5cf6 50%, #06b6d4 100%)',
                boxShadow: '0 0 40px rgba(99, 102, 241, 0.4), 0 0 80px rgba(99, 102, 241, 0.15)',
              }}
            >
              <Shield className="h-8 w-8 text-white" strokeWidth={1.5} />
            </div>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="text-3xl font-bold mb-1"
          >
            <span className="text-white" style={{ textShadow: '0 0 30px rgba(99, 102, 241, 0.4)' }}>
              Create{' '}
            </span>
            <span
              style={{
                background: 'linear-gradient(90deg, #818cf8, #06b6d4, #a78bfa)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
              }}
            >
              Account
            </span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.6 }}
            className="text-sm tracking-[0.2em] uppercase"
            style={{ color: 'rgba(199, 210, 254, 0.5)' }}
          >
            Join the Tourist Safety System
          </motion.p>
        </div>

        {/* ─── Glass Form Card ─── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.6 }}
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
            {/* Common Fields */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <GlassInput
                icon={User}
                label="Full Name"
                type="text"
                required
                placeholder="Enter your full name"
                value={formData.name}
                onChange={(e) => update('name', e.target.value)}
              />
              <GlassInput
                icon={Mail}
                label="Email Address"
                type="email"
                required
                placeholder="Enter your email"
                value={formData.email}
                onChange={(e) => update('email', e.target.value)}
              />
              <GlassInput
                icon={Phone}
                label="Phone Number"
                type="tel"
                required
                placeholder="Enter phone number"
                value={formData.phone}
                onChange={(e) => update('phone', e.target.value)}
              />

              {/* Tourist-specific Fields */}
              <AnimatePresence mode="wait">
                {userType === 'tourist' && (
                  <motion.div
                    key="tourist-country"
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 10 }}
                    transition={{ duration: 0.3 }}
                  >
                    <GlassInput
                      icon={MapPin}
                      label="Country"
                      type="text"
                      required
                      placeholder="Enter your country"
                      value={formData.country}
                      onChange={(e) => update('country', e.target.value)}
                    />
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Authority-specific Fields */}
              <AnimatePresence mode="wait">
                {userType === 'authority' && (
                  <>
                    <motion.div
                      key="auth-dept"
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: 10 }}
                      transition={{ duration: 0.3 }}
                    >
                      <GlassInput
                        icon={Hash}
                        label="Department ID"
                        type="text"
                        required
                        placeholder="Enter department ID"
                        value={formData.departmentId}
                        onChange={(e) => update('departmentId', e.target.value)}
                      />
                    </motion.div>
                    <motion.div
                      key="auth-desig"
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: 10 }}
                      transition={{ duration: 0.3, delay: 0.1 }}
                    >
                      <GlassInput
                        icon={Briefcase}
                        label="Designation"
                        type="text"
                        required
                        placeholder="Enter designation"
                        value={formData.designation}
                        onChange={(e) => update('designation', e.target.value)}
                      />
                    </motion.div>
                  </>
                )}
              </AnimatePresence>
            </div>

            {/* Tourist Type Selector */}
            <AnimatePresence mode="wait">
              {userType === 'tourist' && (
                <motion.div
                  key="tourist-type-radio"
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <label className="block text-xs font-medium uppercase tracking-wider mb-3" style={{ color: 'rgba(199, 210, 254, 0.6)' }}>
                    Tourist Type
                  </label>
                  <div className="flex gap-3">
                    {[
                      { value: 'international', label: '🌍 International' },
                      { value: 'domestic', label: '🏠 Domestic' },
                    ].map(({ value, label }) => (
                      <button
                        key={value}
                        type="button"
                        onClick={() => setTouristType(value)}
                        className="flex-1 py-3 rounded-xl font-medium transition-all duration-300 text-sm"
                        style={{
                          background: touristType === value
                            ? 'linear-gradient(135deg, rgba(99, 102, 241, 0.25), rgba(6, 182, 212, 0.25))'
                            : 'rgba(255, 255, 255, 0.04)',
                          border: touristType === value
                            ? '1px solid rgba(99, 102, 241, 0.4)'
                            : '1px solid rgba(255, 255, 255, 0.08)',
                          color: touristType === value ? '#c7d2fe' : 'rgba(199, 210, 254, 0.4)',
                          boxShadow: touristType === value ? '0 0 15px rgba(99, 102, 241, 0.15)' : 'none',
                        }}
                      >
                        {label}
                      </button>
                    ))}
                  </div>

                  {/* Passport / Aadhaar */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mt-5">
                    {touristType === 'international' ? (
                      <GlassInput
                        icon={CreditCard}
                        label="Passport Number"
                        type="text"
                        required
                        placeholder="Enter passport number"
                        value={formData.passportNumber}
                        onChange={(e) => update('passportNumber', e.target.value)}
                      />
                    ) : (
                      <GlassInput
                        icon={CreditCard}
                        label="Aadhaar Number"
                        type="text"
                        required
                        maxLength={12}
                        pattern="\d{12}"
                        title="Aadhaar number must be 12 digits"
                        placeholder="Enter 12-digit Aadhaar"
                        value={formData.aadhaarNumber}
                        onChange={(e) => update('aadhaarNumber', e.target.value)}
                      />
                    )}
                    <GlassInput
                      icon={Phone}
                      label="Emergency Contact"
                      type="tel"
                      required
                      placeholder="Emergency phone number"
                      value={formData.emergencyContact}
                      onChange={(e) => update('emergencyContact', e.target.value)}
                    />
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Password Fields */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
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
                    style={glassInputStyle}
                    onFocus={(e) => {
                      e.target.style.borderColor = 'rgba(99, 102, 241, 0.5)'
                      e.target.style.boxShadow = '0 0 20px rgba(99, 102, 241, 0.15)'
                    }}
                    onBlur={(e) => {
                      e.target.style.borderColor = 'rgba(255, 255, 255, 0.1)'
                      e.target.style.boxShadow = 'none'
                    }}
                    placeholder="Create password"
                    value={formData.password}
                    onChange={(e) => update('password', e.target.value)}
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

              <div>
                <label className="block text-xs font-medium uppercase tracking-wider mb-2" style={{ color: 'rgba(199, 210, 254, 0.6)' }}>
                  Confirm Password
                </label>
                <div className="relative">
                  <Lock className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4" style={{ color: 'rgba(199, 210, 254, 0.4)' }} />
                  <input
                    type={showConfirmPassword ? 'text' : 'password'}
                    required
                    className="w-full pl-11 pr-12 py-3.5 rounded-xl text-white placeholder-gray-500 outline-none transition-all duration-300"
                    style={glassInputStyle}
                    onFocus={(e) => {
                      e.target.style.borderColor = 'rgba(99, 102, 241, 0.5)'
                      e.target.style.boxShadow = '0 0 20px rgba(99, 102, 241, 0.15)'
                    }}
                    onBlur={(e) => {
                      e.target.style.borderColor = 'rgba(255, 255, 255, 0.1)'
                      e.target.style.boxShadow = 'none'
                    }}
                    placeholder="Confirm password"
                    value={formData.confirmPassword}
                    onChange={(e) => update('confirmPassword', e.target.value)}
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 transition-colors"
                    style={{ color: 'rgba(199, 210, 254, 0.4)' }}
                  >
                    {showConfirmPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </button>
                </div>
              </div>
            </div>

            {/* Submit */}
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
              Create {userType === 'tourist' ? 'Tourist' : 'Authority'} Account
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

          {/* ─── Login Link ─── */}
          <div className="text-center">
            <p className="text-sm" style={{ color: 'rgba(199, 210, 254, 0.5)' }}>
              Already have an account?{' '}
              <Link
                to="/login"
                className="font-semibold transition-colors hover:underline"
                style={{ color: '#818cf8' }}
              >
                Login
              </Link>
            </p>
          </div>
        </motion.div>
      </motion.div>
    </div>
  )
}

export default SignUp