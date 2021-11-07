import { Deal } from '@/domain/models/deal.model'

export interface addDeal {
  add: (deal: Deal) => Promise<void>
}
export interface listDeal {
  list: () => Promise<Deal[]>
}

export interface update {
  update: (deal: Deal) => Promise<void>
}
