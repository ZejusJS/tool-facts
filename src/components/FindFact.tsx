import useTranslation from "next-translate/useTranslation"
import { useState } from "react"
import Share from '../svg/Share'

interface IFact {
    text: string
    id: string
}

// to-do: link to fact

const FindFact = ({ text, id }: IFact) => {
    const { t, lang } = useTranslation('common')
    const { t: tF } = useTranslation('find')

    const [isUrlCopied, setIsUrlCopied] = useState(false)

    function copyFactUrl() {
        if (navigator?.clipboard) {
            navigator.clipboard.writeText(window.location.origin + '/fact/' + id)

            setIsUrlCopied(true)
            setTimeout(() => {
                setIsUrlCopied(false)
            }, 1600);
        }
    }

    return (
        <div className="fact">
            <div className="header">
                <h3>{t('did-you-know')}</h3>
                <div className="share-con">
                    <button
                        title="Share this fact"
                        className={`share ${isUrlCopied ? 'copy' : ''}`}
                        type="button"
                        onClick={copyFactUrl}
                    >
                        <Share />
                    </button>
                    <span className={`copy-text ${isUrlCopied ? 'copy' : ''}`}>
                        {tF('url-copied')}
                    </span>
                </div>
            </div>
            <p className="fact-text">
                {text}
            </p>
        </div>
    )
}

export default FindFact