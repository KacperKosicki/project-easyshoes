// Notification.js

import React from 'react';
import { Toast } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

const Notification = ({ show, handleClose, message }) => {
  return (
    <Toast
      show={show}
      onClose={handleClose}
      delay={3000}
      autohide
      style={{
        position: 'fixed',
        bottom: '20px',
        right: '20px',
        width: '300px', // Dostosuj szerokość według potrzeb
        zIndex: 9999,
      }}
    >
      <Toast.Header>
        <strong className="me-auto">Powiadomienie</strong>
      </Toast.Header>
      <Toast.Body>{message}</Toast.Body>
    </Toast>
  );
};

export default Notification;