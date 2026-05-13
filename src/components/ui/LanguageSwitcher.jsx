import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Globe, ChevronDown } from 'lucide-react'
import useAppStore from '../../store/useAppStore'

const LanguageSwitcher = ({ compact = false }) => {
  const { language, setLanguage, supportedLanguages } = useAppStore()
  const [isOpen, setIsOpen] = useState(false)
  
  const currentLang = supportedLanguages.find(l => l.code === language) || supportedLanguages[0]
  const isDark = useAppStore((state) => state.theme === 'dark')
  
  const textColor = isDark ? 'text-white' : 'text-slate-800'
  const mutedColor = isDark ? 'text-gray-400' : 'text-slate-500'
  const bgColor = isDark ? 'var(--bg-card)' : 'white'
  const borderColor = isDark ? 'var(--border-color)' : '#e2e8f0'

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`flex items-center gap-2 px-3 py-2 rounded-lg transition-all ${
          compact ? 'text-sm' : 'px-4 py-2'
        }`}
        style={{
          background: isDark ? 'var(--glass-bg)' : 'white',
          border: `1px solid ${isDark ? 'var(--glass-border)' : borderColor}`,
        }}
      >
        <Globe size={compact ? 14 : 16} className={mutedColor} />
        <span className={textColor}>{currentLang.flag}</span>
        <span className={`${textColor} ${compact ? 'text-xs' : ''}`}>
          {compact ? currentLang.code : currentLang.name}
        </span>
        <ChevronDown 
          size={14} 
          className={`${mutedColor} transition-transform ${isOpen ? 'rotate-180' : ''}`}
        />
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="absolute z-50 mt-2 py-2 rounded-xl shadow-lg overflow-hidden"
            style={{
              background: bgColor,
              border: `1px solid ${borderColor}`,
              minWidth: compact ? '140px' : '180px',
              right: 0
            }}
          >
            <div className="max-h-[300px] overflow-y-auto">
              {supportedLanguages.map((lang) => (
                <button
                  key={lang.code}
                  onClick={() => {
                    setLanguage(lang.code)
                    setIsOpen(false)
                  }}
                  className={`w-full flex items-center gap-3 px-4 py-2.5 hover:bg-violet-500/10 transition-colors ${
                    language === lang.code ? 'bg-violet-500/20' : ''
                  }`}
                >
                  <span className="text-lg">{lang.flag}</span>
                  <div className="text-left">
                    <p className={`${textColor} text-sm font-medium`}>{lang.name}</p>
                    {!compact && (
                      <p className={`${mutedColor} text-xs`}>{lang.nativeName}</p>
                    )}
                  </div>
                  {language === lang.code && (
                    <span className="ml-auto text-violet-500">✓</span>
                  )}
                </button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {isOpen && (
        <div 
          className="fixed inset-0 z-40" 
          onClick={() => setIsOpen(false)}
        />
      )}
    </div>
  )
}

export default LanguageSwitcher