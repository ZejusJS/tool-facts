import { RefObject, useEffect, useRef, useState } from "react";
import Lang from "./Lang"
import { SiteState } from '@/context'
import Link from "next/link";

const index = () => {
    const { tNav: t, lang, router }: typeof SiteState.arguments = SiteState()

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
        >
            <div className="nav-con">
                <Link href={'/'}>
                    <h1>
                        {t('title')}
                    </h1>
                </Link>
                <Lang />
            </div>
        </nav>
    )
}

export default index