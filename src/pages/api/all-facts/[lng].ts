// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import dbConnect from '../../../utils/connectMongo';
import Fact from '../../../utils/models/fact';
import cacheData from "memory-cache";

type Data = {
  success?: boolean
  facts?: object
  factsEN?: number
  factsCS?: number
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const { query: { lng } } = req
  let lang = String(lng)

  switch (req.method) {
    case 'GET':
      try {
        await dbConnect()

        const facts = await Fact.find({
          [lang]: { $exists: true },
          show: true,
          $expr: { $gt: [{ $strLenCP: `$${lang}` }, 0] }
        }).select([`${lang}`, 'id', '-_id'])

        res.setHeader('Cache-Control', "max-age=170000, stale-while-revalidate=500000")
        res.status(200).json({ facts })

      } catch (e) {
        console.error(e);
        res.status(500).json({ success: false })
      }
      break
    default:
      res.status(404).json({ success: false })
  }
}