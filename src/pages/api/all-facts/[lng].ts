// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import dbConnect from '../../../utils/connectMongo';
import Fact from '../../../utils/models/fact';

type Data = {
  success?: boolean,
  facts: object
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const { query: { lng } } = req
  let lang = String(lng)

  try {
    await dbConnect()

    const facts = await Fact.find({ [lang]: { $exists: true }, show: true }).select([`${lang}`, '-_id'])
    res.status(200).json({ facts })
  } catch (e) {
    console.error(e);
  }
}
