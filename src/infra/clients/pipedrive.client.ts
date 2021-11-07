import { IDealReceiver } from '@/data/protocols/deal_receiver.interface'
import { Deal } from '@/domain/models/deal.model'
import env from '@/main/config/env'

import * as pipedrive from 'pipedrive'
const defaultClient = pipedrive.ApiClient.instance
const apiToken = defaultClient.authentications.api_key
apiToken.apiKey = env.pipedrive_token

export class PipedriveClient implements IDealReceiver {
  async listDeals (): Promise<Deal[]> {
    const api = new pipedrive.DealsApi()
    const response = await api.getDeals()
    if (response) {
      const data = response.data
      return data.map((e) => {
        return {
          pipedrive_id: e.id,
          title: e.title,
          status: e.status,
          currency: e.currency,
          value: e.value,
          won_time: e.won_time != null ? new Date(e.won_time) : null
        }
      })
    } else {
      return []
    }
  }

  async listWonDeals (): Promise<Deal[]> {
    const api = new pipedrive.DealsApi()
    const response = await api.getDeals({ status: 'won' })
    if (response) {
      const data = response.data
      return data.map((e) => {
        return this.mapResult(e)
      })
    } else {
      return []
    }
  }

  mapResult (data: any): Deal {
    return {
      pipedrive_id: data.id,
      title: data.title,
      status: data.status,
      currency: data.currency,
      value: data.value,
      won_time: data.won_time != null ? new Date(data.won_time) : null
    }
  }
}
