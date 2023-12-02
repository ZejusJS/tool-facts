import axios from "axios"
import { useRouter } from "next/router"
import { ChangeEvent, FormEvent, useRef, useState } from "react"

interface props {
    factFetch: {
        _id: string
        en: string
        cs: string
        username: string
        id: string
        show: boolean
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

        const conf = confirm("Do you want to delete fact?")

        if (conf) {
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
    }

    function changeFact(e: ChangeEvent<HTMLTextAreaElement & HTMLInputElement>) {
        const { name, value, checked } = e.target

        setFact(prev => {
            if (e.target.type === "checkbox") return { ...prev, [name]: checked }
            return { ...prev, [name]: value }
        })
    }

    function copyFactUrl() {
        if (navigator?.clipboard) {
            navigator.clipboard.writeText(window.location.origin + '/fact/' + fact.id)
        }
    }

    return (
        <>
            <form onSubmit={e => submitFact(e)}>
                <div className='form-block'>
                    <label htmlFor={'username' + fact._id}>{'Username'} (1 - 20)</label>
                    <input
                        type="text"
                        name='username'
                        id={'username' + fact._id}
                        placeholder={'Username'}
                        value={fact.username}
                        onChange={changeFact}
                        maxLength={20}
                    />
                </div>
                <div className='form-block'>
                    <label htmlFor={'fact-id' + fact._id}>{'ID'} (0 - 50)</label>
                    <input
                        type="text"
                        name='id'
                        id={'fact-id' + fact._id}
                        placeholder={'ID'}
                        value={fact.id}
                        onChange={changeFact}
                        maxLength={50}
                        autoComplete="none"
                    />
                    <button
                        type="button"
                        onClick={copyFactUrl}
                        className="copy-url"
                    >
                        Copy URL
                    </button>
                </div>
                <div className='form-block'>
                    <label htmlFor={'en' + fact._id}>{'English'} (0 - 2800)</label>
                    <textarea
                        name='en'
                        id={'en' + fact._id}
                        placeholder={'English'}
                        value={fact.en}
                        maxLength={process.env.MAX_FACT_LENGTH}
                        ref={textEN}
                        onChange={changeFact}
                        onFocus={() => textEN?.current?.classList?.add('expanded')}
                    />
                </div>
                <div className='form-block'>
                    <label htmlFor={'cs' + fact._id}>{'Czech'} (0 - 2800)</label>
                    <textarea
                        name='cs'
                        id={'cs' + fact._id}
                        placeholder={'Czech'}
                        value={fact.cs}
                        maxLength={process.env.MAX_FACT_LENGTH}
                        ref={textCS}
                        onChange={changeFact}
                        onFocus={() => textCS?.current?.classList?.add('expanded')}
                    />
                </div>
                <div className='form-block checkbox'>
                    <label htmlFor={'show' + fact._id}>{'Showen?'}</label>
                    <input
                        type="checkbox"
                        name='show'
                        id={'show' + fact._id}
                        checked={fact.show === true}
                        onChange={changeFact}
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