import { useState } from 'react'
import { Download, Share2, Printer, QrCode, CheckCircle, Phone, Mail, MapPin } from 'lucide-react'
import QRCodeReact from 'qrcode.react'

const MyTouristCard = () => {
  const touristData = JSON.parse(localStorage.getItem('touristData') || '{}')
  
  if (!touristData.touristId) {
    return (
      <div className="max-w-2xl mx-auto">
        <div className="card text-center">
          <QrCode className="h-24 w-24 text-gray-300 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-gray-900 mb-2">No Tourist Card Found</h2>
          <p className="text-gray-600 mb-6">Please complete your registration to get your Smart Tourist Card</p>
          <button 
            onClick={() => window.location.href = '/tourist/registration'}
            className="btn-primary"
          >
            Complete Registration
          </button>
        </div>
      </div>
    )
  }

  const downloadQR = () => {
    const canvas = document.getElementById('card-qr-code')
    const pngUrl = canvas
      .toDataURL("image/png")
      .replace("image/png", "image/octet-stream")
    let downloadLink = document.createElement("a")
    downloadLink.href = pngUrl
    downloadLink.download = `tourist-card-${touristData.passportNumber}.png`
    document.body.appendChild(downloadLink)
    downloadLink.click()
    document.body.removeChild(downloadLink)
  }

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div>
        <h2 className="text-3xl font-bold text-gray-900">My Smart Tourist Card</h2>
        <p className="text-gray-600 mt-1">Your digital identity for safe travel in India</p>
      </div>

      {/* Digital Card */}
      <div className="card">
        <div className="bg-gradient-to-br from-primary-600 to-primary-800 rounded-2xl p-8 text-white shadow-2xl">
          <div className="flex items-start justify-between mb-6">
            <div>
              <p className="text-primary-200 text-sm mb-1">India Tourism • Ministry of Tourism</p>
              <h3 className="text-3xl font-bold">Smart Tourist Card</h3>
              <p className="text-primary-200 text-sm mt-1">Digital Safety Passport</p>
            </div>
            <div className="bg-white p-3 rounded-xl shadow-lg">
              <QRCodeReact 
                id="card-qr-code"
                value={JSON.stringify(touristData)}
                size={120}
                level="H"
                includeMargin={true}
              />
            </div>
          </div>

          <div className="flex gap-6 mb-6">
            <div className="h-36 w-36 bg-white rounded-xl flex items-center justify-center text-7xl shadow-lg">
              👤
            </div>
            <div className="flex-1">
              <h4 className="text-3xl font-bold mb-3">{touristData.fullName}</h4>
              <div className="space-y-2">
                <div className="flex items-center gap-2 bg-white/10 backdrop-blur rounded-lg px-3 py-2">
                  <span className="text-primary-200 text-sm font-medium">Tourist ID:</span>
                  <span className="font-mono font-bold text-lg">{touristData.touristId}</span>
                </div>
                <div className="flex items-center gap-2 bg-white/10 backdrop-blur rounded-lg px-3 py-2">
                  <span className="text-primary-200 text-sm font-medium">Passport:</span>
                  <span className="font-semibold">{touristData.passportNumber}</span>
                </div>
                <div className="flex items-center gap-2 bg-white/10 backdrop-blur rounded-lg px-3 py-2">
                  <span className="text-primary-200 text-sm font-medium">Country:</span>
                  <span className="font-semibold">{touristData.country}</span>
                </div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-3 mb-4">
            <div className="bg-white/10 backdrop-blur rounded-lg p-3">
              <p className="text-primary-200 text-xs mb-1">Gender</p>
              <p className="font-semibold">{touristData.gender}</p>
            </div>
            <div className="bg-white/10 backdrop-blur rounded-lg p-3">
              <p className="text-primary-200 text-xs mb-1">Blood Group</p>
              <p className="font-semibold">{touristData.bloodGroup || 'N/A'}</p>
            </div>
            <div className="bg-white/10 backdrop-blur rounded-lg p-3">
              <p className="text-primary-200 text-xs mb-1">Valid Till</p>
              <p className="font-semibold">{touristData.checkOutDate}</p>
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
            <CheckCircle className="h-6 w-6" />
            VERIFIED TOURIST - ACTIVE STATUS
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <button onClick={downloadQR} className="card hover:shadow-lg transition-shadow text-center">
          <Download className="h-8 w-8 text-primary-600 mx-auto mb-2" />
          <p className="font-semibold text-sm">Download QR</p>
        </button>
        <button className="card hover:shadow-lg transition-shadow text-center">
          <Share2 className="h-8 w-8 text-primary-600 mx-auto mb-2" />
          <p className="font-semibold text-sm">Share Card</p>
        </button>
        <button className="card hover:shadow-lg transition-shadow text-center">
          <Printer className="h-8 w-8 text-primary-600 mx-auto mb-2" />
          <p className="font-semibold text-sm">Print Card</p>
        </button>
        <button className="card hover:shadow-lg transition-shadow text-center">
          <Mail className="h-8 w-8 text-primary-600 mx-auto mb-2" />
          <p className="font-semibold text-sm">Email Card</p>
        </button>
      </div>

      {/* Card Details */}
      <div className="card">
        <h3 className="text-xl font-bold mb-4">Complete Card Information</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="border-l-4 border-primary-600 pl-4">
            <p className="text-sm text-gray-600">Full Name</p>
            <p className="font-semibold text-gray-900">{touristData.fullName}</p>
          </div>
          <div className="border-l-4 border-primary-600 pl-4">
            <p className="text-sm text-gray-600">Date of Birth</p>
            <p className="font-semibold text-gray-900">{touristData.dateOfBirth}</p>
          </div>
          <div className="border-l-4 border-primary-600 pl-4">
            <p className="text-sm text-gray-600">Email</p>
            <p className="font-semibold text-gray-900">{touristData.email}</p>
          </div>
          <div className="border-l-4 border-primary-600 pl-4">
            <p className="text-sm text-gray-600">Phone</p>
            <p className="font-semibold text-gray-900">{touristData.phone}</p>
          </div>
          <div className="border-l-4 border-primary-600 pl-4">
            <p className="text-sm text-gray-600">Hotel</p>
            <p className="font-semibold text-gray-900">{touristData.hotelName}</p>
          </div>
          <div className="border-l-4 border-primary-600 pl-4">
            <p className="text-sm text-gray-600">Hotel Address</p>
            <p className="font-semibold text-gray-900">{touristData.hotelAddress}</p>
          </div>
          <div className="border-l-4 border-primary-600 pl-4">
            <p className="text-sm text-gray-600">Check-in Date</p>
            <p className="font-semibold text-gray-900">{touristData.checkInDate}</p>
          </div>
          <div className="border-l-4 border-primary-600 pl-4">
            <p className="text-sm text-gray-600">Check-out Date</p>
            <p className="font-semibold text-gray-900">{touristData.checkOutDate}</p>
          </div>
          {touristData.medicalConditions && (
            <div className="border-l-4 border-danger-600 pl-4 md:col-span-2">
              <p className="text-sm text-gray-600">Medical Conditions</p>
              <p className="font-semibold text-gray-900">{touristData.medicalConditions}</p>
            </div>
          )}
          {touristData.allergies && (
            <div className="border-l-4 border-danger-600 pl-4 md:col-span-2">
              <p className="text-sm text-gray-600">Allergies</p>
              <p className="font-semibold text-gray-900">{touristData.allergies}</p>
            </div>
          )}
        </div>
      </div>

      {/* Important Notice */}
      <div className="card bg-warning-50 border-2 border-warning-300">
        <h4 className="font-bold text-warning-900 mb-2">⚠️ Important Instructions</h4>
        <ul className="space-y-2 text-sm text-warning-800">
          <li>• Always carry your Tourist Card QR code (digital or printed)</li>
          <li>• Show this card at tourist attractions for priority assistance</li>
          <li>• In case of emergency, authorities can scan your QR code for instant information</li>
          <li>• Keep your emergency contact updated</li>
          <li>• Report any suspicious activity using the app</li>
        </ul>
      </div>
    </div>
  )
}

export default MyTouristCard