import type { NextPage } from 'next';
import { useEffect } from 'react';

const Home: NextPage = () => {
  useEffect(() => {
    window.location.href = 'app/'
  }, [])
  
  return (
    <></>
  )
}

export default Home
