import React, { useEffect } from 'react'

export async function getServerSideProps({ params }: { params: { alias: string } }) {
  const apiURI = process.env.API_URL

  const response = await fetch(
    `${apiURI}/url/visit?alias=${params.alias}`, {
      headers: {
        'Content-Type': 'application/json'
      }
    }
  )
  .catch(() => {})

  if (response && response.status == 200) {
    const responseData = await response.json()
    return {
      props: {
        url: responseData.long_url
      }
    }
  } else {
    return {
      notFound: true
    }
  }
}

const url = ({ url } : { url: string }) => {
  useEffect(() => {
    if (url) window.location.replace(url)
  })
  return (<></>)
}

export default url