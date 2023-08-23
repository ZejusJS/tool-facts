import axios from 'axios'
import useTranslation from 'next-translate/useTranslation'
import { ChangeEvent, FormEventHandler, useState } from 'react'
import { FormEvent } from "react";

import EyeSvg from '@/svg/Eye'

const FindFact = () => {
    const { t, lang } = useTranslation('find')
    const [findQuery, setFindQuery] = useState('')
    const [facts, setFacts] = useState([])

    function findFact(e: FormEvent) {
        e.preventDefault()

        axios({
            url: "/api/find-fact",
            params: {
                query: findQuery,
                lng: lang.slice(4)
            },
            method: "get"
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
                            placeholder="Find fact"
                            onChange={changeQuery}
                            value={findQuery}
                        />
                        <button
                            type='submit'
                            className='query-submit'
                        >
                            <EyeSvg />
                        </button>
                    </div>
                </form>
            </section>
            <section className='facts-sec'>

            </section>
        </main>
    )
}

export default FindFact