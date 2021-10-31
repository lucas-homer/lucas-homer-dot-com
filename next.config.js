/** @type {import('next').NextConfig} */

module.exports = {
  async headers() {
    return [
      {
        source: "/fonts/JosefinSans-VariableFont_wght.woff2",
        headers: [
          {
            key: "Cache-control",
            value: "public, immutable, max-age=31536000"
          }
        ]
      },
      // {
      //   source: "/fonts/JosefinSans-Italic-VariableFont_wght.woff2",
      //   headers: [
      //     {
      //       key: "Cache-control",
      //       value: "public, immutable, max-age=31536000"
      //     }
      //   ]
      // },
      {
        source: "/fonts/PlayfairDisplay-VariableFont_wght.woff2",
        headers: [
          {
            key: "Cache-control",
            value: "public, immutable, max-age=31536000"
          }
        ]
      }
      // {
      //   source: "/fonts/PlayfairDisplay-Italic-VariableFont_wght.woff2",
      //   headers: [
      //     {
      //       key: "Cache-control",
      //       value: "public, immutable, max-age=31536000"
      //     }
      //   ]
      // }
    ];
  },
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
};
