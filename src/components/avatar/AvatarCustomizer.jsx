import { useState, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  User, Palette, Shirt, Glasses, Ruler, Home,
  ChevronLeft, ChevronRight, Check
} from 'lucide-react'
import Button from '../ui/Button'
import useAppStore from '../../store/useAppStore'

const AvatarCustomizer = ({ onComplete, onBack }) => {
  const { avatarConfig, setAvatarConfig, gender } = useAppStore()
  const [activeTab, setActiveTab] = useState(0)
  const [selectedOption, setSelectedOption] = useState(0)
  const avatarRef = useRef(null)

  const tabs = [
    { id: 'face', label: 'Face', icon: User },
    { id: 'hair', label: 'Hair', icon: Palette },
    { id: 'clothes', label: 'Clothes', icon: Shirt },
    { id: 'accessories', label: 'Accessories', icon: Glasses },
    { id: 'body', label: 'Body', icon: Ruler },
    { id: 'environment', label: 'Environment', icon: Home }
  ]

  const customizationData = {
    face: {
      faceShape: ['Round', 'Oval', 'Square', 'Heart', 'Diamond'],
      skinTone: ['Light', 'Medium', 'Tan', 'Brown', 'Dark'],
      eyes: ['Round', 'Almond', 'Hooded', 'Wide', 'Sharp'],
      eyebrows: ['Thin', 'Thick', 'Arched', 'Straight', 'Bushy'],
      nose: ['Button', 'Straight', 'Hook', 'Upturned', 'Wide'],
      lips: ['Thin', 'Full', 'Medium', 'Heart', 'Bow'],
      beard: ['None', 'Short', 'Full', 'Goatee', 'Mustache'],
      makeup: ['None', 'Natural', 'Bold', 'Smoky', 'Glam']
    },
    hair: {
      hairstyle: ['Short', 'Medium', 'Long', 'Curly', 'Wavy', 'Ponytail', 'Bun', 'Bald'],
      hairColor: ['Black', 'Brown', 'Blonde', 'Red', 'Gray', 'Blue', 'Pink', 'White']
    },
    clothes: {
      shirt: ['T-Shirt', 'Hoodie', 'Sweater', 'Jacket', 'Tank', 'Button-Up'],
      pants: ['Jeans', 'Shorts', 'Sweatpants', 'Cargo', 'Chinos', 'Skirt'],
      shoes: ['Sneakers', 'Boots', 'Sandals', 'Heels', 'Loafers', 'Athletic']
    },
    accessories: {
      glasses: ['None', 'Round', 'Square', 'Aviator', 'Cat-Eye', 'Sport'],
      chains: ['None', 'Thin', 'Thick', 'Pendant', 'Chain & Bracelet'],
      hats: ['None', 'Cap', 'Beanie', 'Fedora', 'Bucket Hat', 'Headband'],
      earrings: ['None', 'Studs', 'Hoops', 'Dangles', 'Cuffs']
    },
    body: {
      height: ['Short', 'Average', 'Tall', 'Very Tall'],
      bodyType: ['Slim', 'Athletic', 'Average', 'Muscular', 'Curvy']
    },
    environment: {
      background: ['Cyber Room', 'Bedroom', 'Gaming Room', 'Futuristic Lab', 'Beach', 'City']
    }
  }

  const getCurrentOptions = () => {
    const tabKey = tabs[activeTab].id
    const optionsKey = Object.keys(customizationData[tabKey])[0]
    return customizationData[tabKey][optionsKey]
  }

  const handleOptionSelect = (index) => {
    setSelectedOption(index)
    const tabKey = tabs[activeTab].id
    const optionsKey = Object.keys(customizationData[tabKey])[0]
    setAvatarConfig({ [optionsKey]: index })
  }

  const handleNext = () => {
    if (activeTab < tabs.length - 1) {
      setActiveTab(activeTab + 1)
      setSelectedOption(0)
    } else {
      onComplete()
    }
  }

  return (
    <div className="min-h-screen flex flex-col lg:flex-row relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 cyber-grid opacity-30" />
      <motion.div
        className="absolute top-0 left-0 right-0 h-32 bg-gradient-to-b from-violet-900/20 to-transparent"
      />

      {/* Avatar Preview - Left Side */}
      <motion.div 
        initial={{ opacity: 0, x: -50 }}
        animate={{ opacity: 1, x: 0 }}
        className="lg:w-1/2 h-[40vh] lg:h-screen flex items-center justify-center p-8 relative"
      >
        <div className="relative w-full max-w-md aspect-square">
          {/* Avatar Display */}
          <motion.div
            ref={avatarRef}
            className="w-full h-full rounded-3xl glass-card flex items-center justify-center overflow-hidden"
            animate={{ rotate: [0, 2, 0, -2, 0] }}
            transition={{ duration: 8, repeat: Infinity }}
          >
            <div className="text-center">
              <motion.div
                className="w-48 h-48 rounded-full mx-auto mb-4 flex items-center justify-center"
                style={{
                  background: gender === 'male' 
                    ? 'linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%)'
                    : 'linear-gradient(135deg, #ec4899 0%, #be185d 100%)'
                }}
                animate={{ scale: [1, 1.05, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                <span className="text-8xl">
                  {gender === 'male' ? '👨' : '👩'}
                </span>
              </motion.div>
              <h3 className="text-xl font-semibold text-white">
                {gender === 'male' ? 'Alex' : 'Nova'}
              </h3>
              <p className="text-gray-400 text-sm mt-1">Preview</p>
            </div>
          </motion.div>

          {/* Floating Elements */}
          <motion.div
            className="absolute -top-4 -right-4 w-8 h-8 bg-violet-500 rounded-full blur-xl"
            animate={{ scale: [1, 1.5, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
          />
          <motion.div
            className="absolute -bottom-4 -left-4 w-12 h-12 bg-cyan-500 rounded-full blur-xl"
            animate={{ scale: [1.5, 1, 1.5] }}
            transition={{ duration: 3, repeat: Infinity }}
          />
        </div>
      </motion.div>

      {/* Customization Panel - Right Side */}
      <motion.div 
        initial={{ opacity: 0, x: 50 }}
        animate={{ opacity: 1, x: 0 }}
        className="lg:w-1/2 h-[60vh] lg:h-screen flex flex-col p-6 lg:p-10"
      >
        {/* Header */}
        <div className="text-center mb-6">
          <h2 className="text-3xl font-bold text-white mb-2">
            Customize Your <span className="gradient-text">Avatar</span>
          </h2>
          <p className="text-gray-400">
            Step {activeTab + 1} of {tabs.length}
          </p>
        </div>

        {/* Tabs */}
        <div className="flex gap-2 overflow-x-auto pb-4 mb-4 scrollbar-thin">
          {tabs.map((tab, index) => {
            const Icon = tab.icon
            return (
              <motion.button
                key={tab.id}
                onClick={() => {
                  setActiveTab(index)
                  setSelectedOption(0)
                }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className={`
                  flex items-center gap-2 px-4 py-2 rounded-xl whitespace-nowrap transition-all
                  ${activeTab === index 
                    ? 'bg-violet-600 text-white' 
                    : 'glass text-gray-400 hover:text-white hover:bg-white/10'}
                `}
              >
                <Icon size={18} />
                {tab.label}
              </motion.button>
            )
          })}
        </div>

        {/* Options Grid */}
        <div className="flex-1 overflow-y-auto">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="grid grid-cols-2 sm:grid-cols-3 gap-4"
            >
              {getCurrentOptions().map((option, index) => (
                <motion.button
                  key={option}
                  onClick={() => handleOptionSelect(index)}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className={`
                    relative p-4 rounded-xl transition-all duration-300
                    ${selectedOption === index
                      ? 'bg-violet-600 text-white border-2 border-violet-400'
                      : 'glass hover:bg-white/10 text-gray-300'}
                  `}
                >
                  <span className="font-medium">{option}</span>
                  {selectedOption === index && (
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      className="absolute top-2 right-2 w-5 h-5 bg-white rounded-full flex items-center justify-center"
                    >
                      <Check size={12} className="text-violet-600" />
                    </motion.div>
                  )}
                </motion.button>
              ))}
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Navigation */}
        <div className="flex gap-4 mt-6">
          <Button 
            variant="ghost" 
            onClick={activeTab === 0 ? onBack : () => setActiveTab(activeTab - 1)}
            className="flex-1"
          >
            <ChevronLeft size={20} />
            {activeTab === 0 ? 'Back' : 'Previous'}
          </Button>
          <Button 
            onClick={handleNext}
            className="flex-1"
          >
            {activeTab === tabs.length - 1 ? 'Complete' : 'Next'}
            <ChevronRight size={20} />
          </Button>
        </div>
      </motion.div>
    </div>
  )
}

export default AvatarCustomizer