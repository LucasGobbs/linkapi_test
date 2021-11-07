import { IRemoveAllDailyDeals } from '@/domain/usecases/remove_all_daily_deals.interface'
import { IDailyDealsRepository } from '../protocols/daily_deals_repository.interface'

export class RemoveAllDailyDeals implements IRemoveAllDailyDeals {
  constructor (private readonly dealRepository: IDailyDealsRepository) {}
  async removeAll (): Promise<void> {
    await this.dealRepository.removeAll()
  }
}
