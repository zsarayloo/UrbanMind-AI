"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Separator } from "@/components/ui/separator"
import { MapPin, Send, Brain, FileText, MessageSquare, Lightbulb } from "lucide-react"

interface ChatMessage {
  id: string
  type: "user" | "assistant"
  content: string
  timestamp: Date
}

interface SelectedParcel {
  id: string
  address: string
  area: number
  score: number
  reasoning: string
}

export default function UrbanPlanningPage() {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: "1",
      type: "assistant",
      content:
        "Hello! I'm UrbanMind AI, your intelligent urban planning assistant. I can help you find the optimal location for a new high school in the Waterloo region. Please describe your requirements and upload any relevant documents.",
      timestamp: new Date(),
    },
  ])
  const [inputMessage, setInputMessage] = useState("")
  const [selectedReasoning, setSelectedReasoning] = useState("chain-of-thought")
  const [isAnalyzing, setIsAnalyzing] = useState(false)
  const [selectedParcels, setSelectedParcels] = useState<SelectedParcel[]>([])
  const [thinkingProcess, setThinkingProcess] = useState("")
  const [uploadedFiles, setUploadedFiles] = useState<string[]>([])

  const reasoningMethods = [
    { value: "chain-of-thought", label: "Chain-of-Thought", description: "Sequential logical reasoning" },
    { value: "tree-of-thought", label: "Tree-of-Thought", description: "Branching decision exploration" },
    { value: "hypertree-reasoning", label: "HyperTree Reasoning", description: "Multi-dimensional analysis" },
  ]

  const handleSendMessage = async () => {
    if (!inputMessage.trim()) return

    const newMessage: ChatMessage = {
      id: Date.now().toString(),
      type: "user",
      content: inputMessage,
      timestamp: new Date(),
    }

    setMessages((prev) => [...prev, newMessage])
    setInputMessage("")
    setIsAnalyzing(true)

    // Simulate AI analysis
    setTimeout(() => {
      const assistantMessage: ChatMessage = {
        id: (Date.now() + 1).toString(),
        type: "assistant",
        content: `I'm analyzing your request using ${reasoningMethods.find((m) => m.value === selectedReasoning)?.label}. Based on the criteria you've provided, I've identified several potential locations for the new high school.`,
        timestamp: new Date(),
      }

      setMessages((prev) => [...prev, assistantMessage])

      // Simulate thinking process
      setThinkingProcess(`
**${reasoningMethods.find((m) => m.value === selectedReasoning)?.label} Analysis:**

1. **Population Density Analysis**: Examining current and projected student populations in different areas of Waterloo region.

2. **Transportation Accessibility**: Evaluating proximity to public transit, major roads, and walkability scores.

3. **Infrastructure Assessment**: Analyzing existing utilities, internet connectivity, and expansion capabilities.

4. **Environmental Factors**: Considering noise levels, air quality, and green space availability.

5. **Zoning Compliance**: Verifying educational zoning requirements and potential rezoning needs.

6. **Community Impact**: Assessing effects on local traffic, property values, and community resources.
      `)

      // Simulate selected parcels
      setSelectedParcels([
        {
          id: "P001",
          address: "123 University Ave W, Waterloo",
          area: 15.2,
          score: 92,
          reasoning: "High accessibility, excellent transit connections, suitable zoning",
        },
        {
          id: "P002",
          address: "456 King St N, Waterloo",
          area: 18.7,
          score: 88,
          reasoning: "Large area, good infrastructure, moderate traffic impact",
        },
        {
          id: "P003",
          address: "789 Weber St E, Kitchener",
          area: 12.4,
          score: 85,
          reasoning: "Central location, existing utilities, community support",
        },
      ])

      setIsAnalyzing(false)
    }, 3000)
  }

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files
    if (files) {
      const fileNames = Array.from(files).map((file) => file.name)
      setUploadedFiles((prev) => [...prev, ...fileNames])
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="bg-blue-600 p-2 rounded-lg">
              <Brain className="h-6 w-6 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-900">UrbanMind AI</h1>
              <p className="text-sm text-gray-600">Intelligent Urban Planning Assistant</p>
            </div>
          </div>
          <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
            Waterloo Region
          </Badge>
        </div>
      </header>

      <div className="flex h-[calc(100vh-80px)]">
        {/* Left Sidebar - Chat & Controls */}
        <div className="w-96 bg-white border-r border-gray-200 flex flex-col">
          {/* Reasoning Method Selection */}
          <div className="p-4 border-b border-gray-200">
            <Label htmlFor="reasoning-method" className="text-sm font-medium text-gray-700">
              Reasoning Method
            </Label>
            <Select value={selectedReasoning} onValueChange={setSelectedReasoning}>
              <SelectTrigger className="mt-2">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {reasoningMethods.map((method) => (
                  <SelectItem key={method.value} value={method.value}>
                    <div>
                      <div className="font-medium">{method.label}</div>
                      <div className="text-xs text-gray-500">{method.description}</div>
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* File Upload */}
          <div className="p-4 border-b border-gray-200">
            <Label htmlFor="file-upload" className="text-sm font-medium text-gray-700">
              Upload Documents
            </Label>
            <div className="mt-2">
              <Input id="file-upload" type="file" multiple onChange={handleFileUpload} className="cursor-pointer" />
            </div>
            {uploadedFiles.length > 0 && (
              <div className="mt-2 space-y-1">
                {uploadedFiles.map((file, index) => (
                  <div key={index} className="flex items-center space-x-2 text-xs text-gray-600">
                    <FileText className="h-3 w-3" />
                    <span>{file}</span>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Chat Messages */}
          <div className="flex-1 flex flex-col">
            <div className="p-4 border-b border-gray-200">
              <div className="flex items-center space-x-2">
                <MessageSquare className="h-4 w-4 text-gray-600" />
                <span className="text-sm font-medium text-gray-700">Chat</span>
              </div>
            </div>

            <ScrollArea className="flex-1 p-4">
              <div className="space-y-4">
                {messages.map((message) => (
                  <div key={message.id} className={`flex ${message.type === "user" ? "justify-end" : "justify-start"}`}>
                    <div
                      className={`max-w-[80%] p-3 rounded-lg ${
                        message.type === "user" ? "bg-blue-600 text-white" : "bg-gray-100 text-gray-900"
                      }`}
                    >
                      <p className="text-sm">{message.content}</p>
                      <p className="text-xs opacity-70 mt-1">{message.timestamp.toLocaleTimeString()}</p>
                    </div>
                  </div>
                ))}
                {isAnalyzing && (
                  <div className="flex justify-start">
                    <div className="bg-gray-100 text-gray-900 p-3 rounded-lg">
                      <div className="flex items-center space-x-2">
                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-blue-600"></div>
                        <span className="text-sm">Analyzing...</span>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </ScrollArea>

            {/* Message Input */}
            <div className="p-4 border-t border-gray-200">
              <div className="flex space-x-2">
                <Textarea
                  value={inputMessage}
                  onChange={(e) => setInputMessage(e.target.value)}
                  placeholder="Describe your requirements for the high school location..."
                  className="flex-1 min-h-[60px] resize-none"
                  onKeyDown={(e) => {
                    if (e.key === "Enter" && !e.shiftKey) {
                      e.preventDefault()
                      handleSendMessage()
                    }
                  }}
                />
                <Button onClick={handleSendMessage} disabled={isAnalyzing} className="self-end">
                  <Send className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* Main Content Area */}
        <div className="flex-1 flex flex-col">
          {/* Map Area */}
          <div className="flex-1 bg-gray-100 relative">
            <div className="absolute inset-4 bg-white rounded-lg shadow-sm border border-gray-200 flex items-center justify-center">
              <div className="text-center">
                <MapPin className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">Interactive Map</h3>
                <p className="text-gray-600 max-w-md">
                  The map will display the Waterloo region with highlighted potential locations for the new high school
                  based on your analysis criteria.
                </p>
                {selectedParcels.length > 0 && (
                  <div className="mt-4 flex justify-center space-x-2">
                    {selectedParcels.map((parcel) => (
                      <Badge key={parcel.id} variant="secondary" className="bg-blue-100 text-blue-800">
                        {parcel.id}
                      </Badge>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Bottom Panel - Results */}
          <div className="h-80 bg-white border-t border-gray-200 flex">
            {/* Selected Parcels */}
            <div className="flex-1 p-4">
              <div className="flex items-center space-x-2 mb-4">
                <MapPin className="h-5 w-5 text-gray-600" />
                <h3 className="text-lg font-semibold text-gray-900">Selected Locations</h3>
              </div>

              {selectedParcels.length > 0 ? (
                <div className="space-y-3">
                  {selectedParcels.map((parcel) => (
                    <Card key={parcel.id} className="border border-gray-200">
                      <CardContent className="p-4">
                        <div className="flex justify-between items-start mb-2">
                          <div>
                            <h4 className="font-medium text-gray-900">{parcel.address}</h4>
                            <p className="text-sm text-gray-600">{parcel.area} acres</p>
                          </div>
                          <Badge variant="secondary" className="bg-green-100 text-green-800">
                            Score: {parcel.score}
                          </Badge>
                        </div>
                        <p className="text-sm text-gray-700">{parcel.reasoning}</p>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              ) : (
                <div className="text-center text-gray-500 mt-8">
                  <MapPin className="h-12 w-12 mx-auto mb-2 opacity-50" />
                  <p>No locations selected yet. Start a conversation to analyze potential sites.</p>
                </div>
              )}
            </div>

            <Separator orientation="vertical" />

            {/* Thinking Process */}
            <div className="flex-1 p-4">
              <div className="flex items-center space-x-2 mb-4">
                <Lightbulb className="h-5 w-5 text-gray-600" />
                <h3 className="text-lg font-semibold text-gray-900">Reasoning Process</h3>
              </div>

              {thinkingProcess ? (
                <ScrollArea className="h-60">
                  <div className="prose prose-sm max-w-none text-gray-700">
                    <pre className="whitespace-pre-wrap font-sans text-sm">{thinkingProcess}</pre>
                  </div>
                </ScrollArea>
              ) : (
                <div className="text-center text-gray-500 mt-8">
                  <Brain className="h-12 w-12 mx-auto mb-2 opacity-50" />
                  <p>The AI's reasoning process will appear here during analysis.</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
