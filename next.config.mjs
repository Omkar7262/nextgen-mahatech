/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  transpilePackages: [],
  images: {
    formats: ["image/avif", "image/webp"],
  },
};

export default nextConfig;
