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
      speechSpeed: 1, // 1 = normal, 1.5 = fast
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
      setAvatarConfig: (config) => set((state) => ({ 
        avatarConfig: { ...state.avatarConfig, ...config } 
      })),
      resetOnboarding: () => set({
        onboardingStep: 0,
        isOnboarded: false,
        userName: '',
        aiName: '',
        gender: 'female',
        personality: 'friendly'
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
        avatarConfig: state.avatarConfig
      })
    }
  )
)

export default useAppStore