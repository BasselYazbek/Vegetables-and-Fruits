/* // QRCodeComponent.jsx
import React from 'react';
import QRCode from 'qrcode.react';

const QRCodeComponent = () => {
  const websiteUrl = 'http://localhost:3000/'; // Replace with your actual website URL

  return (
    <div>
      <h2>Scan the QR Code to Open Our Webpage</h2>
      <QRCode value={websiteUrl} size={200} />
    </div>
  );
};

export default QRCodeComponent;
 */