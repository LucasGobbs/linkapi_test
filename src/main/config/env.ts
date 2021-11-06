import dotenv from 'dotenv'
dotenv.config()

export default {
  port: process.env.PORT || 3010,
  mongo_url: process.env.MONGO_URL,
  pipedrive_token: process.env.PIPEDRIVE_TOKEN,
  bling_token: process.env.BLING_TOKEN
}
