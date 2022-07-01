import Link from 'next/link'
import React, { useState } from 'react'
import Header from '../../components/Header'

import { FcLink } from "react-icons/fc";

const Register = () => {

  const apiURI = process.env.NEXT_PUBLIC_API_URL

  const [registerInfo, setRegisterInfo] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: ''
  })

  const [requestError, setRequestError] = useState('')

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setRequestError('');
    setRegisterInfo({
      ...registerInfo,
      [e.target.name]: [e.target.value]
    })
  }

  const handleRegister = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    e.persist();
    
    let email = registerInfo.email;
    let firstName = registerInfo.firstName;
    let lastName = registerInfo.lastName;
    let password = registerInfo.password;
    let confirmPassword = registerInfo.confirmPassword
    if (password !== confirmPassword) setRequestError('Passwords must match');
    if (!(email && firstName && lastName && password)) setRequestError('All fields are required');


    const response = await fetch(`${apiURI}/register`, {

      method: 'POST',
      headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
      },
      body: JSON.stringify({
          email: email,
          first_name: firstName,
          last_name: lastName,
          password: password
          })
      })
      .catch(() => {
          setRequestError('An Error occured!');
          return
      })

      if (response && response.status == 201) {
        window.location.href = `/app/login`;
        return
    }
    if (response && [400, 409].includes(response.status)) {
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
        <div className='font-bold text-2xl mt-4'>Sign Up and start shortening</div>
       <div>Already have an Account? <Link href='/app/login'><a className='text-indigo-700'>Login</a></Link></div>
      </div>
      <div className="code-preview rounded-xl bg-gradient-to-r bg-white border border-gray-200 dark:border-gray-700 p-2 sm:p-6 dark:bg-gray-800 mx-6 md:m-auto max-w-xl" >
        <form onSubmit={handleRegister} className='m-auto max-w-lg'>
          <div className="relative z-0 w-full mb-6 group">
              <input type="email" onChange={(e) => handleChange(e)} name="email" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required />
              <label htmlFor="email" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Email address</label>
          </div>
          
          <div className="grid md:grid-cols-2 md:gap-6">
            <div className="relative z-0 w-full mb-6 group">
                <input type="text" onChange={(e) => handleChange(e)} name="firstName" id="firstName" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required />
                <label htmlFor="firstName" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">First name</label>
            </div>
            <div className="relative z-0 w-full mb-6 group">
                <input type="text" onChange={(e) => handleChange(e)} name="lastName" id="lastName" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required />
                <label htmlFor="lastName" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Last name</label>
            </div>
          </div>

          <div className="relative z-0 w-full mb-6 group">
            <input type="password" onChange={(e) => handleChange(e)} name="password" id="password" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required />
            <label htmlFor="floating_password" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Password</label>
          </div>
          <div className="relative z-0 w-full mb-2 group">
            <input type="password" onChange={(e) => handleChange(e)} name="confirmPassword" id="confirmPassword" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required />
            <label htmlFor="confirmPassword" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Confirm password</label>
          </div>
          {
              requestError && (
              <p className='rounded-md mb-3 overflow-scroll text-red-400'>
                  {requestError}
              </p>
              )
          }
          
          <button type="submit" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Sign Up</button>
        </form>
      </div>
    </div>
  )
}

export default Register