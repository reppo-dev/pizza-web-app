import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    domains: [
      "sibche.com",
      "www.webpouya.com",
      "localhost",
      "dkstatics-public.digikala.com",
    ],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "c675240.parspack.net",
        port: "",
        pathname: "/c675240/**",
      },
    ],
  },
  async rewrites() {
    return [
      {
        source: "/:path*",
        destination: "http://localhost:8000/:path*",
      },
    ];
  },
};

export default nextConfig;
