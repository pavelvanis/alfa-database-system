/** @type {import('next').NextConfig} */

module.exports = async (phase, { defaultConfig }) => {
  const nextConfig = { ...defaultConfig };
  // Connect to database
  require("./src/utils/mongo-connection")();
  return nextConfig;
};