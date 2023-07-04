import Head from 'next/head'

const q = () => {
    return (
        <Head>
            <title>TOOL Facts</title>
            <meta name="description" content="Facts about award-winning band Tool" />
            <meta name='keywords' content={`tool, band, award-winning, facts, info, Maynard James Keenan, Jimmy`} />
            <meta name="viewport" content="width=device-width, initial-scale=1" />
            <link rel="icon" href="/favicon.svg" />

            <meta property="og:image" content="/Tool-Logo-2006.png" />
            <meta property="og:description" content={`Facts about award-winning band Tool`} />
            <meta property="og:title" content={`TOOL Facts`} />

            <meta name="twitter:card" content="summary" />
            <meta property="twitter:domain" content="toolfacts.vercel.app" />
            <meta property="twitter:image" content="/Tool-Logo-2006.svg" />
            <meta property='twitter:title' content={`TOOL Facts`} />
            <meta property='twitter:description' content={`Facts about award-winning band Tool`} />
        </Head>
    )
}

export default q