import type { AppProps } from 'next/app'
import { SiteProvider } from '@/context'
import Meta from '@/components/Meta'
import Nav from "../components/nav"

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Meta />
      <SiteProvider>
        <Nav />
        <Component {...pageProps} />
      </SiteProvider>
    </>
  )
}
