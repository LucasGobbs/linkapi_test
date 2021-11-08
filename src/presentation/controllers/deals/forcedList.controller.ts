import { IListDailyDeals } from '@/domain/usecases/list_daily_deals.interface'

import { ISaveDailyDeals } from '@/domain/usecases/save_daily_deals.interface'
import { ok, serverError } from '@/presentation/helpers'
import { Controller, HttpRequest, HttpResponse } from '@/presentation/protocols'

export class ForcedListController implements Controller {
  constructor (
    private readonly saveDailyDeals: ISaveDailyDeals,

    private readonly listDailyDeals: IListDailyDeals
  ) { }

  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      await this.saveDailyDeals.save()

      const data = await this.listDailyDeals.list()

      return ok(data)
    } catch (e) {
      console.log(e)
      return serverError(e)
    }
  }
}
