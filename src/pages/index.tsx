import useTranslation from 'next-translate/useTranslation'

import FactsCount from '@/components/FactsCount'
import Fact from '@/components/Fact'
import About from '@/components/About'
import Trans from 'next-translate/Trans'

export default function Home() {
  const { t } = useTranslation('common')

  return (
    <>
      <main>
        <section className='fact-con'>
          <h2>
            <Trans
              i18nKey="common:title"
              components={[
                <span className="tool-font"></span>
              ]}
            />
          </h2>
          <Fact />
          <FactsCount />
          <About />
        </section>
      </main>
    </>
  )
}
