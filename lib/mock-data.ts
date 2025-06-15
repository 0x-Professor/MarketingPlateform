export const mockEmailTemplates = [
  {
    id: 1,
    title: "Welcome Series Email",
    subject: "Welcome to {{company_name}}! Let's get started 🚀",
    content: `Hi {{first_name}},

Welcome to {{company_name}}! We're thrilled to have you on board.

Here's what you can expect in the coming days:
• A personalized onboarding guide
• Exclusive tips and tricks
• Special member-only offers

Ready to get started? Click the button below to explore your dashboard.

Best regards,
The {{company_name}} Team`,
    category: "Welcome",
    openRate: 85.2,
    clickRate: 12.4,
  },
  {
    id: 2,
    title: "Product Launch Announcement",
    subject: "🎉 Introducing {{product_name}} - You're going to love this!",
    content: `Hey {{first_name}},

Big news! We've just launched {{product_name}}, and it's everything you've been waiting for.

✨ Key features:
• Advanced automation capabilities
• Seamless integrations
• 10x faster performance

As a valued member, you get early access with a special 30% discount.

Claim your discount now - limited time offer!

Cheers,
{{company_name}} Team`,
    category: "Product Launch",
    openRate: 78.9,
    clickRate: 18.7,
  },
]

export const mockCopyTemplates = [
  {
    id: 1,
    type: "Social Media",
    platform: "LinkedIn",
    content: "🚀 Just discovered the secret to 10x productivity! Here's what changed everything for me... [Thread 1/5]",
    engagement: 1250,
    likes: 89,
    shares: 23,
  },
  {
    id: 2,
    type: "Ad Copy",
    platform: "Facebook",
    content:
      "Stop wasting time on manual tasks! Our AI automation saves you 20+ hours per week. Try it free for 14 days - no credit card required.",
    engagement: 2340,
    likes: 156,
    shares: 45,
  },
  {
    id: 3,
    type: "Blog Intro",
    platform: "Website",
    content:
      "In today's fast-paced digital world, marketing automation isn't just a luxury—it's a necessity. But here's the problem: most tools are either too complex or too simple. That's where we come in...",
    engagement: 890,
    likes: 67,
    shares: 12,
  },
]

export const mockDashboardData = {
  totalEmails: 12450,
  openRate: 24.8,
  clickRate: 3.2,
  conversionRate: 1.8,
  recentActivity: [
    { action: "Email campaign sent", count: 1250, time: "2 hours ago" },
    { action: "New template created", count: 1, time: "4 hours ago" },
    { action: "Copy generated", count: 15, time: "6 hours ago" },
    { action: "Dashboard viewed", count: 1, time: "8 hours ago" },
  ],
  chartData: [
    { month: "Jan", emails: 400, opens: 240, clicks: 80 },
    { month: "Feb", emails: 300, opens: 180, clicks: 60 },
    { month: "Mar", emails: 500, opens: 350, clicks: 120 },
    { month: "Apr", emails: 450, opens: 320, clicks: 100 },
    { month: "May", emails: 600, opens: 480, clicks: 150 },
    { month: "Jun", emails: 550, opens: 440, clicks: 140 },
  ],
}

export const mockServiceTemplates = [
  {
    id: 1,
    title: "E-commerce Email Series",
    description: "Complete email automation for online stores",
    category: "E-commerce",
    templates: 12,
    image: "/placeholder.svg?height=200&width=300",
    price: "Free",
  },
  {
    id: 2,
    title: "SaaS Onboarding Kit",
    description: "User onboarding emails and copy templates",
    category: "SaaS",
    templates: 8,
    image: "/placeholder.svg?height=200&width=300",
    price: "$29",
  },
  {
    id: 3,
    title: "Social Media Bundle",
    description: "Ready-to-use social media post templates",
    category: "Social Media",
    templates: 25,
    image: "/placeholder.svg?height=200&width=300",
    price: "$19",
  },
]
