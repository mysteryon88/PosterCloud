import React from 'react'
import ReactDOM from 'react-dom/client'
import { Web3ReactProvider } from '@web3-react/core'
import { getProvider } from './utils/provider.js'

import App from './components/App'

const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(
  <Web3ReactProvider getLibrary={getProvider}>
    <App />
  </Web3ReactProvider>
)
