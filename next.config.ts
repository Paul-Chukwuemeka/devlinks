import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  allowedDevOrigins: [
    "http://localhost:3000",
    "http://192.168.12.103:3000"
  ],
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "jdjdebqivqrbhqgfgiwr.supabase.co",
        port: "",
        pathname: "/storage/v1/**",
      },
      {
        protocol: "https",
        hostname: "www.google.com",
        port: "",
        pathname: "/s2/favicons",
      },
    ],
  },
};

export default nextConfig;
