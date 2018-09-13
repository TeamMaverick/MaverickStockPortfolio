import React from 'react';

class SortBy extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      orders: ['Alphabetical', 'Total Price', 'Quantity']
    };
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(evt) {
    this.props.updateSort(evt.target.value);
  }

  render() {
    return (
      <div className="sort">
        <div className="select is-rounded">
          <select value={this.state.option} onChange={this.handleChange}>
            {this.state.orders.map((item, i) => (
              <option value={item} key={i}>
                {item}
              </option>
            ))}
          </select>
        </div>
      </div>
    );
  }
}

export default SortBy;
