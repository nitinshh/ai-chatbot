import { motion } from 'framer-motion'

const Button = ({ 
  children, 
  onClick, 
  variant = 'primary', 
  size = 'md',
  className = '',
  disabled = false,
  icon: Icon,
  ...props 
}) => {
  const baseStyles = 'relative overflow-hidden font-medium transition-all duration-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-dark-bg disabled:opacity-50 disabled:cursor-not-allowed'
  
  const variants = {
    primary: 'bg-accent-violet text-white hover:bg-violet-600 focus:ring-violet-500 shadow-lg shadow-violet-500/30',
    secondary: 'bg-dark-card text-white border border-dark-border hover:border-accent-violet hover:bg-dark-surface focus:ring-violet-500',
    ghost: 'text-gray-300 hover:text-white hover:bg-white/10 focus:ring-white/30',
    danger: 'bg-red-600 text-white hover:bg-red-700 focus:ring-red-500 shadow-lg shadow-red-500/30',
    glass: 'glass text-white hover:bg-white/20 focus:ring-white/30'
  }

  const sizes = {
    sm: 'px-3 py-1.5 text-sm',
    md: 'px-5 py-2.5 text-base',
    lg: 'px-8 py-3.5 text-lg',
    xl: 'px-10 py-4 text-xl'
  }

  return (
    <motion.button
      whileHover={{ scale: disabled ? 1 : 1.02 }}
      whileTap={{ scale: disabled ? 1 : 0.98 }}
      className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${className}`}
      onClick={onClick}
      disabled={disabled}
      {...props}
    >
      <span className="relative z-10 flex items-center justify-center gap-2">
        {Icon && <Icon size={size === 'sm' ? 16 : size === 'lg' ? 24 : 20} />}
        {children}
      </span>
      {!disabled && variant === 'primary' && (
        <motion.div
          className="absolute inset-0 bg-white/20"
          initial={{ x: '-100%' }}
          whileHover={{ x: 0 }}
          transition={{ duration: 0.3 }}
        />
      )}
    </motion.button>
  )
}

export default Button