import { ok, serverError } from '../helpers/http_helper'
import { Controller, HttpRequest, HttpResponse } from '../protocols'

export class RootController implements Controller {
  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      return ok('Tudo funcionando corretamente')
    } catch (e) {
      return serverError(e)
    }
  }
}
