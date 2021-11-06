import { ok } from '../helpers/http_helper'
import { Controller, HttpRequest, HttpResponse } from '../protocols'

export class TestController implements Controller {
  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    return ok({ message: 'testando api' })
  }
}
