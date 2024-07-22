import React from 'react'
import './globalStyles.scss'

type Props = {
  children: React.ReactNode
}

const GlobalStyles = (props: Props) => {
  return props.children
}

export default GlobalStyles
