import type { NextApiRequest, NextApiResponse } from 'next'
import dbConnect from '../../../utils/connectMongo';
import Fact from '../../../utils/models/fact';

type Data = {
    success?: boolean,
    facts?: object
}

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<Data>
) {
    switch (req.method) {
        case 'GET':
            if (req?.cookies?.fact_session === process.env.FACT_SECRET) {
                await dbConnect()

                const facts = await Fact.find({})
                res.status(200).json({ facts, success: true })
            } else {
                console.log(req?.cookies)
                res.status(403).json({ success: false })
            }
            break
        default:
            res.status(404).json({ success: false })
    }
}