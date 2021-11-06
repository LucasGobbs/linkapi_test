
import { HttpResponse } from '@/presentation/protocols'

export const ok = (data: any): HttpResponse => (
  {
    statusCode: 200,
    body: {
      code: 200,
      data
    }
  }
)

export const created = (data: any): HttpResponse => (
  {
    statusCode: 201,
    body: {
      code: 201,
      data
    }
  }
)

export const badRequest = (error: Error): HttpResponse => (
  {
    statusCode: 400,
    body: {
      code: 400,
      type: error.name,
      detail: error.message
    }
  }
)

export const notFound = (): HttpResponse => (
  {
    statusCode: 404,
    body: {
      code: 404,
      detail: 'Not found'
    }
  }
)

export const forbidden = (error: Error): HttpResponse => (
  {
    statusCode: 403,
    body: {
      code: 403,
      error: error.name,
      detail: error.message
    }
  }
)

export const conflict = (error: Error): HttpResponse => (
  {
    statusCode: 409,
    body: {
      code: 409,
      type: error.name,
      detail: error.message
    }
  }
)

export const serverError = (error: Error): HttpResponse => (
  {
    statusCode: 500,
    body: {
      code: 500,
      error: 'InternalServerError',
      detail: error.message
    }
  }
)
