import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Sparkles, ArrowRight, MessageCircle } from 'lucide-react'
import Button from '../ui/Button'
import useAppStore from '../../store/useAppStore'

const WelcomeScreen = ({ onStart, onDemo }) => {
  const { isOnboarded, aiName, gender } = useAppStore()
  const [showContinue, setShowContinue] = useState(false)

  useEffect(() => {
    // Check if user has already created a companion
    if (isOnboarded && aiName) {
      setShowContinue(true)
    }
  }, [isOnboarded, aiName])

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: 'easeOut' }
    }
  }

  return (
    <div className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0 cyber-grid" />
      
      {/* Gradient Orbs */}
      <motion.div
        className="absolute top-1/4 left-1/4 w-96 h-96 bg-violet-600/30 rounded-full blur-3xl"
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.3, 0.5, 0.3]
        }}
        transition={{ duration: 8, repeat: Infinity }}
      />
      <motion.div
        className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-cyan-600/30 rounded-full blur-3xl"
        animate={{
          scale: [1.2, 1, 1.2],
          opacity: [0.3, 0.5, 0.3]
        }}
        transition={{ duration: 8, repeat: Infinity, delay: 2 }}
      />
      <motion.div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-pink-600/20 rounded-full blur-3xl"
        animate={{
          rotate: [0, 360]
        }}
        transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
      />

      {/* Particles */}
      {[...Array(20)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-2 h-2 bg-violet-500 rounded-full"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
          }}
          animate={{
            y: [-100, 100],
            opacity: [0, 1, 0],
          }}
          transition={{
            duration: 3 + Math.random() * 2,
            repeat: Infinity,
            delay: Math.random() * 2,
          }}
        />
      ))}

      {/* Content */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="relative z-10 text-center px-6 max-w-4xl"
      >
        <motion.div variants={itemVariants} className="mb-6">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.3, type: 'spring' }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass text-violet-300 mb-8"
          >
            <Sparkles size={16} />
            <span className="text-sm">Powered by Advanced AI</span>
          </motion.div>
        </motion.div>

        <motion.h1
          variants={itemVariants}
          className="text-5xl md:text-7xl font-bold mb-6"
        >
          <span className="gradient-text">Create Your</span>
          <br />
          <span className="text-white">AI Companion</span>
        </motion.h1>

        <motion.p
          variants={itemVariants}
          className="text-xl text-gray-400 mb-12 max-w-2xl mx-auto"
        >
          Build a personalized AI friend with realistic 3D visuals, 
          natural conversation, and voice interaction. 
          Your perfect companion awaits.
        </motion.p>

        <motion.div
          variants={itemVariants}
          className="flex flex-col sm:flex-row gap-4 justify-center"
        >
          <Button
            size="xl"
            onClick={onStart}
            icon={ArrowRight}
          >
            Start Creating
          </Button>
          
          {showContinue ? (
            <Button
              size="xl"
              variant="secondary"
              onClick={onDemo}
              icon={MessageCircle}
            >
              Continue Chatting
            </Button>
          ) : (
            <Button
              size="xl"
              variant="secondary"
              onClick={onDemo}
            >
              Explore Demo
            </Button>
          )}
        </motion.div>

        {/* Show existing companion preview if available */}
        {showContinue && (
          <motion.div
            variants={itemVariants}
            className="mt-8 glass rounded-2xl p-4 inline-flex items-center gap-4"
          >
            <span className="text-3xl">{gender === 'male' ? '👨' : '👩'}</span>
            <div className="text-left">
              <p className="text-white font-medium">Welcome back!</p>
              <p className="text-gray-400 text-sm">Continue chatting with {aiName}</p>
            </div>
          </motion.div>
        )}

        {/* Features */}
        <motion.div
          variants={itemVariants}
          className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8"
        >
          {[
            { title: 'Realistic 3D', desc: 'Full-body avatars with smooth animations' },
            { title: 'Voice Chat', desc: 'Natural speech interaction' },
            { title: 'Smart AI', desc: 'Personality-based conversations' }
          ].map((feature, i) => (
            <motion.div
              key={i}
              whileHover={{ y: -5 }}
              className="glass-card rounded-xl p-6"
            >
              <h3 className="text-lg font-semibold text-white mb-2">{feature.title}</h3>
              <p className="text-gray-400 text-sm">{feature.desc}</p>
            </motion.div>
          ))}
        </motion.div>
      </motion.div>
    </div>
  )
}

export default WelcomeScreen