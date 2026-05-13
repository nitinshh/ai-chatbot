import { useState, useEffect, useCallback, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Mic, MicOff, Volume2, VolumeX, Settings, MessageSquare } from 'lucide-react'
import AvatarViewer from '../avatar/AvatarViewer'
import ModeSwitcher from './ModeSwitcher'
import LanguageSwitcher from '../ui/LanguageSwitcher'
import useAppStore from '../../store/useAppStore'
import useChatStore from '../../store/useChatStore'
import useTextToSpeech from '../../hooks/useTextToSpeech'
import useSpeechRecognition from '../../hooks/useSpeechRecognition'
import { sendMessage } from '../../services/groqApi'

const SpeakMode = () => {
  const { 
    theme, 
    toggleTheme, 
    aiName, 
    gender, 
    personality, 
    userName, 
    speechSpeed,
    setSpeechSpeed,
    language
  } = useAppStore()
  
  const { messages, addMessage, setTyping, isTyping } = useChatStore()
  const [isMuted, setIsMuted] = useState(false)
  const [isSpeaking, setIsSpeaking] = useState(false)
  const [showSettings, setShowSettings] = useState(false)
  const [lastAiResponse, setLastAiResponse] = useState('')

  const { speak, stop: stopSpeaking } = useTextToSpeech()
  
  const {
    isSupported: speechSupported,
    isListening,
    transcript,
    startListening,
    stopListening,
    resetTranscript
  } = useSpeechRecognition()

  const prevLanguageRef = useRef(language)

  useEffect(() => {
    if (prevLanguageRef.current !== language) {
      if (messages.length > 0) {
        useChatStore.getState().clearMessages()
      }
    }
    prevLanguageRef.current = language
  }, [language, messages.length])

  const handleSendMessage = useCallback(async (text) => {
    if (!text.trim()) return
    
    addMessage({ text, sender: 'user' })
    setTyping(true)

    const conversationHistory = messages.slice(-10)
    const response = await sendMessage(text, conversationHistory, userName, aiName, personality, language)
    
    addMessage({ text: response, sender: 'ai' })
    setTyping(false)
    setLastAiResponse(response)

    if (!isMuted) {
      setIsSpeaking(true)
      speak(response, language)
      
      const speechDuration = response.length * 60 / (speechSpeed * 1000)
      setTimeout(() => {
        setIsSpeaking(false)
      }, Math.max(speechDuration * 1000, 2000))
}
  }, [messages, userName, aiName, personality, isMuted, speak, addMessage, setTyping, speechSpeed, language])

  const handleVoiceInput = () => {
    if (isListening) {
      if (transcript && transcript.trim()) {
        handleSendMessage(transcript.trim())
      }
      resetTranscript()
      stopListening()
    } else {
      resetTranscript()
      startListening()
    }
  }

  useEffect(() => {
    let timeout
    if (isListening && transcript && transcript.length > 3) {
      timeout = setTimeout(() => {
        if (transcript.trim()) {
          handleSendMessage(transcript.trim())
          resetTranscript()
          stopListening()
        }
      }, 2000)
    }
    return () => clearTimeout(timeout)
  }, [transcript, isListening, handleSendMessage, resetTranscript, stopListening])

  const toggleMute = () => {
    if (isSpeaking) {
      stopSpeaking()
      setIsSpeaking(false)
    }
    setIsMuted(!isMuted)
  }

  const isDark = theme === 'dark'
  const textColor = isDark ? 'text-white' : 'text-slate-800'
  const mutedColor = isDark ? 'text-gray-400' : 'text-slate-500'
  const borderColor = 'var(--border-color)'

  return (
    <div 
      className="h-screen flex flex-col items-center justify-center relative"
      style={{ backgroundColor: 'var(--bg-primary)' }}
    >
      {/* Top Controls */}
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="absolute top-4 right-4 z-20"
      >
        <div 
          className="glass rounded-xl p-3 flex items-center gap-2"
          style={{ background: 'var(--glass-bg)', borderColor: 'var(--glass-border)' }}
        >
          <button onClick={toggleTheme} className="p-2 rounded-lg hover:bg-white/10 transition-colors">
            {theme === 'dark' ? (
              <span className="text-violet-400">🌙</span>
            ) : (
              <span className="text-amber-500">☀️</span>
            )}
          </button>
          <button onClick={toggleMute} className="p-2 rounded-lg hover:bg-white/10 transition-colors">
            {isMuted ? <VolumeX size={18} className={mutedColor} /> : <Volume2 size={18} className={mutedColor} />}
          </button>
          <button onClick={() => setShowSettings(true)} className="p-2 rounded-lg hover:bg-white/10 transition-colors">
            <Settings size={18} className={mutedColor} />
          </button>
        </div>
      </motion.div>

      {/* Mode Indicator */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="absolute top-4 left-4 z-20"
      >
        <div 
          className="glass rounded-xl px-4 py-2 flex items-center gap-2"
          style={{ background: 'var(--glass-bg)', borderColor: 'var(--glass-border)' }}
        >
          <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
          <span className={`text-sm font-medium ${textColor}`}>Speak Mode</span>
        </div>
      </motion.div>

      {/* Mode Switcher */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="absolute top-4 left-1/2 -translate-x-1/2 z-20 flex items-center gap-2"
      >
        <LanguageSwitcher compact />
        <ModeSwitcher />
      </motion.div>

      {/* Avatar Container */}
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="relative w-full max-w-md aspect-square mx-auto"
      >
        <div className="absolute inset-0">
          <AvatarViewer isTalking={isSpeaking || isTyping} showControls={false} />
        </div>

        {/* Avatar Info Overlay */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="absolute bottom-4 left-1/2 -translate-x-1/2"
        >
          <div 
            className="glass rounded-2xl px-6 py-3 flex items-center gap-3"
            style={{ background: 'var(--glass-bg)', borderColor: 'var(--glass-border)' }}
          >
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-violet-600 to-cyan-600 flex items-center justify-center">
              <span className="text-xl">{gender === 'male' ? '👨' : '👩'}</span>
            </div>
            <div>
              <h3 className={`font-semibold ${textColor}`}>{aiName || 'AI Companion'}</h3>
              <div className="flex items-center gap-2">
                {isSpeaking ? (
                  <>
                    <motion.span
                      animate={{ scale: [1, 1.2, 1] }}
                      transition={{ duration: 0.5, repeat: Infinity }}
                      className="text-xs text-violet-400"
                    >
                      Speaking...
                    </motion.span>
                  </>
                ) : isTyping ? (
                  <span className={`text-xs ${mutedColor}`}>Thinking...</span>
                ) : (
                  <>
                    <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                    <span className={`text-xs ${mutedColor}`}>Ready</span>
                  </>
                )}
              </div>
            </div>
          </div>
        </motion.div>
      </motion.div>

      {/* Voice Button */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="mt-4"
      >
        <motion.button
          onClick={handleVoiceInput}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          disabled={isTyping}
          className={`relative w-24 h-24 rounded-full transition-all ${
            isTyping ? 'opacity-50 cursor-not-allowed' : ''
          }`}
          style={{
            background: isListening 
              ? 'linear-gradient(135deg, #ef4444 0%, #dc2626 100%)'
              : 'linear-gradient(135deg, #8b5cf6 0%, #6366f1 100%)',
            boxShadow: isListening
              ? '0 0 40px rgba(239, 68, 68, 0.5)'
              : '0 0 40px rgba(139, 92, 246, 0.4)'
          }}
        >
          <AnimatePresence mode="wait">
            {isListening ? (
              <motion.div
                key="listening"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                exit={{ scale: 0 }}
                className="absolute inset-0 flex items-center justify-center"
              >
                <div className="relative">
                  <MicOff size={36} className="text-white" />
                  <motion.div
                    className="absolute inset-0 rounded-full"
                    animate={{ 
                      scale: [1, 1.5, 1],
                      opacity: [0.5, 0, 0.5]
                    }}
                    transition={{ duration: 1, repeat: Infinity }}
                    style={{ background: 'rgba(239, 68, 68, 0.3)' }}
                  />
                </div>
              </motion.div>
            ) : (
              <motion.div
                key="mic"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                exit={{ scale: 0 }}
                className="absolute inset-0 flex items-center justify-center"
              >
                <Mic size={36} className="text-white" />
                {!isTyping && (
                  <motion.div
                    className="absolute inset-0 rounded-full"
                    animate={{ 
                      scale: [1, 1.2, 1],
                      opacity: [0.3, 0.1, 0.3]
                    }}
                    transition={{ duration: 2, repeat: Infinity }}
                    style={{ background: 'rgba(139, 92, 246, 0.3)' }}
                  />
                )}
              </motion.div>
            )}
          </AnimatePresence>

          {/* Ripple Effect when listening */}
          {isListening && (
            <>
              <motion.div
                className="absolute inset-0 rounded-full"
                animate={{ scale: [1, 1.5], opacity: [0.5, 0] }}
                transition={{ duration: 1.5, repeat: Infinity }}
                style={{ background: 'rgba(239, 68, 68, 0.3)' }}
              />
              <motion.div
                className="absolute inset-0 rounded-full"
                animate={{ scale: [1, 1.8], opacity: [0.3, 0] }}
                transition={{ duration: 1.5, repeat: Infinity, delay: 0.5 }}
                style={{ background: 'rgba(239, 68, 68, 0.2)' }}
              />
            </>
          )}
        </motion.button>

        <p className={`text-center mt-4 ${mutedColor}`}>
          {isTyping 
            ? 'AI is thinking...' 
            : isListening 
              ? 'Tap to send or wait...' 
              : 'Tap to speak'
          }
        </p>
      </motion.div>

      {/* Transcript Display */}
      <AnimatePresence>
        {(isListening || transcript) && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            className="mt-2 max-w-md mx-auto"
          >
            <div 
              className="glass rounded-xl px-6 py-4 text-center"
              style={{ background: 'var(--glass-bg)', borderColor: 'var(--glass-border)' }}
            >
              <p className={textColor}>
                {transcript || (isListening ? 'Listening...' : '')}
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

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
                <h3 className={`text-xl font-semibold ${textColor}`}>Voice Settings</h3>
                <button onClick={() => setShowSettings(false)} className="p-2 rounded-lg hover:bg-white/10">
                  <span className={mutedColor}>✕</span>
                </button>
              </div>

              <div className="space-y-4">
                <div 
                  className="p-4 rounded-xl"
                  style={{ background: 'var(--bg-surface)', border: '1px solid var(--border-color)' }}
                >
                  <p className={`font-medium mb-3 ${textColor}`}>Voice Speed</p>
                  <div className="flex gap-2">
                    <button
                      onClick={() => setSpeechSpeed(1)}
                      className={`flex-1 py-2 px-4 rounded-lg font-medium transition-all ${
                        speechSpeed === 1 ? 'bg-violet-600 text-white' : ''
                      }`}
                      style={speechSpeed !== 1 ? { background: 'var(--bg-card)', border: '1px solid var(--border-color)', color: textColor } : {}}
                    >
                      Normal
                    </button>
                    <button
                      onClick={() => setSpeechSpeed(1.5)}
                      className={`flex-1 py-2 px-4 rounded-lg font-medium transition-all ${
                        speechSpeed === 1.5 ? 'bg-violet-600 text-white' : ''
                      }`}
                      style={speechSpeed !== 1.5 ? { background: 'var(--bg-card)', border: '1px solid var(--border-color)', color: textColor } : {}}
                    >
                      Fast
                    </button>
                  </div>
                </div>
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
    </div>
  )
}

export default SpeakMode