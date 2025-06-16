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
   cp .env.example .env.local
   \`\`\`
   
   Fill in your Supabase credentials in `.env.local`

4. **Run the development server**
   \`\`\`bash
   npm run dev
   \`\`\`

5. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## 📦 Deployment

### Vercel (Recommended)

1. **Connect your repository to Vercel**
2. **Add environment variables in Vercel dashboard**
3. **Deploy automatically on push to main branch**

### Manual Deployment

\`\`\`bash
npm run build
npm start
\`\`\`

## 🔧 Configuration

### Supabase Setup

1. Create a new Supabase project
2. Enable authentication
3. Add your project URL and anon key to `.env.local`

### Environment Variables

Required environment variables:

- `NEXT_PUBLIC_SUPABASE_URL`: Your Supabase project URL
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`: Your Supabase anonymous key

## 📝 Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint
- `npm run type-check` - Run TypeScript type checking

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License.

## 🆘 Support

If you need help, please open an issue or contact support.
