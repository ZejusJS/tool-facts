import axios from "axios"
import useTranslation from "next-translate/useTranslation"
import { RefObject, useEffect, useRef, useState } from "react"

const Fact = () => {
    const { t, lang } = useTranslation('common')
    
    const [fact, setFact] = useState('')
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
                setTimeout(() => {
                    shuffleFacts(data.data.facts)
                }, 200);
            })
            .catch(e => console.error(e))
    }, [lang])

    useEffect(() => {
        if (facts?.length) {
            setFact(facts[0][lang])
            factsCount.current = 1
        }
    }, [facts])

    function nextFact() {
        if (facts.length) {
            setFact(facts[factsCount.current][lang])

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

    return (
        <div className='fact'>
            <div className='fact-wrapper'>
                <h3 className='did-you-know'>
                    {t('did-you-know')}
                </h3>

                <p className={loadingFact ? 'hidden' : ''}>
                    {fact}
                </p>
                <img
                    ref={eyeRef}
                    className={loadingFact ? '' : 'hidden'}
                    src="https://media.tenor.com/KLg7XjZkDpsAAAAi/tool-eye.gif" alt=""
                />
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