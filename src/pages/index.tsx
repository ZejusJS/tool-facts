import useTranslation from 'next-translate/useTranslation'

import { RefObject, useEffect, useRef, useState } from 'react'
import axios from 'axios'
import FactsCount from '@/components/FactsCount'

export default function Home() {
  const { t, lang } = useTranslation('common')
  const [fact, setFact] = useState('')
  const [facts, setFacts] = useState([])
  const [loadingFact, setLoadingFact] = useState(true)
  const factsCount = useRef(1)

  const eyeRef: RefObject<HTMLImageElement> = useRef(null)

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
          setFacts(data.data.facts)
        }, 200);
        shuffleFacts()
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

  function shuffleFacts() {
    setFacts(prev => {
      let i = prev.length
      let j, temp

      while (--i > 0) {
        j = Math.floor(Math.random() * (i + 1))
        temp = prev[j]
        prev[j] = prev[i]
        prev[i] = temp
      }

      return prev
    })
  }

  return (
    <>
      <main>
        <section className='fact-con'>
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
                width={1500}
                height={1500}
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
          <FactsCount t={t} />
        </section>
        {/* <section className='fact-submit'>
          <div className='new-fact-con'>
            <h3>{t('new-facts.q')}</h3>
            <span className='a-con'>
              <Link
                href={'/new-fact'}
              >
                {t('new-facts.a')}
              </Link>
            </span>
          </div>
        </section> */}
      </main>
    </>
  )
}
