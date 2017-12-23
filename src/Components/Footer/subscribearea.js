import React from 'react';

export default () => (
  <div className="col-md-4 responsive-column">
    <h2 className="footer-heading text-uppercase">Abone Ol</h2>
    <div className="margin-10" />
    <p>
      <em>
        E-Posta adresine abone olarak<br />
        indirimlerden ve kampanyalardan yararlanabilirsin!
      </em>
    </p>
    <form className="form-subscribe">
      <input type="email" name="email" placeholder="E-Posta adresiniz" />
      <div className="text-right">
        <input className="button-yellow button-heavy" type="submit" value="Abone Ol" />
      </div>
    </form>
  </div>
);
