/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "export",
  images: {
    unoptimized: true,
  },
  // i18n 설정 제거
};

module.exports = nextConfig;
