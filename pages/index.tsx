import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import Header from '../components/Header'
import Landing from '../components/Landing'


const Home: NextPage = () => {
  return (
    <div className="bg-[url('/bground.jpg')] bg-cover bg-repeat h-screen">
      <Head>
        <title>urrl</title>
      </Head>

      <Header/>

      <Landing/>
      {/* <div className='top-30 h-80 ml-8'>
        Hey there
      </div>
      <div className='top-30 h-80 ml-40 mr-40'>
        yo
      </div> */}

    </div>
  )
}

export default Home
