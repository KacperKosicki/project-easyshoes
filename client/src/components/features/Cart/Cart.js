// Cart.js

import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import styles from './Cart.module.scss'; // Importuj style
import { removeFromCart, updateQuantity } from '../../../redux/productRedux';
import { Link } from 'react-router-dom';

const Cart = () => {
  const cartItems = useSelector((state) => state.cartItems);
  const selectedSize = useSelector((state) => state.selectedSize);
  const dispatch = useDispatch();

  const isCartEmpty = cartItems.length === 0;

  const [randomProducts, setRandomProducts] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://localhost:8000/api/products');
        const data = await response.json();
        setRandomProducts(data.sort(() => 0.5 - Math.random()).slice(0, 3));
      } catch (error) {
        console.error('Error fetching random products:', error);
      }
    };

    if (isCartEmpty) {
      fetchData();
    }
  }, [isCartEmpty]);

  const handleRemoveItem = (itemId) => {
    dispatch(removeFromCart(itemId));
  };

  const handleIncreaseQuantity = (itemId) => {
    const itemToUpdate = cartItems.find((item) => item.id === itemId);

    if (itemToUpdate && itemToUpdate.quantity < 20) {
      dispatch(updateQuantity({ itemId, quantity: 1 }));
    }
  };

  const handleDecreaseQuantity = (itemId) => {
    const itemToUpdate = cartItems.find((item) => item.id === itemId);
    if (itemToUpdate?.quantity > 1) {
      dispatch(updateQuantity({ itemId, quantity: -1 }));
    }
  };

  const calculateTotal = () => {
    const totalQuantity = cartItems.reduce((sum, item) => sum + item.quantity, 0);
    const totalPrice = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);

    return { totalQuantity, totalPrice };
  };

  const { totalQuantity, totalPrice } = calculateTotal();

  return (
    <div className={styles.cartContainer}>
      <h2 className={styles.cartHeader}>Twój koszyk</h2>
      {isCartEmpty ? (
        <div className={styles.emptyCartContent}>
          <p className={styles.emptyCartMessage}>Koszyk jest pusty.</p>
          <div className={styles.separator}></div>
          <p className={styles.suggestionsHeader}>Może to ci się spodoba?</p>
          <div className={styles.cartContent}>
            <div className={styles.cartItemsInCart}>
              {randomProducts.map((item) => (
                <div key={item._id} className={styles.cartItemInCart}>
                  <div className={styles.itemDetails}>
                    <img src={item.image} alt={item.title} className={styles.itemImage} />
                    <div className={styles.itemControls}>
                      <span className={styles.itemTitle}>{item.title}</span>
                      <p>
                        <span className={styles.itemTotalPrice}> {(item.price).toFixed(2)} zł</span>
                      </p>
                      <Link to={`/product/${item._id}`} className={styles.seeProduct}>
                        ZOBACZ PRODUKT
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      ) : (
        <div>
          <div className={styles.cartContent}>
            <div className={styles.cartItems}>
              <ul className={styles.cartList}>
                {cartItems.map((item) => (
                  <li key={item.id} className={styles.cartItem}>
                    <div className={styles.itemDetails}>
                      <img src={item.image} alt={item.title} className={styles.itemImage} />
                      <div className={styles.itemControls}>
                        <span className={styles.itemTitle}>{item.title}</span>
                        <p>
                          <span className={styles.itemQuantity}>{item.quantity} szt.</span> -
                          <span className={styles.itemTotalPrice}> {(item.price * item.quantity).toFixed(2)} zł</span>
                          {selectedSize && <span className={styles.itemSize}> - Rozmiar: {selectedSize}</span>}
                        </p>
                      </div>
                    </div>
                    <div className={styles.itemControls}>
                      <div className={styles.quantityButtonContainer}>
                        <button className={styles.quantityDeleteButton} onClick={() => handleDecreaseQuantity(item.id)}>
                          Usuń sztukę
                        </button>
                        <button className={styles.quantityAddButton} onClick={() => handleIncreaseQuantity(item.id)}>
                          Dodaj sztukę
                        </button>
                      </div>
                      <button className={styles.removeButton} onClick={() => handleRemoveItem(item.id)}>
                        Usuń z koszyka
                      </button>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
            <div className={styles.summaryAndOrder}>
              <div className={styles.totalSummary}>
              <button
                className={styles.orderButton}
                disabled={isCartEmpty}
                onClick={() => {
                  console.log('Zamówienie złożone!');
                  console.log('Szczegóły zamówienia:');
                  cartItems.forEach((item) => {
                    console.log(
                      `Produkt: ${item.title}, Ilość: ${item.quantity}, Cena: ${(item.price * item.quantity).toFixed(2)} zł`
                    );
                    if (selectedSize) {
                      console.log(`Rozmiar: ${selectedSize}`);
                    }
                  });
                  console.log(`Łączna ilość sztuk: ${totalQuantity}, Łączna cena: ${totalPrice.toFixed(2)} zł`);
                }}
              >
              {cartItems.length > 1 ? 'ZAKUP TE PRODUKTY' : 'ZAKUP TEN PRODUKT'}
            </button>
              </div>
              <div className={styles.totalSummary}>
                <p>
                  Łączna ilość sztuk: <span className={styles.totalValueQuantity}>{totalQuantity}</span>
                </p>
                <p>
                  Łączna cena: <span className={styles.totalValuePrice}>{totalPrice.toFixed(2)} zł</span>
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;