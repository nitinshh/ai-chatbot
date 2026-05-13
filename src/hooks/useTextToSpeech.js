import { useState, useCallback, useEffect } from 'react'
import { textToSpeech } from '../services/speechService'
import useAppStore from '../store/useAppStore'

const stripEmojis = (text) => {
  const emojiRegex = /[\u{1F600}-\u{1F64F}\u{1F300}-\u{1F5FF}\u{1F680}-\u{1F6FF}\u{1F1E0}-\u{1F1FF}\u{2600}-\u{26FF}\u{2700}-\u{27BF}\u{1F900}-\u{1F9FF}\u{1FA00}-\u{1FA6F}\u{1FA70}-\u{1FAFF}\u{FE00}-\u{FE0F}]/gu
  return text.replace(emojiRegex, '')
}

export const useTextToSpeech = () => {
  const [isSpeaking, setIsSpeaking] = useState(false)
  const [isSupported, setIsSupported] = useState(true)
  const { gender, speechSpeed } = useAppStore()

  useEffect(() => {
    setIsSupported(textToSpeech.isSupported())
  }, [])

  const speak = useCallback((text, language = 'english') => {
    if (!isSupported) {
      console.warn('Text-to-speech not supported')
      return
    }

    textToSpeech.stop()
    
    const textWithoutEmojis = stripEmojis(text)
    const utterance = textToSpeech.speak(textWithoutEmojis, gender, speechSpeed, language)
    
    utterance.onstart = () => setIsSpeaking(true)
    utterance.onend = () => setIsSpeaking(false)
    utterance.onerror = () => setIsSpeaking(false)
  }, [isSupported, gender, speechSpeed])

  const stop = useCallback(() => {
    textToSpeech.stop()
    setIsSpeaking(false)
  }, [])

  return {
    isSpeaking,
    isSupported,
    speak,
    stop
  }
}

export default useTextToSpeech