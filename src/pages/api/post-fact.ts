import type { NextApiRequest, NextApiResponse } from 'next'
import dbConnect from '../../utils/connectMongo';
import Fact from '../../utils/models/fact';

const maxFactLength = process.env.MAX_FACT_LENGTH

type Data = {
    success?: boolean
    msg?: String
    fact?: object
}

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<Data>
) {
    const { method } = req

    switch (method) {
        case 'POST':
            await dbConnect()
            let body = req.body

            if (!body.username?.length) return res.status(400).json({ msg: 'missing username' })
            if (!body.cs?.length && !body.en?.length) return res.status(400).json({ msg: 'missing fact' })
            if (body.cs?.length > maxFactLength
                || body.en?.length > maxFactLength) return res.status(400).json({ msg: `fact has more than ${maxFactLength} characters` })

            const fact = new Fact({ username: body.username })
            if (body.cs?.length) fact.cs = body.cs
            if (body.en?.length) fact.en = body.en

            await fact.save()

            res.json({ success: true })
            break
        default:
            res.status(400).json({ success: false })
            break
    }
}