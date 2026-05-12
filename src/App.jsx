import { useEffect } from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import OnboardingPage from './pages/OnboardingPage'
import ChatPage from './pages/ChatPage'
import useAppStore from './store/useAppStore'

function App() {
  const { isOnboarded, theme } = useAppStore()

  useEffect(() => {
    if (theme === 'light') {
      document.documentElement.classList.add('light')
    } else {
      document.documentElement.classList.remove('light')
    }
  }, [theme])

  return (
    <div className="min-h-screen bg-dark-bg">
      <AnimatePresence mode="wait">
        <Routes>
          <Route 
            path="/" 
            element={
              isOnboarded ? (
                <Navigate to="/chat" replace />
              ) : (
                <OnboardingPage />
              )
            } 
          />
          <Route 
            path="/chat" 
            element={
              isOnboarded ? (
                <ChatPage />
              ) : (
                <Navigate to="/" replace />
              )
            } 
          />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </AnimatePresence>
    </div>
  )
}

export default App