// NavBar.js

// Importy komponentów i stylów
import React from 'react';
import { NavLink } from 'react-router-dom';
import { FaShoppingCart } from 'react-icons/fa'; // Import ikony koszyka
import { useSelector } from 'react-redux'; // Import useSelector do pobrania stanu koszyka
import styles from './NavBar.module.scss'; // Import stylów dla NavBar

// Komponent NavBar.js
const NavBar = () => {
  // Pobranie stanu koszyka z Redux store
  const cartItems = useSelector((state) => state.cartItems);
  
  // Obliczenie całkowitej liczby pozycji w koszyku
  const totalItems = cartItems.reduce((total, item) => total + item.quantity, 0);

  // Zwraca JSX nawigacji
  return (
    <nav className={styles.navbar}>
      <ul className={styles.navList}>
        <li className={styles.navItem}>
          <NavLink to="/" activeClassName={styles.activeLink} exact>
            Strona główna
          </NavLink>
        </li>
        <li className={styles.navItem}>
          <NavLink to="/products" activeClassName={styles.activeLink}>
            Produkty
          </NavLink>
        </li>
        <li className={styles.navItem}>
          <NavLink to="/premium" activeClassName={styles.activeLink}>
            Premium
          </NavLink>
        </li>
        <li className={styles.navItem}>
          <NavLink to="/cart" activeClassName={styles.activeLink}>
            <FaShoppingCart />
            {totalItems > 0 && <span className={styles.cartItemCount}>{totalItems}</span>}
          </NavLink>
        </li>
      </ul>
    </nav>
  );
};

export default NavBar;