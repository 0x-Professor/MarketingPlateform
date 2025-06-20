"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Navbar } from "@/components/navbar"
import { FloatingChat } from "@/components/floating-chat"
import { Mail, Wand2, Copy, Download, RefreshCw, Sparkles, CheckCircle, AlertCircle } from "lucide-react"
import { useToast } from "@/components/ui/use-toast"

export default function GeneratePage() {
  const [formData, setFormData] = useState({
    emailType: "",
    companyName: "",
    productName: "",
    targetAudience: "",
    keyMessage: "",
    tone: "",
  })
  const [generatedEmail, setGeneratedEmail] = useState("")
  const [isGenerating, setIsGenerating] = useState(false)
  const [apiUsed, setApiUsed] = useState("")
  const [contentLength, setContentLength] = useState(0)
  const { toast } = useToast()

  const handleGenerate = async () => {
    if (!formData.emailType) {
      toast({
        title: "Missing Information",
        description: "Please select an email type to continue.",
        variant: "destructive",
      })
      return
    }

    setIsGenerating(true)
    setGeneratedEmail("")
    setApiUsed("")
    setContentLength(0)

    try {
      console.log("🚀 Starting email generation with data:", formData)

      const response = await fetch("/api/generate-email", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      })

      const data = await response.json()
      console.log("📧 Received response:", data)

      if (!response.ok) {
        throw new Error(data.error || "Failed to generate email")
      }

      if (data.content) {
        setGeneratedEmail(data.content)
        setApiUsed(data.apiUsed || "Unknown")
        setContentLength(data.contentLength || data.content.length)

        toast({
          title: "Email Generated Successfully!",
          description: `Generated using ${data.apiUsed} API (${data.contentLength} characters)`,
          action: (
            <div className="flex items-center">
              <CheckCircle className="h-4 w-4 text-green-500 mr-1" />
              <span className="text-sm">Complete</span>
            </div>
          ),
        })
      } else {
        throw new Error("No content received from API")
      }
    } catch (error) {
      console.error("❌ Generation error:", error)
      toast({
        title: "Generation Failed",
        description: error instanceof Error ? error.message : "An unexpected error occurred",
        variant: "destructive",
        action: (
          <div className="flex items-center">
            <AlertCircle className="h-4 w-4 text-red-500 mr-1" />
            <span className="text-sm">Error</span>
          </div>
        ),
      })
    } finally {
      setIsGenerating(false)
    }
  }

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(generatedEmail)
      toast({
        title: "Copied to Clipboard!",
        description: "Email content has been copied successfully.",
        action: (
          <div className="flex items-center">
            <CheckCircle className="h-4 w-4 text-green-500 mr-1" />
            <span className="text-sm">Copied</span>
          </div>
        ),
      })
    } catch {
      toast({
        title: "Copy Failed",
        description: "Unable to copy to clipboard. Please try again.",
        variant: "destructive",
      })
    }
  }

  const downloadEmail = () => {
    try {
      const blob = new Blob([generatedEmail], { type: "text/plain" })
      const url = URL.createObjectURL(blob)
      const a = document.createElement("a")
      a.href = url
      a.download = `${formData.emailType || "email"}-campaign-${Date.now()}.txt`
      document.body.appendChild(a)
      a.click()
      document.body.removeChild(a)
      URL.revokeObjectURL(url)

      toast({
        title: "Download Started!",
        description: "Your email content is being downloaded.",
        action: (
          <div className="flex items-center">
            <CheckCircle className="h-4 w-4 text-green-500 mr-1" />
            <span className="text-sm">Downloaded</span>
          </div>
        ),
      })
    } catch {
      toast({
        title: "Download Failed",
        description: "Unable to download file. Please try again.",
        variant: "destructive",
      })
    }
  }

  const regenerateEmail = () => {
    if (generatedEmail) {
      handleGenerate()
    }
  }

  return (
    <div className="min-h-screen gradient-bg">
      <Navbar />

      <div className="pt-20 px-4 pb-8">
        <div className="max-w-7xl mx-auto">
          {/* Hero Section */}
          <div className="mb-12 text-center fade-in">
            <h1 className="text-5xl md:text-6xl font-bold mb-6 text-white text-shadow-lg flex items-center justify-center">
              <Mail className="mr-4 h-12 w-12 md:h-16 md:w-16 float" />
              AI Email Generator
            </h1>
            <p className="text-white/90 text-xl md:text-2xl max-w-4xl mx-auto text-shadow leading-relaxed">
              Create high-converting email campaigns with AI-powered content generation that includes complete subject
              lines and email bodies.
            </p>
            {apiUsed && (
              <div className="mt-4 inline-flex items-center px-4 py-2 bg-white/20 rounded-full backdrop-blur-sm">
                <CheckCircle className="h-4 w-4 text-green-400 mr-2" />
                <span className="text-white text-sm font-medium">
                  Last generated using {apiUsed} • {contentLength} characters
                </span>
              </div>
            )}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Input Form */}
            <Card className="glass border-white/30 shadow-2xl card-hover slide-in-left">
              <CardHeader className="text-white">
                <CardTitle className="flex items-center text-2xl">
                  <Sparkles className="mr-3 h-7 w-7" />
                  Email Campaign Details
                </CardTitle>
                <CardDescription className="text-white/80 text-lg">
                  Fill in the details to generate your complete email campaign
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-3">
                  <Label htmlFor="emailType" className="text-white font-semibold text-lg">
                    Email Type *
                  </Label>
                  <Select
                    value={formData.emailType}
                    onValueChange={(value) => setFormData({ ...formData, emailType: value })}
                  >
                    <SelectTrigger className="input-glass h-14 text-lg">
                      <SelectValue placeholder="Select email type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="welcome">Welcome Email</SelectItem>
                      <SelectItem value="product-launch">Product Launch</SelectItem>
                      <SelectItem value="newsletter">Newsletter</SelectItem>
                      <SelectItem value="promotional">Promotional</SelectItem>
                      <SelectItem value="follow-up">Follow-up</SelectItem>
                      <SelectItem value="abandoned-cart">Abandoned Cart</SelectItem>
                      <SelectItem value="re-engagement">Re-engagement</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-3">
                    <Label htmlFor="companyName" className="text-white font-semibold text-lg">
                      Company Name
                    </Label>
                    <Input
                      id="companyName"
                      placeholder="Enter your company name"
                      value={formData.companyName}
                      onChange={(e) => setFormData({ ...formData, companyName: e.target.value })}
                      className="input-glass h-14 text-lg"
                    />
                  </div>

                  <div className="space-y-3">
                    <Label htmlFor="productName" className="text-white font-semibold text-lg">
                      Product/Service Name
                    </Label>
                    <Input
                      id="productName"
                      placeholder="Enter product or service name"
                      value={formData.productName}
                      onChange={(e) => setFormData({ ...formData, productName: e.target.value })}
                      className="input-glass h-14 text-lg"
                    />
                  </div>
                </div>

                <div className="space-y-3">
                  <Label htmlFor="targetAudience" className="text-white font-semibold text-lg">
                    Target Audience
                  </Label>
                  <Input
                    id="targetAudience"
                    placeholder="e.g., Small business owners, Tech enthusiasts"
                    value={formData.targetAudience}
                    onChange={(e) => setFormData({ ...formData, targetAudience: e.target.value })}
                    className="input-glass h-14 text-lg"
                  />
                </div>

                <div className="space-y-3">
                  <Label htmlFor="keyMessage" className="text-white font-semibold text-lg">
                    Key Message
                  </Label>
                  <Textarea
                    id="keyMessage"
                    placeholder="What's the main message you want to convey?"
                    value={formData.keyMessage}
                    onChange={(e) => setFormData({ ...formData, keyMessage: e.target.value })}
                    rows={4}
                    className="input-glass text-lg resize-none"
                  />
                </div>

                <div className="space-y-3">
                  <Label htmlFor="tone" className="text-white font-semibold text-lg">
                    Tone
                  </Label>
                  <Select value={formData.tone} onValueChange={(value) => setFormData({ ...formData, tone: value })}>
                    <SelectTrigger className="input-glass h-14 text-lg">
                      <SelectValue placeholder="Select tone" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="professional">Professional</SelectItem>
                      <SelectItem value="friendly">Friendly</SelectItem>
                      <SelectItem value="casual">Casual</SelectItem>
                      <SelectItem value="urgent">Urgent</SelectItem>
                      <SelectItem value="enthusiastic">Enthusiastic</SelectItem>
                      <SelectItem value="conversational">Conversational</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <Button
                  onClick={handleGenerate}
                  className="w-full h-16 text-xl font-bold btn-primary"
                  disabled={isGenerating || !formData.emailType}
                  loading={isGenerating}
                >
                  {!isGenerating && (
                    <>
                      <Wand2 className="mr-3 h-6 w-6" />
                      Generate Complete Email
                    </>
                  )}
                </Button>
              </CardContent>
            </Card>

            {/* Generated Email */}
            <Card className="glass border-white/30 shadow-2xl card-hover slide-in-right">
              <CardHeader className="text-white">
                <CardTitle className="flex items-center justify-between text-2xl">
                  <div className="flex items-center">
                    <Mail className="mr-3 h-7 w-7" />
                    Generated Email
                  </div>
                  {generatedEmail && (
                    <Button
                      onClick={regenerateEmail}
                      variant="ghost"
                      size="sm"
                      className="text-white hover:text-white hover:bg-white/20"
                      disabled={isGenerating}
                    >
                      <RefreshCw className={`h-5 w-5 ${isGenerating ? "animate-spin" : ""}`} />
                    </Button>
                  )}
                </CardTitle>
                <CardDescription className="text-white/80 text-lg">
                  Your complete AI-generated email with subject line and full body content
                </CardDescription>
              </CardHeader>
              <CardContent>
                {isGenerating ? (
                  <div className="text-center py-20 scale-in">
                    <div className="relative">
                      <div className="w-20 h-20 mx-auto mb-6 border-4 border-white/30 border-t-white rounded-full animate-spin"></div>
                      <div className="absolute inset-0 flex items-center justify-center">
                        <Mail className="h-8 w-8 text-white" />
                      </div>
                    </div>
                    <p className="text-white/80 text-xl mb-2">Generating your complete email content...</p>
                    <p className="text-white/60 text-lg">This includes subject line and full email body</p>
                    <div className="mt-6 flex justify-center space-x-1">
                      <div className="w-2 h-2 bg-white/60 rounded-full animate-bounce"></div>
                      <div
                        className="w-2 h-2 bg-white/60 rounded-full animate-bounce"
                        style={{ animationDelay: "0.1s" }}
                      ></div>
                      <div
                        className="w-2 h-2 bg-white/60 rounded-full animate-bounce"
                        style={{ animationDelay: "0.2s" }}
                      ></div>
                    </div>
                  </div>
                ) : generatedEmail ? (
                  <div className="space-y-6 fade-in">
                    <div className="bg-white/20 p-6 rounded-xl max-h-96 overflow-y-auto border border-white/30 backdrop-blur-sm">
                      <pre className="whitespace-pre-wrap text-base font-sans text-white leading-relaxed">
                        {generatedEmail}
                      </pre>
                    </div>
                    <div className="flex flex-col sm:flex-row gap-3">
                      <Button onClick={copyToClipboard} variant="outline" className="flex-1 h-14 text-lg btn-secondary">
                        <Copy className="mr-3 h-5 w-5" />
                        Copy Email
                      </Button>
                      <Button onClick={downloadEmail} variant="outline" className="flex-1 h-14 text-lg btn-secondary">
                        <Download className="mr-3 h-5 w-5" />
                        Download
                      </Button>
                    </div>
                  </div>
                ) : (
                  <div className="text-center py-20 text-white/60 fade-in">
                    <Mail className="mx-auto h-20 w-20 mb-6 opacity-50" />
                    <p className="text-2xl mb-4 font-medium">Ready to create your email campaign?</p>
                    <p className="text-lg">
                      Fill in the form and click &quot;Generate Complete Email&quot; to see your content here.
                    </p>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      <FloatingChat />
    </div>
  )
}
