import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import i18nConfig from '../i18n'

const { locales } = i18nConfig

// This function can be marked `async` if using `await` inside
export function middleware(req: NextRequest) {
  let locale = req.cookies.get('NEXT_LOCALE')?.value
  if (!locale) return 

  // const reg = new RegExp(`((^${String(process.env.NEXT_PUBLIC_FRONTEND).replace('/', '\\/').replace('.', '\\.')}\/${locale})(\/)*?)`, 'g')
  // const reg2 = new RegExp(`((^\/${locale})(\/)*?)`, 'g')

  let redirect = false
  let findLocale = false
  let findOneCookieMatch = false
  for (let lang of locales) {
    const langReg = new RegExp(`((^${String(req.nextUrl.origin).replace('/', '\\/').replace('.', '\\.')}\/${lang})(\/)*?)`, 'g')

    if (lang === locale) findOneCookieMatch = true
    if (locale && req.url.match(langReg) && locale !== lang) {
      // console.log('redirect')
      req.nextUrl.href = req.url.replace(langReg, req.nextUrl.origin + '/' + locale)
      redirect = true
    }
    if (req.url.match(langReg)) {
      // console.log('find')
      findLocale = true
    }
  }

  // locales.map((lang) => {

  // })
  
  if (!findOneCookieMatch) {
    // console.log('findOneCookieMatch')
    const response = NextResponse.redirect(req.url)
    response.cookies.delete('NEXT_LOCALE')
    return response
  }
  if (redirect) return NextResponse.redirect(req.nextUrl)
  else if (!findLocale && locale && locale !== process.env.NEXT_PUBLIC_DEFAULT_LOCALE) {
    req.nextUrl.pathname = req.nextUrl.pathname.replace(/\//, '/' + locale + '/')
    return NextResponse.redirect(req.nextUrl)
  }
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.svg|favicon.ico|imgs).*)', '/']
}