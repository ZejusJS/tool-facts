import { GetServerSideProps } from 'next/types'
import EditFact from '../../components/edit'
import { useRouter } from 'next/router'

interface props {
    facts: Array<object>
}

const index = ({ facts }: props) => {
    const router = useRouter()

    function changeShow(show: boolean) {
        router.replace({ pathname: router.basePath, query: { show } })
    }

    return (
        <main className='fact-edit'>
            <button
                type='button'
                onClick={() => changeShow(true)}
            >
                Show
            </button>
            <button
                type='button'
                onClick={() => changeShow(false)}
            >
                Hidden
            </button>
            {
                facts.map((fact: any) => {
                    return (
                        <EditFact
                            key={fact._id}
                            factFetch={fact}
                        />
                    )
                })
            }

        </main>
    )
}

export const getServerSideProps: GetServerSideProps = async ({ req, query }) => {
    if (!query?.show?.length) query.show === 'true'

    const res = await fetch(`${process.env.NEXT_PUBLIC_FRONTEND}/api/edit-facts?show=${query.show}`, {
        method: 'get',
        headers: {
            "Content-Type": "application/json",
            "cookie": String(req.headers.cookie)
        },
        credentials: 'include'
    })
    const data = await res.json()

    if (!data?.success) {
        return {
            redirect: {
                destination: '/',
            },
            props: {

            }
        }
    }

    return {
        props: {
            facts: data.facts
        }
    }
}

export default index