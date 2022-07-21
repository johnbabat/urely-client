import React, { useEffect, useState } from 'react'
import Pie from './charts/Pie';
import StackedChart from './charts/StackedChart';
import LineChart from './charts/LineChart';

import { GoPrimitiveDot } from 'react-icons/go';
import { validateAccess } from '../utils/validateAccess';
import { useRouter } from 'next/router';
import { useDataLayerValue } from '../context/userContext';
import { FcLink } from 'react-icons/fc';

const Landing = () => {

  const apiURI = process.env.NEXT_PUBLIC_API_URL
  const [{ user }, dispatch] = useDataLayerValue()
  const router = useRouter()

  const [urlInfo, setUrlInfo] = useState({
    longUrl: '',
    shortUrl: '',
    alias: '',
    custom: 0,
    reserve: 0
  })

  const [requestError, setRequestError] = useState('')
  const [urlPieData, setUrlPieData] = useState<{x: string; y: number; text: string}[]>([]);
  const [documentPieData, setDocumentPieData] = useState<{x: string; y: number; text: string}[]>([]);
  const [stackedChartData, setStackedChartData] = useState<{x: string, y: number}[][]>([]);
  const [lineChartData, setLineChartData] = useState<{ x: Date; y: number; }[][]>([]);


  useEffect(() => {
    const fetchStats = async () => {
      const response = await fetch(`${apiURI}/user/stats`, {
          credentials: 'include',
          headers: {
              'Content-Type': 'application/json'
              }
          }
      )
      .catch(() => { })
      if (response && response.status == 200) {
        const responseData = await response.json()
        
        const urlPie = responseData.url_pie;
        const documentPie = responseData.document_pie;
        const stacked = responseData.stacked;
        const line: {x: number[], y: number}[][] = responseData.line
        
        setUrlPieData(urlPie)
        setDocumentPieData(documentPie)
        setStackedChartData(stacked)
        setLineChartData(line.map(stat => stat.map(datapoint => ({x: new Date(datapoint.x[0], datapoint.x[1]), y: datapoint.y}))))
      }
    }
    fetchStats();
  }, [])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let val = e.target.value;
    if (["reserve", "custom"].includes(e.target.name)) {
      let intVal = Number(val)
      intVal ^= 1
      setUrlInfo({
        ...urlInfo,
        [e.target.name]: intVal
      })
    } else {
      setUrlInfo({
        ...urlInfo,
        [e.target.name]: val
      })
    }
  }

  const submitUrl = async () => {
    setRequestError("")
    if (!urlInfo.longUrl) {
      setRequestError("No Url provided")
      return
    }
    if (urlInfo.custom == 1 && !urlInfo.alias) {
      setRequestError("Provide alias for custom Url")
      return
    }
    
    const access = await validateAccess()

    if (!access.success) {
      setRequestError('Please Login!');
      dispatch({type:'LOGOUT'})
      router.push('/app/login/')
      return
    }
    const response = await fetch(`${apiURI}/url/private/${urlInfo.custom ? "create-custom" : "create"}`, {
      credentials: 'include',
      method: 'POST',
      headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
      },
      body: JSON.stringify({
              long_url: urlInfo.longUrl,
              alias: urlInfo.alias,
              make_private: urlInfo.reserve
            })
    })
    .catch((error) => { 
      setRequestError("An error occured");
      return
    })

    if (response && response.status == 201) {
        const responseData = await response.json()
        setUrlInfo(prevState => ({ ...prevState, shortUrl: responseData.short_url }))
        return
    }
    if (response && response.status == 400) {
      const responseData = await response.json()
      setRequestError(responseData.error)
    }
  }

  return (
    <div className='grid grid-cols-12 top-44 md:top-1/4 absolute w-full'>
      <div className='ml-3 mt-10 md:ml-12 lg:ml-52 2xl:ml-72 text-5xl font-bold col-span-12 md:col-span-6'>
        <div className='text-2xl'>Welcome to</div>
        <div className='font-mono'>Urrl Link</div>
        <div className='mb-6 text-2xl'>Give us a link to make magic</div>
        <div className='ml-10 sm:ml-5 xl:ml-12 opacity-50 hidden sm:block'><FcLink size={250}/></div>
      </div>

      <div className='ml-3 mr-3 max-w-sm col-span-12 md:col-span-6'>
        <div className="code-preview rounded-xl bg-gradient-to-r bg-white border border-gray-200 dark:border-gray-700 p-2 sm:p-6 dark:bg-gray-800">
          <div className="mb-6">
            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">Enter your url</label>
            <input type="text" onChange={(e) => handleChange(e)} name="longUrl" value={urlInfo.longUrl} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"/>
          </div>
          <div className="flex mb-6">
            <span className="inline-flex items-center px-3 text-sm text-gray-900 bg-gray-200 border border-r-0 border-gray-300 rounded-l-md dark:bg-gray-600 dark:text-gray-400 dark:border-gray-600">
              urrl.link/
            </span>
            <input type="text" onChange={(e) => handleChange(e)} name="alias" value={urlInfo.alias} className="rounded-none rounded-r-lg bg-gray-50 border border-gray-300 text-gray-900 focus:ring-blue-500 focus:border-blue-500 block flex-1 min-w-0 w-full text-sm p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="your custom alias here"/>
          </div>
          <label className="relative inline-flex items-center mb-4 cursor-pointer">
            <input type="checkbox" onChange={(e) => handleChange(e)} name="custom" value={urlInfo.custom} className="sr-only peer"/>
            <div className="w-8 h-4 bg-gray-200 rounded-full peer peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
            <span className="ml-3 text-sm font-medium text-gray-900 dark:text-gray-300">Use custom alias</span>
          </label>
          <label className="relative inline-flex items-center mb-4 cursor-pointer">
            <input type="checkbox" onChange={(e) => handleChange(e)} name="reserve" value={urlInfo.reserve} className="sr-only peer"/>
            <div className="w-8 h-4 bg-gray-200 rounded-full peer peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
            <span className="ml-3 text-sm font-medium text-gray-900 dark:text-gray-300">Reserve generated alias</span>
          </label>
          {
            urlInfo.shortUrl && (
              <p className='p-2 bg-gray-600 rounded-md text-gray-400 mb-4 overflow-scroll'>
                {urlInfo.shortUrl}
              </p>
            )
          }
          {
            requestError && (
              <p className='p-2 bg-red-200 rounded-md mb-4 overflow-scroll text-red-400'>
                {requestError}
              </p>
            )
          }
          <button type="submit" onClick={submitUrl} className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 block">Make URL</button>
        </div>
      </div>
      <div className='col-span-12 text-center mt-40 sm:mt-28 text-gray-500 text-2xl'>
        <p className='font-mono font-semibold'>Get Insights and Analytics</p>
      </div>
      <div className="flex flex-col pt-24 justify-center col-span-12 md:col-span-4 items-center">
          <div className='pl-4 m-0'>
            <p className="text-l xl:text-2xl font-semibold font-mono">
              {
                urlPieData && urlPieData.reduce((accumulator, value) => {
                  return accumulator + value.y;
                }, 0)
              } total hits
            </p>
            <p className="text-gray-400">Top {urlPieData.length} url alias visits</p>
          </div>
          <div>
            <Pie size='300px' id="url-pie-chart" data={urlPieData} />
          </div>
      </div>
      
      <div className="flex flex-col pt-24 justify-center col-span-12 md:col-span-4 items-center">
          <div className='pl-4 pb-12 m-0'>
            <p className="text-l xl:text-2xl font-semibold font-mono">
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
            <StackedChart stackedChartData={stackedChartData} width="280px" height="320px" />
          </div>
      </div>

      <div className="flex flex-col pt-24 justify-center col-span-12 md:col-span-4 items-center">
          <div className='pl-4 m-0'>
            <p className="text-l xl:text-2xl font-semibold font-mono">
              {
                documentPieData && documentPieData.reduce((accumulator, value) => {
                  return accumulator + value.y;
                }, 0)
              } total visits
            </p>
            <p className="text-gray-400">Top {documentPieData.length} document visits</p>
          </div>
          <div>
            <Pie size='300px' id="doc-pie-chart" data={documentPieData} />
          </div>
      </div>
      <div className='col-span-12 text-center mt-28 text-gray-500 text-2xl'>
        <p className='font-mono font-semibold'>Tailored to you. All in one View</p>
      </div>
      <div className="col-span-12 p-3 md:col-start-3 md:col-span-8 mt-12">
        <LineChart lineChartData={lineChartData}/>
      </div>
    </div>
  )
}

export default Landing