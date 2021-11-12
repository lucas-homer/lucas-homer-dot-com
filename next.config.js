const { withContentlayer } = require('next-contentlayer');
/** @type {import('next').NextConfig} */

module.exports = withContentlayer()({
  pageExtensions: ['ts', 'tsx', 'js', 'jsx', 'md', 'mdx'],
  // swcMinify: true,
  images: {
    domains: [
      'i.scdn.co', // Spotify Album Art
      'pbs.twimg.com' // Twitter Profile Picture
    ],
    formats: ['image/avif', 'image/webp']
  }
});
