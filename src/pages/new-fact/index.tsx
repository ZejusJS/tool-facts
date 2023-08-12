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
  if (!(req.cookies['fact_session'] === process.env.FACT_SECRET)) {
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