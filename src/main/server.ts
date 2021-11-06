import 'module-alias/register'
import dotenv from 'dotenv'

import env from './config/env'
import app from './config/app'
import { Mongo } from '@/infra/db/mongo'
dotenv.config()

Mongo.connect(env.mongo_url)
  .then(async () => {
    app.listen(env.port, () => console.log(`Server running at http://localhost:${env.port}`))
  })
  .catch(console.error)
