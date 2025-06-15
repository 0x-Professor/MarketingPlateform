"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { MessageCircle, X, Bot } from "lucide-react"

export function FloatingChat() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <div className="fixed bottom-6 right-6 z-50">
      {isOpen && (
        <Card className="w-80 mb-4 glass">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium flex items-center">
              <Bot className="h-4 w-4 mr-2" />
              AI Assistant
            </CardTitle>
            <Button variant="ghost" size="sm" onClick={() => setIsOpen(false)}>
              <X className="h-4 w-4" />
            </Button>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="bg-muted p-3 rounded-lg">
                <p className="text-sm">Hi! I'm your AI marketing assistant. How can I help you today?</p>
              </div>
              <div className="space-y-2">
                <Button variant="outline" size="sm" className="w-full justify-start">
                  Generate email copy
                </Button>
                <Button variant="outline" size="sm" className="w-full justify-start">
                  Create social media post
                </Button>
                <Button variant="outline" size="sm" className="w-full justify-start">
                  Analyze campaign performance
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      <Button onClick={() => setIsOpen(!isOpen)} size="lg" className="rounded-full h-14 w-14 shadow-lg">
        <MessageCircle className="h-6 w-6" />
      </Button>
    </div>
  )
}
