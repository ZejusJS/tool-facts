// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import dbConnect from '../../../../utils/connectMongo';
import Fact from '../../../../utils/models/fact';
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
    return
    const { query: { lng, id } } = req
    let lang = String(lng)

    switch (req.method) {
        case 'GET':
            try {
                await dbConnect()

                const facts = await Fact.find({ [lang]: { $exists: true }, show: true }).select([`${lang}`, '-_id'])

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