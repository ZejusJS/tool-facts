import dbConnect from "./connectMongo"
import Fact from "./models/fact"

async function findFactId(id: string): Promise<object | undefined> {
    return new Promise(async (resolve, reject) => {
        await dbConnect()
        const fact = await Fact.findOne({
            show: true,
            id,
        }).select([`cs`, 'en', 'id', '-_id'])

        if (fact) {
            resolve(fact)
        } else {
            resolve(undefined)
        }
    })
}

export default findFactId