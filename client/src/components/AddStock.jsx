import React from 'react';
import axios from 'axios';

class AddStock extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      stock: ''
    };
    this.handleClick = this.handleClick.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
  }
  // handle Add button click event
  handleClick() {
    // call this within call to get stock api
    axios
      .get('/api/currentStockPrice', { params: { STOCK: this.state.stock } })
      .then(({ data }) => {
        return axios.post('/api/stock', {
          stock: this.state.stock,
          quantity: 1,
          price: data
        });
      })
      .then(() => {
        //on success - refresh stock list
        this.props.getStocks();
      })
      .catch((err) => {
        console.log(err);
      });
  }
  // handle input onchange event (update stock state)
  handleInputChange(evt) {
    this.setState({
      stock: evt.target.value
    });
  }
  render() {
    return (
      <div class="field has-addons">
        <div class="control is-expanded">
          <input className="input" type="text" onChange={this.handleInputChange} value={this.state.stock} />
        </div>
        <div class="control">
          <a class="button is-info" onClick={this.handleClick}>
            Add Stock
          </a>
        </div>
      </div>

    );
  }
}

export default AddStock;
