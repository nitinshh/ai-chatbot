# AI Companion - Futuristic 3D Avatar Chat Application

## Project Overview

**Project Name:** AI Companion
**Type:** Web Application (SPA)
**Core Functionality:** A premium AI companion application featuring realistic 3D avatars, real-time chat, voice interaction, and deep customization options.
**Target Users:** Users seeking AI companionship, entertainment, and emotional support.

---

## UI/UX Specification

### Layout Structure

#### Page Sections
1. **Welcome Screen** - Hero section with animated background
2. **Onboarding Flow** - Multi-step wizard (5 steps)
3. **Main Chat Interface** - Split view (30% avatar / 70% chat)

#### Responsive Breakpoints
- **Mobile:** < 768px (stacked layout)
- **Tablet:** 768px - 1024px (adjusted split)
- **Desktop:** > 1024px (full split view)

### Visual Design

#### Color Palette

**Dark Mode (Default):**
- Background Primary: `#0a0a0f` (Deep black)
- Background Secondary: `#12121a` (Dark purple-black)
- Surface: `#1a1a2e` (Dark purple)
- Primary Accent: `#8b5cf6` (Violet)
- Secondary Accent: `#06b6d4` (Cyan)
- Tertiary Accent: `#ec4899` (Pink)
- Success: `#10b981` (Green)
- Error: `#ef4444` (Red)
- Text Primary: `#ffffff`
- Text Secondary: `#94a3b8`
- Border: `#2d2d3a`

**Light Mode:**
- Background Primary: `#f8fafc`
- Background Secondary: `#f1f5f9`
- Surface: `#ffffff`
- Primary Accent: `#7c3aed` (Violet)
- Secondary Accent: `#0891b2` (Cyan)
- Text Primary: `#1e293b`
- Text Secondary: `#64748b`

#### Typography
- **Font Family:** "Inter", "Space Grotesk" (headings)
- **Heading 1:** 48px, weight 700
- **Heading 2:** 36px, weight 600
- **Heading 3:** 24px, weight 600
- **Body:** 16px, weight 400
- **Small:** 14px, weight 400

#### Spacing System
- Base unit: 4px
- Spacing scale: 4, 8, 12, 16, 24, 32, 48, 64, 96

#### Visual Effects
- **Glassmorphism:** backdrop-blur-xl, bg-opacity-20
- **Neon Glow:** box-shadow with accent colors
- **Gradients:** Linear gradients for backgrounds and borders
- **Shadows:** Multi-layered soft shadows

### Components

#### 1. Welcome Screen
- Large heading with gradient text
- Animated particle background
- Two CTA buttons with hover glow effects

#### 2. Gender Selection Cards
- Large 3D preview cards (200x280px)
- Hover: scale(1.05), rotate 5deg
- Active: border glow animation
- Avatar preview rotates on hover

#### 3. Avatar Customization Panel
- Left: Full 3D avatar preview (interactive rotate)
- Right: Tabbed customization options
- Tabs: Face, Hair, Clothes, Accessories, Body, Environment

#### 4. Chat Interface
- Left: Live 3D avatar with animations
- Right: Message list with bubbles
- Top: Status bar with avatar info
- Bottom: Input area with voice controls

#### 5. Message Bubbles
- User: Right-aligned, primary accent background
- AI: Left-aligned, surface background
- Typing indicator: Animated dots

---

## Functionality Specification

### Core Features

#### 1. Onboarding Flow (5 Steps)
1. **Welcome** - Landing with CTA
2. **Gender Selection** - Male/Female choice
3. **Avatar Customization** - Full-body customization
4. **Name Selection** - AI name + User name
5. **Personality Selection** - 12 personality types

#### 2. 3D Avatar System
- Full-body 3D avatar (React Three Fiber)
- Pre-built avatar models (Ready Player Me style)
- Idle animations (breathing, blinking, subtle movement)
- Talking animations (lip sync, gestures)
- Interactive rotation via mouse drag
- Dynamic lighting and shadows

#### 3. Avatar Customization Options
- **Face:** Shape, skin tone, eyes, eyebrows, nose, lips, beard, makeup
- **Hair:** Style, color
- **Clothes:** Shirts, hoodies, jackets, pants, shoes
- **Accessories:** Glasses, chains, hats, earrings, watches
- **Body:** Height, body type
- **Environment:** Background scenes (Cyber, Bedroom, Gaming, Futuristic)

#### 4. Chat System
- Real-time messaging
- AI responses via Groq API
- Chat history persistence (localStorage)
- Typing indicators
- Message timestamps
- Emoji support

#### 5. Voice Interaction
- Speech-to-text via Web Speech API
- Text-to-speech for AI responses
- Gender-based voice selection
- Voice activation button with animation

#### 6. AI Personality System
- 12 personality types with unique behaviors
- Dynamic system prompts
- Context-aware responses
- Name and preference memory

### User Interactions
- Click to select options
- Drag to rotate avatar
- Tap microphone for voice input
- Scroll through chat history
- Toggle themes
- Settings panel access

### Data Handling
- **State Management:** Zustand store
- **Persistence:** localStorage for:
  - User preferences
  - Chat history
  - Avatar customization
  - Theme selection
- **API:** Groq API for AI responses

### Edge Cases
- API failure: Show error message, retry option
- Speech recognition unavailable: Fallback to text input
- 3D load failure: Show static placeholder
- Empty chat: Show welcome message

---

## Acceptance Criteria

### Visual Checkpoints
1. Welcome screen displays with animated background
2. Gender selection shows 2 distinct avatar cards
3. Avatar customization allows full-body editing
4. Chat interface shows split view (30/70)
5. 3D avatar animates in real-time
6. Theme toggle switches between dark/light
7. All transitions are smooth (60fps)
8. Mobile layout is responsive

### Functional Checkpoints
1. Can complete full onboarding flow
2. Can customize avatar with all options
3. Can send and receive chat messages
4. Voice input converts speech to text
5. AI responds with personality-consistent responses
6. Chat history persists across sessions
7. Theme preference persists
8. Avatar customization persists

### Animation Checkpoints
1. Page transitions are smooth (fade + slide)
2. Avatar has idle breathing animation
3. Avatar lip-syncs during speech
4. Hover effects have proper easing
5. Loading states have skeleton animations
6. Typing indicator animates correctly

---

## Technical Stack

- **Framework:** React 18 + Vite
- **Styling:** TailwindCSS 3.4
- **Animations:** Framer Motion 11
- **3D:** React Three Fiber + Drei
- **State:** Zustand 4
- **Routing:** React Router DOM 6
- **Icons:** Lucide React

---

## File Structure

```
src/
├── components/
│   ├── ui/
│   │   ├── Button.jsx
│   │   ├── Card.jsx
│   │   ├── Input.jsx
│   │   ├── Modal.jsx
│   │   └── Toggle.jsx
│   ├── avatar/
│   │   ├── AvatarViewer.jsx
│   │   ├── AvatarCustomizer.jsx
│   │   └── AvatarPreview.jsx
│   ├── chat/
│   │   ├── ChatInterface.jsx
│   │   ├── MessageList.jsx
│   │   ├── MessageBubble.jsx
│   │   ├── ChatInput.jsx
│   │   └── TypingIndicator.jsx
│   ├── onboarding/
│   │   ├── WelcomeScreen.jsx
│   │   ├── GenderSelection.jsx
│   │   ├── NameSelection.jsx
│   │   └── PersonalitySelection.jsx
│   └── layout/
│       ├── Navbar.jsx
│       ├── Sidebar.jsx
│       └── ThemeToggle.jsx
├── pages/
│   ├── OnboardingPage.jsx
│   └── ChatPage.jsx
├── store/
│   ├── useAppStore.js
│   ├── useChatStore.js
│   └── useAvatarStore.js
├── services/
│   ├── groqApi.js
│   └── speechService.js
├── hooks/
│   ├── useSpeechRecognition.js
│   ├── useTextToSpeech.js
│   └── useLocalStorage.js
├── styles/
│   └── index.css
├── App.jsx
└── main.jsx
```