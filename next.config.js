/** @type {import('next').NextConfig} */

module.exports = withMDX({
  pageExtensions: ["ts", "tsx", "js", "jsx", "md", "mdx"],
  reactStrictMode: true,
  experimental: {
    concurrentFeatures: true,
    serverComponents: true,
    urlImports: ["https://cdn.skypack.dev"]
  },
  images: {
    formats: ["image/avif", "image/webp"]
  }
});
