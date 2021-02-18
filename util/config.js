require('dotenv').config()
// const process = require('process')
const {
  SHOPIFY_API_KEY,
  SHOPIFY_API_SECRET_KEY,
  HOST,
  API_HOST,
  PORT,
} = process.env
// const config = {
//   'SHOPIFY_API_KEY': '402c2222fa3053525d466c15c616edad',
//   'SHOPIFY_API_SECRET_KEY': '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',
//   'HOST': 'https://5067504481ce.ngrok.io',
//   'API_HOST': 'http://127.0.0.1:3000',
//   'PORT': '3000',
// } 
module.exports = {
  SHOPIFY_API_KEY,
  SHOPIFY_API_SECRET_KEY,
  HOST,
  API_HOST,
  PORT
}