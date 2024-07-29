import './App.css'
import {BrowserRouter, Routes, Route, Link, Navigate} from 'react-router-dom'
import Shirt from './pages/Shirt/Shirt'
import Home from './pages/Home/Home'

function App() {


  return (
    <>
      <header>

      <BrowserRouter>
          <button className="headerLinks"><Link to="/home">Home</Link> </button>
          <button className='headerLinks'><Link to="/shirts">Shirts</Link></button>

          <Routes>
            <Route path="/home" element={<Home />}/>
            <Route path="/shirts" element={<Shirt />}/>
            <Route path='*' element={<Home />} />
            {/* <Route path='*' element={<Navigate to='/' />} /> */}
            <Route />
          </Routes>

      </BrowserRouter>

      </header>
    </>
  )
}

export default App
