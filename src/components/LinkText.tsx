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
    const { router, lang: langSel }: typeof SiteState.arguments = SiteState()

    function url(lng: string): string {
        let href = router.asPath

        if (router?.basePath?.startsWith(lang)) {
            href = router.basePath.replace(lang, lng)
        } else {
            href = lng + href
        }
        return href
    }

    function setCookieDoc(lng: string, e: React.MouseEvent<HTMLAnchorElement>) {
        e.preventDefault()
        
        if (lang !== langSel) {
            document.cookie = `NEXT_LOCALE=${lng};path=/`

            router.reload()
        }
    }

    return (
        <Link
            href={url(lang)}
            locale={lang}
            key={lang}
            onClick={(e) => setCookieDoc(lang, e)}
            scroll={false}
            prefetch={false}
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