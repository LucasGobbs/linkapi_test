import env from '@/main/config/env'

export class BlingClient {
  private readonly base_url = 'https://bling.com.br/Api/v2'
  async create (): Promise<any> {
    const toXml = 'a'
    const plusUrl = `pedido/json?apikey=${env.bling_token}&xml=${toXml}`
    console.log(plusUrl)
  }
}
