// Statute.js

import React from 'react';
import styles from './Statue.module.scss';

const Statute = () => {
  return (
    <div className={styles.container}>
      <div className={styles.wrapper}>
        <h2>Regulamin Sklepu Internetowego z Butami</h2>

        <h3>1. Postanowienia Ogólne</h3>
        <p>
          1.1. Niniejszy regulamin określa zasady korzystania ze Sklepu Internetowego z Butami.
        </p>

        <p>
          1.2. Sklep Internetowy jest prowadzony przez [Nazwa Firmy], z siedzibą pod adresem [Adres], NIP: [Numer NIP].
        </p>

        <h3>2. Zamówienia</h3>
        <p>
          2.1. Składanie zamówień w Sklepie Internetowym jest możliwe po zalogowaniu się na konto użytkownika lub jako gość.
        </p>

        <p>
          2.2. Zamówienia można składać za pomocą formularza dostępnego na stronie internetowej Sklepu.
        </p>

        <p>
          2.3. Po złożeniu zamówienia Klient otrzyma potwierdzenie na podany adres e-mail.
        </p>

        <h3>8. Postanowienia Końcowe</h3>
        <p>
          8.1. Niniejszy regulamin wchodzi w życie z chwilą opublikowania na stronie internetowej Sklepu.
        </p>

        <p>
          8.2. W sprawach nieuregulowanych niniejszym regulaminem zastosowanie mają przepisy prawa polskiego.
        </p>
      </div>
    </div>
  );
};

export default Statute;