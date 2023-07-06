import type { AppProps } from 'next/app'
import { SiteProvider } from '@/context'
import Meta from '@/components/Meta'
import Nav from "../components/nav"
import { Roboto } from 'next/font/google'
import Footer from '../components/footer'

const roboto = Roboto({
  subsets: ['latin', 'latin-ext'],
  preload: true,
  weight: ['300', '400', '500', '700', '900']
})

import '../styles/global.scss'
import '../styles/fact.scss'
import '../styles/new-fact.scss'
import '../styles/nav.scss'
import '../styles/footer.scss'
import '../styles/landpage.scss'
import '../styles/fact-approve.scss'
import '../styles/about.scss'

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Meta />
      <div className={roboto.className}>
        <SiteProvider>
          <Nav />
          <Component {...pageProps} />
          <Footer />
        </SiteProvider>
      </div>
    </>
  )
}
