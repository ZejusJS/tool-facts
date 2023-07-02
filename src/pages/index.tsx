import useTranslation from 'next-translate/useTranslation'
import { Inter } from 'next/font/google'

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  const { t, lang } = useTranslation('common')

  return (
    <>
      <main>

      </main>
    </>
  )
}
