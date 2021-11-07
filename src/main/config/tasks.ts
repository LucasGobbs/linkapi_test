import { SaveDailyDealsService } from '@/data/services/save_daily_deals.service'
import { BlingClient } from '@/infra/clients/bling/bling.client'
import { PipedriveClient } from '@/infra/clients/pipedrive.client'
import { DailyDealRepository } from '@/infra/db/daily_deals.repository'
import { DealRepository } from '@/infra/db/deal.repository'
import { CheckDealsTask } from '@/infra/tasks/check_deals'

export default (): void => {
  // Injeções
  const saveDailyDeals = new SaveDailyDealsService(
    new DailyDealRepository(),
    new DealRepository(),
    new BlingClient(),
    new PipedriveClient()
  )
  const checkDealsTask = new CheckDealsTask(
    saveDailyDeals
  )
  checkDealsTask.setup()
}
