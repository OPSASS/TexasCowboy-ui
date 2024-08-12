import React, { createContext, useContext } from 'react'
import { io, Socket } from 'socket.io-client'

const SocketContext = createContext<Socket | undefined>(undefined)
type Props = {
  children: React.ReactNode
}

export const SocketProvider = ({ children }: Props) => {
  const socket = io(import.meta.env.VITE_SERVICE_ENDPOINT)

  return <SocketContext.Provider value={socket}>{children}</SocketContext.Provider>
}

export const useSocket = () => {
  const socket = useContext(SocketContext)

  if (!socket) {
    throw new Error('useSocket must be used within a SocketProvider')
  }

  return socket
}
