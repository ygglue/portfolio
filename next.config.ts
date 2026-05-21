import type { NextConfig } from "next";

const isGithubActions = !!process.env.GITHUB_ACTIONS;
const repo = process.env.GITHUB_REPOSITORY?.replace(/.*?\//, "") || "";

const nextConfig: NextConfig = {
  allowedDevOrigins: ['192.168.1.176'],
  output: 'export',
  basePath: isGithubActions ? `/${repo}` : "",
  trailingSlash: true,
};

export default nextConfig;
