import React, { useEffect, useState } from 'react';
import { GoPrimitiveDot } from 'react-icons/go';
import { RiDeleteBin6Line } from 'react-icons/ri'
import Link from 'next/link';
import Header from '../../components/Header';
import { validateAccess } from '../../utils/validateAccess';
import Pie from '../../components/charts/Pie';

const documents = () => {

    const apiURI = process.env.NEXT_PUBLIC_API_URL

    const [mydocuments, setMyDocuments] = useState<{id: string, title: string, plain_text: string, private: boolean}[]>([])
    const [pieChartData, setPieChartData] = useState<{x: string; y: number; text: string}[]>([]);
    const [documentFilter, setDocumentFilter] = useState('');
    const [removeDocument, setRemoveDocument] = useState('');
    const [requestError, setRequestError] = useState('');

    useEffect(() => {
        const fetchUrls = async () => {
          const access = await validateAccess();
          if (!access.success) {
              setRequestError('An error occured. Please logout and login again!')
              return
          }
          const response = await fetch(`${apiURI}/user/documents`, {
              credentials: 'include',
          })
          .catch(() => {})
          if (response && response.status == 200) {
              const responseData = await response.json()
              setMyDocuments(responseData.documents)
              setPieChartData(responseData.top_stats)
              return
          }
          setRequestError('An error occured. Please and login again!')
        }
  
        fetchUrls()
      
      }, [])

    const confirmDelete = async (docId: string) => {
        setRequestError('')
        const response = await fetch(`${apiURI}/document/delete/${docId}`, {
            method: 'DELETE',
            credentials: 'include',
        })
        .catch(() => {})
        if (response && response.status == 200) {
            setMyDocuments(prevState => prevState.filter(document => document.id != docId))
            return
        }
        setRequestError('An error occured. Please logout and login again!')
    }

    const filterDocuments = (e: React.ChangeEvent<HTMLInputElement>) => {
        setDocumentFilter(e.target.value);
    }

  return (
    <>
        <Header/>
        <div className="m-2 mt-6 md:m-10 p-2 md:p-10 bg-white rounded-3xl">
            <div className="mb-6">
                <p className="text-3xl font-extrabold tracking-tight text-slate-900">DOCUMENTS </p>
            </div>
            <div className="">
                <p className="text-sm font-semibold tracking-tight text-slate-400 mb-1">CREATE NEW DOCUMENT</p>
            </div>
            <Link href={`/app/d/create`}>
                <button className="text-white bg-blue-500 hover:bg-blue-600 border-stone-300 focus:outline-none font-bold border-2 rounded-lg text-2xl w-20 h-11 px-5 shadow-lg text-center">+</button>
            </Link>
            
            <div className="relative mt-6">
                <div className="flex absolute inset-y-0 left-0 items-center pl-3 pointer-events-none">
                    <svg className="w-5 h-5 text-gray-500 dark:text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
                </div>
                <input type="search" onChange={(e) => filterDocuments(e)} name="documentFilter" className="block p-2 pl-10 w-full max-w-lg text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:border-blue-500" placeholder="Search documents... " required />
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
                mydocuments.length > 0 && mydocuments
                    .filter(document => document.plain_text.toLowerCase().includes(documentFilter.toLowerCase()) || document.title.toLowerCase().includes(documentFilter.toLowerCase()))
                    .map(document => (
                        <div key={document.id} className="p-6 max-w-sm rounded-lg col-span-12 sm:col-span-6 lg:col-span-4 xl:col-span-3 border border-gray-200 shadow-md bg-gray-600">
                            {
                                document.private ? (
                                    <p className='pl-2 text-xs text-white bg-red-500 w-14 rounded-3xl mb-2'>Private</p>
                                ) 
                                : (
                                    <p className='pl-2 text-xs text-white bg-green-600 w-14 rounded-3xl mb-2'>Public</p>
                                )
                            }
                            <h5 className="mb-2 text-2xl font-bold tracking-tight text-white">{ document.title }</h5>
                            <p className="mb-3 font-normal text-gray-400">{ document.plain_text.length > 30 ? document.plain_text.slice(0,70) + "..." : document.plain_text }</p>
                            <div className='flex justify-between'>
                                <Link href={`/app/d/${document.id}`}>
                                    <a className="inline-flex items-center py-1 px-3 text-sm font-medium text-center text-white rounded-lg focus:ring-4 focus:outline-none bg-blue-600 hover:bg-blue-700 focus:ring-blue-800">
                                        View
                                        <svg className="ml-2 -mr-1 w-4 h-4" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd"></path></svg>
                                    </a>
                                </Link>
                                <button className="bg-red-400 inline-flex p-1 h-6 rounded-md shadow-md hover:bg-red-600">
                                    <RiDeleteBin6Line onClick={() => setRemoveDocument(document.id)} />
                                </button>
                            </div>
                            <div className={`bg-slate-500 ${document.id == removeDocument ? "" : "hidden"} flex justify-between text-white pl-2 rounded-md mt-2 text-xs font-mono`}>
                                <p className='pt-1'>Are you sure?</p> <p><button onClick={() => confirmDelete(document.id)} className='bg-red-400 p-1 rounded-md ml-7'>YES</button> <button onClick={() => setRemoveDocument('')} className='bg-green-400 p-1 pl-2 pr-2 rounded-md ml-2'>NO</button></p>
                            </div>
                        </div>
                    ))
            }
            </div>
            
            <div className='col-span-12 text-center mt-6 mb-10 md:mt-10 text-gray-500 text-xl'>
                <p className='font-mono font-semibold'>Shared Document Chart(s)</p>
            </div>
            <div className='grid grid-cols-12 w-full'>
                <div className="flex flex-col pt-24 justify-center col-span-12 items-center">
                    <div className='pl-4 m-0'>
                        <p className="text-l xl:text-2xl font-semibold font-mono">
                        {
                            pieChartData && pieChartData.reduce((accumulator, value) => {
                            return accumulator + value.y;
                            }, 0)
                        } total visits
                        </p>
                        <p className="text-gray-400">Top {pieChartData ? pieChartData.length : 0} document visits</p>
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

export default documents