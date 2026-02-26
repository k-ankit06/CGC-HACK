import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { Shield, MapPin, AlertTriangle, Phone } from 'lucide-react'

/* ─── floating particle component ─── */
const FloatingParticle = ({ delay, duration, x, y, size }) => (
  <motion.div
    className="absolute rounded-full"
    style={{
      width: size,
      height: size,
      background: 'radial-gradient(circle, rgba(255,255,255,0.25) 0%, transparent 70%)',
      left: `${x}%`,
      top: `${y}%`,
    }}
    initial={{ opacity: 0, scale: 0 }}
    animate={{
      opacity: [0, 0.8, 0],
      scale: [0, 1.2, 0],
      y: [0, -80, -160],
    }}
    transition={{
      duration,
      delay,
      repeat: Infinity,
      ease: 'easeInOut',
    }}
  />
)

/* ─── orbiting dot ─── */
const OrbitDot = ({ radius, duration, delay, color }) => (
  <motion.div
    className="absolute"
    style={{
      width: radius * 2,
      height: radius * 2,
      left: '50%',
      top: '50%',
      marginLeft: -radius,
      marginTop: -radius,
    }}
    animate={{ rotate: 360 }}
    transition={{ duration, delay, repeat: Infinity, ease: 'linear' }}
  >
    <div
      className="absolute rounded-full"
      style={{
        width: 8,
        height: 8,
        background: color,
        boxShadow: `0 0 12px ${color}`,
        top: 0,
        left: '50%',
        marginLeft: -4,
      }}
    />
  </motion.div>
)

/* ─── particles config ─── */
const particles = [
  { delay: 0, duration: 4, x: 10, y: 70, size: 6 },
  { delay: 0.5, duration: 5, x: 25, y: 80, size: 8 },
  { delay: 1, duration: 3.5, x: 40, y: 60, size: 5 },
  { delay: 1.5, duration: 4.5, x: 55, y: 75, size: 7 },
  { delay: 0.3, duration: 5.5, x: 70, y: 65, size: 6 },
  { delay: 2, duration: 4, x: 85, y: 85, size: 9 },
  { delay: 0.8, duration: 3, x: 15, y: 40, size: 5 },
  { delay: 1.2, duration: 4.2, x: 60, y: 30, size: 7 },
  { delay: 0.6, duration: 5, x: 80, y: 45, size: 6 },
  { delay: 1.8, duration: 3.8, x: 35, y: 90, size: 8 },
  { delay: 2.2, duration: 4.6, x: 50, y: 20, size: 5 },
  { delay: 0.9, duration: 3.2, x: 90, y: 55, size: 7 },
]

const SplashScreen = () => {
  const navigate = useNavigate()
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    /* progress bar animation */
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval)
          return 100
        }
        return prev + 1.5
      })
    }, 40)

    const timer = setTimeout(() => {
      sessionStorage.setItem('splashShown', 'true')
      navigate('/login')
    }, 3500)

    return () => {
      clearTimeout(timer)
      clearInterval(interval)
    }
  }, [navigate])

  if (sessionStorage.getItem('splashShown')) {
    navigate('/login')
    return null
  }

  return (
    <div
      className="min-h-screen relative overflow-hidden flex flex-col items-center justify-center"
      style={{
        background:
          'linear-gradient(135deg, #0f0c29 0%, #1a1a4e 25%, #302b63 50%, #24243e 75%, #0f0c29 100%)',
      }}
    >
      {/* ─── Animated Mesh Gradient Blobs ─── */}
      <motion.div
        className="absolute w-[500px] h-[500px] rounded-full opacity-20"
        style={{
          background: 'radial-gradient(circle, #6366f1, transparent 70%)',
          top: '-10%',
          left: '-10%',
          filter: 'blur(80px)',
        }}
        animate={{ x: [0, 60, 0], y: [0, 40, 0] }}
        transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
      />
      <motion.div
        className="absolute w-[400px] h-[400px] rounded-full opacity-20"
        style={{
          background: 'radial-gradient(circle, #06b6d4, transparent 70%)',
          bottom: '-10%',
          right: '-10%',
          filter: 'blur(80px)',
        }}
        animate={{ x: [0, -50, 0], y: [0, -30, 0] }}
        transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut' }}
      />
      <motion.div
        className="absolute w-[300px] h-[300px] rounded-full opacity-15"
        style={{
          background: 'radial-gradient(circle, #a855f7, transparent 70%)',
          top: '40%',
          right: '20%',
          filter: 'blur(60px)',
        }}
        animate={{ x: [0, 30, -30, 0], y: [0, -40, 20, 0] }}
        transition={{ duration: 12, repeat: Infinity, ease: 'easeInOut' }}
      />

      {/* ─── Floating Particles ─── */}
      {particles.map((p, i) => (
        <FloatingParticle key={i} {...p} />
      ))}

      {/* ─── Main Content Card (Glassmorphism) ─── */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className="relative z-10 flex flex-col items-center px-12 py-14 rounded-3xl"
        style={{
          background: 'rgba(255, 255, 255, 0.06)',
          backdropFilter: 'blur(24px)',
          WebkitBackdropFilter: 'blur(24px)',
          border: '1px solid rgba(255, 255, 255, 0.12)',
          boxShadow:
            '0 8px 32px rgba(0, 0, 0, 0.3), inset 0 1px 0 rgba(255, 255, 255, 0.1)',
        }}
      >
        {/* ─── Icon with Pulsing Rings + Orbiting Dots ─── */}
        <div className="relative mb-8" style={{ width: 160, height: 160 }}>
          {/* Pulse rings */}
          {[1, 2, 3].map((ring) => (
            <motion.div
              key={ring}
              className="absolute rounded-full"
              style={{
                border: '1px solid rgba(99, 102, 241, 0.3)',
                inset: -ring * 12,
              }}
              animate={{ scale: [1, 1.15, 1], opacity: [0.4, 0.1, 0.4] }}
              transition={{
                duration: 2.5,
                delay: ring * 0.4,
                repeat: Infinity,
                ease: 'easeInOut',
              }}
            />
          ))}

          {/* Orbiting dots */}
          <OrbitDot radius={90} duration={6} delay={0} color="#818cf8" />
          <OrbitDot radius={100} duration={8} delay={1} color="#06b6d4" />
          <OrbitDot radius={80} duration={10} delay={2} color="#a78bfa" />

          {/* Icon container */}
          <motion.div
            initial={{ scale: 0, rotate: -180 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
            className="absolute inset-0 flex items-center justify-center"
          >
            <div
              className="h-28 w-28 rounded-2xl flex items-center justify-center"
              style={{
                background:
                  'linear-gradient(135deg, #6366f1 0%, #8b5cf6 50%, #06b6d4 100%)',
                boxShadow:
                  '0 0 40px rgba(99, 102, 241, 0.5), 0 0 80px rgba(99, 102, 241, 0.2)',
              }}
            >
              <Shield className="h-14 w-14 text-white" strokeWidth={1.5} />
            </div>
          </motion.div>
        </div>

        {/* ─── Title with letter-by-letter reveal ─── */}
        <motion.div className="mb-3 overflow-hidden">
          <motion.h1
            initial={{ y: 60, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.6, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="text-4xl sm:text-5xl font-bold text-center text-white"
            style={{
              letterSpacing: '0.02em',
              textShadow: '0 0 40px rgba(99, 102, 241, 0.5)',
            }}
          >
            Tourist Safety
          </motion.h1>
        </motion.div>
        <motion.div className="mb-5 overflow-hidden">
          <motion.h1
            initial={{ y: 60, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.8, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="text-4xl sm:text-5xl font-bold text-center"
            style={{
              background: 'linear-gradient(90deg, #818cf8, #06b6d4, #a78bfa)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              letterSpacing: '0.02em',
            }}
          >
            System
          </motion.h1>
        </motion.div>

        {/* ─── Subtitle ─── */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.2, duration: 0.8 }}
          className="text-sm sm:text-base tracking-[0.3em] uppercase font-medium mb-8"
          style={{ color: 'rgba(199, 210, 254, 0.8)' }}
        >
          Your Safety Companion in India
        </motion.p>

        {/* ─── Feature Icons Row ─── */}
        <motion.div
          className="flex gap-6 mb-10"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5, duration: 0.6 }}
        >
          {[
            { Icon: MapPin, label: 'Track', color: '#818cf8' },
            { Icon: AlertTriangle, label: 'Alert', color: '#f59e0b' },
            { Icon: Phone, label: 'SOS', color: '#ef4444' },
          ].map(({ Icon, label, color }, i) => (
            <motion.div
              key={label}
              className="flex flex-col items-center gap-1.5"
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 1.5 + i * 0.15, duration: 0.5 }}
            >
              <div
                className="w-11 h-11 rounded-xl flex items-center justify-center"
                style={{
                  background: `${color}20`,
                  border: `1px solid ${color}40`,
                }}
              >
                <Icon style={{ color, width: 20, height: 20 }} strokeWidth={1.8} />
              </div>
              <span
                className="text-[10px] uppercase tracking-widest font-medium"
                style={{ color: 'rgba(199, 210, 254, 0.6)' }}
              >
                {label}
              </span>
            </motion.div>
          ))}
        </motion.div>

        {/* ─── Progress Bar ─── */}
        <motion.div
          className="w-64 sm:w-72"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.8, duration: 0.5 }}
        >
          <div
            className="w-full h-1.5 rounded-full overflow-hidden"
            style={{ background: 'rgba(255, 255, 255, 0.1)' }}
          >
            <motion.div
              className="h-full rounded-full"
              style={{
                width: `${Math.min(progress, 100)}%`,
                background:
                  'linear-gradient(90deg, #6366f1, #06b6d4, #a78bfa)',
                boxShadow: '0 0 12px rgba(99, 102, 241, 0.6)',
                transition: 'width 0.05s linear',
              }}
            />
          </div>
          <div className="flex justify-between mt-2">
            <span
              className="text-[10px] uppercase tracking-widest"
              style={{ color: 'rgba(199, 210, 254, 0.5)' }}
            >
              Loading
            </span>
            <span
              className="text-[10px] font-mono"
              style={{ color: 'rgba(199, 210, 254, 0.5)' }}
            >
              {Math.min(Math.round(progress), 100)}%
            </span>
          </div>
        </motion.div>
      </motion.div>

      {/* ─── Bottom branding ─── */}
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2, duration: 0.8 }}
        className="absolute bottom-8 text-[11px] tracking-[0.25em] uppercase"
        style={{ color: 'rgba(199, 210, 254, 0.3)' }}
      >
        Powered by UTSE
      </motion.p>
    </div>
  )
}

export default SplashScreen