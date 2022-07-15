import React, { useEffect, useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/router';

import Header from '../../components/Header'

import { FcLink } from "react-icons/fc";
import { login } from '../../utils/login';
import { useDataLayerValue } from '../../context/userContext';

const Login = () => {
  console.log('LOGIN HEre')

  const apiURI = process.env.NEXT_PUBLIC_API_URL
  const router = useRouter();

  const [{ user }, dispatch] = useDataLayerValue()


  const [loginInfo, setLoginInfo] = useState({
    email: '',
    password: ''
  })

  const [requestError, setRequestError] = useState('')

  useEffect(() => {
    user && router.push('/app')
  }, [user])
  

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setRequestError('');
    setLoginInfo({
      ...loginInfo,
      [e.target.name]: e.target.value
    })
  }

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    e.persist();
    
    let email = loginInfo.email;
    let password = loginInfo.password
    if (!(email && password)) setRequestError('Email and Password fields are required')

    const response = await login(email, password);

    if (response && response.status == 200) {
      const responseData = await response.json();
      localStorage.setItem('urrlUser', JSON.stringify(responseData))
      dispatch({
        type: 'LOGIN',
        payload: responseData
      })

      // router.push('/app')
      // window.location.href = `/app`;
      return
    }
    if (response && [400, 401].includes(response.status)) {
        const responseData = await response.json();
        setRequestError(responseData.error);
        return
    }
    setRequestError('An error occured!');
  }

  return (
    <div className="bg-[url('/bground.jpg')] bg-cover bg-repeat h-screen">
      <Header/>
      <div className='text-center mt-24 mb-6 md:mt-28 md:mb-8 p-1'>
        <div className='m-auto h-16 w-16 md:h-24 md:w-24 flex bg-slate-700 rounded-2xl md:rounded-3xl shadow-md shadow-blue-400'><FcLink className='m-auto h-8 w-8 md:h-16 md:w-16' /></div>
        <div className='font-bold text-2xl mt-4'>Welcome Back</div>
        <div>Don&#39;t Have an Account? <Link href='/app/register'><a className='text-indigo-700'>Sign Up</a></Link></div>
      </div>
      <div className="code-preview rounded-xl bg-gradient-to-r bg-white border border-gray-200 dark:border-gray-700 p-2 sm:p-6 dark:bg-gray-800 mx-6 md:m-auto max-w-xl" >
        <form onSubmit={handleLogin} className='m-auto max-w-lg'>
          <div className="relative z-0 w-full mb-6 group">
              <input type="email" onChange={(e) => handleChange(e)} name="email" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required />
              <label htmlFor="email" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Email address</label>
          </div>

          <div className="relative z-0 w-full mb-2 group">
            <input type="password" onChange={(e) => handleChange(e)} name="password" id="password" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required />
            <label htmlFor="password" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Password</label>
          </div>
          {
              requestError && (
              <p className='rounded-md mb-2 overflow-scroll mt-1 text-red-400'>
                  {requestError}
              </p>
              )
          }
          <Link href='/app/reset'><a className="ml-auto text-sm text-blue-700 dark:text-blue-500">Lost Password?</a></Link>
          
          <button type="submit" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 block mt-4">Log In</button>
        </form>
      </div>
    </div>
  )
}

export default Login