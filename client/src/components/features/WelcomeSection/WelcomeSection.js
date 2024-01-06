// WelcomeSection.js
import React from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import styles from './WelcomeSection.module.scss';

const WelcomeSection = () => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  return (
    <div className={styles.welcomeSection}>
      <h2 className={styles.shopName}>easyshoes.pl</h2>
      <p className={styles.collectionText}>Nowa kolekcja butów już dostępna! Sprawdź sam!</p>
      <Slider {...settings}>
        {/* Dodaj tutaj obrazy do karuzeli */}
        <div>
          <img src="/images/oip.jpg" alt="Slide 1" />
        </div>
        <div>
          <img src="/images/slide2.jpg" alt="Slide 2" />
        </div>
        <div>
          <img src="/images/slide3.jpg" alt="Slide 3" />
        </div>
      </Slider>
      <button className={styles.viewProductsButton}>Zobacz produkty</button>
    </div>
  );
};

export default WelcomeSection;