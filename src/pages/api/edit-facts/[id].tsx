// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
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
    const { query: { id } } = req
    let _id = String(id)

    if (req?.cookies?.fact_session === process.env.FACT_SECRET) {
        try {
            await dbConnect()

            const fact = await Fact.findByIdAndUpdate(_id, { ...req.body })
            res.status(200).json({ success: true })
        } catch (e) {
            console.error(e);
            res.status(500).json({ success: false })
        }
    } else {
        res.status(403).json({ success: false })
    }
}
