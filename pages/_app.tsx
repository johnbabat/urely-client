import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { DataLayer, User } from '../context/userContext'

import reducer, {initialState} from '../context/userContext';
import { validateAccess } from '../utils/validateAccess';
import { useEffect, useState } from 'react';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <DataLayer initialState={initialState} reducer={reducer}>
      <Component {...pageProps} />
    </DataLayer>
  )
  
}

export default MyApp
