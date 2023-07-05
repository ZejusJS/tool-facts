import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import i18nConfig from '../i18n'

const { locales } = i18nConfig

// This function can be marked `async` if using `await` inside
export function middleware(req: NextRequest) {
  let locale = req.cookies.get('NEXT_LOCALE')?.value

  let redirect = false
  let findLocale = false
  locales.map((lang) => {
    if (req.url.includes(lang) && locale && locale !== lang) {
      console.log('ssssssssssssssssssss')
      req.nextUrl.href = req.url.replace(lang, locale)
      redirect = true
    }
    if (req.url.includes(lang)) {
      findLocale = true
    }
  })
  if (redirect) return NextResponse.redirect(req.nextUrl)
  else if (!findLocale && locale) {
    req.nextUrl.pathname = req.nextUrl.pathname.replace(/\//, '/' + locale + '/')
    return NextResponse.redirect(req.nextUrl)
  }
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.svg|favicon.ico|imgs).*)', '/']
}