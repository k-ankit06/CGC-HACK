import { useState } from 'react'
import { useAuth } from '../../components/Auth/AuthContext'
import { User, Phone, MapPin, Heart, Users, AlertCircle } from 'lucide-react'
import { motion } from 'framer-motion'
import { Link, useNavigate } from 'react-router-dom'

const glass = { background: 'rgba(255,255,255,0.06)', backdropFilter: 'blur(24px)', WebkitBackdropFilter: 'blur(24px)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '1rem', boxShadow: '0 8px 32px rgba(0,0,0,0.3), inset 0 1px 0 rgba(255,255,255,0.08)' }

const TouristRegistration = () => {
  const { user, updateUser } = useAuth()
  const navigate = useNavigate()
  const [step, setStep] = useState(1)
  const [isAddingMember, setIsAddingMember] = useState(false)
  const [groupMembers, setGroupMembers] = useState([])
  const [primaryUser, setPrimaryUser] = useState(null)
  const [error, setError] = useState('')

  const initialFormState = {
    fullName: '', email: '', phone: '', country: '', passportNumber: '', aadhaarNumber: '', touristType: 'international',
    dateOfBirth: '', gender: '', nationality: '', address: '', emergencyContactName: '', emergencyContactPhone: '',
    emergencyContactRelation: '', hotelName: '', hotelAddress: '', checkInDate: '', checkOutDate: '',
    purposeOfVisit: '', bloodGroup: '', medicalConditions: '', allergies: '', travelInsurance: '', insuranceProvider: ''
  }

  const [formData, setFormData] = useState({
    ...initialFormState, fullName: user?.name || '', email: user?.email || '', phone: user?.phone || '', country: user?.country || '',
    passportNumber: user?.passportNumber || '', aadhaarNumber: user?.aadhaarNumber || '', touristType: user?.touristType || 'international',
    emergencyContactPhone: user?.emergencyContact || '',
  })

  const handleChange = (e) => { setError(''); setFormData({ ...formData, [e.target.name]: e.target.value }) }
  const handlePrevious = () => { if (step > 1) setStep(step - 1) }
  const handleNext = () => {
    if (step === 1 && (!formData.fullName || (!formData.passportNumber && !formData.aadhaarNumber))) { setError('Full Name and a valid ID number are required.'); return }
    setError('')
    if (step < 4) { setStep(step + 1) } else { handleSubmit() }
  }

  const handleSubmit = () => {
    if (!isAddingMember) {
      const registrationData = { ...formData, touristId: `TID-${Date.now()}`, isRegistered: true, group: [] }
      setPrimaryUser(registrationData)
      updateUser({ ...user, ...registrationData })
      setStep(5)
    } else {
      const newMember = { ...formData, memberId: `MEM-${Date.now()}` }
      setGroupMembers([...groupMembers, newMember])
      alert(`${newMember.fullName} has been added to your group.`)
      setFormData(initialFormState); setIsAddingMember(false); setStep(5)
    }
  }

  const startNewMemberRegistration = () => { setIsAddingMember(true); setFormData(initialFormState); setStep(1) }
  const finishGroupRegistration = () => {
    const finalData = { ...(primaryUser || user), group: groupMembers }
    localStorage.setItem('touristData', JSON.stringify(finalData))
    updateUser(finalData)
    const allTourists = JSON.parse(localStorage.getItem('allTourists') || '[]')
    const existingIndex = allTourists.findIndex(t => t.email === finalData.email)
    if (existingIndex > -1) { allTourists[existingIndex] = finalData } else { allTourists.push(finalData) }
    localStorage.setItem('allTourists', JSON.stringify(allTourists))
    navigate('/tourist/my-card')
  }

  const inputStyle = { background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.12)', borderRadius: '0.75rem', color: '#fff', padding: '0.75rem 1rem', width: '100%', outline: 'none' }
  const labelStyle = { color: 'rgba(199,210,254,0.7)', fontSize: '0.875rem', fontWeight: 600, display: 'block', marginBottom: '0.25rem' }

  if (user?.isRegistered) {
    return (
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="p-8 text-center" style={glass}>
        <h2 className="text-2xl font-bold mb-2" style={{ color: '#4ade80' }}>You are already registered!</h2>
        <p className="mt-2 mb-4" style={{ color: 'rgba(199,210,254,0.6)' }}>You can view your Smart Tourist Card.</p>
        <Link to="/tourist/my-card" className="inline-block px-6 py-3 rounded-xl font-semibold text-white" style={{ background: 'linear-gradient(135deg, #6366f1, #8b5cf6)' }}>View My Card</Link>
      </motion.div>
    )
  }

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="max-w-4xl mx-auto">
      <div className="p-8" style={glass}>
        <motion.h2 initial={{ scale: 0.9 }} animate={{ scale: 1 }} className="text-3xl font-bold text-white mb-2" style={{ textShadow: '0 0 30px rgba(99,102,241,0.4)' }}>
          {isAddingMember ? 'Add Group Member' : 'Tourist Registration'}
        </motion.h2>
        <p style={{ color: 'rgba(199,210,254,0.6)' }}>{isAddingMember ? `Adding member ${groupMembers.length + 1} to your group.` : 'Complete your registration to get your Smart Tourist Card.'}</p>

        {step < 5 && (
          <>
            <div className="my-8">
              <div className="flex items-center justify-between">
                {[1, 2, 3, 4].map((s) => (
                  <div key={s} className="flex-1 flex items-center">
                    <motion.div animate={{ scale: step >= s ? 1.1 : 1 }} className="h-10 w-10 rounded-full flex items-center justify-center font-bold text-white"
                      style={step >= s ? { background: 'linear-gradient(135deg, #6366f1, #8b5cf6)', boxShadow: '0 4px 15px rgba(99,102,241,0.4)' } : { background: 'rgba(255,255,255,0.1)' }}>{s}</motion.div>
                    {s < 4 && (<div className="flex-1 h-1 mx-2 rounded" style={{ background: step > s ? 'linear-gradient(90deg, #6366f1, #8b5cf6)' : 'rgba(255,255,255,0.1)' }} />)}
                  </div>
                ))}
              </div>
              <div className="flex justify-between mt-2 text-center">
                {['Personal', 'Contact', 'Stay', 'Medical'].map((l, i) => <span key={i} className="text-xs font-medium w-1/4" style={{ color: 'rgba(199,210,254,0.5)' }}>{l}</span>)}
              </div>
            </div>
            {error && <div className="mb-4 p-3 rounded-lg flex items-center" style={{ background: 'rgba(239,68,68,0.15)', border: '1px solid rgba(239,68,68,0.3)', color: '#fca5a5' }}><AlertCircle className="h-5 w-5 mr-2" />{error}</div>}
            <form className="space-y-6">
              {step === 1 && (
                <motion.div initial={{ x: -50, opacity: 0 }} animate={{ x: 0, opacity: 1 }} className="space-y-4">
                  <h3 className="text-xl font-bold mb-4 flex items-center text-white"><User className="h-6 w-6 mr-2" style={{ color: '#818cf8' }} />Personal Information</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div><label style={labelStyle}>Full Name *</label><input type="text" name="fullName" required style={inputStyle} value={formData.fullName} onChange={handleChange} /></div>
                    <div><label style={labelStyle}>Date of Birth *</label><input type="date" name="dateOfBirth" required style={{ ...inputStyle, colorScheme: 'dark' }} value={formData.dateOfBirth} onChange={handleChange} /></div>
                    <div><label style={labelStyle}>Gender *</label><select name="gender" required style={inputStyle} value={formData.gender} onChange={handleChange}><option value="">Select</option><option>Male</option><option>Female</option><option>Other</option></select></div>
                    <div><label style={labelStyle}>Nationality *</label><input type="text" name="nationality" required style={inputStyle} value={formData.nationality} onChange={handleChange} /></div>
                    <div className="md:col-span-2"><label style={labelStyle}>Country *</label><input type="text" name="country" required style={inputStyle} value={formData.country} onChange={handleChange} /></div>
                    <div className="md:col-span-2">
                      <label style={labelStyle}>Tourist Type</label>
                      <div className="flex gap-4 p-2 rounded-lg" style={{ background: 'rgba(255,255,255,0.06)' }}>
                        {['international', 'domestic'].map(t => (
                          <label key={t} className="flex-1 text-center py-2 rounded-md cursor-pointer text-white font-medium" style={formData.touristType === t ? { background: 'linear-gradient(135deg, #6366f1, #8b5cf6)', boxShadow: '0 4px 10px rgba(99,102,241,0.3)' } : { background: 'transparent' }}>
                            <input type="radio" name="touristType" value={t} checked={formData.touristType === t} onChange={handleChange} className="hidden" />{t.charAt(0).toUpperCase() + t.slice(1)}
                          </label>
                        ))}
                      </div>
                    </div>
                    {formData.touristType === 'international' ? (<div><label style={labelStyle}>Passport Number *</label><input type="text" name="passportNumber" required style={inputStyle} value={formData.passportNumber} onChange={handleChange} /></div>) : (<div><label style={labelStyle}>Aadhaar Number *</label><input type="text" name="aadhaarNumber" required style={inputStyle} maxLength={12} value={formData.aadhaarNumber} onChange={handleChange} /></div>)}
                    <div className="md:col-span-2"><label style={labelStyle}>Home Address</label><textarea name="address" style={{ ...inputStyle, resize: 'vertical' }} rows="3" value={formData.address} onChange={handleChange} /></div>
                  </div>
                </motion.div>
              )}
              {step === 2 && (
                <motion.div initial={{ x: -50, opacity: 0 }} animate={{ x: 0, opacity: 1 }} className="space-y-4">
                  <h3 className="text-xl font-bold mb-4 flex items-center text-white"><Phone className="h-6 w-6 mr-2" style={{ color: '#818cf8' }} />Contact & Emergency</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div><label style={labelStyle}>Email *</label><input type="email" name="email" required style={inputStyle} value={formData.email} onChange={handleChange} /></div>
                    <div><label style={labelStyle}>Phone *</label><input type="tel" name="phone" required style={inputStyle} value={formData.phone} onChange={handleChange} /></div>
                    <div className="md:col-span-2 p-4 rounded-lg" style={{ background: 'rgba(250,204,21,0.08)', border: '1px solid rgba(250,204,21,0.15)' }}>
                      <p className="font-semibold mb-3 text-white">Emergency Contact</p>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div><label style={labelStyle}>Full Name *</label><input type="text" name="emergencyContactName" required style={inputStyle} value={formData.emergencyContactName} onChange={handleChange} /></div>
                        <div><label style={labelStyle}>Phone *</label><input type="tel" name="emergencyContactPhone" required style={inputStyle} value={formData.emergencyContactPhone} onChange={handleChange} /></div>
                        <div><label style={labelStyle}>Relation *</label><select name="emergencyContactRelation" required style={inputStyle} value={formData.emergencyContactRelation} onChange={handleChange}><option value="">Select</option><option>Spouse</option><option>Parent</option><option>Sibling</option><option>Friend</option><option>Other</option></select></div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}
              {step === 3 && (
                <motion.div initial={{ x: -50, opacity: 0 }} animate={{ x: 0, opacity: 1 }} className="space-y-4">
                  <h3 className="text-xl font-bold mb-4 flex items-center text-white"><MapPin className="h-6 w-6 mr-2" style={{ color: '#818cf8' }} />Stay & Travel Details</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div><label style={labelStyle}>Hotel/Accommodation *</label><input type="text" name="hotelName" required style={inputStyle} value={formData.hotelName} onChange={handleChange} /></div>
                    <div><label style={labelStyle}>Hotel Address *</label><input type="text" name="hotelAddress" required style={inputStyle} value={formData.hotelAddress} onChange={handleChange} /></div>
                    <div><label style={labelStyle}>Check-in Date *</label><input type="date" name="checkInDate" required style={{ ...inputStyle, colorScheme: 'dark' }} value={formData.checkInDate} onChange={handleChange} /></div>
                    <div><label style={labelStyle}>Check-out Date *</label><input type="date" name="checkOutDate" required style={{ ...inputStyle, colorScheme: 'dark' }} value={formData.checkOutDate} onChange={handleChange} /></div>
                    <div className="md:col-span-2"><label style={labelStyle}>Purpose of Visit *</label><select name="purposeOfVisit" required style={inputStyle} value={formData.purposeOfVisit} onChange={handleChange}><option value="">Select</option><option>Tourism</option><option>Business</option><option>Education</option><option>Medical</option><option>Other</option></select></div>
                  </div>
                </motion.div>
              )}
              {step === 4 && (
                <motion.div initial={{ x: -50, opacity: 0 }} animate={{ x: 0, opacity: 1 }} className="space-y-4">
                  <h3 className="text-xl font-bold mb-4 flex items-center text-white"><Heart className="h-6 w-6 mr-2" style={{ color: '#f87171' }} />Medical Information</h3>
                  <div className="p-4 rounded-lg mb-4" style={{ background: 'rgba(239,68,68,0.08)', border: '1px solid rgba(239,68,68,0.15)' }}>
                    <p className="text-sm" style={{ color: 'rgba(254,202,202,0.7)' }}>This is crucial for emergency medical assistance.</p>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div><label style={labelStyle}>Blood Group</label><select name="bloodGroup" style={inputStyle} value={formData.bloodGroup} onChange={handleChange}><option value="">Select</option><option>A+</option><option>A-</option><option>B+</option><option>B-</option><option>O+</option><option>O-</option><option>AB+</option><option>AB-</option></select></div>
                    <div className="md:col-span-2"><label style={labelStyle}>Medical Conditions</label><textarea name="medicalConditions" style={{ ...inputStyle, resize: 'vertical' }} rows="3" placeholder="Diabetes, Heart condition..." value={formData.medicalConditions} onChange={handleChange} /></div>
                    <div className="md:col-span-2"><label style={labelStyle}>Allergies</label><textarea name="allergies" style={{ ...inputStyle, resize: 'vertical' }} rows="3" placeholder="Food, Medicine allergies..." value={formData.allergies} onChange={handleChange} /></div>
                  </div>
                  <div className="p-4 mt-6">
                    <div className="flex items-start gap-3">
                      <input type="checkbox" required className="mt-1 accent-indigo-500" />
                      <p className="text-sm text-white">I confirm all info is accurate and agree to the terms.</p>
                    </div>
                  </div>
                </motion.div>
              )}
              <div className="flex gap-4 pt-6" style={{ borderTop: '1px solid rgba(255,255,255,0.08)' }}>
                {step > 1 && (<motion.button whileHover={{ scale: 1.03 }} type="button" onClick={handlePrevious} className="flex-1 px-6 py-3 rounded-xl font-semibold text-white" style={{ background: 'rgba(255,255,255,0.1)', border: '1px solid rgba(255,255,255,0.15)' }}>Previous</motion.button>)}
                <motion.button whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }} type="button" onClick={handleNext} className="flex-1 px-6 py-3 rounded-xl font-semibold text-white"
                  style={{ background: 'linear-gradient(135deg, #6366f1, #8b5cf6)', boxShadow: '0 4px 20px rgba(99,102,241,0.4)' }}>{step === 4 ? (isAddingMember ? 'Add Member to Group' : 'Complete My Registration') : 'Next'}</motion.button>
              </div>
            </form>
          </>
        )}
        {step === 5 && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center py-8">
            <h2 className="text-2xl font-bold" style={{ color: '#4ade80' }}>Registration Complete!</h2>
            <p className="my-4" style={{ color: 'rgba(199,210,254,0.6)' }}>You can now add family members or finish and view your card.</p>
            {groupMembers.length > 0 && (
              <div className="mb-6 text-left p-4 rounded-lg" style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)' }}>
                <h3 className="font-bold mb-2 text-white">Group Members Added ({groupMembers.length}):</h3>
                <ul className="list-disc list-inside" style={{ color: 'rgba(199,210,254,0.6)' }}>{groupMembers.map(member => <li key={member.memberId}>{member.fullName} ({member.passportNumber || member.aadhaarNumber})</li>)}</ul>
              </div>
            )}
            <div className="flex flex-col md:flex-row gap-4">
              <motion.button whileHover={{ scale: 1.03 }} onClick={startNewMemberRegistration} className="flex-1 px-6 py-3 rounded-xl font-semibold text-white" style={{ background: 'linear-gradient(135deg, #6366f1, #8b5cf6)' }}><Users className="inline h-4 w-4 mr-2" />Add a Family Member</motion.button>
              <motion.button whileHover={{ scale: 1.03 }} onClick={finishGroupRegistration} className="flex-1 px-6 py-3 rounded-xl font-semibold text-white" style={{ background: 'linear-gradient(135deg, #10b981, #34d399)', boxShadow: '0 4px 15px rgba(16,185,129,0.3)' }}>Finish & View Card</motion.button>
            </div>
          </motion.div>
        )}
      </div>
    </motion.div>
  )
}

export default TouristRegistration