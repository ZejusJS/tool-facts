import FactForm from '@/components/FactForm'
import { GetServerSideProps } from 'next/types'

const index = () => {
  return (
    <main>
        <FactForm />
    </main>
  )
}

export const getServerSideProps: GetServerSideProps = async ({ req, query }) => {
  if (process.env.NODE_ENV !== 'development') {
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
        
    }
}
}

export default index