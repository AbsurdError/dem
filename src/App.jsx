import './css/bootstrap.min.css'
import './App.css';
import {Route, Routes} from 'react-router-dom'
import { useState } from 'react';
import Header from './component/Header';
import Footer from './component/Footer';
import Products from './component/Products';
import Login from './component/Login';
import Registration from './component/Registration';
import Cart from './component/Cart';
import Order from './component/Order';

function App() {
  const [isAuth, setIsAuth] = useState(false);
  const [token, setToken] = useState('')
  return (
    <>
      <Header isAuth={isAuth} setIsAuth={setIsAuth} token={token}/>
      <Routes>
        <Route  path='/' element={<Products isAuth={isAuth} token={token}/>}/>
        <Route  path='/login' element={<Login setIsAuth={setIsAuth} setToken={setToken}/>}/>
        <Route  path='/reg' element={<Registration/>}/>
        <Route  path='/cart' element={<Cart token={token}/>}/>
        <Route  path='/order' element={<Order token={token}/>}/>
      </Routes>
      <Footer/>
    </>
  );
}

export default App;
