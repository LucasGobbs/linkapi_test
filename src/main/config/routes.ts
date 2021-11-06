import { PipedriveClient } from '@/infra/clients/pipedrive.client'
import { TestController } from '@/presentation/controllers/test.controller'
import { Express, Router } from 'express'
import { adaptRoute } from '../adapters/express_route_adapter'

export default (app: Express): void => {
  const router = Router()
  app.use('/api', router)
  router.get('/test', adaptRoute(new TestController(new PipedriveClient())))
}
