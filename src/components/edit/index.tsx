import { FormEvent, useRef } from "react"

interface props {
    fact: {
        _id: string,
        en: string,
        cs: string,
        username: string
    }
}

const index = ({ fact }: props) => {
    const textEN = useRef<HTMLTextAreaElement | null>(null)
    const textCS = useRef<HTMLTextAreaElement | null>(null)
    
    function submitFact(e: FormEvent<HTMLFormElement>) {
        e.preventDefault()

        axios({
            method: 'post',
            url: `/api/edit-facts/${fact._id}`,
            data: {
                ...fact,
                captcha
            }
        })
            .then(data => {
                console.log(data)
                setFact(defaultFact)
            })
            .catch(e => console.error(e))
    }

    return (
        <>
            <form onSubmit={e => submitFact(e)}>
                <div className='form-block'>
                    <label htmlFor="username">{t('username')}</label>
                    <input
                        type="text"
                        name='username'
                        id='username'
                        placeholder={"*" + t('username')}
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
                <div className='form-block'>
                    <button className='fact-submit' type="submit">
                        {t('submit')}
                    </button>
                </div>
            </form>
        </>
    )
}

export default index