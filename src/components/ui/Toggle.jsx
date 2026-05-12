import { motion } from 'framer-motion'

const Toggle = ({ 
  enabled, 
  onChange, 
  label,
  icon: Icon 
}) => {
  return (
    <button
      type="button"
      className={`
        relative inline-flex h-6 w-11 items-center rounded-full 
        transition-colors duration-300 focus:outline-none focus:ring-2 
        focus:ring-violet-500 focus:ring-offset-2 focus:ring-offset-dark-bg
        ${enabled ? 'bg-accent-violet' : 'bg-dark-border'}
      `}
      onClick={() => onChange(!enabled)}
    >
      <span className="sr-only">{label}</span>
      <motion.span
        className={`
          inline-block h-4 w-4 transform rounded-full bg-white shadow-md
          flex items-center justify-center
          ${enabled ? 'ml-6' : 'ml-1'}
        `}
        animate={{ x: enabled ? 20 : 0 }}
        transition={{ type: 'spring', stiffness: 500, damping: 30 }}
      >
        {Icon && (
          <Icon size={12} className={enabled ? 'text-violet-600' : 'text-gray-400'} />
        )}
      </motion.span>
    </button>
  )
}

export default Toggle