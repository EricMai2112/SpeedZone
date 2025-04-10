import { Route, Routes } from 'react-router-dom'
import Home from './Components/Home/Home'
import Login from './Components/Login'
import MainLayout from './Components/MainLayout'
import logo from './logo.svg'
import Product from './Components/Products/Product'

function App() {
  return (
    <div className='App'>
      <Routes>
        <Route path='/' element={<MainLayout />}>
          <Route path='/' element={<Home />}></Route>
          <Route path='/product' element={<Product />}></Route>
        </Route>
      </Routes>
    </div>
  )
}

export default App
