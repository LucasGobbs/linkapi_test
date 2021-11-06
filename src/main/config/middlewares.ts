
import express from 'express'
import { bodyParser } from '@/main/middlewares/body_parser'

export default (app: express.Express): void => {
  app.use(bodyParser)
//   app.use(contentType)
//   app.use(cors)
}
