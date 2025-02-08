/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  output: "export",
  images: {
    unoptimized: true,
    domains: ["russ-sbyoon.vercel.app"],
  },
  trailingSlash: true,
};

// GitHub Pages와 Vercel 환경 구분
const isGithubActions = process.env.GITHUB_ACTIONS || false;
const repository = "Russ481-k.github.io";

let assetPrefix = "";
let basePath = "";

if (isGithubActions) {
  // GitHub Pages 배포 시
  assetPrefix = `/${repository}/`;
  basePath = `/${repository}`;
}

module.exports = {
  ...nextConfig,
  assetPrefix,
  basePath,
};
