import React, { Component } from 'react';
import ReactModal from 'react-modal';
import $ from 'jquery';
import SweetAlert from 'sweetalert';

import AddAddress from '../../Api/add_address';

export default class AddAddressModal extends Component {
  constructor(props) {
    super(props);

    this.addNewAddress = this.addNewAddress.bind(this);
  }

  async addNewAddress() {
    const formDataArray = $(this.form).serializeArray();
    const formDataObject = {};

    formDataArray.map((field) => { formDataObject[field.name] = field.value; });

    const response = await AddAddress(formDataObject);

    if (response.getResult() === 'success') {
      SweetAlert({
        title: 'Başarılı',
        text: 'Adres eklendi',
        buttons: false,
        closeOnEsc: false,
        closeOnClickOutside: false,
        timer: 1200,
      }).then(() => {
        this.props.onInserted();
        this.props.toggleModal();
      });
    }
  }

  render() {
    return (
      <ReactModal isOpen={this.props.modalState}>
        <form ref={(form) => { this.form = form; }}>
          <input type="hidden" name="user_id" value={this.props.user_id} />
          <div className="modal-header">
            <h3 className="modal-title">
              Adres Ekle
              <button
                type="button"
                className="close"
                data-dismiss="modal"
                aria-label="Close"
                onClick={this.props.toggleModal}
              >
                <span aria-hidden="true">&times;</span>
              </button>
            </h3>
          </div>

          <div className="modal-body">
            <div className="form-group">
              <label>Adres Başlığı</label>
              <input type="text" name="title" placeholder="Ör. Ev Adresim" />
            </div>

            <div className="form-group">
              <label>Adres Açıklaması</label>
              <textarea rows="6" name="address_description" placeholder="Uzun Adres Açıklaması" />
            </div>

            <div className="modal-footer">
              <div className="pull-right">
                <button className="btn btn-primary" type="button" onClick={this.addNewAddress}>
                  <i className="fa fa-check" /> Ekle
                </button>
              </div>
            </div>
          </div>
        </form>
      </ReactModal >
    );
  }
}
