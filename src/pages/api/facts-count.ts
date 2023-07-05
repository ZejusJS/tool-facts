// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import dbConnect from '../../utils/connectMongo';
import Fact from '../../utils/models/fact';

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
    const { query: { count } } = req
    console.log(count)

    switch (req.method) {
        case 'GET':
            try {
                await dbConnect()

                res.setHeader('Cache-Control', "max-age=10000, stale-while-revalidate=100000")

                const factsCS = await Fact.count({ cs: { $exists: true } })
                const factsEN = await Fact.count({ en: { $exists: true } })

                res.status(200).json({ factsCS, factsEN })
            } catch (e) {
                console.error(e);
                res.status(500).json({ success: false })
            }
            break
        default:
            res.status(404).json({ success: false })
    }
}