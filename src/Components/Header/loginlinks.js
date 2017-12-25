import React from 'react';
import { Link } from 'react-router-dom';

export default () => {
  const userdata = JSON.parse(localStorage.getItem('userdata'));
  let welcomeMessage;
  let link2;
  let link1;

  if (userdata) {
    welcomeMessage = <span>Hoşgeldin, ${userdata.username}</span>;
    link1 = <Link to="/profile">Profil</Link>;
    link2 = <Link to="/logout">Çıkış</Link>;
  } else {
    welcomeMessage = <span>Hoşgeldin, ziyaretçi</span>;
    link1 = <Link to="/signin">Giriş Yap</Link>;
    link2 = <Link to="/signup">Kayıt Ol</Link>;
  }

  return (
    <div className="col-xs-6 text-right">
      {welcomeMessage}, {link1} | {link2}
    </div>
  );
};
