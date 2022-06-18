// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'

type Data = {
  name: string
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  // const response = await fetch(
  //   `http://localhost:5000/url/visit?alias=${req.query.hello}`, {
  //     headers: {
  //       'Content-Type': 'application/json'
  //     }
  //   }
  // ).catch(() => {})

  // if (response && response.status == 200) {
  //   const responseData = await response.json()

  //   res.redirect(302, responseData.long_url)
  // }

  // res.redirect(302, 'https://google.com')
  res.status(200).send({ name: 'John Babatola' })
}
