import { useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import MessageBubble from './MessageBubble'
import TypingIndicator from './TypingIndicator'
import useChatStore from '../../store/useChatStore'
import useAppStore from '../../store/useAppStore'

const MessageList = () => {
  const { messages, isTyping } = useChatStore()
  const { theme, aiName } = useAppStore()
  const messagesEndRef = useRef(null)
  
  const isDark = theme === 'dark'
  const textColor = isDark ? 'text-white' : 'text-slate-800'
  const mutedColor = isDark ? 'text-gray-400' : 'text-slate-500'

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages, isTyping])

  return (
    <div className="flex-1 overflow-y-auto p-4 scrollbar-thin" style={{ backgroundColor: 'var(--bg-primary)' }}>
      <AnimatePresence>
        {messages.length === 0 ? (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex flex-col items-center justify-center h-full text-center">
            <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: 'spring', delay: 0.2 }} className="w-20 h-20 rounded-full bg-gradient-to-br from-violet-600 to-cyan-600 flex items-center justify-center mb-4">
              <span className="text-4xl">👋</span>
            </motion.div>
            <h3 className={`text-xl font-semibold mb-2 ${textColor}`}>Welcome!</h3>
            <p className={mutedColor + ' max-w-xs'}>Start a conversation with your AI companion. Type a message or use your voice!</p>
          </motion.div>
        ) : (
          messages.map((message) => (
            <MessageBubble key={message.id} message={message} isOwn={message.sender === 'user'} />
          ))
        )}
      </AnimatePresence>
      
      {isTyping && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
          <TypingIndicator />
        </motion.div>
      )}
      
      <div ref={messagesEndRef} />
    </div>
  )
}

export default MessageList