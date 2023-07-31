// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import dbConnect from '../../../utils/connectMongo';
import Fact from '../../../utils/models/fact';

type Data = {
    success?: boolean,
    facts?: object,
    code?: number,
    error?: string,
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
            console.log(req.body)
            let body = req.body

            await Fact.findOneAndUpdate({ _id }, {
                id: body.id,
                username: body.username,
                cs: body.cs,
                en: body.en,
                show: body.show
            }, { runValidators: true })

            res.status(200).json({ success: true })
        } catch (e: any) {
            console.error(e._message);
            let msg: any = { success: false }
            if (e?.code) msg.code = e.code;
            if (e?.errors?.kind) msg.error = e.errors.kind;
            res.status(500).json(msg)
        }
    } else {
        res.status(403).json({ success: false })
    }
}
