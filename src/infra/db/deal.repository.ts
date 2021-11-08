import { IDealRepository } from '@/data/protocols/deal_repository.interface'
import { Deal } from '@/domain/models/deal.model'
import { Mongo } from './mongo'

export class DealRepository implements IDealRepository {
  async add (deal: Deal): Promise<void> {
    const collection = await Mongo.getCollection('Deals')
    await collection.insertOne(deal)
  }

  async exists (id: number): Promise<boolean> {
    const collection = await Mongo.getCollection('Deals')
    const count = await collection.find({ pipedrive_id: id }, {}).count()
    return count > 0
  }

  async list (): Promise<Deal[]> {
    const collection = await Mongo.getCollection('Deals')
    const data = await collection.find().toArray()
    return data as Deal[]
  }

  async update (deal: Deal): Promise<void> {
    const collection = await Mongo.getCollection('Deals')
    await collection.find({ pipedrive_id: deal.pipedrive_id }, {})
      .toArray(async (err, res) => {
        if (err) throw err
        if (res.length > 0) {
          await collection.updateOne({ pipedrive_id: deal.pipedrive_id }, { $set: deal })
        }
      })
  }

  async removeAll (): Promise<void> {
    const collection = await Mongo.getCollection('Deals')
    await collection.deleteMany({})
  }
}
