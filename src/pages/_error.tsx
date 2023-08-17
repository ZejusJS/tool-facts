import axios from 'axios'
import useTranslation from 'next-translate/useTranslation'
import Link from 'next/link'
import { NextPageContext } from 'next/types'
import { useEffect, useState } from 'react'

const MAX_FACTS = 6
const MAX_FACTS_LENGTH = 200

function Error({ statusCode }: { statusCode: number }) {
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
        "--n": facts[rand][lang?.slice(4)].length + t('know').length
    } as React.CSSProperties : {}

    return (
        <main className='error'>
            <section className='error-page not-found'>
                <h3>{t('wrong')}</h3>
                <h4>Code: <span>{statusCode}</span></h4>
                <Link className='back' href='/' shallow={false} prefetch={false}>
                    {t('home')}
                </Link>
                <p className="random-fact">
                    {facts ?
                        <span className="type" style={style}>
                            {t('know')} {facts ? facts[rand][lang?.slice(4)] : ""}
                        </span>
                        : ''}
                </p>
            </section>
        </main>
    )
}

export const getStaticProps = function ({ res, err }: NextPageContext) {
    const statusCode = res ? res.statusCode : err ? err.statusCode : 404
    return { props: { statusCode } }
}

export default Error