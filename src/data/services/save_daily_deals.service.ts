import { Deal } from '@/domain/models/deal.model'
import { ISaveDailyDeals } from '@/domain/usecases/save_daily_deals.interface'
import { IDailyDealsRepository } from '../protocols/daily_deals_repository.interface'
import { IDealReceiver } from '../protocols/deal_receiver.interface'
import { IDealRepository } from '../protocols/deal_repository.interface'
import { IDealSaver } from '../protocols/deal_saver.interface'

export class SaveDailyDealsService implements ISaveDailyDeals {
  constructor (
    private readonly dailyDealsRepository: IDailyDealsRepository,
    private readonly dealRepository: IDealRepository,
    private readonly saver: IDealSaver,
    private readonly receiver: IDealReceiver
  ) {}

  async save (): Promise<void> {
    const deals = await this.receiver.listWonDeals()
    const promises = deals.map(async (deal) => {
      return this.saveOne(deal)
    })
    await Promise.all(promises)
  }

  async saveOne (deal: Deal): Promise<void> {
    const exists = await this.dealRepository.exists(deal.pipedrive_id)
    if (!exists) {
      const result = await Promise.all([
        this.dealRepository.add(deal),
        this.dailyDealsRepository.add(deal),
        this.saver.save(deal)
      ])

      if (![200, 201].includes(result[2].status)) {
        console.log('Erro')
      }
    }
  }
}