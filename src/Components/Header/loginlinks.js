import React from 'react';
import { Link } from 'react-router-dom';

export default (props) => {
  const { authState } = props;
  const userdata = JSON.parse(localStorage.getItem('userdata'));
  let welcomeMessage;
  let link2;
  let link1;

  if (authState && userdata) {
    welcomeMessage = (
      <span>
        Hoşgeldin, {userdata.username}{' '}
        <span className="label label-warning point">{userdata.point}</span>{' '}
      </span>
    );
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
