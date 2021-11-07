import { IListDailyDeals } from '@/domain/usecases/list_daily_deals.interface'
import { ok, serverError } from '@/presentation/helpers'
import { Controller, HttpRequest, HttpResponse } from '@/presentation/protocols'
export class ListController implements Controller {
  constructor (
    private readonly listDailyDeals: IListDailyDeals) { }

  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const data = await this.listDailyDeals.list()
      return ok(data)
    } catch (e) {
      return serverError(e)
    }
  }
}
