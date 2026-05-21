import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  allowedDevOrigins: ['192.168.1.176'],
  output: 'export',
  basePath: process.env.NODE_ENV === "production" ? "/portfolio" : "",
  trailingSlash: true,
};

export default nextConfig;
