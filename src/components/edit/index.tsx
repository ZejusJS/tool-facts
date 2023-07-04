import axios from "axios"
import { useRouter } from "next/router"
import { ChangeEvent, FormEvent, useRef, useState } from "react"

interface props {
    factFetch: {
        _id: string,
        en: string,
        cs: string,
        username: string
    }
}

const index = ({ factFetch }: props) => {
    const [fact, setFact] = useState(factFetch)
    const router = useRouter()

    const textEN = useRef<HTMLTextAreaElement | null>(null)
    const textCS = useRef<HTMLTextAreaElement | null>(null)

    function submitFact(e: FormEvent<HTMLFormElement>) {
        e.preventDefault()

        axios({
            method: 'post',
            url: `/api/edit-facts/${fact._id}`,
            data: {
                ...fact
            }
        })
            .then(data => {
                console.log(data)
                router.replace(router.asPath, '', { shallow: false, scroll: false })
            })
            .catch(e => console.error(e))
    }

    function deleteFact() {
        axios({
            method: 'post',
            url: '/api/approve-fact',
            headers: {
                "Content-Type": "application/json",
            },
            data: { approve: false, _id: fact._id },
            withCredentials: true
        })
            .then(data => {
                console.log(data)

                router.replace(router.asPath, '', { shallow: false, scroll: false })
            })
            .catch(e => console.error(e))
    }

    function changeFact(e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
        const { name, value } = e.target

        setFact(prev => {
            return { ...prev, [name]: value }
        })
    }

    return (
        <>
            <form onSubmit={e => submitFact(e)}>
                <div className='form-block'>
                    <label htmlFor="username">{'Username'}</label>
                    <input
                        type="text"
                        name='username'
                        id='username'
                        placeholder={'Username'}
                        value={fact.username}
                        onChange={changeFact}
                    />
                </div>
                <div className='form-block'>
                    <label htmlFor="en">{'English'}</label>
                    <textarea
                        name='en'
                        id='en'
                        placeholder={'English'}
                        value={fact.en}
                        maxLength={process.env.MAX_FACT_LENGTH}
                        ref={textEN}
                        onChange={changeFact}
                        onFocus={() => textEN?.current?.classList?.add('expanded')}
                    />
                </div>
                <div className='form-block'>
                    <label htmlFor="cs">{'Czech'}</label>
                    <textarea
                        name='cs'
                        id='cs'
                        placeholder={'Czech'}
                        value={fact.cs}
                        maxLength={process.env.MAX_FACT_LENGTH}
                        ref={textCS}
                        onChange={changeFact}
                        onFocus={() => textCS?.current?.classList?.add('expanded')}
                    />
                </div>
                <div className='form-block btns'>
                    <button className='fact-submit' type="submit">
                        {'Submit'}
                    </button>
                    <button
                        type="button"
                        className='fact-delete'
                        onClick={deleteFact}
                    >
                        Delete
                    </button>
                </div>
            </form>
        </>
    )
}

export default index