import useTranslation from 'next-translate/useTranslation'

import FactsCount from '@/components/FactsCount'
import Fact from '@/components/Fact'

export default function Home() {
  const { t } = useTranslation('common')

  return (
    <>
      <main>
        <section className='fact-con'>
          <Fact />
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
