// WelcomeSection.js

import React from 'react';
import styles from './WelcomeSection.module.scss';
import { Link } from 'react-router-dom';

const WelcomeSection = () => {
  return (
    <div className={styles.welcomeSection}>
      <img className={styles.roundedImage} src="/images/banner-easyshoes.png" alt="Banner" width="100%" height="auto" />
      <div className={styles.buttonContainer}>
        <Link to="/products" className={styles.viewProductsButton}>
          ZOBACZ PRODUKTY
        </Link>
      </div>
      <div className={styles.separator}></div>
    </div>
  );
};

export default WelcomeSection;