import axios from 'axios'
import useTranslation from 'next-translate/useTranslation'
import { ChangeEvent, FormEventHandler, useState } from 'react'
import { FormEvent } from "react";

import FindFactCom from '@/components/FindFact';

import EyeSvg from '@/svg/Eye'

const FindFact = () => {
    const { t, lang } = useTranslation('find')
    const [findQuery, setFindQuery] = useState('')
    const [facts, setFacts] = useState([])
    const [loading, setLoading] = useState(false)

    function findFact(e: FormEvent) {
        setLoading(true)
        e.preventDefault()

        const querySplit = findQuery.split(' ').map(q => {
            return '"' + q + '"'
        }).toString()

        axios({
            url: "/api/find-fact",
            params: {
                query: querySplit,
                lng: lang,
                formatted: true
            },
            method: "get",
            onDownloadProgress(progressEvent) {
                setTimeout(() => {
                    setLoading(false)
                }, 100);
            },
        })
            .then(data => setFacts(data.data.facts))
            .catch(e => console.error(e))
    }

    function changeQuery(e: ChangeEvent<HTMLInputElement>) {
        setFindQuery(e.target.value)
    }

    return (
        <main className="find-fact-main">
            <section className='find-sec'>
                <form className='query-find-form' onSubmit={findFact}>
                    <div className='query-block'>
                        <input
                            id='find-query'
                            type="text"
                            placeholder={t("placeholder-find")}
                            onChange={changeQuery}
                            value={findQuery}
                        />
                        <button
                            type='submit'
                            className='query-submit'
                            role='search'
                            title={t('search')}
                        >
                            <EyeSvg />
                        </button>
                    </div>
                </form>
            </section>
            <section className='facts-sec'>
                {
                    <div className={`facts-con ${loading ? 'loading' : ''}`}>
                        <div className='loader'>
                            <img
                                className="eye-spinner"
                                src="https://media.tenor.com/KLg7XjZkDpsAAAAi/tool-eye.gif" alt="loading content"
                            />
                        </div>
                        {facts?.length ?
                            <section className='facts-list'>
                                {facts?.map(function (fact: any) {
                                    return (
                                        <>
                                            <FindFactCom text={fact?.cs || fact?.en} id={fact?.id} />
                                        </>
                                    )
                                })}
                            </section> : ''}
                    </div>
                }
            </section>
        </main>
    )
}

export default FindFact