/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'apod.nasa.gov',
        port: '',
        // pathname: '/images/**',
      },
    ],
  },
};

export default nextConfig;
