import React from 'react';

export default (props) => {
  const {
    addressDescription, workingHours, phoneNumber, emailAddress,
  } = props;

  return (
    <div className="col-md-4 responsive-column">
      <h2 className="footer-heading">Çalışma Saatlerimiz</h2>
      <div className="opening-hours-wrapper">
        <div className="row">
          <div className="col-xs-6">
            <em>Pazartesi - Cumartesi</em>
          </div>
          <div className="col-xs-6 text-right">
            <em>{workingHours}</em>
          </div>
        </div>
        <div className="margin-5" />
      </div>
      <h2 className="footer-heading">Adresimiz</h2>
      <address>
        {addressDescription}
        <div className="margin-20" />
        Hızlı Sipariş: {phoneNumber}
        <br />
        E-Posta: {emailAddress}
      </address>
    </div>
  );
};
