// NavBar.js

import React from 'react';
import { NavLink } from 'react-router-dom';
import { FaShoppingCart } from 'react-icons/fa'; // Importuj ikonę koszyka
import { useSelector } from 'react-redux'; // Importuj useSelector z Redux
import styles from './NavBar.module.scss';

const NavBar = () => {
  // Użyj useSelector do pobrania danych o koszyku ze stanu Redux
  const cartItems = useSelector(state => state.cartItems);

  // Oblicz całkowitą ilość produktów w koszyku
  const totalItems = cartItems.reduce((total, item) => total + item.quantity, 0);

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
        {/* Dodaj ikonę koszyka i informację o ilości produktów w koszyku */}
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