import useTranslation from 'next-translate/useTranslation'
import Head from 'next/head'

const q = () => {
    const { t } = useTranslation("meta")

    return (
        <Head>
            <title>{t('title')}</title>
            <meta name="description" content="Facts about award-winning band Tool" />
            <meta name='keywords' content={t('keywords')} />
            <meta name="viewport" content="width=device-width, initial-scale=1" />
            <link rel="icon" href="/favicon.svg" />

            <meta property="og:image" content="https://i.imgur.com/YUTgv1Q.jpg" />
            <meta property="og:description" content="Facts about award-winning band Tool" />
            <meta property="og:title" content={t('title')} />

            <meta name="twitter:card" content="summary" />
            <meta property="twitter:domain" content="toolfacts.vercel.app" />
            <meta property="twitter:image" content="https://i.imgur.com/YUTgv1Q.jpg" />
            <meta property='twitter:title' content={t('title')} />
            <meta property='twitter:description' content="Facts about award-winning band Tool" />
        </Head>
    )
}

export default q