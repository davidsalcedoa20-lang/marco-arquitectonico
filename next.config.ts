import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  async redirects() {
    // Keep old links useful while serving only the client-approved landing copy.
    return [
      { source: "/quienes-somos", destination: "/#servicios", permanent: false },
      { source: "/servicios", destination: "/#servicios", permanent: false },
      { source: "/servicios/mantenimiento", destination: "/#mantenimiento", permanent: false },
      { source: "/servicios/construccion", destination: "/#construccion", permanent: false },
      { source: "/servicios/servicios-profesionales", destination: "/#servicios-profesionales", permanent: false },
    ];
  },
  images: {
    formats: ["image/avif", "image/webp"],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2528],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    minimumCacheTTL: 60 * 60 * 24 * 30,
  },
  poweredByHeader: false,
  compress: true,
};

export default nextConfig;
