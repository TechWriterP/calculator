import type { NextConfig } from "next";

const isGitHubPages = process.env.GITHUB_ACTIONS === "true";
const repository = process.env.GITHUB_REPOSITORY?.split("/")[1] ?? "calculator";

const nextConfig: NextConfig = {
  output: "export",
  basePath: isGitHubPages ? `/${repository}` : "",
  assetPrefix: isGitHubPages ? `/${repository}/` : "",
  images: { unoptimized: true },
};

export default nextConfig;
