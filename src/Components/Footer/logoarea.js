import React from 'react';
import { Link } from 'react-router-dom';

export default (props) => {
  const { companyName, companyDescription } = props;

  return (
    <div className="col-md-4 text-center responsive-column">
      <div className="margin-40 visible-lg visible-md" />
      <img src="assets/napolipizzalogo.png" alt="" />
      <p className="logo-footer-text">{companyName}</p>
      <p className="logo-footer-detail">{companyDescription}</p>
      <Link to="#section-menu" className="scroll-to button-yellow button-heavy">
        SİPARİŞ VER
      </Link>
    </div>
  );
};
