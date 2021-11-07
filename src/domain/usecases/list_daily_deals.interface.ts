import { DailyDeals } from '../models/daily_deals'

export interface IListDailyDeals {
  list: () => Promise<DailyDeals[]>
}
