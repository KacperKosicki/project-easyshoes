// WelcomeSection.js

// Importy komponentów i stylów
import React from 'react';
import styles from './WelcomeSection.module.scss';
import { Link } from 'react-router-dom';

// Komponent WelcomeSection.js
const WelcomeSection = () => {
  return (
    <div className={styles.welcomeSection}>
      <img className={styles.roundedImage} src="/images/inne/banner-easyshoes.png" alt="Banner" width="100%" height="auto" />
      <div className={styles.buttonContainer}>
        <Link to="/products" className={styles.viewProductsButton}>
          ZOBACZ NASZE PRODUKTY
        </Link>
      </div>
      <div className={styles.separator}></div>
    </div>
  );
};

export default WelcomeSection;