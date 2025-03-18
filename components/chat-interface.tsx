"use client"

import { useState, useRef, useEffect } from "react"
import { Send, Globe, Hotel, Calendar, ShoppingCart, ChevronRight, Mic, Plus } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import ChatMessage from "@/components/chat-message"
import { cn } from "@/lib/utils"

interface ChatInterfaceProps {
  isDrawerOpen: boolean
  onOpenDrawer: () => void
}

export default function ChatInterface({ isDrawerOpen, onOpenDrawer }: ChatInterfaceProps) {
  const [messages, setMessages] = useState([
    { role: "assistant", content: "Hi there! I'm an AI assistant. How can I help you today?" },
  ])
  const [input, setInput] = useState("")
  const [activeAgent, setActiveAgent] = useState("website")
  const inputRef = useRef<HTMLInputElement>(null)

  // Focus input field when component mounts initially or when agent changes
  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus()
    }
  }, [activeAgent])
  
  // Additional effect to ensure focus on initial page load
  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus()
    }
  }, [])

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
      className={`flex flex-col h-full transition-all duration-300 ease-in-out bg-[#f5f5f7] pt-2 pb-6 pl-4 pr-4 ${
        isDrawerOpen ? "hidden" : "block w-full"
      }`}
    >
      {/* Agent Selection Header */}
      <div className="bg-[#f5f5f7] mb-3 py-3 pb-2 flex items-center justify-center">
        <div className="flex space-x-16 relative w-full justify-center">
          <Button
            variant={activeAgent === "website" ? "default" : "ghost"}
            size="icon"
            onClick={() => changeAgent("website")}
            className={cn(
              "rounded-full h-12 w-12 flex items-center justify-center [&>svg]:!w-5 [&>svg]:!h-5",
              activeAgent !== "website" && "hover:bg-gray-200"
            )}
            aria-label="Website Agent"
          >
            <Globe strokeWidth={1.5} />
          </Button>
          <Button
            variant={activeAgent === "concierge" ? "default" : "ghost"}
            size="icon"
            onClick={() => changeAgent("concierge")}
            className={cn(
              "rounded-full h-12 w-12 flex items-center justify-center [&>svg]:!w-5 [&>svg]:!h-5",
              activeAgent !== "concierge" && "hover:bg-gray-200"
            )}
            aria-label="Hotel Concierge Agent"
          >
            <Hotel strokeWidth={1.5} />
          </Button>
          <Button
            variant={activeAgent === "scheduler" ? "default" : "ghost"}
            size="icon"
            onClick={() => changeAgent("scheduler")}
            className={cn(
              "rounded-full h-12 w-12 flex items-center justify-center [&>svg]:!w-5 [&>svg]:!h-5",
              activeAgent !== "scheduler" && "hover:bg-gray-200"
            )}
            aria-label="Scheduler Agent"
          >
            <Calendar strokeWidth={1.5} />
          </Button>
          <Button
            variant={activeAgent === "seller" ? "default" : "ghost"}
            size="icon"
            onClick={() => changeAgent("seller")}
            className={cn(
              "rounded-full h-12 w-12 flex items-center justify-center [&>svg]:!w-5 [&>svg]:!h-5",
              activeAgent !== "seller" && "hover:bg-gray-200"
            )}
            aria-label="Seller Agent"
          >
            <ShoppingCart strokeWidth={1.5} />
          </Button>
          
          {/* Open Drawer Button positioned absolutely */}
          <Button
            variant="outline"
            size="icon"
            onClick={onOpenDrawer}
            className="rounded-full bg-gray-900 hover:bg-gray-300 text-white h-11 w-11 flex items-center justify-center absolute right-6 border-0 top-1"
            aria-label="Open drawer"
          >
            <ChevronRight className="h-6 w-6" />
          </Button>
        </div>
      </div>

      {/* Chat Card Container */}
      <div className="flex-1 bg-white rounded-2xl shadow-lg flex flex-col overflow-hidden">
        {/* Messages Container */}
        <div className="flex-1 overflow-y-auto px-6 py-4">
          {messages.map((message, index) => (
            <ChatMessage key={index} message={message} />
          ))}
        </div>

        {/* Input Form */}
        <form onSubmit={handleSendMessage} className="p-4 bg-white">
          <div className="flex items-center gap-4">
            <Input
              ref={inputRef}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Type your message..."
              className="flex-1"
            />
            
            {/* Mic Button */}
            <Button 
              type="button" 
              size="icon" 
              className="rounded-full bg-gray-900 hover:bg-gray-800 text-white h-10 w-10 flex-shrink-0"
              aria-label="Voice input"
            >
              <Mic className="h-5 w-5" />
            </Button>
            
            {/* File Upload Button */}
            <Button 
              type="button" 
              size="icon" 
              className="rounded-full bg-gray-900 hover:bg-gray-800 text-white h-10 w-10 flex-shrink-0"
              aria-label="Upload file"
            >
              <Plus className="h-5 w-5" />
            </Button>
            
            <Button type="submit" size="icon" className="rounded-full">
              <Send className="h-4 w-4" />
            </Button>
          </div>
        </form>
      </div>
    </div>
  )
} 