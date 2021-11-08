import { IRemoveAllDailyDeals } from '@/domain/usecases/remove_all_daily_deals.interface'
import { IRemoveAllDeals } from '@/domain/usecases/remove_all_deal.interface'
import { ok } from '@/presentation/helpers'
import { Controller, HttpRequest, HttpResponse } from '@/presentation/protocols'

export class CleanController implements Controller {
  constructor (
    private readonly removeAllDeals: IRemoveAllDeals,
    private readonly removeAllDailyDeals: IRemoveAllDailyDeals) {}

  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      await this.removeAllDailyDeals.removeAll()
      await this.removeAllDeals.removeAll()
      return ok('Dados removidos com sucesso')
    } catch (error) {

    }
  }
}
