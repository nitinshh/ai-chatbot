import { motion } from 'framer-motion'
import { User, Sparkles } from 'lucide-react'
import Button from '../ui/Button'

const GenderSelection = ({ onSelect, onBack }) => {
  const genders = [
    {
      id: 'male',
      label: 'Male',
      description: 'Masculine features with deep voice',
      preview: '👨'
    },
    {
      id: 'female',
      label: 'Female',
      description: 'Feminine features with soft voice',
      preview: '👩'
    }
  ]

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.15 }
    }
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 }
    }
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-6 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 cyber-grid opacity-50" />
      <motion.div
        className="absolute top-0 left-0 right-0 h-32 bg-gradient-to-b from-violet-900/20 to-transparent"
      />

      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="relative z-10 w-full max-w-4xl"
      >
        <motion.div variants={itemVariants} className="text-center mb-12">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass text-violet-300 mb-6"
          >
            <Sparkles size={16} />
            <span className="text-sm">Step 2 of 5</span>
          </motion.div>
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Choose Your <span className="gradient-text">Avatar</span>
          </h2>
          <p className="text-gray-400 text-lg">
            Select the gender for your AI companion
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          {genders.map((gender, index) => (
            <motion.button
              key={gender.id}
              variants={itemVariants}
              onClick={() => onSelect(gender.id)}
              className="group relative"
            >
              <motion.div
                whileHover={{ scale: 1.03, rotate: index === 0 ? -2 : 2 }}
                whileTap={{ scale: 0.98 }}
                className="glass-card rounded-3xl p-8 cursor-pointer transition-all duration-300 border-2 border-transparent hover:border-violet-500"
              >
                <div className="flex flex-col items-center">
                  <motion.div
                    className="w-40 h-40 rounded-full bg-gradient-to-br from-violet-600 to-cyan-600 flex items-center justify-center mb-6"
                    whileHover={{ scale: 1.1 }}
                  >
                    <span className="text-7xl">{gender.preview}</span>
                  </motion.div>
                  <h3 className="text-2xl font-bold text-white mb-2">{gender.label}</h3>
                  <p className="text-gray-400 text-center">{gender.description}</p>
                </div>

                {/* Hover Effect */}
                <motion.div
                  className="absolute inset-0 rounded-3xl bg-gradient-to-r from-violet-600/20 to-cyan-600/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                />
              </motion.div>

              {/* Selection Indicator */}
              <motion.div
                className="absolute -bottom-4 left-1/2 -translate-x-1/2 px-6 py-2 rounded-full bg-violet-600 text-white text-sm font-medium opacity-0 group-hover:opacity-100 transition-opacity"
              >
                Select {gender.label}
              </motion.div>
            </motion.button>
          ))}
        </div>

        <motion.div variants={itemVariants} className="flex justify-center">
          <Button variant="ghost" onClick={onBack}>
            ← Back
          </Button>
        </motion.div>
      </motion.div>
    </div>
  )
}

export default GenderSelection