import setupMiddlewares from './middlewares'
import setupRoutes from './routes'
import setupTasks from './tasks'
import express from 'express'

const app = express()

setupMiddlewares(app)
setupRoutes(app)
setupTasks()
export default app
