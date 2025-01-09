import React from 'react'
import Home from './home/Home'
import { SoundProvider } from './context/SoundContext'
import { BrowserRouter, Route, Routes } from 'react-router-dom'


const App = () => {
  return (
    // <SoundProvider>
    <BrowserRouter>
    <Routes>
      <Route path='/' element={<Home/>}/>
    </Routes>
    </BrowserRouter>
    // </SoundProvider>
  )
}

export default App
