import { UserState } from '@/types/user.type'
import { localAction } from '@/utils/common'
import { createContext, useState } from 'react'
/* eslint-disable @typescript-eslint/no-explicit-any */

interface AppContextInterface {
  isAuthenticated: boolean
  setIsAuthenticated: React.Dispatch<React.SetStateAction<boolean>>
  profile: UserState
  setProfile: React.Dispatch<React.SetStateAction<UserState>>
}

const initialAppContext: AppContextInterface = {
  isAuthenticated: Boolean(localAction('accdfw2qyb13a4')),
  setIsAuthenticated: () => {},
  profile: localAction('profile'),
  setProfile: () => {}
}

export const AppContext = createContext<AppContextInterface>(initialAppContext)

interface AppProviderProps {
  children: React.ReactNode
}

export const AppProvider: React.FC<AppProviderProps> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(initialAppContext.isAuthenticated)
  const [profile, setProfile] = useState<UserState>(initialAppContext.profile)

  return (
    <AppContext.Provider
      value={{
        isAuthenticated,
        setIsAuthenticated,
        profile,
        setProfile
      }}
    >
      {children}
    </AppContext.Provider>
  )
}
