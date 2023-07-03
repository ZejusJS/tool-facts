import axios from 'axios'
import useTranslation from 'next-translate/useTranslation'
import { ChangeEvent, FormEvent, useRef, useState } from 'react'

const factForm = () => {
    const { t, lang } = useTranslation('form')

    const [fact, setFact] = useState({
        username: '',
        cs: '',
        en: ''
    })

    const textEN = useRef<HTMLTextAreaElement | null>(null)
    const textCS = useRef<HTMLTextAreaElement | null>(null)

    function changeFact(e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
        const { name, value } = e.target

        setFact(prev => {
            return { ...prev, [name]: value }
        })
    }

    function submitFact(e: FormEvent<HTMLFormElement>) {
        e.preventDefault()

        axios({
            method: 'post',
            url: '/api/post-fact',
            data: fact
        })
    }

    return (
        <section className='fact-form'>
            <h3 className='title'>{t('title')}</h3>
            <form onSubmit={e => submitFact(e)}>
                <div className='form-block'>
                    <label htmlFor="username">{t('username')}</label>
                    <input
                        type="text"
                        name='username'
                        id='username'
                        placeholder={"*" + t('username')}
                        value={fact.username}
                        maxLength={process.env.MAX_USERNAME_LENGTH}
                        onChange={changeFact}
                    />
                </div>
                <div className='form-block'>
                    <label htmlFor="en">{t('en-label')}</label>
                    <textarea
                        name='en'
                        id='en'
                        placeholder={t('placeholder')}
                        value={fact.en}
                        maxLength={process.env.MAX_FACT_LENGTH}
                        ref={textEN}
                        onChange={changeFact}
                        onFocus={() => textEN?.current?.classList?.add('expanded')}
                    />
                </div>
                <div className='form-block'>
                    <label htmlFor="cs">{t('cs-label')}</label>
                    <textarea
                        name='cs'
                        id='cs'
                        placeholder={t('placeholder')}
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
        </section>
    )
}

export default factForm