import React from 'react';

export default (props) => {
  const { companyName, companyDescription } = props;

  return (
    <div className="col-md-4 text-center responsive-column">
      <div className="margin-40 visible-lg visible-md" />
      <img src={require('../../Assets/pizza.svg')} alt="" />
      <p className="logo-footer-text">{companyName}</p>
      <p className="logo-footer-detail">{companyDescription}</p>
      <a href="#section-menu" className="scroll-to button-yellow button-heavy">
        SİPARİŞ VER
      </a>
    </div>
  );
};
