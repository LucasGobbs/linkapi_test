import { ISaveDailyDeals } from '@/domain/usecases/save_daily_deals.interface'
import { ok, serverError } from '@/presentation/helpers'
import { Controller, HttpRequest, HttpResponse } from '@/presentation/protocols'

export class RefreshController implements Controller {
  constructor (
    private readonly saveDailyDeals: ISaveDailyDeals
  ) { }

  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      await this.saveDailyDeals.save()
      return ok({})
    } catch (e) {
      return serverError(e)
    }
  }
}
