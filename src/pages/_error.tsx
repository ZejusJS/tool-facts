import useTranslation from 'next-translate/useTranslation'
import Link from 'next/link'
import { NextPageContext } from 'next/types'
import { useState } from 'react'

let imgs = [
    "https://res.cloudinary.com/djlseprqx/image/upload/v1688806239/random/tool1_dhcsbl.webp",
    "https://res.cloudinary.com/djlseprqx/image/upload/v1688806239/random/tool5_tssrwj.webp",
    "https://res.cloudinary.com/djlseprqx/image/upload/v1688806239/random/tool7_raz6eg.webp",
    "https://res.cloudinary.com/djlseprqx/image/upload/v1688806239/random/tool6_bqo5gi.webp",
    "https://res.cloudinary.com/djlseprqx/image/upload/v1688806240/random/tool2_yf6zal.webp",
    "https://res.cloudinary.com/djlseprqx/image/upload/v1688806241/random/tool3_liylvp.webp",
    "https://res.cloudinary.com/djlseprqx/image/upload/v1688806250/random/tool4_v7hdyp.webp",
    "https://res.cloudinary.com/djlseprqx/image/upload/v1688806603/random/tool9_nh3rmy.webp",
    "https://i.imgur.com/emdfek5.png",
    "https://res.cloudinary.com/djlseprqx/image/upload/v1688806188/random/tool0.webp",
    "https://res.cloudinary.com/djlseprqx/image/upload/v1688806238/random/tool8_bqvj8y.webp",
    "https://i.imgur.com/R6a6ape.jpg",
]

function Error({ statusCode }: { statusCode: number }) {
    const { t } = useTranslation('error')
    const [randomNum, setRandomNum] = useState(-1);

    function Image() {
        if (randomNum < 0) setRandomNum(Math.floor(Math.random() * (imgs.length - 1)))
        return (
            <img src={imgs[randomNum]} alt="Tool Image" />
        )
    }

    return (
        <main className='error'>
            {
                statusCode === 404 ?
                    <section className='error-page not-found'>
                        <h3>{t('not-found')}</h3>
                        <Image />
                        <Link className='back' href='/' shallow={false} prefetch={false}>
                            {t('home')}
                        </Link>
                    </section>
                    :
                    <section className='error-page'>
                        <h3>{t('wrong')}</h3>
                        <Image />
                        <h4>Code: <span>{statusCode}</span></h4>
                        <Link className='back' href='/' shallow={false} prefetch={false}>
                            {t('home')}
                        </Link>
                    </section>
            }
        </main>
    )
}

export const getStaticProps = function ({ res, err }: NextPageContext) {
    const statusCode = res ? res.statusCode : err ? err.statusCode : 404
    return { props: { statusCode } }
}

export default Error