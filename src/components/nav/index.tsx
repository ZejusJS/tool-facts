import { useEffect, useRef, useState, useTransition } from "react";
import Lang from "./Lang"
import { SiteState } from '@/context'
import Link from "next/link";
import HamburgerSvg from '../../svg/HamburgerMenu'
import useTranslation from "next-translate/useTranslation";

const index = () => {
    const { menuOpened, setMenuOpened } = SiteState()
    const {t} = useTranslation('nav')

    let defaultTop = -60
    let maxTop = 0
    const [lastScrollY, setLastScrollY] = useState(0)
    const [calculated, setCalculated] = useState<number>(defaultTop)

    const navRef = useRef<HTMLDivElement | null>(null)

    const controlNavbar = () => {
        if (typeof window !== 'undefined' && navRef.current != null) {
            setCalculated(prev => {
                prev = prev - (Number(window.scrollY) - Number(lastScrollY))
                if (prev < defaultTop) prev = defaultTop
                else if (prev > maxTop) prev = maxTop
                return prev
            })
            navRef.current.style.top = String(calculated) + 'px'

            if (window.scrollY < 40) {
                setCalculated(maxTop)
                navRef.current.style.top = maxTop + "px"
            }

            setLastScrollY(window.scrollY);
        }
    };

    useEffect(() => {
        if (typeof window !== 'undefined') {
            window.addEventListener('scroll', controlNavbar);

            // cleanup function
            return () => {
                window.removeEventListener('scroll', controlNavbar);
            };
        }
    }, [lastScrollY]);

    return (
        <nav
            ref={navRef}
            role="navigation"
            className={menuOpened ? 'menu-opened' : ''}
        >
            <div className="nav-con">
                <div className="ham-con">
                    <button
                    aria-label="Open the menu" 
                    title='Open the menu'
                    type="button"
                    aria-expanded={`${menuOpened}`}
                    onClick={() => setMenuOpened(prev => !prev)}
                    >
                        <HamburgerSvg />
                    </button>
                </div>
                <Link href={'/'}>
                    <h1>
                        {t('title')}
                    </h1>
                </Link>
                <Lang  />
            </div>
        </nav>
    )
}

export default index