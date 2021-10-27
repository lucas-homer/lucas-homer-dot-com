/** @type {import('next').NextConfig} */

const withMDX = require("@next/mdx")({
  options: {
    remarkPlugins: [],
    rehypePlugins: []
  },
  extension: /\.mdx$/
});

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
