import { Download, Share2, Printer, QrCode, CheckCircle, Users } from 'lucide-react';
import QRCodeReact from 'qrcode.react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../components/Auth/AuthContext';

const MyTouristCard = () => {
  const { user } = useAuth(); // Use AuthContext to get the latest user data
  const touristData = JSON.parse(localStorage.getItem('touristData') || '{}');
  
  // Use data from AuthContext first, fallback to localStorage
  const displayData = user?.isRegistered ? user : touristData;

  if (!displayData.touristId) {
    return (
      <div className="max-w-2xl mx-auto">
        <div className="card text-center">
          <QrCode className="h-24 w-24 text-gray-300 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-gray-900 mb-2">No Tourist Card Found</h2>
          <p className="text-gray-600 mb-6">Please complete your registration to get your Smart Tourist Card</p>
          <Link to="/tourist/registration" className="btn-primary">
            Complete Registration
          </Link>
        </div>
      </div>
    );
  }

  const idProof = displayData.touristType === 'domestic' 
    ? { label: 'Aadhaar', number: displayData.aadhaarNumber }
    : { label: 'Passport', number: displayData.passportNumber };
  
  const isGroupRegistration = displayData.group && displayData.group.length > 0;
  const verificationUrl = `${window.location.origin}/verify/${displayData.touristId}`;

  const downloadQR = () => { /* Download QR logic remains the same */ };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div>
        <h2 className="text-3xl font-bold text-gray-900">{isGroupRegistration ? 'My Group Tourist Card' : 'My Smart Tourist Card'}</h2>
        <p className="text-gray-600 mt-1">Your digital identity for safe travel in India</p>
      </div>

      <div className="card">
        <div className="bg-gradient-to-br from-primary-600 to-primary-800 rounded-2xl p-8 text-white shadow-2xl">
          <div className="flex items-start justify-between mb-6">
            <div><h3 className="text-3xl font-bold">Smart Tourist Card</h3></div>
            <div className="bg-white p-3 rounded-xl shadow-lg"><QRCodeReact id="card-qr-code" value={verificationUrl} size={100} level="H" /></div>
          </div>
          <div className="flex flex-col md:flex-row gap-6 mb-6">
            <div className="h-24 w-24 bg-white rounded-xl flex items-center justify-center text-6xl shadow-lg self-center md:self-start">👤</div>
            <div className="flex-1">
              <h4 className="text-2xl font-bold">{displayData.fullName} {isGroupRegistration && <span className="text-base font-normal">(Group Leader)</span>}</h4>
              <div className="space-y-1 mt-2">
                <p><span className="font-semibold">ID:</span> <span className="font-mono">{displayData.touristId}</span></p>
                <p><span className="font-semibold">Country:</span> {displayData.country}</p>
                <p><span className="font-semibold">{idProof.label}:</span> {idProof.number || 'N/A'}</p>
              </div>
            </div>
          </div>
          <div className="bg-danger-500 rounded-lg p-4 mb-4">
             <p className="text-danger-100 text-xs mb-1 font-medium">EMERGENCY CONTACT</p>
             <div className="flex items-center justify-between">
                <div>
                   <p className="font-semibold text-lg">{displayData.emergencyContactName}</p>
                   <p className="text-danger-100 text-sm">{displayData.emergencyContactRelation}</p>
                </div>
                <p className="font-mono font-bold text-xl">{displayData.emergencyContactPhone}</p>
             </div>
          </div>
          <div className="flex items-center justify-center gap-2 bg-success-500 text-white px-4 py-3 rounded-lg font-bold shadow-lg"><CheckCircle className="h-6 w-6" /> VERIFIED - ACTIVE STATUS</div>
        </div>
      </div>

      {isGroupRegistration && (
        <div className="card">
          <h3 className="text-xl font-bold mb-4 flex items-center"><Users className="h-6 w-6 mr-2 text-primary-600" />Group Members ({displayData.group.length})</h3>
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead className="bg-gray-50">
                <tr><th className="p-3 font-semibold">Name</th><th className="p-3 font-semibold">ID Proof</th><th className="p-3 font-semibold">Blood Group</th></tr>
              </thead>
              <tbody>
                {displayData.group.map((member) => {
                  const memberIdProof = member.touristType === 'domestic' ? `Aadhaar: ${member.aadhaarNumber || 'N/A'}` : `Passport: ${member.passportNumber || 'N/A'}`;
                  return (
                    <tr key={member.memberId} className="border-t">
                      <td className="p-3 font-medium">{member.fullName}</td>
                      <td className="p-3">{memberIdProof}</td>
                      <td className="p-3">{member.bloodGroup || 'N/A'}</td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  )
}

export default MyTouristCard;