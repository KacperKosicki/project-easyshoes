// Home.js

// Importy komponentów i stylów
import React from 'react';
import ProductList from '../../features/ProductList/ProductList';
import WelcomeSection from '../../features/WelcomeSection/WelcomeSection';
import styles from './Home.module.scss';
import PremiumProduct from '../../features/PremiumProduct/PremiumProduct';

// Komponent Home.js
const Home = () => {
  return (
    <div className={styles.homeContainer}>
      <WelcomeSection />
      <img className={styles.roundedImage} src="/images/inne/produkty-easyshoes.png" alt="Banner" width="100%" height="auto" />
      <div className={styles.productsContainer}>
        <ProductList />
      </div>
      <img className={styles.roundedImage} src="/images/inne/banner-premium.png" alt="Banner" width="100%" height="auto" />
      <PremiumProduct />
    </div>
  );
};

export default Home;