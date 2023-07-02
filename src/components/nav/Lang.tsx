import Link from 'next/link'
import i18nConfig from '../../../i18n'
import { NextRouter } from 'next/router'
import { SiteState } from '@/context'
import {Button, Item, Label, ListBox, Popover, Select, SelectValue} from 'react-aria-components';

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
        <div>
            {
                locales.map((lng) => {
                    if (lng === lang) return null

                    return (
                        <Link
                            href={url(lng)}
                            locale={lng} key={lng}
                            onClick={() => setCookie(lng)}
                            scroll={false}
                        >
                            {tNav(`language-name-${lng}`)}
                        </Link>
                    )
                })
            }
        </div>
    )
}

export default lang