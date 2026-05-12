import { useState, useCallback, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { Settings, Volume2, VolumeX, Sun, Moon, X, User, Trash2, AlertTriangle } from 'lucide-react'
import MessageList from './MessageList'
import ChatInput from './ChatInput'
import AvatarViewer from '../avatar/AvatarViewer'
import useAppStore from '../../store/useAppStore'
import useChatStore from '../../store/useChatStore'
import useTextToSpeech from '../../hooks/useTextToSpeech'
import { sendMessage } from '../../services/groqApi'

const ChatInterface = () => {
  const navigate = useNavigate()
  const { theme, toggleTheme, aiName, userName, gender, personality, resetOnboarding, setOnboardingStep, speechSpeed, setSpeechSpeed } = useAppStore()
  const { messages, addMessage, setTyping, isTyping, clearMessages } = useChatStore()
  const [isMuted, setIsMuted] = useState(false)
  const [isSpeaking, setIsSpeaking] = useState(false)
  const [showSettings, setShowSettings] = useState(false)
  const [showConfirm, setShowConfirm] = useState(false)
  
  const { speak, stop: stopSpeaking } = useTextToSpeech(gender)

  useEffect(() => {
    const root = document.documentElement
    if (theme === 'light') {
      root.classList.add('light')
    } else {
      root.classList.remove('light')
    }
  }, [theme])

  const handleSendMessage = useCallback(async (text) => {
    addMessage({ text, sender: 'user' })
    setTyping(true)

    const conversationHistory = messages.slice(-10)
    const response = await sendMessage(text, conversationHistory, userName, aiName, personality)
    
    addMessage({ text: response, sender: 'ai' })
    setTyping(false)

    if (!isMuted) {
      setIsSpeaking(true)
      speak(response)
      setTimeout(() => setIsSpeaking(false), response.length * 50)
    }
  }, [messages, userName, aiName, personality, isMuted, speak, addMessage, setTyping])

  const toggleMute = () => {
    if (isSpeaking) {
      stopSpeaking()
      setIsSpeaking(false)
    }
    setIsMuted(!isMuted)
  }

  const handleNewAvatar = () => {
    setShowSettings(false)
    resetOnboarding()
    setOnboardingStep(1)
    navigate('/', { replace: true })
  }

  const handleClearChat = () => {
    setShowConfirm(true)
  }

  const confirmClearChat = () => {
    clearMessages()
    setShowConfirm(false)
    setShowSettings(false)
  }

  const textColor = theme === 'dark' ? 'text-white' : 'text-slate-800'
  const mutedColor = theme === 'dark' ? 'text-gray-400' : 'text-slate-500'
  const borderColor = 'border-[var(--border-color)]'
  const bgGradient = theme === 'dark' 
    ? 'from-dark-surface to-dark-bg' 
    : 'from-white to-slate-100'

  return (
    <div className="h-screen flex flex-col lg:flex-row overflow-hidden" style={{ backgroundColor: 'var(--bg-primary)' }}>
      {/* Left Side - 3D Avatar */}
      <motion.div 
        initial={{ opacity: 0, x: -50 }}
        animate={{ opacity: 1, x: 0 }}
        className={`lg:w-[35%] h-[40vh] lg:h-screen relative bg-gradient-to-b ${bgGradient} border-b lg:border-b-0 lg:border-r ${borderColor}`}
        style={{ borderColor: 'var(--border-color)' }}
      >
        <div className="absolute inset-0">
          <AvatarViewer isTalking={isSpeaking} showControls={true} />
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="absolute bottom-4 left-4 right-4"
        >
          <div className="glass rounded-2xl p-4 flex items-center justify-between" style={{ background: 'var(--glass-bg)', borderColor: 'var(--glass-border)' }}>
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-violet-600 to-cyan-600 flex items-center justify-center">
                <span className="text-2xl">{gender === 'male' ? '👨' : '👩'}</span>
              </div>
              <div>
                <h3 className={`font-semibold ${textColor}`}>{aiName || 'AI Companion'}</h3>
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                  <span className={`text-sm ${mutedColor}`}>Online</span>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} className="absolute top-4 right-4">
          <div className="glass rounded-xl p-3 flex items-center gap-2" style={{ background: 'var(--glass-bg)', borderColor: 'var(--glass-border)' }}>
            <button onClick={toggleTheme} className="p-2 rounded-lg hover:bg-white/10 transition-colors">
              {theme === 'dark' ? <Moon size={18} className="text-violet-400" /> : <Sun size={18} className="text-amber-500" />}
            </button>
            <button onClick={toggleMute} className="p-2 rounded-lg hover:bg-white/10 transition-colors">
              {isMuted ? <VolumeX size={18} className={mutedColor} /> : <Volume2 size={18} className={mutedColor} />}
            </button>
            <button onClick={() => setShowSettings(true)} className="p-2 rounded-lg hover:bg-white/10 transition-colors">
              <Settings size={18} className={mutedColor} />
            </button>
          </div>
        </motion.div>
      </motion.div>

      {/* Right Side - Chat */}
      <motion.div 
        initial={{ opacity: 0, x: 50 }}
        animate={{ opacity: 1, x: 0 }}
        className="lg:w-[65%] h-[60vh] lg:h-screen flex flex-col"
        style={{ backgroundColor: 'var(--bg-primary)' }}
      >
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="p-4 border-b backdrop-blur-sm"
          style={{ backgroundColor: 'var(--bg-surface)', borderColor: 'var(--border-color)' }}
        >
          <div className="flex items-center justify-between">
            <div>
              <h2 className={`text-lg font-semibold ${textColor}`}>Chat</h2>
              <p className={`text-sm ${mutedColor}`}>{messages.length} messages</p>
            </div>
          </div>
        </motion.div>

        <MessageList />

        <ChatInput onSend={handleSendMessage} disabled={isTyping} />
      </motion.div>

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

                {/* Speech Speed Control */}
                <div 
                  className="p-4 rounded-xl"
                  style={{ background: 'var(--bg-surface)', border: '1px solid var(--border-color)' }}
                >
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-10 h-10 rounded-lg bg-cyan-500/20 flex items-center justify-center">
                      <Volume2 size={20} className="text-cyan-500" />
                    </div>
                    <div>
                      <p className={`font-medium ${textColor}`}>Voice Speed</p>
                      <p className={`text-sm ${mutedColor}`}>
                        {speechSpeed === 1 ? 'Normal' : 'Fast'}
                      </p>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <button
                      onClick={() => setSpeechSpeed(1)}
                      className={`flex-1 py-2 px-4 rounded-lg font-medium transition-all ${
                        speechSpeed === 1 
                          ? 'bg-violet-600 text-white' 
                          : ''
                      }`}
                      style={speechSpeed !== 1 ? { background: 'var(--bg-card)', border: '1px solid var(--border-color)' } : {}}
                    >
                      Normal
                    </button>
                    <button
                      onClick={() => setSpeechSpeed(1.5)}
                      className={`flex-1 py-2 px-4 rounded-lg font-medium transition-all ${
                        speechSpeed === 1.5 
                          ? 'bg-violet-600 text-white' 
                          : ''
                      }`}
                      style={speechSpeed !== 1.5 ? { background: 'var(--bg-card)', border: '1px solid var(--border-color)' } : {}}
                    >
                      Fast
                    </button>
                  </div>
                </div>

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

export default ChatInterface