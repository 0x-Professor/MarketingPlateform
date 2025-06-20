import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Navbar } from "@/components/navbar"
import { FloatingChat } from "@/components/floating-chat"
import { createServerClient } from "@/lib/supabase-server"
import { mockServiceTemplates } from "@/lib/mock-data"
import { FileText, Download, Eye, Star, Sparkles } from "lucide-react"
import Image from "next/image"

export default async function TemplatesPage() {
  const supabase = await createServerClient()
  await supabase.auth.getSession()

  return (
    <div className="min-h-screen gradient-bg">
      <Navbar />

      <div className="pt-20 px-4 pb-8">
        <div className="max-w-7xl mx-auto">
          <div className="mb-12 text-center fade-in">
            <h1 className="text-4xl md:text-5xl font-bold mb-6 text-white text-shadow-lg flex items-center justify-center">
              <FileText className="mr-4 h-12 w-12 md:h-16 md:w-16 float" />
              Template Library
            </h1>
            <p className="text-white/90 text-xl md:text-2xl max-w-4xl mx-auto text-shadow">
              Browse and download professional marketing templates for every industry.
            </p>
          </div>

          {/* Featured Templates */}
          <div className="mb-8">
            <h2 className="text-2xl font-semibold mb-4 text-white flex items-center">
              <Sparkles className="mr-2 h-6 w-6" />
              Featured Templates
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {mockServiceTemplates.map((template) => (
                <Card key={template.id} className="glass border-white/30 shadow-2xl card-hover">
                  <div className="relative">
                    <Image
                      src={template.image || "/placeholder.svg"}
                      alt={template.title}
                      width={300}
                      height={200}
                      className="w-full h-48 object-cover rounded-t-lg"
                    />
                    <Badge className="absolute top-2 right-2 bg-white text-black">{template.price}</Badge>
                  </div>
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <Badge variant="secondary" className="bg-white/20 text-white border-white/20">
                        {template.category}
                      </Badge>
                      <div className="flex items-center text-sm text-white/70">
                        <Star className="h-4 w-4 mr-1 fill-current text-yellow-400" />
                        4.8
                      </div>
                    </div>
                    <CardTitle className="text-lg text-white">{template.title}</CardTitle>
                    <CardDescription className="text-white/80">{template.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center justify-between mb-4">
                      <span className="text-sm text-white/70">{template.templates} templates included</span>
                    </div>
                    <div className="flex space-x-2">
                      <Button variant="outline" size="sm" className="btn-secondary">
                        <Eye className="mr-2 h-4 w-4" />
                        Preview
                      </Button>
                      <Button size="sm" className="btn-primary">
                        <Download className="mr-2 h-4 w-4" />
                        Download
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Categories */}
          <div className="mb-8">
            <h2 className="text-2xl font-semibold mb-4 text-white">Browse by Category</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
              {["E-commerce", "SaaS", "Healthcare", "Education", "Finance", "Real Estate"].map((category) => (
                <Card key={category} className="glass border-white/30 shadow-2xl card-hover cursor-pointer">
                  <CardContent className="p-4 text-center">
                    <FileText className="h-8 w-8 mx-auto mb-2 text-white" />
                    <p className="font-medium text-white">{category}</p>
                    <p className="text-xs text-white/70">{Math.floor(Math.random() * 20) + 5} templates</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Popular Templates */}
          <div>
            <h2 className="text-2xl font-semibold mb-4 text-white">Most Popular</h2>
            <div className="space-y-4">
              {[
                { name: "Welcome Email Series", downloads: 1250, rating: 4.9 },
                { name: "Product Launch Campaign", downloads: 980, rating: 4.8 },
                { name: "Newsletter Template Pack", downloads: 750, rating: 4.7 },
                { name: "Social Media Bundle", downloads: 650, rating: 4.6 },
              ].map((template, index) => (
                <Card key={index} className="glass border-white/30 shadow-2xl card-hover">
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-4">
                        <div className="bg-white/10 p-2 rounded-lg">
                          <FileText className="h-6 w-6 text-white" />
                        </div>
                        <div>
                          <h3 className="font-semibold text-white">{template.name}</h3>
                          <p className="text-sm text-white/70">
                            {template.downloads} downloads • {template.rating} ⭐
                          </p>
                        </div>
                      </div>
                      <div className="flex space-x-2">
                        <Button variant="outline" size="sm" className="btn-secondary">
                          <Eye className="mr-2 h-4 w-4" />
                          Preview
                        </Button>
                        <Button size="sm" className="btn-primary">
                          <Download className="mr-2 h-4 w-4" />
                          Download
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </div>

      <FloatingChat />
    </div>
  )
}
