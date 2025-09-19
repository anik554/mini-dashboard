import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  allowedDevOrigins: ["http://192.168.0.153:3000", "http://localhost:3000"],
  reactStrictMode: true,
  images: {
    domains: ["lh3.googleusercontent.com"],
  },
};

export default nextConfig;
