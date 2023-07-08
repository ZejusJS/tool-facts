import Link from 'next/link'
import i18nConfig from '../../../i18n'
import { SiteState } from '@/context'
import EnFlag from '../../svg/En'
import CsFlag from '../../svg/Cs'
import { useRouter } from 'next/router'

const { locales } = i18nConfig

const lang = () => {
    const { tNav, lang }: typeof SiteState.arguments = SiteState()
    const router = useRouter()

    function url(lng: string): string {
        let href = router.asPath

        if (router.basePath.startsWith(lang)) {
            href = router.basePath.replace(lang, lng)
        } else {
            href = lng + href
        }
        return href
    }

    function setCookieDoc(lng: string, e: React.MouseEvent<HTMLAnchorElement>) {
        e.preventDefault()
        
        if (lng !== lang) {
            document.cookie = `NEXT_LOCALE=${lng};path=/`

            router.reload()
        }
    }

    return (
        <div className='lang-con'>
            {
                locales.map((lng) => {
                    if (lng === lang) return null

                    return (
                        <Link
                            href={url(lng)}
                            locale={lng}
                            key={lng}
                            onClick={(e) => setCookieDoc(lng, e)}
                            scroll={false}
                            title={tNav(`language-name-${lng}`)}
                            prefetch={false}
                        >
                            {
                                lng === 'en' ?
                                    <EnFlag /> : <CsFlag />
                            }
                        </Link>
                    )
                })
            }
        </div>
    )
}

export default lang