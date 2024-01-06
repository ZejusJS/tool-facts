import axios from 'axios';
import useTranslation from 'next-translate/useTranslation'
import Link from 'next/link'
import { useEffect, useState } from 'react'

const MAX_FACTS = 6
const MAX_FACTS_LENGTH = 200

function Error() {
    const { t, lang } = useTranslation('error')
    const [facts, setFacts] = useState<any>(null);
    const [rand, setRand] = useState(-1)

    useEffect(() => {
        setRand(Math.floor(Math.random() * 6))

        axios({
            url: `/api/random-facts/${MAX_FACTS}/${MAX_FACTS_LENGTH}`
        })
            .then((data) => setFacts(data.data.facts))
            .catch((e) => console.error(e))
    }, [])

    let style = facts ? {
        "--n": facts[rand][lang].length + t('know').length
    } as React.CSSProperties : {}

    return (
        <>
            <main className='error'>
                <section className='error-page not-found'>
                    <h3>{t('not-found')}</h3>
                    <Link className='back' href='/' shallow={false} prefetch={false}>
                        {t('home')}
                    </Link>
                    <p className="random-fact">
                        {facts ?
                            <span className="type" style={style}>
                                {t('know')} {facts ? facts[rand][lang] : ""}
                            </span>
                            : ''}
                    </p>
                </section>
            </main >
        </>
    )
}

export default Error