/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  output: "export",
  images: {
    unoptimized: true,
    domains: ["your-domain.com"],
  },
  trailingSlash: true,
};

const debug = process.env.NODE_ENV !== "production";
const repository = "Russ481-k.github.io";

module.exports = {
  ...nextConfig,
  assetPrefix: !debug ? `/${repository}/` : "",
  basePath: !debug ? `/${repository}` : "",
};
