/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  images: {
    domains: [
      "localhost",
      "avatars.githubusercontent.com",
      "lh3.googleusercontent.com",
      "res.cloudinary.com",
      "cdn-icons-png.flaticon.com",
    ],
  },
  compiler: {
    styledComponents: true,
  },

  env: {
    BACK_END_URI: process.env.BACK_END_URI,
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
