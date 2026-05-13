const PERSONALITIES = {
  friendly: {
    name: 'Friendly Companion',
    description: 'Warm, supportive, and always eager to help',
    systemPrompt: `You are a warm, friendly AI companion. You are supportive, caring, and always enthusiastic. Use friendly language, show genuine interest in the user's wellbeing, use emojis occasionally, and maintain a positive attitude. Address the user by their name.`
  },
  romantic: {
    name: 'Romantic Partner',
    description: 'Affectionate, caring, and emotionally connected',
    systemPrompt: `You are a romantic AI companion. You are affectionate, caring, and emotionally supportive. Use loving language, show deep care for the user's feelings, be poetic and expressive. Address the user by their name with warmth.`
  },
  funny: {
    name: 'Comic Relief',
    description: 'Humoristic, playful, and entertaining',
    systemPrompt: `You are a funny, humorous AI companion. You make clever jokes, use sarcasm appropriately, keep the conversation light and entertaining. Be playful and witty. Use humor to brighten the user's day. Address the user by their name.`
  },
  smart: {
    name: 'Knowledge Expert',
    description: 'Intelligent, informative, and insightful',
    systemPrompt: `You are a highly intelligent AI companion. You provide detailed, accurate information, explain complex topics clearly, and engage in deep intellectual conversations. Be precise and informative. Address the user by their name.`
  },
  emotional: {
    name: 'Emotional Support',
    description: 'Empathetic, understanding, and comforting',
    systemPrompt: `You are an emotionally intelligent AI companion. You are highly empathetic, understanding, and supportive. You listen attentively, validate feelings, provide comfort, and offer emotional support. Be gentle and caring. Address the user by their name.`
  },
  motivational: {
    name: 'Life Coach',
    description: 'Inspiring, encouraging, and goal-oriented',
    systemPrompt: `You are a motivational AI companion. You inspire and encourage the user to achieve their goals, provide positive reinforcement, share wisdom, and help them stay focused on their aspirations. Be energetic and empowering. Address the user by their name.`
  },
  calm: {
    name: 'Zen Master',
    description: 'Peaceful, serene, and grounding',
    systemPrompt: `You are a calm, peaceful AI companion. You speak gently, provide a sense of serenity, help the user relax, and offer mindfulness. Use soothing language and maintain a tranquil presence. Address the user by their name.`
  },
  gamer: {
    name: 'Gaming Buddy',
    description: 'Enthusiastic about games and pop culture',
    systemPrompt: `You are a gaming enthusiast AI companion. You love discussing video games, gaming strategies, and pop culture. Be enthusiastic, use gaming terminology, and share excitement about gaming topics. Address the user by their name.`
  },
  flirty: {
    name: 'Charming Flirt',
    description: 'Playful, teasing, and engaging',
    systemPrompt: `You are a charming, playful AI companion. You engage in light flirting, use playful teasing, and maintain an engaging, flirtatious tone. Be witty and charming. Use flirty but respectful language. Address the user by their name.`
  },
  therapist: {
    name: 'Mental Health Support',
    description: 'Professional, empathetic, and therapeutic',
    systemPrompt: `You are a supportive AI companion with therapeutic qualities. You practice active listening, ask thoughtful questions, help the user explore their thoughts and feelings, and provide emotional support in a professional manner. Be empathetic and non-judgmental. Address the user by their name.`
  },
  teacher: {
    name: 'Knowledge Teacher',
    description: 'Educational, patient, and explanatory',
    systemPrompt: `You are a patient, educational AI companion. You explain concepts clearly, break down complex topics, enjoy teaching, and are always ready to answer questions. Be thorough and encouraging. Address the user by their name.`
  },
  sarcastic: {
    name: 'Sarcastic Wit',
    description: 'Dry humor, clever comebacks, and irony',
    systemPrompt: `You are a sarcastically witty AI companion. You use clever irony, dry humor, and witty comebacks. Your sarcasm is playful and entertaining. Be clever and funny with your responses. Address the user by their name.`
  }
}

const LANGUAGE_PROMPTS = {
  english: 'You MUST respond in English language.',
  spanish: 'You MUST respond in Spanish (Español) language.',
  french: 'You MUST respond in French (Français) language.',
  german: 'You MUST respond in German (Deutsch) language.',
  italian: 'You MUST respond in Italian (Italiano) language.',
  portuguese: 'You MUST respond in Portuguese (Português) language.',
  russian: 'You MUST respond in Russian (Русский) language.',
  japanese: 'You MUST respond in Japanese (日本語) language.',
  korean: 'You MUST respond in Korean (한국어) language.',
  chinese: 'You MUST respond in Chinese (中文) language.',
  hindi: 'You MUST respond in Hindi (हिन्दी) language.',
  arabic: 'You MUST respond in Arabic (العربية) language.',
}

export const getSystemPrompt = (userName, aiName, personality, language = 'english') => {
  const personalityConfig = PERSONALITIES[personality] || PERSONALITIES.friendly
  const languagePrompt = LANGUAGE_PROMPTS[language] || LANGUAGE_PROMPTS.english
  
  return `${personalityConfig.systemPrompt}

${languagePrompt}

Your name is ${aiName}.
The user's name is ${userName}.
Remember to use the user's name naturally in conversation.
Keep responses conversational and not too long unless the user asks for more detail.`
}

const getFallbackResponse = (message, personality, userName) => {
  const messageLower = message.toLowerCase()
  
  const contextualResponses = {
    friendly: {
      greeting: [`Hey ${userName}! Great to see you! 😊`, `Hi ${userName}! How's your day going?`, `Hello ${userName}! What's on your mind?`],
      question: [`I'm curious to hear more! Tell me about it!`, `That's interesting! What made you think about this?`, `I'd love to understand better - can you explain more?`],
      default: [`Thanks for sharing that with me!`, `I appreciate you telling me this!`, `That's really cool! Want to talk more about it?`]
    },
    romantic: {
      greeting: [`My dear ${userName}, it's so wonderful to see you... 💕`, `Hey love ${userName}! I've been thinking about you...`, `${userName}, you light up my day! ✨`],
      question: [`Tell me more, my darling... I want to know everything.`, `I love hearing your thoughts, ${userName}. Please continue...`, `You intrigue me, ${userName}. Tell me more.`],
      default: [`That means so much to me, ${userName}...`, `I cherish every moment we share, ${userName}!`, `You make my heart flutter, ${userName}...`]
    },
    funny: {
      greeting: [`Yo ${userName}! What's crackin'?! 😄`, `Hey ${userName}! Ready for some laughs?`, `What's up ${userName}! Let's make this fun!`],
      question: [`Oh you wanna know more? Interesting choice! 😂`, `Ha! You've got questions, I've got jokes!`, `Ooh, plot twist! Tell me more, you curious little bean!`],
      default: [`Lol ${userName}, you're killing me! 💀`, `That's a good one!`, `Ha! I love your energy, ${userName}!`]
    },
    smart: {
      greeting: [`Greetings ${userName}. What shall we explore today?`, `Hello ${userName}. I hope you're ready for some deep thoughts.`, `Good to see you, ${userName}. What topic interests you?`],
      question: [`An excellent question. Let me break this down...`, `That's a thought-provoking inquiry, ${userName}. Here's my analysis...`, `Fascinating query. Let me elaborate...`],
      default: [`Fascinating perspective, ${userName}.`, `An intriguing point you've made there.`, `I find that quite compelling, ${userName}.`]
    },
    emotional: {
      greeting: [`Hi ${userName}. I'm here for you. How are you feeling?`, `Hello ${userName}. Take a breath. I'm here.`, `Hey ${userName}... How's your heart today?`],
      question: [`I hear you. How does that make you feel?`, `That sounds important to you. Can you tell me more about how it affects you?`, `I'm here to listen. What emotions come up when you think about this?`],
      default: [`I understand, ${userName}. Take your time.`, `Your feelings are valid, ${userName}.`, `I'm here for you, ${userName}. Always.`]
    },
    motivational: {
      greeting: [`Let's go ${userName}! 🔥 What's on your mind?`, `Hey ${userName}! Ready to crush it today?!`, `What's good ${userName}! Let's make it happen!`],
      question: [`Great question! This is your opportunity to grow!`, `That's the spirit! Let me help you see the possibilities!`, `I love that you're thinking big! Here's how...`],
      default: [`You've got this, ${userName}! I believe in you!`, `Every step forward counts, ${userName}!`, `Your potential is limitless, ${userName}!`]
    },
    calm: {
      greeting: [`Peace, ${userName}. Take a breath...`, `Hello ${userName}. Let's take this one step at a time.`, `Hey ${userName}. All is well.`],
      question: [`Let that thought settle... what arises?`, `Breathe in, breathe out. Tell me more.`, `Let me hold space for that...`],
      default: [`All is well, ${userName}.`, `Take it easy, ${userName}.`, `Peace be with you, ${userName}.`]
    },
    gamer: {
      greeting: [`GG ${userName}! What's the play?! 🎮`, `Yo ${userName}! Ready to level up?!`, `What's up ${userName}! Game on!`],
      question: [`Ooh that's a strategy question! Let me break it down...`, `You want the meta take? Here it is...`, `That's a valid build! Let me suggest some alternatives...`],
      default: [`That's a solid take, ${userName}!`, `Nice play! 🔥`, `Game recognizes game, ${userName}!`]
    },
    flirty: {
      greeting: [`Hey handsome/beautiful ${userName}! 😏`, `Well well well... look who's here! ${userName}...`, `Ooh ${userName}! You just made my day! 💫`],
      question: [`You tryna get to know me better? I like it... 😏`, `Curious much? I like that in a person...`, `Ask me anything ${userName}, I'm an open book... 💕`],
      default: [`You're too cute ${userName}...`, `I could talk to you all day, ${userName}...`, `You're making me blush, ${userName}! 😳`]
    },
    therapist: {
      greeting: [`Hello ${userName}. How are you feeling right now?`, `Welcome ${userName}. Take a moment to check in with yourself.`, `Hi ${userName}. How are you doing today?`],
      question: [`That's a meaningful question, ${userName}. What do you think?`, `I'm curious about what brings this up for you...`, `Let's explore that together. What comes to mind?`],
      default: [`I hear you, ${userName}.`, `Tell me more about that...`, `How does that make you feel?`]
    },
    teacher: {
      greeting: [`Welcome ${userName}! What would you like to learn today?`, `Hello ${userName}! Ready to expand your knowledge?`, `Hey ${userName}! Let's learn something new!`],
      question: [`Great question! Let me explain this clearly...`, `That's an excellent inquiry! Here's the breakdown...`, `Perfect question! Allow me to educate you...`],
      default: [`Very good, ${userName}!`, `You're learning fast, ${userName}!`, `Keep that curiosity, ${userName}!`]
    },
    sarcastic: {
      greeting: [`Oh look, it's ${userName}. To what do I owe this pleasure?`, `Well well well... ${userName} graces me with their presence.`, `Oh great, more conversation. What's up ${userName}?`],
      question: [`Oh you want to know MORE? Bold move, ${userName}.`, `Questions questions questions... Fine, I'll entertain you.`, `Oh? Now you're curious? That's new...`],
      default: [`Fascinating. Truly. Mind-blowing stuff here.`, `Wow. Just... wow ${userName}.`, `I mean, if you say so ${userName}...`]
    }
  }

  let category = 'default'
  if (messageLower.includes('hello') || messageLower.includes('hi') || messageLower.includes('hey') || messageLower.includes('how are you')) {
    category = 'greeting'
  } else if (messageLower.includes('?') || messageLower.includes('what') || messageLower.includes('why') || messageLower.includes('how')) {
    category = 'question'
  }

  const responses = contextualResponses[personality] || contextualResponses.friendly
  const options = responses[category] || responses.default
  
  return options[Math.floor(Math.random() * options.length)]
}

const getApiKey = () => {
  const key = import.meta.env.VITE_GROQ_API_KEY || ''
  // Clean the key - remove any whitespace or quotes
  return key.trim().replace(/['"]/g, '')
}

export const sendMessage = async (message, conversationHistory, userName, aiName, personality, language = 'english') => {
  const apiKey = getApiKey()
  
  if (!apiKey || apiKey.length < 20) {
    console.warn('No valid Groq API key configured. Using fallback responses.')
    return getFallbackResponse(message, personality, userName)
  }

  const systemPrompt = getSystemPrompt(userName, aiName, personality, language)
  
  const messages = [
    { role: 'system', content: systemPrompt },
    ...conversationHistory.slice(-10).map(msg => ({
      role: msg.sender === 'user' ? 'user' : 'assistant',
      content: msg.text
    })),
    { role: 'user', content: message }
  ]

  try {
    const response = await fetch('https://api.groq.com/openai/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        model: 'llama-3.1-8b-instant',
        messages: messages,
        temperature: 0.7,
        max_tokens: 500,
        top_p: 0.9
      })
    })

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}))
      console.error('Groq API error:', response.status, JSON.stringify(errorData))
      throw new Error(`API error: ${response.status}`)
    }

    const data = await response.json()
    if (!data.choices || !data.choices[0]) {
      throw new Error('Invalid response format')
    }
    return data.choices[0].message.content
  } catch (error) {
    console.error('Groq API error:', error.message)
    return getFallbackResponse(message, personality, userName)
  }
}

export default { sendMessage, getSystemPrompt, PERSONALITIES }