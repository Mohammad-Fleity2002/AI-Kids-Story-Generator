import { HeroUIProvider } from '@heroui/react'
import React from 'react'

function Provider({children}:{children:React.ReactNode}) {
  return (
    <HeroUIProvider>
        {children}
    </HeroUIProvider>
  )
}

export default Provider