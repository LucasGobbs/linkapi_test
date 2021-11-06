import { Deal } from '@/domain/models/deal.model'
import env from '@/main/config/env'

import * as pipedrive from 'pipedrive'
const defaultClient = pipedrive.ApiClient.instance
const apiToken = defaultClient.authentications.api_key
apiToken.apiKey = env.pipedrive_token

export class PipedriveClient {
  async listDeals (): Promise<Deal[]> {
    const api = new pipedrive.DealsApi()
    const response = await api.getDeals()
    if (response) {
      const data = response.data
      return data.map((e) => {
        return {
          id: e.id,
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

  async listWonDeaals (): Promise<Deal[]> {
    return (await this.listDeals()).filter((e) => {
      return e.status === 'won'
    })
  }
}
