
import { IDailyDealsRepository } from '@/data/protocols/daily_deals_repository.interface'
import { DailyDeals } from '@/domain/models/daily_deals'
import { Deal } from '@/domain/models/deal.model'
import { toISODate } from '@/utils/date_extensions'
import { Mongo } from './mongo'

export class DailyDealRepository implements IDailyDealsRepository {
  async add (deal: Deal): Promise<void> {
    if (!deal.won_time) { throw Error('Deal without won_time') }
    const collection = await Mongo.getCollection('DailyDeals')
    const dateStr = toISODate(deal.won_time)
    await collection.findOneAndUpdate(
      { date: dateStr },
      {
        $inc: { value: deal.value, count: 1 },
        $setOnInsert: { date: dateStr }
      },
      { upsert: true }
    )
  }

  async list (): Promise<DailyDeals[]> {
    const collection = await Mongo.getCollection('DailyDeals')
    const data = await collection.find().toArray()
    return data as DailyDeals[]
  }

  async existsByDate (date: string): Promise<boolean> {
    const collection = await Mongo.getCollection('DailyDeals')
    const count = await collection.find({ date: date }, {}).count()
    return count > 0
  }

  async removeAll (): Promise<void> {
    const collection = await Mongo.getCollection('DailyDeals')
    await collection.deleteMany({})
  }
}
