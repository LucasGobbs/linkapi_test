import { PipedriveClient } from '@/infra/clients/pipedrive.client'
import { ok } from '../helpers/http_helper'
import { Controller, HttpRequest, HttpResponse } from '../protocols'

export class TestController implements Controller {
  constructor (private readonly pipedrive: PipedriveClient) {}
  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    const data = await this.pipedrive.listDeals()
    // const data2 = await this.pipedrive.listWonDeaals()

    return ok(data)
  }
}
