import { GetServerSideProps } from 'next/types'
import EditFact from '../../components/edit'

interface props {
    facts: Array<object>
}

const index = ({ facts }: props) => {

    return (
        <main className='fact-edit'>

            {
                facts.map((fact: any) => {
                    return (
                        <EditFact
                            fact={fact}
                        />
                    )
                })
            }

        </main>
    )
}

export const getServerSideProps: GetServerSideProps = async ({ req }) => {
    const res = await fetch(`${process.env.FRONTEND}/api/edit-facts`, {
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