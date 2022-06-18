import React from 'react'

const Landing = () => {
  return (
    <div className='grid grid-cols-1 md:grid-cols-2 top-44 md:top-1/4 absolute w-full'>
      <div className='ml-3 mt-12 md:ml-12 lg:ml-52 2xl:ml-112 text-5xl font-bold'>
        <div className='text-xl'>Welcome to</div>
        <div>URELY</div>
        <div className='mb-6 text-2xl'>Give us a link to make magic</div>
      </div>
      <div className='ml-3 mr-3 max-w-sm'>
        <div className="code-preview rounded-xl bg-gradient-to-r bg-white border border-gray-200 dark:border-gray-700 p-2 sm:p-6 dark:bg-gray-800">
          <div className="mb-6">
            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">Enter your url</label>
            <input type="text" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"/>
          </div>
          <div className="flex mb-6">
            <span className="inline-flex items-center px-3 text-sm text-gray-900 bg-gray-200 border border-r-0 border-gray-300 rounded-l-md dark:bg-gray-600 dark:text-gray-400 dark:border-gray-600">
              urely.com/
            </span>
            <input type="text" className="rounded-none rounded-r-lg bg-gray-50 border border-gray-300 text-gray-900 focus:ring-blue-500 focus:border-blue-500 block flex-1 min-w-0 w-full text-sm p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="your alias here"/>
          </div>
          <label className="relative inline-flex items-center mb-4 cursor-pointer">
          <input type="checkbox" value="" className="sr-only peer"/>
          <div className="w-8 h-4 bg-gray-200 rounded-full peer peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
          <span className="ml-3 text-sm font-medium text-gray-900 dark:text-gray-300">Reserve generated alias</span>
        </label>
        </div>
      </div>
        
    </div>
  )
}

export default Landing