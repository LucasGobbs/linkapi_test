import { IDealSaver } from '@/data/protocols/deal_saver.interface'
import { Deal } from '@/domain/models/deal.model'
import env from '@/main/config/env'
import axios from 'axios'
import { xmlPedido } from './bling.xml'

export class BlingClient implements IDealSaver {
  private readonly base_url = 'https://bling.com.br/Api/v2/'
  async save (deal: Deal): Promise<any> {
    const toXml = xmlPedido(deal.title, deal.pipedrive_id.toString(), deal.value.toString()).replace('\n','')
    const fullUrl = this.base_url + `pedido/json?apikey=${env.bling_token}&xml=${toXml}`
    const response = await axios.post(fullUrl)
    return response
  }
}
