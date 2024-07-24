import { BettingDataState } from '@/types/poker.type'
import { UserState } from '@/types/user.type'

import { localAction } from '@/utils/common'
import { createContext, useState } from 'react'
/* eslint-disable @typescript-eslint/no-explicit-any */

interface AppContextInterface {
  isAuthenticated: boolean
  setIsAuthenticated: React.Dispatch<React.SetStateAction<boolean>>
  profile: UserState
  setProfile: React.Dispatch<React.SetStateAction<UserState>>
  userWallet: number
  setUserWallet: React.Dispatch<React.SetStateAction<number>>
  bettingValue: number
  setBettingValue: React.Dispatch<React.SetStateAction<number>>
  bettingData: BettingDataState[]
  setBettingData: React.Dispatch<React.SetStateAction<BettingDataState[]>>
  coinAdd: number
  setCoinAdd: React.Dispatch<React.SetStateAction<number>>
}

const initialAppContext: AppContextInterface = {
  isAuthenticated: Boolean(localAction('accdfw2qyb13a4')),
  setIsAuthenticated: () => {},
  profile: localAction('profile'),
  setProfile: () => {},
  userWallet: 0,
  setUserWallet: () => {},
  bettingValue: 50,
  setBettingValue: () => {},
  bettingData: [],
  setBettingData: () => {},
  coinAdd: 0,
  setCoinAdd: () => {}
}

export const AppContext = createContext<AppContextInterface>(initialAppContext)

interface AppProviderProps {
  children: React.ReactNode
}

export const AppProvider: React.FC<AppProviderProps> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(initialAppContext.isAuthenticated)
  const [profile, setProfile] = useState<UserState>(initialAppContext.profile)
  const [userWallet, setUserWallet] = useState<number>(initialAppContext.userWallet)
  const [bettingValue, setBettingValue] = useState<number>(initialAppContext.bettingValue)
  const [bettingData, setBettingData] = useState<BettingDataState[]>(initialAppContext.bettingData)
  const [coinAdd, setCoinAdd] = useState<number>(initialAppContext.coinAdd)

  return (
    <AppContext.Provider
      value={{
        isAuthenticated,
        setIsAuthenticated,
        profile,
        setProfile,
        userWallet,
        setUserWallet,
        bettingValue,
        setBettingValue,
        bettingData,
        setBettingData,
        coinAdd,
        setCoinAdd
      }}
    >
      {children}
    </AppContext.Provider>
  )
}
