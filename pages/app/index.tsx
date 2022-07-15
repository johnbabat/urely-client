import type { NextPage } from 'next'
import Head from 'next/head'
import Header from '../../components/Header'
import Landing from '../../components/Landing'
import UserLanding from '../../components/UserLanding'
import { useDataLayerValue } from '../../context/userContext'

const Home: NextPage = () => {

  const [{ user }, dispatch] = useDataLayerValue()
  
  return (
    <div className="bg-[url('/bground.jpg')] bg-cover bg-repeat h-screen">
      <Head>
        <title>urrl</title>
      </Head>
      <Header/>
      { user ? <UserLanding/> : <Landing/> }
    </div>
  )
}

export default Home
