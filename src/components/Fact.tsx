import axios from "axios"
import useTranslation from "next-translate/useTranslation"
import { ChangeEvent, Dispatch, RefObject, SetStateAction, useEffect, useRef, useState } from "react"
import Share from '../svg/Share'
import { funcShuffleFacts, getLengthLongestFact } from "@/utils/fact/func"
import BackSvg from "@/svg/Back"
import SvgWrenchNut from '@/svg/WrenchNutSvg'
import useLocalStorage from "use-local-storage";
import FactOptions from "./FactOptions"

const minFactLength = 60
const maxFactLength = 2800

export interface IOptionsProps {
    isSettingsOpened: boolean;
    maxFactLengthStorage: string;
    changeFactLength2(e: ChangeEvent<HTMLInputElement>): void;
    changeFactLength(e: ChangeEvent<HTMLInputElement>): void;
    max: number
    min: number
    fetchedFacts: IFact[]
    facts: IFact[]
    setIsSettingsOpened: Dispatch<SetStateAction<boolean>>
}

const Fact = () => {
    const { t, lang } = useTranslation('common')

    const [fact, setFact] = useState({ fact: '', id: '' })
    const [facts, setFacts] = useState<IFact[]>([])
    const [fetchedFacts, setFetchedFacts] = useState<IFact[]>([])
    const [loadingFact, setLoadingFact] = useState(true)
    const [isSettingsOpened, setIsSettingsOpened] = useState(false)
    const [maxFactLengthStorage, setMaxFactLengthStorage] = useLocalStorage<string>("max-fact-length", `${maxFactLength}`);

    const eyeRef: RefObject<HTMLImageElement> = useRef(null)

    const factsCount = useRef(1)

    useEffect(() => {

        setLoadingFact(true)

        axios({
            method: 'get',
            url: `/api/all-facts/${lang}`,
            onDownloadProgress(progressEvent) {
                setTimeout(() => {
                    setLoadingFact(false)
                }, 300);
            },
        })
            .then(data => {
                data.data.facts = data.data.facts.map((f: any) => {
                    f['fact'] = f[lang]
                    delete f[lang]
                    return f
                })
                setTimeout(() => {
                    let shuffledFacts = funcShuffleFacts(data.data.facts, Number(maxFactLengthStorage))
                    setFacts(shuffledFacts)
                    setFetchedFacts(data.data.facts)
                    setFact(shuffledFacts[0])
                    factsCount.current = 1
                }, 200);
            })
            .catch(e => console.error(e))
    }, [lang])

    function nextFact() {
        if (facts.length) {
            setFact(facts[factsCount.current])

            factsCount.current = factsCount.current + 1

            if (factsCount.current >= facts.length) {
                shuffleFacts()
            }
        }
    }

    function prevFact() {
        if (facts.length && factsCount.current > 1) {
            setFact(facts[factsCount.current - 2])

            factsCount.current = factsCount.current - 1
        }
    }

    function shuffleFacts() {
        setFacts(function (prev: IFact[]): IFact[] {
            return [...prev, ...funcShuffleFacts(fetchedFacts, Number(maxFactLengthStorage))]
        })
    }

    function changeFactLength(e: ChangeEvent<HTMLInputElement>) {
        let value = Math.max(minFactLength, Math.min(maxFactLength, Number(e.target.value)));
        setMaxFactLengthStorage(String(value))
    }

    function changeFactLength2(e: ChangeEvent<HTMLInputElement>) {
        setMaxFactLengthStorage(e.target.value)
    }

    function isSettingsDefault() {
        return getLengthLongestFact(fetchedFacts) <= Number(maxFactLengthStorage)
    }

    useEffect(() => {
        let value = Math.max(minFactLength, Math.min(maxFactLength, Number(maxFactLengthStorage)));

        let newFacts = funcShuffleFacts(fetchedFacts, value)
        setFacts(newFacts)
        setFact(newFacts[0])
        factsCount.current = 1
    }, [maxFactLengthStorage])


    const [isUrlCopied, setIsUrlCopied] = useState(false)

    function copyFactUrl() {
        if (navigator?.clipboard) {
            navigator.clipboard.writeText(window.location.origin + '/fact/' + fact.id)

            setIsUrlCopied(true)
            setTimeout(() => {
                setIsUrlCopied(false)
            }, 3000);
        }
    }

    return (
        <div className='fact' onClick={() => setIsSettingsOpened(false)}>
            <div className='fact-wrapper'>
                <h3 className='did-you-know'>
                    {t('did-you-know')}
                </h3>
                <div className={`fact-text-wrapper ${isSettingsOpened ? 'settings-opened' : ''}`}>
                    <FactOptions
                        isSettingsOpened={isSettingsOpened}
                        maxFactLengthStorage={maxFactLengthStorage}
                        changeFactLength2={changeFactLength2}
                        changeFactLength={changeFactLength}
                        max={maxFactLength}
                        min={minFactLength}
                        fetchedFacts={fetchedFacts}
                        facts={facts}
                        setIsSettingsOpened={setIsSettingsOpened}
                    />
                    <p
                        className={`fact-text ${isSettingsOpened ? 'unfocused' : ''} ${loadingFact ? 'hidden' : ''}`}
                        aria-hidden={!loadingFact && isSettingsOpened}
                    >
                        {fact?.fact}
                    </p>
                </div>
                <img
                    ref={eyeRef}
                    className={loadingFact ? '' : 'hidden'}
                    aria-hidden={loadingFact}
                    src="https://media.tenor.com/KLg7XjZkDpsAAAAi/tool-eye.gif" alt=""
                />
                {
                    fact?.id ?
                        <div className={`share-con ${isUrlCopied ? 'copy' : ''}`}>
                            <span className="copied">{t('url-copy')}</span>
                            <button
                                title="Share this fact"
                                className={`share ${isUrlCopied ? 'copy' : ''}`}
                                type="button"
                                onClick={copyFactUrl}
                            >
                                <Share />
                            </button>
                        </div>
                        : ''
                }
            </div>
            <div
                className="buttons-con"
            >
                <button
                    className="previous-fact btn-fact"
                    onClick={prevFact}
                    type='button'
                    title={t('prev-fact')}
                >
                    <BackSvg />
                </button>
                <button
                    type='button'
                    className='next-fact btn-fact'
                    onClick={nextFact}
                >
                    {t('next-fact')}
                </button>
                <button
                    className="options btn-fact"
                    title={t('settings.open')}
                    type='button'
                    onClick={(e) => { e.stopPropagation(); setIsSettingsOpened(prev => !prev) }}
                >
                    <SvgWrenchNut
                        isSettingsOpened={isSettingsOpened}
                        isSettingsDefault={isSettingsDefault()}
                    />
                </button>
            </div>
        </div>
    )
}

export default Fact