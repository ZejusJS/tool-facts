import useTranslation from "next-translate/useTranslation"

const About = () => {
    const { t } = useTranslation('about')

    return (
        <div className="about">
            <div className="info-con">
                <p className="find">{t('find')}</p>
                <div className="links">
                    <a title={t('YTmusic')} href="https://music.youtube.com/channel/UCW6FSIkA04g7pBvMXlnaKqg?feature=share" target="_blank">
                        <img src="https://i.imgur.com/8rvf2Cl.png" alt="YouTube Music" />
                    </a>
                    <a title={t('spotify')} href="https://open.spotify.com/artist/2yEwvVSSSUkcLeSTNyHKh8?si=CIcPA4p2Q1W5WRPdf4F2Zw" target="_blank">
                        <img className="spotify" src="https://i.imgur.com/U9NkIz7.png" alt="Spotify" />
                    </a>
                </div>
            </div>
        </div>
    )
}

export default About