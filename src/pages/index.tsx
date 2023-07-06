import useTranslation from 'next-translate/useTranslation'

import FactsCount from '@/components/FactsCount'
import Fact from '@/components/Fact'
import About from '@/components/About'

export default function Home() {
  const { t } = useTranslation('common')

  return (
    <>
      <main>
        <section className='fact-con'>
          <h2>{t('title')}</h2>
          <Fact />
          <FactsCount t={t} />
          <About />
        </section>
      </main>
    </>
  )
}
