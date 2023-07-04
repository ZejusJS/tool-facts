import type { NextApiRequest, NextApiResponse } from 'next'
import dbConnect from '../../../utils/connectMongo';
import Fact from '../../../utils/models/fact';
import captchaCheck from '../../../utils/captchaCheck'
// import { getCookie, setCookie } from 'cookies-next'
import cookie from 'cookie'

type Data = {
    success?: boolean,
    facts?: object
}

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<Data>
) {
    const { method } = req

    switch (method) {
        case 'POST':
            try {
                const key = req?.cookies?.fact_session
                let keyEqual = key === process.env.FACT_SECRET

                let body = req.body

                if (body?.captcha && body?.username && body?.psw &&
                    body.psw === process.env.FACT_PASSWORD
                    && body.username === process.env.FACT_USERNAME || keyEqual) {

                    if (!keyEqual) await captchaCheck(body.captcha)
                    await dbConnect()

                    const bisquet = cookie.serialize('fact_session', String(process.env.FACT_SECRET), { httpOnly: true, maxAge: 48 * 60 * 60, sameSite: 'strict', path: '/' })
                    res.setHeader("Set-Cookie", bisquet)

                    const facts = await Fact.find({ show: false })
                    res.status(200).json({ facts })

                } else {
                    const rnm = Math.random()
                    if (rnm > 0.8) await captchaCheck(body.captcha)
                    res.status(403).json({ success: false })
                }
            } catch (e) {
                return res.status(403).json({ success: false })
            }
            break
        default:
            res.status(404).json({ success: false })
            break
    }
}