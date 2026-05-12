import { forwardRef } from 'react'
import { motion } from 'framer-motion'

const Input = forwardRef(({ 
  label, 
  error, 
  icon: Icon,
  className = '',
  ...props 
}, ref) => {
  return (
    <div className="w-full">
      {label && (
        <label className="block text-sm font-medium text-gray-300 mb-2">
          {label}
        </label>
      )}
      <div className="relative">
        {Icon && (
          <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">
            <Icon size={20} />
          </div>
        )}
        <motion.input
          ref={ref}
          className={`
            w-full bg-dark-surface border border-dark-border rounded-xl px-4 py-3 
            text-white placeholder-gray-500 outline-none transition-all duration-300
            ${Icon ? 'pl-12' : ''}
            ${error ? 'border-red-500 focus:border-red-500' : 'focus:border-accent-violet input-glow'}
            ${className}
          `}
          whileFocus={{ scale: 1.01 }}
          {...props}
        />
      </div>
      {error && (
        <motion.p 
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-2 text-sm text-red-500"
        >
          {error}
        </motion.p>
      )}
    </div>
  )
})

Input.displayName = 'Input'

export default Input