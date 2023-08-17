import useTranslation from "next-translate/useTranslation"
import { GetServerSideProps } from "next/types";
import dbConnect from '../../utils/connectMongo';
import findFactId from "@/utils/findFact-id";
import Fact from '../../utils/models/fact';
import { locales } from '../../../i18n'
import { useEffect, useState } from "react";
import Lang from "@/components/footer/Lang";
import Link from "next/link";
import Exit from '../../svg/Exit'
import FactsCount from '@/components/FactsCount'

interface props {
    factJson: string
}

const FactShare = ({ factJson }: props) => {
    const { t, lang } = useTranslation('common')
    const { t: tS } = useTranslation('share-fact')

    const [fact, setFact] = useState(JSON.parse(factJson))
    const [alert, setAlert] = useState(false)

    useEffect(() => {
        // console.log(fact)
        if (!fact[lang?.slice(4)]?.length) {
            setAlert(true)
        }
    }, [])

    function findLocale(): string {
        let found = locales.find(locale => {
            return fact[locale?.slice(4)]?.length
        })
        return String(found)
    }

    return (
        <main className="fact-share" onClick={e => { e.stopPropagation(); setAlert(false) }}>
            <section className="fact-sec" onClick={e => { e.stopPropagation(); setAlert(false) }}>
                <div
                    className={`alert ${alert ? "show" : ''}`}
                    onClick={e => { e.stopPropagation() }}
                >
                    <p>{tS('in-lang')}</p>
                    <p className="preferred-lang">{tS('pref-lang')}</p>
                    <Lang />
                    <button
                        type="button"
                        onClick={e => { e.stopPropagation(); setAlert(false) }}
                    >
                        OK</button>
                </div>
                <div className="logo-con"></div>
                <div className={`fact-div ${alert ? "background" : ''}`}>
                    <h2>{t('did-you-know')}</h2>
                    {fact[lang?.slice(4)]?.length ?
                        <p className="fact">{fact[lang?.slice(4)]}</p>
                        :
                        <p className="fact">{fact[findLocale()]}</p>
                    }
                    {/* <div className="logo-con"></div> */}
                </div>
            </section>
            <section className="share-about">
                <h3>{tS('about-title')}</h3>
                <Link
                    href={'/'}
                    className="another-facts"
                >
                    {tS('another-facts')} <Exit />
                </Link>
                <FactsCount />
            </section>
        </main>
    )
}

export const getServerSideProps: GetServerSideProps = async ({ req, res, query, locale }) => {
    let id: any = query.id

    res.setHeader(
        'Cache-Control',
        's-maxage=350000'
    )

    try {
        let fact = await findFactId(id);

        if (!fact) {
            return {
                notFound: true
            }
        }

        return {
            props: {
                factJson: JSON.stringify(fact)
            }
        }
    } catch (e) {
        console.log(e)
        return {
            redirect: {
                destination: '/'
            },
            props: {}
        }
    }
}

export default FactShare