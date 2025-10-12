// import { useState } from 'react'
// import { Languages, Volume2, Copy, Star, BookOpen, MessageCircle, Loader } from 'lucide-react'
// import { motion } from 'framer-motion'
// import axios from 'axios'  // For API calls

// const LanguageTranslator = () => {
//   const [inputText, setInputText] = useState('')
//   const [translatedText, setTranslatedText] = useState('')
//   const [fromLang, setFromLang] = useState('en')
//   const [toLang, setToLang] = useState('hi')
//   const [loading, setLoading] = useState(false)
//   const [error, setError] = useState('')

//   const languages = [
//     { code: 'en', name: 'English', flag: '🇬🇧' },
//     { code: 'hi', name: 'Hindi', flag: '🇮🇳' },
//     { code: 'bn', name: 'Bengali', flag: '🇮🇳' },
//     { code: 'te', name: 'Telugu', flag: '🇮🇳' },
//     { code: 'mr', name: 'Marathi', flag: '🇮🇳' },
//     { code: 'ta', name: 'Tamil', flag: '🇮🇳' },
//     { code: 'gu', name: 'Gujarati', flag: '🇮🇳' },
//     { code: 'kn', name: 'Kannada', flag: '🇮🇳' },
//     { code: 'ml', name: 'Malayalam', flag: '🇮🇳' },
//     { code: 'pa', name: 'Punjabi', flag: '🇮🇳' },
//     { code: 'es', name: 'Spanish', flag: '🇪🇸' },
//     { code: 'fr', name: 'French', flag: '🇫🇷' },
//     { code: 'de', name: 'German', flag: '🇩🇪' },
//     { code: 'ja', name: 'Japanese', flag: '🇯🇵' },
//     { code: 'zh', name: 'Chinese', flag: '🇨🇳' },
//     { code: 'ru', name: 'Russian', flag: '🇷🇺' }
//   ]

//   const commonPhrases = [
//     {
//       category: 'Greetings',
//       icon: '👋',
//       phrases: [
//         { en: 'Hello', hi: 'नमस्ते (Namaste)', pronunciation: 'Nuh-muh-stay' },
//         { en: 'Good Morning', hi: 'सुप्रभात (Suprabhat)', pronunciation: 'Soo-pruh-bhat' },
//         { en: 'Thank You', hi: 'धन्यवाद (Dhanyavaad)', pronunciation: 'Dhun-yuh-vaad' },
//         { en: 'Please', hi: 'कृपया (Kripya)', pronunciation: 'Krip-yaa' },
//         { en: 'Sorry', hi: 'माफ़ करें (Maaf Karen)', pronunciation: 'Maaf Kuh-ren' }
//       ]
//     },
//     {
//       category: 'Emergency',
//       icon: '🚨',
//       phrases: [
//         { en: 'Help!', hi: 'मदद! (Madad!)', pronunciation: 'Muh-dud' },
//         { en: 'Call Police', hi: 'पुलिस बुलाओ (Police Bulao)', pronunciation: 'Police Boo-lao' },
//         { en: 'I need a doctor', hi: 'मुझे डॉक्टर चाहिए (Mujhe Doctor Chahiye)', pronunciation: 'Moo-jhe Doctor Cha-hee-ye' },
//         { en: 'Emergency', hi: 'आपातकाल (Aapatkaal)', pronunciation: 'Aa-paat-kaal' },
//         { en: 'Hospital', hi: 'अस्पताल (Aspatal)', pronunciation: 'Us-pa-taal' }
//       ]
//     },
//     {
//       category: 'Directions',
//       icon: '🗺️',
//       phrases: [
//         { en: 'Where is...?', hi: 'कहाँ है...? (Kahan Hai...?)', pronunciation: 'Kuh-haan Hai' },
//         { en: 'How far?', hi: 'कितनी दूर? (Kitni Door?)', pronunciation: 'Kit-nee Door' },
//         { en: 'Left', hi: 'बाएं (Baayen)', pronunciation: 'Baa-yen' },
//         { en: 'Right', hi: 'दाएं (Daayen)', pronunciation: 'Daa-yen' },
//         { en: 'Straight', hi: 'सीधे (Seedhe)', pronunciation: 'See-dhe' }
//       ]
//     },
//     {
//       category: 'Shopping',
//       icon: '🛍️',
//       phrases: [
//         { en: 'How much?', hi: 'कितना है? (Kitna Hai?)', pronunciation: 'Kit-naa Hai' },
//         { en: 'Too expensive', hi: 'बहुत महंगा (Bahut Mahanga)', pronunciation: 'Buh-hut Muh-hun-gaa' },
//         { en: 'Cheaper', hi: 'सस्ता (Sasta)', pronunciation: 'Suss-taa' },
//         { en: 'I want this', hi: 'मुझे यह चाहिए (Mujhe Yeh Chahiye)', pronunciation: 'Moo-jhe Yeh Cha-hee-ye' },
//         { en: 'No, thank you', hi: 'नहीं, धन्यवाद (Nahi, Dhanyavaad)', pronunciation: 'Nuh-hee, Dhun-yuh-vaad' }
//       ]
//     },
//     {
//       category: 'Food & Dining',
//       icon: '🍽️',
//       phrases: [
//         { en: 'I am vegetarian', hi: 'मैं शाकाहारी हूँ (Main Shakahari Hoon)', pronunciation: 'Main Shaa-kaa-haa-ree Hoon' },
//         { en: 'Water, please', hi: 'पानी, कृपया (Paani, Kripya)', pronunciation: 'Paa-nee, Krip-yaa' },
//         { en: 'Bill, please', hi: 'बिल, कृपया (Bill, Kripya)', pronunciation: 'Bill, Krip-yaa' },
//         { en: 'Delicious', hi: 'स्वादिष्ट (Swadisht)', pronunciation: 'Swaa-dishth' },
//         { en: 'Not spicy', hi: 'तीखा नहीं (Teekha Nahi)', pronunciation: 'Tee-khaa Nuh-hee' }
//       ]
//     }
//   ]

//   const handleTranslate = async () => {
//     if (!inputText.trim()) {
//       setError('Please enter text to translate')
//       return
//     }

//     setLoading(true)
//     setError('')
//     setTranslatedText('')

//     try {
//       console.log('Translating:', { text: inputText, from: fromLang, to: toLang })  // Debugging

//       const response = await axios.get('https://api.mymemory.translated.net/get', {
//         params: {
//           q: inputText,
//           langpair: `${fromLang}|${toLang}`
//         }
//       })

//       if (response.data.responseStatus === 200) {
//         setTranslatedText(response.data.responseData.translatedText)
//       } else {
//         throw new Error(`API Error: ${response.data.responseStatus}`)
//       }
//     } catch (err) {
//       console.error('Translation Error:', err)
//       setError(err.message.includes('API') ? 'Translation service is busy. Try again later.' : 'Network error. Check your connection.')
//     } finally {
//       setLoading(false)
//     }
//   }

//   const speakText = (text, lang = toLang) => {
//     if ('speechSynthesis' in window) {
//       const utterance = new SpeechSynthesisUtterance(text)
//       utterance.lang = lang
//       window.speechSynthesis.speak(utterance)
//     } else {
//       alert('Speech synthesis not supported in your browser')
//     }
//   }

//   const copyText = (text) => {
//     navigator.clipboard.writeText(text)
//       .then(() => alert('Copied to clipboard!'))
//       .catch(() => alert('Failed to copy'))
//   }

//   return (
//     <motion.div 
//       initial={{ opacity: 0, y: 20 }}
//       animate={{ opacity: 1, y: 0 }}
//       transition={{ duration: 0.5 }}
//       className="space-y-6"
//     >
//       <div>
//         <h2 className="text-3xl font-bold text-gray-900">Language Translator</h2>
//         <p className="text-gray-600 mt-1">Multi-language support for seamless communication 🌍</p>
//       </div>

//       {/* Instant Translator Section */}
//       <div className="card">
//         <h3 className="text-xl font-bold mb-4 flex items-center">
//           <Languages className="h-6 w-6 mr-2 text-primary-600" />
//           Instant Translator
//         </h3>
        
//         <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
//           <div>
//             <label className="block text-sm font-semibold text-gray-700 mb-2">From</label>
//             <select 
//               className="input-field"
//               value={fromLang}
//               onChange={(e) => setFromLang(e.target.value)}
//             >
//               <option value="en">Auto Detect</option>
//               {languages.map((lang) => (
//                 <option key={lang.code} value={lang.code}>
//                   {lang.flag} {lang.name}
//                 </option>
//               ))}
//             </select>
//           </div>
//           <div>
//             <label className="block text-sm font-semibold text-gray-700 mb-2">To</label>
//             <select 
//               className="input-field"
//               value={toLang}
//               onChange={(e) => setToLang(e.target.value)}
//             >
//               {languages.map((lang) => (
//                 <option key={lang.code} value={lang.code}>
//                   {lang.flag} {lang.name}
//                 </option>
//               ))}
//             </select>
//           </div>
//         </div>

//         <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//           <div>
//             <div className="flex items-center justify-between mb-2">
//               <label className="text-sm font-semibold text-gray-700">Enter Text</label>
//               <motion.button 
//                 whileHover={{ scale: 1.1 }}
//                 onClick={() => speakText(inputText, fromLang)}
//                 className="text-primary-600 hover:text-primary-700"
//                 title="Speak Input"
//               >
//                 <Volume2 className="h-5 w-5" />
//               </motion.button>
//             </div>
//             <textarea
//               className="input-field"
//               rows="6"
//               placeholder="Type something to translate... 📝"
//               value={inputText}
//               onChange={(e) => setInputText(e.target.value)}
//             ></textarea>
//           </div>
//           <div>
//             <div className="flex items-center justify-between mb-2">
//               <label className="text-sm font-semibold text-gray-700">Translation</label>
//               <div className="flex gap-2">
//                 <motion.button 
//                   whileHover={{ scale: 1.1 }}
//                   onClick={() => speakText(translatedText, toLang)}
//                   className="text-primary-600 hover:text-primary-700"
//                   title="Speak Translation"
//                 >
//                   <Volume2 className="h-5 w-5" />
//                 </motion.button>
//                 <motion.button 
//                   whileHover={{ scale: 1.1 }}
//                   onClick={() => copyText(translatedText)}
//                   className="text-primary-600 hover:text-primary-700"
//                   title="Copy Translation"
//                 >
//                   <Copy className="h-5 w-5" />
//                 </motion.button>
//               </div>
//             </div>
//             <textarea
//               className="input-field bg-gray-50"
//               rows="6"
//               placeholder="Translation will appear here... ✨"
//               value={translatedText}
//               readOnly
//             ></textarea>
//             {error && <p className="text-sm text-danger-600 mt-2">{error}</p>}
//           </div>
//         </div>

//         <motion.button 
//           whileHover={{ scale: 1.05 }}
//           whileTap={{ scale: 0.95 }}
//           onClick={handleTranslate}
//           disabled={loading}
//           className="w-full mt-4 btn-primary flex items-center justify-center"
//         >
//           {loading ? <Loader className="h-5 w-5 mr-2 animate-spin" /> : <Languages className="inline h-5 w-5 mr-2" />}
//           {loading ? 'Translating...' : 'Translate Now'}
//         </motion.button>
//       </div>

//       {/* Common Phrases Section (Kept and Rendered) */}
//       <div className="space-y-4">
//         <h3 className="text-xl font-bold flex items-center">
//           <BookOpen className="h-6 w-6 mr-2 text-primary-600" />
//           Common Phrases (English - Hindi)
//         </h3>
//         {commonPhrases.map((category, index) => (
//           <motion.div 
//             key={index}
//             initial={{ opacity: 0, y: 20 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ duration: 0.3, delay: index * 0.1 }}
//             className="card"
//           >
//             <h4 className="text-lg font-bold mb-4 flex items-center">
//               <span className="text-2xl mr-2">{category.icon}</span>
//               {category.category}
//             </h4>
//             <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
//               {category.phrases.map((phrase, idx) => (
//                 <motion.div 
//                   key={idx}
//                   whileHover={{ scale: 1.02 }}
//                   className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow"
//                 >
//                   <div className="flex items-start justify-between mb-2">
//                     <div className="flex-1">
//                       <p className="font-semibold text-gray-900 mb-1">{phrase.en}</p>
//                       <p className="text-primary-600 font-bold text-lg mb-1">{phrase.hi}</p>
//                       <p className="text-sm text-gray-500 italic">{phrase.pronunciation}</p>
//                     </div>
//                     <div className="flex gap-1">
//                       <motion.button 
//                         whileHover={{ scale: 1.1 }}
//                         onClick={() => speakText(phrase.hi)}
//                         className="p-2 text-primary-600 hover:bg-primary-50 rounded-lg"
//                         title="Speak"
//                       >
//                         <Volume2 className="h-4 w-4" />
//                       </motion.button>
//                       <motion.button 
//                         whileHover={{ scale: 1.1 }}
//                         onClick={() => copyText(phrase.hi)}
//                         className="p-2 text-primary-600 hover:bg-primary-50 rounded-lg"
//                         title="Copy"
//                       >
//                         <Copy className="h-4 w-4" />
//                       </motion.button>
//                     </div>
//                   </div>
//                 </motion.div>
//               ))}
//             </div>
//           </motion.div>
//         ))}
//       </div>

//       {/* Numbers Guide */}
//       <div className="card">
//         <h4 className="text-lg font-bold mb-4">🔢 Numbers (1-10)</h4>
//         <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
//           {[
//             { num: '1', hi: 'एक (Ek)' },
//             { num: '2', hi: 'दो (Do)' },
//             { num: '3', hi: 'तीन (Teen)' },
//             { num: '4', hi: 'चार (Chaar)' },
//             { num: '5', hi: 'पांच (Paanch)' },
//             { num: '6', hi: 'छह (Chhah)' },
//             { num: '7', hi: 'सात (Saat)' },
//             { num: '8', hi: 'आठ (Aath)' },
//             { num: '9', hi: 'नौ (Nau)' },
//             { num: '10', hi: 'दस (Das)' }
//           ].map((num, idx) => (
//             <div key={idx} className="bg-gray-50 p-3 rounded-lg text-center">
//               <p className="text-2xl font-bold text-primary-600 mb-1">{num.num}</p>
//               <p className="text-sm font-semibold text-gray-900">{num.hi}</p>
//             </div>
//           ))}
//         </div>
//       </div>

//       {/* Emergency Phrases Card */}
//       <div className="card bg-danger-50 border-2 border-danger-300">
//         <h4 className="text-lg font-bold text-danger-900 mb-4 flex items-center">
//           🚨 Emergency Phrases - Keep Handy!
//         </h4>
//         <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
//           {[
//             { en: 'I need help', hi: 'मुझे मदद चाहिए', pronunciation: 'Mujhe madad chahiye' },
//             { en: 'Call 100 (Police)', hi: '100 पर फोन करें', pronunciation: '100 par phone karen' },
//             { en: 'Where is hospital?', hi: 'अस्पताल कहाँ है?', pronunciation: 'Aspatal kahan hai?' },
//             { en: 'I am lost', hi: 'मैं खो गया हूँ', pronunciation: 'Main kho gaya hoon' }
//           ].map((phrase, idx) => (
//             <motion.div 
//               key={idx}
//               whileHover={{ scale: 1.02 }}
//               className="bg-white p-4 rounded-lg border border-danger-200"
//             >
//               <p className="font-bold text-gray-900 mb-1">{phrase.en}</p>
//               <p className="text-danger-600 font-bold text-lg mb-1">{phrase.hi}</p>
//               <p className="text-sm text-gray-600 italic mb-2">{phrase.pronunciation}</p>
//               <button 
//                 onClick={() => speakText(phrase.hi)}
//                 className="w-full bg-danger-600 text-white py-2 rounded-lg hover:bg-danger-700 font-semibold text-sm"
//               >
//                 <Volume2 className="inline h-4 w-4 mr-1" />
//                 Speak
//               </button>
//             </motion.div>
//           ))}
//         </div>
//       </div>

//       {/* Language Learning Tips */}
//       <div className="card bg-primary-50 border-2 border-primary-300">
//         <h4 className="text-lg font-bold text-primary-900 mb-3">💡 Language Tips for Tourists</h4>
//         <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm text-primary-800">
//           {[
//             'Indians appreciate when tourists try to speak Hindi, even basic words',
//             'Hand gestures are widely understood - pointing, nodding work universally',
//             'Many Indians in tourist areas speak English - don\'t hesitate to ask',
//             'Download offline translation apps before traveling to remote areas',
//             'Learn to say "Namaste" with folded hands - it\'s the universal greeting',
//             'Save important phrases in your phone for quick reference'
//           ].map((tip, idx) => (
//             <div key={idx} className="flex items-start gap-2 bg-white p-3 rounded-lg">
//               <Star className="h-5 w-5 text-primary-600 flex-shrink-0 mt-0.5" />
//               <span>{tip}</span>
//             </div>
//           ))}
//         </div>
//       </div>

//       {/* Voice Assistant Feature */}
//       <div className="card bg-gradient-to-r from-purple-600 to-purple-700 text-white">
//         <div className="flex items-center justify-between">
//           <div className="flex-1">
//             <h4 className="text-xl font-bold mb-2 flex items-center">
//               <MessageCircle className="h-6 w-6 mr-2" />
//               Voice Translation Assistant
//             </h4>
//             <p className="text-purple-100 mb-4">Speak in your language and get instant Hindi translation with pronunciation</p>
//             <button className="bg-white/20 hover:bg-white/30 backdrop-blur px-6 py-3 rounded-lg font-semibold">
//               🎤 Start Voice Translation
//             </button>
//           </div>
//           <div className="hidden md:block text-6xl">
//             🗣️
//           </div>
//         </div>
//       </div>
//     </motion.div>
//   )
// }


// export default LanguageTranslator

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const LanguageTranslator = () => {
  const [inputText, setInputText] = useState('');
  const [translatedText, setTranslatedText] = useState('');
  const [sourceLang, setSourceLang] = useState('en');
  const [targetLang, setTargetLang] = useState('hi');
  const [isTranslating, setIsTranslating] = useState(false);
  const [translationHistory, setTranslationHistory] = useState([]);
  const [commonPhrases, setCommonPhrases] = useState([]);
  const [activeTab, setActiveTab] = useState('translator');

  // Language options
  const languageOptions = [
    { code: 'en', name: 'English' },
    { code: 'hi', name: 'Hindi' },
    { code: 'bn', name: 'Bengali' },
    { code: 'te', name: 'Telugu' },
    { code: 'mr', name: 'Marathi' },
    { code: 'ta', name: 'Tamil' },
    { code: 'gu', name: 'Gujarati' },
    { code: 'kn', name: 'Kannada' },
    { code: 'ml', name: 'Malayalam' },
    { code: 'pa', name: 'Punjabi' },
    { code: 'or', name: 'Odia' },
    { code: 'as', name: 'Assamese' },
    { code: 'es', name: 'Spanish' },
    { code: 'fr', name: 'French' },
    { code: 'de', name: 'German' },
    { code: 'zh', name: 'Chinese' },
    { code: 'ja', name: 'Japanese' },
    { code: 'ar', name: 'Arabic' },
    { code: 'ru', name: 'Russian' },
    { code: 'pt', name: 'Portuguese' }
  ];

  // Common phrases for tourists
  const getCommonPhrases = () => {
    return [
      {
        category: 'Greetings',
        phrases: [
          { en: 'Hello', hi: 'नमस्ते' },
          { en: 'Good morning', hi: 'सुप्रभात' },
          { en: 'Good evening', hi: 'शुभ संध्या' },
          { en: 'How are you?', hi: 'आप कैसे हैं?' },
          { en: 'I am fine', hi: 'मैं ठीक हूँ' },
          { en: 'Thank you', hi: 'धन्यवाद' },
          { en: 'Please', hi: 'कृपया' },
          { en: 'Excuse me', hi: 'क्षमा करें' }
        ]
      },
      {
        category: 'Directions',
        phrases: [
          { en: 'Where is...?', hi: '...कहाँ है?' },
          { en: 'Where is the bathroom?', hi: 'शौचालय कहाँ है?' },
          { en: 'Where is the hotel?', hi: 'होटल कहाँ है?' },
          { en: 'Where is the airport?', hi: 'हवाई अड्डा कहाँ है?' },
          { en: 'Where is the train station?', hi: 'रेलवे स्टेशन कहाँ है?' },
          { en: 'How do I get to...?', hi: 'मैं ... कैसे पहुंचूँ?' },
          { en: 'Left', hi: 'बाएँ' },
          { en: 'Right', hi: 'दाएँ' },
          { en: 'Straight', hi: 'सीधा' }
        ]
      },
      {
        category: 'Emergency',
        phrases: [
          { en: 'Help!', hi: 'सहायता!' },
          { en: 'I need help', hi: 'मुझे मदद चाहिए' },
          { en: 'Call the police', hi: 'पुलिस को बुलाओ' },
          { en: 'Call an ambulance', hi: 'एम्बुलेंस बुलाओ' },
          { en: 'I am lost', hi: 'मैं खो गया हूँ' },
          { en: 'I don\'t understand', hi: 'मैं समझ नहीं पा रहा हूँ' },
          { en: 'I need a doctor', hi: 'मुझे डॉक्टर चाहिए' },
          { en: 'I need medicine', hi: 'मुझे दवा चाहिए' }
        ]
      },
      {
        category: 'Food',
        phrases: [
          { en: 'I am hungry', hi: 'मुझे भूख लगी है' },
          { en: 'I am vegetarian', hi: 'मैं शाकाहारी हूँ' },
          { en: 'I am vegan', hi: 'मैं वीगन हूँ' },
          { en: 'I am allergic to...', hi: 'मुझे ... से एलर्जी है' },
          { en: 'What is this?', hi: 'यह क्या है?' },
          { en: 'How much does it cost?', hi: 'इसका कितना खर्चा है?' },
          { en: 'I would like to order...', hi: 'मैं ... ऑर्डर करना चाहता हूँ' },
          { en: 'The bill, please', hi: 'बिल कृपया' }
        ]
      },
      {
        category: 'Shopping',
        phrases: [
          { en: 'How much is this?', hi: 'इसका कितना खर्चा है?' },
          { en: 'Can I pay by card?', hi: 'क्या मैं कार्ड से भुगतान कर सकता हूँ?' },
          { en: 'Do you accept credit cards?', hi: 'क्या आप क्रेडिट कार्ड स्वीकार करते हैं?' },
          { en: 'Can you give me a discount?', hi: 'क्या आप मुझे छूट दे सकते हैं?' },
          { en: 'I would like to buy...', hi: 'मैं ... खरीदना चाहता हूँ' },
          { en: 'Where is the fitting room?', hi: 'फिटिंग रूम कहाँ है?' },
          { en: 'I would like to return this', hi: 'मैं यह वापस करना चाहता हूँ' },
          { en: 'Do you have this in another size/color?', hi: 'क्या आपके पास यह दूसरे साइज/रंग में है?' }
        ]
      }
    ];
  };

  useEffect(() => {
    // Load common phrases
    setCommonPhrases(getCommonPhrases());
  }, []);

  const handleTranslate = async () => {
    if (!inputText.trim()) return;

    setIsTranslating(true);

    try {
      // Simulate translation API call
      await new Promise(resolve => setTimeout(resolve, 1000));

      // In a real app, you would call a translation API like Google Translate
      // For this demo, we'll use a simple mock translation

      // Mock translation - in a real app, you would use an actual translation API
      const mockTranslations = {
        en: {
          hi: "This is a mock translation to Hindi",
          es: "Esta es una traducción simulada al español",
          fr: "Ceci est une traduction simulée en français",
          de: "Dies ist eine simulierte Übersetzung ins Deutsche",
          ja: "これはドイツ語へのシミュレートされた翻訳です",
          zh: "这是一个模拟的中文翻译",
          ar: "هذا هو ترجمة محاكاة إلى العربية"
        },
        hi: {
          en: "This is a mock translation from Hindi",
          es: "Esta es una traducción simulada del hindi al español",
          fr: "Ceci est une traduction simulée de l'hindi au français",
          de: "Dies ist eine simulierte Übersetzung vom Hindi ins Deutsche",
          ja: "これはヒンディー語からのシミュレートされた翻訳です",
          zh: "这是一个从印地语模拟的翻译",
          ar: "هذا هو ترجمة محاكاة من الهندي إلى العربية"
        },
        es: {
          en: "This is a mock translation from Spanish",
          hi: "यह एक स्पैनिश से मॉक अनुवाद है",
          fr: "Ceci est une traduction simulée de l'espagnol",
          de: "Dies ist eine simulierte Übersetzung vom Spanischen",
          ja: "これはスペイン語からのシミュレートされた翻訳です",
          zh: "这是一个从西班牙语模拟的翻译",
          ar: "هذا هو ترجمة محاكاة من الإسبانية"
        }
      };

      // Get the target language code
      const targetCode = languageOptions.find(lang => lang.code === targetLang)?.code || 'hi';

      // Get the translation
      const translation = mockTranslations[sourceLang]?.[targetCode] || `This is a mock translation of your text from ${sourceLang} to ${targetLang}`;

      setTranslatedText(translation);

      // Add to translation history
      setTranslationHistory(prev => [
        {
          id: Date.now(),
          original: inputText,
          translated: translation,
          sourceLang,
          targetLang,
          timestamp: new Date().toLocaleString()
        },
        ...prev.slice(0, 4) // Keep only the last 5 translations
      ]);
    } catch (error) {
      console.error('Translation error:', error);
      setTranslatedText('Error translating text. Please try again.');
    } finally {
      setIsTranslating(false);
    }
  };

  const handlePhraseClick = (phrase) => {
    setInputText(phrase.en);
    setSourceLang('en');
    setTargetLang('hi');
    setTranslatedText('');
  };

  const handleSwapLanguages = () => {
    setSourceLang(targetLang);
    setTargetLang(sourceLang);
  };

  const handleClear = () => {
    setInputText('');
    setTranslatedText('');
  };

  const handleClearHistory = () => {
    setTranslationHistory([]);
  };

  return (
    <div className="space-y-6">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="text-3xl font-bold text-gray-800">Language Translator</h1>
        <p className="text-gray-600">Translate between languages and learn common phrases</p>
      </motion.div>

      <div className="bg-white p-6 rounded-lg shadow-md">
        <div className="flex flex-col md:flex-row justify-between items-center mb-6">
          <div className="flex space-x-2">
            <button
              onClick={() => setActiveTab('translator')}
              className={`px-4 py-2 rounded-t-lg ${activeTab === 'translator' ? 'bg-indigo-600 text-white' : 'bg-gray-200 text-gray-700'}`}
            >
              Translator
            </button>
            <button
              onClick={() => setActiveTab('phrases')}
              className={`px-4 py-2 rounded-t-lg ${activeTab === 'phrases' ? 'bg-indigo-600 text-white' : 'bg-gray-200 text-gray-700'}`}
            >
              Common Phrases
            </button>
          </div>
        </div>

        {activeTab === 'translator' ? (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-gray-700 text-sm font-bold mb-2">
                  Source Language
                </label>
                <select
                  value={sourceLang}
                  onChange={(e) => setSourceLang(e.target.value)}
                  className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                >
                  {languageOptions.map(lang => (
                    <option key={lang.code} value={lang.code}>
                      {lang.name}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-gray-700 text-sm font-bold mb-2">
                  Target Language
                </label>
                <select
                  value={targetLang}
                  onChange={(e) => setTargetLang(e.target.value)}
                  className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                >
                  {languageOptions.map(lang => (
                    <option key={lang.code} value={lang.code}>
                      {lang.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="flex justify-center">
              <button
                onClick={handleSwapLanguages}
                className="p-2 bg-gray-200 rounded-full hover:bg-gray-300 transition-colors"
                title="Swap languages"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7l4-4m0 0l4 4m-4-4v18m0 0l-4 4m4-4l4-4" />
                </svg>
              </button>
            </div>

            <div className="grid grid-cols-1 gap-6">
              <div>
                <label className="block text-gray-700 text-sm font-bold mb-2">
                  Enter Text to Translate
                </label>
                <textarea
                  value={inputText}
                  onChange={(e) => setInputText(e.target.value)}
                  rows="5"
                  className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  placeholder="Type or paste text to translate..."
                ></textarea>
              </div>

              <div className="flex justify-between items-center">
                <button
                  onClick={handleClear}
                  className="px-4 py-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300 transition-colors"
                >
                  Clear
                </button>

                <button
                  onClick={handleTranslate}
                  disabled={isTranslating || !inputText.trim()}
                  className={`px-6 py-2 rounded-md text-white font-medium ${isTranslating ? 'bg-indigo-400' : 'bg-indigo-600 hover:bg-indigo-700'} transition-colors`}
                >
                  {isTranslating ? (
                    <>
                      <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Translating...
                    </>
                  ) : 'Translate'}
                </button>
              </div>
            </div>

            {translatedText && (
              <div>
                <label className="block text-gray-700 text-sm font-bold mb-2">
                  Translated Text
                </label>
                <div className="p-4 bg-gray-50 rounded-md border border-gray-200">
                  <p className="whitespace-pre-wrap">{translatedText}</p>
                </div>
              </div>
            )}
          </div>
        ) : (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {commonPhrases.map((category) => (
                <div key={category.category} className="bg-gray-50 p-4 rounded-lg">
                  <h3 className="font-semibold text-gray-800 mb-3">{category.category}</h3>
                  <div className="space-y-2">
                    {category.phrases.map((phrase, index) => (
                      <button
                        key={index}
                        onClick={() => handlePhraseClick(phrase)}
                        className="w-full text-left p-2 hover:bg-gray-100 rounded transition-colors"
                      >
                        <p className="text-gray-700">{phrase.en}</p>
                        <p className="text-gray-500 text-sm">{phrase.hi}</p>
                      </button>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {activeTab === 'translator' && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="bg-white p-6 rounded-lg shadow-md"
        >
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold">Translation History</h2>
            <button
              onClick={handleClearHistory}
              className="text-sm text-gray-500 hover:text-gray-700"
            >
              Clear History
            </button>
          </div>

          {translationHistory.length === 0 ? (
            <div className="text-center py-8 text-gray-500">
              <p>No translation history yet</p>
            </div>
          ) : (
            <div className="space-y-4">
              {translationHistory.map((item) => (
                <div key={item.id} className="border-b border-gray-200 pb-4">
                  <div className="flex justify-between items-start">
                    <div className="flex items-center">
                      <div className="w-6 h-6 rounded-full flex items-center justify-center bg-gray-200 mr-3">
                        <span className="text-xs font-medium">
                          {languageOptions.find(lang => lang.code === item.sourceLang)?.code.toUpperCase()}
                        </span>
                      </div>
                      <div>
                        <p className="text-gray-800">{item.original}</p>
                        <p className="text-sm text-gray-500">
                          {languageOptions.find(lang => lang.code === item.sourceLang)?.name}
                        </p>
                      </div>
                    </div>
                    <div className="text-sm text-gray-500">
                      {item.timestamp}
                    </div>
                  </div>

                  <div className="flex items-center mt-2">
                    <div className="w-6 h-6 rounded-full flex items-center justify-center bg-gray-200 mr-3">
                      <span className="text-xs font-medium">
                        {languageOptions.find(lang => lang.code === item.targetLang)?.code.toUpperCase()}
                      </span>
                    </div>
                    <div>
                      <p className="text-gray-800">{item.translated}</p>
                      <p className="text-sm text-gray-500">
                        {languageOptions.find(lang => lang.code === item.targetLang)?.name}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </motion.div>
      )}

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="bg-white p-6 rounded-lg shadow-md"
      >
        <h2 className="text-xl font-semibold mb-4">Language Tips for Tourists</h2>
        <div className="space-y-4">
          <div className="flex items-start">
            <svg className="w-5 h-5 text-indigo-500 mt-1 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <div>
              <h3 className="font-medium">Learn Basic Phrases</h3>
              <p className="text-gray-600 mt-1">
                Learning a few basic phrases in the local language can greatly enhance your travel experience and help in emergencies.
              </p>
            </div>
          </div>

          <div className="flex items-start">
            <svg className="w-5 h-5 text-indigo-500 mt-1 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
            <div>
              <h3 className="font-medium">Use Translation Apps</h3>
              <p className="text-gray-600 mt-1">
                Always have a translation app handy, especially in areas where English is not widely spoken.
              </p>
            </div>
          </div>

          <div className="flex items-start">
            <svg className="w-5 h-5 text-indigo-500 mt-1 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 8h6m-6 4h6m-12 8h.01M4 12h16m-6-4h.01" />
            </svg>
            <div>
              <h3 className="font-medium">Carry a Phrasebook</h3>
              <p className="text-gray-600 mt-1">
                A small phrasebook can be invaluable when your phone battery is low or you don't have internet access.
              </p>
            </div>
          </div>

          <div className="flex items-start">
            <svg className="w-5 h-5 text-indigo-500 mt-1 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
            <div>
              <h3 className="font-medium">Be Patient</h3>
              <p className="text-gray-600 mt-1">
                Not everyone will understand English, so be patient and use simple gestures or drawings if needed.
              </p>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default LanguageTranslator;