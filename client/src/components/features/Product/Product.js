// Product.js

// Importy komponentów i modułów
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import axios from 'axios';
import styles from './Product.module.scss';
import { useDispatch, useSelector } from 'react-redux';
import { addToCart, selectSize } from '../../../redux/productRedux';
import Notification from '../Notification/Notification';

// Komponent Product.js
const Product = () => {
  // Parametry routingu
  const { id } = useParams();
  // Stany produktu, wybranego rozmiaru oraz stanu powiadomienia
  const [product, setProduct] = useState(null);
  const [selectedSize, setSelectedSize] = useState(null);
  const [showNotification, setShowNotification] = useState(false);
  const [notificationMessage, setNotificationMessage] = useState('');

  // Użycie funkcji useDispatch do wywoływania akcji Redux
  const dispatch = useDispatch();
  // Selektory stanu Redux
  const selectedSizeRedux = useSelector(state => state.selectedSize);
  const cartItems = useSelector(state => state.cartItems);

  // Funkcja zamykająca powiadomienie
  const closeNotification = () => {
    setShowNotification(false);
  };

  // Obsługa kliknięcia na rozmiar
  const handleSizeClick = (size) => {
    setSelectedSize(size);
    dispatch(selectSize(size));  // Aktualizuj stan Redux z wybranym rozmiarem
  };

  // Obsługa dodawania produktu do koszyka
  const handleAddToCart = () => {
    if (!selectedSize) {
      // Jeśli nie wybrano rozmiaru, wyświetl komunikat
      setNotificationMessage('Wybierz rozmiar przed dodaniem produktu do koszyka.');
      setShowNotification(true);
      return;
    }

    const existingCartItem = cartItems.find(item => item.id === product._id && item.size === selectedSize);

    if (existingCartItem) {
      // Produkt o wybranym rozmiarze już istnieje w koszyku
      setNotificationMessage(
        <span>
          Produkt <strong>{product.title}</strong> o rozmiarze <strong>{selectedSize}</strong> już znajduje się w koszyku.
        </span>
      );
      setShowNotification(true);
    } else {
      // Produkt o wybranym rozmiarze nie istnieje w koszyku, dodaj nowy wpis
      dispatch(addToCart({
        id: product._id,
        title: product.title,
        quantity: 1,
        price: product.price,
        image: product.image,
        gender: product.gender,
        size: selectedSize
      }));

      setNotificationMessage(
        <span>
          Produkt <strong>{product.title}</strong> o rozmiarze <strong>{selectedSize}</strong> został dodany do koszyka!
        </span>
      );
      setShowNotification(true);
    }
  };

  // Efekt pobierający dane produktu z serwera przy załadowaniu komponentu
  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axios.get(`/api/products/${id}`);
        setProduct(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchProduct();
  }, [id]);

  // Efekt ustawiający wybrany rozmiar z Redux, jeśli istnieje
  useEffect(() => {
    if (selectedSizeRedux) {
      setSelectedSize(selectedSizeRedux);
    }
  }, [selectedSizeRedux]);

  // Warunek wyświetlający brak produktu o podanym identyfikatorze
  if (!product) {
    return <div className={styles.noSearch}>Nie znaleziono produktu o podanym identyfikatorze.</div>;
  }

  // Warunek wyświetlający brak dostępnych zdjęć produktu
  if (!product.carouselImages || !Array.isArray(product.carouselImages) || product.carouselImages.length === 0) {
    return <div className={styles.noSearch}>Brak dostępnych zdjęć produktu.</div>;
  }

  // Dostępne rozmiary produktu
  const availableSizes = product.sizeChart?.EU || [];

  // Zwracany JSX komponentu Product
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
        <h3 className={styles.availableSizes}>Dostępne rozmiary:</h3>
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
        className={styles.addToCartButton}
        onClick={handleAddToCart}
      >
        DODAJ DO KOSZYKA
      </button>

      {/* Dodaj komponent Notification */}
      <Notification show={showNotification} handleClose={closeNotification} message={notificationMessage} />
    </div>
  );
};

export default Product;