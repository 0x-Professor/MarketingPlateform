/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: false,
    dirs: ["pages", "components", "lib", "app"],
  },
  typescript: {
    ignoreBuildErrors: false,
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "placeholder.svg",
      },
    ],
    unoptimized: false,
  },
  experimental: {
    serverComponentsExternalPackages: ["@supabase/supabase-js"],
    optimizePackageImports: ["lucide-react", "@radix-ui/react-icons"],
  },
  output: "standalone",
  webpack: (config, { isServer, dev }) => {
    // Handle client-side fallbacks
    if (!isServer) {
      config.resolve.fallback = {
        ...config.resolve.fallback,
        fs: false,
        net: false,
        tls: false,
        crypto: false,
      }
    }

    // Optimize bundle size in production
    if (!dev) {
      config.optimization = {
        ...config.optimization,
        sideEffects: false,
      }
    }

    return config
  },
  // Performance optimizations
  compress: true,
  poweredByHeader: false,
  generateEtags: true,
  swcMinify: true,

  // Security headers
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          {
            key: "X-Frame-Options",
            value: "DENY",
          },
          {
            key: "X-Content-Type-Options",
            value: "nosniff",
          },
          {
            key: "Referrer-Policy",
            value: "strict-origin-when-cross-origin",
          },
          {
            key: "X-XSS-Protection",
            value: "1; mode=block",
          },
        ],
      },
      {
        source: "/api/(.*)",
        headers: [
          {
            key: "Cache-Control",
            value: "no-cache, no-store, must-revalidate",
          },
        ],
      },
      {
        source: "/_next/static/(.*)",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=31536000, immutable",
          },
        ],
      },
    ]
  },
}

module.exports = nextConfig
