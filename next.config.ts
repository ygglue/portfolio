import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  allowedDevOrigins: ['192.168.1.176'],
  output: 'export',
  basePath: "",
  trailingSlash: true,
};

export default nextConfig;
