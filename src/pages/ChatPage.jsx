import { useEffect } from 'react'
import { motion } from 'framer-motion'
import ChatInterface from '../components/chat/ChatInterface'
import useAppStore from '../store/useAppStore'

const ChatPage = () => {
  const { theme, isOnboarded } = useAppStore()

  useEffect(() => {
    if (theme === 'light') {
      document.documentElement.classList.add('light')
    } else {
      document.documentElement.classList.remove('light')
    }
  }, [theme])

  if (!isOnboarded) {
    return null
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="min-h-screen bg-dark-bg"
    >
      <ChatInterface />
    </motion.div>
  )
}

export default ChatPage