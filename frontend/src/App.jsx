import './App.css'
import {BrowserRouter, Routes, Route, Link} from 'react-router-dom'
import Shirt from './componenets/Shirt/Shirt'
import Home from './componenets/Home/Home'
import Warehouse from './componenets/Warehouse/Warehouse'
import DisplayShirts from './componenets/Warehouse/DisplayShirts'
import Logo from '/affordafit.png'

function App() {


  return (
    <>
      <BrowserRouter>
          <div id='headerContainer'>
            {/* <div className='logoLink'><Link to="/home"><img src={Logo} className='logo' alt="Afford A Fit Logo" /></Link></div>
            <div className="headerLinks"><Link to="/home">Home</Link> </div>
            <div className='headerLinks'><Link to="/warehouses">Warehouses</Link></div>
            <div className='headerLinks'><Link to="/shirts">Shirts</Link></div> */}
            <Link id='logoLink' to="/home"><img src={Logo} id='logo' alt="Afford A Fit Logo" /></Link>
            <Link className="headerLinks" to="/home">Home</Link>
            <Link className="headerLinks" to="/warehouses">Warehouses</Link>
            <Link className="headerLinks" to="/shirts">Shirts</Link>
          </div>
          <div id='contentContainer'>
          <Routes>
            <Route path="/home" element={<Home />}/>
            <Route path="/warehouses" element={<Warehouse />}/>
            <Route path="/shirts" element={<Shirt />}/>
            <Route path="/displayShirts" element={<DisplayShirts />}></Route>
            <Route path='*' element={<Home />} />
            {/* <Route path='*' element={<Navigate to='/' />} /> */}
            {/* <Route path="/displayShirts/:type" component={DisplayShirts}/> */}
          </Routes>
          </div>
      </BrowserRouter>
    </>
  )
}

export default App
