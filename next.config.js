/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
};

const debug = process.env.NODE_ENV !== "production";
const name = "Russ481-k.github.io";

module.exports = {
  assetPrefix: !debug ? `https://${name}` : "",
  basePath: !debug ? `/${name}` : "",
  ...nextConfig,
};
