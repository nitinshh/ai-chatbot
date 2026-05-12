import { useState, useCallback, useEffect } from 'react'
import { speechRecognition } from '../services/speechService'

export const useSpeechRecognition = () => {
  const [isListening, setIsListening] = useState(false)
  const [transcript, setTranscript] = useState('')
  const [error, setError] = useState(null)
  const [isSupported, setIsSupported] = useState(true)

  useEffect(() => {
    setIsSupported(speechRecognition.isSupported())
  }, [])

  const startListening = useCallback(() => {
    if (!isSupported) {
      setError('Speech recognition not supported in this browser')
      return
    }

    setError(null)
    setTranscript('')
    
    speechRecognition.start(
      (result) => {
        setTranscript(result)
      },
      (err) => {
        setError(err)
        setIsListening(false)
      },
      () => {
        setIsListening(false)
      }
    )
    
    setIsListening(true)
  }, [isSupported])

  const stopListening = useCallback(() => {
    speechRecognition.stop()
    setIsListening(false)
  }, [])

  const resetTranscript = useCallback(() => {
    setTranscript('')
  }, [])

  return {
    isListening,
    transcript,
    error,
    isSupported,
    startListening,
    stopListening,
    resetTranscript
  }
}

export default useSpeechRecognition