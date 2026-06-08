import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  reactCompiler: true,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**", // 모든 외부 도메인 허용
        port: "",
        pathname: "/**",
      },
    ],
  },
};

export default nextConfig;
