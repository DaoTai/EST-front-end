/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  images: {
    domains: [
      "localhost",
      "avatars.githubusercontent.com",
      "lh3.googleusercontent.com",
      "res.cloudinary.com",
    ],
  },
  compiler: {
    styledComponents: true,
  },

  env: {
    SERVER_URL: process.env.SERVER_URL,
  },

  //To speed up development time and NextJS compilation time when using MUI, we have to use the modularizeImports
  modularizeImports: {
    "@mui/material": {
      transform: "@mui/material/{{member}}",
    },
    "@mui/icons-material": {
      transform: "@mui/icons-material/{{member}}",
    },
    "@mui/styles": {
      transform: "@mui/styles/{{member}}",
    },
  },

  webpack: (config, { buildId, dev, isServer, defaultLoaders, webpack }) => {
    config.externals.push({
      "utf-8-validate": "commonjs utf-8-validate",
      bufferutil: "commonjs bufferutil",
      "supports-color": "commonjs supports-color",
    });
    return config;
  },
};

module.exports = nextConfig;
