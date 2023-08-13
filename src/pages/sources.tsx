import useTranslation from "next-translate/useTranslation"

const sources = () => {
    const {t} = useTranslation("sources");

    const links = [
        "https://www.twitch.tv/agraelus",
        "https://loudwire.com/tool-aenima-facts",
        "https://www.ranker.com/list/tool-band-facts/inigo-gonzalez",
        "https://www.ultimate-guitar.com/articles/features/10_facts_about_tool-69251",
        "https://guitar.com/features/artist-rigs/7-facts-about-tool",
        "https://www.loudersound.com/features/10-things-we-learned-from-maynard-james-keenans-biography",
        "https://www.samwoolfe.com/2013/03/interesting-facts-about-tools-music.html",
    ]

    return (
        <main>
            <section className="links-list">
                <h2>{t('title')}</h2>
                <ul>
                    {links.map(link => {
                        return (
                            <li>
                                <a href={link} target="_blank">
                                    {link.replace(/(https?:\/\/)|(www\.)/g, '')}
                                </a>
                            </li>
                        )
                    })}
                </ul>
            </section>
        </main>
    )
}

export default sources