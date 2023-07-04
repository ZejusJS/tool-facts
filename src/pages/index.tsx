import useTranslation from 'next-translate/useTranslation'

import { useEffect, useRef, useState } from 'react'
import axios from 'axios'
import Link from 'next/link'

export default function Home() {
  const { t, lang } = useTranslation('common')
  const [fact, setFact] = useState('')
  const [facts, setFacts] = useState([])
  const factsCount = useRef(1)

  useEffect(() => {
    console.log(lang)

    axios({
      method: 'get',
      url: `/api/all-facts/${lang}`
    })
      .then(data => {
        setFacts(data.data.facts)
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
              <p>
                {fact}
              </p>
            </div>
            <button
              type='button'
              className='next-fact'
              onClick={nextFact}
            >
              {t('next-fact')}
            </button>
          </div>
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
