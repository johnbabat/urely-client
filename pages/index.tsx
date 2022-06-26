import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import Header from '../components/Header'
import Landing from '../components/Landing'

import { useState } from 'react'
import UserLanding from '../components/UserLanding'

interface user {
  name: string
}

const Home: NextPage = () => {

  const me = {
    name: 'John'
  }

  const [user, setUser] = useState<user | null>(me);
  
  return (
    <div className="bg-[url('/bground.jpg')] bg-cover bg-repeat h-screen">
      <Head>
        <title>urrl</title>
      </Head>
      <Header/>
      {
        user ? 
        < Landing /> 
        : 
        <Landing/>
      }
    </div>
  )
}

export default Home
