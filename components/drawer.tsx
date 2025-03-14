"use client"

import { useState } from "react"
import { ChevronLeft, LayoutDashboard, GitBranch, FileText, BarChart2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

interface DrawerProps {
  isOpen: boolean
  onClose: () => void
}

export default function Drawer({ isOpen, onClose }: DrawerProps) {
  const [activeSection, setActiveSection] = useState<string>("display")

  if (!isOpen) return null

  const handleSectionChange = (section: string) => {
    setActiveSection(section)
  }

  return (
    <div className="bg-gray-900 text-white h-full w-full absolute inset-0">
      <div className="h-full flex flex-col">
        {/* Drawer Header with Navigation */}
        <div className="border-b border-gray-700 p-4">
          <div className="flex items-center">
            {/* Empty div for left side balance */}
            <div className="w-10"></div>

            {/* Centered Navigation */}
            <nav className="flex-1 flex justify-center">
              <ul className="flex space-x-20">
                <li>
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => handleSectionChange("display")}
                    className={cn(
                      "rounded-full",
                      activeSection === "display"
                        ? "bg-white text-gray-900 hover:bg-white"
                        : "bg-transparent text-white border-gray-700 hover:bg-gray-800 hover:border-gray-600",
                    )}
                    aria-label="Display"
                  >
                    <LayoutDashboard className="h-5 w-5" />
                  </Button>
                </li>
                <li>
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => handleSectionChange("flow")}
                    className={cn(
                      "rounded-full",
                      activeSection === "flow"
                        ? "bg-white text-gray-900 hover:bg-white"
                        : "bg-transparent text-white border-gray-700 hover:bg-gray-800 hover:border-gray-600",
                    )}
                    aria-label="Flow"
                  >
                    <GitBranch className="h-5 w-5" />
                  </Button>
                </li>
                <li>
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => handleSectionChange("report")}
                    className={cn(
                      "rounded-full",
                      activeSection === "report"
                        ? "bg-white text-gray-900 hover:bg-white"
                        : "bg-transparent text-white border-gray-700 hover:bg-gray-800 hover:border-gray-600",
                    )}
                    aria-label="Report"
                  >
                    <FileText className="h-5 w-5" />
                  </Button>
                </li>
                <li>
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => handleSectionChange("analytics")}
                    className={cn(
                      "rounded-full",
                      activeSection === "analytics"
                        ? "bg-white text-gray-900 hover:bg-white"
                        : "bg-transparent text-white border-gray-700 hover:bg-gray-800 hover:border-gray-600",
                    )}
                    aria-label="Analytics"
                  >
                    <BarChart2 className="h-5 w-5" />
                  </Button>
                </li>
              </ul>
            </nav>

            {/* Close Button on right */}
            <Button
              variant="outline"
              size="icon"
              onClick={onClose}
              className="rounded-full bg-white hover:bg-gray-100 text-gray-900"
              aria-label="Close drawer"
            >
              <ChevronLeft className="h-6 w-6" />
            </Button>
          </div>
        </div>

        {/* Empty content area */}
        <div className="flex-1 p-6">{/* Content will be added later based on the selected section */}</div>
      </div>
    </div>
  )
}

