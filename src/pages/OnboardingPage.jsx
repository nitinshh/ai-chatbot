import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import WelcomeScreen from '../components/onboarding/WelcomeScreen'
import GenderSelection from '../components/onboarding/GenderSelection'
import AvatarCustomizer from '../components/avatar/AvatarCustomizer'
import NameSelection from '../components/onboarding/NameSelection'
import PersonalitySelection from '../components/onboarding/PersonalitySelection'
import useAppStore from '../store/useAppStore'

const OnboardingPage = () => {
  const { onboardingStep, setOnboardingStep, completeOnboarding } = useAppStore()
  const [showWelcome, setShowWelcome] = useState(true)

  const handleStart = () => {
    setShowWelcome(false)
    setOnboardingStep(1)
  }

  const handleDemo = () => {
    completeOnboarding()
  }

  const handleBack = () => {
    if (onboardingStep > 1) {
      setOnboardingStep(onboardingStep - 1)
    }
  }

  const handleGenderSelect = (gender) => {
    useAppStore.getState().setGender(gender)
    setOnboardingStep(2)
  }

  const handleAvatarComplete = () => {
    setOnboardingStep(3)
  }

  const handleNameComplete = () => {
    setOnboardingStep(4)
  }

  const handlePersonalityComplete = () => {
    completeOnboarding()
  }

  if (showWelcome) {
    return <WelcomeScreen onStart={handleStart} onDemo={handleDemo} />
  }

  return (
    <div className="min-h-screen bg-dark-bg">
      <AnimatePresence mode="wait">
        {onboardingStep === 1 && (
          <motion.div
            key="gender"
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -100 }}
          >
            <GenderSelection onSelect={handleGenderSelect} onBack={handleBack} />
          </motion.div>
        )}

        {onboardingStep === 2 && (
          <motion.div
            key="customize"
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -100 }}
          >
            <AvatarCustomizer onComplete={handleAvatarComplete} onBack={handleBack} />
          </motion.div>
        )}

        {onboardingStep === 3 && (
          <motion.div
            key="name"
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -100 }}
          >
            <NameSelection onComplete={handleNameComplete} onBack={handleBack} />
          </motion.div>
        )}

        {onboardingStep === 4 && (
          <motion.div
            key="personality"
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -100 }}
          >
            <PersonalitySelection onComplete={handlePersonalityComplete} onBack={handleBack} />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export default OnboardingPage