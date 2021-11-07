import { Deal } from '@/domain/models/deal.model'

export interface IDealSaver{
  save: (deal: Deal) => Promise<any>
}
