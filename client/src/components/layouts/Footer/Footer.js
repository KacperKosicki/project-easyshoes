// Footer.js

// Importy komponentów i stylów
import React from 'react';
import { FaFacebook, FaInstagram, FaTwitter, FaYoutube } from 'react-icons/fa';
import styles from './Footer.module.scss';

// Komponent Footer.js
const Footer = () => {
  return (
    <footer className={styles.footer}>
      <div className={styles.socialIcons}>
        <a href="https://www.facebook.com" target="_blank" rel="noopener noreferrer">
          <FaFacebook />
        </a>
        <a href="https://www.instagram.com" target="_blank" rel="noopener noreferrer">
          <FaInstagram />
        </a>
        <a href="https://www.twitter.com" target="_blank" rel="noopener noreferrer">
          <FaTwitter />
        </a>
        <a href="https://www.youtube.com" target="_blank" rel="noopener noreferrer">
          <FaYoutube />
        </a>
      </div>
      <div className={styles.footerSections}>
        <div className={styles.footerSection}>
          <h3>Informacje</h3>
          <ul>
            <li>
              <a href="/about-us">O nas</a>
            </li>
            <li>
              <a href="/statue">Regulamin</a>
            </li>
            <li>
              <a href="/polityka-prywatnosci">Polityka prywatności</a>
            </li>
          </ul>
        </div>
        <div className={styles.footerSection}>
          <h3>Kontakt</h3>
          <p>
            Adres: ul. Przykładowa 123, 00-000 Warszawa
            <br />
            Telefon: 123 456 789
            <br />
            Email: kontakt@easyshoes.pl
          </p>
        </div>
        <div className={styles.footerSection}>
          <h3>Akcesoria</h3>
          <ul>
            <li>
              <a href="/products">Buty</a>
            </li>
            <li className={styles.comingSoon}>
              <a href="/kategorie/akcesoria">Akcesoria</a> <span className={styles.comingSoonText}>Już niedługo...</span>
            </li>
            <li className={styles.comingSoon}>
              <a href="/kategorie/odziez">Odzież</a> <span className={styles.comingSoonText}>Już niedługo...</span>
            </li>
          </ul>
        </div>
      </div>
      <p>&copy; 2023 easyshoes.pl - Wszelkie prawa zastrzeżone.</p>
    </footer>
  );
};

export default Footer;