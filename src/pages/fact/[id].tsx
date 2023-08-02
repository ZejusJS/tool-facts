
import useTranslation from "next-translate/useTranslation"
import { GetServerSideProps } from "next/types";
import { useRouter } from "next/router";
import dbConnect from '../../utils/connectMongo';
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
    const router = useRouter();

    const [fact, setFact] = useState(JSON.parse(factJson))
    const [alert, setAlert] = useState(false)

    const { id } = router.query

    useEffect(() => {
        console.log(fact)
        if (!fact[lang]?.length) {
            setAlert(true)
        }
    }, [])

    function findLocale(): string {
        let found = locales.find(locale => {
            return fact[locale]?.length
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
                    <p>{t('in-lang')}</p>
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
                    {fact[lang]?.length ?
                        <p className="fact">{fact[lang]}</p>
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

export const getServerSideProps: GetServerSideProps = async ({ req, query, locale }) => {
    let lang: any = query.lang
    let id: any = query.id

    try {
        await dbConnect()

        console.log(locale)
        console.log(id)

        const fact = await Fact.findOne({
            // [String(locale)]: { $exists: true },
            show: true,
            id,
            // $expr: {
            //     $gt: [{ $strLenCP: `$${locale}` }, 0]
            // }
        }).select([`cs`, 'en', 'id', '-_id'])

        console.log(fact)

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