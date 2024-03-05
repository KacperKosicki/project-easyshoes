// ProductList.js

// Importy komponentów i modułów
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import Notification from '../Notification/Notification';
import cx from 'classnames'; // Dodane importowane cx

import styles from './ProductList.module.scss'; // Dodane importowane stylów

// Komponent ProductList.js
const ProductList = () => {
  // Użycie funkcji useDispatch do wywoływania akcji Redux
  const dispatch = useDispatch();

  // Stany produktów, wyfiltrowanych produktów, typu sortowania, typu filtracji i wyszukiwania
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [sortType, setSortType] = useState('default');
  const [filterType, setFilterType] = useState('');
  const [searchTerm, setSearchTerm] = useState('');

  // Hook nawigacji
  const navigate = useNavigate();
  // Stany dla powiadomień
  const [showNotification, setShowNotification] = useState(false);
  const [notificationMessage, setNotificationMessage] = useState('');

  // Funkcja zamykająca powiadomienie
  const closeNotification = () => {
    setShowNotification(false);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const apiUrl = process.env.NODE_ENV === 'development' ? process.env.REACT_APP_LOCAL_API_URL : process.env.REACT_APP_RENDER_API_URL;
        const response = await axios.get(apiUrl);
        setProducts(response.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
  
    fetchData();
  }, []);

  // Efekt filtrujący produkty na podstawie sortowania, filtracji i wyszukiwania
  useEffect(() => {
    let filtered = [...products];

    if (filterType) {
      filtered = filtered.filter(product => product.gender && product.gender.toLowerCase().includes(filterType.toLowerCase()));
    }

    if (searchTerm) {
      filtered = filtered.filter(product => product.title.toLowerCase().includes(searchTerm.toLowerCase()));
    }

    switch (sortType) {
      case 'priceAsc':
        filtered.sort((a, b) => a.price - b.price);
        break;
      case 'priceDesc':
        filtered.sort((a, b) => b.price - a.price);
        break;
      default:
        break;
    }

    // Filtrowanie produktów premium tylko w sekcji PremiumProduct
    filtered = filtered.filter(product => !product.premium);

    setFilteredProducts(filtered);
  }, [sortType, filterType, searchTerm, products]);

  // Obsługa zmiany sortowania
  const handleSortChange = (e) => {
    setSortType(e.target.value);
  };

  // Obsługa zmiany filtracji po płci
  const handleFilterChange = (e) => {
    setFilterType(e.target.value);
  };

  // Obsługa zmiany wyszukiwania
  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  // Obsługa kliknięcia na produkt
  const handleProductClick = (product) => {
    if (product.available) {
      navigate(`/product/${product._id}`);
    } else {
      setShowNotification(true);
      setNotificationMessage('Produkt jest niedostępny.');
    }
  };

  // Zwracany JSX komponentu ProductList
  return (
    <div className={styles.mainContainer}>
      <Notification show={showNotification} handleClose={closeNotification} message={notificationMessage} />

      <div className={styles.filters}>
        <div className={styles.filterGroup}>
          <label>
            <span className={styles.filterLabel}>Cena:</span>
            <select value={sortType} onChange={handleSortChange}>
              <option value="default">Domyślna</option>
              <option value="priceAsc">Rosnąco</option>
              <option value="priceDesc">Malejąco</option>
            </select>
          </label>
        </div>
        <div className={styles.filterGroup}>
          <label>
            <span className={styles.filterLabel}>Płeć:</span>
            <input
              type="text"
              value={filterType}
              onChange={handleFilterChange}
              placeholder="Wpisz daną płeć"
            />
          </label>
        </div>
        <div className={styles.filterGroup}>
          <label>
            <span className={styles.filterLabel}>Marka:</span>
            <input
              type="text"
              value={searchTerm}
              onChange={handleSearchChange}
              placeholder="Wpisz nazwę produktu"
            />
          </label>
        </div>
      </div>
      <div className={styles.productList}>
        {filteredProducts.map((product) => (
          <div key={product._id} className={styles.productCard} onClick={() => handleProductClick(product)}>
            {product.premium && <div className={`${styles.premiumBadge} ${styles.available}`}>PREMIUM</div>}
            {product.available ? (
              <div className={`${styles.availableBadge} ${styles.available}`}>DOSTĘPNE</div>
            ) : (
              <div className={`${styles.availableBadge} ${styles.unavailable}`}>NIEDOSTĘPNE</div>
            )}
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

export default ProductList;