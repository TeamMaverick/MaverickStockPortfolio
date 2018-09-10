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
        <select value={this.state.option} onChange={this.handleChange}>
          {this.state.orders.map((item, i) => (
            <option value={i} key={i}>
              {item}
            </option>
          ))}
        </select>
      </div>
    );
  }
}

export default SortBy;
