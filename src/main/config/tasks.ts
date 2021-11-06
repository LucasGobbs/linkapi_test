import { PipedriveClient } from '@/infra/clients/pipedrive.client'
import { CheckDealsTask } from '@/infra/tasks/check_deals'

export default (): void => {
  const checkDealsTask = new CheckDealsTask(new PipedriveClient())
  checkDealsTask.setup()
}
