import Nav from "./nav"
import Footer from './footer'
import Menu from '@/components/menu'

import { SiteState } from '@/context'
import { ReactNode } from "react"

const body = ({ children }: { children: ReactNode }) => {
    const { menuOpened, setMenuOpened } = SiteState()

    function closeMenu() {
        if (menuOpened) setMenuOpened(false)
    }

    return (
        <>
            {menuOpened ?
                <div onClick={closeMenu} className="unfocus"></div> : ''
            }
            <div onClick={closeMenu} className={`body ${menuOpened ? 'menu-opened' : ''}`}>
                {children}
            </div>
        </>
    )
}

export default body