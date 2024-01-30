// FinallyOrder.js

import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import axios from 'axios';
import { clearCart } from '../../../redux/productRedux'; // Importujemy akcję clearCart
import { useNavigate } from 'react-router-dom'; // Importujemy useNavigate
import 'bootstrap/dist/css/bootstrap.min.css'; // Importujemy styl Bootstrapa

import styles from './FinallyOrder.module.scss'; // Importujemy style

const FinallyOrder = () => {
  const [showModal, setShowModal] = useState(false); // Stan do wyświetlania modala
  const cartItems = useSelector((state) => state.cartItems);
  const selectedSize = useSelector((state) => state.selectedSize);
  const dispatch = useDispatch(); // Używamy funkcji useDispatch
  const navigate = useNavigate(); // Używamy useNavigate do nawigacji

  useEffect(() => {
    // Sprawdź, czy koszyk jest pusty
    if (cartItems.length === 0) {
      // Jeśli koszyk jest pusty, przekieruj użytkownika do strony głównej
      navigate('/');
    }
  }, [cartItems, navigate]);

  const sendOrderToServer = async () => {
    try {
      const orderData = {
        items: cartItems,
        selectedSize: selectedSize,
      };

      const response = await axios.post('http://localhost:8000/api/orders', orderData);
      console.log('Zamówienie zostało wysłane na serwer:', response.data);

      // Po udanym wysłaniu zamówienia czyszczymy koszyk za pomocą akcji clearCart
      dispatch(clearCart()); // Wywołujemy akcję clearCart

      // Po złożeniu zamówienia przechodzimy na stronę główną
      navigate('/');
    } catch (error) {
      console.error('Błąd podczas wysyłania zamówienia:', error);
    }
  };

  const handleOrderButtonClick = () => {
    setShowModal(true); // Wyświetlenie modala po kliknięciu przycisku "Złóż zamówienie"
  };

  const handleModalClose = () => {
    setShowModal(false); // Ukrycie modala po zamknięciu
  };

  return (
    <div className={styles.finallyOrderContainer}>
      <h2 className={styles.submitOrder}>Podsumowanie zamówienia</h2>
      <ul className={styles.orderSummary}>
        {cartItems.map((item) => (
          <li key={item.id} className={styles.cartItem}>
            <div className={styles.productInfo}>
              <div className={styles.productTitle}>Produkt: {item.title}</div>
              <div className={styles.productQuantity}>Ilość: {item.quantity}</div>
              <div className={styles.productPrice}>Cena: {(item.price * item.quantity).toFixed(2)} zł</div>
              {selectedSize && <div className={styles.productSize}>Rozmiar: {selectedSize}</div>}
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