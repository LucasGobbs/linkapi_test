import { PipedriveClient } from '@/infra/clients/pipedrive.client'
import * as cron from 'node-cron'
export class CheckDealsTask {
  constructor (public readonly pipedrive: PipedriveClient) {}
  setup (): void {
    cron.schedule('*/10 * * * * *', () => {
      console.log('Updating Deals')
    })
  }
}
