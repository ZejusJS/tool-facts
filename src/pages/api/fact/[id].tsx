// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import dbConnect from '../../../utils/connectMongo';
import Fact from '../../../utils/models/fact';
import cacheData from "memory-cache";
import findFactId from '@/utils/findFact-id';

type Data = {
    success?: boolean
    fact?: object
    factsEN?: number
    factsCS?: number
}

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<Data>
) {
    return 
    const { query: { id } } = req

    switch (req.method) {
        case 'GET':
            try {
                await dbConnect()

                const fact = await findFactId(String(id));

                if (!fact) {
                    res.status(404).json({ success: false })
                }

                res.setHeader('Cache-Control', "max-age=400000, s-maxage=700000")

                res.status(200).json({ fact, success: true })
            } catch (e) {
                console.error(e);
                res.status(500).json({ success: false })
            }
            break
        default:
            res.status(404).json({ success: false })
    }
}