import axios from "axios"
import { useEffect, useState } from "react"
import { Translate } from 'next-translate';
import LinkText from './LinkText';
import Trans from 'next-translate/Trans'
import Link from "next/link";

interface props {
    t: Translate
}

const FactsCount = ({ t }: props) => {
    const [langs, setLangs] = useState({
        factsCS: 0,
        factsEN: 0
    })

    async function getFactsCount() {
        axios({
            method: 'get',
            url: `/api/facts-count`,
        })
            .then(data => {
                console.log(data)
                setLangs(data.data)
            })
            .catch(e => console.error(e))
    }

    useEffect(() => {
        getFactsCount()
    }, [])

    return (
        <div>
            <p className="total-facts">
                <Trans
                    i18nKey="common:total"
                    components={[
                        <LinkText lang='cs' key={'link1'} />,
                        <LinkText lang='en' key={'link2'} />,
                        <span className="count"></span>
                    ]}
                    values={{ cs: langs.factsCS, en: langs.factsEN }}
                />
            </p>
        </div>
    )
}

export default FactsCount