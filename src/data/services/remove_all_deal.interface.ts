import { IRemoveAllDeals } from '@/domain/usecases/remove_all_deal.interface'
import { IDealRepository } from '../protocols/deal_repository.interface'

export class RemoveAllDealService implements IRemoveAllDeals {
  constructor (private readonly dealRepository: IDealRepository) {}
  async removeAll (): Promise<void> {
    await this.dealRepository.removeAll()
  }
}
