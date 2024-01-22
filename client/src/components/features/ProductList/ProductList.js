// ProductList.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styles from './ProductList.module.scss';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import Notification from '../Notification/Notification';

const ProductList = () => {
  const dispatch = useDispatch();

  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [sortType, setSortType] = useState('default');
  const [filterType, setFilterType] = useState('');
  const [searchTerm, setSearchTerm] = useState('');

  const [showNotification, setShowNotification] = useState(false);
  const [notificationMessage, setNotificationMessage] = useState('');

  const closeNotification = () => {
    setShowNotification(false);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:8000/api/products');
        setProducts(response.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

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

  const handleSortChange = (e) => {
    setSortType(e.target.value);
  };

  const handleFilterChange = (e) => {
    setFilterType(e.target.value);
  };

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  return (
    <div>
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
          <div key={product._id} className={styles.productCard}>
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
            <Link to={`/product/${product._id}`} className={styles.seeProduct}>
              ZOBACZ PRODUKT
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductList;