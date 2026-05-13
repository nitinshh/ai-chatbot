import { useState } from 'react'
import { motion } from 'framer-motion'
import { ChevronLeft, ChevronRight, Globe } from 'lucide-react'
import useAppStore from '../../store/useAppStore'

const LanguageSelection = ({ onComplete, onBack }) => {
  const { language, setLanguage, supportedLanguages } = useAppStore()
  const theme = useAppStore((state) => state.theme)
  const isDark = theme === 'dark'
  
  const textColor = isDark ? 'text-white' : 'text-slate-800'
  const mutedColor = isDark ? 'text-gray-400' : 'text-slate-500'
  const bgColor = isDark ? 'var(--bg-card)' : 'white'
  const borderColor = isDark ? 'var(--border-color)' : '#e2e8f0'

  const popularLanguages = ['english', 'spanish', 'french', 'german', 'hindi', 'japanese', 'chinese', 'korean']

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="min-h-screen flex flex-col"
      style={{ backgroundColor: 'var(--bg-primary)' }}
    >
      {/* Header */}
      <div className="p-4">
        <button 
          onClick={onBack}
          className="flex items-center gap-2 px-4 py-2 rounded-lg"
          style={{ background: bgColor, border: `1px solid ${borderColor}` }}
        >
          <ChevronLeft size={20} className={mutedColor} />
          <span className={textColor}>Back</span>
        </button>
      </div>

      {/* Content */}
      <div className="flex-1 flex flex-col items-center justify-center p-6">
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="text-center mb-8"
        >
          <div className="w-16 h-16 rounded-full bg-violet-500/20 flex items-center justify-center mx-auto mb-4">
            <Globe size={32} className="text-violet-500" />
          </div>
          <h1 className={`text-2xl font-bold mb-2 ${textColor}`}>Choose Your Language</h1>
          <p className={mutedColor}>Select the language you want to chat in</p>
        </motion.div>

        {/* Language Grid */}
        <div 
          className="w-full max-w-lg grid grid-cols-2 gap-3 mb-8"
          style={{ maxHeight: '400px', overflowY: 'auto' }}
        >
          {supportedLanguages.map((lang, index) => (
            <motion.button
              key={lang.code}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.03 }}
              onClick={() => setLanguage(lang.code)}
              className={`flex items-center gap-3 p-4 rounded-xl transition-all ${
                language === lang.code ? 'ring-2 ring-violet-500' : ''
              }`}
              style={{
                background: language === lang.code ? 'rgba(139, 92, 246, 0.2)' : bgColor,
                border: `1px solid ${language === lang.code ? '#8b5cf6' : borderColor}`,
              }}
            >
              <span className="text-2xl">{lang.flag}</span>
              <div className="text-left">
                <p className={`font-medium ${textColor}`}>{lang.name}</p>
                <p className={`text-xs ${mutedColor}`}>{lang.nativeName}</p>
              </div>
            </motion.button>
          ))}
        </div>

        {/* Continue Button */}
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={onComplete}
          className="w-full max-w-lg py-4 rounded-xl font-semibold text-white flex items-center justify-center gap-2"
          style={{ background: 'linear-gradient(135deg, #8b5cf6 0%, #6366f1 100%)' }}
        >
          <span>Continue</span>
          <ChevronRight size={20} />
        </motion.button>
      </div>
    </motion.div>
  )
}

export default LanguageSelection