// PremiumProduct.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import Notification from '../Notification/Notification'; // Dodany import Notification
import styles from './PremiumProduct.module.scss';
import cx from 'classnames';

const PremiumProduct = () => {
  const [premiumProducts, setPremiumProducts] = useState([]);
  const navigate = useNavigate();

  const [showNotification, setShowNotification] = useState(false);
  const [notificationMessage, setNotificationMessage] = useState('');

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

  const closeNotification = () => {
    setShowNotification(false);
  };

  const handleProductClick = (product) => {
    if (product.available) {
      navigate(`/product/${product._id}`);
    } else {
      setShowNotification(true);
      setNotificationMessage('Produkt jest niedostępny.');
    }
  };

  return (
    <div className={styles.mainContainer}>
      <Notification show={showNotification} handleClose={closeNotification} message={notificationMessage} />

      <div className={styles.productList}>
        {premiumProducts.map((product) => (
          <div key={product._id} className={styles.productCard} onClick={() => handleProductClick(product)}>
            <div className={styles.badgeContainer}>
              <div className={`${styles.premiumBadge} ${styles.available}`}>PREMIUM</div>
              {product.available ? (
                <div className={`${styles.availableBadge} ${styles.available}`}>DOSTĘPNE</div>
              ) : (
                <div className={`${styles.availableBadge} ${styles.unavailable}`}>NIEDOSTĘPNE</div>
              )}
            </div>
            <img src={product.image} alt={product.title} className={styles.productImage} />
            <h2 className={styles.productTitle}>{product.title}</h2>
            {product.gender && <p className={styles.productGender}>{product.gender}</p>}
            <p className={styles.productPrice}>{product.price}zł</p>
            <Link
              to={`/product/${product._id}`}
              className={cx(styles.seeProduct, { [styles.disabled]: !product.available })}
            >
              {product.available ? 'ZOBACZ PRODUKT' : 'PRODUKT NIEDOSTĘPNY'}
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PremiumProduct;