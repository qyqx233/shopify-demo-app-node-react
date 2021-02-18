require("dotenv").config();
const process = require('process');
const withCSS = require('@zeit/next-css');
const webpack = require('webpack');
const { copyFileSync } = require("fs");

const apiKey = JSON.stringify(process.env.SHOPIFY_API_KEY);


const config = withCSS({
  webpack: (config, { isServer }) => {
    if (!isServer) {
      config.node = {
        fs: 'empty'
      }
    }
    const env = {
      API_KEY: apiKey,
      API_HOST: JSON.stringify(process.env.API_HOST),
    };
    config.plugins.push(new webpack.DefinePlugin(env));
    return config;
  },
});

Object.assign(config, {
  env: {
    HOST: process.env.HOST,
    API_HOST: process.env.API_HOST,
    API_KEY: apiKey,
    API_SECRET_KEY: process.env.SHOPIFY_API_SECRET_KEY,
    HOST_GO_API: process.env.HOST_GO_API,
  }
})

module.exports = config;