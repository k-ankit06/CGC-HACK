import { useState } from 'react'
import { useAuth } from '../../components/Auth/AuthContext'
import { User, Phone, MapPin, Heart, Users } from 'lucide-react'
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'

const TouristRegistration = () => {
  const { user, updateUser } = useAuth();
  const [step, setStep] = useState(1);
  const [isRegisteringMember, setIsRegisteringMember] = useState(false);
  const [groupMembers, setGroupMembers] = useState([]);
  const [primaryUser, setPrimaryUser] = useState(null);

  const initialFormState = {
    fullName: '', email: '', phone: '', country: '', passportNumber: '', aadhaarNumber: '', touristType: 'international',
    dateOfBirth: '', gender: '', nationality: '', address: '', emergencyContactName: '', emergencyContactPhone: '',
    emergencyContactRelation: '', hotelName: '', hotelAddress: '', checkInDate: '', checkOutDate: '',
    purposeOfVisit: '', bloodGroup: '', medicalConditions: '', allergies: '', travelInsurance: '', insuranceProvider: ''
  };
  
  const [formData, setFormData] = useState({
      ...initialFormState,
      fullName: user?.name || '', email: user?.email || '', phone: user?.phone || '', country: user?.country || '',
      passportNumber: user?.passportNumber || '', aadhaarNumber: user?.aadhaarNumber || '', touristType: user?.touristType || 'international',
      emergencyContactPhone: user?.emergencyContact || '',
  });

  const handleChange = (e) => { setFormData({ ...formData, [e.target.name]: e.target.value }) };
  const handlePrevious = () => { if (step > 1) setStep(step - 1) };
  const handleNext = () => {
    if (step < 4) {
      setStep(step + 1);
    } else {
      handleSubmit();
    }
  };

  const handleSubmit = () => {
    const newMemberData = { ...formData, memberId: `MEM-${Date.now()}` };

    if (!isRegisteringMember) {
      const registrationData = {
        ...newMemberData,
        touristId: `TID-2024-${Math.floor(Math.random() * 10000)}`,
        registrationDate: new Date().toISOString(),
        isRegistered: true,
        group: []
      };
      
      setPrimaryUser(registrationData);
      
      // FIX: User ka status aur data TURANT save karo, taaki redirect na ho.
      localStorage.setItem('touristData', JSON.stringify(registrationData));
      const allTourists = JSON.parse(localStorage.getItem('allTourists') || '[]');
      const updatedTourists = allTourists.filter(t => t.email !== registrationData.email);
      updatedTourists.push(registrationData);
      localStorage.setItem('allTourists', JSON.stringify(updatedTourists));
      
      // FIX: YAHI SABSE IMPORTANT STEP HAI. User context ko turant update karo.
      updateUser({ ...user, ...registrationData }); // Poora data pass karo
      
      setStep(5);
    } else {
      setGroupMembers([...groupMembers, newMemberData]);
      alert(`${newMemberData.fullName} has been added to the group.`);
      setFormData(initialFormState);
      setStep(1);
    }
  };

  const startNewMemberRegistration = () => {
    setIsRegisteringMember(true);
    setFormData(initialFormState);
    setStep(1);
  };

  const finishGroupRegistration = () => {
    const finalGroupData = { ...primaryUser, group: groupMembers };
    
    localStorage.setItem('touristData', JSON.stringify(finalGroupData));
    
    const allTourists = JSON.parse(localStorage.getItem('allTourists') || '[]');
    const updatedTourists = allTourists.filter(t => t.touristId !== finalGroupData.touristId);
    updatedTourists.push(finalGroupData);
    localStorage.setItem('allTourists', JSON.stringify(updatedTourists));
    
    setStep(6);
  };

  if (user?.isRegistered) {
    return (
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="card text-center">
        <h2 className="text-2xl font-bold text-success-700">You are already registered!</h2>
        <p className="text-gray-600 mt-2">You can view your Smart Tourist Card in the 'My Tourist Card' section.</p>
        <Link to="/tourist/my-card" className="btn-primary mt-4">View My Card</Link>
      </motion.div>
    )
  }

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="max-w-4xl mx-auto">
      <div className="card">
        <motion.h2 initial={{ scale: 0.9 }} animate={{ scale: 1 }} className="text-3xl font-bold text-gray-900 mb-2">Tourist Registration</motion.h2>
        <p className="text-gray-600">{isRegisteringMember ? 'Registering a new group member.' : 'Complete your registration to get your Smart Tourist Card.'}</p>
        
        {step < 5 && (
            <>
              <div className="my-8">
                <div className="flex items-center justify-between">
                    {[1, 2, 3, 4].map((s) => (<div key={s} className="flex-1 flex items-center"><motion.div animate={{ scale: step >= s ? 1.1 : 1 }} className={`h-10 w-10 rounded-full flex items-center justify-center font-bold ${step >= s ? 'bg-primary-600 text-white' : 'bg-gray-200 text-gray-600'}`}>{s}</motion.div>{s < 4 && (<div className={`flex-1 h-1 mx-2 ${step > s ? 'bg-primary-600' : 'bg-gray-200'}`}></div>)}</div>))}
                </div>
                <div className="flex justify-between mt-2 text-center"><span className="text-xs font-medium w-1/4">Personal</span><span className="text-xs font-medium w-1/4">Contact</span><span className="text-xs font-medium w-1/4">Stay</span><span className="text-xs font-medium w-1/4">Medical</span></div>
              </div>
              <form className="space-y-6">
                {step === 1 && (<motion.div initial={{ x: -50, opacity: 0 }} animate={{ x: 0, opacity: 1 }} className="space-y-4"><h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center"><User className="h-6 w-6 mr-2 text-primary-600" />Personal Information</h3><div className="grid grid-cols-1 md:grid-cols-2 gap-4"><div><label className="block text-sm font-semibold text-gray-700 mb-2">Full Name *</label><input type="text" name="fullName" required className="input-field" value={formData.fullName} onChange={handleChange} /></div><div><label className="block text-sm font-semibold text-gray-700 mb-2">Date of Birth *</label><input type="date" name="dateOfBirth" required className="input-field" value={formData.dateOfBirth} onChange={handleChange} /></div><div><label className="block text-sm font-semibold text-gray-700 mb-2">Gender *</label><select name="gender" required className="input-field" value={formData.gender} onChange={handleChange}><option value="">Select</option><option value="Male">Male</option><option value="Female">Female</option><option value="Other">Other</option></select></div><div><label className="block text-sm font-semibold text-gray-700 mb-2">Nationality *</label><input type="text" name="nationality" required className="input-field" value={formData.nationality} onChange={handleChange} /></div><div><label className="block text-sm font-semibold text-gray-700 mb-2">Country *</label><input type="text" name="country" required className="input-field" value={formData.country} onChange={handleChange} /></div><div><label className="block text-sm font-semibold text-gray-700 mb-2">Passport/Aadhaar *</label><input type="text" name="passportNumber" required className="input-field" value={formData.passportNumber} onChange={handleChange} /></div><div className="md:col-span-2"><label className="block text-sm font-semibold text-gray-700 mb-2">Home Address</label><textarea name="address" className="input-field" rows="3" value={formData.address} onChange={handleChange}></textarea></div></div></motion.div>)}
                {step === 2 && (<motion.div initial={{ x: -50, opacity: 0 }} animate={{ x: 0, opacity: 1 }} className="space-y-4"><h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center"><Phone className="h-6 w-6 mr-2 text-primary-600" />Contact & Emergency</h3><div className="grid grid-cols-1 md:grid-cols-2 gap-4"><div><label className="block text-sm font-semibold text-gray-700 mb-2">Email *</label><input type="email" name="email" required className="input-field" value={formData.email} onChange={handleChange} /></div><div><label className="block text-sm font-semibold text-gray-700 mb-2">Phone *</label><input type="tel" name="phone" required className="input-field" value={formData.phone} onChange={handleChange} /></div><div className="md:col-span-2 bg-warning-50 p-4 rounded-lg"><p className="font-semibold mb-3">Emergency Contact</p><div className="grid grid-cols-1 md:grid-cols-3 gap-4"><div><label className="block text-sm font-semibold text-gray-700 mb-2">Full Name *</label><input type="text" name="emergencyContactName" required className="input-field" value={formData.emergencyContactName} onChange={handleChange} /></div><div><label className="block text-sm font-semibold text-gray-700 mb-2">Phone *</label><input type="tel" name="emergencyContactPhone" required className="input-field" value={formData.emergencyContactPhone} onChange={handleChange} /></div><div><label className="block text-sm font-semibold text-gray-700 mb-2">Relation *</label><select name="emergencyContactRelation" required className="input-field" value={formData.emergencyContactRelation} onChange={handleChange}><option value="">Select</option><option value="Spouse">Spouse</option><option value="Parent">Parent</option><option value="Sibling">Sibling</option><option value="Friend">Friend</option><option value="Other">Other</option></select></div></div></div></div></motion.div>)}
                {step === 3 && (<motion.div initial={{ x: -50, opacity: 0 }} animate={{ x: 0, opacity: 1 }} className="space-y-4"><h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center"><MapPin className="h-6 w-6 mr-2 text-primary-600" />Stay & Travel Details</h3><div className="grid grid-cols-1 md:grid-cols-2 gap-4"><div><label className="block text-sm font-semibold text-gray-700 mb-2">Hotel Name *</label><input type="text" name="hotelName" required className="input-field" value={formData.hotelName} onChange={handleChange} /></div><div><label className="block text-sm font-semibold text-gray-700 mb-2">Hotel Address *</label><input type="text" name="hotelAddress" required className="input-field" value={formData.hotelAddress} onChange={handleChange} /></div><div><label className="block text-sm font-semibold text-gray-700 mb-2">Check-in Date *</label><input type="date" name="checkInDate" required className="input-field" value={formData.checkInDate} onChange={handleChange} /></div><div><label className="block text-sm font-semibold text-gray-700 mb-2">Check-out Date *</label><input type="date" name="checkOutDate" required className="input-field" value={formData.checkOutDate} onChange={handleChange} /></div><div className="md:col-span-2"><label className="block text-sm font-semibold text-gray-700 mb-2">Purpose of Visit *</label><select name="purposeOfVisit" required className="input-field" value={formData.purposeOfVisit} onChange={handleChange}><option value="">Select</option><option value="Tourism">Tourism</option><option value="Business">Business</option><option value="Education">Education</option><option value="Medical">Medical</option><option value="Other">Other</option></select></div></div></motion.div>)}
                {step === 4 && (<motion.div initial={{ x: -50, opacity: 0 }} animate={{ x: 0, opacity: 1 }} className="space-y-4"><h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center"><Heart className="h-6 w-6 mr-2 text-danger-600" />Medical Information</h3><div className="bg-danger-50 p-4 rounded-lg mb-4"><p className="text-sm">This information is crucial for emergency medical assistance.</p></div><div className="grid grid-cols-1 md:grid-cols-2 gap-4"><div><label className="block text-sm font-semibold text-gray-700 mb-2">Blood Group</label><select name="bloodGroup" className="input-field" value={formData.bloodGroup} onChange={handleChange}><option value="">Select</option><option value="A+">A+</option><option value="A-">A-</option><option value="B+">B+</option><option value="B-">B-</option><option value="O+">O+</option><option value="O-">O-</option><option value="AB+">AB+</option><option value="AB-">AB-</option></select></div><div className="md:col-span-2"><label className="block text-sm font-semibold text-gray-700 mb-2">Medical Conditions</label><textarea name="medicalConditions" className="input-field" rows="3" placeholder="Diabetes, Heart condition, etc." value={formData.medicalConditions} onChange={handleChange}></textarea></div><div className="md:col-span-2"><label className="block text-sm font-semibold text-gray-700 mb-2">Allergies</label><textarea name="allergies" className="input-field" rows="3" placeholder="Food allergies, Medicine allergies, etc." value={formData.allergies} onChange={handleChange}></textarea></div></div><div className="p-4 mt-6"><div className="flex items-start gap-3"><input type="checkbox" required className="mt-1" /><p className="text-sm">I confirm that all info is accurate and agree to the terms.</p></div></div></motion.div>)}
                <div className="flex gap-4 pt-6 border-t border-gray-200">{step > 1 && (<button type="button" onClick={handlePrevious} className="flex-1 bg-gray-600 text-white px-6 py-3 rounded-lg hover:bg-gray-700 font-semibold">Previous</button>)}<button type="button" onClick={handleNext} className="flex-1 btn-primary">{step === 4 ? 'Complete Registration' : 'Next'}</button></div>
              </form>
            </>
        )}
        {step === 5 && (<motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center py-8"><h2 className="text-2xl font-bold text-success-700">Your Registration is Complete!</h2><p className="text-gray-600 my-4">You can now add group members or finish.</p>{groupMembers.length > 0 && (<div className="mb-6 text-left"><h3 className="font-bold mb-2">Group Members Added:</h3><ul className="list-disc list-inside">{groupMembers.map(member => <li key={member.memberId}>{member.fullName}</li>)}</ul></div>)}<div className="flex flex-col md:flex-row gap-4"><button onClick={startNewMemberRegistration} className="flex-1 btn-primary"><Users className="inline h-4 w-4 mr-2" />Add Another Member</button><button onClick={finishGroupRegistration} className="flex-1 bg-success-600 text-white px-6 py-3 rounded-lg hover:bg-success-700 font-semibold">Finish & View Card</button></div></motion.div>)}
        {step === 6 && (<motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center py-8"><h2 className="text-3xl font-bold text-success-700 mb-4">Group Registration Successful!</h2><p className="text-gray-600 mb-6">You can now view your group's Smart Tourist Card.</p><Link to="/tourist/my-card" className="btn-primary">View My Group Card</Link></motion.div>)}
      </div>
    </motion.div>
  )
}

export default TouristRegistration;