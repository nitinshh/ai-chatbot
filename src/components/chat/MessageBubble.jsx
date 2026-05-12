import { motion } from 'framer-motion'
import useAppStore from '../../store/useAppStore'

const MessageBubble = ({ message, isOwn }) => {
  const { theme } = useAppStore()
  const isDark = theme === 'dark'
  
  const formatTime = (timestamp) => {
    const date = new Date(timestamp)
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
  }

  const bubbleBg = isOwn 
    ? 'linear-gradient(135deg, #8b5cf6 0%, #7c3aed 100%)'
    : isDark 
      ? 'var(--bg-card)' 
      : 'white'
  const bubbleBorder = isOwn ? 'none' : isDark ? '1px solid var(--border-color)' : '1px solid #e2e8f0'
  const bubbleText = isOwn ? 'text-white' : isDark ? 'text-gray-100' : 'text-slate-800'
  const timeColor = isDark ? 'text-gray-500' : 'text-slate-400'

  return (
    <motion.div initial={{ opacity: 0, y: 20, scale: 0.95 }} animate={{ opacity: 1, y: 0, scale: 1 }} className={`flex ${isOwn ? 'justify-end' : 'justify-start'} mb-4`}>
      <div className={`flex max-w-[80%] ${isOwn ? 'flex-row-reverse' : 'flex-row'} gap-2`}>
        {!isOwn && (
          <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} className="w-8 h-8 rounded-full flex-shrink-0 flex items-center justify-center bg-gradient-to-br from-violet-600 to-cyan-600">
            <span className="text-sm">🤖</span>
          </motion.div>
        )}

        <div className={`flex flex-col ${isOwn ? 'items-end' : 'items-start'}`}>
          <motion.div
            className={`px-4 py-3 rounded-2xl max-w-full break-words ${bubbleText}`}
            whileHover={{ scale: 1.01 }}
            style={{ background: bubbleBg, border: bubbleBorder }}
          >
            {message.text}
          </motion.div>
          <motion.span initial={{ opacity: 0 }} animate={{ opacity: 0.6 }} className={`text-xs mt-1 px-1 ${timeColor}`}>
            {formatTime(message.timestamp)}
          </motion.span>
        </div>
      </div>
    </motion.div>
  )
}

export default MessageBubble