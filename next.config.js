const { withContentlayer } = require("next-contentlayer");
/** @type {import('next').NextConfig} */

module.exports = withContentlayer()({
  // async headers() {
  //   return [
  // {
  //   source: "/fonts/JosefinSans-VariableFont_wght.woff2",
  //   headers: [
  //     {
  //       key: "Cache-control",
  //       value: "public, immutable, max-age=31536000"
  //     }
  //   ]
  // },
  // {
  //   source: "/fonts/JosefinSans-Italic-VariableFont_wght.woff2",
  //   headers: [
  //     {
  //       key: "Cache-control",
  //       value: "public, immutable, max-age=31536000"
  //     }
  //   ]
  // },
  // {
  //   source: "/fonts/PlayfairDisplay-VariableFont_wght.woff2",
  //   headers: [
  //     {
  //       key: "Cache-control",
  //       value: "public, immutable, max-age=31536000"
  //     }
  //   ]
  // }
  // {
  //   source: "/fonts/PlayfairDisplay-Italic-VariableFont_wght.woff2",
  //   headers: [
  //     {
  //       key: "Cache-control",
  //       value: "public, immutable, max-age=31536000"
  //     }
  //   ]
  // }
  //   ];
  // },
  pageExtensions: ["ts", "tsx", "js", "jsx", "md", "mdx"],
  swcMinify: true,
  reactStrictMode: true,
  images: {
    domains: [
      "i.scdn.co", // Spotify Album Art
      "pbs.twimg.com" // Twitter Profile Picture
    ],
    formats: ["image/avif", "image/webp"]
  },
  webpack: (config, { dev, isServer }) => {
    // Replace React with Preact only in client production build
    if (!dev && !isServer) {
      Object.assign(config.resolve.alias, {
        react: "preact/compat",
        "react-dom/test-utils": "preact/test-utils",
        "react-dom": "preact/compat"
      });
    }

    return config;
  }
});
