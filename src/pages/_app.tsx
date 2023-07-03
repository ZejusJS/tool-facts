import type { AppProps } from 'next/app'
import { SiteProvider } from '@/context'
import Meta from '@/components/Meta'
import Nav from "../components/nav"
import { Quicksand } from 'next/font/google'

const quicksand = Quicksand({
  subsets: ['latin', 'latin-ext'],
  preload: true,
  weight: ['300', '400', '500', '600', '700']
})

import '../styles/global.scss'
import '../styles/fact.scss'
import '../styles/nav.scss'

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Meta />
      <div className={quicksand.className}>
        <SiteProvider>
          <Nav />
          <Component {...pageProps} />
        </SiteProvider>
      </div>
    </>
  )
}
