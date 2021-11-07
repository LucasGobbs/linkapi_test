export type Deal = {
  pipedrive_id: number
  title: string

  // name: string //person_name
  // org: string //org_name
  currency: string
  value: number

  status: string
  won_time?: Date
}
