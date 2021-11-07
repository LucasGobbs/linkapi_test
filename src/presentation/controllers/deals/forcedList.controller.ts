import { IListDailyDeals } from '@/domain/usecases/list_daily_deals.interface'
import { IRemoveAllDailyDeals } from '@/domain/usecases/remove_all_daily_deals.interface'
import { IRemoveAllDeals } from '@/domain/usecases/remove_all_deal.interface'
import { ISaveDailyDeals } from '@/domain/usecases/save_daily_deals.interface'
import { ok, serverError } from '@/presentation/helpers'
import { Controller, HttpRequest, HttpResponse } from '@/presentation/protocols'

export class ForcedListController implements Controller {
  constructor (
    private readonly saveDailyDeals: ISaveDailyDeals,
    private readonly removeAllDailyDeals: IRemoveAllDailyDeals,
    private readonly removeAllDeals: IRemoveAllDeals,
    private readonly listDailyDeals: IListDailyDeals
  ) { }

  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      await this.removeAllDailyDeals.removeAll()
      await this.removeAllDeals.removeAll()

      await this.saveDailyDeals.save()

      const data = await this.listDailyDeals.list()
      return ok(data)
    } catch (e) {
      return serverError(e)
    }
  }
}
