import useTranslation from "next-translate/useTranslation";
import { NextRouter, useRouter } from "next/router";
import React, { ReactNode, createContext, useContext } from "react";

const SiteContext = createContext({});

export const SiteProvider = ({ children }: { children: ReactNode }) => {
    const { t: tNav, lang } = useTranslation('nav')
    const router: NextRouter = useRouter()

    return (
        <SiteContext.Provider
            value={{
                tNav,
                lang,
                router
            }}
        >
            {children}
        </SiteContext.Provider>
    );
};

export const SiteState = () => {
    return useContext(SiteContext);
};