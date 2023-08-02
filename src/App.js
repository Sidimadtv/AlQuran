import React from 'react'
import { BrowserRouter , Routes, Route} from 'react-router-dom'
import Home from './components/Home/Home'
import Surah from './components/surah/Surah'
import Readers from './components/Sections/readers/Readers'
import Reader from './components/Sections/readers/reader/Reader'
import Adhan from './components/Sections/adhan/Adhan'


function App() {
  return (
    <BrowserRouter basename='/AlQuran'>
      <Routes>
        <Route path="/" element={<Home/>} />
        <Route path="/surah/:id" element={<Surah/>} />
        <Route path="/readers" element={<Readers/>} />
        <Route path="/readers/:reader" element={<Reader/>} />
        <Route path="/adhan" element={<Adhan/>} />
        <Route path="/*" element={<h1>404</h1>} />
      </Routes>
    </BrowserRouter>
  )
}

export default App