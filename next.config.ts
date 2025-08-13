import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    // remotePatterns: [{ hostname: "images.unsplash.com" }]
    domains: ["files.stripe.com"],
  }
};

export default nextConfig;
