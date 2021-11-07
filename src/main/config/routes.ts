import { ListDailyDealsService } from '@/data/services/list_daily_deals.service'
import { RemoveAllDailyDeals } from '@/data/services/remove_all_daily_deals.interface'
import { RemoveAllDealService } from '@/data/services/remove_all_deal.interface'
import { SaveDailyDealsService } from '@/data/services/save_daily_deals.service'
import { BlingClient } from '@/infra/clients/bling/bling.client'
import { PipedriveClient } from '@/infra/clients/pipedrive.client'
import { DailyDealRepository } from '@/infra/db/daily_deals.repository'
import { DealRepository } from '@/infra/db/deal.repository'
import { ForcedListController } from '@/presentation/controllers/deals/forcedList.controller'
import { ListController } from '@/presentation/controllers/deals/list.controller'
import { RefreshController } from '@/presentation/controllers/deals/refresh.controller'
import { TestController } from '@/presentation/controllers/test.controller'
import { Express, Router } from 'express'
import { adaptRoute } from '../adapters/express_route_adapter'

export default (app: Express): void => {
  const router = Router()

  // Injeções
  // Repositórios
  const dailyDealRepository = new DailyDealRepository()
  const dealRepository = new DealRepository()
  // Usecases
  const saveDailyDeals = new SaveDailyDealsService(
    dailyDealRepository,
    dealRepository,
    new BlingClient(),
    new PipedriveClient()
  )
  const removeAllDailyDeals = new RemoveAllDailyDeals(dailyDealRepository)
  const removeAllDeals = new RemoveAllDealService(dealRepository)
  const listDailyDeals = new ListDailyDealsService(dailyDealRepository)

  app.use('/api', router)
  router.get('/test', adaptRoute(new TestController(new DailyDealRepository())))

  // router.get('/deals/refresh', adaptRoute( new ))
  router.get('/deals/forcedlist', adaptRoute(
    new ForcedListController(
      saveDailyDeals,
      removeAllDailyDeals,
      removeAllDeals,
      listDailyDeals
    )))

  router.get('/deals/list', adaptRoute(new ListController(
    listDailyDeals
  )))

  router.get('/deals/refresh', adaptRoute(new RefreshController(
    saveDailyDeals
  )))
}
