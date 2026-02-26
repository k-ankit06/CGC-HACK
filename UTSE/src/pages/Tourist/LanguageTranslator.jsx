import { useState } from 'react'
import { Languages, Volume2, Copy, Star, BookOpen, MessageCircle, Loader } from 'lucide-react'
import { motion } from 'framer-motion'
import axios from 'axios'

const glass = { background: 'rgba(255,255,255,0.06)', backdropFilter: 'blur(24px)', WebkitBackdropFilter: 'blur(24px)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '1rem', boxShadow: '0 8px 32px rgba(0,0,0,0.3)' }
const cAnim = { hidden: { opacity: 0 }, visible: { opacity: 1, transition: { staggerChildren: 0.08 } } }
const iAnim = { hidden: { opacity: 0, y: 30 }, visible: { opacity: 1, y: 0, transition: { duration: 0.5 } } }
const inputStyle = { background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.12)', borderRadius: '0.75rem', color: '#fff', padding: '0.75rem 1rem', width: '100%', outline: 'none' }

const LanguageTranslator = () => {
  const [inputText, setInputText] = useState('')
  const [translatedText, setTranslatedText] = useState('')
  const [fromLang, setFromLang] = useState('en')
  const [toLang, setToLang] = useState('hi')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const languages = [
    { code: 'en', name: 'English', flag: '🇬🇧' }, { code: 'hi', name: 'Hindi', flag: '🇮🇳' },
    { code: 'bn', name: 'Bengali', flag: '🇮🇳' }, { code: 'te', name: 'Telugu', flag: '🇮🇳' },
    { code: 'mr', name: 'Marathi', flag: '🇮🇳' }, { code: 'ta', name: 'Tamil', flag: '🇮🇳' },
    { code: 'gu', name: 'Gujarati', flag: '🇮🇳' }, { code: 'kn', name: 'Kannada', flag: '🇮🇳' },
    { code: 'ml', name: 'Malayalam', flag: '🇮🇳' }, { code: 'pa', name: 'Punjabi', flag: '🇮🇳' },
    { code: 'es', name: 'Spanish', flag: '🇪🇸' }, { code: 'fr', name: 'French', flag: '🇫🇷' },
    { code: 'de', name: 'German', flag: '🇩🇪' }, { code: 'ja', name: 'Japanese', flag: '🇯🇵' },
    { code: 'zh', name: 'Chinese', flag: '🇨🇳' }, { code: 'ru', name: 'Russian', flag: '🇷🇺' }
  ]

  const commonPhrases = [
    {
      category: 'Greetings', icon: '👋', phrases: [
        { en: 'Hello', hi: 'नमस्ते (Namaste)', pronunciation: 'Nuh-muh-stay' },
        { en: 'Good Morning', hi: 'सुप्रभात (Suprabhat)', pronunciation: 'Soo-pruh-bhat' },
        { en: 'Thank You', hi: 'धन्यवाद (Dhanyavaad)', pronunciation: 'Dhun-yuh-vaad' },
        { en: 'Please', hi: 'कृपया (Kripya)', pronunciation: 'Krip-yaa' },
        { en: 'Sorry', hi: 'माफ़ करें (Maaf Karen)', pronunciation: 'Maaf Kuh-ren' }
      ]
    },
    {
      category: 'Emergency', icon: '🚨', phrases: [
        { en: 'Help!', hi: 'मदद! (Madad!)', pronunciation: 'Muh-dud' },
        { en: 'Call Police', hi: 'पुलिस बुलाओ (Police Bulao)', pronunciation: 'Police Boo-lao' },
        { en: 'I need a doctor', hi: 'मुझे डॉक्टर चाहिए', pronunciation: 'Moo-jhe Doctor Cha-hee-ye' },
        { en: 'Emergency', hi: 'आपातकाल (Aapatkaal)', pronunciation: 'Aa-paat-kaal' },
        { en: 'Hospital', hi: 'अस्पताल (Aspatal)', pronunciation: 'Us-pa-taal' }
      ]
    },
    {
      category: 'Directions', icon: '🗺️', phrases: [
        { en: 'Where is...?', hi: 'कहाँ है...?', pronunciation: 'Kuh-haan Hai' },
        { en: 'How far?', hi: 'कितनी दूर?', pronunciation: 'Kit-nee Door' },
        { en: 'Left', hi: 'बाएं (Baayen)', pronunciation: 'Baa-yen' },
        { en: 'Right', hi: 'दाएं (Daayen)', pronunciation: 'Daa-yen' },
        { en: 'Straight', hi: 'सीधे (Seedhe)', pronunciation: 'See-dhe' }
      ]
    },
    {
      category: 'Shopping', icon: '🛍️', phrases: [
        { en: 'How much?', hi: 'कितना है?', pronunciation: 'Kit-naa Hai' },
        { en: 'Too expensive', hi: 'बहुत महंगा', pronunciation: 'Buh-hut Muh-hun-gaa' },
        { en: 'Cheaper', hi: 'सस्ता (Sasta)', pronunciation: 'Suss-taa' },
        { en: 'I want this', hi: 'मुझे यह चाहिए', pronunciation: 'Moo-jhe Yeh Cha-hee-ye' },
        { en: 'No, thank you', hi: 'नहीं, धन्यवाद', pronunciation: 'Nuh-hee, Dhun-yuh-vaad' }
      ]
    },
    {
      category: 'Food & Dining', icon: '🍽️', phrases: [
        { en: 'I am vegetarian', hi: 'मैं शाकाहारी हूँ', pronunciation: 'Main Shaa-kaa-haa-ree Hoon' },
        { en: 'Water, please', hi: 'पानी, कृपया', pronunciation: 'Paa-nee, Krip-yaa' },
        { en: 'Bill, please', hi: 'बिल, कृपया', pronunciation: 'Bill, Krip-yaa' },
        { en: 'Delicious', hi: 'स्वादिष्ट (Swadisht)', pronunciation: 'Swaa-dishth' },
        { en: 'Not spicy', hi: 'तीखा नहीं', pronunciation: 'Tee-khaa Nuh-hee' }
      ]
    }
  ]

  const handleTranslate = async () => {
    if (!inputText.trim()) { setError('Please enter text'); return }
    setLoading(true); setError(''); setTranslatedText('')
    try {
      const response = await axios.get('https://api.mymemory.translated.net/get', { params: { q: inputText, langpair: `${fromLang}|${toLang}` } })
      if (response.data.responseStatus === 200) { setTranslatedText(response.data.responseData.translatedText) }
      else { throw new Error('API Error') }
    } catch (err) { setError('Translation error. Try again.') }
    finally { setLoading(false) }
  }
  const speakText = (text, lang = toLang) => { if ('speechSynthesis' in window) { const u = new SpeechSynthesisUtterance(text); u.lang = lang; window.speechSynthesis.speak(u) } }
  const copyText = (text) => { navigator.clipboard.writeText(text).then(() => alert('Copied!')).catch(() => alert('Failed')) }

  return (
    <motion.div variants={cAnim} initial="hidden" animate="visible" className="space-y-6">
      <motion.div variants={iAnim}>
        <h2 className="text-3xl font-bold text-white" style={{ textShadow: '0 0 30px rgba(99,102,241,0.4)' }}>Language Translator</h2>
        <p className="mt-1" style={{ color: 'rgba(199,210,254,0.6)' }}>Multi-language support for seamless communication 🌍</p>
      </motion.div>

      {/* Translator */}
      <motion.div variants={iAnim} className="p-6" style={glass}>
        <h3 className="text-xl font-bold text-white mb-4 flex items-center"><Languages className="h-6 w-6 mr-2" style={{ color: '#818cf8' }} />Instant Translator</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <div><label className="block text-sm font-semibold mb-2" style={{ color: 'rgba(199,210,254,0.7)' }}>From</label>
            <select style={inputStyle} value={fromLang} onChange={(e) => setFromLang(e.target.value)}>
              <option value="en">Auto Detect</option>{languages.map(l => <option key={l.code} value={l.code}>{l.flag} {l.name}</option>)}
            </select></div>
          <div><label className="block text-sm font-semibold mb-2" style={{ color: 'rgba(199,210,254,0.7)' }}>To</label>
            <select style={inputStyle} value={toLang} onChange={(e) => setToLang(e.target.value)}>
              {languages.map(l => <option key={l.code} value={l.code}>{l.flag} {l.name}</option>)}
            </select></div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <div className="flex items-center justify-between mb-2"><label className="text-sm font-semibold" style={{ color: 'rgba(199,210,254,0.7)' }}>Enter Text</label>
              <motion.button whileHover={{ scale: 1.1 }} onClick={() => speakText(inputText, fromLang)} style={{ color: '#818cf8' }}><Volume2 className="h-5 w-5" /></motion.button></div>
            <textarea style={{ ...inputStyle, resize: 'vertical' }} rows="6" placeholder="Type something... 📝" value={inputText} onChange={(e) => setInputText(e.target.value)} />
          </div>
          <div>
            <div className="flex items-center justify-between mb-2"><label className="text-sm font-semibold" style={{ color: 'rgba(199,210,254,0.7)' }}>Translation</label>
              <div className="flex gap-2">
                <motion.button whileHover={{ scale: 1.1 }} onClick={() => speakText(translatedText, toLang)} style={{ color: '#818cf8' }}><Volume2 className="h-5 w-5" /></motion.button>
                <motion.button whileHover={{ scale: 1.1 }} onClick={() => copyText(translatedText)} style={{ color: '#818cf8' }}><Copy className="h-5 w-5" /></motion.button>
              </div></div>
            <textarea style={{ ...inputStyle, resize: 'vertical', background: 'rgba(255,255,255,0.03)' }} rows="6" placeholder="Translation here... ✨" value={translatedText} readOnly />
            {error && <p className="text-sm mt-2" style={{ color: '#fca5a5' }}>{error}</p>}
          </div>
        </div>
        <motion.button whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }} onClick={handleTranslate} disabled={loading}
          className="w-full mt-4 py-3 rounded-xl font-semibold text-white flex items-center justify-center" style={{ background: 'linear-gradient(135deg, #6366f1, #8b5cf6)', boxShadow: '0 4px 20px rgba(99,102,241,0.4)' }}>
          {loading ? <Loader className="h-5 w-5 mr-2 animate-spin" /> : <Languages className="h-5 w-5 mr-2" />}{loading ? 'Translating...' : 'Translate Now'}
        </motion.button>
      </motion.div>

      {/* Common Phrases */}
      <div className="space-y-4">
        <h3 className="text-xl font-bold text-white flex items-center"><BookOpen className="h-6 w-6 mr-2" style={{ color: '#818cf8' }} />Common Phrases</h3>
        {commonPhrases.map((cat, index) => (
          <motion.div key={index} variants={iAnim} className="p-6" style={glass}>
            <h4 className="text-lg font-bold text-white mb-4 flex items-center"><span className="text-2xl mr-2">{cat.icon}</span>{cat.category}</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {cat.phrases.map((p, idx) => (
                <motion.div key={idx} whileHover={{ scale: 1.02 }} className="rounded-xl p-4" style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)' }}>
                  <div className="flex items-start justify-between mb-2">
                    <div className="flex-1">
                      <p className="font-semibold text-white mb-1">{p.en}</p>
                      <p className="font-bold text-lg mb-1" style={{ color: '#a5b4fc' }}>{p.hi}</p>
                      <p className="text-sm italic" style={{ color: 'rgba(199,210,254,0.4)' }}>{p.pronunciation}</p>
                    </div>
                    <div className="flex gap-1">
                      <motion.button whileHover={{ scale: 1.1 }} onClick={() => speakText(p.hi)} className="p-2 rounded-lg" style={{ color: '#818cf8' }}><Volume2 className="h-4 w-4" /></motion.button>
                      <motion.button whileHover={{ scale: 1.1 }} onClick={() => copyText(p.hi)} className="p-2 rounded-lg" style={{ color: '#818cf8' }}><Copy className="h-4 w-4" /></motion.button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        ))}
      </div>

      {/* Numbers */}
      <motion.div variants={iAnim} className="p-6" style={glass}>
        <h4 className="text-lg font-bold text-white mb-4">🔢 Numbers (1-10)</h4>
        <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
          {[{ n: '1', h: 'एक (Ek)' }, { n: '2', h: 'दो (Do)' }, { n: '3', h: 'तीन (Teen)' }, { n: '4', h: 'चार (Chaar)' }, { n: '5', h: 'पांच (Paanch)' }, { n: '6', h: 'छह (Chhah)' }, { n: '7', h: 'सात (Saat)' }, { n: '8', h: 'आठ (Aath)' }, { n: '9', h: 'नौ (Nau)' }, { n: '10', h: 'दस (Das)' }].map((num, idx) => (
            <div key={idx} className="p-3 rounded-lg text-center" style={{ background: 'rgba(255,255,255,0.04)' }}>
              <p className="text-2xl font-bold mb-1" style={{ color: '#818cf8' }}>{num.n}</p><p className="text-sm font-semibold text-white">{num.h}</p>
            </div>
          ))}
        </div>
      </motion.div>

      {/* Emergency Phrases */}
      <motion.div variants={iAnim} className="p-6" style={{ ...glass, background: 'rgba(239,68,68,0.06)', border: '1px solid rgba(239,68,68,0.15)' }}>
        <h4 className="text-lg font-bold text-white mb-4">🚨 Emergency Phrases - Keep Handy!</h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {[{ en: 'I need help', hi: 'मुझे मदद चाहिए', p: 'Mujhe madad chahiye' }, { en: 'Call 100 (Police)', hi: '100 पर फोन करें', p: '100 par phone karen' }, { en: 'Where is hospital?', hi: 'अस्पताल कहाँ है?', p: 'Aspatal kahan hai?' }, { en: 'I am lost', hi: 'मैं खो गया हूँ', p: 'Main kho gaya hoon' }].map((ph, idx) => (
            <motion.div key={idx} whileHover={{ scale: 1.02 }} className="p-4 rounded-xl" style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(239,68,68,0.15)' }}>
              <p className="font-bold text-white mb-1">{ph.en}</p>
              <p className="font-bold text-lg mb-1" style={{ color: '#fca5a5' }}>{ph.hi}</p>
              <p className="text-sm italic mb-2" style={{ color: 'rgba(199,210,254,0.4)' }}>{ph.p}</p>
              <motion.button whileHover={{ scale: 1.05 }} onClick={() => speakText(ph.hi)} className="w-full py-2 rounded-xl font-semibold text-sm text-white" style={{ background: 'linear-gradient(135deg, #ef4444, #f87171)' }}>
                <Volume2 className="inline h-4 w-4 mr-1" />Speak
              </motion.button>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Tips */}
      <motion.div variants={iAnim} className="p-6" style={{ ...glass, background: 'rgba(99,102,241,0.06)', border: '1px solid rgba(99,102,241,0.15)' }}>
        <h4 className="text-lg font-bold text-white mb-3">💡 Language Tips for Tourists</h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {['Indians appreciate when tourists try Hindi', 'Hand gestures are widely understood', 'Many Indians speak English in tourist areas', 'Download offline translation apps', 'Say "Namaste" with folded hands', 'Save phrases in your phone'].map((t, idx) => (
            <div key={idx} className="flex items-start gap-2 p-3 rounded-xl" style={{ background: 'rgba(255,255,255,0.04)' }}>
              <Star className="h-5 w-5 flex-shrink-0 mt-0.5" style={{ color: '#818cf8' }} /><span className="text-white">{t}</span>
            </div>
          ))}
        </div>
      </motion.div>

      {/* Voice */}
      <motion.div variants={iAnim} className="p-6" style={{ ...glass, background: 'linear-gradient(135deg, rgba(168,85,247,0.15), rgba(139,92,246,0.05))', border: '1px solid rgba(168,85,247,0.2)' }}>
        <div className="flex items-center justify-between">
          <div className="flex-1">
            <h4 className="text-xl font-bold text-white mb-2 flex items-center"><MessageCircle className="h-6 w-6 mr-2" />Voice Translation Assistant</h4>
            <p className="mb-4" style={{ color: 'rgba(199,210,254,0.6)' }}>Speak in your language and get instant Hindi translation</p>
            <motion.button whileHover={{ scale: 1.05 }} className="px-6 py-3 rounded-xl font-semibold text-white" style={{ background: 'rgba(255,255,255,0.1)', border: '1px solid rgba(255,255,255,0.2)' }}>🎤 Start Voice Translation</motion.button>
          </div>
          <div className="hidden md:block text-6xl">🗣️</div>
        </div>
      </motion.div>
    </motion.div>
  )
}

export default LanguageTranslator