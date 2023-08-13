import type { AppProps } from 'next/app'
import { SiteProvider } from '@/context'
import Meta from '@/components/Meta'
import Body from '@/components/Body'
import Nav from "@/components/nav"
import Footer from '@/components/footer'
import Menu from '@/components/menu'

import '../styles/global.scss'
import '../styles/fact.scss'
import '../styles/new-fact.scss'
import '../styles/nav.scss'
import '../styles/footer.scss'
import '../styles/landpage.scss'
import '../styles/fact-approve.scss'
import '../styles/about.scss'
import '../styles/error.scss'
import '../styles/fact-share.scss'
import '../styles/sources.scss'
import '../styles/menu.scss'


export default function App({ Component, pageProps }: AppProps) {

  return (
    <>
      <SiteProvider>
        <Meta />
        <Menu />
        <Body>
          <Nav />
          <Component {...pageProps} />
          <Footer />
        </Body>
      </SiteProvider>
    </>
  )
}
