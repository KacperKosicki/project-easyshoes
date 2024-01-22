// NavBar.js

import React from 'react';
import { NavLink } from 'react-router-dom';
import { FaShoppingCart } from 'react-icons/fa';
import { useSelector, useDispatch } from 'react-redux';
//import { CLEAR_CART } from '../../../redux/productRedux'; // Popraw ścieżkę do pliku z akcjami Redux
import styles from './NavBar.module.scss';

const NavBar = () => {
  const cartItems = useSelector((state) => state.cartItems);
  const dispatch = useDispatch();

  const totalItems = cartItems.reduce((total, item) => total + item.quantity, 0);

  /*const handleCartClick = () => {
    // Przejdź do strony koszyka i oczyść koszyk po kliknięciu
    dispatch({ type: CLEAR_CART });
  };*/

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

