interface IFact {
    text: string
    id: string

}

const FindFact = ({ text, id }: IFact) => {
    return (
        <div className="fact">
            <p className="fact-text">
                {text}
            </p>
        </div>
    )
}

export default FindFact