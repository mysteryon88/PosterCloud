import { useState, useEffect, createContext, useContext } from 'react'

export const EthereumContext = createContext()

export function EthereumProvider({ children }) {
  const [account, setAccount] = useState(localStorage.getItem('account'))
  const [provider, setProvider] = useState(localStorage.getItem('provider'))
  const [signer, setSigner] = useState(localStorage.getItem('signer'))

  useEffect(() => {
    localStorage.setItem('account', account)
    localStorage.setItem('provider', provider)
    localStorage.setItem('signer', signer)
  }, [account])

  return (
    <EthereumContext.Provider
      value={{ account, setAccount, provider, setProvider, signer, setSigner }}
    >
      {children}
    </EthereumContext.Provider>
  )
}

export function useEthereumContext() {
  return useContext(EthereumContext)
}
