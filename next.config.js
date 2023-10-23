const path = require("path");

/** @type {import('next').NextConfig} */
const options = {
  reactStrictMode: true,
  swcMinify: true,
  output: "standalone",
  experimental: {
    outputFileTracingRoot: path.join(__dirname, "."),
  },
  crossOrigin: "anonymous",
  compiler: {
    styledComponents: true,
  },
  transpilePackages: ["ui", "server"],
};

module.exports = options;
