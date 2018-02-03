import React from 'react';

export default (props) => {
  const { data } = props;

  return (
    <table className="table table-condensed talbe-hover">
      <thead>
        <th>Ücret</th>
        <th>Sipariş</th>
        <th>Tahmini Teslimat</th>
        <th>Durum</th>
        <th>Ödeme</th>
      </thead>
      <tbody>
        {data.map((order) => {
          console.log(order);
          const {
              delivered, delivery, price, payment,
            } = order;

          const menus = JSON.parse(order.menus);

          return (
            <tr>
              <td>{price} <i className="fa fa-try" /></td>
              <td>{menus.map(menu => <span className="label label-success label-menu">{menu.count}x{menu.name}</span>)}</td>
              <td>{delivery}</td>
              <td>
                {((info) => {
                  if (String(info) === '0') return <span className="label label-warning">İşleniyor</span>;
                  else if (String(info) === '1') return <span className="label label-primary">Yola Çıktı</span>;
                  return <span className="label label-danger">İşlenemedi</span>;
                })(delivered)}
              </td>
              <td>{payment}</td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};

