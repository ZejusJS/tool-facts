// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import dbConnect from '../../../utils/connectMongo';
import Fact from '../../../utils/models/fact';

type Data = {
    success?: boolean
    fact?: object
    msg?: string
}

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<Data>
) {
    let { query: { query, lng } } = req

    lng = String(lng)
    query = String(query).replace(/\s+/g, ' ').trim()

    console.log(query)
    console.log(lng)

    if (!lng || !query || lng !== "en" && lng !== "cs") return res.status(400).json({ success: false })

    switch (req.method) {
        case 'GET':
            try {
                await dbConnect()

                const querySplit = query.split(' ').map(q => {
                    return '"' + q + '"'
                }).toString()

                const fact = await Fact.find({
                    $text: { $search: querySplit },
                    show: true
                }).select(["-_id", "id", lng])

                // res.setHeader('Cache-Control', "max-age=300, s-maxage=5000")

                return res.status(200).json({ fact, success: true })
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