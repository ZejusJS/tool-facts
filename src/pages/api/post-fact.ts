import type { NextApiRequest, NextApiResponse } from 'next'
import dbConnect from '../../utils/connectMongo';
import Fact from '../../utils/models/fact';
import captchaCheck from '@/utils/captchaCheck';

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
            if (req?.cookies?.fact_session === process.env.FACT_SECRET) {
                if (process.env.NODE_ENV !== 'development') await captchaCheck(req.body.captcha)
                let body = req.body
                await dbConnect()

                if (!body.username?.length) return res.status(400).json({ msg: 'missing username' })
                if (!body.cs?.length && !body.en?.length) return res.status(400).json({ msg: 'missing fact' })
                if (body.cs?.length > maxFactLength
                    || body.en?.length > maxFactLength) return res.status(400).json({ msg: `fact has more than ${maxFactLength} characters` })

                const fact = new Fact({ username: body.username })
                if (body?.cs?.length) fact.cs = body.cs.trim()
                if (body?.en?.length) fact.en = body.en.trim()

                await fact.save()

                res.json({ success: true })
            } else {
                if (Math.random() > 0.7) await captchaCheck(req.body.captcha)
                res.status(403).json({ success: false })
            }
            break
        default:
            res.status(400).json({ success: false })
            break
    }
}