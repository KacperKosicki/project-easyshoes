// AboutUs.js

// Importy komponentów i stylów
import React from 'react';
import styles from './AboutUs.module.scss';

// Komponent AboutUs.js
const AboutUs = () => {
  return (
    <div className={styles.aboutUsContainer}>
      <h2 className={styles.aboutUsHeading}>O Nas</h2>
      <div className={styles.aboutUsContent}>
        <div className={styles.aboutUsText}>
          <p>
            Witaj w easyshoes.pl – Twoim nowym źródle modowych inspiracji! Jesteśmy świeżo na rynku, ale pełni pasji
            do dostarczania najnowszych trendów w najwyższej jakości.
          </p>
          <p>
            Cześć, jestem <strong>Kacper Kosicki</strong>, Junior Full Stack Developer i dumny właściciel easyshoes.pl.
            Z zamiłowania do nowoczesnych technologii oraz miłości do mody postanowiłem stworzyć miejsce, gdzie każdy
            entuzjasta butów znajdzie coś dla siebie.
          </p>
          <p>
            Nasza oferta to nie tylko styl, ale również bezpieczeństwo. Wszystkie nasze produkty są legalne, gwarantując
            Ci komfort i spokój podczas zakupów. Dbamy o każdy szczegół, abyś mógł cieszyć się nie tylko modnym,
            ale również bezpiecznym zakupem.
          </p>
        </div>
        <div className={styles.aboutUsImageContainer}>
          <img src="/images/inne/ja.jpg" alt="Kacper Kosicki - właściciel easyshoes.pl" className={styles.aboutUsImage} />
        </div>
      </div>
      <p className={styles.aboutUsText}>
        Dołącz do naszej społeczności i odkryj świat oryginalnych butów dostosowanych do najnowszych trendów.
        easyshoes.pl to nie tylko sklep, to miejsce, w którym styl łączy się z nowoczesnością.
      </p>
      <p className={styles.footerNote}>Przykładowa treść stworzona przez ChatGPT</p>
    </div>
  );
};

export default AboutUs;