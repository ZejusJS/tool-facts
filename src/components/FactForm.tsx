import axios from 'axios'
import useTranslation from 'next-translate/useTranslation'
import { ChangeEvent, FormEvent, useState } from 'react'

const factForm = () => {
    const { t, lang } = useTranslation('form')

    const [fact, setFact] = useState({
        username: '',
        cs: '',
        en: ''
    })

    function changeFact(e: ChangeEvent<HTMLInputElement>) {
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
                    <label htmlFor="en">{t('en-label')}</label>
                    <input
                        type="text"
                        name='en'
                        id='en'
                        placeholder={t('en-label')}
                        value={fact.en}
                        onChange={changeFact}
                    />
                </div>
                <div className='form-block'>
                    <label htmlFor="cs">{t('cs-label')}</label>
                    <input
                        type="text"
                        name='cs'
                        id='cs'
                        placeholder={t('cs-label')}
                        value={fact.cs}
                        onChange={changeFact}
                    />
                </div>
                <div className='form-block'>
                    <button type="submit">Submit</button>
                </div>
            </form>
        </section>
    )
}

export default factForm