'use client'

import { motion } from 'framer-motion'
import { useEffect, useState } from 'react'
import { FaDatabase, FaCalendar, FaTools, FaGlobe, FaRobot, FaServer, FaChartLine, FaUser } from 'react-icons/fa'

const tools = [
  { Icon: FaRobot, delay: 0.2},      // Chatbot
  { Icon: FaTools, delay: 0.4},       // Tools
  { Icon: FaServer, delay: 0.6},      // Server
  { Icon: FaUser, delay: 0.8},      // User
  { Icon: FaDatabase, delay: 1.0},    // Database
  { Icon: FaGlobe, delay: 1.2},       // Web
  { Icon: FaChartLine, delay: 1.4},   // Analytics
]

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

  if (!show) return null

  return (
    <motion.div
      initial={{ opacity: 1 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-white z-50 flex items-center justify-center"
    >
      <div className="text-center max-w-2xl px-4">
        <motion.div
          className="text-3xl font-bold text-gray-800 mb-16 h-20 flex items-center justify-center"
        >
          <span className="border-r-2 border-gray-800 pr-1" 
            style={{ borderRightColor: isTyping ? undefined : 'transparent' }}>
            {typedMessage}
          </span>
        </motion.div>

        {showElements && (
          <>
            {/* Tools Animation */}
            <div className="flex justify-center gap-12 mb-16">
              {tools.map(({ Icon, delay }, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -50 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{
                    duration: 0.5,
                    delay: delay,
                    type: "spring",
                    stiffness: 100
                  }}
                >
                  <Icon 
                    className={`text-gray-700`} 
                    style={{ width: '25px', height: '25px' }}
                  />
                </motion.div>
              ))}
            </div>

            {/* Input Field with synchronized placeholder */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-12"
            >
              <input
                type="text"
                placeholder={typedPlaceholder}
                className="w-64 px-4 py-2 rounded-lg border-2 border-gray-300 focus:border-gray-500 focus:outline-none"
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