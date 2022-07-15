import type { NextPage } from 'next';
import { useEffect } from 'react';


// TODO: Notification when are user shares document with you
// TODO: See all documents shared with you
// TODO: Paginate the urls
// TODO: Follow people and see all non private info
// TODO: Allow users select line chart x axis scale - months, years or days
// TODO: Dark mode
// TODO: Sort documents and urls by last edit, date created or title/alias
// TODO: Sessions - https://gist.github.com/bagaswidodo/6e15c301a312c45459eb8dd2a4172dcb#file-clever2-L1
// TODO: Switch to axios - https://youtube.com/watch?v=nI8PYZNFtac


const Home: NextPage = () => {
  useEffect(() => {
    window.location.href = 'app/'
  }, [])
  
  return (
    <></>
  )
}

export default Home
