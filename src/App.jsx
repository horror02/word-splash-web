import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './index.css'
import { BrowserRouter } from 'react-router-dom'
import Routing from './routing/Routing'
import { Toaster } from 'react-hot-toast'

function App() {

  return (
    <BrowserRouter>
    <Toaster position="top-center" reverseOrder={false} />
      <Routing />
    </BrowserRouter>
  )
}

export default App
