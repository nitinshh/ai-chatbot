import { create } from 'zustand'
import { persist } from 'zustand/middleware'

const useChatStore = create(
  persist(
    (set, get) => ({
      messages: [],
      isTyping: false,
      isSpeaking: false,
      addMessage: (message) => set((state) => ({
        messages: [...state.messages, {
          ...message,
          id: Date.now() + Math.random(),
          timestamp: new Date().toISOString()
        }]
      })),
      setTyping: (typing) => set({ isTyping: typing }),
      setSpeaking: (speaking) => set({ isSpeaking: speaking }),
      clearMessages: () => set({ messages: [] }),
      getMessages: () => get().messages
    }),
    {
      name: 'ai-companion-chat'
    }
  )
)

export default useChatStore