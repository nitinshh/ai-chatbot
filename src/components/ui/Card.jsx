import { motion } from 'framer-motion'

const Card = ({ 
  children, 
  className = '', 
  hover = false,
  glow = false,
  onClick,
  ...props 
}) => {
  const baseStyles = 'glass-card rounded-2xl p-6'
  const hoverStyles = hover ? 'cursor-pointer transition-all duration-300 hover:scale-[1.02] hover:shadow-xl hover:shadow-violet-500/20' : ''
  const glowStyles = glow ? 'neon-border' : ''

  const Component = onClick ? motion.button : motion.div

  return (
    <Component
      className={`${baseStyles} ${hoverStyles} ${glowStyles} ${className}`}
      onClick={onClick}
      whileHover={hover ? { scale: 1.02 } : {}}
      whileTap={onClick ? { scale: 0.98 } : {}}
      {...props}
    >
      {children}
    </Component>
  )
}

export default Card