import Link from 'next/link'
import i18nConfig from '../../../i18n'
import { SiteState } from '@/context'

const { locales } = i18nConfig

const lang = () => {
    const { tNav, lang, router }: typeof SiteState.arguments = SiteState()

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
                locales.map((lng, i) => {
                    // if (lng === lang) return null

                    return (
                        <span key={i}>
                            <Link
                                className={lng === lang ? 'same' : ''}
                                href={url(lng)}
                                locale={lng} key={lng}
                                onClick={(e) => setCookieDoc(lng, e)}
                                scroll={false}
                                prefetch={false}
                            >
                                {/* {tNav(`language-name-${lng}`)} */}

                                {
                                    lng === 'cs' ? "Čeština (cs)" : "English (en)"
                                }
                            </Link>
                            {
                                i === (locales.length - 1) ? '' : ', '
                            }
                        </span>
                    )
                })
            }
        </div>
    )
}

export default lang