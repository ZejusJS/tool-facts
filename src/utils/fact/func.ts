export function funcShuffleFacts(facts: IFact[], maxFactLength?: number): IFact[] {
    let array = facts
    let i = array.length
    let j, temp

    while (--i > 0) {
        j = Math.floor(Math.random() * (i + 1))
        temp = array[j]
        array[j] = array[i]
        array[i] = temp
    }

    if (maxFactLength) {
        array = array.filter(el => el.fact.length <= maxFactLength)
    }

    return array
}

export function getLengthLongestFact(facts: IFact[]): number {
    let longest: IFact = {
        id: "",
        fact: ""
    }

    facts.map(fact => fact?.fact?.length > longest?.fact?.length ? longest = fact : '')

    return longest.fact.length - (longest.fact.length % 30) + 30
}