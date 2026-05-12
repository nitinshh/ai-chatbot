import { motion } from 'framer-motion'
import { Sun, Moon } from 'lucide-react'
import useAppStore from '../../store/useAppStore'

const ThemeToggle = () => {
  const { theme, toggleTheme } = useAppStore()

  return (
    <motion.button
      onClick={toggleTheme}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      className="p-3 rounded-xl glass hover:bg-white/10 transition-colors"
    >
      <motion.div
        animate={{ rotate: theme === 'dark' ? 0 : 180 }}
        transition={{ duration: 0.3 }}
      >
        {theme === 'dark' ? (
          <Moon size={20} className="text-violet-400" />
        ) : (
          <Sun size={20} className="text-amber-400" />
        )}
      </motion.div>
    </motion.button>
  )
}

export default ThemeToggle