import { useState } from 'react'
import { CreditCard, QrCode, Search, CheckCircle, XCircle, Download, Printer } from 'lucide-react'
import QRCode from 'qrcode.react'

const SmartIDSystem = () => {
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCard, setSelectedCard] = useState(null)

  const touristCards = [
    {
      id: 'TID-2024-001',
      name: 'John Anderson',
      country: 'USA',
      passport: 'US123456789',
      phone: '+1 555-0123',
      email: 'john@email.com',
      emergencyContact: '+1 555-0124',
      hotel: 'Oberoi Amarvilas, Agra',
      checkIn: '2024-01-15',
      checkOut: '2024-01-25',
      status: 'Active',
      photo: '👤',
      verified: true
    },
    {
      id: 'TID-2024-002',
      name: 'Sarah Williams',
      country: 'UK',
      passport: 'UK987654321',
      phone: '+44 20 7123 4567',
      email: 'sarah@email.com',
      emergencyContact: '+44 20 7123 4568',
      hotel: 'The Leela Palace, Delhi',
      checkIn: '2024-01-18',
      checkOut: '2024-01-28',
      status: 'Active',
      photo: '👤',
      verified: true
    },
    {
      id: 'TID-2024-003',
      name: 'Hans Mueller',
      country: 'Germany',
      passport: 'DE456789123',
      phone: '+49 30 12345678',
      email: 'hans@email.com',
      emergencyContact: '+49 30 12345679',
      hotel: 'Rambagh Palace, Jaipur',
      checkIn: '2024-01-20',
      checkOut: '2024-01-30',
      status: 'Pending',
      photo: '👤',
      verified: false
    },
  ]

  const filteredCards = touristCards.filter(card =>
    card.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
    card.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    card.passport.toLowerCase().includes(searchTerm.toLowerCase())
  )

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold text-gray-900">Smart Tourist ID System</h2>
        <p className="text-gray-600 mt-1">Digital tourist cards with QR/NFC technology and biometric integration</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="card bg-gradient-to-br from-primary-500 to-primary-600 text-white">
          <p className="text-primary-100 text-sm">Total Cards Issued</p>
          <p className="text-4xl font-bold mt-1">2,847</p>
        </div>
        <div className="card bg-gradient-to-br from-success-500 to-success-600 text-white">
          <p className="text-success-100 text-sm">Active Cards</p>
          <p className="text-4xl font-bold mt-1">2,450</p>
        </div>
        <div className="card bg-gradient-to-br from-warning-500 to-warning-600 text-white">
          <p className="text-warning-100 text-sm">Pending Verification</p>
          <p className="text-4xl font-bold mt-1">285</p>
        </div>
        <div className="card bg-gradient-to-br from-danger-500 to-danger-600 text-white">
          <p className="text-danger-100 text-sm">Expired Cards</p>
          <p className="text-4xl font-bold mt-1">112</p>
        </div>
      </div>

      {/* Search */}
      <div className="card">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
          <input
            type="text"
            placeholder="Search by Tourist ID, Name, or Passport..."
            className="input-field pl-10"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      {/* Tourist Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredCards.map((card) => (
          <div key={card.id} className="card border-2 border-gray-200 hover:border-primary-500 hover:shadow-xl transition-all">
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className="h-16 w-16 bg-gradient-to-br from-primary-500 to-primary-600 rounded-full flex items-center justify-center text-3xl">
                  {card.photo}
                </div>
                <div>
                  <h3 className="font-bold text-lg text-gray-900">{card.name}</h3>
                  <p className="text-sm text-gray-600">{card.country}</p>
                  <p className="text-xs text-gray-500 font-mono">{card.id}</p>
                </div>
              </div>
              {card.verified ? (
                <CheckCircle className="h-6 w-6 text-success-500" />
              ) : (
                <XCircle className="h-6 w-6 text-warning-500" />
              )}
            </div>

            <div className="space-y-2 mb-4 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-600">Passport:</span>
                <span className="font-semibold">{card.passport}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Phone:</span>
                <span className="font-semibold">{card.phone}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Status:</span>
                <span className={`px-2 py-1 rounded-full text-xs font-semibold ${
                  card.status === 'Active' ? 'bg-success-100 text-success-700' : 'bg-warning-100 text-warning-700'
                }`}>
                  {card.status}
                </span>
              </div>
            </div>

            <button 
              onClick={() => setSelectedCard(card)}
              className="w-full btn-primary"
            >
              <QrCode className="inline h-4 w-4 mr-2" />
              View Digital Card
            </button>
          </div>
        ))}
      </div>

      {/* Digital Card Modal */}
      {selectedCard && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl max-w-2xl w-full">
            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-2xl font-bold text-gray-900">Smart Tourist ID Card</h3>
                <button
                  onClick={() => setSelectedCard(null)}
                  className="text-gray-500 hover:text-gray-700 text-2xl"
                >
                  ×
                </button>
              </div>

              {/* Digital Card Design */}
              <div className="bg-gradient-to-br from-primary-600 to-primary-800 rounded-2xl p-8 text-white mb-6 shadow-2xl">
                <div className="flex items-start justify-between mb-6">
                  <div>
                    <p className="text-primary-200 text-sm mb-1">Tourist Safety System</p>
                    <h4 className="text-2xl font-bold">Digital Tourist Card</h4>
                  </div>
                  <CreditCard className="h-12 w-12 text-primary-200" />
                </div>

                <div className="flex gap-6 mb-6">
                  <div className="h-24 w-24 bg-white rounded-lg flex items-center justify-center text-6xl">
                    {selectedCard.photo}
                  </div>
                  <div className="flex-1">
                    <p className="text-2xl font-bold mb-1">{selectedCard.name}</p>
                    <p className="text-primary-100 mb-1">{selectedCard.country}</p>
                    <p className="text-primary-200 text-sm font-mono">{selectedCard.id}</p>
                    <div className="mt-2 flex items-center gap-2">
                      {selectedCard.verified && (
                        <span className="bg-success-500 text-white px-2 py-1 rounded-full text-xs font-semibold flex items-center gap-1">
                          <CheckCircle className="h-3 w-3" />
                          Verified
                        </span>
                      )}
                      <span className="bg-white/20 backdrop-blur px-2 py-1 rounded-full text-xs font-semibold">
                        {selectedCard.status}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4 mb-6">
                  <div>
                    <p className="text-primary-200 text-xs mb-1">Passport Number</p>
                    <p className="font-semibold">{selectedCard.passport}</p>
                  </div>
                  <div>
                    <p className="text-primary-200 text-xs mb-1">Phone</p>
                    <p className="font-semibold">{selectedCard.phone}</p>
                  </div>
                  <div>
                    <p className="text-primary-200 text-xs mb-1">Check-in Date</p>
                    <p className="font-semibold">{selectedCard.checkIn}</p>
                  </div>
                  <div>
                    <p className="text-primary-200 text-xs mb-1">Check-out Date</p>
                    <p className="font-semibold">{selectedCard.checkOut}</p>
                  </div>
                </div>

                <div className="bg-white/10 backdrop-blur rounded-lg p-3">
                  <p className="text-primary-100 text-xs mb-1">Emergency Contact</p>
                  <p className="font-semibold text-lg">{selectedCard.emergencyContact}</p>
                </div>
              </div>

              {/* QR Code Section */}
              <div className="bg-gray-50 rounded-xl p-6 mb-6">
                <div className="flex items-center justify-between">
                  <div>
                    <h5 className="font-bold text-lg mb-1">Digital QR Code</h5>
                    <p className="text-sm text-gray-600">Scan for instant verification</p>
                  </div>
                  <div className="bg-white p-4 rounded-lg shadow-md">
                    <QRCode 
                      value={JSON.stringify({
                        id: selectedCard.id,
                        name: selectedCard.name,
                        passport: selectedCard.passport,
                        country: selectedCard.country,
                        emergency: selectedCard.emergencyContact
                      })}
                      size={150}
                      level="H"
                      includeMargin={true}
                    />
                  </div>
                </div>
              </div>

              {/* Card Details */}
              <div className="grid grid-cols-2 gap-4 mb-6">
                <div className="border-l-4 border-primary-600 pl-4">
                  <p className="text-sm text-gray-600">Email Address</p>
                  <p className="font-semibold">{selectedCard.email}</p>
                </div>
                <div className="border-l-4 border-primary-600 pl-4">
                  <p className="text-sm text-gray-600">Current Hotel</p>
                  <p className="font-semibold">{selectedCard.hotel}</p>
                </div>
              </div>

              {/* Actions */}
              <div className="flex gap-3">
                <button className="flex-1 btn-primary">
                  <Download className="inline h-4 w-4 mr-2" />
                  Download Card
                </button>
                <button className="flex-1 bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 font-medium">
                  <Printer className="inline h-4 w-4 mr-2" />
                  Print Card
                </button>
                <button className="flex-1 bg-gray-600 text-white px-4 py-2 rounded-lg hover:bg-gray-700 font-medium">
                  Send via Email
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default SmartIDSystem