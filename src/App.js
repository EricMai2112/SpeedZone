import { Route, Routes } from 'react-router-dom'
import Home from './Components/Home/Home'
import Login from './Components/Login'
import MainLayout from './Components/MainLayout'
import logo from './logo.svg'
import Product from './Components/Products/Product'
import CarDetail from './Components/Products/CarDetail'
import Events from './Components/Events/Events'
import News from './Components/News/News'

function App() {
  return (
    <div className='App'>
      <Routes>
        <Route path='/' element={<MainLayout />}>
          <Route path='/' element={<Home />}></Route>
          <Route path='/product' element={<Product />}></Route>
          <Route path='/product/:id' element={<CarDetail />}></Route>
          <Route path='/events' element={<Events/>}></Route>
          <Route path='/news' element={<News/>}></Route>
        </Route>
        <Route path='/login' element={<Login />}></Route>
      </Routes>
    </div>
  )
}

export default App
