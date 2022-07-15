import React, { useEffect, useState } from 'react';
import StackedChart from '../../components/charts/StackedChart';
import { GoPrimitiveDot, GoLink } from 'react-icons/go';
import { RiDeleteBin6Line } from 'react-icons/ri';
import Link from 'next/link';
import Header from '../../components/Header';
import { validateAccess } from '../../utils/validateAccess';
import Pie from '../../components/charts/Pie';

const urls = () => {

    const apiURI = process.env.NEXT_PUBLIC_API_URL

    const [myurls, setMyurls] = useState<{id: string, short_url: string, long_url: string, private: boolean, alias:string}[]>([]);
    const [pieChartData, setPieChartData] = useState<{x: string; y: number; text: string}[]>([]);
    const [urlFilter, setUrlFilter] = useState('');
    const [requestError, setRequestError] = useState('');
    const [removeUrl, setRemoveUrl] = useState('');

    useEffect(() => {
      const fetchUrls = async () => {
        const access = await validateAccess();
        if (!access.success) {
            setRequestError('An error occured. Please logout and login again!')
            return
        }
        const response = await fetch(`${apiURI}/user/urls`, {
            credentials: 'include',
        })
        .catch(() => {})
        if (response && response.status == 200) {
            const responseData = await response.json()

            setMyurls(responseData.urls)
            setPieChartData(responseData.top_stats)
            return
        }
        setRequestError('An error occured. Please and login again!')
      }

      fetchUrls()
    
    }, [])
    

    const confirmDelete = async (urlId: string) => {
        setRequestError('')
        const response = await fetch(`${apiURI}/url/delete/${urlId}`, {
            method: 'DELETE',
            credentials: 'include',
        })
        .catch(() => {})
        if (response && response.status == 200) {
            setMyurls(prevState => prevState.filter(url => url.id != urlId))
            return
        }
        setRequestError('An error occured. Please logout and login again!')

    }

    const filterUrls = (e: React.ChangeEvent<HTMLInputElement>) => {
        setUrlFilter(e.target.value);
    };

  return (
    <>
        <Header/>
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
            {
                requestError && (
                <p className='p-2 bg-red-200 rounded-md mb-4 overflow-scroll mt-2 text-red-400'>
                    {requestError}
                </p>
                )
            }
            <div className="grid grid-cols-12 gap-6 mt-6">
            { 
                myurls.length > 0 && myurls
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

            <div className='col-span-12 text-center mt-24 text-gray-500 text-xl'>
                <p className='font-mono font-semibold'>URL Hit Chart(s)</p>
            </div>
            <div className='grid grid-cols-12 w-full'>
                <div className="flex flex-col pt-10 justify-center col-span-12 items-center">
                    <div className='pl-4 m-0'>
                        <p className="text-l xl:text-2xl font-semibold font-mono">
                        {
                            pieChartData && pieChartData.reduce((accumulator, value) => {
                            return accumulator + value.y;
                            }, 0)
                        } total hits
                        </p>
                        <p className="text-gray-400">Top {pieChartData ? pieChartData.length : 0} url alias visits</p>
                    </div>
                    <div>
                        <Pie size='400px' id="pie-chart" data={pieChartData} />
                    </div>
                </div>
            </div>
        </div>
    </>
  )
}

export default urls