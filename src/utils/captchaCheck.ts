import axios from "axios";

export default async function name(token: string) {
    return new Promise(async (resolve, reject) => {
        let response: any
        let error: any
        await axios.post(
            `https://www.google.com/recaptcha/api/siteverify?secret=${process.env.CATPCHA_SECRET}&response=${token}`
        )
            .then(res => {
                response = res.data
            })
            .catch(e => {
                error = e.response
            })

        if (response?.success) {
            resolve('ok')
        } else {
            reject('nope')
        }
    })
}