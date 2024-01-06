import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { Container } from 'react-bootstrap';
import Header from './components/layouts/Header/Header';
import Home from './components/pages/Home/Home';
import ProductList from './components/features/ProductList/ProductList';
import Product from './components/features/Product/Product';
import Footer from './components/layouts/Footer/Footer';

const App = () => {
  return (
    <Container>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/product-list" element={<ProductList />} />
        <Route path="/product/:id" element={<Product />} />
        <Route path="/products" element={<ProductList />} />
      </Routes>
      <Footer />
    </Container>
  );
}

export default App;
