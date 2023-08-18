// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import dbConnect from '../../../../../utils/connectMongo';
import Fact from '../../../../../utils/models/fact';

type Data = {
    success?: boolean
    facts?: object
    factsEN?: number
    factsCS?: number
    msg?: string
}

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<Data>
) {
    const { query: { count, length } } = req

    if (Number(count) > 10 || Number(count) < 1) {
        return res.status(400).json({ success: false, msg: "Max number of facts is 10" })
    }

    switch (req.method) {
        case 'GET':
            try {
                await dbConnect()

                const facts = await Fact.aggregate([
                    {
                        "$project": {
                            "cs": 1,
                            "en": 1,
                            "_id": 0
                        },
                    },
                    {
                        "$match": {
                            "$expr": {
                                "$lt": [{ "$strLenCP": "$en" }, Number(length)]
                            }
                        }
                    }, {
                        $sample: { size: Number(count) },
                    },]);

                if (!facts?.length) {
                    return res.status(404).json({ success: false })
                }

                res.setHeader('Cache-Control', "s-max-age=10000")

                return res.status(200).json({ facts, success: true })
            } catch (e) {
                console.error(e);
                return res.status(500).json({ success: false })
            }
            break
        default:
            res.status(404).json({ success: false })
            break
    }
}