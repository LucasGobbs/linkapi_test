import { ISaveDailyDeals } from '@/domain/usecases/save_daily_deals.interface'
import * as cron from 'node-cron'
export class CheckDealsTask {
  constructor (
    private readonly dailyDealsSaver: ISaveDailyDeals) { }

  setup (): void {
    // A cada 10 segundos
    cron.schedule('*/5 * * * *', async () => {
      console.log('Running Task: Updating Daily Deals List ')
      // const data = await this.receiver.listWonDeals()
      await this.dailyDealsSaver.save()
      console.log('End of task')
      console.log('===========')
    })
  }
}
