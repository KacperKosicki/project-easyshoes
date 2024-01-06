// Home.js

import React from 'react';
import ProductList from '../../features/ProductList/ProductList';
import WelcomeSection from '../../features/WelcomeSection/WelcomeSection';
import styles from './Home.module.scss'; // Import stylów dla strony Home

const Home = () => {
  return (
    <div className={styles.homeContainer}>
      <WelcomeSection />
      <h1 className={styles.heading}>Nasze produkty:</h1>
      <div className={styles.productsContainer}>
        {/* Dodaj treść strony głównej, np. karuzelę, oferty, itp. */}
        <ProductList />
      </div>
    </div>
  );
};

export default Home;