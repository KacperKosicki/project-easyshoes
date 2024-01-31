// Notification.js

// Importy komponentów i stylu Bootstrapa
import React from 'react';
import { Toast } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import styles from './Notification.module.scss';

// Komponent Notification.js
const Notification = ({ show, handleClose, message }) => {
  // Zwraca Toast wyświetlający powiadomienie
  return (
    <Toast
      show={show}
      onClose={handleClose}
      delay={3000}
      autohide
      className={styles.notification}
    >
      <Toast.Header>
        <strong className="me-auto">Powiadomienie</strong>
      </Toast.Header>
      <Toast.Body>{message}</Toast.Body>
    </Toast>
  );
};

export default Notification;