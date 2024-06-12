/** @type {import('next').NextConfig} */
const nextConfig = {
  // Fix shared typeing issue
  typescript: {
    // !! WARN !!
    // Dangerously allow production builds to successfully complete even if
    // your project has type errors.
    // !! WARN !!
    ignoreBuildErrors: process.env.NODE_ENV === "production",
  },
};

export default nextConfig;
