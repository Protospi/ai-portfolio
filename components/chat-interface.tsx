"use client"

import { useState } from "react"
import { Send, Globe, Hotel, Calendar, ShoppingCart } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import ChatMessage from "@/components/chat-message"

interface ChatInterfaceProps {
  isDrawerOpen: boolean
}

export default function ChatInterface({ isDrawerOpen }: ChatInterfaceProps) {
  const [messages, setMessages] = useState([
    { role: "assistant", content: "Hi there! I'm an AI assistant. How can I help you today?" },
  ])
  const [input, setInput] = useState("")
  const [activeAgent, setActiveAgent] = useState("website")

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault()
    if (!input.trim()) return

    // Add user message
    const newMessages = [...messages, { role: "user", content: input }]
    setMessages(newMessages)

    // Simulate AI response (fixed for now)
    setTimeout(() => {
      setMessages([
        ...newMessages,
        {
          role: "assistant",
          content: `[${activeAgent} Agent] Thanks for your message! This is a fixed response for now.`,
        },
      ])
    }, 500)

    setInput("")
  }

  const changeAgent = (agent: string) => {
    setActiveAgent(agent)
    setMessages([{ role: "assistant", content: `Hi there! I'm the ${agent} agent. How can I help you today?` }])
  }

  return (
    <div
      className={`flex flex-col h-full transition-all duration-300 ease-in-out ${
        isDrawerOpen ? "hidden" : "block w-full"
      }`}
    >
      {/* Agent Selection Header */}
      <div className="border-b p-4 flex items-center">
        <div className="w-10"></div>
        <div className="flex-1 flex justify-center">
          <div className="flex space-x-20">
            <Button
              variant={activeAgent === "website" ? "default" : "ghost"}
              size="icon"
              onClick={() => changeAgent("website")}
              className="rounded-full"
              aria-label="Website Agent"
            >
              <Globe className="h-8 w-8" />
            </Button>
            <Button
              variant={activeAgent === "concierge" ? "default" : "ghost"}
              size="icon"
              onClick={() => changeAgent("concierge")}
              className="rounded-full"
              aria-label="Hotel Concierge Agent"
            >
              <Hotel className="h-8 w-8" />
            </Button>
            <Button
              variant={activeAgent === "scheduler" ? "default" : "ghost"}
              size="icon"
              onClick={() => changeAgent("scheduler")}
              className="rounded-full"
              aria-label="Scheduler Agent"
            >
              <Calendar className="h-8 w-8" />
            </Button>
            <Button
              variant={activeAgent === "seller" ? "default" : "ghost"}
              size="icon"
              onClick={() => changeAgent("seller")}
              className="rounded-full"
              aria-label="Seller Agent"
            >
            <ShoppingCart className="h-8 w-8" />
            </Button>
          </div>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto px-4 py-2">
        {messages.map((message, index) => (
          <ChatMessage key={index} message={message} />
        ))}
      </div>

      <form onSubmit={handleSendMessage} className="border-t p-4">
        <div className="flex gap-2">
          <Input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Type your message..."
            className="flex-1"
          />
          <Button type="submit" size="icon">
            <Send className="h-4 w-4" />
          </Button>
        </div>
      </form>
    </div>
  )
} 