const path = require('path');

/** @type {import('next').NextConfig} */

const nextConfig = {
  webpack: (config) => {
    config.resolve.alias["public"] = path.join(__dirname, "public");
    return config;
  }
};

module.exports = nextConfig;
