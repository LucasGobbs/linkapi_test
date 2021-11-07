import { PipedriveClient } from '@/infra/clients/pipedrive.client'
import { DailyDealRepository } from '@/infra/db/daily_deals.repository'
import { ok, serverError } from '../helpers/http_helper'
import { Controller, HttpRequest, HttpResponse } from '../protocols'

export class TestController implements Controller {
  constructor (private readonly dailyDealsRepository: DailyDealRepository) {}
  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      // const data = await this.dailyDealsRepository.list()
      const a = new PipedriveClient()

      const data = await a.listWonDeals()
      console.log(data[5])
      const won = data[5].won_time
      console.log(won)
      const d = new Date(won)
      const here = new Date(d)
      console.log(here)
      here.setHours(here.getHours() - 3)
      const str = here.toLocaleString()

      const ddt = str
        .split(' ')[0]
        .split('/')
        .reverse()
        .join('-')
      console.log(ddt)
      // console.log(new Date(here.toLocaleString()).)

      // console.log(d.toLocaleString('pt-BR', { timeZone: 'America/Sao_Paulo' }))
      // console.log(convertTZ(new Date(won), 'America/Sao_Paulo'))

      return ok({})
    } catch (e) {
      return serverError(e)
    }
  }
}
