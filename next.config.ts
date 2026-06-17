import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
      {
        protocol: "https",
        hostname: "institucional.seazone.com.br",
      },
      {
        protocol: "https",
        hostname: "guia-do-hospede.seazone.com.br",
      },
    ],
  },
};

export default nextConfig;
