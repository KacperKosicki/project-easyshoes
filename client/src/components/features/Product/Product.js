// Product.js
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import axios from 'axios';  // Importuj axios do wykonywania żądań HTTP
import styles from './Product.module.scss';

const Product = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);

  useEffect(() => {
    // Pobierz informacje o produkcie z API po załadowaniu komponentu
    const fetchProduct = async () => {
      try {
        const response = await axios.get(`http://localhost:8000/api/products/${id}`);
        setProduct(response.data);
      } catch (error) {
        console.error(error);
        // Obsłuż błąd pobierania produktu
      }
    };

    fetchProduct();
  }, [id]);

  const [selectedSize, setSelectedSize] = useState(null);

  const handleSizeClick = (size) => {
    setSelectedSize(size);
  };

  if (!product) {
    return <div className={styles.noSearch}>Nie znaleziono produktu o podanym identyfikatorze.</div>;
  }

  if (!product.carouselImages || !Array.isArray(product.carouselImages) || product.carouselImages.length === 0) {
    return <div className={styles.noSearch}>Brak dostępnych zdjęć produktu.</div>;
  }

  const availableSizes = product.sizeChart?.EU || [];

  return (
    <div className={styles.productContainer}>
      <Carousel showArrows={true} dynamicHeight={true}>
        {product.carouselImages.map((carouselImage, index) => (
          <div key={index}>
            <img src={carouselImage} alt={`Product ${index}`} className={styles.productImage} />
          </div>
        ))}
      </Carousel>
      <h2 className={styles.productTitle}>{product.title}</h2>
      <p className={styles.productDescription}>{product.description}</p>
      <p className={styles.productPrice}>{product.price}zł</p>

      <div className={styles.sizeChart}>
        <h3>Dostępne rozmiary:</h3>
        <div className={styles.sizeButtons}>
          {availableSizes.map((sizeData) => (
            <button
              key={sizeData.size}
              className={`${styles.sizeButton} ${selectedSize === sizeData.size ? styles.selected : ''}`}
              onClick={() => handleSizeClick(sizeData.size)}
              disabled={!sizeData.available}
            >
              {sizeData.size}
            </button>
          ))}
        </div>
      </div>

      <button
        className={styles.orderButton}
        disabled={!selectedSize}
        onClick={() => {
          console.log(`Wybrany rozmiar: ${selectedSize}`);
        }}
      >
        ZAMÓW TEN PRODUKT
      </button>
    </div>
  );
};

export default Product;