"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Navbar } from "@/components/navbar"
import { FloatingChat } from "@/components/floating-chat"
import { PenTool, Wand2, Copy, Download, Loader2, Sparkles } from "lucide-react"
import { useToast } from "@/components/ui/use-toast"

export default function CopyPage() {
  const [activeTab, setActiveTab] = useState("social")
  const [formData, setFormData] = useState({
    platform: "",
    topic: "",
    tone: "",
    length: "",
    keywords: "",
  })
  const [generatedCopy, setGeneratedCopy] = useState("")
  const [isGenerating, setIsGenerating] = useState(false)
  const { toast } = useToast()

  const getContentType = () => {
    switch (activeTab) {
      case "social":
        return "Social Media"
      case "ads":
        return "Ad Copy"
      case "blog":
        return "Blog Intro"
      default:
        return "Social Media"
    }
  }

  const handleGenerate = async () => {
    if (!formData.topic) {
      toast({
        title: "Missing Information",
        description: "Please enter a topic to continue.",
        variant: "destructive",
      })
      return
    }

    setIsGenerating(true)
    setGeneratedCopy("")

    try {
      const response = await fetch("/api/generate-copy", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          type: getContentType(),
          platform: formData.platform,
          topic: formData.topic,
          tone: formData.tone,
          keywords: formData.keywords,
        }),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || "Failed to generate copy")
      }

      setGeneratedCopy(data.content)
      toast({
        title: "Copy Generated!",
        description: "Your marketing copy has been generated successfully.",
      })
    } catch (error) {
      toast({
        title: "Generation Failed",
        description: error instanceof Error ? error.message : "An unexpected error occurred",
        variant: "destructive",
      })
    } finally {
      setIsGenerating(false)
    }
  }

  const copyToClipboard = () => {
    navigator.clipboard.writeText(generatedCopy)
    toast({
      title: "Copied!",
      description: "Copy content copied to clipboard.",
    })
  }

  const downloadCopy = () => {
    const blob = new Blob([generatedCopy], { type: "text/plain" })
    const url = URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = `${activeTab}-copy.txt`
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)

    toast({
      title: "Downloaded!",
      description: "Copy content has been downloaded.",
    })
  }

  return (
    <div className="min-h-screen gradient-bg">
      <Navbar />

      <div className="pt-20 px-4 pb-8">
        <div className="max-w-7xl mx-auto">
          <div className="mb-12 text-center fade-in">
            <h1 className="text-5xl md:text-6xl font-bold mb-6 text-white text-shadow-lg flex items-center justify-center">
              <PenTool className="mr-4 h-12 w-12 md:h-16 md:w-16 float" />
              AI Copywriting Assistant
            </h1>
            <p className="text-white/90 text-xl md:text-2xl max-w-4xl mx-auto text-shadow leading-relaxed">
              Generate compelling copy for social media, ads, and blog content with AI.
            </p>
          </div>

          <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
            <TabsList className="grid w-full grid-cols-3 glass border-white/20">
              <TabsTrigger
                value="social"
                className="text-white data-[state=active]:bg-white data-[state=active]:text-black"
              >
                Social Media
              </TabsTrigger>
              <TabsTrigger
                value="ads"
                className="text-white data-[state=active]:bg-white data-[state=active]:text-black"
              >
                Ad Copy
              </TabsTrigger>
              <TabsTrigger
                value="blog"
                className="text-white data-[state=active]:bg-white data-[state=active]:text-black"
              >
                Blog Content
              </TabsTrigger>
            </TabsList>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Input Form */}
              <Card className="glass border-white/20 shadow-2xl">
                <CardHeader className="text-white">
                  <CardTitle className="flex items-center">
                    <Sparkles className="mr-2 h-5 w-5" />
                    Copy Details
                  </CardTitle>
                  <CardDescription className="text-white/80">
                    Specify your requirements to generate targeted copy
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <TabsContent value="social" className="space-y-4 mt-0">
                    <div className="space-y-2">
                      <Label htmlFor="platform" className="text-white">
                        Platform
                      </Label>
                      <Select
                        value={formData.platform}
                        onValueChange={(value) => setFormData({ ...formData, platform: value })}
                      >
                        <SelectTrigger className="input-glass h-12 text-base">
                          <SelectValue placeholder="Select platform" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="linkedin">LinkedIn</SelectItem>
                          <SelectItem value="twitter">Twitter/X</SelectItem>
                          <SelectItem value="facebook">Facebook</SelectItem>
                          <SelectItem value="instagram">Instagram</SelectItem>
                          <SelectItem value="tiktok">TikTok</SelectItem>
                          <SelectItem value="youtube">YouTube</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </TabsContent>

                  <TabsContent value="ads" className="space-y-4 mt-0">
                    <div className="space-y-2">
                      <Label htmlFor="platform" className="text-white">
                        Ad Platform
                      </Label>
                      <Select
                        value={formData.platform}
                        onValueChange={(value) => setFormData({ ...formData, platform: value })}
                      >
                        <SelectTrigger className="input-glass h-12 text-base">
                          <SelectValue placeholder="Select ad platform" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="google">Google Ads</SelectItem>
                          <SelectItem value="facebook">Facebook Ads</SelectItem>
                          <SelectItem value="linkedin">LinkedIn Ads</SelectItem>
                          <SelectItem value="twitter">Twitter Ads</SelectItem>
                          <SelectItem value="youtube">YouTube Ads</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </TabsContent>

                  <TabsContent value="blog" className="space-y-4 mt-0">
                    <div className="space-y-2">
                      <Label htmlFor="length" className="text-white">
                        Content Length
                      </Label>
                      <Select
                        value={formData.length}
                        onValueChange={(value) => setFormData({ ...formData, length: value })}
                      >
                        <SelectTrigger className="input-glass h-12 text-base">
                          <SelectValue placeholder="Select length" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="intro">Introduction Only</SelectItem>
                          <SelectItem value="short">Short (300-500 words)</SelectItem>
                          <SelectItem value="medium">Medium (500-1000 words)</SelectItem>
                          <SelectItem value="long">Long (1000+ words)</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </TabsContent>

                  <div className="space-y-2">
                    <Label htmlFor="topic" className="text-white">
                      Topic/Subject *
                    </Label>
                    <Input
                      id="topic"
                      placeholder="What's your content about?"
                      value={formData.topic}
                      onChange={(e) => setFormData({ ...formData, topic: e.target.value })}
                      className="input-glass h-12 text-base"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="keywords" className="text-white">
                      Keywords
                    </Label>
                    <Input
                      id="keywords"
                      placeholder="Enter relevant keywords (comma separated)"
                      value={formData.keywords}
                      onChange={(e) => setFormData({ ...formData, keywords: e.target.value })}
                      className="input-glass h-12 text-base"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="tone" className="text-white">
                      Tone
                    </Label>
                    <Select value={formData.tone} onValueChange={(value) => setFormData({ ...formData, tone: value })}>
                      <SelectTrigger className="input-glass h-12 text-base">
                        <SelectValue placeholder="Select tone" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="professional">Professional</SelectItem>
                        <SelectItem value="casual">Casual</SelectItem>
                        <SelectItem value="humorous">Humorous</SelectItem>
                        <SelectItem value="inspiring">Inspiring</SelectItem>
                        <SelectItem value="urgent">Urgent</SelectItem>
                        <SelectItem value="conversational">Conversational</SelectItem>
                        <SelectItem value="authoritative">Authoritative</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <Button
                    onClick={handleGenerate}
                    className="w-full btn-primary text-lg h-14"
                    disabled={isGenerating || !formData.topic}
                  >
                    {isGenerating ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Generating...
                      </>
                    ) : (
                      <>
                        <Wand2 className="mr-2 h-4 w-4" />
                        Generate Copy
                      </>
                    )}
                  </Button>
                </CardContent>
              </Card>

              {/* Generated Copy */}
              <Card className="glass border-white/20 shadow-2xl">
                <CardHeader className="text-white">
                  <CardTitle className="flex items-center">
                    <PenTool className="mr-2 h-5 w-5" />
                    Generated Copy
                  </CardTitle>
                  <CardDescription className="text-white/80">Your AI-generated copy will appear here</CardDescription>
                </CardHeader>
                <CardContent>
                  {isGenerating ? (
                    <div className="text-center py-12">
                      <Loader2 className="mx-auto h-12 w-12 animate-spin text-white mb-4" />
                      <p className="text-white/80">Generating your copy content...</p>
                    </div>
                  ) : generatedCopy ? (
                    <div className="space-y-4">
                      <div className="bg-white/10 p-4 rounded-lg max-h-96 overflow-y-auto border border-white/20">
                        <pre className="whitespace-pre-wrap text-sm font-sans text-white">{generatedCopy}</pre>
                      </div>

                      <div className="flex space-x-2">
                        <Button onClick={copyToClipboard} variant="outline" className="flex-1 btn-secondary">
                          <Copy className="mr-2 h-4 w-4" />
                          Copy
                        </Button>
                        <Button onClick={downloadCopy} variant="outline" className="flex-1 btn-secondary">
                          <Download className="mr-2 h-4 w-4" />
                          Download
                        </Button>
                      </div>
                    </div>
                  ) : (
                    <div className="text-center py-12 text-white/60">
                      <PenTool className="mx-auto h-12 w-12 mb-4 opacity-50" />
                      <p>Fill in the form and click "Generate Copy" to see your content here.</p>
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>
          </Tabs>
        </div>
      </div>

      <FloatingChat />
    </div>
  )
}
