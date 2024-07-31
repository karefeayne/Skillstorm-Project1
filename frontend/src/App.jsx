import './App.css'
import {BrowserRouter, Routes, Route, Link} from 'react-router-dom'
import Shirt from './componenets/Shirt/Shirt'
import Home from './componenets/Home/Home'
import Warehouse from './componenets/Warehouse/Warehouse'

function App() {


  return (
    <>
      <header>

      <BrowserRouter>
          <button className="headerLinks"><Link to="/home">Home</Link> </button>
          <button className='headerLinks'><Link to="/warehouses">Warehouses</Link></button>
          <button className='headerLinks'><Link to="/shirts">Shirts</Link></button>

          <Routes>
            <Route path="/home" element={<Home />}/>
            <Route path="/warehouses" element={<Warehouse />}/>
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
