import React from 'react';
import './index.css';

export default (props) => {
  const {
    copyrightText, facebookAddress, twitterAddress, instagramAddress,
  } = props;

  return (
    <div className="site-info">
      <div className="container">
        <div className="row">
          <div className="col-xs-8">{copyrightText}</div>
          <div className="col-xs-4 text-right footer-socials">
            Buralarda da varız:
            <a href={facebookAddress}>
              <i className="fa fa-facebook" />
            </a>
            <a href={twitterAddress}>
              <i className="fa fa-twitter" />
            </a>
            <a href={instagramAddress}>
              <i className="fa fa-instagram" />
            </a>
          </div>
        </div>
      </div>
      <div id="scroll-top">
        <i className="fa fa-angle-double-up" />
      </div>
    </div>
  );
};
