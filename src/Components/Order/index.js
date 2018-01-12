import React from 'react';

export default (props) => {
  const { data } = props;

  return (
    <table className="table table-condensed talbe-hover">
      <thead>
        <th>ID</th>
        <th>Ücret</th>
        <th>Sipariş</th>
        <th>Tahmini Teslimat</th>
        <th>Durum</th>
      </thead>
      <tbody>
        {data.map((order) => {
          console.log(order);
          const {
              id, delivered, delivery, price,
            } = order;

          const menus = JSON.parse(order.menus);

          return (
            <tr>
              <td>{id}</td>
              <td>{price} <i className="fa fa-try" /></td>
              <td>{menus.map(menu => <span className="label label-success">{menu.count}x{menu.name}</span>)}</td>
              <td>{delivery}</td>
              <td>
                {((info) => {
                  if (info === 0) return <span className="label label-warning">İşleniyor</span>;
                  else if (info === 1) return <span className="label label-primary">Yola Çıktı</span>;
                })(delivered)}
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};

