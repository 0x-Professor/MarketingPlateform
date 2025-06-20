import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Navbar } from "@/components/navbar"
import { FloatingChat } from "@/components/floating-chat"
import { createServerClient } from "@/lib/supabase-server"
import { mockDashboardData } from "@/lib/mock-data"
import { Mail, PenTool, FileText, TrendingUp, MousePointer, Eye, Sparkles } from "lucide-react"
import Link from "next/link"

export default async function DashboardPage() {
  const supabase = await createServerClient()
  const {
    data: { session },
  } = await supabase.auth.getSession()

  return (
    <div className="min-h-screen gradient-bg">
      <Navbar />

      <div className="pt-20 px-4 pb-8">
        <div className="max-w-7xl mx-auto">
          <div className="mb-12 text-center fade-in">
            <h1 className="text-4xl md:text-5xl font-bold mb-6 text-white text-shadow-lg">
              Welcome back, {session?.user?.user_metadata?.full_name || "User"}!
            </h1>
            <p className="text-white/90 text-xl md:text-2xl text-shadow">
              Here&apos;s what&apos;s happening with your marketing campaigns today.
            </p>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <Card className="glass border-white/30 shadow-2xl card-hover">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-white">Total Emails</CardTitle>
                <Mail className="h-4 w-4 text-white/70" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-white">{mockDashboardData.totalEmails.toLocaleString()}</div>
                <p className="text-xs text-white/70">+12% from last month</p>
              </CardContent>
            </Card>

            <Card className="glass border-white/30 shadow-2xl card-hover">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-white">Open Rate</CardTitle>
                <Eye className="h-4 w-4 text-white/70" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-white">{mockDashboardData.openRate}%</div>
                <p className="text-xs text-white/70">+2.1% from last month</p>
              </CardContent>
            </Card>

            <Card className="glass border-white/30 shadow-2xl card-hover">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-white">Click Rate</CardTitle>
                <MousePointer className="h-4 w-4 text-white/70" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-white">{mockDashboardData.clickRate}%</div>
                <p className="text-xs text-white/70">+0.5% from last month</p>
              </CardContent>
            </Card>

            <Card className="glass border-white/30 shadow-2xl card-hover">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-white">Conversion Rate</CardTitle>
                <TrendingUp className="h-4 w-4 text-white/70" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-white">{mockDashboardData.conversionRate}%</div>
                <p className="text-xs text-white/70">+0.3% from last month</p>
              </CardContent>
            </Card>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Quick Actions */}
            <Card className="glass border-white/30 shadow-2xl card-hover">
              <CardHeader>
                <CardTitle className="text-white flex items-center">
                  <Sparkles className="mr-2 h-5 w-5" />
                  Quick Actions
                </CardTitle>
                <CardDescription className="text-white/80">Jump into your most used tools</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <Link href="/generate">
                  <Button className="w-full justify-start btn-secondary" variant="outline">
                    <Mail className="mr-2 h-4 w-4" />
                    Generate Email Campaign
                  </Button>
                </Link>
                <Link href="/copy">
                  <Button className="w-full justify-start btn-secondary" variant="outline">
                    <PenTool className="mr-2 h-4 w-4" />
                    Create Copy Content
                  </Button>
                </Link>
                <Link href="/templates">
                  <Button className="w-full justify-start btn-secondary" variant="outline">
                    <FileText className="mr-2 h-4 w-4" />
                    Browse Templates
                  </Button>
                </Link>
              </CardContent>
            </Card>

            {/* Recent Activity */}
            <Card className="glass border-white/30 shadow-2xl card-hover">
              <CardHeader>
                <CardTitle className="text-white flex items-center">
                  <TrendingUp className="mr-2 h-5 w-5" />
                  Recent Activity
                </CardTitle>
                <CardDescription className="text-white/80">Your latest marketing activities</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {mockDashboardData.recentActivity.map((activity, index) => (
                    <div key={index} className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium text-white">{activity.action}</p>
                        <p className="text-xs text-white/70">{activity.time}</p>
                      </div>
                      <div className="text-sm font-medium text-white">{activity.count > 1 ? activity.count : ""}</div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      <FloatingChat />
    </div>
  )
}
