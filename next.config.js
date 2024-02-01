/** @type {import('next').NextConfig} */

module.exports = async (phase, { defaultConfig }) => {
  const nextConfig = { ...defaultConfig };
  require("./src/utils/mongo-connection")();
  return nextConfig;
};

// const nextConfig = {};

// export default nextConfig;
