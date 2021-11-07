import { DailyDeals } from '@/domain/models/daily_deals'
import { Deal } from '@/domain/models/deal.model'

export interface IDailyDealsRepository{
  add: (deal: Deal) => Promise<void>
  list: () => Promise<DailyDeals[]>
  existsByDate: (date: string) => Promise<boolean>
  removeAll: () => Promise<void>
}
