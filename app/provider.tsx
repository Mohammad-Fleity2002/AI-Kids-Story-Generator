import { HeroUIProvider } from '@heroui/react'
import React from 'react'
import {ToastContainer, toast} from 'react-toastify';
// import 'react-toastify/'

function Provider({children}:{children:React.ReactNode}) {
  return (
    <HeroUIProvider>
        {children}
      <ToastContainer/>
    </HeroUIProvider>
  )
}

export default Provider