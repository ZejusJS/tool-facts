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
import '../styles/find-fact.scss'

import { Inconsolata, Quicksand, Montserrat, Roboto } from 'next/font/google';
import localFont from 'next/font/local';

const inconsolata = Inconsolata({
  weight: '400',
  subsets: ['latin-ext'],
});

const roboto = Roboto({
  weight: ['400', '700'],
  subsets: ['latin'],
});

const montserrat = Montserrat({
  weight: ['400', '300'],
  subsets: ['latin']
});

const quicksand = Quicksand({
  weight: ['400', '700'],
  subsets: ['latin'],
});

const tool = localFont({
  src: [
    {
      path: './SystemaEncephale.ttf',
      weight: '400',
    }
  ],
});

export default function App({ Component, pageProps }: AppProps) {

  return (
    <>
      <style jsx global>{`
        :root {
          --inconsolata: ${inconsolata.style.fontFamily};
          --roboto: ${roboto.style.fontFamily};
          --montserrat: ${montserrat.style.fontFamily};
          --quicksand: ${quicksand.style.fontFamily};
          --tool: ${tool.style.fontFamily};
        }
      `}</style>
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
