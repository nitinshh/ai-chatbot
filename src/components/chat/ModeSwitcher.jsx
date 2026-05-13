import { motion } from 'framer-motion'
import { MessageSquare, Mic, MicOff } from 'lucide-react'
import useAppStore from '../../store/useAppStore'

const ModeSwitcher = () => {
  const { communicationMode, setCommunicationMode, theme } = useAppStore()

  const modes = [
    {
      id: 'text',
      icon: MessageSquare,
      label: 'Text',
      description: 'Chat only'
    },
    {
      id: 'speak',
      icon: Mic,
      label: 'Speak',
      description: 'Voice only'
    },
    {
      id: 'text+speak',
      icon: MicOff,
      label: 'Text + Speak',
      description: 'Full mode'
    }
  ]

  const isDark = theme === 'dark'
  const activeBg = isDark ? 'rgba(139, 92, 246, 0.2)' : 'rgba(139, 92, 246, 0.15)'
  const inactiveBg = isDark ? 'var(--bg-card)' : 'white'
  const borderColor = isDark ? 'var(--border-color)' : '#e2e8f0'
  const activeBorder = '#8b5cf6'
  const textColor = isDark ? 'white' : '#1e293b'
  const mutedColor = isDark ? '#9ca3af' : '#64748b'

  return (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex items-center gap-2 p-1.5 rounded-xl"
      style={{ 
        background: isDark ? 'var(--bg-surface)' : '#f1f5f9',
        border: `1px solid ${borderColor}`
      }}
    >
      {modes.map((mode) => {
        const Icon = mode.icon
        const isActive = communicationMode === mode.id

        return (
          <motion.button
            key={mode.id}
            onClick={() => setCommunicationMode(mode.id)}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="relative flex items-center gap-2 px-3 py-2 rounded-lg transition-all"
            style={{
              background: isActive ? activeBg : inactiveBg,
              border: `1.5px solid ${isActive ? activeBorder : borderColor}`,
              color: isActive ? '#8b5cf6' : mutedColor
            }}
          >
            {isActive && (
              <motion.div
                layoutId="modeIndicator"
                className="absolute inset-0 rounded-lg"
                style={{ background: activeBg }}
                transition={{ type: 'spring', bounce: 0.2, duration: 0.6 }}
              />
            )}
            <Icon size={16} className="relative z-10" />
            <span className="text-sm font-medium relative z-10 hidden sm:inline">{mode.label}</span>
            
            {isActive && (
              <motion.div
                layoutId="modeGlow"
                className="absolute inset-0 rounded-lg"
                style={{ 
                  background: 'radial-gradient(circle at center, rgba(139, 92, 246, 0.3) 0%, transparent 70%)',
                }}
              />
            )}
          </motion.button>
        )
      })}
    </motion.div>
  )
}

export default ModeSwitcher