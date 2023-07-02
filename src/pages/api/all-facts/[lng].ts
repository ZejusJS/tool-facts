// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import dbConnect from '../../../utils/connectMongo';
import Fact from '../../../utils/models/fact';

type Data = {
  success: boolean,
  data: object
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const { query: { lng } } = req

  try {
    await dbConnect()

    const pets = await Fact.find({}) /* find all the data in our database */
    res.status(200).json({ success: true, data: pets })
  } catch (e) {
    console.error(e);
  }
}
