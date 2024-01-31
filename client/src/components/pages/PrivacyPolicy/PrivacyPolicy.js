// PolitykaPrywatnosci.js

// Importy komponentów i stylów
import React from 'react';
import styles from './PrivacyPolicy.module.scss';

// Komponent PrivacyPolicy.js
const PrivacyPolicy = () => {
  return (
    <div className={styles.privacyPolicyContainer}>
      <h2 className={styles.privacyPolicyHeading}>Polityka Prywatności</h2>
      <div className={styles.privacyPolicyContent}>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla nec turpis at magna posuere pharetra. Nulla id
          nisi lectus. Donec non ex eu metus iaculis pellentesque. Curabitur non libero vitae velit tempus rhoncus
          nec in eros. Integer bibendum suscipit nulla, sed fermentum lorem. Donec blandit, eros eget aliquet faucibus,
          nisi dui hendrerit lectus, sit amet vehicula tortor justo sit amet arcu. Nam pellentesque, mi a dapibus
          laoreet, elit odio fringilla nulla, ac fermentum leo metus et arcu.
        </p>
        <p className={styles.footerNote}>Przykładowa treść stworzona przez ChatGPT</p>
      </div>
    </div>
  );
};

export default PrivacyPolicy;