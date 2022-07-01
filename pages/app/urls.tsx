import React, { useState } from 'react';
import StackedChart from '../../components/charts/StackedChart';
import { GoPrimitiveDot, GoLink } from 'react-icons/go';
import { RiDeleteBin6Line } from 'react-icons/ri';
import Link from 'next/link';

// TODO: Paginate the urls.

const urls = () => {

    const [myurls, setMyurls] = useState([
        {
            id: "1",
            short_url: 'urrl.link/j8snfbf',
            alias: 'j8snfbf',
            long_url: 'https://google.com/jhvgghbjhbghvf',
            private: true
        },
        {
            id: "2",
            short_url: 'urrl.link/9fnfbf5',
            alias: '9fnfbf5',
            long_url: 'https://google.com',
            private: true
        },
        {
            id: "3",
            short_url: 'urrl.link/oA78cHY',
            alias: 'oA78cHY',
            long_url: 'https://google.com',
            private: false
        },
        {
            id: "4",
            short_url: 'urrl.link/j8sLsLL',
            alias: 'j8sLsLL',
            long_url: 'https://google.com',
            private: true
        },
        {
            id: "6",
            short_url: 'urrl.link/pYsnfbfH',
            alias: 'pYsnfbfH',
            long_url: 'https://google.com',
            private: false
        },
        {
            id: "7",
            short_url: 'urrl.link/k9syeUs',
            alias: 'k9syeUs',
            long_url: 'https://google.com',
            private: false
        }
    ])

    const [urlFilter, setUrlFilter] = useState('');

    const [removeUrl, setRemoveUrl] = useState('');

    const confirmDelete = (urlId: string) => {
        setMyurls(prevState => prevState.filter(url => url.id != urlId))
    }

    const filterUrls = (e: React.ChangeEvent<HTMLInputElement>) => {
        setUrlFilter(e.target.value);
    };

  return (
    <>
        <div className="m-2 mt-6 md:m-10 p-2 md:p-10 bg-white rounded-3xl">
            <div className="mb-6">
                <div>
                    <p className="text-3xl font-extrabold tracking-tight text-slate-900">URLS </p>
                </div>
            </div>
            <div className="relative mt-6">
                <div className="flex absolute inset-y-0 left-0 items-center pl-3 pointer-events-none">
                    <svg className="w-5 h-5 text-gray-500 dark:text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
                </div>
                <input type="search" name="urlFilter" onChange={(e) => filterUrls(e)} value={urlFilter} className="block p-2 pl-10 w-full max-w-lg text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:border-blue-500" placeholder="Search urls... " required />
            </div>

            <div className="grid grid-cols-12 gap-6 mt-6">
            { 
                myurls && myurls
                    .filter(url => url.long_url.toLowerCase().includes(urlFilter.toLowerCase()) || url.short_url.toLowerCase().includes(urlFilter.toLowerCase()))
                    .map(url => (
                        <div key={url.id} className="p-6 max-w-sm rounded-lg col-span-12 sm:col-span-6 lg:col-span-4 xl:col-span-3 border border-gray-200 shadow-md bg-gray-600">
                            {
                                url.private ? (
                                    <p className='pl-2 text-xs text-white bg-red-500 w-14 rounded-3xl mb-2'>Private</p>
                                ) 
                                : (
                                    <p className='pl-2 text-xs text-white bg-green-600 w-14 rounded-3xl mb-2'>Public</p>
                                )
                            }
                            <Link href={`/${url.alias}`}>
                                <a>
                                    <h6 className="mb-2 text-l font-mono tracking-tight text-white"><GoLink fill='white' size={'1.5rem'} className='inline'/> { url.short_url }</h6>
                                </a>
                            </Link>
                            <p className="mb-3 font-normal text-gray-400 overflow-scroll">{ url.long_url }</p>
                            <div className='flex justify-between'>
                                <Link href={`/${url.alias}`}>
                                    <a className="inline-flex items-center py-1 px-3 text-sm font-medium text-center text-white rounded-lg focus:ring-4 focus:outline-none bg-blue-600 hover:bg-blue-700 focus:ring-blue-800">
                                        Go
                                        <svg className="ml-2 -mr-1 w-4 h-4" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd"></path></svg>
                                    </a>
                                </Link>
                                <button className="bg-red-400 inline-flex p-1 h-6 rounded-md shadow-md hover:cursor-pointer hover:bg-red-600">
                                    <RiDeleteBin6Line onClick={() => setRemoveUrl(url.id)} />
                                </button>
                            </div>
                            <div className={`bg-slate-500 ${url.id == removeUrl ? "" : "hidden"} flex justify-between text-white pl-2 rounded-md mt-2 text-xs font-mono`}>
                                <p className='pt-1'>Are you sure?</p> <p><button onClick={() => confirmDelete(url.id)} className='bg-red-400 p-1 rounded-md ml-7'>YES</button> <button onClick={() => setRemoveUrl('')} className='bg-green-400 p-1 pl-2 pr-2 rounded-md ml-2'>NO</button></p>
                            </div>
                        </div>
                ))
            }
            </div>

            <div className='col-span-12 text-center mt-6 mb-10 md:mt-10 text-gray-500 text-xl'>
                <p className='font-mono font-semibold'>URL Hit Charts</p>
            </div>
            <div className='grid grid-cols-12 w-full'>
                <div className="flex flex-col justify-center col-span-12 md:col-span-4 items-center">
                    <div className='pl-4 pb-4 m-0'>
                        <p className="text-sm xl:text-lg font-semibold font-mono">
                        Url and shared document stats
                        </p>
                        <p className="text-gray-400">Monthly breakdown</p>
                    </div>
                    <div className="flex items-center gap-4">
                        <p className="flex items-center gap-2 text-gray-600 hover:drop-shadow-xl">
                            <span>
                            <GoPrimitiveDot />
                            </span>
                            <span>Urls</span>
                        </p>
                        <p className="flex items-center gap-2 text-chart-green hover:drop-shadow-xl">
                            <span>
                            <GoPrimitiveDot />
                            </span>
                            <span>Documents</span>
                        </p>
                        </div>
                    <div>
                        <StackedChart width="280px" height="320px" />
                    </div>
                </div>
            </div>
        </div>
    </>
  )
}

export default urls