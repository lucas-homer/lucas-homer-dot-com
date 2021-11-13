const { withContentlayer } = require('next-contentlayer');
// /** @type {import('next').NextConfig} */

module.exports = withContentlayer()({
  reactStrictMode: true,
  images: {
    domains: [
      'i.scdn.co', // Spotify Album Art
      'pbs.twimg.com' // Twitter Profile Picture
    ]
  }
});
