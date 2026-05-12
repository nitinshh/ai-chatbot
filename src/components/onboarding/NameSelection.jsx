import { useState } from 'react'
import { motion } from 'framer-motion'
import { Sparkles, ChevronRight } from 'lucide-react'
import Button from '../ui/Button'
import Input from '../ui/Input'
import useAppStore from '../../store/useAppStore'

const NameSelection = ({ onComplete, onBack }) => {
  const { userName, aiName, setUserName, setAiName, gender } = useAppStore()
  const [step, setStep] = useState(0)
  const [inputName, setInputName] = useState(step === 0 ? aiName : userName)
  const [error, setError] = useState('')

  const suggestedAiNames = gender === 'male' 
    ? ['Alex', 'Kai', 'Jordan', 'Mason', 'Ethan', 'Nova']
    : ['Nova', 'Luna', 'Aria', 'Zoe', 'Maya', 'Kai']

  const suggestedUserNames = ['You', 'Friend', 'Buddy', 'Human', 'Companion']

  const handleSubmit = () => {
    const name = inputName.trim()
    if (!name) {
      setError('Please enter a name')
      return
    }

    if (name.length < 2 || name.length > 20) {
      setError('Name must be 2-20 characters')
      return
    }

    if (step === 0) {
      setAiName(name)
      setStep(1)
      setInputName(userName || '')
      setError('')
    } else {
      setUserName(name || 'Friend')
      onComplete()
    }
  }

  const handleSuggestionClick = (name) => {
    setInputName(name)
    setError('')
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-6 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 cyber-grid opacity-50" />
      <motion.div
        className="absolute top-0 left-0 right-0 h-32 bg-gradient-to-b from-violet-900/20 to-transparent"
      />

      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="relative z-10 w-full max-w-xl"
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
            <span className="text-sm">Step 4 of 5</span>
          </motion.div>
          <h2 className="text-4xl font-bold text-white mb-4">
            {step === 0 ? (
              <>What should your <span className="gradient-text">AI</span> be called?</>
            ) : (
              <>What should the AI <span className="gradient-text">call you</span>?</>
            )}
          </h2>
          <p className="text-gray-400">
            {step === 0 
              ? 'Choose a name for your companion' 
              : 'This is how your companion will address you'}
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="glass-card rounded-2xl p-8"
        >
          <Input
            value={inputName}
            onChange={(e) => {
              setInputName(e.target.value)
              setError('')
            }}
            placeholder={step === 0 ? 'Enter AI name...' : 'Enter your name...'}
            error={error}
            className="text-center text-lg"
          />

          <div className="mt-6">
            <p className="text-sm text-gray-400 mb-3">
              {step === 0 ? 'Suggestions:' : 'Or choose:'}
            </p>
            <div className="flex flex-wrap gap-2 justify-center">
              {(step === 0 ? suggestedAiNames : suggestedUserNames).map((name) => (
                <motion.button
                  key={name}
                  onClick={() => handleSuggestionClick(name)}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className={`
                    px-4 py-2 rounded-full transition-all
                    ${inputName === name 
                      ? 'bg-violet-600 text-white' 
                      : 'glass hover:bg-white/10 text-gray-300'}
                  `}
                >
                  {name}
                </motion.button>
              ))}
            </div>
          </div>

          <div className="flex gap-4 mt-8">
            <Button 
              variant="ghost" 
              onClick={step === 0 ? onBack : () => {
                setStep(0)
                setInputName(aiName)
              }}
              className="flex-1"
            >
              ← Back
            </Button>
            <Button 
              onClick={handleSubmit}
              className="flex-1"
            >
              {step === 0 ? 'Next' : 'Continue'}
              <ChevronRight size={20} />
            </Button>
          </div>
        </motion.div>

        {/* Preview */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="text-center mt-8"
        >
          <div className="inline-flex items-center gap-4 glass rounded-full px-6 py-3">
            <span className="text-2xl">{gender === 'male' ? '👨' : '👩'}</span>
            <div className="text-left">
              <p className="text-white font-medium">{aiName || 'AI Companion'}</p>
              <p className="text-gray-400 text-sm">calls you <span className="text-violet-400">{userName || 'Friend'}</span></p>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </div>
  )
}

export default NameSelection