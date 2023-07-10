/** @type {import('next').NextConfig} */

const API_KEY = "b027be29d983f35a80fb316b6734e898";

// const nextConfig = {
//   reactStrictMode: true,
//   swcMinify: true,
// }

module.exports = {
  reactStrictMode: true,
  swcMinify: true,

  async redirects() {
    return [
      {
        source: "/old-blog/:path*",
        destination: "/new-sexy-blog/:path*",
        permanent: false,
      },
    ];
  },

  async rewrites() {
    return [
      {
        source: "/api/movies",
        destination: `https://api.themoviedb.org/3/movie/popular?api_key=${API_KEY}`,
      },
      {
        source: "/api/movies/:id",
        destination: `https://api.themoviedb.org/3/movie/:id?api_key=${API_KEY}`,
      },
    ];
  },
};
