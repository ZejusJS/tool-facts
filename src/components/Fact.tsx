import axios from "axios"
import useTranslation from "next-translate/useTranslation"
import { RefObject, useEffect, useRef, useState } from "react"
import Share from '../svg/Share'

const Fact = () => {
    const { t, lang } = useTranslation('common')

    const [fact, setFact] = useState({ fact: '', id: '' })
    const [facts, setFacts] = useState([])
    const [loadingFact, setLoadingFact] = useState(true)

    const eyeRef: RefObject<HTMLImageElement> = useRef(null)

    const factsCount = useRef(1)

    useEffect(() => {

        setLoadingFact(true)

        axios({
            method: 'get',
            url: `/api/all-facts/${lang}`,
            onDownloadProgress(progressEvent) {
                setTimeout(() => {
                    setLoadingFact(false)
                }, 300);
            },
        })
            .then(data => {
                data.data.facts = data.data.facts.map((f: any) => {
                    f['fact'] = f[lang?.slice(4)]
                    delete f[lang?.slice(4)]
                    return f
                })
                setTimeout(() => {
                    shuffleFacts(data.data.facts)
                }, 200);
            })
            .catch(e => console.error(e))
    }, [lang])

    useEffect(() => {
        if (facts?.length) {
            setFact(facts[0])
            factsCount.current = 1
        }
    }, [facts])

    function nextFact() {
        if (facts.length) {
            setFact(facts[factsCount.current])

            factsCount.current = factsCount.current + 1

            if (factsCount.current >= facts.length) {
                shuffleFacts()
                factsCount.current = 0
            }
        }
    }

    function shuffleFacts(data?: any) {
        setFacts(prev => {
            let array = data ? data : prev
            let i = array.length
            let j, temp

            while (--i > 0) {
                j = Math.floor(Math.random() * (i + 1))
                temp = array[j]
                array[j] = array[i]
                array[i] = temp
            }

            return array
        })
    }

    const [isUrlCopied, setIsUrlCopied] = useState(false)

    function copyFactUrl() {
        if (navigator?.clipboard) {
            navigator.clipboard.writeText(process.env.NEXT_PUBLIC_FRONTEND + '/fact/' + fact.id)

            setIsUrlCopied(true)
            setTimeout(() => {
                setIsUrlCopied(false)
            }, 3000);
        }
    }

    return (
        <div className='fact'>
            <div className='fact-wrapper'>
                <h3 className='did-you-know'>
                    {t('did-you-know')}
                </h3>

                <p className={loadingFact ? 'hidden' : ''}>
                    {fact.fact}
                </p>
                <img
                    ref={eyeRef}
                    className={loadingFact ? '' : 'hidden'}
                    src="https://media.tenor.com/KLg7XjZkDpsAAAAi/tool-eye.gif" alt=""
                />
                {
                    fact?.id ?
                        <div className={`share-con ${isUrlCopied ? 'copy' : ''}`}>
                            <span className="copied">{t('url-copy')}</span>
                            <button
                                title="Share this fact"
                                className={`share ${isUrlCopied ? 'copy' : ''}`}
                                type="button"
                                onClick={copyFactUrl}
                            >
                                <Share />
                            </button>
                        </div>
                        : ''
                }
            </div>
            <button
                type='button'
                className='next-fact'
                onClick={nextFact}
            >
                {t('next-fact')}
            </button>
        </div>
    )
}

export default Fact