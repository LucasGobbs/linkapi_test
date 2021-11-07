import { Deal } from '@/domain/models/deal.model'

export interface IDealRepository {
  exists: (id: number) => Promise<boolean>
  add: (deal: Deal) => Promise<void>
  removeAll: () => Promise<void>
}
