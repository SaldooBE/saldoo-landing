import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Allow CommonJS modules like pdf-parse to work in server components
  serverExternalPackages: ['pdf-parse'],
};

export default nextConfig;
