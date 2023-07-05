import Link from "next/link"
import i18nConfig from '../../i18n'
import { ReactElement } from "react"
import FlagCS from '../svg/Cs'
import FlagEN from '../svg/En'
import { SiteState } from '@/context'

interface props {
    lang: string
    children?: ReactElement
}

const LinkText = ({ lang, children }: props) => {
    const { router }: typeof SiteState.arguments = SiteState()

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
        <Link
            href={url(lang)}
            locale={lang}
            key={lang}
            onClick={() => setCookie(lang)}
            scroll={false}
        >
            {
                lang === 'cs' ?
                    <FlagCS /> : <FlagEN />
            }
            {children}
        </Link>
    )
}

export default LinkText