import { Deal } from '@/domain/models/deal.model'
import { ISaveDailyDeals } from '@/domain/usecases/save_daily_deals.interface'
import { delay } from '@/utils/delay'
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
    const promises = []

    for (const deal of deals) {
      const exists = await this.dealRepository.exists(deal.pipedrive_id)
      if (!exists) {
        const response = await this.saver.save(deal)
        if (![200, 201].includes(response.status)) {
          throw (new Error('Bling Error'))
        }
        promises.push(this.saveOne(deal))

        // Bling limita a 3 requisições por segundo
        await delay(333)
      }
    }

    await Promise.all(promises)
  }

  async saveOne (deal: Deal): Promise<void> {
    await Promise.all([
      this.dealRepository.add(deal),
      this.dailyDealsRepository.add(deal)
    ])
  }
}
