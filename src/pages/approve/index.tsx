import axios from "axios"
import { FormEvent, useRef, useState } from "react"
import Reaptcha from "reaptcha"

const index = () => {
    const [psw, setPsw] = useState('')
    const [username, setUsername] = useState('')
    const [facts, setFacts] = useState<any>([])
    const [captcha, setCaptcha] = useState('')

    function submit(e: FormEvent<HTMLFormElement>) {
        e.preventDefault()

        axios({
            method: 'post',
            url: '/api/approve-facts-login',
            headers: {
                "Content-Type": "application/json",
            },
            data: { psw, username, captcha },
            withCredentials: true
        })
            .then(data => {
                console.log(data)
                setFacts(data.data.facts)
                if (!data.data.facts.length){
                    alert('No facts to approve')
                }
            })
            .catch(e => console.error(e))
    }

    function action(approve: boolean, id: string) {
        console.log(approve, id)

        axios({
            method: 'post',
            url: '/api/approve-fact',
            headers: {
                "Content-Type": "application/json",
            },
            data: { approve, _id: id },
            withCredentials: true
        })
            .then(data => {
                console.log(data)

                setFacts((prev: Array<object>) => {
                    return prev.filter((it: any) => it._id !== id)
                })
            })
            .catch(e => console.error(e))
    }

    const reCaptchaRef = useRef<Reaptcha>(null)

    function verifyCaptcha() {
        reCaptchaRef?.current?.getResponse().then(res => {
            setCaptcha(res)
        })
    }

    return (
        <main className="fact-approve">
            {!facts.length ?
                <div className="psw-con">
                    <form onSubmit={submit}>
                        <label htmlFor="usr">Admin username</label>
                        <input /* autoComplete="none" */ id="usr" onChange={(e) => setUsername(e.target.value)} type="text" />
                        <label htmlFor="psw">Admin password</label>
                        <input /* autoComplete="none" */ id="psw" onChange={(e) => setPsw(e.target.value)} type="password" />
                        <Reaptcha
                            theme='dark'
                            sitekey={process.env.NEXT_PUBLIC_CAPTCHA_SITE}
                            onVerify={verifyCaptcha}
                            ref={reCaptchaRef}
                            size='compact'
                            badge='inline'
                            onExpire={() => setCaptcha('')}
                        />
                        <button type="submit">LOG IN</button>
                    </form>
                </div>
                :
                <>
                    {facts.map((fact: any, i: number) => {
                        return (
                            <div className="fact" key={i}>
                                <h4>{fact?.username}</h4>
                                <div>
                                    CS:
                                    <p>{fact?.cs}</p>
                                </div>
                                <div>
                                    EN:
                                    <p>{fact?.en}</p>
                                </div>
                                <div>
                                    <button
                                        type="button"
                                        className="btn-approve btn-action"
                                        onClick={() => action(true, fact?._id)}
                                    >
                                        APPROVE
                                    </button>
                                    <button
                                        type="button"
                                        className="btn-delete btn-action"
                                        onClick={() => action(false, fact?._id)}
                                    >
                                        DELETE
                                    </button>
                                </div>
                            </div>
                        )
                    })}
                </>
            }

        </main>
    )
}

export default index