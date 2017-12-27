import React from 'react';
import ReactModal from 'react-modal';
import CartItem from './cartitem';

export default (props) => {
  const { modalState, toggleCartModal } = props;
  this.cart = localStorage.getItem('cart') ? JSON.parse(localStorage.getItem('cart')) : [];

  return (
    <ReactModal isOpen={modalState}>
      <form
        ref={(form) => {
          this.form = form;
        }}
      >
        <div className="modal-header">
          <h5 className="modal-title">
            Sepet
            <button
              type="button"
              className="close"
              data-dismiss="modal"
              aria-label="Close"
              onClick={toggleCartModal}
            >
              <span aria-hidden="true">&times;</span>
            </button>
          </h5>
        </div>
        <div className="modal-body">{this.cart.map(item => <CartItem {...item} />)}</div>
        <div className="modal-footer">
          <button className="btn btn-warning" type="button">
            Ödemeye Git
          </button>
        </div>
      </form>
    </ReactModal>
  );
};
