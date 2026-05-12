import { useState } from 'react'
import { motion } from 'framer-motion'
import { Sparkles, ChevronRight, Heart, Zap, Brain, Smile, Moon, Gamepad, Flame, Stethoscope, GraduationCap, Wind } from 'lucide-react'
import Button from '../ui/Button'
import useAppStore from '../../store/useAppStore'

const personalities = [
  { id: 'friendly', name: 'Friendly', desc: 'Warm and supportive', icon: Heart, color: 'from-pink-500 to-rose-500' },
  { id: 'romantic', name: 'Romantic', desc: 'Affectionate and caring', icon: Heart, color: 'from-red-500 to-pink-500' },
  { id: 'funny', name: 'Funny', desc: 'Humoristic and playful', icon: Smile, color: 'from-yellow-500 to-orange-500' },
  { id: 'smart', name: 'Smart', desc: 'Intelligent and insightful', icon: Brain, color: 'from-blue-500 to-cyan-500' },
  { id: 'emotional', name: 'Emotional', desc: 'Empathetic and understanding', icon: Wind, color: 'from-teal-500 to-green-500' },
  { id: 'motivational', name: 'Motivational', desc: 'Inspiring and encouraging', icon: Zap, color: 'from-amber-500 to-yellow-500' },
  { id: 'calm', name: 'Calm', desc: 'Peaceful and grounding', icon: Moon, color: 'from-indigo-500 to-purple-500' },
  { id: 'gamer', name: 'Gamer', desc: 'Enthusiastic about gaming', icon: Gamepad, color: 'from-purple-500 to-violet-500' },
  { id: 'flirty', name: 'Flirty', desc: 'Playful and charming', icon: Flame, color: 'from-orange-500 to-red-500' },
  { id: 'therapist', name: 'Therapist', desc: 'Professional support', icon: Stethoscope, color: 'from-green-500 to-teal-500' },
  { id: 'teacher', name: 'Teacher', desc: 'Educational and patient', icon: GraduationCap, color: 'from-cyan-500 to-blue-500' },
  { id: 'sarcastic', name: 'Sarcastic', desc: 'Witty and clever', icon: Wind, color: 'from-gray-500 to-slate-500' }
]

const PersonalitySelection = ({ onComplete, onBack }) => {
  const { personality, setPersonality } = useAppStore()
  const [selected, setSelected] = useState(personality)

  const handleComplete = () => {
    setPersonality(selected)
    onComplete()
  }

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.05 }
    }
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.3 }
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
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="relative z-10 w-full max-w-5xl"
      >
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8"
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass text-violet-300 mb-6"
          >
            <Sparkles size={16} />
            <span className="text-sm">Step 5 of 5</span>
          </motion.div>
          <h2 className="text-4xl font-bold text-white mb-4">
            Choose Their <span className="gradient-text">Personality</span>
          </h2>
          <p className="text-gray-400 max-w-xl mx-auto">
            This determines how your AI companion speaks, responds, and behaves
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 mb-8"
        >
          {personalities.map((p) => {
            const Icon = p.icon
            const isSelected = selected === p.id

            return (
              <motion.button
                key={p.id}
                variants={itemVariants}
                onClick={() => setSelected(p.id)}
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                className={`
                  relative p-4 rounded-2xl transition-all duration-300 overflow-hidden
                  ${isSelected 
                    ? 'ring-2 ring-violet-500 ring-offset-2 ring-offset-dark-bg' 
                    : 'hover:ring-2 hover:ring-white/20'}
                `}
              >
                <div className={`
                  absolute inset-0 bg-gradient-to-br ${p.color} opacity-20
                  ${isSelected ? 'opacity-40' : ''}
                `} />
                <div className="relative">
                  <div className={`
                    w-12 h-12 rounded-xl mb-3 flex items-center justify-center
                    bg-gradient-to-br ${p.color}
                  `}>
                    <Icon size={24} className="text-white" />
                  </div>
                  <h3 className="font-semibold text-white mb-1">{p.name}</h3>
                  <p className="text-xs text-gray-400">{p.desc}</p>
                </div>

                {isSelected && (
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="absolute top-2 right-2 w-6 h-6 bg-violet-600 rounded-full flex items-center justify-center"
                  >
                    <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </motion.div>
                )}
              </motion.button>
            )
          })}
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="glass-card rounded-2xl p-6 mb-8"
        >
          <h4 className="text-white font-medium mb-3">Selected Personality:</h4>
          <div className="flex items-center gap-4">
            <div className={`
              w-16 h-16 rounded-2xl flex items-center justify-center
              bg-gradient-to-br ${personalities.find(p => p.id === selected)?.color || 'from-violet-500 to-purple-500'}
            `}>
              {(() => {
                const Icon = personalities.find(p => p.id === selected)?.icon || Heart
                return <Icon size={32} className="text-white" />
              })()}
            </div>
            <div>
              <h3 className="text-xl font-bold text-white">
                {personalities.find(p => p.id === selected)?.name || 'Friendly'}
              </h3>
              <p className="text-gray-400">
                {personalities.find(p => p.id === selected)?.desc || 'Warm and supportive'}
              </p>
            </div>
          </div>
        </motion.div>

        <div className="flex gap-4 justify-center">
          <Button variant="ghost" onClick={onBack}>
            ← Back
          </Button>
          <Button onClick={handleComplete} size="lg">
            Complete Setup
            <ChevronRight size={20} />
          </Button>
        </div>
      </motion.div>
    </div>
  )
}

export default PersonalitySelection