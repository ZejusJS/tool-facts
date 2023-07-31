import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import i18nConfig from '../i18n'

const { locales } = i18nConfig

// This function can be marked `async` if using `await` inside
export function middleware(req: NextRequest) {
  let locale = req.cookies.get('NEXT_LOCALE')?.value

  const reg = new RegExp(`((^${String(process.env.FRONTEND).replace('/', '\\/').replace('.', '\\.')}\/${locale})(\/)*?)`, 'g')
  const reg2 = new RegExp(`((^\/${locale})(\/)*?)`, 'g')
  
  let redirect = false
  let findLocale = false
  locales.map((lang) => {
    const langReg = new RegExp(`((^${String(process.env.FRONTEND).replace('/', '\\/').replace('.', '\\.')}\/${lang})(\/)*?)`, 'g')

    if (locale && req.url.match(langReg) && locale !== lang) {
      console.log('redirect')
      req.nextUrl.href = req.url.replace(langReg, process.env.FRONTEND + '/' + locale)
      redirect = true
    }
    if (req.url.match(langReg)) {
      console.log('find')
      findLocale = true
    }
  })
  
  if (redirect) return NextResponse.redirect(req.nextUrl)
  else if (!findLocale && locale && locale !== 'cs') {
    req.nextUrl.pathname = req.nextUrl.pathname.replace(/\//, '/' + locale + '/')
    return NextResponse.redirect(req.nextUrl)
  }
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.svg|favicon.ico|imgs).*)', '/']
}