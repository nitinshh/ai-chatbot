import { useState, useCallback, useEffect, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { Settings, Sun, Moon, X, User, Trash2, AlertTriangle, Volume2, VolumeX } from 'lucide-react'
import MessageList from './MessageList'
import ChatInput from './ChatInput'
import ModeSwitcher from './ModeSwitcher'
import LanguageSwitcher from '../ui/LanguageSwitcher'
import useAppStore from '../../store/useAppStore'
import useChatStore from '../../store/useChatStore'
import { sendMessage } from '../../services/groqApi'

const TextMode = () => {
  const navigate = useNavigate()
  const { 
    theme, 
    toggleTheme, 
    aiName, 
    userName, 
    personality, 
    resetOnboarding, 
    setOnboardingStep,
    speechSpeed,
    setSpeechSpeed,
    language 
  } = useAppStore()
  
  const { messages, addMessage, setTyping, isTyping, clearMessages } = useChatStore()
  const [showSettings, setShowSettings] = useState(false)
  const [showConfirm, setShowConfirm] = useState(false)
  const prevLanguageRef = useRef(language)

  useEffect(() => {
    if (prevLanguageRef.current !== language) {
      if (messages.length > 0) {
        clearMessages()
      }
    }
    prevLanguageRef.current = language
  }, [language, messages.length, clearMessages])

  const handleSendMessage = useCallback(async (text) => {
    addMessage({ text, sender: 'user' })
    setTyping(true)

    const conversationHistory = messages.slice(-10)
    const response = await sendMessage(text, conversationHistory, userName, aiName, personality, language)
    
    addMessage({ text: response, sender: 'ai' })
    setTyping(false)
  }, [messages, userName, aiName, personality, language, addMessage, setTyping])

  const handleNewAvatar = () => {
    setShowSettings(false)
    resetOnboarding()
    setOnboardingStep(1)
    window.location.href = '/'
  }

  const handleClearChat = () => {
    setShowConfirm(true)
  }

  const confirmClearChat = () => {
    clearMessages()
    setShowConfirm(false)
    setShowSettings(false)
  }

  const isDark = theme === 'dark'
  const textColor = isDark ? 'text-white' : 'text-slate-800'
  const mutedColor = isDark ? 'text-gray-400' : 'text-slate-500'
  const borderColor = 'var(--border-color)'

  return (
    <div 
      className="h-screen flex flex-col"
      style={{ backgroundColor: 'var(--bg-primary)' }}
    >
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="p-4 border-b backdrop-blur-sm"
        style={{ backgroundColor: 'var(--bg-surface)', borderColor: 'var(--border-color)' }}
      >
        <div className="flex items-center justify-between flex-wrap gap-4">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-violet-600 to-cyan-600 flex items-center justify-center">
                <span className="text-xl">{userName ? '👤' : '🤖'}</span>
              </div>
              <div>
                <h2 className={`text-lg font-semibold ${textColor}`}>{aiName || 'AI Companion'}</h2>
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                  <span className={`text-sm ${mutedColor}`}>Text Mode</span>
                </div>
              </div>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <LanguageSwitcher compact />
            <ModeSwitcher />
          </div>

          <div className="flex items-center gap-2">
            <button 
              onClick={toggleTheme} 
              className="p-2 rounded-lg hover:bg-white/10 transition-colors"
              style={{ background: 'var(--glass-bg)', border: '1px solid var(--glass-border)' }}
            >
              {theme === 'dark' ? <Moon size={18} className="text-violet-400" /> : <Sun size={18} className="text-amber-500" />}
            </button>
            <button 
              onClick={() => setShowSettings(true)} 
              className="p-2 rounded-lg hover:bg-white/10 transition-colors"
              style={{ background: 'var(--glass-bg)', border: '1px solid var(--glass-border)' }}
            >
              <Settings size={18} className={mutedColor} />
            </button>
          </div>
        </div>
      </motion.div>

      {/* Message List */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="flex-1 overflow-hidden"
      >
        <MessageList />
      </motion.div>

      {/* Chat Input */}
      <ChatInput onSend={handleSendMessage} disabled={isTyping} />

      {/* Settings Modal */}
      <AnimatePresence>
        {showSettings && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="absolute inset-0 bg-black/50 backdrop-blur-sm"
              onClick={() => setShowSettings(false)}
            />
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 20, opacity: 0 }}
              className="relative glass-card rounded-2xl p-6 w-full max-w-sm"
              style={{ background: 'var(--bg-card)', borderColor: 'var(--border-color)' }}
            >
              <div className="flex items-center justify-between mb-6">
                <h3 className={`text-xl font-semibold ${textColor}`}>Settings</h3>
                <button onClick={() => setShowSettings(false)} className="p-2 rounded-lg hover:bg-white/10">
                  <X size={20} className={mutedColor} />
                </button>
              </div>

              <div className="space-y-4">
                <button
                  onClick={handleNewAvatar}
                  className="w-full flex items-center gap-3 p-4 rounded-xl transition-all hover:opacity-90"
                  style={{ background: 'var(--bg-surface)', border: '1px solid var(--border-color)' }}
                >
                  <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-violet-600 to-cyan-600 flex items-center justify-center">
                    <User size={20} className="text-white" />
                  </div>
                  <div className="text-left">
                    <p className={`font-medium ${textColor}`}>Create New Avatar</p>
                    <p className={`text-sm ${mutedColor}`}>Start fresh with a new companion</p>
                  </div>
                </button>

                <button
                  onClick={handleClearChat}
                  className="w-full flex items-center gap-3 p-4 rounded-xl transition-all hover:opacity-90"
                  style={{ background: 'var(--bg-surface)', border: '1px solid var(--border-color)' }}
                >
                  <div className="w-10 h-10 rounded-lg bg-red-500/20 flex items-center justify-center">
                    <Trash2 size={20} className="text-red-500" />
                  </div>
                  <div className="text-left">
                    <p className={`font-medium ${textColor}`}>Clear Chat History</p>
                    <p className={`text-sm ${mutedColor}`}>Delete all messages</p>
                  </div>
                </button>
              </div>

              <div className="mt-6 pt-4 border-t" style={{ borderColor: 'var(--border-color)' }}>
                <p className={`text-sm ${mutedColor} text-center`}>
                  {aiName} • {personality.charAt(0).toUpperCase() + personality.slice(1)}
                </p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Confirm Modal */}
      <AnimatePresence>
        {showConfirm && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="absolute inset-0 bg-black/50 backdrop-blur-sm"
              onClick={() => setShowConfirm(false)}
            />
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 20, opacity: 0 }}
              className="relative rounded-2xl p-6 w-full max-w-sm"
              style={{ background: 'var(--bg-card)', border: '1px solid var(--border-color)' }}
            >
              <div className="flex flex-col items-center text-center">
                <div className="w-16 h-16 rounded-full bg-red-500/20 flex items-center justify-center mb-4">
                  <AlertTriangle size={32} className="text-red-500" />
                </div>
                <h3 className={`text-xl font-semibold mb-2 ${textColor}`}>Clear Chat History?</h3>
                <p className={`mb-6 ${mutedColor}`}>This will delete all messages. This action cannot be undone.</p>
                <div className="flex gap-3 w-full">
                  <button
                    onClick={() => setShowConfirm(false)}
                    className="flex-1 px-4 py-3 rounded-xl font-medium transition-all"
                    style={{ background: 'var(--bg-surface)', border: '1px solid var(--border-color)', color: 'var(--text-primary)' }}
                  >
                    Cancel
                  </button>
                  <button
                    onClick={confirmClearChat}
                    className="flex-1 px-4 py-3 rounded-xl font-medium text-white transition-all"
                    style={{ background: '#ef4444' }}
                  >
                    Delete
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export default TextMode