// src/pages/Tourist/MyTouristCard.jsx
import React, { useEffect, useState } from 'react'
import QRCode from 'qrcode.react'
import { useAuth } from '../../components/Auth/AuthContext'
import { Download, Share2, Printer, CheckCircle, Phone, Mail, MapPin, User, Shield, AlertTriangle, Loader } from 'lucide-react' // Added icons, removed unused

const MyTouristCard = () => {
  const { user } = useAuth()
  const [myMembers, setMyMembers] = useState([])

  useEffect(() => {
    const allTourists = JSON.parse(localStorage.getItem('allTourists') || '[]')
    const touristGroups = JSON.parse(localStorage.getItem('touristGroups') || '[]')
    let membersList = []

    // Prioritize groupId from user if available
    const userGroupId = user?.groupId
    if (userGroupId) {
      const group = touristGroups.find(g => g.groupId === userGroupId)
      if (group?.members) {
        membersList = allTourists.filter(t => group.members.includes(t.touristId))
      }
    }
    // Fallback 1: If no groupId, find latest group registered by the user's email
    else if (user?.email) {
      const userGroups = touristGroups.filter(g => g.registeredBy === user.email)
        .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)) // Sort by creation date descending
      if (userGroups.length > 0 && userGroups[0]?.members) {
        membersList = allTourists.filter(t => userGroups[0].members.includes(t.touristId))
      }
    }

    // Fallback 2: If still no members found, get directly registered tourists by user's email
    if ((!membersList || membersList.length === 0) && user?.email) {
      membersList = allTourists.filter(t => t.registeredBy === user.email)
    }

    setMyMembers(membersList)
  }, [user]) // Re-run if user object changes

  const downloadQR = (touristId) => {
    const canvas = document.getElementById(`card-qr-${touristId}`)
    if (!canvas) {
      console.error(`Canvas element with ID card-qr-${touristId} not found.`);
      alert('QR Code generation failed.')
      return
    }
    const pngUrl = canvas.toDataURL("image/png").replace("image/png", "image/octet-stream")
    const a = document.createElement("a")
    a.href = pngUrl
    a.download = `${touristId}.png`
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
  }

  const shareCard = (member) => {
    // Determine the correct ID label and number based on member's ID type
    const idLabel = member.idType === 'aadhaar' ? 'Aadhaar' : 'Passport'
    const idNumber = member.idType === 'aadhaar' ? member.aadhaarNumber : member.passportNumber

    const payload = `Tourist Card\nName: ${member.fullName}\nTourist ID: ${member.touristId}\n${idLabel}: ${idNumber}\nBlood Group: ${member.bloodGroup || 'N/A'}\nEmergency Contact: ${member.emergencyContactPhone || member.emergencyContact || 'N/A'}`

    if (navigator.share) {
      navigator.share({ title: 'Smart Tourist Card', text: payload })
        .catch((error) => console.log('Error sharing:', error))
    } else {
      // Fallback for browsers that don't support navigator.share
      navigator.clipboard.writeText(payload).then(() => {
        alert('Card details copied to clipboard!')
      }).catch(err => {
        console.error('Failed to copy card details: ', err)
        alert('Failed to copy card details.')
      })
    }
  }

  const printCard = (touristId) => {
    const cardElement = document.getElementById(`card-${touristId}`)
    if (!cardElement) {
      console.error(`Card element with ID card-${touristId} not found.`);
      alert('Could not prepare card for printing.');
      return;
    }
    const printWindow = window.open('', '_blank', 'width=800,height=700');
    if (!printWindow) {
      alert('Please allow popups for printing.');
      return;
    }
    printWindow.document.write(`
      <html>
        <head>
          <title>Print Tourist Card</title>
          <style>
            body { font-family: Arial, Helvetica, sans-serif; padding: 20px; }
            .card { width: 100%; border-radius: 12px; padding: 20px; background: #f7f9ff; box-shadow: 0 4px 6px rgba(0,0,0,0.1); }
            /* Add any specific print styles if needed */
          </style>
        </head>
        <body>${cardElement.outerHTML}</body>
      </html>
    `);
    printWindow.document.close();
    printWindow.focus();
    setTimeout(() => {
      printWindow.print();
      printWindow.close();
    }, 500);
  };

  if (!myMembers || myMembers.length === 0) {
    return (
      <div className="max-w-2xl mx-auto">
        <div className="card text-center p-6">
          <QrCode className="h-24 w-24 text-gray-300 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-gray-900 mb-2">No Tourist Cards Found</h2>
          <p className="text-gray-600 mb-6">Please complete your registration to generate Smart Tourist Cards for your group members.</p>
          <button onClick={() => navigate('/tourist/registration')} className="btn-primary">
            Complete Registration
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="max-w-5xl mx-auto space-y-6 p-4">
      <div>
        <h2 className="text-3xl font-bold text-gray-900">My Tourist Card{myMembers.length > 1 ? 's' : ''}</h2>
        <p className="text-gray-600 mt-1">Your digital safety passport</p>
      </div>

      <div className="grid grid-cols-1 md:grid-grid-cols-2 gap-6">
        {myMembers.map((member) => {
          // Dynamically determine ID label and number
          const idLabel = member.idType === 'aadhaar' ? 'Aadhaar' : 'Passport'
          const idNumber = member.idType === 'aadhaar' ? member.aadhaarNumber : member.passportNumber
          
          const emergencyContactDisplay = member.emergencyContactPhone || member.emergencyContact || 'N/A'
          const bloodGroupDisplay = member.bloodGroup || 'N/A'
          const validTillDisplay = member.checkOutDate || '—'
          const genderDisplay = member.gender || '—'

          return (
            <div key={member.touristId} id={`card-${member.touristId}`} className="card relative shadow-lg hover:shadow-xl transition-shadow">
              <div className="flex items-start gap-4">
                <div className="h-20 w-20 bg-gray-100 rounded-lg flex items-center justify-center text-3xl text-gray-500">👤</div>
                <div className="flex-1">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="text-xl font-bold text-gray-900">{member.fullName}</h3>
                      <p className="text-sm text-gray-500">Tourist ID: <span className="font-mono text-primary-600">{member.touristId}</span></p>
                      <p className="text-sm text-gray-600 mt-1">{idLabel}: {idNumber}</p>
                      <p className="text-sm text-gray-600 mt-1">Blood: {bloodGroupDisplay}</p>
                      <p className="text-sm text-gray-600 mt-1">Emergency: {emergencyContactDisplay}</p>
                    </div>
                    <div className="bg-white p-3 rounded-xl shadow-lg">
                      <QRCode id={`card-qr-${member.touristId}`} value={JSON.stringify(member)} size={110} level="H" includeMargin={true} />
                    </div>
                  </div>

                  <div className="mt-4 grid grid-cols-2 gap-3">
                    <button onClick={() => downloadQR(member.touristId)} className="btn-primary flex items-center justify-center gap-2">
                      <Download className="h-4 w-4" /> Download QR
                    </button>
                    <button onClick={() => shareCard(member)} className="bg-gray-600 text-white px-4 py-2 rounded flex items-center justify-center gap-2 hover:bg-gray-700">
                      <Share2 className="h-4 w-4" /> Share
                    </button>
                  </div>
                </div>
              </div>

              <div className="mt-4 flex items-center justify-between bg-primary-50 p-3 rounded-lg">
                <div className="flex items-center gap-2">
                  <p className="text-sm font-semibold text-primary-900">Gender:</p>
                  <p className="text-sm text-gray-700">{genderDisplay}</p>
                </div>
                <div className="flex items-center gap-2">
                  <p className="text-sm font-semibold text-primary-900">Valid Till:</p>
                  <p className="font-semibold">{validTillDisplay}</p>
                </div>
              </div>

              <div className="mt-4 text-green-600 flex items-center justify-center gap-2 text-sm font-semibold bg-success-100 py-3 rounded-lg">
                <CheckCircle className="h-5 w-5" />
                VERIFIED TOURIST - ACTIVE STATUS
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default MyTouristCard