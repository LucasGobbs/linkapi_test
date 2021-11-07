import { DailyDeals } from '@/domain/models/daily_deals'
import { IListDailyDeals } from '@/domain/usecases/list_daily_deals.interface'
import { IDailyDealsRepository } from '../protocols/daily_deals_repository.interface'

export class ListDailyDealsService implements IListDailyDeals {
  constructor (private readonly dailyDealsRepository: IDailyDealsRepository) {}
  async list (): Promise<DailyDeals[]> {
    return await this.dailyDealsRepository.list()
  }
}
