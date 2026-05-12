class SpeechRecognitionService {
  constructor() {
    this.recognition = null
    this.isListening = false
    this.onResult = null
    this.onError = null
    this.onEnd = null
    
    this.init()
  }

  init() {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition
    
    if (!SpeechRecognition) {
      console.warn('Speech recognition not supported in this browser')
      return
    }

    this.recognition = new SpeechRecognition()
    this.recognition.continuous = true
    this.recognition.interimResults = true
    this.recognition.lang = 'en-US'

    this.recognition.onresult = (event) => {
      let interimTranscript = ''
      let finalTranscript = ''

      for (let i = 0; i < event.results.length; i++) {
        const transcript = event.results[i][0].transcript
        if (event.results[i].isFinal) {
          finalTranscript += transcript + ' '
        } else {
          interimTranscript += transcript
        }
      }

      // Send interim results immediately for live feedback
      if (this.onResult) {
        this.onResult(finalTranscript + interimTranscript)
      }
    }

    this.recognition.onerror = (event) => {
      console.error('Speech recognition error:', event.error)
      
      if (event.error === 'no-speech') {
        return
      }
      
      if (this.onError) {
        this.onError(event.error)
      }
    }

    this.recognition.onend = () => {
      if (this.isListening) {
        try {
          this.recognition.start()
        } catch (e) {
          console.error('Failed to restart:', e)
          this.isListening = false
          if (this.onEnd) this.onEnd()
        }
      } else {
        if (this.onEnd) this.onEnd()
      }
    }
  }

  start(onResult, onError, onEnd) {
    if (!this.recognition) {
      if (onError) onError('Speech recognition not supported')
      return
    }

    this.onResult = onResult
    this.onError = onError
    this.onEnd = onEnd
    this.isListening = true

    try {
      this.recognition.start()
    } catch (error) {
      console.error('Failed to start recognition:', error)
      setTimeout(() => {
        try {
          this.recognition.start()
        } catch (e) {
          this.isListening = false
          if (onError) onError(error.message)
        }
      }, 100)
    }
  }

  stop() {
    this.isListening = false
    if (this.recognition) {
      try {
        this.recognition.stop()
      } catch (e) {
        console.error('Error stopping recognition:', e)
      }
    }
  }

  reset() {}

  isSupported() {
    return !!(window.SpeechRecognition || window.webkitSpeechRecognition)
  }
}

class TextToSpeechService {
  constructor() {
    this.synth = window.speechSynthesis
    this.voices = []
    
    this.loadVoices()
  }

  loadVoices() {
    const loadVoiceList = () => {
      this.voices = this.synth.getVoices()
    }

    loadVoiceList()
    if (speechSynthesis.onvoiceschanged !== undefined) {
      speechSynthesis.onvoiceschanged = loadVoiceList
    }
  }

  speak(text, gender = 'female', speed = 1) {
    this.stop()
    
    const utterance = new SpeechSynthesisUtterance(text)
    
    const selectedVoices = this.voices.filter(voice => 
      gender === 'female' 
        ? voice.name.includes('Female') || voice.name.includes('Samantha') || voice.name.includes('Zira')
        : voice.name.includes('Male') || voice.name.includes('Daniel') || voice.name.includes('David')
    )

    if (selectedVoices.length > 0) {
      utterance.voice = selectedVoices[0]
    } else if (this.voices.length > 0) {
      utterance.voice = this.voices[0]
    }

    // Speed: 0.5 = slow, 1 = normal, 2 = fast
    utterance.rate = speed
    utterance.pitch = 1
    utterance.volume = 1

    this.synth.speak(utterance)
    return utterance
  }

  stop() {
    if (this.synth.speaking) {
      this.synth.cancel()
    }
  }

  isSupported() {
    return 'speechSynthesis' in window
  }
}

export const speechRecognition = new SpeechRecognitionService()
export const textToSpeech = new TextToSpeechService()

export default { speechRecognition, textToSpeech }