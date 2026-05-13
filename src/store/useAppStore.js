import { create } from 'zustand'
import { persist } from 'zustand/middleware'

const useAppStore = create(
  persist(
    (set, get) => ({
      theme: 'dark',
      onboardingStep: 0,
      isOnboarded: false,
      userName: '',
      aiName: '',
      gender: 'female',
      personality: 'friendly',
      speechSpeed: 1,
      communicationMode: 'text+speak',
      language: 'english',
      supportedLanguages: [
        { code: 'english', name: 'English', nativeName: 'English', flag: '🇺🇸' },
        { code: 'spanish', name: 'Spanish', nativeName: 'Español', flag: '🇪🇸' },
        { code: 'french', name: 'French', nativeName: 'Français', flag: '🇫🇷' },
        { code: 'german', name: 'German', nativeName: 'Deutsch', flag: '🇩🇪' },
        { code: 'italian', name: 'Italian', nativeName: 'Italiano', flag: '🇮🇹' },
        { code: 'portuguese', name: 'Portuguese', nativeName: 'Português', flag: '🇵🇹' },
        { code: 'russian', name: 'Russian', nativeName: 'Русский', flag: '🇷🇺' },
        { code: 'japanese', name: 'Japanese', nativeName: '日本語', flag: '🇯🇵' },
        { code: 'korean', name: 'Korean', nativeName: '한국어', flag: '🇰🇷' },
        { code: 'chinese', name: 'Chinese', nativeName: '中文', flag: '🇨🇳' },
        { code: 'hindi', name: 'Hindi', nativeName: 'हिन्दी', flag: '🇮🇳' },
        { code: 'arabic', name: 'Arabic', nativeName: 'العربية', flag: '🇸🇦' },
      ],
      avatarConfig: {
        faceShape: 0,
        skinTone: 0,
        eyes: 0,
        eyebrows: 0,
        nose: 0,
        lips: 0,
        beard: 0,
        makeup: 0,
        hairstyle: 0,
        hairColor: 0,
        shirt: 0,
        pants: 0,
        shoes: 0,
        accessories: 0,
        environment: 0
      },
      setTheme: (theme) => set({ theme }),
      toggleTheme: () => set((state) => ({ theme: state.theme === 'dark' ? 'light' : 'dark' })),
      setOnboardingStep: (step) => set({ onboardingStep: step }),
      nextStep: () => set((state) => ({ onboardingStep: state.onboardingStep + 1 })),
      prevStep: () => set((state) => ({ onboardingStep: Math.max(0, state.onboardingStep - 1) })),
      completeOnboarding: () => set({ isOnboarded: true }),
      setUserName: (name) => set({ userName: name }),
      setAiName: (name) => set({ aiName: name }),
      setGender: (gender) => set({ gender }),
      setPersonality: (personality) => set({ personality }),
      setSpeechSpeed: (speed) => set({ speechSpeed: speed }),
      setCommunicationMode: (mode) => set({ communicationMode: mode }),
      setLanguage: (language) => set({ language }),
      setAvatarConfig: (config) => set((state) => ({ 
        avatarConfig: { ...state.avatarConfig, ...config } 
      })),
      resetOnboarding: () => set({
        onboardingStep: 0,
        isOnboarded: false,
        userName: '',
        aiName: '',
        gender: 'female',
        personality: 'friendly',
        language: 'english'
      })
    }),
    {
      name: 'ai-companion-storage',
      partialize: (state) => ({
        theme: state.theme,
        isOnboarded: state.isOnboarded,
        userName: state.userName,
        aiName: state.aiName,
        gender: state.gender,
        personality: state.personality,
        speechSpeed: state.speechSpeed,
        communicationMode: state.communicationMode,
        language: state.language,
        avatarConfig: state.avatarConfig
      })
    }
  )
)

export default useAppStore