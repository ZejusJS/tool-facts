import type { NextApiRequest, NextApiResponse } from 'next'
import dbConnect from '../../../utils/connectMongo';
import Fact from '../../../utils/models/fact';

type Data = {
    success?: boolean
}

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<Data>
) {
    const method = req.method
    switch (method) {
        case 'POST':
            try {
                const key = req?.cookies?.fact_session
                if (key === process.env.FACT_SECRET) {
                    const _id: string = req.body?._id
                    const approve: boolean = req.body?.approve
                    await dbConnect()

                    if (approve)
                        await Fact.findByIdAndUpdate(_id, { show: true })
                    else
                        await Fact.findByIdAndDelete(_id)

                    res.status(200).json({ success: true })
                } else {
                    res.status(403).json({ success: false })
                }
            } catch (error) {
                console.error(error)
                res.status(500).json({ success: false })
            }
            break
        default:
            res.status(404).json({ success: false })
            break
    }

}