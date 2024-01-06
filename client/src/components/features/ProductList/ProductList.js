// ProductList.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styles from './ProductList.module.scss';
import { Link } from 'react-router-dom';

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [sortType, setSortType] = useState('default');
  const [filterType, setFilterType] = useState('');
  const [searchTerm, setSearchTerm] = useState('');

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
    // Filtruj produkty
    let filtered = [...products];

    if (filterType) {
      filtered = filtered.filter(product => product.gender.toLowerCase().includes(filterType.toLowerCase()));
    }

    if (searchTerm) {
      filtered = filtered.filter(product => product.title.toLowerCase().includes(searchTerm.toLowerCase()));
    }

    // Sortuj produkty
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
      <div className={styles.filters}>
        <div className={styles.filterGroup}>
          <label>
            <span className={styles.filterLabel}>Cena:</span>
            <select value={sortType} onChange={handleSortChange}>
              <option value="default">Domyślne</option>
              <option value="priceAsc">Cena rosnąco</option>
              <option value="priceDesc">Cena malejąco</option>
            </select>
          </label>
        </div>
        <div className={styles.filterGroup}>
          <label>
            <span className={styles.filterLabel}>Płeć:</span>
            <input type="text" value={filterType} onChange={handleFilterChange} />
          </label>
        </div>
        <div className={styles.filterGroup}>
          <label>
            <span className={styles.filterLabel}>Marka:</span>
            <input type="text" value={searchTerm} onChange={handleSearchChange} />
          </label>
        </div>
      </div>
      <div className={styles.productList}>
        {filteredProducts.map((product) => (
          <div key={product._id} className={styles.productCard}>
            <img
              src={product.image}
              alt={product.title}
              className={styles.productImage}
            />
            <h2 className={styles.productTitle}>{product.title}</h2>
            <p className={styles.productDescription}>{product.gender}</p>
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