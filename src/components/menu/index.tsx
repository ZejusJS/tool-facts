import Link from 'next/link'
import { SiteState } from '@/context'
import BackSvg from '@/svg/Back'
import Lang from '@/components/nav/Lang'
import useTranslation from 'next-translate/useTranslation'

const index = () => {
    const { t } = useTranslation('menu');
    const { menuOpened, setMenuOpened } = SiteState()

    return (
        <div role='navigation' aria-expanded={`${menuOpened}`} className={`menu ${menuOpened ? 'opened' : ''}`}>
            <div className='menu-con'>
                <div className='menu-header'>
                    <button
                        aria-label="Close the menu"
                        title='Close the menu'
                        type='button'
                        className='back-btn'
                        onClick={() => setMenuOpened(prev => !prev)}
                    >
                        <BackSvg />
                    </button>
                    <Lang />
                </div>
                <div className='menu-blocks'>
                    <div className='menu-block link'>
                        <Link href='/'>
                            <span className='link-text'>{t('links.home')}</span>
                            <span className='link-tip'>
                                {t('links.home-tip')}
                            </span>
                        </Link>
                    </div>
                    <div className='menu-block link'>
                        <Link href='/sources'>
                            <span className='link-text'>{t('links.sources')}</span>
                            <span className='link-tip'>
                                {t('links.sources-tip')}
                            </span>
                        </Link>
                    </div>
                    <div className='menu-block'>
                        <p className='more-coming'>{t('more')}</p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default index