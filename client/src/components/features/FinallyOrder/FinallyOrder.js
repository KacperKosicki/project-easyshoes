// FinallyOrder.js

// Importy komponentów i modułów
import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import axios from 'axios';
import { clearCart } from '../../../redux/productRedux';
import { useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import styles from './FinallyOrder.module.scss';

// Komponent FinallyOrder.js
const FinallyOrder = () => {
  // Stan do wyświetlania modala
  const [showModal, setShowModal] = useState(false);
  // Selekcja stanu koszyka i wybranego rozmiaru
  const cartItems = useSelector((state) => state.cartItems);
  const selectedSize = useSelector((state) => state.selectedSize);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Efekt sprawdzający, czy koszyk jest pusty
  useEffect(() => {
    // Jeśli koszyk jest pusty, przekieruj użytkownika do strony głównej
    if (cartItems.length === 0) {
      navigate('/');
    }
  }, [cartItems, navigate]);

  // Funkcja wysyłająca zamówienie na serwer
  const sendOrderToServer = async () => {
    try {
      const orderData = {
        items: cartItems,
        selectedSize: selectedSize,
      };

      const response = await axios.post('http://localhost:8000/api/orders', orderData);
      console.log('Zamówienie zostało wysłane na serwer:', response.data);

      // Po udanym wysłaniu zamówienia czyszczymy koszyk za pomocą akcji clearCart
      dispatch(clearCart());

      // Po złożeniu zamówienia przechodzimy na stronę główną
      navigate('/');
    } catch (error) {
      console.error('Błąd podczas wysyłania zamówienia:', error);
    }
  };

  // Obsługa kliknięcia przycisku "Złóż zamówienie"
  const handleOrderButtonClick = () => {
    setShowModal(true);
  };

  // Obsługa zamknięcia modala
  const handleModalClose = () => {
    setShowModal(false);
  };

  // Zwracany JSX komponentu FinallyOrder
  return (
    <div className={styles.finallyOrderContainer}>
      <h2 className={styles.submitOrder}>Podsumowanie zamówienia</h2>
      <ul className={styles.orderSummary}>
        {cartItems.map((item) => (
          <li key={item.id} className={styles.cartItem}>
            <div className={styles.productInfo}>
              <div className={styles.productTitle}>Produkt: <span>{item.title}</span></div>
              <div className={styles.productQuantity}>Ilość: <span>{item.quantity}</span></div>
              <div className={styles.productPrice}>Cena: <span>{(item.price * item.quantity).toFixed(2)} zł</span></div>
              {selectedSize && <div className={styles.productSize}>Rozmiar: <span>{selectedSize}</span></div>}
            </div>
          </li>
        ))}
      </ul>
      <button className={styles.orderButton} onClick={handleOrderButtonClick}>ZŁÓŻ ZAMÓWIENIE</button>
      {/* Modal */}
      {showModal && (
        <div className="modal" tabIndex="-1" role="dialog" style={{ display: 'block' }}>
          <div className="modal-dialog" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Potwierdzenie zamówienia</h5>
                <button type="button" className="close" onClick={handleModalClose} aria-label="Close">
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <div className="modal-body">
                Czy na pewno chcesz złożyć to zamówienie?
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-secondary" onClick={handleModalClose}>Anuluj</button>
                <button type="button" className="btn btn-primary" onClick={sendOrderToServer}>Złóż zamówienie</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default FinallyOrder;