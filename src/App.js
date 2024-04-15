import React from 'react';
import './App.css';
import Navbar from './components/Navbar';
import Home from './components/Home';
import { Routes, Route } from 'react-router-dom'; 
import Products from './components/Products';
import Product from './components/Product';
import Cart from './components/Cart';

function App() {
  return (
    <>
      <Navbar /> {/* Navbar present on every route */}
      <Routes>
        <Route exact path="/" element={<Home />} /> 
        <Route exact path="/products" element={<Products/>} />
        <Route exact path="/products/:id" element={<Product/>} />
        <Route exact path="/cart" element={<Cart/>} />
      </Routes>
    </>
  );
}

export default App;