import { useState, useRef, useEffect, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Send, Mic, MicOff } from 'lucide-react'
import useSpeechRecognition from '../../hooks/useSpeechRecognition'
import useAppStore from '../../store/useAppStore'

const ChatInput = ({ onSend, disabled, disableVoice = false }) => {
  const [message, setMessage] = useState('')
  const [listeningText, setListeningText] = useState('')
  const inputRef = useRef(null)
  const { theme } = useAppStore()
  
  const { 
    isListening, 
    transcript, 
    isSupported: speechSupported,
    startListening, 
    stopListening,
    resetTranscript 
  } = useSpeechRecognition()

  // Update listening text in real-time as user speaks
  useEffect(() => {
    if (isListening && transcript) {
      setListeningText(transcript)
    }
  }, [transcript, isListening])

  // Auto-send after silence
  useEffect(() => {
    if (isListening && listeningText && listeningText.length > 5) {
      const timeout = setTimeout(() => {
        if (listeningText.trim()) {
          stopListening()
          onSend(listeningText.trim())
          setListeningText('')
          resetTranscript()
        }
      }, 3000)

      return () => clearTimeout(timeout)
    }
  }, [listeningText, isListening, onSend, stopListening, resetTranscript])

  const handleSubmit = (e) => {
    e.preventDefault()
    const textToSend = isListening ? listeningText : message
    if (textToSend.trim() && !disabled) {
      onSend(textToSend.trim())
      setMessage('')
      setListeningText('')
      if (isListening) {
        stopListening()
        resetTranscript()
      }
    }
  }

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSubmit(e)
    }
  }

  const handleVoiceClick = () => {
    if (isListening) {
      if (listeningText && listeningText.trim()) {
        onSend(listeningText.trim())
      }
      setListeningText('')
      stopListening()
      resetTranscript()
    } else {
      setListeningText('')
      resetTranscript()
      try {
        startListening()
      } catch (e) {
        console.log('Already listening')
      }
    }
  }

  const isDark = theme === 'dark'
  const inputBg = isDark ? 'var(--bg-card)' : 'white'
  const inputBorder = isDark ? 'var(--border-color)' : '#cbd5e1'
  const inputText = isDark ? 'white' : '#1e293b'
  const mutedText = isDark ? 'text-gray-400' : 'text-slate-500'
  const disabledBg = isDark ? 'var(--border-color)' : '#e2e8f0'

  const displayValue = isListening ? listeningText : message
  const placeholderText = isListening ? (listeningText ? '' : 'Listening...') : 'Type a message...'
  const canSend = (isListening ? listeningText : message).trim()

  return (
    <div
      className="p-4 border-t backdrop-blur-sm"
      style={{ backgroundColor: 'var(--bg-surface)', borderColor: 'var(--border-color)' }}
    >
      <form onSubmit={handleSubmit} className="flex items-center gap-3">
        {speechSupported && !disableVoice && (
          <motion.button
            type="button"
            onClick={handleVoiceClick}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="p-3 rounded-xl transition-all duration-300 flex-shrink-0"
            style={{ 
              background: isListening ? '#ef4444' : (isDark ? 'var(--glass-bg)' : 'white'),
              border: `1px solid ${isDark ? 'var(--glass-border)' : '#e2e8f0'}`
            }}
          >
            {isListening ? (
              <MicOff size={20} className="text-white" />
            ) : (
              <Mic size={20} className={mutedText} />
            )}
          </motion.button>
        )}

        <div className="flex-1 relative">
          <input
            ref={inputRef}
            type="text"
            value={displayValue}
            onChange={(e) => !isListening && setMessage(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder={placeholderText}
            disabled={disabled}
            className="w-full px-4 py-3 rounded-xl outline-none transition-all"
            style={{ 
              backgroundColor: inputBg, 
              border: isListening ? '2px solid #ef4444' : `1px solid ${inputBorder}`,
              color: inputText,
            }}
          />
        </div>

        <motion.button
          type="submit"
          disabled={!canSend || disabled}
          whileHover={canSend ? { scale: 1.05 } : {}}
          whileTap={canSend ? { scale: 0.95 } : {}}
          className="p-3 rounded-xl transition-all duration-300 flex-shrink-0"
          style={{ 
            backgroundColor: canSend && !disabled ? '#8b5cf6' : disabledBg,
            color: canSend && !disabled ? 'white' : '#94a3b8',
            cursor: canSend && !disabled ? 'pointer' : 'not-allowed'
          }}
        >
          <Send size={20} />
        </motion.button>
      </form>

      {/* Simple listening indicator */}
      {isListening && (
        <div className="flex items-center gap-2 mt-3">
          <motion.div 
            animate={{ scale: [1, 1.3, 1], opacity: [0.5, 1, 0.5] }} 
            transition={{ duration: 1, repeat: Infinity }} 
            className="w-2.5 h-2.5 bg-red-500 rounded-full" 
          />
          <span className="text-xs" style={{ color: '#ef4444' }}>
            {listeningText ? 'Tap send or wait 3s to send' : 'Listening...'}
          </span>
        </div>
      )}

      {!speechSupported && (
        <p className={`text-xs mt-2 ${mutedText}`}>
          Voice input not supported in this browser
        </p>
      )}
    </div>
  )
}

export default ChatInput