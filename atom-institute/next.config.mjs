/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  async rewrites() {
    const target = process.env.MCQ_API_URL
    if (!target) return []
    return [{ source: "/api/mcq/:path*", destination: `${target}/:path*` }]
  },
}

export default nextConfig
