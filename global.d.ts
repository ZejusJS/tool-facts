namespace NodeJS {
    interface ProcessEnv {
        NODE_ENV: string;
        MONGODB_URI: string;
        MAX_FACT_LENGTH: number;
        MAX_USERNAME_LENGTH: number;
        NEXT_PUBLIC_CAPTCHA_SITE: string;
        CATPCHA_SECRET: string;
        FACT_PASSWORD: string;
        FACT_USERNAME: string;
        FACT_SECRET: string;
        NEXT_PUBLIC_FRONTEND: string;
        NEXT_PUBLIC_DEFAULT_LOCALE: string;
    }
}