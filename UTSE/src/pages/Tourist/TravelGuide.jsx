// import { MapPin, Star, Camera, Utensils, Hotel, Clock, DollarSign, Info } from 'lucide-react'

// const TravelGuide = () => {
//   const touristSpots = [
//     {
//       name: 'Taj Mahal',
//       location: 'Agra, Uttar Pradesh',
//       rating: 4.8,
//       image: '🕌',
//       category: 'Monument',
//       bestTime: 'Oct-Mar (Winter)',
//       entryFee: '₹50 (Indians), $20 (Foreigners)',
//       timings: '6:00 AM - 7:00 PM (Closed Friday)',
//       timeNeeded: '2-3 hours',
//       description: 'One of the Seven Wonders of the World, an ivory-white marble mausoleum',
//       tips: [
//         'Visit early morning for best photography',
//         'Book tickets online to avoid queues',
//         'Sunset view from Mehtab Bagh is spectacular'
//       ],
//       safetyScore: 95
//     },
//     {
//       name: 'Red Fort',
//       location: 'Delhi',
//       rating: 4.6,
//       image: '🏰',
//       category: 'Historical',
//       bestTime: 'Oct-Mar',
//       entryFee: '₹35 (Indians), ₹500 (Foreigners)',
//       timings: '9:30 AM - 4:30 PM',
//       timeNeeded: '2-3 hours',
//       description: 'Historic fortified palace of Mughal emperors',
//       tips: [
//         'Attend the Light & Sound show in evening',
//         'Carry water bottle and wear comfortable shoes',
//         'Avoid weekends for less crowd'
//       ],
//       safetyScore: 88
//     },
//     {
//       name: 'Gateway of India',
//       location: 'Mumbai, Maharashtra',
//       rating: 4.5,
//       image: '🚪',
//       category: 'Monument',
//       bestTime: 'Oct-Feb',
//       entryFee: 'Free',
//       timings: 'Open 24 hours',
//       timeNeeded: '1-2 hours',
//       description: 'Iconic monument overlooking the Arabian Sea',
//       tips: [
//         'Visit during sunset for beautiful views',
//         'Take a ferry to Elephanta Caves nearby',
//         'Be careful of your belongings in crowded areas'
//       ],
//       safetyScore: 82
//     }
//   ]

//   const localCuisine = [
//     {
//       dish: 'Butter Chicken',
//       description: 'Creamy tomato-based curry with tender chicken pieces',
//       origin: 'North India',
//       price: '₹300-500',
//       spiceLevel: 'Medium',
//       vegetarian: false,
//       mustTry: true
//     },
//     {
//       dish: 'Biryani',
//       description: 'Fragrant rice dish with meat/vegetables and aromatic spices',
//       origin: 'Hyderabad/Lucknow',
//       price: '₹250-400',
//       spiceLevel: 'Medium-High',
//       vegetarian: false,
//       mustTry: true
//     },
//     {
//       dish: 'Masala Dosa',
//       description: 'Crispy rice crepe filled with spiced potato filling',
//       origin: 'South India',
//       price: '₹60-150',
//       spiceLevel: 'Low-Medium',
//       vegetarian: true,
//       mustTry: true
//     },
//     {
//       dish: 'Paneer Tikka',
//       description: 'Grilled cottage cheese marinated in spices',
//       origin: 'North India',
//       price: '₹200-350',
//       spiceLevel: 'Medium',
//       vegetarian: true,
//       mustTry: true
//     }
//   ]

//   const culturalTips = [
//     {
//       title: 'Namaste 🙏',
//       description: 'Traditional Indian greeting. Join palms together and say "Namaste"'
//     },
//     {
//       title: 'Shoes Off 👞',
//       description: 'Remove shoes before entering temples, mosques, and homes'
//     },
//     {
//       title: 'Right Hand ✋',
//       description: 'Use right hand for eating and giving/receiving items'
//     },
//     {
//       title: 'Dress Modestly 👗',
//       description: 'Cover shoulders and knees when visiting religious places'
//     },
//     {
//       title: 'Photography 📸',
//       description: 'Ask permission before photographing people or inside temples'
//     },
//     {
//       title: 'Bargaining 💰',
//       description: 'Haggling is common in markets, expected to pay 50-70% of asking price'
//     }
//   ]

//   const travelTips = [
//     'Best time to visit India: October to March (Pleasant weather)',
//     'Download offline maps before traveling',
//     'Carry small denominations of cash (many places don\'t accept cards)',
//     'Try local street food from busy, popular stalls',
//     'Learn basic Hindi phrases: "Kitna hai?" (How much?), "Dhanyavaad" (Thank you)',
//     'Use ride-sharing apps (Uber, Ola) for safe transportation',
//     'Stay hydrated - drink bottled water only',
//     'Respect local customs and dress codes'
//   ]

//   return (
//     <div className="space-y-6">
//       <div>
//         <h2 className="text-3xl font-bold text-gray-900">Travel Guide</h2>
//         <p className="text-gray-600 mt-1">Explore India's rich culture, cuisine, and heritage</p>
//       </div>

//       {/* Quick Stats */}
//       <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
//         <div className="card bg-gradient-to-br from-primary-500 to-primary-600 text-white text-center">
//           <MapPin className="h-8 w-8 mx-auto mb-2" />
//           <p className="text-2xl font-bold">50+</p>
//           <p className="text-sm text-primary-100">Tourist Spots</p>
//         </div>
//         <div className="card bg-gradient-to-br from-success-500 to-success-600 text-white text-center">
//           <Utensils className="h-8 w-8 mx-auto mb-2" />
//           <p className="text-2xl font-bold">200+</p>
//           <p className="text-sm text-success-100">Local Dishes</p>
//         </div>
//         <div className="card bg-gradient-to-br from-warning-500 to-warning-600 text-white text-center">
//           <Hotel className="h-8 w-8 mx-auto mb-2" />
//           <p className="text-2xl font-bold">1000+</p>
//           <p className="text-sm text-warning-100">Hotels</p>
//         </div>
//         <div className="card bg-gradient-to-br from-purple-500 to-purple-600 text-white text-center">
//           <Camera className="h-8 w-8 mx-auto mb-2" />
//           <p className="text-2xl font-bold">38</p>
//           <p className="text-sm text-purple-100">UNESCO Sites</p>
//         </div>
//       </div>

//       {/* Top Tourist Spots */}
//       <div className="card">
//         <h3 className="text-xl font-bold mb-4 flex items-center">
//           <MapPin className="h-6 w-6 mr-2 text-primary-600" />
//           Must-Visit Tourist Destinations
//         </h3>
//         <div className="grid grid-cols-1 gap-6">
//           {touristSpots.map((spot, index) => (
//             <div key={index} className="border border-gray-200 rounded-lg p-6 hover:shadow-lg transition-shadow">
//               <div className="flex items-start gap-4">
//                 <div className="text-6xl">{spot.image}</div>
//                 <div className="flex-1">
//                   <div className="flex items-start justify-between mb-2">
//                     <div>
//                       <h4 className="text-2xl font-bold text-gray-900">{spot.name}</h4>
//                       <p className="text-gray-600 flex items-center gap-1">
//                         <MapPin className="h-4 w-4" />
//                         {spot.location}
//                       </p>
//                     </div>
//                     <div className="text-right">
//                       <div className="flex items-center gap-1 mb-1">
//                         <Star className="h-5 w-5 text-yellow-500 fill-yellow-500" />
//                         <span className="font-bold text-lg">{spot.rating}</span>
//                       </div>
//                       <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
//                         spot.safetyScore >= 90 ? 'bg-success-100 text-success-700' :
//                         spot.safetyScore >= 80 ? 'bg-warning-100 text-warning-700' :
//                         'bg-danger-100 text-danger-700'
//                       }`}>
//                         Safety: {spot.safetyScore}%
//                       </span>
//                     </div>
//                   </div>

//                   <p className="text-gray-700 mb-4">{spot.description}</p>

//                   <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-4">
//                     <div className="bg-gray-50 p-3 rounded-lg">
//                       <div className="flex items-center gap-2 text-sm text-gray-600 mb-1">
//                         <Clock className="h-4 w-4" />
//                         <span>Timings</span>
//                       </div>
//                       <p className="text-xs font-semibold text-gray-900">{spot.timings}</p>
//                     </div>
//                     <div className="bg-gray-50 p-3 rounded-lg">
//                       <div className="flex items-center gap-2 text-sm text-gray-600 mb-1">
//                         <DollarSign className="h-4 w-4" />
//                         <span>Entry Fee</span>
//                       </div>
//                       <p className="text-xs font-semibold text-gray-900">{spot.entryFee}</p>
//                     </div>
//                     <div className="bg-gray-50 p-3 rounded-lg">
//                       <div className="flex items-center gap-2 text-sm text-gray-600 mb-1">
//                         <Clock className="h-4 w-4" />
//                         <span>Time Needed</span>
//                       </div>
//                       <p className="text-xs font-semibold text-gray-900">{spot.timeNeeded}</p>
//                     </div>
//                     <div className="bg-gray-50 p-3 rounded-lg">
//                       <div className="flex items-center gap-2 text-sm text-gray-600 mb-1">
//                         <Info className="h-4 w-4" />
//                         <span>Best Time</span>
//                       </div>
//                       <p className="text-xs font-semibold text-gray-900">{spot.bestTime}</p>
//                     </div>
//                   </div>

//                   <div className="bg-primary-50 p-4 rounded-lg">
//                     <p className="font-semibold text-primary-900 mb-2">💡 Travel Tips:</p>
//                     <ul className="space-y-1">
//                       {spot.tips.map((tip, idx) => (
//                         <li key={idx} className="text-sm text-primary-800 flex items-start gap-2">
//                           <span className="text-primary-600">•</span>
//                           <span>{tip}</span>
//                         </li>
//                       ))}
//                     </ul>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           ))}
//         </div>
//       </div>

//       {/* Local Cuisine */}
//       <div className="card">
//         <h3 className="text-xl font-bold mb-4 flex items-center">
//           <Utensils className="h-6 w-6 mr-2 text-primary-600" />
//           Must-Try Local Cuisine
//         </h3>
//         <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//           {localCuisine.map((food, index) => (
//             <div key={index} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
//               <div className="flex items-start justify-between mb-2">
//                 <div>
//                   <h4 className="font-bold text-lg text-gray-900 flex items-center gap-2">
//                     {food.dish}
//                     {food.mustTry && <span className="text-xs bg-danger-100 text-danger-700 px-2 py-1 rounded-full font-semibold">Must Try!</span>}
//                     {food.vegetarian && <span className="text-xs bg-success-100 text-success-700 px-2 py-1 rounded-full font-semibold">🌱 Veg</span>}
//                   </h4>
//                   <p className="text-sm text-gray-600">{food.origin}</p>
//                 </div>
//               </div>
//               <p className="text-gray-700 mb-3 text-sm">{food.description}</p>
//               <div className="flex items-center justify-between">
//                 <span className="text-primary-600 font-bold">{food.price}</span>
//                 <span className={`px-2 py-1 rounded text-xs font-semibold ${
//                   food.spiceLevel.includes('Low') ? 'bg-success-100 text-success-700' :
//                   food.spiceLevel.includes('Medium') ? 'bg-warning-100 text-warning-700' :
//                   'bg-danger-100 text-danger-700'
//                 }`}>
//                   🌶️ {food.spiceLevel}
//                 </span>
//               </div>
//             </div>
//           ))}
//         </div>
//       </div>

//       {/* Cultural Etiquette */}
//       <div className="card bg-purple-50 border-2 border-purple-300">
//         <h3 className="text-xl font-bold mb-4 text-purple-900">🙏 Cultural Etiquette & Tips</h3>
//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
//           {culturalTips.map((tip, index) => (
//             <div key={index} className="bg-white p-4 rounded-lg border border-purple-200">
//               <h4 className="font-bold text-purple-900 mb-2">{tip.title}</h4>
//               <p className="text-sm text-gray-700">{tip.description}</p>
//             </div>
//           ))}
//         </div>
//       </div>

//       {/* General Travel Tips */}
//       <div className="card">
//         <h3 className="text-xl font-bold mb-4">✈️ Essential Travel Tips</h3>
//         <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
//           {travelTips.map((tip, index) => (
//             <div key={index} className="flex items-start gap-2 bg-gray-50 p-3 rounded-lg">
//               <div className="h-2 w-2 bg-primary-600 rounded-full mt-2 flex-shrink-0"></div>
//               <p className="text-gray-700">{tip}</p>
//             </div>
//           ))}
//         </div>
//       </div>

//       {/* Weather Guide */}
//       <div className="card bg-gradient-to-r from-warning-500 to-warning-600 text-white">
//         <h3 className="text-xl font-bold mb-4">🌤️ Best Time to Visit India</h3>
//         <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
//           <div className="bg-white/20 backdrop-blur rounded-lg p-4">
//             <h4 className="font-bold mb-2">Winter (Oct-Mar)</h4>
//             <p className="text-sm text-warning-100">Best time for tourists. Pleasant weather (10-25°C). Perfect for sightseeing.</p>
//           </div>
//           <div className="bg-white/20 backdrop-blur rounded-lg p-4">
//             <h4 className="font-bold mb-2">Summer (Apr-Jun)</h4>
//             <p className="text-sm text-warning-100">Very hot (30-45°C). Visit hill stations. Carry sunscreen and stay hydrated.</p>
//           </div>
//           <div className="bg-white/20 backdrop-blur rounded-lg p-4">
//             <h4 className="font-bold mb-2">Monsoon (Jul-Sep)</h4>
//             <p className="text-sm text-warning-100">Heavy rainfall. Beautiful landscapes but travel disruptions possible.</p>
//           </div>
//         </div>
//       </div>
//     </div>
//   )
// }

// export default TravelGuide

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useAuth } from '../../components/Auth/AuthContext';
import LocationTracker from '../../components/Shared/LocationTracker';

const TravelGuide = () => {
  const { user } = useAuth();
  const [attractions, setAttractions] = useState([]);
  const [currentLocation, setCurrentLocation] = useState(null);
  const [selectedAttraction, setSelectedAttraction] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('attractions');

  useEffect(() => {
    // Simulate fetching travel guide information based on current location
    const fetchTravelGuide = async () => {
      try {
        setIsLoading(true);

        // In a real app, you would fetch this from your API
        await new Promise(resolve => setTimeout(resolve, 1000));

        // Mock data - in a real app, this would come from your API
        const mockAttractions = [
          {
            id: 1,
            name: "Historical Monument",
            description: "A UNESCO World Heritage Site with ancient architecture and rich history.",
            location: "City Center",
            distance: "1.2 km from your location",
            rating: 4.8,
            safetyScore: 85,
            openingHours: "9:00 AM - 6:00 PM",
            entryFee: "₹200 for foreigners, ₹50 for locals",
            image: "https://via.placeholder.com/300x200?text=Historical+Monument",
            tips: [
              "Arrive early to avoid crowds",
              "Wear comfortable shoes for walking on uneven surfaces",
              "Hire a local guide for a more informative experience"
            ]
          },
          {
            id: 2,
            name: "Cultural Museum",
            description: "Showcasing the region's art, artifacts, and cultural heritage.",
            location: "Cultural District",
            distance: "2.5 km from your location",
            rating: 4.5,
            safetyScore: 90,
            openingHours: "10:00 AM - 5:00 PM",
            entryFee: "₹150 for foreigners, ₹30 for locals",
            image: "https://via.placeholder.com/300x200?text=Cultural+Museum",
            tips: [
              "Check for special exhibitions",
              "Photography may be restricted in certain areas",
              "Allow at least 2 hours for a comprehensive visit"
            ]
          },
          {
            id: 3,
            name: "Scenic Viewpoint",
            description: "Panoramic views of the city and surrounding landscapes.",
            location: "Hilltop",
            distance: "3.8 km from your location",
            rating: 4.7,
            safetyScore: 75,
            openingHours: "Sunrise to Sunset",
            entryFee: "Free",
            image: "https://via.placeholder.com/300x200?text=Scenic+Viewpoint",
            tips: [
              "Visit during golden hour for best photos",
              "Bring water and wear sunscreen",
              "Be cautious of steep paths and edges"
            ]
          },
          {
            id: 4,
            name: "Local Market",
            description: "A vibrant market offering traditional crafts, textiles, and local cuisine.",
            location: "Old Town",
            distance: "1.8 km from your location",
            rating: 4.6,
            safetyScore: 70,
            openingHours: "10:00 AM - 8:00 PM",
            entryFee: "Free entry",
            image: "https://via.placeholder.com/300x200?text=Local+Market",
            tips: [
              "Bargain politely for better prices",
              "Try local street food but choose busy stalls",
              "Keep your belongings secure in crowded areas"
            ]
          }
        ];

        const mockTransport = [
          {
            id: 1,
            name: "Metro System",
            description: "Fast and efficient way to get around the city",
            routes: [
              {
                name: "Red Line",
                stations: ["City Center", "Business District", "Airport"],
                frequency: "Every 5-10 minutes",
                safetyScore: 90
              },
              {
                name: "Blue Line",
                stations: ["Tourist Zone", "Historical District", "University"],
                frequency: "Every 7-12 minutes",
                safetyScore: 85
              }
            ],
            tips: [
              "Validate your ticket before boarding",
              "Keep your belongings secure",
              "Avoid crowded cars during peak hours"
            ]
          },
          {
            id: 2,
            name: "Tourist Buses",
            description: "Hop-on hop-off buses with multiple routes",
            routes: [
              {
                name: "Heritage Route",
                stops: ["Historical Monument", "Cultural Museum", "Old Town"],
                frequency: "Every 30 minutes",
                safetyScore: 80
              },
              {
                name: "Scenic Route",
                stops: ["Scenic Viewpoint", "Botanical Garden", "Lakefront"],
                frequency: "Every 45 minutes",
                safetyScore: 75
              }
            ],
            tips: [
              "Purchase tickets in advance for discounts",
              "Listen to the audio guide for historical information",
              "Keep your ticket until the end of your journey"
            ]
          },
          {
            id: 3,
            name: "Registered Taxis",
            description: "Safe and convenient transportation",
            types: [
              {
                name: "Standard Taxi",
                description: "Regular taxis available throughout the city",
                safetyScore: 85
              },
              {
                name: "Premium Taxi",
                description: "Higher-end vehicles with additional amenities",
                safetyScore: 90
              }
            ],
            tips: [
              "Use only registered taxis with proper identification",
              "Agree on the fare before starting your journey",
              "Keep your seatbelt fastened at all times"
            ]
          }
        ];

        const mockAccommodation = [
          {
            id: 1,
            name: "Luxury Hotel",
            description: "5-star accommodation with premium amenities",
            location: "Business District",
            distance: "4.2 km from your location",
            rating: 4.9,
            safetyScore: 95,
            priceRange: "₹15,000 - ₹25,000 per night",
            amenities: ["Spa", "Pool", "24/7 Security", "Restaurant"],
            image: "https://via.placeholder.com/300x200?text=Luxury+Hotel"
          },
          {
            id: 2,
            name: "Boutique Hotel",
            description: "Stylish mid-range hotel with personalized service",
            location: "Tourist Zone",
            distance: "1.5 km from your location",
            rating: 4.6,
            safetyScore: 90,
            priceRange: "₹5,000 - ₹10,000 per night",
            amenities: ["Free WiFi", "Breakfast Included", "24/7 Front Desk", "Room Service"],
            image: "https://via.placeholder.com/300x200?text=Boutique+Hotel"
          },
          {
            id: 3,
            name: "Budget Guesthouse",
            description: "Affordable accommodation with basic amenities",
            location: "Near City Center",
            distance: "0.8 km from your location",
            rating: 4.2,
            safetyScore: 80,
            priceRange: "₹1,500 - ₹3,000 per night",
            amenities: ["Free WiFi", "Shared Kitchen", "24/7 Security", "Laundry Service"],
            image: "https://via.placeholder.com/300x200?text=Budget+Guesthouse"
          }
        ];

        setAttractions(mockAttractions);
        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching travel guide:", error);
        setIsLoading(false);
      }
    };

    fetchTravelGuide();
  }, [currentLocation]);

  const handleAttractionSelect = (attraction) => {
    setSelectedAttraction(attraction);
  };

  const handleTabChange = (tab) => {
    setActiveTab(tab);
    setSelectedAttraction(null);
  };

  return (
    <div className="space-y-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="bg-white p-6 rounded-lg shadow-md"
      >
        <h2 className="text-2xl font-bold text-indigo-800 mb-4">Travel Guide</h2>
        <p className="text-gray-600 mb-6">
          Discover the best attractions, transportation options, and accommodation in your area.
        </p>

        <div className="flex flex-wrap gap-2 mb-6">
          <button
            onClick={() => handleTabChange('attractions')}
            className={`px-4 py-2 rounded-md text-sm font-medium ${activeTab === 'attractions' ? 'bg-indigo-600 text-white' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'}`}
          >
            Attractions
          </button>
          <button
            onClick={() => handleTabChange('transport')}
            className={`px-4 py-2 rounded-md text-sm font-medium ${activeTab === 'transport' ? 'bg-indigo-600 text-white' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'}`}
          >
            Transportation
          </button>
          <button
            onClick={() => handleTabChange('accommodation')}
            className={`px-4 py-2 rounded-md text-sm font-medium ${activeTab === 'accommodation' ? 'bg-indigo-600 text-white' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'}`}
          >
            Accommodation
          </button>
        </div>

        {activeTab === 'attractions' && (
          <>
            {isLoading ? (
              <div className="flex justify-center items-center py-12">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-500"></div>
              </div>
            ) : (
              <>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {attractions.map((attraction) => (
                    <motion.div
                      key={attraction.id}
                      whileHover={{ scale: 1.03 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => handleAttractionSelect(attraction)}
                      className={`border rounded-lg overflow-hidden cursor-pointer transition-all ${selectedAttraction?.id === attraction.id ? 'ring-2 ring-indigo-500 shadow-lg' : 'hover:shadow-md'}`}
                    >
                      <div className="h-40 overflow-hidden">
                        <img
                          src={attraction.image}
                          alt={attraction.name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="p-4">
                        <div className="flex justify-between items-start">
                          <h3 className="font-semibold text-lg text-gray-800">{attraction.name}</h3>
                          <div className="flex items-center">
                            <span className="text-sm font-medium text-green-600">{attraction.safetyScore}/100</span>
                            <div className="w-20 h-2 bg-gray-200 rounded-full ml-2">
                              <div
                                className="h-full bg-green-500"
                                style={{ width: `${attraction.safetyScore}%` }}
                              ></div>
                            </div>
                          </div>
                        </div>
                        <p className="text-sm text-gray-500 mt-1">{attraction.description}</p>
                        <div className="mt-3 flex justify-between text-sm">
                          <div>
                            <i className="fas fa-star text-yellow-500 mr-1"></i>
                            <span className="font-medium">{attraction.rating}</span>
                          </div>
                          <div className="text-gray-500">
                            <i className="fas fa-map-marker-alt mr-1"></i>
                            {attraction.distance}
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </>
            )}
          </>
        )}

        {activeTab === 'transport' && (
          <div className="space-y-6">
            <h3 className="text-lg font-semibold text-gray-800 mb-2">Transportation Options</h3>
            <p className="text-gray-600 mb-4">
              Information about safe and reliable transportation in the area.
            </p>

            <div className="space-y-6">
              {[
                {
                  id: 1,
                  name: "Metro System",
                  description: "Fast and efficient way to get around the city",
                  icon: "fas fa-subway",
                  safetyScore: 90,
                  tips: [
                    "Validate your ticket before boarding",
                    "Keep your belongings secure",
                    "Avoid crowded cars during peak hours"
                  ]
                },
                {
                  id: 2,
                  name: "Tourist Buses",
                  description: "Hop-on hop-off buses with multiple routes",
                  icon: "fas fa-bus",
                  safetyScore: 80,
                  tips: [
                    "Purchase tickets in advance for discounts",
                    "Listen to the audio guide for historical information",
                    "Keep your ticket until the end of your journey"
                  ]
                },
                {
                  id: 3,
                  name: "Registered Taxis",
                  description: "Safe and convenient transportation",
                  icon: "fas fa-taxi",
                  safetyScore: 85,
                  tips: [
                    "Use only registered taxis with proper identification",
                    "Agree on the fare before starting your journey",
                    "Keep your seatbelt fastened at all times"
                  ]
                }
              ].map((transport) => (
                <motion.div
                  key={transport.id}
                  whileHover={{ scale: 1.01 }}
                  className="border rounded-lg p-4 hover:shadow-md transition-shadow"
                >
                  <div className="flex items-start">
                    <div className="w-12 h-12 bg-indigo-100 rounded-full flex items-center justify-center mr-4">
                      <i className={`${transport.icon} text-indigo-600 text-lg`}></i>
                    </div>
                    <div>
                      <h4 className="font-medium text-gray-800">{transport.name}</h4>
                      <p className="text-gray-600 mt-1">{transport.description}</p>
                      <div className="mt-3 flex items-center">
                        <div className="flex items-center mr-4">
                          <span className="text-sm font-medium text-green-600">{transport.safetyScore}/100</span>
                          <div className="w-24 h-2 bg-gray-200 rounded-full ml-2">
                            <div
                              className="h-full bg-green-500"
                              style={{ width: `${transport.safetyScore}%` }}
                            ></div>
                          </div>
                        </div>
                      </div>
                      <div className="mt-3">
                        <h5 className="font-medium text-gray-700 mb-1">Safety Tips:</h5>
                        <ul className="list-disc pl-5 space-y-1 text-gray-600">
                          {transport.tips.map((tip, index) => (
                            <li key={index}>{tip}</li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'accommodation' && (
          <div className="space-y-6">
            <h3 className="text-lg font-semibold text-gray-800 mb-2">Accommodation Options</h3>
            <p className="text-gray-600 mb-4">
              Information about safe and reliable places to stay in the area.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[
                {
                  id: 1,
                  name: "Luxury Hotel",
                  description: "5-star accommodation with premium amenities",
                  location: "Business District",
                  distance: "4.2 km from your location",
                  rating: 4.9,
                  safetyScore: 95,
                  priceRange: "₹15,000 - ₹25,000 per night",
                  amenities: ["Spa", "Pool", "24/7 Security", "Restaurant"],
                  image: "https://via.placeholder.com/300x200?text=Luxury+Hotel"
                },
                {
                  id: 2,
                  name: "Boutique Hotel",
                  description: "Stylish mid-range hotel with personalized service",
                  location: "Tourist Zone",
                  distance: "1.5 km from your location",
                  rating: 4.6,
                  safetyScore: 90,
                  priceRange: "₹5,000 - ₹10,000 per night",
                  amenities: ["Free WiFi", "Breakfast Included", "24/7 Front Desk", "Room Service"],
                  image: "https://via.placeholder.com/300x200?text=Boutique+Hotel"
                },
                {
                  id: 3,
                  name: "Budget Guesthouse",
                  description: "Affordable accommodation with basic amenities",
                  location: "Near City Center",
                  distance: "0.8 km from your location",
                  rating: 4.2,
                  safetyScore: 80,
                  priceRange: "₹1,500 - ₹3,000 per night",
                  amenities: ["Free WiFi", "Shared Kitchen", "24/7 Security", "Laundry Service"],
                  image: "https://via.placeholder.com/300x200?text=Budget+Guesthouse"
                }
              ].map((accommodation) => (
                <motion.div
                  key={accommodation.id}
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.98 }}
                  className="border rounded-lg overflow-hidden hover:shadow-md transition-shadow"
                >
                  <div className="h-40 overflow-hidden">
                    <img
                      src={accommodation.image}
                      alt={accommodation.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="p-4">
                    <div className="flex justify-between items-start">
                      <h3 className="font-semibold text-lg text-gray-800">{accommodation.name}</h3>
                      <div className="flex items-center">
                        <span className="text-sm font-medium text-green-600">{accommodation.safetyScore}/100</span>
                        <div className="w-20 h-2 bg-gray-200 rounded-full ml-2">
                          <div
                            className="h-full bg-green-500"
                            style={{ width: `${accommodation.safetyScore}%` }}
                          ></div>
                        </div>
                      </div>
                    </div>
                    <p className="text-sm text-gray-500 mt-1">{accommodation.description}</p>
                    <div className="mt-3 flex justify-between text-sm">
                      <div>
                        <i className="fas fa-star text-yellow-500 mr-1"></i>
                        <span className="font-medium">{accommodation.rating}</span>
                      </div>
                      <div className="text-gray-500">
                        <i className="fas fa-map-marker-alt mr-1"></i>
                        {accommodation.distance}
                      </div>
                    </div>
                    <div className="mt-3">
                      <p className="text-sm font-medium text-gray-700">{accommodation.priceRange}</p>
                    </div>
                    <div className="mt-2 flex flex-wrap gap-2">
                      {accommodation.amenities.map((amenity, index) => (
                        <span key={index} className="text-xs bg-gray-100 px-2 py-1 rounded-full">
                          {amenity}
                        </span>
                      ))}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        )}
      </motion.div>

      {selectedAttraction && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="bg-white p-6 rounded-lg shadow-md"
        >
          <div className="flex flex-col md:flex-row items-start">
            <div className="md:w-1/3 md:mr-6 mb-6 md:mb-0">
              <img
                src={selectedAttraction.image}
                alt={selectedAttraction.name}
                className="w-full h-64 object-cover rounded-lg"
              />
            </div>
            <div className="md:w-2/3">
              <h2 className="text-2xl font-bold text-indigo-800 mb-2">{selectedAttraction.name}</h2>
              <div className="flex items-center mb-4">
                <div className="flex items-center mr-6">
                  <i className="fas fa-star text-yellow-500 mr-1"></i>
                  <span className="font-medium">{selectedAttraction.rating}</span>
                </div>
                <div className="flex items-center">
                  <span className="text-sm font-medium text-green-600 mr-2">{selectedAttraction.safetyScore}/100</span>
                  <div className="w-32 h-2 bg-gray-200 rounded-full">
                    <div
                      className="h-full bg-green-500"
                      style={{ width: `${selectedAttraction.safetyScore}%` }}
                    ></div>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <div>
                  <p className="text-sm text-gray-500"><i className="fas fa-map-marker-alt text-indigo-500 mr-1"></i>Location</p>
                  <p className="font-medium">{selectedAttraction.location}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500"><i className="fas fa-road text-indigo-500 mr-1"></i>Distance</p>
                  <p className="font-medium">{selectedAttraction.distance}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500"><i className="fas fa-clock text-indigo-500 mr-1"></i>Opening Hours</p>
                  <p className="font-medium">{selectedAttraction.openingHours}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500"><i className="fas fa-money-bill-wave text-indigo-500 mr-1"></i>Entry Fee</p>
                  <p className="font-medium">{selectedAttraction.entryFee}</p>
                </div>
              </div>

              <div className="mb-4">
                <h3 className="text-lg font-semibold text-gray-800 mb-2">Description</h3>
                <p className="text-gray-700">{selectedAttraction.description}</p>
              </div>

              <div className="mb-4">
                <h3 className="text-lg font-semibold text-gray-800 mb-2">Safety Tips</h3>
                <ul className="list-disc pl-5 space-y-2 text-gray-700">
                  {selectedAttraction.tips.map((tip, index) => (
                    <li key={index}>{tip}</li>
                  ))}
                </ul>
              </div>

              <div className="mt-6 pt-6 border-t border-gray-200">
                <h3 className="text-lg font-semibold text-gray-800 mb-2">How to Get There</h3>
                <p className="text-gray-700 mb-2">
                  {selectedAttraction.name} is located at {selectedAttraction.location}.
                </p>
                <div className="space-y-3">
                  <div className="flex items-start">
                    <div className="w-8 h-8 bg-indigo-100 rounded-full flex items-center justify-center mr-3">
                      <i className="fas fa-subway text-indigo-600 text-lg"></i>
                    </div>
                    <div>
                      <h4 className="font-medium text-gray-800">By Metro</h4>
                      <p className="text-gray-600">Take the Red Line to {selectedAttraction.location} station</p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <div className="w-8 h-8 bg-indigo-100 rounded-full flex items-center justify-center mr-3">
                      <i className="fas fa-taxi text-indigo-600 text-lg"></i>
                    </div>
                    <div>
                      <h4 className="font-medium text-gray-800">By Taxi</h4>
                      <p className="text-gray-600">Approximate fare: ₹{Math.floor(Math.random() * 100 + 50)}</p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <div className="w-8 h-8 bg-indigo-100 rounded-full flex items-center justify-center mr-3">
                      <i className="fas fa-walking text-indigo-600 text-lg"></i>
                    </div>
                    <div>
                      <h4 className="font-medium text-gray-800">By Foot</h4>
                      <p className="text-gray-600">Approximate walking time: {Math.floor(Math.random() * 30 + 10)} minutes</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      )}

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.4 }}
        className="bg-white p-6 rounded-lg shadow-md"
      >
        <h2 className="text-2xl font-bold text-indigo-800 mb-4">Current Location Safety</h2>
        <LocationTracker />
      </motion.div>
    </div>
  );
};

export default TravelGuide;