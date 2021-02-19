require('dotenv').config()
// const process = require('process')
const {
  SHOPIFY_API_KEY,
  SHOPIFY_API_SECRET_KEY,
  HOST,
  API_HOST,
  PORT,
} = process.env
module.exports = {
  SHOPIFY_API_KEY,
  SHOPIFY_API_SECRET_KEY,
  HOST,
  API_HOST,
  PORT
}