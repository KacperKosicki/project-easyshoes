// PremiumProduct.js

// Importy komponentów i modułów
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import Notification from '../Notification/Notification';
import styles from './PremiumProduct.module.scss'; // Używamy stylów z ProductList
import cx from 'classnames';

// Komponent PremiumProduct.js
const PremiumProduct = () => {
  // Stany przechowujące dane o produktach, ich filtrowaną wersję oraz typy sortowania, filtrowania i wyszukiwania
  const [premiumProducts, setPremiumProducts] = useState([]);
  const [filteredPremiumProducts, setFilteredPremiumProducts] = useState([]);
  const [sortType, setSortType] = useState('default');
  const [filterType, setFilterType] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate(); // Używamy hooka useNavigate do nawigacji
  const [showNotification, setShowNotification] = useState(false); // Stan do wyświetlania powiadomień
  const [notificationMessage, setNotificationMessage] = useState(''); // Wiadomość powiadomienia

  // Efekt pobierający dane o produktach premium z serwera przy załadowaniu komponentu
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('/api/products');
        const premiumProducts = response.data.filter(product => product.premium);
        setPremiumProducts(premiumProducts);
        setFilteredPremiumProducts(premiumProducts);
      } catch (error) {
        console.error('Error fetching premium products data:', error);
      }
    };

    fetchData();
  }, []);

  // Efekt filtrujący, sortujący i wyszukujący produkty na podstawie ustawionych parametrów
  useEffect(() => {
    let filtered = [...premiumProducts];

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

    setFilteredPremiumProducts(filtered);
  }, [sortType, filterType, searchTerm, premiumProducts]);

  // Funkcja zamykająca powiadomienie
  const closeNotification = () => {
    setShowNotification(false);
  };

  // Obsługa zmiany sposobu sortowania
  const handleSortChange = (e) => {
    setSortType(e.target.value);
  };

  // Obsługa zmiany filtrów
  const handleFilterChange = (e) => {
    setFilterType(e.target.value);
  };

  // Obsługa zmiany wartości wyszukiwania
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

  // Zwracany JSX komponentu PremiumProduct
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
        {filteredPremiumProducts.map((product) => (
          <div key={product._id} className={styles.productCard} onClick={() => handleProductClick(product)}>
            <div className={styles.premiumBadge}>PREMIUM</div>
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

export default PremiumProduct;