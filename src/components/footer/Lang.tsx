import Link from 'next/link'
import i18nConfig from '../../../i18n'
import { SiteState } from '@/context'
import EnFlag from '../../svg/En'
import CsFlag from '../../svg/Cs'

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

    function setCookie(lng: string) {
        document.cookie = `NEXT_LOCALE=${lng};path=/`
    }

    return (
        <div className='lang-con'>
            {
                locales.map((lng, i) => {
                    // if (lng === lang) return null

                    return (
                        <span>
                            <Link
                                href={url(lng)}
                                locale={lng} key={lng}
                                onClick={() => setCookie(lng)}
                                scroll={false}
                            >
                                {tNav(`language-name-${lng}`)}
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