"use client"

import { useState } from "react"
import { ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import ChatInterface from "@/components/chat-interface"
import Drawer from "@/components/drawer"

export default function AppLayout() {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false)

  const toggleDrawer = () => {
    setIsDrawerOpen(!isDrawerOpen)
  }

  return (
    <main className="flex h-screen w-full overflow-hidden bg-white relative">
      <div className="flex-1 flex">
        <ChatInterface isDrawerOpen={isDrawerOpen} />
        <Button
          variant="outline"
          size="icon"
          onClick={toggleDrawer}
          className="absolute top-4 right-4 rounded-full bg-gray-900 text-white hover:bg-gray-800 border-gray-900"
          aria-label="Open drawer"
        >
          <ChevronRight className="h-6 w-6" />
        </Button>
      </div>

      <Drawer isOpen={isDrawerOpen} onClose={toggleDrawer} />
    </main>
  )
} 