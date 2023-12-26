import React from 'react';
import './App.css';
import Login from './Login';
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import Product from './product';
import Home from './Home';

function App() {
  return (
    <BrowserRouter>
        <Routes>
          <Route path='/' element={<Login/>}></Route>
          <Route path='/product' element={<Product/>}></Route>
          <Route path='/home' element={<Home/>}></Route>
          
        </Routes>
    </BrowserRouter>
  );
}

export default App;
