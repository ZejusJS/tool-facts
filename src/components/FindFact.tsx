import useTranslation from "next-translate/useTranslation"

interface IFact {
    text: string
    id: string

}

// to-do: link to fact

const FindFact = ({ text, id }: IFact) => {
    const { t, lang } = useTranslation('common')
    
    return (
        <div className="fact">
            <h3>{t('did-you-know')}</h3>
            <p className="fact-text">
                {text}
            </p>
        </div>
    )
}

export default FindFact