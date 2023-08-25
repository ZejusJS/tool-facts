import useTranslation from 'next-translate/useTranslation'
import { getLongestFactForRange, funcShuffleFacts } from "@/utils/fact/func"
import SvgClose from '@/svg/SvgClose'

const FactOptions = ({
    isSettingsOpened,
    setIsSettingsOpened,
    maxFactLengthStorage,
    changeFactLength2,
    changeFactLength,
    max,
    min,
    fetchedFacts,
    facts
}: any) => {
    const { t } = useTranslation('common')

    return (
        <div
            onClick={(e) => e.stopPropagation()}
            className={`options-wrap ${isSettingsOpened ? 'focused' : ''}`}
            aria-hidden={!isSettingsOpened}
        >
            <button
                title={t('settings.close')}
                className='close'
                type='button'
                onClick={() => setIsSettingsOpened(false)}
            >
                <SvgClose />
            </button>
            <div className="options">
                <h6>{t('settings.title')}</h6>
                <p className="total-match">
                    {t('settings.total')}
                    &nbsp;
                    <span>
                        {funcShuffleFacts(fetchedFacts, maxFactLengthStorage).length}
                    </span>
                </p>
                <div className="block">
                    <label
                        htmlFor="fact-length"
                    >
                        {t('settings.fact-length')}
                    </label>
                    <input
                        id="fact-length"
                        type="number"
                        disabled={!isSettingsOpened}
                        value={maxFactLengthStorage}
                        onChange={changeFactLength2}
                        onBlur={changeFactLength}
                        max={max}
                        min={min}
                        placeholder={`${min}-${max}`}
                    />
                    <input
                        type="range"
                        disabled={!isSettingsOpened}
                        min={min}
                        max={getLongestFactForRange(fetchedFacts) || max}
                        step="30"
                        value={maxFactLengthStorage}
                        onChange={changeFactLength}
                        className="range-slider-red"
                    />
                </div>
            </div>
        </div>
    )
}

export default FactOptions