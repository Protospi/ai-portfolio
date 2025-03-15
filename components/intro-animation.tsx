'use client'

import { motion } from 'framer-motion'
import { useEffect, useState } from 'react'
import ForceGraph from './force-graph'

const messages = [
  "Welcome to Pedro Loes portfolio",
  "Bienvenido a portfolio de Pedro Loes",
  "Bem-vindo ao portfolio do Pedro Loes",
  "欢迎来到 Pedro Loes 的简历",
  "Willkommen in der Portfolio von Pedro Loes",
  "Bienvenue dans le portfolio de Pedro Loes",
  "日本語のポートフォリオです",
]

const placeholders = [
  "Type your language",
  "Escribe tu idioma",
  "Digite seu idioma",
  "输入你的语言",
  "Geben Sie Ihre Sprache ein",
  "Tapez votre langue", 
  "言語を入力してください",
]

export default function IntroAnimation({ onComplete }: { onComplete: () => void }) {
  const [show, setShow] = useState(true)
  const [typedMessage, setTypedMessage] = useState('')
  const [typedPlaceholder, setTypedPlaceholder] = useState('')
  const [currentMessageIndex, setCurrentMessageIndex] = useState(0)
  const [showElements, setShowElements] = useState(false)
  const [isTyping, setIsTyping] = useState(true)
  const [isDeletingMessage, setIsDeletingMessage] = useState(false)

  useEffect(() => {
    let typingTimer: NodeJS.Timeout
    
    if (isTyping && !isDeletingMessage) {
      if (typedMessage.length < messages[currentMessageIndex].length) {
        typingTimer = setTimeout(() => {
          setTypedMessage(messages[currentMessageIndex].slice(0, typedMessage.length + 1))
          // Type placeholder at the same rate as the message
          setTypedPlaceholder(placeholders[currentMessageIndex].slice(0, typedMessage.length + 1))
        }, 50)
      } else {
        // When message is complete, ensure placeholder is also complete
        setTypedPlaceholder(placeholders[currentMessageIndex])
        typingTimer = setTimeout(() => {
          setIsDeletingMessage(true)
        }, 1000)
      }
    } else if (isDeletingMessage) {
      if (typedMessage.length > 0) {
        typingTimer = setTimeout(() => {
          const newLength = typedMessage.length - 1
          setTypedMessage(typedMessage.slice(0, newLength))
          setTypedPlaceholder(placeholders[currentMessageIndex].slice(0, newLength))
        }, 30)
      } else {
        setIsDeletingMessage(false)
        if (currentMessageIndex === 0 && !showElements) {
          setShowElements(true)
        }
        setCurrentMessageIndex((prev) => (prev + 1) % messages.length)
        setTypedPlaceholder('')
      }
    }

    return () => clearTimeout(typingTimer)
  }, [typedMessage, currentMessageIndex, isTyping, isDeletingMessage, showElements])

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      onComplete()
    }
  }

  if (!show) return null

  return (
    <motion.div
      initial={{ opacity: 1 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-white z-50 flex items-center justify-center"
    >
      {/* Add the force graph as a background */}
      <div className="absolute inset-0 z-0">
        <ForceGraph />
      </div>
      
      <div className="text-center max-w-2xl px-4 z-10">
        <motion.div
          className="text-3xl font-bold text-gray-800 mb-24 h-20 flex items-center justify-center"
        >
          <span className="border-r-2 border-gray-800 pr-1" 
            style={{ borderRightColor: isTyping ? undefined : 'transparent' }}>
            {typedMessage}
          </span>
        </motion.div>

        {showElements && (
          <>
            {/* Input Field with synchronized placeholder */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-28"
            >
              <input
                type="text"
                placeholder={typedPlaceholder}
                onKeyDown={handleKeyDown}
                className="w-64 px-4 py-2 rounded-lg border-2 border-gray-300 focus:border-gray-500 focus:outline-none bg-black text-white placeholder-white::placeholder"
              />
            </motion.div>

            {/* Start Button */}
            <motion.button
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              onClick={onComplete}
              className="px-8 py-3 bg-gray-800 text-white rounded-full hover:bg-gray-700 transition-colors"
            >
              Start
            </motion.button>
          </>
        )}
      </div>
    </motion.div>
  )
} 