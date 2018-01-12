import React from 'react';

export default class AddressSelector extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      selectedAddress: -1,
    };
  }

  render() {
    return (
      <div className="list-group teslimat">
        {this.props.addressData.map((address, index) => (
          <a
            href="#!"
            className={`list-group-item ${index === this.state.selectedAddress ? 'active' : null}`}
            onClick={(x) => {
              this.setState({ selectedAddress: index });
              this.props.selectAddress(address.id);
            }}
          >
            <button className="close" onClick={() => this.props.removeAddress(address.id)}>&times;</button>
            <h4 className="list-group-item-heading">{address.title}</h4>
            <p className="list-group-item-text">
              {address.address_description}
            </p>
          </a>
        ))
        }
      </div>
    );
  }
}
