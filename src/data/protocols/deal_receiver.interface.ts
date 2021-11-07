import { Deal } from '@/domain/models/deal.model'

export interface IDealReceiver {
  listWonDeals: () => Promise<Deal[]>
}
