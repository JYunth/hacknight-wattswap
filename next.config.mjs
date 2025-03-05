import withPWAInit from "@ducanh2912/next-pwa";

const withPWA = withPWAInit({
  disable: false,
});

const nextConfig = {
  output: "export", // Outputs a Single-Page Application (SPA).
  distDir: "./dist", // Custom build output directory.
  basePath: process.env.NEXT_PUBLIC_BASE_PATH, // Sets the base path dynamically.
  eslint: { ignoreDuringBuilds: true }, // Ignore ESLint errors during builds.
  images: { unoptimized: true }, // Disable Next.js image optimization.
};

export default withPWA(nextConfig);
