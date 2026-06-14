// /** @type {import('next').NextConfig} */
// const nextConfig = {
//   reactStrictMode: true,
// }

// module.exports = nextConfig

module.exports = {
  distDir: process.env.NEXT_DIST_DIR || ".next",
  images: {
    domains: ["links.papareact.com","image.tmdb.org"],
  },
};
