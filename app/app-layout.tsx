"use client"

import { useState } from "react"
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
        <ChatInterface isDrawerOpen={isDrawerOpen} onOpenDrawer={toggleDrawer} />
      </div>

      <Drawer isOpen={isDrawerOpen} onClose={toggleDrawer} />
    </main>
  )
} 