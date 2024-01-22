import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { Container } from 'react-bootstrap';
import Header from './components/layouts/Header/Header';
import Home from './components/pages/Home/Home';
import ProductList from './components/features/ProductList/ProductList';
import Product from './components/features/Product/Product';
import Footer from './components/layouts/Footer/Footer';
import Cart from './components/features/Cart/Cart';
import Statute from './components/pages/Statue/Statue';
import AboutUs from './components/pages/AboutUs/AboutUs';
import PremiumProduct from './components/features/PremiumProduct/PremiumProduct';

const App = () => {
  return (
    <Container>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/product-list" element={<ProductList />} />
        <Route path="/premium-list" element={<PremiumProduct />} />
        <Route path="/product/:id" element={<Product />} />
        <Route path="/products" element={<ProductList />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/statue" element={<Statute />} />
        <Route path="/about-us" element={<AboutUs />} />
      </Routes>
      <Footer />
    </Container>
  );
}

export default App;