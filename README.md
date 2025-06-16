# MarketingAI Pro

🚀 Advanced AI-powered marketing and copywriting automation platform built with Next.js 14, TypeScript, and Supabase.

## ✨ Features

- 🤖 AI-powered email generation using Gemini & LLaMA APIs
- ✍️ Marketing copy creation for social media, ads, and blogs
- 🔐 Secure authentication with Supabase
- 📱 Fully responsive design
- 🌙 Dark/light mode support
- ⚡ Optimized performance and SEO
- 🎨 Beautiful UI with Tailwind CSS and Radix UI

## 🛠️ Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **UI Components**: Radix UI
- **Authentication**: Supabase Auth
- **Database**: Supabase
- **Icons**: Lucide React
- **Package Manager**: npm

## 🚀 Getting Started

### Prerequisites

- Node.js 18.17.0 or later
- npm 9.0.0 or later
- Supabase account

### Installation

1. **Clone the repository**
   \`\`\`bash
   git clone <repository-url>
   cd marketing-automation-saas
   \`\`\`

2. **Install dependencies**
   \`\`\`bash
   npm install --legacy-peer-deps
   \`\`\`

3. **Set up environment variables**
   \`\`\`bash
   cp .env.local.example .env.local
   \`\`\`
   
   Fill in your Supabase credentials:
   \`\`\`env
   NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
   \`\`\`

4. **Run the development server**
   \`\`\`bash
   npm run dev
   \`\`\`

5. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## 📁 Project Structure

\`\`\`
marketing-automation-saas/
├── app/                    # Next.js 14 App Router
│   ├── api/               # API routes
│   ├── dashboard/         # Dashboard pages
│   ├── generate/          # Email generation
│   ├── copy/              # Copy generation
│   ├── login/             # Authentication
│   └── globals.css        # Global styles
├── components/            # Reusable components
│   ├── ui/                # UI components
│   ├── navbar.tsx         # Navigation
│   └── auth-provider.tsx  # Auth context
├── lib/                   # Utilities and configs
│   ├── supabase.ts        # Supabase client
│   ├── gemini-api.ts      # Gemini AI integration
│   └── llama-api.ts       # LLaMA AI integration
└── middleware.ts          # Route protection
\`\`\`

## 🔧 Configuration

### Supabase Setup

1. Create a new Supabase project
2. Enable authentication providers
3. Configure email settings (optional)
4. Copy your project URL and anon key to `.env.local`

### AI API Setup

The project includes pre-configured API keys for:
- **Gemini AI**: For primary email generation
- **LLaMA AI**: For fallback copy generation

## 🚀 Deployment

### Vercel (Recommended)

1. **Connect your repository to Vercel**
2. **Add environment variables**
3. **Deploy**

\`\`\`bash
npm run build
\`\`\`

### Docker

\`\`\`bash
# Build the image
docker build -t marketing-ai-pro .

# Run the container
docker run -p 3000:3000 marketing-ai-pro
\`\`\`

### Manual Deployment

\`\`\`bash
# Build for production
npm run build

# Start production server
npm start
\`\`\`

## 📊 Features Overview

### 🤖 AI Email Generation
- Complete email campaigns with subject lines
- Multiple email types (welcome, promotional, follow-up)
- Customizable tone and messaging
- Dual AI system with fallback support

### ✍️ Copy Generation
- Social media posts
- Ad copy for multiple platforms
- Blog content and introductions
- SEO-optimized content

### 📈 Dashboard
- Campaign analytics
- Performance metrics
- Recent activity tracking
- Quick action shortcuts

### 🔐 Authentication
- Secure user registration
- Email/password login
- OTP authentication support
- Protected routes

## 🛡️ Security Features

- Environment variable protection
- API route security
- CORS configuration
- Input validation
- XSS protection
- CSRF protection

## 🎨 UI/UX Features

- Responsive design for all devices
- Dark/light mode toggle
- Smooth animations and transitions
- Accessible components
- Loading states and error handling
- Toast notifications

## 📱 Mobile Support

- Fully responsive design
- Touch-friendly interface
- Mobile-optimized navigation
- Progressive Web App ready

## 🔄 API Integration

### Gemini AI
- Primary content generation
- Advanced language models
- High-quality output
- Rate limiting and error handling

### LLaMA AI
- Fallback content generation
- Alternative AI provider
- Redundancy and reliability
- Custom prompt engineering

## 🧪 Testing

\`\`\`bash
# Run type checking
npm run type-check

# Run linting
npm run lint

# Fix linting issues
npm run lint:fix
\`\`\`

## 📦 Build Optimization

- Tree shaking for smaller bundles
- Image optimization
- Code splitting
- Static generation where possible
- Compression and minification

## 🔧 Development Tools

- TypeScript for type safety
- ESLint for code quality
- Prettier for code formatting
- Husky for git hooks
- Tailwind CSS for styling

## 🚀 Performance

- Lighthouse score: 95+
- Core Web Vitals optimized
- Lazy loading
- Image optimization
- Bundle size optimization

## 📄 License

This project is licensed under the MIT License.

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## 📞 Support

For support and questions:
- Create an issue on GitHub
- Check the documentation
- Contact support team

## 🔄 Updates

Stay updated with the latest features:
- Watch the repository
- Follow release notes
- Check changelog

---

Built with ❤️ using Next.js, TypeScript, and Supabase.
