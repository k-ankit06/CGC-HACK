import { Download, Share2, Printer, QrCode, CheckCircle, Users } from 'lucide-react'
import QRCodeReact from 'qrcode.react'
import { Link } from 'react-router-dom'

const MyTouristCard = () => {
  const touristData = JSON.parse(localStorage.getItem('touristData') || '{}')
  
  if (!touristData.touristId) {
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
    )
  }

  const idProof = touristData.touristType === 'domestic' 
    ? { label: 'Aadhaar', number: touristData.aadhaarNumber }
    : { label: 'Passport', number: touristData.passportNumber };
  
  const isGroupRegistration = touristData.group && touristData.group.length > 0;

  const downloadQR = () => {
    const canvas = document.getElementById('card-qr-code');
    if (canvas) {
      const pngUrl = canvas.toDataURL("image/png").replace("image/png", "image/octet-stream");
      let downloadLink = document.createElement("a");
      downloadLink.href = pngUrl;
      downloadLink.download = `tourist-card-${touristData.passportNumber || touristData.aadhaarNumber}.png`;
      document.body.appendChild(downloadLink);
      downloadLink.click();
      document.body.removeChild(downloadLink);
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div>
        <h2 className="text-3xl font-bold text-gray-900">{isGroupRegistration ? 'My Group Tourist Card' : 'My Smart Tourist Card'}</h2>
        <p className="text-gray-600 mt-1">Your digital identity for safe travel in India</p>
      </div>

      <div className="card">
        <div className="bg-gradient-to-br from-primary-600 to-primary-800 rounded-2xl p-8 text-white shadow-2xl">
          <div className="flex items-start justify-between mb-6">
            <div>
              <p className="text-primary-200 text-sm mb-1">India Tourism • Ministry of Tourism</p>
              <h3 className="text-3xl font-bold">Smart Tourist Card</h3>
            </div>
            <div className="bg-white p-3 rounded-xl shadow-lg">
              <QRCodeReact id="card-qr-code" value={JSON.stringify(touristData)} size={100} level="H" />
            </div>
          </div>
          <div className="flex flex-col md:flex-row gap-6 mb-6">
            <div className="h-24 w-24 bg-white rounded-xl flex items-center justify-center text-6xl shadow-lg self-center md:self-start">👤</div>
            <div className="flex-1">
              <h4 className="text-2xl font-bold">{touristData.fullName} {isGroupRegistration && '(Group Leader)'}</h4>
              <div className="space-y-1 mt-2">
                <p><span className="font-semibold">ID:</span> <span className="font-mono">{touristData.touristId}</span></p>
                <p><span className="font-semibold">Country:</span> {touristData.country}</p>
                <p><span className="font-semibold">{idProof.label}:</span> {idProof.number || 'N/A'}</p>
              </div>
            </div>
          </div>
          <div className="bg-danger-500 rounded-lg p-4 mb-4">
            <p className="text-danger-100 text-xs mb-1 font-medium">EMERGENCY CONTACT</p>
            <div className="flex items-center justify-between">
              <div>
                <p className="font-semibold text-lg">{touristData.emergencyContactName}</p>
                <p className="text-danger-100 text-sm">{touristData.emergencyContactRelation}</p>
              </div>
              <p className="font-mono font-bold text-xl">{touristData.emergencyContactPhone}</p>
            </div>
          </div>
          <div className="flex items-center justify-center gap-2 bg-success-500 text-white px-4 py-3 rounded-lg font-bold shadow-lg">
            <CheckCircle className="h-6 w-6" /> VERIFIED TOURIST - ACTIVE STATUS
          </div>
        </div>
      </div>

      {isGroupRegistration && (
        <div className="card">
          <h3 className="text-xl font-bold mb-4 flex items-center"><Users className="h-6 w-6 mr-2 text-primary-600" />Group Members ({touristData.group.length})</h3>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="text-left py-3 px-4 font-semibold">Name</th>
                  <th className="text-left py-3 px-4 font-semibold">ID Proof</th>
                  <th className="text-left py-3 px-4 font-semibold">Blood Group</th>
                </tr>
              </thead>
              <tbody>
                {touristData.group.map((member, index) => {
                  const memberIdProof = member.touristType === 'domestic'
                      ? `Aadhaar: ${member.aadhaarNumber || 'N/A'}`
                      : `Passport: ${member.passportNumber || 'N/A'}`;
                  return (
                    <tr key={index} className="border-t">
                      <td className="py-3 px-4 font-medium">{member.fullName}</td>
                      <td className="py-3 px-4">{memberIdProof}</td>
                      <td className="py-3 px-4">{member.bloodGroup || 'N/A'}</td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <button onClick={downloadQR} className="card hover:shadow-lg transition-shadow text-center"><Download className="h-8 w-8 text-primary-600 mx-auto mb-2" /><p className="font-semibold text-sm">Download QR</p></button>
        <button className="card hover:shadow-lg transition-shadow text-center"><Share2 className="h-8 w-8 text-primary-600 mx-auto mb-2" /><p className="font-semibold text-sm">Share Card</p></button>
        <button className="card hover:shadow-lg transition-shadow text-center"><Printer className="h-8 w-8 text-primary-600 mx-auto mb-2" /><p className="font-semibold text-sm">Print Card</p></button>
      </div>
    </div>
  )
}

export default MyTouristCard;