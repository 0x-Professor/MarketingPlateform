"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Separator } from "@/components/ui/separator"
import { Navbar } from "@/components/navbar"
import { FloatingChat } from "@/components/floating-chat"
import { useToast } from "@/components/ui/use-toast"
import { Settings, User, Bell, Shield, CreditCard } from "lucide-react"

export default function SettingsPage() {
  const [profile, setProfile] = useState({
    fullName: "",
    email: "",
    company: "",
    role: "",
  })
  const [notifications, setNotifications] = useState({
    emailUpdates: true,
    marketingEmails: false,
    securityAlerts: true,
  })
  const [loading, setLoading] = useState(false)
  const { toast } = useToast()

  const handleSaveProfile = async () => {
    setLoading(true)
    // Simulate API call
    setTimeout(() => {
      setLoading(false)
      toast({
        title: "Profile Updated",
        description: "Your profile has been updated successfully.",
      })
    }, 1000)
  }

  const handleSaveNotifications = async () => {
    setLoading(true)
    // Simulate API call
    setTimeout(() => {
      setLoading(false)
      toast({
        title: "Preferences Updated",
        description: "Your notification preferences have been saved.",
      })
    }, 1000)
  }

  return (
    <div className="min-h-screen gradient-bg">
      <Navbar />

      <div className="pt-20 px-4 pb-8">
        <div className="max-w-4xl mx-auto">
          <div className="mb-12 text-center fade-in">
            <h1 className="text-4xl md:text-5xl font-bold mb-6 text-white text-shadow-lg flex items-center justify-center">
              <Settings className="mr-4 h-12 w-12 md:h-16 md:w-16 float" />
              Settings
            </h1>
            <p className="text-white/90 text-xl md:text-2xl text-shadow">
              Manage your account settings and preferences.
            </p>
          </div>

          <div className="space-y-6">
            {/* Profile Settings */}
            <Card className="glass border-white/30 shadow-2xl">
              <CardHeader>
                <CardTitle className="flex items-center text-white">
                  <User className="mr-2 h-5 w-5" />
                  Profile Information
                </CardTitle>
                <CardDescription className="text-white/80">
                  Update your personal information and account details.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="fullName" className="text-white">
                      Full Name
                    </Label>
                    <Input
                      id="fullName"
                      placeholder="Enter your full name"
                      value={profile.fullName}
                      onChange={(e) => setProfile({ ...profile, fullName: e.target.value })}
                      className="input-glass"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email" className="text-white">
                      Email
                    </Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="Enter your email"
                      value={profile.email}
                      onChange={(e) => setProfile({ ...profile, email: e.target.value })}
                      className="input-glass"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="company" className="text-white">
                      Company
                    </Label>
                    <Input
                      id="company"
                      placeholder="Enter your company name"
                      value={profile.company}
                      onChange={(e) => setProfile({ ...profile, company: e.target.value })}
                      className="input-glass"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="role" className="text-white">
                      Role
                    </Label>
                    <Input
                      id="role"
                      placeholder="Enter your role"
                      value={profile.role}
                      onChange={(e) => setProfile({ ...profile, role: e.target.value })}
                      className="input-glass"
                    />
                  </div>
                </div>
                <Button onClick={handleSaveProfile} disabled={loading} className="btn-primary">
                  {loading ? "Saving..." : "Save Profile"}
                </Button>
              </CardContent>
            </Card>

            {/* Notification Settings */}
            <Card className="glass border-white/30 shadow-2xl">
              <CardHeader>
                <CardTitle className="flex items-center text-white">
                  <Bell className="mr-2 h-5 w-5" />
                  Notification Preferences
                </CardTitle>
                <CardDescription className="text-white/80">
                  Choose what notifications you want to receive.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label className="text-white">Email Updates</Label>
                    <p className="text-sm text-white/70">Receive updates about your campaigns and account activity.</p>
                  </div>
                  <Switch
                    checked={notifications.emailUpdates}
                    onCheckedChange={(checked) => setNotifications({ ...notifications, emailUpdates: checked })}
                  />
                </div>
                <Separator className="bg-white/20" />
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label className="text-white">Marketing Emails</Label>
                    <p className="text-sm text-white/70">Receive tips, best practices, and product updates.</p>
                  </div>
                  <Switch
                    checked={notifications.marketingEmails}
                    onCheckedChange={(checked) => setNotifications({ ...notifications, marketingEmails: checked })}
                  />
                </div>
                <Separator className="bg-white/20" />
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label className="text-white">Security Alerts</Label>
                    <p className="text-sm text-white/70">Important security notifications about your account.</p>
                  </div>
                  <Switch
                    checked={notifications.securityAlerts}
                    onCheckedChange={(checked) => setNotifications({ ...notifications, securityAlerts: checked })}
                  />
                </div>
                <Button onClick={handleSaveNotifications} disabled={loading} className="btn-primary">
                  {loading ? "Saving..." : "Save Preferences"}
                </Button>
              </CardContent>
            </Card>

            {/* Security Settings */}
            <Card className="glass border-white/30 shadow-2xl">
              <CardHeader>
                <CardTitle className="flex items-center text-white">
                  <Shield className="mr-2 h-5 w-5" />
                  Security
                </CardTitle>
                <CardDescription className="text-white/80">Manage your account security settings.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <Label className="text-white">Change Password</Label>
                    <p className="text-sm text-white/70">Update your account password for better security.</p>
                  </div>
                  <Button variant="outline" className="btn-secondary">
                    Change Password
                  </Button>
                </div>
                <Separator className="bg-white/20" />
                <div className="flex items-center justify-between">
                  <div>
                    <Label className="text-white">Two-Factor Authentication</Label>
                    <p className="text-sm text-white/70">Add an extra layer of security to your account.</p>
                  </div>
                  <Button variant="outline" className="btn-secondary">
                    Enable 2FA
                  </Button>
                </div>
                <Separator className="bg-white/20" />
                <div className="flex items-center justify-between">
                  <div>
                    <Label className="text-white">Active Sessions</Label>
                    <p className="text-sm text-white/70">Manage devices that are signed into your account.</p>
                  </div>
                  <Button variant="outline" className="btn-secondary">
                    View Sessions
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Billing Settings */}
            <Card className="glass border-white/30 shadow-2xl">
              <CardHeader>
                <CardTitle className="flex items-center text-white">
                  <CreditCard className="mr-2 h-5 w-5" />
                  Billing & Subscription
                </CardTitle>
                <CardDescription className="text-white/80">
                  Manage your subscription and billing information.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <Label className="text-white">Current Plan</Label>
                    <p className="text-sm text-white/70">Pro Plan - $29/month</p>
                  </div>
                  <Button variant="outline" className="btn-secondary">
                    Upgrade Plan
                  </Button>
                </div>
                <Separator className="bg-white/20" />
                <div className="flex items-center justify-between">
                  <div>
                    <Label className="text-white">Payment Method</Label>
                    <p className="text-sm text-white/70">•••• •••• •••• 4242</p>
                  </div>
                  <Button variant="outline" className="btn-secondary">
                    Update Payment
                  </Button>
                </div>
                <Separator className="bg-white/20" />
                <div className="flex items-center justify-between">
                  <div>
                    <Label className="text-white">Billing History</Label>
                    <p className="text-sm text-white/70">View and download your invoices.</p>
                  </div>
                  <Button variant="outline" className="btn-secondary">
                    View History
                  </Button>
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
