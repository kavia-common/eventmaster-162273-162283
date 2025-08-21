import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // When using static export, Next.js image optimization must be disabled.
  // This allows usage of next/image with output: "export".
  output: "export",
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
