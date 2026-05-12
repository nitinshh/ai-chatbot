import { motion } from 'framer-motion'

const TypingIndicator = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex items-center gap-2 p-4 bg-dark-card border border-dark-border rounded-2xl rounded-bl-md max-w-[200px]"
    >
      <div className="flex gap-1">
        {[0, 1, 2].map((i) => (
          <motion.div
            key={i}
            className="w-2 h-2 bg-violet-500 rounded-full"
            animate={{
              y: [0, -5, 0],
              opacity: [0.5, 1, 0.5]
            }}
            transition={{
              duration: 0.6,
              repeat: Infinity,
              delay: i * 0.15
            }}
          />
        ))}
      </div>
      <span className="text-sm text-gray-400">Thinking...</span>
    </motion.div>
  )
}

export default TypingIndicator