import { Translate } from "next-translate";
import useTranslation from "next-translate/useTranslation";
import { useRouter } from "next/router";
import React, { ReactNode, createContext, useContext, useEffect, useState } from "react";

const SiteContext = createContext({});

export const SiteProvider = ({ children }: { children: ReactNode }) => {
    const { t: tNav, lang } = useTranslation('nav')
    const router = useRouter()

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