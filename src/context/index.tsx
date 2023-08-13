import useTranslation from "next-translate/useTranslation";
import { NextRouter, useRouter } from "next/router";
import React, { Dispatch, ReactNode, createContext, useContext, useEffect, useState } from "react";

interface IThemeContext {
    menuOpened: boolean
    setMenuOpened: Dispatch<React.SetStateAction<boolean>>
    lang: string
    router: any
}

const SiteContext = createContext<IThemeContext>({
    menuOpened: false,
    setMenuOpened: function (value: React.SetStateAction<boolean>): void {
        console.error('function error');
    },
    lang: "",
    router: ''
});

export const SiteProvider = ({ children }: { children: ReactNode }) => {
    const { lang } = useTranslation('nav')
    const router: NextRouter = useRouter()
    const [menuOpened, setMenuOpened] = useState(false);

    useEffect(() => {
        if (menuOpened) {
            document.body.classList.add('menu-opened')
        } else {
            document.body.classList.remove('menu-opened')
        }
    }, [menuOpened])

    useEffect(() => {
        if (menuOpened) {
            setMenuOpened(false);
        }
    }, [router]);

    return (
        <SiteContext.Provider
            value={{
                lang,
                router,
                menuOpened,
                setMenuOpened
            }}
        >
            {children}
        </SiteContext.Provider>
    );
};

export const SiteState = () => {
    return useContext(SiteContext);
};