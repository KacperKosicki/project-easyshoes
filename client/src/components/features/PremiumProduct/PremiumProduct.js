// PremiumProduct.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styles from './PremiumProduct.module.scss';
import { Link } from 'react-router-dom';

const PremiumProduct = () => {
  const [premiumProducts, setPremiumProducts] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:8000/api/products');
        const premiumProducts = response.data.filter(product => product.premium);
        setPremiumProducts(premiumProducts);
      } catch (error) {
        console.error('Error fetching premium products data:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className={styles.productList}>
      {premiumProducts.map((product) => (
        <div key={product._id} className={styles.productCard}>
          <div className={`${styles.premiumBadge} ${styles.available}`}>PREMIUM</div>
          {product.available ? (
            <div className={`${styles.availableBadge} ${styles.available}`}>DOSTĘPNE</div>
          ) : (
            <div className={`${styles.availableBadge} ${styles.unavailable}`}>NIEDOSTĘPNE</div>
          )}
          <img src={product.image} alt={product.title} className={styles.productImage} />
          <h2 className={styles.productTitle}>{product.title}</h2>
          {product.gender && <p className={styles.productGender}>{product.gender}</p>}
          <p className={styles.productPrice}>{product.price}zł</p>
          <Link to={`/product/${product._id}`} className={styles.seeProduct}>
            ZOBACZ PRODUKT
          </Link>
        </div>
      ))}
    </div>
  );
};

export default PremiumProduct;