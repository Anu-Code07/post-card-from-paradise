import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
      remotePatterns: [
        {
          protocol: "https",
          hostname: "i.postimg.cc",
        },
        {
          protocol: "https",
          hostname: "iili.io",
        },
        {
          protocol: "https",
          hostname: "images.unsplash.com",
        },
        {
          protocol: "https",
          hostname: "www.figma.com",
          pathname: "/api/mcp/asset/**",
        },
        {
          protocol: "https",
          hostname: "oyjxpiradbbuocxsunmu.supabase.co",
          pathname: "/storage/v1/object/public/**",
        },
      ],
  },
};

export default nextConfig;
