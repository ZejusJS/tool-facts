import Link from "next/link"
import i18nConfig from '../../i18n'
import { ReactElement } from "react"
import FlagCS from '../svg/Cs'
import FlagEN from '../svg/En'

interface props {
    lang: string
    children?: ReactElement
}

const LinkText = ({ lang, children }: props) => {
    return (
        <Link href="/" locale={lang}>
            {
                lang === 'cs' ?
                    <FlagCS /> : <FlagEN />
            }
            {children}
        </Link>
    )
}

export default LinkText