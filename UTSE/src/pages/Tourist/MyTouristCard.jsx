import { Download, Share2, Printer, QrCode, CheckCircle, Users } from 'lucide-react'
import QRCodeReact from 'qrcode.react'
import { Link } from 'react-router-dom'
import { useAuth } from '../../components/Auth/AuthContext'
import { motion } from 'framer-motion'

const glass = { background: 'rgba(255,255,255,0.06)', backdropFilter: 'blur(24px)', WebkitBackdropFilter: 'blur(24px)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '1rem', boxShadow: '0 8px 32px rgba(0,0,0,0.3), inset 0 1px 0 rgba(255,255,255,0.08)' }

const MyTouristCard = () => {
  const { user } = useAuth()
  const touristData = JSON.parse(localStorage.getItem('touristData') || '{}')
  const displayData = user?.isRegistered ? user : touristData

  if (!displayData.touristId) {
    return (
      <div className="max-w-2xl mx-auto">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="p-8 text-center" style={glass}>
          <QrCode className="h-24 w-24 mx-auto mb-4" style={{ color: 'rgba(199,210,254,0.3)' }} />
          <h2 className="text-2xl font-bold text-white mb-2">No Tourist Card Found</h2>
          <p className="mb-6" style={{ color: 'rgba(199,210,254,0.6)' }}>Please complete your registration to get your Smart Tourist Card</p>
          <Link to="/tourist/registration" className="inline-block px-6 py-3 rounded-xl font-semibold text-white" style={{ background: 'linear-gradient(135deg, #6366f1, #8b5cf6)', boxShadow: '0 4px 15px rgba(99,102,241,0.3)' }}>Complete Registration</Link>
        </motion.div>
      </div>
    )
  }

  const idProof = displayData.touristType === 'domestic' ? { label: 'Aadhaar', number: displayData.aadhaarNumber } : { label: 'Passport', number: displayData.passportNumber }
  const isGroupRegistration = displayData.group && displayData.group.length > 0
  const verificationUrl = `${window.location.origin}/verify/${displayData.touristId}`

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="max-w-4xl mx-auto space-y-6">
      <div>
        <h2 className="text-3xl font-bold text-white" style={{ textShadow: '0 0 30px rgba(99,102,241,0.4)' }}>{isGroupRegistration ? 'My Group Tourist Card' : 'My Smart Tourist Card'}</h2>
        <p className="mt-1" style={{ color: 'rgba(199,210,254,0.6)' }}>Your digital identity for safe travel in India</p>
      </div>

      <motion.div whileHover={{ scale: 1.01 }} className="p-6" style={glass}>
        <div className="rounded-2xl p-8 text-white" style={{ background: 'linear-gradient(135deg, #4338ca, #6366f1, #8b5cf6)', boxShadow: '0 20px 60px rgba(99,102,241,0.4)' }}>
          <div className="flex items-start justify-between mb-6">
            <div><h3 className="text-3xl font-bold" style={{ textShadow: '0 2px 10px rgba(0,0,0,0.3)' }}>Smart Tourist Card</h3></div>
            <div className="bg-white p-3 rounded-xl shadow-lg"><QRCodeReact id="card-qr-code" value={verificationUrl} size={100} level="H" /></div>
          </div>
          <div className="flex flex-col md:flex-row gap-6 mb-6">
            <div className="h-24 w-24 rounded-xl flex items-center justify-center text-6xl shadow-lg self-center md:self-start" style={{ background: 'rgba(255,255,255,0.15)', backdropFilter: 'blur(10px)' }}>👤</div>
            <div className="flex-1">
              <h4 className="text-2xl font-bold">{displayData.fullName} {isGroupRegistration && <span className="text-base font-normal opacity-80">(Group Leader)</span>}</h4>
              <div className="space-y-1 mt-2" style={{ color: 'rgba(255,255,255,0.85)' }}>
                <p><span className="font-semibold">ID:</span> <span className="font-mono">{displayData.touristId}</span></p>
                <p><span className="font-semibold">Country:</span> {displayData.country}</p>
                <p><span className="font-semibold">{idProof.label}:</span> {idProof.number || 'N/A'}</p>
              </div>
            </div>
          </div>
          <div className="rounded-lg p-4 mb-4" style={{ background: 'rgba(239,68,68,0.3)', border: '1px solid rgba(239,68,68,0.4)' }}>
            <p className="text-xs mb-1 font-medium" style={{ color: 'rgba(254,202,202,0.8)' }}>EMERGENCY CONTACT</p>
            <div className="flex items-center justify-between">
              <div><p className="font-semibold text-lg">{displayData.emergencyContactName}</p><p className="text-sm" style={{ color: 'rgba(254,202,202,0.7)' }}>{displayData.emergencyContactRelation}</p></div>
              <p className="font-mono font-bold text-xl">{displayData.emergencyContactPhone}</p>
            </div>
          </div>
          <div className="flex items-center justify-center gap-2 py-3 rounded-lg font-bold" style={{ background: 'rgba(74,222,128,0.2)', border: '1px solid rgba(74,222,128,0.3)', boxShadow: '0 0 20px rgba(74,222,128,0.15)' }}>
            <CheckCircle className="h-6 w-6" /> VERIFIED - ACTIVE STATUS
          </div>
        </div>
      </motion.div>

      {isGroupRegistration && (
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="p-6" style={glass}>
          <h3 className="text-xl font-bold text-white mb-4 flex items-center"><Users className="h-6 w-6 mr-2" style={{ color: '#818cf8' }} />Group Members ({displayData.group.length})</h3>
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead><tr style={{ borderBottom: '1px solid rgba(255,255,255,0.1)' }}><th className="p-3 font-semibold" style={{ color: 'rgba(199,210,254,0.7)' }}>Name</th><th className="p-3 font-semibold" style={{ color: 'rgba(199,210,254,0.7)' }}>ID Proof</th><th className="p-3 font-semibold" style={{ color: 'rgba(199,210,254,0.7)' }}>Blood Group</th></tr></thead>
              <tbody>
                {displayData.group.map((member) => {
                  const memberIdProof = member.touristType === 'domestic' ? `Aadhaar: ${member.aadhaarNumber || 'N/A'}` : `Passport: ${member.passportNumber || 'N/A'}`
                  return (
                    <tr key={member.memberId} style={{ borderTop: '1px solid rgba(255,255,255,0.06)' }}>
                      <td className="p-3 font-medium text-white">{member.fullName}</td>
                      <td className="p-3" style={{ color: 'rgba(199,210,254,0.6)' }}>{memberIdProof}</td>
                      <td className="p-3" style={{ color: 'rgba(199,210,254,0.6)' }}>{member.bloodGroup || 'N/A'}</td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>
        </motion.div>
      )}
    </motion.div>
  )
}

export default MyTouristCard