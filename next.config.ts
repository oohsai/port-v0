import type { NextConfig } from "next";
import next from "next";

const nextConfig: NextConfig = {
  pageExtensions: ["js", "jsx", "ts", "tsx", "mdx"],
  turbopack: {},
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "images.pexels.com", pathname: "/**" },
    ],
  },
  /* config options here */
};

export default nextConfig;
